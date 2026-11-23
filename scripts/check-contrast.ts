// scripts/check-contrast.ts
// WCAG AA Contrast Ratio Checker for CodeCrex design tokens in Light & Dark modes

interface ColorTheme {
  name: string;
  tokens: Record<string, string>;
}

const lightTheme: ColorTheme = {
  name: "Light Theme (Crisp Sand Beige + Sky Blue)",
  tokens: {
    bg: "#F7F5F0",
    surface: "#FFFFFF",
    "surface-2": "#F0EAE1",
    "surface-3": "#E4DDD0",
    ink: "#141E28",
    "ink-2": "#334155",
    muted: "#576574",
    border: "#E2DBD0",
    accent: "#0274B6",
    "accent-hover": "#0369A1",
    "on-accent": "#FFFFFF",
    "accent-text": "#026AA7",
    "accent-soft": "#EBF4FC",
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
  name: "Dark Theme (Midnight Sky)",
  tokens: {
    bg: "#0B131B",
    surface: "#131E2A",
    "surface-2": "#1A2837",
    "surface-3": "#233444",
    ink: "#F0F4F8",
    "ink-2": "#CAD4DF",
    muted: "#8B9BAC",
    border: "#243545",
    accent: "#38BDF8",
    "accent-hover": "#60A5FA",
    "on-accent": "#08202F",
    "accent-text": "#7DD3FC",
    "accent-soft": "#0F2A42",
    ember: "#F5A03C",
    "on-ember": "#1F1204",
    success: "#4ADE80",
    "on-success": "#052E16",
    "success-text": "#86EFAC",
    "success-soft": "#0F3820",
    warning: "#FBBF24",
    "on-warning": "#261A02",
    "warning-text": "#FDE68A",
    "warning-soft": "#382A0F",
    danger: "#F87171",
    "on-danger": "#2A0B0D",
    "danger-text": "#FCA5A5",
    "danger-soft": "#381515",
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
