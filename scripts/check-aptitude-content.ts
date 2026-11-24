// scripts/check-aptitude-content.ts
// Validates comprehensive aptitude topic data for CodeCrex

import { allAptitudeTopics } from "../src/data/aptitude/index";
import type { AptitudeTopicData } from "../src/data/aptitude/types";

function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+(?:\.\d+)?/g);
  if (!matches) return [];
  return matches.map(Number);
}

function validateTopic(topic: AptitudeTopicData, allIds: Set<string>): string[] {
  const errors: string[] = [];
  const tid = topic.id || "UNKNOWN";

  if (!topic.id || typeof topic.id !== "string") {
    errors.push(`[${tid}] Missing or invalid id.`);
  }
  if (!topic.title || typeof topic.title !== "string") {
    errors.push(`[${tid}] Missing or invalid title.`);
  }
  if (!topic.group || !["quantitative", "logical", "verbal", "interview"].includes(topic.group)) {
    errors.push(`[${tid}] Invalid group: ${topic.group}`);
  }
  if (!topic.summary || topic.summary.length < 15) {
    errors.push(`[${tid}] Summary is too short or missing.`);
  }

  // Context
  if (!topic.context) {
    errors.push(`[${tid}] Missing context object.`);
  } else {
    if (!topic.context.whyItMatters) errors.push(`[${tid}] Missing context.whyItMatters.`);
    if (!topic.context.whereItAppears) errors.push(`[${tid}] Missing context.whereItAppears.`);
    if (!Array.isArray(topic.context.prerequisites)) errors.push(`[${tid}] context.prerequisites must be an array.`);
    if (!topic.context.targetTimePerQuestion) errors.push(`[${tid}] Missing context.targetTimePerQuestion.`);
    if (!["Easy", "Medium", "Hard"].includes(topic.context.difficultyLevel)) {
      errors.push(`[${tid}] Invalid context.difficultyLevel: ${topic.context.difficultyLevel}`);
    }
  }

  // Key concepts
  if (!Array.isArray(topic.keyConcepts) || topic.keyConcepts.length < 3) {
    errors.push(`[${tid}] keyConcepts must have at least 3 items (found ${topic.keyConcepts?.length || 0}).`);
  } else {
    topic.keyConcepts.forEach((kc, i) => {
      if (!kc.term || !kc.definition) errors.push(`[${tid}] keyConcept #${i + 1} missing term or definition.`);
    });
  }

  // Formulas / Methods / Rules / Frameworks
  if (!Array.isArray(topic.formulas) || topic.formulas.length < 4) {
    errors.push(`[${tid}] formulas must have at least 4 items (found ${topic.formulas?.length || 0}).`);
  } else {
    topic.formulas.forEach((f, i) => {
      if (!f.label || !f.expression || !f.whenToUse) {
        errors.push(`[${tid}] formula #${i + 1} missing label, expression, or whenToUse.`);
      }
    });
  }

  // Shortcuts
  if (!Array.isArray(topic.shortcuts) || topic.shortcuts.length < 3) {
    errors.push(`[${tid}] shortcuts must have at least 3 items (found ${topic.shortcuts?.length || 0}).`);
  } else {
    topic.shortcuts.forEach((sc, i) => {
      if (!sc.trick || !sc.whenItWorks) errors.push(`[${tid}] shortcut #${i + 1} missing trick or whenItWorks.`);
    });
  }

  // Common traps
  if (!Array.isArray(topic.commonTraps) || topic.commonTraps.length < 3) {
    errors.push(`[${tid}] commonTraps must have at least 3 items (found ${topic.commonTraps?.length || 0}).`);
  } else {
    topic.commonTraps.forEach((trap, i) => {
      if (!trap.mistake || !trap.fix) errors.push(`[${tid}] trap #${i + 1} missing mistake or fix.`);
    });
  }

  // Worked examples
  if (!Array.isArray(topic.workedExamples) || topic.workedExamples.length < 5) {
    errors.push(`[${tid}] workedExamples must have at least 5 items (found ${topic.workedExamples?.length || 0}).`);
  } else {
    topic.workedExamples.forEach((ex, i) => {
      if (!ex.question) errors.push(`[${tid}] workedExample #${i + 1} missing question.`);
      if (!Array.isArray(ex.steps) || ex.steps.length === 0) {
        errors.push(`[${tid}] workedExample #${i + 1} missing steps.`);
      }
      if (!ex.answer) errors.push(`[${tid}] workedExample #${i + 1} missing answer.`);

      // Check() validation
      if (typeof ex.check === "function") {
        try {
          const val = ex.check();
          if (typeof val !== "number" || isNaN(val)) {
            errors.push(`[${tid}] workedExample #${i + 1} check() did not return a valid number.`);
          } else {
            const answerNumbers = extractNumbers(ex.answer);
            const roundedVal = Math.round(val * 100) / 100;
            const matches = answerNumbers.some((num) => Math.abs(num - roundedVal) < 0.05 || Math.abs(num - val) < 0.05);
            if (!matches && answerNumbers.length > 0) {
              errors.push(
                `[${tid}] workedExample #${i + 1} check() value ${val} does not match any numeric value in answer "${ex.answer}".`
              );
            }
          }
        } catch (err) {
          errors.push(`[${tid}] workedExample #${i + 1} check() threw an error: ${(err as Error).message}`);
        }
      }
    });
  }

  // OA examples
  if (!Array.isArray(topic.oaExamples) || topic.oaExamples.length < 3) {
    errors.push(`[${tid}] oaExamples must have at least 3 items (found ${topic.oaExamples?.length || 0}).`);
  } else {
    topic.oaExamples.forEach((oa, i) => {
      if (!oa.question || !oa.answer || !Array.isArray(oa.steps)) {
        errors.push(`[${tid}] oaExample #${i + 1} missing question, steps, or answer.`);
      }
    });
  }

  // Remember this
  if (!Array.isArray(topic.rememberThis) || topic.rememberThis.length < 3 || topic.rememberThis.length > 5) {
    errors.push(
      `[${tid}] rememberThis must have between 3 and 5 items (found ${topic.rememberThis?.length || 0}).`
    );
  }

  // Related topics
  if (!Array.isArray(topic.relatedTopics)) {
    errors.push(`[${tid}] relatedTopics must be an array.`);
  } else {
    topic.relatedTopics.forEach((rel) => {
      if (!allIds.has(rel)) {
        errors.push(`[${tid}] relatedTopic "${rel}" is not a known topic id.`);
      }
    });
  }

  // Check for forbidden placeholder text: "TODO" or "lorem"
  const topicJson = JSON.stringify(topic);
  if (/TODO|lorem/i.test(topicJson)) {
    errors.push(`[${tid}] Contains forbidden placeholder text (TODO or lorem).`);
  }

  return errors;
}

function runCheck() {
  console.log("═".repeat(76));
  console.log("            CODECREX APTITUDE CONTENT COMPREHENSIVE AUDIT           ");
  console.log("═".repeat(76));
  console.log("");

  const allIds = new Set<string>();
  const duplicates: string[] = [];

  for (const t of allAptitudeTopics) {
    if (allIds.has(t.id)) {
      duplicates.push(t.id);
    }
    allIds.add(t.id);
  }

  if (duplicates.length > 0) {
    console.error(`ERROR: Duplicate topic IDs found: ${duplicates.join(", ")}`);
    process.exit(1);
  }

  console.log(`Total topics loaded: ${allAptitudeTopics.length}`);
  console.log("");

  const totalErrors: string[] = [];

  console.log("ID".padEnd(25) + " | Group        | Concepts | Formulas | Traps | Worked | OA | Rem");
  console.log("-".repeat(76));

  for (const topic of allAptitudeTopics) {
    const errs = validateTopic(topic, allIds);
    totalErrors.push(...errs);

    const idStr = topic.id.padEnd(25);
    const grpStr = topic.group.padEnd(12);
    const cStr = String(topic.keyConcepts?.length || 0).padStart(8);
    const fStr = String(topic.formulas?.length || 0).padStart(8);
    const tStr = String(topic.commonTraps?.length || 0).padStart(5);
    const wStr = String(topic.workedExamples?.length || 0).padStart(6);
    const oaStr = String(topic.oaExamples?.length || 0).padStart(2);
    const rStr = String(topic.rememberThis?.length || 0).padStart(3);

    const mark = errs.length === 0 ? "✓" : "✗";
    console.log(`${mark} ${idStr} | ${grpStr} | ${cStr} | ${fStr} | ${tStr} | ${wStr} | ${oaStr} | ${rStr}`);
  }

  console.log("-".repeat(76));

  if (totalErrors.length > 0) {
    console.log("");
    console.error(`FAILED: Found ${totalErrors.length} errors across aptitude content:`);
    totalErrors.slice(0, 30).forEach((e) => console.error(`  • ${e}`));
    if (totalErrors.length > 30) {
      console.error(`  ... and ${totalErrors.length - 30} more errors.`);
    }
    console.log("");
    process.exit(1);
  }

  console.log("\nPASS: All aptitude topics passed content integrity, count and check() audits!\n");
  process.exit(0);
}

runCheck();
