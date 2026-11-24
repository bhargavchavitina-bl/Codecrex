// scripts/verify-assertions.ts
import { chromium } from "playwright";
import { createServer } from "vite";

async function main() {
  const server = await createServer({ server: { port: 5188 } });
  await server.listen();
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

  // 1. Landing
  await page.goto("http://localhost:5188/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  const greetingEl = page.locator(".preview-top b");
  const greetingText = await greetingEl.innerText();
  const emojiAttrs = await page.locator(".preview-top b span").evaluate((el) => ({
    text: el.textContent,
    role: el.getAttribute("role"),
    label: el.getAttribute("aria-label"),
  }));
  const avatar = await page.locator(".preview-avatar").innerText();
  const subtitle = await page.locator(".preview-top small").innerText();
  const pill = await page.locator(".preview-stats em").innerText();

  console.log("=== LANDING VERIFICATION ===");
  console.log("Greeting:", greetingText);
  console.log("Emoji:", JSON.stringify(emojiAttrs));
  console.log("Avatar:", avatar);
  console.log("Subtitle:", subtitle);
  console.log("Pill:", pill);

  // Check overlap of float-card-bottom and preview-next
  const boxFloat = await page.locator(".float-card-bottom").boundingBox();
  const boxNext = await page.locator(".preview-next").boundingBox();
  if (boxFloat && boxNext) {
    const overlap = !(
      boxFloat.x + boxFloat.width < boxNext.x ||
      boxNext.x + boxNext.width < boxFloat.x ||
      boxFloat.y + boxFloat.height < boxNext.y ||
      boxNext.y + boxNext.height < boxFloat.y
    );
    console.log("Overlap between float-card-bottom and preview-next at 1280px:", overlap);
  }

  // Setup guest
  await page.goto("http://localhost:5188/login", { waitUntil: "domcontentloaded" });
  await page.click("button:has-text('Continue as a guest')");
  await page.waitForURL("**/dashboard");

  // 2. Dashboard
  const dashMotto = await page.locator(".dashboard-welcome p").innerText();
  const potdEyebrow = await page.locator(".potd-copy .eyebrow").evaluate((el) => ({
    text: el.textContent?.trim(),
    bg: window.getComputedStyle(el).backgroundColor,
  }));
  console.log("\n=== DASHBOARD VERIFICATION ===");
  console.log("Motto:", dashMotto);
  console.log("POTD Eyebrow:", JSON.stringify(potdEyebrow));

  // 3. DSA Roadmap
  await page.goto("http://localhost:5188/dsa", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const dsaSubtitle = await page.locator(".page-head p").innerText();
  const diffAria = await page.locator(".diff-breakdown").getAttribute("aria-label");
  const topicDiffAria = await page.locator(".topic-diff").first().getAttribute("aria-label");
  const topicDiffText = await page.locator(".topic-diff").first().innerText();

  console.log("\n=== DSA ROADMAP VERIFICATION ===");
  console.log("DSA Subtitle:", dsaSubtitle);
  console.log("Overall Breakdown aria-label:", diffAria);
  console.log("Topic Diff aria-label:", topicDiffAria);
  console.log("Topic Diff visible text:", JSON.stringify(topicDiffText));

  // 4. Mobile Check at 390px
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:5188/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const floatVisible = await page.locator(".float-card-bottom").isVisible();
  console.log("\n=== MOBILE (390px) VERIFICATION ===");
  console.log("Float card visible on mobile:", floatVisible);

  await browser.close();
  await server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
