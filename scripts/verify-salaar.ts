// scripts/verify-salaar.ts
// Verifies SALAAR streak math, API routes, security boundaries, and UI at 1280px & 390px.

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { createServer, preview } from "vite";
import {
  buildNormalizedAnthropicMessages,
  buildNormalizedGeminiContents,
  generateSalaarReply,
} from "../api/salaar/_lib/aiProvider.ts";
import { readJsonBody, type NodeRequest } from "../api/salaar/_lib/http.ts";
import {
  addDaysIso,
  buildWeeklyCalendar,
  calculateCurrentStreak,
  calculateLongestStreak,
  diffDaysIso,
  resolveClientLocalDate,
} from "../src/lib/streakUtils.ts";

const ARTIFACT_DIR =
  "C:/Users/bharg/.gemini/antigravity/brain/ec9681c7-2e5a-453b-8d8a-838344da395b";

function testStreakUtils() {
  console.log("1. Testing timezone-safe streak arithmetic...");
  // Leap year & month boundary checks
  assert.equal(addDaysIso("2024-02-28", 1), "2024-02-29");
  assert.equal(addDaysIso("2024-02-29", 1), "2024-03-01");
  assert.equal(addDaysIso("2025-02-28", 1), "2025-03-01");
  assert.equal(diffDaysIso("2026-11-24", "2026-11-26"), 2);

  // Deduplicated same-day events must only count as 1 day
  const dupDays = ["2026-11-25", "2026-11-25", "2026-11-26", "2026-11-26"];
  assert.equal(calculateCurrentStreak(dupDays, "2026-11-26"), 2);
  assert.equal(calculateLongestStreak(dupDays), 2);

  // Grace before midnight: active yesterday, not yet today => streak preserved
  assert.equal(calculateCurrentStreak(["2026-11-23", "2026-11-24", "2026-11-25"], "2026-11-26"), 3);
  // Broken gap => streak resets to 0
  assert.equal(calculateCurrentStreak(["2026-11-23", "2026-11-24"], "2026-11-26"), 0);
  // Longest streak preserves historic best
  assert.equal(
    calculateLongestStreak([
      "2026-11-01",
      "2026-11-02",
      "2026-11-03",
      "2026-11-04",
      "2026-11-25",
      "2026-11-26",
    ]),
    4,
  );

  // Reject future client date spoofing (>1 day offset from UTC)
  const spoofed = resolveClientLocalDate("2099-01-01", "Asia/Kolkata", new Date("2026-11-26T18:00:00Z"));
  assert.notEqual(spoofed, "2099-01-01");

  const weekly = buildWeeklyCalendar("2026-11-26", { "2026-11-24": 2, "2026-11-26": 1 });
  assert.equal(weekly.length, 7);
  assert.equal(weekly[6].date, "2026-11-26");
  assert.equal(weekly[6].isToday, true);
  assert.equal(weekly[6].active, true);
  console.log("   ✓ All streak math assertions passed.");
}

async function testBackendResilience() {
  console.log("1B. Testing HTTP Buffer body parsing & AI provider resilience...");

  // Vercel may pass req.body as a Buffer instead of parsed object
  const bufReq = {
    body: Buffer.from(JSON.stringify({ message: "Remove Element", mode: "dsa" }), "utf8"),
  } as unknown as NodeRequest;
  const parsedBuf = await readJsonBody<{ message: string; mode: string }>(bufReq);
  assert.equal(parsedBuf.message, "Remove Element");
  assert.equal(parsedBuf.mode, "dsa");

  const emptyBufReq = { body: Buffer.from("   ", "utf8") } as unknown as NodeRequest;
  assert.deepEqual(await readJsonBody(emptyBufReq), {});

  await assert.rejects(
    readJsonBody({ body: "{invalid-json" } as unknown as NodeRequest),
    /Invalid JSON request body/,
  );

  // Turn alternation & coalescing for Gemini & Anthropic
  const geminiContents = buildNormalizedGeminiContents(
    [
      { role: "assistant", content: "Orphan leading model greeting" },
      { role: "user", content: "Question part 1" },
      { role: "user", content: "Question part 2" },
      { role: "assistant", content: "Hint 1" },
      { role: "assistant", content: "Hint 2" },
      { role: "user", content: "Repeated trailing user turn" },
    ],
    "Help me understand Remove Element",
  );
  assert.deepEqual(
    geminiContents.map((c) => c.role),
    ["user", "model", "user"],
    "Gemini contents must strictly alternate starting and ending with user",
  );
  assert.ok(geminiContents[0].parts[0].text.includes("Question part 1"));
  assert.ok(geminiContents[0].parts[0].text.includes("Question part 2"));

  const anthropicMsgs = buildNormalizedAnthropicMessages(
    [
      { role: "assistant", content: "Orphan" },
      { role: "user", content: "U1" },
      { role: "assistant", content: "A1" },
    ],
    "Follow-up",
  );
  assert.deepEqual(
    anthropicMsgs.map((m) => m.role),
    ["user", "assistant", "user"],
  );

  // Simulate upstream network error + model fallback without throwing 500
  const originalFetch = globalThis.fetch;
  const prevGeminiKey = process.env.GEMINI_API_KEY;
  try {
    process.env.GEMINI_API_KEY = '  "simulated-quoted-key"\n';

    globalThis.fetch = (async () => {
      throw new Error("Simulated TLS connection reset");
    }) as typeof fetch;

    const netFail = await generateSalaarReply("system", [], "Remove Element");
    assert.equal(netFail.ok, false);
    if (!netFail.ok) {
      assert.equal(netFail.code, "AI_UPSTREAM_ERROR");
      assert.match(netFail.message, /Simulated TLS connection reset/);
    }

    // Simulate 404 on gemini-2.5-flash falling back to 200 on gemini-2.0-flash
    let callCount = 0;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      callCount += 1;
      const url = String(input);
      if (url.includes("gemini-2.5-flash")) {
        return new Response("model not found", { status: 404 });
      }
      return new Response(
        JSON.stringify({
          candidates: [
            { content: { parts: [{ text: "Use Two Pointers (slow & fast) in O(n) time." }] } },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }) as typeof fetch;

    const fallbackOk = await generateSalaarReply("system", [], "Remove Element");
    assert.equal(callCount, 2);
    assert.equal(fallbackOk.ok, true);
    if (fallbackOk.ok) {
      assert.equal(fallbackOk.model, "gemini-2.0-flash");
      assert.match(fallbackOk.content, /Two Pointers/);
    }
  } finally {
    globalThis.fetch = originalFetch;
    if (prevGeminiKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = prevGeminiKey;
  }

  console.log("   ✓ Backend Buffer parsing, history normalization & AI fallback assertions passed.");
}

async function testApiEndpointsAndPlaywright() {
  console.log("2. Starting Vite server with /api/salaar/* middleware...");
  const server = await createServer({ server: { port: 5192 } });
  await server.listen();
  const baseUrl = "http://localhost:5192";

  try {
    // 2A. Status endpoint (unauthenticated statusOnly check)
    const statusRes = await fetch(`${baseUrl}/api/salaar/progress?statusOnly=1`);
    assert.equal(statusRes.status, 200);
    const statusJson = (await statusRes.json()) as { authenticated: boolean; configured: boolean };
    assert.equal(statusJson.authenticated, false);

    // 2B. Auth enforcement on user-scoped endpoints
    const unauthProg = await fetch(`${baseUrl}/api/salaar/progress`);
    assert.equal(unauthProg.status, 401);
    const unauthAct = await fetch(`${baseUrl}/api/salaar/activity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "dsa_problem_solved", title: "Test" }),
    });
    assert.equal(unauthAct.status, 401);
    console.log("   ✓ Auth guards properly enforce 401 for unauthenticated user data endpoints.");

    // 2C. Practice catalog & hint-first check flow
    const dsaRes = await fetch(`${baseUrl}/api/salaar/practice?category=dsa&topic=arrays&difficulty=Medium&limit=5`);
    assert.equal(dsaRes.status, 200);
    const dsaJson = (await dsaRes.json()) as { questions: Array<Record<string, unknown>> };
    assert.ok(dsaJson.questions.length > 0, "Expected DSA questions");
    const firstQ = dsaJson.questions[0];
    assert.equal(firstQ.correctIndex, undefined, "Backend must NOT leak correctIndex in GET practice");
    assert.equal(firstQ.fullSolution, undefined, "Backend must NOT leak fullSolution in GET practice");

    const aptRes = await fetch(`${baseUrl}/api/salaar/practice?category=aptitude&topic=number-system&limit=5`);
    assert.equal(aptRes.status, 200);
    const aptJson = (await aptRes.json()) as { questions: Array<{ id: string; options: string[] }> };
    assert.ok(aptJson.questions.length >= 4, "Expected Number System aptitude questions");

    // Hint step before reveal
    const hintRes = await fetch(`${baseUrl}/api/salaar/practice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "hint", questionId: aptJson.questions[0].id, hintIndex: 0 }),
    });
    assert.equal(hintRes.status, 200);
    const hintJson = (await hintRes.json()) as { hint: string; correctIndex?: number };
    assert.ok(hintJson.hint.length > 10);
    assert.equal(hintJson.correctIndex, undefined, "Hint endpoint must NOT spoil answer");

    // Reveal solution step
    const revRes = await fetch(`${baseUrl}/api/salaar/practice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reveal_solution", questionId: aptJson.questions[0].id }),
    });
    assert.equal(revRes.status, 200);
    const revJson = (await revRes.json()) as { revealed: boolean; correctIndex: number; explanation: string };
    assert.equal(revJson.revealed, true);
    assert.equal(typeof revJson.correctIndex, "number");
    assert.ok(revJson.explanation.length > 10);
    console.log("   ✓ Practice catalog, hint-first enforcement & server validation passed.");

    // 2C2. Chat POST resilience ("Remove Element" prompt + malformed JSON check)
    const badJsonChatRes = await fetch(`${baseUrl}/api/salaar/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{bad-json",
    });
    assert.equal(badJsonChatRes.status, 400, "Malformed JSON should return 400, not 500");

    const removeElementPrompt =
      'Help me understand "Remove Element": Which optimal algorithmic pattern & complexity signature solves "Remove Element" (Arrays · Easy)? Give me a hint first.';
    const chatRes = await fetch(`${baseUrl}/api/salaar/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: removeElementPrompt,
        mode: "dsa",
        action: "chat",
        topicId: "arrays",
      }),
    });
    assert.notEqual(
      chatRes.status,
      500,
      "POST /api/salaar/chat for Remove Element must never return unhandled HTTP 500",
    );
    const chatPayload = (await chatRes.json()) as {
      reply?: string;
      code?: string;
      error?: string;
    };
    if (chatRes.status === 200) {
      assert.ok(chatPayload.reply && chatPayload.reply.length > 10);
      console.log("   ✓ Dev server POST /api/salaar/chat returned live AI reply (200).");
    } else {
      assert.ok(
        chatRes.status === 503 || chatRes.status === 502,
        `Expected 503 or 502 when key missing/upstream error, got ${chatRes.status}`,
      );
      assert.ok(
        chatPayload.code === "AI_KEY_MISSING" || chatPayload.code === "AI_UPSTREAM_ERROR",
      );
      console.log(`   ✓ Dev server POST /api/salaar/chat returned structured ${chatRes.status} ${chatPayload.code} (never 500).`);
    }

    // 2D. Playwright Browser E2E Verification at 1280px & 390px
    console.log("3. Running Playwright UI checks at 1280px and 390px...");
    let browser;
    try {
      browser = await chromium.launch({ headless: true, channel: "chrome" });
    } catch {
      browser = await chromium.launch({
        headless: true,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      });
    }

    const page = await browser.newPage({ viewport: { width: 1280, height: 850 } });
    await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
    await page.click("button:has-text('Continue as a guest')");
    await page.waitForURL("**/dashboard");

    // Navigate via Sidebar link to SALAAR AI
    await page.click("a.side-link:has-text('SALAAR AI')");
    await page.waitForURL("**/salaar");
    await page.waitForTimeout(700);

    // Check Prabhas portrait rendered cleanly
    const avatarLoaded = await page.locator("img[alt='SALAAR AI Learning Agent']").evaluate(
      (img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0,
    );
    assert.equal(avatarLoaded, true, "SALAAR Prabhas portrait must load properly");

    // Screenshot Dashboard 1280px
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "salaar-dashboard-1280px.png"),
      fullPage: false,
    });

    // Switch to AI Tutor Chat tab
    await page.click("button:has-text('AI Tutor Chat')");
    await page.waitForTimeout(400);
    await page.click("button:has-text('Aptitude Mode')");
    await page.waitForTimeout(200);
    await page.click("button:has-text('DSA Mode')");
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "salaar-chat-1280px.png"),
      fullPage: false,
    });

    // Switch to Practice System tab & interact with Hint-first + Check Answer
    await page.click("button:has-text('Practice System')");
    await page.waitForTimeout(500);
    await page.click("button:has-text('Aptitude Practice')");
    await page.waitForTimeout(500);

    await page.click("button:has-text('Request Hint')");
    await page.waitForTimeout(400);
    const hintTextVisible = await page.locator("text=Hint 1").isVisible();
    assert.equal(hintTextVisible, true, "Hint 1 should appear after Request Hint");

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "salaar-practice-1280px.png"),
      fullPage: false,
    });

    // Verify 390px mobile layout has no horizontal overflow
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click("button:has-text('Learning Dashboard')");
    await page.waitForTimeout(500);
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2,
    );
    assert.equal(hasOverflow, false, "Mobile 390px must not overflow horizontally");
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "salaar-dashboard-390px.png"),
      fullPage: false,
    });

    await browser.close();
    console.log("   ✓ Browser UI & mobile layout verification passed.");
  } finally {
    await server.close();
  }

  // Verify compiled Vite preview server API middleware when dist/ is present
  const distDir = path.resolve(process.cwd(), "dist");
  if (fs.existsSync(distDir)) {
    const previewServer = await preview({ preview: { port: 4193 } });
    try {
      const prevRes = await fetch("http://localhost:4193/api/salaar/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: 'Help me understand "Remove Element" in Arrays.',
          mode: "dsa",
          action: "chat",
        }),
      });
      assert.notEqual(prevRes.status, 500, "Preview server /api/salaar/chat must not return 500");
      console.log(`   ✓ Vite preview /api/salaar/chat check passed (HTTP ${prevRes.status}).`);
    } finally {
      previewServer.httpServer.close();
    }
  }

  // Verify no AI API secrets or env reads ever leaked into dist/ (if dist exists)
  const distAssets = path.resolve(process.cwd(), "dist/assets");
  if (fs.existsSync(distAssets)) {
    for (const f of fs.readdirSync(distAssets)) {
      if (!f.endsWith(".js")) continue;
      const content = fs.readFileSync(path.join(distAssets, f), "utf8");
      assert.equal(content.includes("AIzaSy"), false, "Frontend bundle must never contain Gemini secret key");
      assert.equal(content.includes("gsk_"), false, "Frontend bundle must never contain Groq secret key");
      assert.equal(content.includes("process.env.GEMINI_API_KEY"), false, "Frontend bundle must never read process.env.GEMINI_API_KEY");
      assert.equal(content.includes("import.meta.env.GEMINI_API_KEY"), false, "Frontend bundle must never read import.meta.env.GEMINI_API_KEY");
      assert.equal(content.includes("SUPABASE_SERVICE_ROLE_KEY"), false, "Frontend bundle must never reference service_role key");
    }
    console.log("   ✓ Confirmed zero AI secret keys or env reads in frontend bundle.");
  }
}

async function main() {
  testStreakUtils();
  await testBackendResilience();
  await testApiEndpointsAndPlaywright();
  console.log("\n✓ ALL SALAAR VERIFICATION CHECKS PASSED!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
