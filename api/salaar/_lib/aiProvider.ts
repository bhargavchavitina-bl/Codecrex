import { ensureBackendEnv } from "./supabaseAuth.js";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AiCompletionResult {
  ok: true;
  content: string;
  provider: string;
  model: string;
}

export interface AiCompletionFailure {
  ok: false;
  code: "AI_KEY_MISSING" | "AI_UPSTREAM_ERROR";
  message: string;
  provider?: string;
}

function readEnvKey(name: string): string {
  const raw = process.env[name]?.trim() || "";
  return raw.replace(/^["']|["']$/g, "").trim();
}

export function getAiProviderStatus(): {
  configured: boolean;
  provider: string;
} {
  ensureBackendEnv();
  if (readEnvKey("GEMINI_API_KEY")) {
    return { configured: true, provider: "Google Gemini" };
  }
  if (readEnvKey("OPENAI_API_KEY")) {
    return { configured: true, provider: "OpenAI" };
  }
  if (readEnvKey("GROQ_API_KEY")) {
    return { configured: true, provider: "Groq" };
  }
  if (readEnvKey("ANTHROPIC_API_KEY")) {
    return { configured: true, provider: "Anthropic" };
  }
  return { configured: false, provider: "Unconfigured (set GEMINI_API_KEY)" };
}

function coalesceHistoryTurns(history: ChatTurn[]): ChatTurn[] {
  const cleaned: ChatTurn[] = [];
  for (const turn of history) {
    const text = typeof turn.content === "string" ? turn.content.trim() : "";
    if (!text) continue;
    const role: "user" | "assistant" = turn.role === "assistant" ? "assistant" : "user";
    if (cleaned.length === 0 && role !== "user") {
      // Skip orphaned leading assistant turns so alternating turn constraints always hold.
      continue;
    }
    const prev = cleaned[cleaned.length - 1];
    if (prev && prev.role === role) {
      prev.content = `${prev.content}\n\n${text}`;
    } else {
      cleaned.push({ role, content: text });
    }
  }
  return cleaned;
}

export function buildNormalizedGeminiContents(
  history: ChatTurn[],
  userMessage: string,
): Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> {
  const coalesced = coalesceHistoryTurns(history);
  // Drop trailing user turn from history if present because the new userMessage is always appended as user.
  const trimmed =
    coalesced.length > 0 && coalesced[coalesced.length - 1].role === "user"
      ? coalesced.slice(0, -1)
      : coalesced;

  return [
    ...trimmed.map((turn) => ({
      role: (turn.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: turn.content }],
    })),
    {
      role: "user" as const,
      parts: [{ text: userMessage }],
    },
  ];
}

export function buildNormalizedAnthropicMessages(
  history: ChatTurn[],
  userMessage: string,
): Array<{ role: "user" | "assistant"; content: string }> {
  const coalesced = coalesceHistoryTurns(history);
  const trimmed =
    coalesced.length > 0 && coalesced[coalesced.length - 1].role === "user"
      ? coalesced.slice(0, -1)
      : coalesced;

  return [
    ...trimmed.map((turn) => ({ role: turn.role, content: turn.content })),
    { role: "user" as const, content: userMessage },
  ];
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = 25000,
): Promise<{ response?: Response; networkError?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    return { response };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { networkError: `Request timed out after ${Math.round(timeoutMs / 1000)}s.` };
    }
    return { networkError: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

async function parseJsonSafe<T>(response: Response): Promise<{ data?: T; error?: string }> {
  try {
    const raw = await response.text();
    if (!raw.trim()) {
      return { error: "Upstream provider returned an empty response body." };
    }
    return { data: JSON.parse(raw) as T };
  } catch {
    return { error: "Upstream provider returned non-JSON output." };
  }
}

async function callGemini(
  apiKey: string,
  systemPrompt: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<AiCompletionResult | AiCompletionFailure> {
  const configuredModel = readEnvKey("GEMINI_MODEL");
  const modelsToTry = Array.from(
    new Set(
      [configuredModel || "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"].filter(
        Boolean,
      ),
    ),
  );

  const contents = buildNormalizedGeminiContents(history, userMessage);
  let lastError = "Failed to reach Google Gemini API.";

  for (const model of modelsToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const { response, networkError } = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.45,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (networkError || !response) {
      lastError = `Gemini network error: ${networkError || "Request failed."}`;
      break;
    }

    if (response.ok) {
      const parsed = await parseJsonSafe<{
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
          finishReason?: string;
        }>;
        promptFeedback?: { blockReason?: string };
      }>(response);

      if (!parsed.data) {
        lastError = parsed.error || "Invalid JSON from Gemini API.";
        continue;
      }

      const text = parsed.data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("")
        .trim();
      if (text) {
        return {
          ok: true,
          content: text,
          provider: "Google Gemini",
          model,
        };
      }

      const blockReason =
        parsed.data.promptFeedback?.blockReason ||
        parsed.data.candidates?.[0]?.finishReason;
      lastError = blockReason
        ? `Gemini returned no text (${blockReason}).`
        : "Gemini returned an empty response.";
      continue;
    }

    const errText = await response.text().catch(() => "");
    lastError = `Gemini API error (${response.status}): ${errText.slice(0, 240)}`;
    const retryableModelError =
      response.status === 404 ||
      (response.status === 400 && /model|not found|not supported/i.test(errText));
    if (!retryableModelError) {
      break;
    }
  }

  return {
    ok: false,
    code: "AI_UPSTREAM_ERROR",
    message: lastError,
    provider: "Google Gemini",
  };
}

async function callOpenAiCompatible(
  url: string,
  apiKey: string,
  model: string,
  providerName: string,
  systemPrompt: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<AiCompletionResult | AiCompletionFailure> {
  const cleanedHistory = coalesceHistoryTurns(history);
  const { response, networkError } = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.45,
      max_tokens: 2048,
      messages: [
        { role: "system", content: systemPrompt },
        ...cleanedHistory.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (networkError || !response) {
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `${providerName} network error: ${networkError || "Request failed."}`,
      provider: providerName,
    };
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `${providerName} API error (${response.status}): ${errText.slice(0, 240)}`,
      provider: providerName,
    };
  }

  const parsed = await parseJsonSafe<{
    choices?: Array<{ message?: { content?: string } }>;
  }>(response);
  if (!parsed.data) {
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `${providerName}: ${parsed.error || "Invalid JSON response."}`,
      provider: providerName,
    };
  }

  const content = parsed.data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `${providerName} returned an empty response.`,
      provider: providerName,
    };
  }

  return { ok: true, content, provider: providerName, model };
}

async function callAnthropic(
  apiKey: string,
  systemPrompt: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<AiCompletionResult | AiCompletionFailure> {
  const model = readEnvKey("ANTHROPIC_MODEL") || "claude-3-5-haiku-latest";
  const { response, networkError } = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: systemPrompt,
      messages: buildNormalizedAnthropicMessages(history, userMessage),
    }),
  });

  if (networkError || !response) {
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `Anthropic network error: ${networkError || "Request failed."}`,
      provider: "Anthropic",
    };
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `Anthropic API error (${response.status}): ${errText.slice(0, 240)}`,
      provider: "Anthropic",
    };
  }

  const parsed = await parseJsonSafe<{
    content?: Array<{ type?: string; text?: string }>;
  }>(response);
  if (!parsed.data) {
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `Anthropic: ${parsed.error || "Invalid JSON response."}`,
      provider: "Anthropic",
    };
  }

  const content = parsed.data.content
    ?.filter((block) => block.type === "text")
    .map((block) => block.text || "")
    .join("")
    .trim();
  if (!content) {
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: "Anthropic returned an empty response.",
      provider: "Anthropic",
    };
  }

  return { ok: true, content, provider: "Anthropic", model };
}

/**
 * Invokes the configured server-side AI model provider with automatic fallback
 * across configured keys. Never reads keys from frontend.
 */
export async function generateSalaarReply(
  systemPrompt: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<AiCompletionResult | AiCompletionFailure> {
  ensureBackendEnv();

  const attempts: Array<() => Promise<AiCompletionResult | AiCompletionFailure>> = [];

  const geminiKey = readEnvKey("GEMINI_API_KEY");
  if (geminiKey) {
    attempts.push(() => callGemini(geminiKey, systemPrompt, history, userMessage));
  }

  const openaiKey = readEnvKey("OPENAI_API_KEY");
  if (openaiKey) {
    attempts.push(() =>
      callOpenAiCompatible(
        "https://api.openai.com/v1/chat/completions",
        openaiKey,
        readEnvKey("OPENAI_MODEL") || "gpt-4o-mini",
        "OpenAI",
        systemPrompt,
        history,
        userMessage,
      ),
    );
  }

  const groqKey = readEnvKey("GROQ_API_KEY");
  if (groqKey) {
    attempts.push(() =>
      callOpenAiCompatible(
        "https://api.groq.com/openai/v1/chat/completions",
        groqKey,
        readEnvKey("GROQ_MODEL") || "llama-3.3-70b-versatile",
        "Groq",
        systemPrompt,
        history,
        userMessage,
      ),
    );
  }

  const anthropicKey = readEnvKey("ANTHROPIC_API_KEY");
  if (anthropicKey) {
    attempts.push(() => callAnthropic(anthropicKey, systemPrompt, history, userMessage));
  }

  if (attempts.length === 0) {
    return {
      ok: false,
      code: "AI_KEY_MISSING",
      message:
        "AI model key is not configured on the backend. Add GEMINI_API_KEY (recommended) or OPENAI_API_KEY / GROQ_API_KEY to your .env file (or Vercel Environment Variables) and restart/redeploy.",
    };
  }

  const failures: string[] = [];
  let lastProvider: string | undefined;

  for (const attempt of attempts) {
    try {
      const result = await attempt();
      if (result.ok) {
        return result;
      }
      lastProvider = result.provider || lastProvider;
      failures.push(result.message);
    } catch (err) {
      failures.push(err instanceof Error ? err.message : String(err));
    }
  }

  return {
    ok: false,
    code: "AI_UPSTREAM_ERROR",
    message: failures.join(" | ") || "Upstream AI provider request failed.",
    provider: lastProvider,
  };
}
