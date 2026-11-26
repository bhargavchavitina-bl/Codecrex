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

export function getAiProviderStatus(): {
  configured: boolean;
  provider: string;
} {
  ensureBackendEnv();
  if (process.env.GEMINI_API_KEY?.trim()) {
    return { configured: true, provider: "Google Gemini" };
  }
  if (process.env.OPENAI_API_KEY?.trim()) {
    return { configured: true, provider: "OpenAI" };
  }
  if (process.env.GROQ_API_KEY?.trim()) {
    return { configured: true, provider: "Groq" };
  }
  if (process.env.ANTHROPIC_API_KEY?.trim()) {
    return { configured: true, provider: "Anthropic" };
  }
  return { configured: false, provider: "Unconfigured (set GEMINI_API_KEY)" };
}

async function callGemini(
  apiKey: string,
  systemPrompt: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<AiCompletionResult | AiCompletionFailure> {
  const modelsToTry = [
    process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash",
    "gemini-2.0-flash",
  ];

  const contents = [
    ...history.map((turn) => ({
      role: turn.role === "assistant" ? "model" : "user",
      parts: [{ text: turn.content }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  let lastError = "Failed to reach Google Gemini API.";

  for (const model of modelsToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(endpoint, {
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

    if (response.ok) {
      const data = (await response.json()) as {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
        }>;
      };
      const text = data.candidates?.[0]?.content?.parts
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
      lastError = "Gemini returned an empty response.";
      continue;
    }

    const errText = await response.text().catch(() => "");
    lastError = `Gemini API error (${response.status}): ${errText.slice(0, 240)}`;
    if (response.status !== 404) {
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
  const response = await fetch(url, {
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
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `${providerName} API error (${response.status}): ${errText.slice(0, 240)}`,
      provider: providerName,
    };
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
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
  const model = process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-haiku-latest";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
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
      messages: [
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    return {
      ok: false,
      code: "AI_UPSTREAM_ERROR",
      message: `Anthropic API error (${response.status}): ${errText.slice(0, 240)}`,
      provider: "Anthropic",
    };
  }

  const data = (await response.json()) as {
    content?: Array<{ type?: string; text?: string }>;
  };
  const content = data.content
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
 * Invokes the configured server-side AI model provider. Never reads keys from frontend.
 */
export async function generateSalaarReply(
  systemPrompt: string,
  history: ChatTurn[],
  userMessage: string,
): Promise<AiCompletionResult | AiCompletionFailure> {
  ensureBackendEnv();

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiKey) {
    return callGemini(geminiKey, systemPrompt, history, userMessage);
  }

  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (openaiKey) {
    return callOpenAiCompatible(
      "https://api.openai.com/v1/chat/completions",
      openaiKey,
      process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
      "OpenAI",
      systemPrompt,
      history,
      userMessage,
    );
  }

  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    return callOpenAiCompatible(
      "https://api.groq.com/openai/v1/chat/completions",
      groqKey,
      process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile",
      "Groq",
      systemPrompt,
      history,
      userMessage,
    );
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (anthropicKey) {
    return callAnthropic(anthropicKey, systemPrompt, history, userMessage);
  }

  return {
    ok: false,
    code: "AI_KEY_MISSING",
    message:
      "AI model key is not configured on the backend. Add GEMINI_API_KEY (recommended) or OPENAI_API_KEY / GROQ_API_KEY to your .env file (or Vercel Environment Variables) and restart/redeploy.",
  };
}
