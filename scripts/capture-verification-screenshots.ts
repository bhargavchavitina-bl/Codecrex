// scripts/capture-verification-screenshots.ts
import { chromium } from "playwright";
import { createServer } from "vite";
import path from "path";

const ARTIFACT_DIR = "C:/Users/bharg/.gemini/antigravity/brain/ec9681c7-2e5a-453b-8d8a-838344da395b";

async function main() {
  const server = await createServer({
    server: { port: 5176 },
  });
  await server.listen();
  const origin = "http://localhost:5176";

  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    browser = await chromium.launch({
      headless: true,
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });
  }

  const viewports = [
    { name: "1280px", width: 1280, height: 850 },
    { name: "390px", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    // 1. Landing page
    await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `screenshot-landing-${vp.name}.png`),
      fullPage: false,
    });
    console.log(`Saved screenshot-landing-${vp.name}.png`);

    // Setup guest mode for dashboard and dsa
    await page.goto(`${origin}/login`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const guestBtn = page.locator("button:has-text('Continue as a guest')");
    if (await guestBtn.isVisible()) {
      await guestBtn.click();
      await page.waitForURL("**/dashboard", { timeout: 10000 });
    }

    // 2. Dashboard
    await page.goto(`${origin}/dashboard`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `screenshot-dashboard-${vp.name}.png`),
      fullPage: false,
    });
    console.log(`Saved screenshot-dashboard-${vp.name}.png`);

    // 3. DSA Roadmap
    await page.goto(`${origin}/dsa`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `screenshot-dsa-${vp.name}.png`),
      fullPage: false,
    });
    console.log(`Saved screenshot-dsa-${vp.name}.png`);

    await context.close();
  }

  await browser.close();
  await server.close();
  console.log("All verification screenshots captured!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
