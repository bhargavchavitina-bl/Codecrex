// scripts/check-contrast.ts
// WCAG AA Contrast Ratio Checker for CodeCrex design tokens (Light Sky-Blue + Matching Navy/Teal/Amber)

interface ContrastPair {
  fgToken: string;
  bgToken: string;
  fgHex: string;
  bgHex: string;
  ratio: number;
  passes: boolean;
}

const tokens: Record<string, string> = {
  bg: "#EDF7FF",
  surface: "#FFFFFF",
  "surface-2": "#E0F2FE",
  "surface-3": "#BAE6FD",
  border: "#B8DDF8",
  "border-strong": "#0284C7",
  ink: "#0C2340",
  "ink-2": "#1E3A5F",
  muted: "#475569",
  accent: "#67C6F7",
  "accent-hover": "#4AB8F2",
  "on-accent": "#082F49",
  "accent-text": "#0369A1",
  "accent-soft": "#E0F2FE",
  "inverse-bg": "#0C2D48",
  "inverse-ink": "#FFFFFF",
  "inverse-muted": "#BAE6FD",
  ember: "#C2410C",
  "on-ember": "#FFFFFF",
  success: "#0F766E",
  "on-success": "#FFFFFF",
  "success-text": "#0F524C",
  "success-soft": "#CCFBF1",
  warning: "#B45309",
  "on-warning": "#FFFFFF",
  "warning-text": "#78350F",
  "warning-soft": "#FEF3C7",
  danger: "#BE123C",
  "on-danger": "#FFFFFF",
  "danger-text": "#9F1239",
  "danger-soft": "#FFE4E6",
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
  ["on-accent", "accent-hover"],
  ["accent-text", "surface"],
  ["accent-text", "accent-soft"],
  ["inverse-ink", "inverse-bg"],
  ["inverse-muted", "inverse-bg"],
  ["on-ember", "ember"],
  ["on-success", "success"],
  ["on-warning", "warning"],
  ["on-danger", "danger"],
  ["success-text", "success-soft"],
  ["warning-text", "warning-soft"],
  ["danger-text", "danger-soft"],
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
  console.log("  CODECREX SKY-BLUE & MATCHING NAVY WCAG AA (>= 4.5:1) CONTRAST AUDIT    ");
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
