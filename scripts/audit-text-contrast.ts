// scripts/audit-text-contrast.ts
// Automated DOM text & icon contrast auditor using Playwright

import { chromium, Page } from "playwright";
import { createServer } from "vite";

interface ContrastIssue {
  route: string;
  selector: string;
  parent: string;
  text: string;
  type: "text" | "svg";
  fgColor: string;
  bgColor: string;
  ratio: number;
  required: number;
}

const EVAL_SCRIPT = `
  const currentRoute = arguments[0];
  function parseRgb(colorStr) {
    if (!colorStr || colorStr === "transparent" || colorStr === "inherit") return null;
    const m = colorStr.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
    if (m) {
      return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), m[4] !== undefined ? parseFloat(m[4]) : 1];
    }
    return null;
  }

  function getLuminance(r, g, b) {
    const a = [r / 255, g / 255, b / 255].map((val) =>
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function calcRatio(fg, bg) {
    const lFg = getLuminance(fg[0], fg[1], fg[2]);
    const lBg = getLuminance(bg[0], bg[1], bg[2]);
    const brighter = Math.max(lFg, lBg);
    const darker = Math.min(lFg, lBg);
    return (brighter + 0.05) / (darker + 0.05);
  }

  function blend(fg, bg) {
    const alpha = fg[3];
    return [
      Math.round(fg[0] * alpha + bg[0] * (1 - alpha)),
      Math.round(fg[1] * alpha + bg[1] * (1 - alpha)),
      Math.round(fg[2] * alpha + bg[2] * (1 - alpha)),
    ];
  }

  function getEffectiveBackground(el) {
    let cur = el;
    let bg = [255, 255, 255]; // default white root

    const layers = [];
    while (cur && cur !== document.documentElement) {
      const style = window.getComputedStyle(cur);
      const parsed = parseRgb(style.backgroundColor);
      if (parsed && parsed[3] > 0) {
        layers.unshift(parsed);
        if (parsed[3] >= 0.99) break; // opaque layer found
      }
      cur = cur.parentElement;
    }

    for (const layer of layers) {
      bg = blend(layer, bg);
    }
    return bg;
  }

  function getSelector(el) {
    if (el.id) return "#" + el.id;
    const className = typeof el.className === "string" ? el.className.trim().split(/\\s+/).slice(0, 2).join(".") : "";
    const tag = el.tagName.toLowerCase();
    return className ? tag + "." + className : tag;
  }

  function getParentSelector(el) {
    const p = el.parentElement;
    if (!p) return "null";
    const className = typeof p.className === "string" ? p.className.trim().split(/\\s+/).slice(0, 2).join(".") : "";
    const tag = p.tagName.toLowerCase();
    return className ? tag + "." + className : tag;
  }

  const issues = [];
  const elements = Array.from(document.querySelectorAll("*"));

  for (const el of elements) {
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) < 0.1) {
      continue;
    }

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    // 1. Text check
    const directText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.textContent ? n.textContent.trim() : "")
      .join(" ")
      .trim();

    if (directText.length > 0) {
      const fgParsed = parseRgb(style.color);
      if (fgParsed) {
        const bgRgb = getEffectiveBackground(el);
        const fgRgb = fgParsed[3] < 1 ? blend(fgParsed, bgRgb) : [fgParsed[0], fgParsed[1], fgParsed[2]];
        const ratio = calcRatio(fgRgb, bgRgb);

        const fontSize = parseFloat(style.fontSize);
        const fontWeight = parseInt(style.fontWeight, 10) || 400;
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
        const required = isLarge ? 3.0 : 4.5;

        if (ratio < required) {
          issues.push({
            route: currentRoute,
            selector: getSelector(el),
            parent: getParentSelector(el),
            text: directText.slice(0, 40),
            type: "text",
            fgColor: "rgb(" + fgRgb.join(",") + ")",
            bgColor: "rgb(" + bgRgb.join(",") + ")",
            ratio: Math.round(ratio * 100) / 100,
            required,
          });
        }
      }
    }

    // 2. SVG Icon check
    if (el.tagName.toLowerCase() === "svg") {
      const bgRgb = getEffectiveBackground(el);
      const stroke = parseRgb(style.stroke);
      const fill = parseRgb(style.fill);

      const iconColor = stroke && stroke[3] > 0 ? stroke : fill && fill[3] > 0 ? fill : parseRgb(style.color);
      if (iconColor && iconColor[3] > 0) {
        const fgRgb = iconColor[3] < 1 ? blend(iconColor, bgRgb) : [iconColor[0], iconColor[1], iconColor[2]];
        const ratio = calcRatio(fgRgb, bgRgb);
        const required = 3.0;

        if (ratio < required) {
          issues.push({
            route: currentRoute,
            selector: getSelector(el),
            parent: getParentSelector(el),
            text: "<svg icon>",
            type: "svg",
            fgColor: "rgb(" + fgRgb.join(",") + ")",
            bgColor: "rgb(" + bgRgb.join(",") + ")",
            ratio: Math.round(ratio * 100) / 100,
            required,
          });
        }
      }
    }
  }

  return issues;
`;

async function auditPage(page: Page, route: string): Promise<ContrastIssue[]> {
  return await page.evaluate(new Function(EVAL_SCRIPT) as any, route);
}

async function main() {
  console.log("Starting Vite dev server for contrast audit...");
  const server = await createServer({
    server: { port: 5174 },
  });
  await server.listen();
  console.log("Vite dev server running on http://localhost:5174");

  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "chrome" });
  } catch {
    try {
      browser = await chromium.launch({
        headless: true,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      });
    } catch {
      browser = await chromium.launch({ headless: true });
    }
  }

  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const allIssues: ContrastIssue[] = [];

  try {
    // 1. Audit public routes (Landing, Login, Signup)
    const publicRoutes = ["/", "/login", "/signup"];
    for (const route of publicRoutes) {
      console.log(`Auditing ${route}...`);
      await page.goto(`http://localhost:5174${route}`, { waitUntil: "networkidle" });
      const issues = await auditPage(page, route);
      allIssues.push(...issues);
    }

    // 2. Set guest session via Login page
    console.log("Setting up guest session via /login...");
    await page.goto("http://localhost:5174/login", { waitUntil: "networkidle" });
    const guestBtn = page.locator("button:has-text('Continue as a guest')");
    if (await guestBtn.isVisible()) {
      await guestBtn.click();
      await page.waitForURL("**/dashboard", { timeout: 10000 });
      console.log("Guest session active on /dashboard");
    }

    // 3. Audit authenticated / guest routes
    const authRoutes = [
      "/dashboard",
      "/dsa",
      "/dsa/arrays",
      "/aptitude",
      "/aptitude/percentages",
      "/aptitude/percentages/test",
      "/streak",
      "/profile",
    ];

    for (const route of authRoutes) {
      console.log(`Auditing ${route}...`);
      await page.goto(`http://localhost:5174${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600); // allow animations
      const issues = await auditPage(page, route);
      allIssues.push(...issues);
    }

    // 4. Test Result Page audit
    console.log("Auditing test result page...");
    await page.goto("http://localhost:5174/aptitude/percentages/test", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const optionBtn = page.locator(".answer-option").first();
    if (await optionBtn.isVisible()) {
      await optionBtn.click();
      const submitBtn = page.locator("button:has-text('Submit test'), button:has-text('Finish test'), button:has-text('Submit')").first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        await page.waitForTimeout(1000);
        const resultIssues = await auditPage(page, "/aptitude/percentages/test (result)");
        allIssues.push(...resultIssues);
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log("\n" + "=".repeat(80));
  console.log("                  PLAYWRIGHT DOM CONTRAST AUDIT RESULTS");
  console.log("=".repeat(80));

  if (allIssues.length === 0) {
    console.log("\n✓ PASS: No low-contrast text or icons found across all audited routes!\n");
    process.exit(0);
  } else {
    console.log(`\n✗ FAIL: Found ${allIssues.length} contrast issue(s):\n`);
    console.log("Route                       | Selector             | Parent               | Ratio   | Req   | Text snippet");
    console.log("----------------------------+----------------------+----------------------+---------+-------+-------------------------");
    for (const iss of allIssues) {
      const r = iss.route.padEnd(27, " ");
      const s = iss.selector.slice(0, 20).padEnd(20, " ");
      const p = iss.parent.slice(0, 20).padEnd(20, " ");
      const rat = `${iss.ratio}:1`.padEnd(7, " ");
      const req = `${iss.required}:1`.padEnd(5, " ");
      console.log(`${r} | ${s} | ${p} | ${rat} | ${req} | "${iss.text}"`);
    }
    console.log("");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error running contrast audit:", err);
  process.exit(1);
});
