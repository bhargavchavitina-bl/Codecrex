import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { topics } from "../src/data/topics.ts";
import { problems, type Problem } from "../src/data/problems.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outlinePath = path.join(__dirname, "..", "src", "data", "seed-outline.md");

export function checkData(verbose = true) {
  let hasErrors = false;
  const errors: string[] = [];
  const warnings: string[] = [];

  const topicIds = new Set(topics.map((t) => t.id));
  const topicMap = new Map(topics.map((t) => [t.id, t]));

  // Helper to get all topics a problem belongs to
  const getProblemTopics = (p: Problem & { topicIds?: string[] }): string[] => {
    if (p.topicIds && p.topicIds.length > 0) return p.topicIds;
    return p.topicId ? [p.topicId] : [];
  };

  // Helper to get pattern for a specific topic
  const getPatternForTopic = (
    p: Problem & { patternByTopic?: Record<string, string> },
    topicId: string,
  ): string => {
    if (p.patternByTopic && p.patternByTopic[topicId]) {
      return p.patternByTopic[topicId];
    }
    return p.pattern;
  };

  if (verbose) {
    console.log("════════════════════════════════════════════════════════════");
    console.log("                  CODECREST DATA AUDIT REPORT               ");
    console.log("════════════════════════════════════════════════════════════\n");
  }

  // 1. Topic counts & Pattern counts
  const topicStats: Record<
    string,
    { name: string; total: number; patterns: Record<string, number> }
  > = {};

  for (const topic of topics) {
    const patMap: Record<string, number> = {};
    for (const pat of topic.patterns) {
      patMap[pat.name] = 0;
    }
    topicStats[topic.id] = {
      name: topic.name,
      total: 0,
      patterns: patMap,
    };
  }

  // Count problems per topic and pattern
  for (const p of problems) {
    const pTopics = getProblemTopics(p);
    for (const tid of pTopics) {
      if (!topicStats[tid]) continue;
      topicStats[tid].total++;
      const pat = getPatternForTopic(p, tid);
      topicStats[tid].patterns[pat] = (topicStats[tid].patterns[pat] || 0) + 1;
    }
  }

  if (verbose) {
    console.log("--- 1. TOPIC & PATTERN BREAKDOWN ---");
    for (const [tid, stat] of Object.entries(topicStats)) {
      console.log(`\n• ${stat.name} (id: ${tid}) — Total Problems: ${stat.total}`);
      for (const [patName, count] of Object.entries(stat.patterns)) {
        const flag = count === 0 ? " [EMPTY]" : "";
        console.log(`    - [${count}] ${patName}${flag}`);
      }
    }
    console.log("\n------------------------------------------------------------");
  }

  // 2. Problems with invalid topicIds
  for (const p of problems) {
    const pTopics = getProblemTopics(p);
    if (pTopics.length === 0) {
      errors.push(`Problem "${p.title}" (${p.id}) has no topicId or topicIds.`);
      hasErrors = true;
    }
    for (const tid of pTopics) {
      if (!topicIds.has(tid)) {
        errors.push(`Problem "${p.title}" (${p.id}) references unknown topic "${tid}".`);
        hasErrors = true;
      }
    }
  }

  // 3. Problems whose pattern is not defined for their topic
  for (const p of problems) {
    const pTopics = getProblemTopics(p);
    for (const tid of pTopics) {
      const topic = topicMap.get(tid);
      if (!topic) continue;
      const expectedPatterns = new Set(topic.patterns.map((item) => item.name));
      const problemPattern = getPatternForTopic(p, tid);
      if (!expectedPatterns.has(problemPattern)) {
        warnings.push(
          `Problem "${p.title}" (${p.id}) in topic "${tid}" has pattern "${problemPattern}" which is not in topic's defined patterns [${Array.from(expectedPatterns).join(", ")}].`,
        );
      }
    }
  }

  // 4. Topics or patterns with zero problems
  for (const [tid, stat] of Object.entries(topicStats)) {
    if (stat.total === 0) {
      errors.push(`Topic "${stat.name}" (id: ${tid}) has ZERO problems!`);
      hasErrors = true;
    }
    for (const [patName, count] of Object.entries(stat.patterns)) {
      if (count === 0) {
        warnings.push(`Pattern "${patName}" in topic "${stat.name}" (${tid}) has 0 problems.`);
      }
    }
  }

  // 5. Duplicate problem IDs and slugs
  const idCounts = new Map<string, string[]>();
  const slugCounts = new Map<string, string[]>();

  for (const p of problems) {
    if (!idCounts.has(p.id)) idCounts.set(p.id, []);
    idCounts.get(p.id)!.push(p.title);

    if (!slugCounts.has(p.leetcodeSlug)) slugCounts.set(p.leetcodeSlug, []);
    slugCounts.get(p.leetcodeSlug)!.push(p.title);
  }

  for (const [id, titles] of idCounts.entries()) {
    if (titles.length > 1) {
      errors.push(`Duplicate problem ID "${id}" used across: ${titles.join(", ")}`);
      hasErrors = true;
    }
  }

  for (const [slug, titles] of slugCounts.entries()) {
    if (titles.length > 1) {
      warnings.push(`Duplicate LeetCode slug "${slug}" used across: ${titles.join(", ")}`);
    }
  }

  // 6. Check outline expectations
  if (fs.existsSync(outlinePath)) {
    const outlineText = fs.readFileSync(outlinePath, "utf8");
    const slugMatches = outlineText.matchAll(/\(`([a-z0-9-]+)`\)/g);
    const outlineSlugs = new Set(Array.from(slugMatches).map((m) => m[1]));

    const existingSlugs = new Set(problems.map((p) => p.leetcodeSlug));
    for (const reqSlug of outlineSlugs) {
      if (!existingSlugs.has(reqSlug)) {
        warnings.push(`Problem with slug "${reqSlug}" from seed-outline.md is missing from problems.ts`);
      }
    }
  }

  if (verbose) {
    if (warnings.length > 0) {
      console.log(`\n--- WARNINGS (${warnings.length}) ---`);
      warnings.forEach((w) => console.log(`• ${w}`));
    }
    if (errors.length > 0) {
      console.log(`\n--- ERRORS (${errors.length}) ---`);
      errors.forEach((e) => console.log(`✖ ${e}`));
    }
    console.log("\n════════════════════════════════════════════════════════════");
    if (hasErrors) {
      console.error("FAIL: Data check found critical errors.");
    } else {
      console.log("PASS: Data check completed successfully!");
    }
    console.log("════════════════════════════════════════════════════════════\n");
  }

  return { hasErrors, errors, warnings };
}

if (process.argv[1] && process.argv[1].includes("check-data")) {
  const { hasErrors } = checkData(true);
  if (hasErrors) {
    process.exit(1);
  }
}
