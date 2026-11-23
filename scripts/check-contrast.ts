// scripts/check-contrast.ts
// WCAG AA Contrast Ratio Checker for CodeCrex design tokens in Light & Dark modes

interface ColorTheme {
  name: string;
  tokens: Record<string, string>;
}

const lightTheme: ColorTheme = {
  name: "Light Theme (Beige Sky)",
  tokens: {
    bg: "#F5EEDC",
    surface: "#FBF7EC",
    "surface-2": "#EBE1CA",
    "surface-3": "#DED1B2",
    ink: "#1D2A33",
    "ink-2": "#3B4A55",
    muted: "#56636B",
    border: "#D8CCAE",
    accent: "#4FB3E8",
    "accent-hover": "#38A0DA",
    "on-accent": "#0B2433",
    "accent-text": "#0A6399",
    "accent-soft": "#D4EAF7",
    ember: "#E8892B",
    "on-ember": "#2A1704",
    success: "#2A7F52",
    "on-success": "#FFFFFF",
    "success-text": "#1F6B42",
    "success-soft": "#D9EBDD",
    warning: "#A86A0B",
    "warning-text": "#7A4A00",
    "warning-soft": "#F4E2B8",
    danger: "#B3362F",
    "danger-text": "#9E231C",
    "danger-soft": "#F5D6D2",
  },
};

const darkTheme: ColorTheme = {
  name: "Dark Theme (Midnight Beige)",
  tokens: {
    bg: "#0E1A22",
    surface: "#15242E",
    "surface-2": "#1D303C",
    "surface-3": "#263C4A",
    ink: "#F3EBD8",
    "ink-2": "#CFC6B1",
    muted: "#9CA7AD",
    border: "#2F4756",
    accent: "#5CC0F2",
    "accent-hover": "#7ACCF5",
    "on-accent": "#08202F",
    "accent-text": "#8AD3F7",
    "accent-soft": "#123347",
    ember: "#F5A03C",
    "on-ember": "#1F1204",
    success: "#6FCB95",
    "on-success": "#0A2315",
    "success-text": "#8FDDB0",
    "success-soft": "#17342A",
    warning: "#E8B04A",
    "on-warning": "#261A02",
    "warning-text": "#F5C768",
    "warning-soft": "#3A2E14",
    danger: "#F08080",
    "on-danger": "#2A0B0D",
    "danger-text": "#F89B9B",
    "danger-soft": "#3A1C1E",
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
console.log("                 CODECREX WCAG AA (>= 4.5:1) CONTRAST AUDIT                 ");
console.log("════════════════════════════════════════════════════════════════════════════\n");

let allPassed = true;

const themes: ColorTheme[] = [lightTheme, darkTheme];

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
  console.log("PASS: All token pairs in Light and Dark themes satisfy WCAG AA contrast (>= 4.5:1)!\n");
  process.exit(0);
}
