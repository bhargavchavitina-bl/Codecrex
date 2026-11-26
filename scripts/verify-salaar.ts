// scripts/verify-salaar.ts
// Verifies SALAAR streak math, API routes, security boundaries, and UI at 1280px & 390px.

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { createServer } from "vite";
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
  await testApiEndpointsAndPlaywright();
  console.log("\n✓ ALL SALAAR VERIFICATION CHECKS PASSED!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
