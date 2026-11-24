// scripts/check-contrast.ts
// WCAG AA Contrast Ratio Checker for CodeCrex design tokens (Strictly Monochrome Light Mode)

interface ContrastPair {
  fgToken: string;
  bgToken: string;
  fgHex: string;
  bgHex: string;
  ratio: number;
  passes: boolean;
}

const tokens: Record<string, string> = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  "surface-2": "#F5F5F5",
  "surface-3": "#EAEAEA",
  border: "#D4D4D4",
  "border-strong": "#0A0A0A",
  ink: "#0A0A0A",
  "ink-2": "#262626",
  muted: "#5C5C5C",
  accent: "#0A0A0A",
  "accent-hover": "#262626",
  "on-accent": "#FFFFFF",
  "accent-text": "#0A0A0A",
  "accent-soft": "#F0F0F0",
  "inverse-bg": "#0A0A0A",
  "inverse-ink": "#FFFFFF",
  "inverse-muted": "#BDBDBD",
  ember: "#0A0A0A",
  "on-ember": "#FFFFFF",
  success: "#262626",
  "on-success": "#FFFFFF",
  "success-text": "#0A0A0A",
  "success-soft": "#EDEDED",
  warning: "#6B6B6B",
  "on-warning": "#FFFFFF",
  "warning-text": "#404040",
  "warning-soft": "#F2F2F2",
  danger: "#0A0A0A",
  "on-danger": "#FFFFFF",
  "danger-text": "#0A0A0A",
  "danger-soft": "#FFFFFF",
};

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return [r, g, b];
}

function getLuminance(rgb: [number, number, number]): number {
  const a = rgb.map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

const requiredPairs: [string, string][] = [
  ["ink", "bg"],
  ["ink-2", "surface"],
  ["muted", "surface"],
  ["muted", "surface-2"],
  ["on-accent", "accent"],
  ["inverse-ink", "inverse-bg"],
  ["inverse-muted", "inverse-bg"],
  ["on-success", "success"],
  ["on-warning", "warning"],
  ["success-text", "success-soft"],
  ["warning-text", "warning-soft"],
];

function checkTokens(): { passesAll: boolean; pairs: ContrastPair[] } {
  let passesAll = true;
  const pairs: ContrastPair[] = [];

  for (const [fg, bg] of requiredPairs) {
    const fgHex = tokens[fg];
    const bgHex = tokens[bg];
    if (!fgHex || !bgHex) {
      console.error(`Missing token: ${fg} or ${bg}`);
      passesAll = false;
      continue;
    }
    const ratio = getContrastRatio(fgHex, bgHex);
    const passes = ratio >= 4.5;
    if (!passes) {
      passesAll = false;
    }
    pairs.push({
      fgToken: fg,
      bgToken: bg,
      fgHex,
      bgHex,
      ratio,
      passes,
    });
  }

  return { passesAll, pairs };
}

function runAudit() {
  console.log("═".repeat(76));
  console.log("     CODECREX MONOCHROME WCAG AA (>= 4.5:1) CONTRAST AUDIT (LIGHT ONLY)     ");
  console.log("═".repeat(76));
  console.log("");

  const { passesAll, pairs } = checkTokens();

  console.log("No.  | Foreground   | Background   | FG Hex  | BG Hex  | Ratio   | Status");
  console.log("-----+--------------+--------------+---------+---------+---------+-------");
  pairs.forEach((p, idx) => {
    const num = String(idx + 1).padStart(3, " ");
    const fg = p.fgToken.padEnd(12, " ");
    const bg = p.bgToken.padEnd(12, " ");
    const fgH = p.fgHex.padEnd(7, " ");
    const bgH = p.bgHex.padEnd(7, " ");
    const ratioStr = `${p.ratio.toFixed(2)}:1`.padEnd(7, " ");
    const status = p.passes ? "✓ PASS" : "✗ FAIL";
    console.log(`${num}  | ${fg} | ${bg} | ${fgH} | ${bgH} | ${ratioStr} | ${status}`);
  });
  console.log("");

  if (passesAll) {
    console.log("PASS: All required token pairs satisfy WCAG AA contrast (>= 4.5:1)!\n");
    process.exit(0);
  } else {
    console.error("FAIL: One or more token pairs failed WCAG AA contrast!\n");
    process.exit(1);
  }
}

runAudit();
