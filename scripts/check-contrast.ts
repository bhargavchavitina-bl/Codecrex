// scripts/check-contrast.ts
// WCAG AA Contrast Ratio Checker for CodeCrest design tokens

interface ColorTheme {
  name: string;
  tokens: Record<string, string>;
}

const lightTheme: ColorTheme = {
  name: "Light Theme",
  tokens: {
    bg: "#F1E7D3",
    surface: "#FAF5EA",
    "surface-2": "#E9DDC4",
    "surface-3": "#DFD0B2",
    ink: "#1A1610",
    "ink-2": "#3E362B",
    muted: "#5B5246",
    border: "#D9CBB0",
    accent: "#B5442A",
    "accent-hover": "#9A3722",
    "on-accent": "#FFF8EE",
    "accent-text": "#9A3722",
    "accent-soft": "#F4D9CE",
    ember: "#B84E0F",
    "on-ember": "#FFF8EE",
    success: "#2E7D47",
    "on-success": "#F0FBF3",
    "success-text": "#1E5E33",
    "success-soft": "#D6EEDD",
    warning: "#A8620A",
    "warning-text": "#844700",
    "warning-soft": "#F7E7CD",
    danger: "#B3261E",
    "danger-text": "#A8201A",
    "danger-soft": "#F9D8D6",
  },
};



const checkPairs: [string, string][] = [
  ["ink", "bg"],
  ["ink", "surface"],
  ["ink-2", "surface"],
  ["muted", "surface"],
  ["muted", "bg"],
  ["accent-text", "bg"],
  ["accent-text", "surface"],
  ["on-accent", "accent"],
  ["on-accent", "accent-hover"],
  ["on-ember", "ember"],
  ["on-success", "success"],
  ["success-text", "success-soft"],
  ["accent-text", "accent-soft"],
  ["ink-2", "surface-2"],
  ["muted", "surface-2"],
  ["warning-text", "warning-soft"],
  ["danger-text", "danger-soft"],
];

function sRGBtoLin(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (bright + 0.05) / (dark + 0.05);
}

console.log("════════════════════════════════════════════════════════════════════════════");
console.log("                CODECREST WCAG AA (>= 4.5:1) CONTRAST AUDIT                 ");
console.log("════════════════════════════════════════════════════════════════════════════\n");

let allPassed = true;

const themes: ColorTheme[] = [lightTheme];

for (const theme of themes) {
  console.log(`--- ${theme.name.toUpperCase()} ---`);
  console.log("No.  | Foreground   | Background   | FG Hex  | BG Hex  | Ratio   | Status");
  console.log("-----+--------------+--------------+---------+---------+---------+-------");

  checkPairs.forEach(([fgName, bgName], idx) => {
    const fgHex = theme.tokens[fgName];
    const bgHex = theme.tokens[bgName];

    if (!fgHex || !bgHex) {
      console.error(`Missing token definition for ${fgName} or ${bgName}`);
      allPassed = false;
      return;
    }

    const ratio = getContrastRatio(fgHex, bgHex);
    const passed = ratio >= 4.5;
    if (!passed) allPassed = false;

    const num = String(idx + 1).padStart(3, " ");
    const fg = fgName.padEnd(12, " ");
    const bg = bgName.padEnd(12, " ");
    const rStr = `${ratio.toFixed(2)}:1`.padEnd(7, " ");
    const status = passed ? "✓ PASS" : "✗ FAIL";

    console.log(`${num}  | ${fg} | ${bg} | ${fgHex} | ${bgHex} | ${rStr} | ${status}`);
  });
  console.log("");
}

if (!allPassed) {
  console.error("FAIL: One or more token pairs failed WCAG AA 4.5:1 contrast requirement!\n");
  process.exit(1);
} else {
  console.log("PASS: All 17 token pairs satisfy WCAG AA contrast (>= 4.5:1)!\n");
  process.exit(0);
}
