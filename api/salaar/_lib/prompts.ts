import type { LearningMode, SalaarDashboardProgress } from "./types.js";

export interface PromptOptions {
  mode: LearningMode;
  action: "chat" | "hint" | "reexplain" | "reveal_code" | "example" | "practice_generate";
  topic?: string;
  difficulty?: string;
  userDisplayName: string;
  dashboardContext: Pick<
    SalaarDashboardProgress,
    "streak" | "dsaSummary" | "aptitudeSummary" | "weakTopics" | "memory"
  >;
  explicitCodeRequest: boolean;
}

export function buildSalaarSystemPrompt(opts: PromptOptions): string {
  const {
    mode,
    action,
    topic,
    difficulty,
    userDisplayName,
    dashboardContext,
    explicitCodeRequest,
  } = opts;

  const { memory, streak, dsaSummary, aptitudeSummary, weakTopics } = dashboardContext;

  const weakNames =
    weakTopics.length > 0
      ? weakTopics.map((w) => `${w.topicName} (${w.category}: ${w.reason})`).join("; ")
      : "None flagged yet";

  const studiedNames =
    memory.studiedTopics.length > 0
      ? memory.studiedTopics
          .slice(0, 8)
          .map((t) => `${t.topicName} [${t.sessionsCount} sessions]`)
          .join(", ")
      : "Just getting started";

  const struggledNames =
    memory.struggledQuestions.length > 0
      ? memory.struggledQuestions
          .slice(0, 6)
          .map((q) => `${q.title} (${q.topicId}, hints: ${q.hintCount})`)
          .join("; ")
      : "None recorded yet";

  const recentCompletedNames =
    memory.completedQuestions.length > 0
      ? memory.completedQuestions
          .slice(0, 6)
          .map((q) => `${q.title} (${q.topicId})`)
          .join(", ")
      : "None completed in practice yet";

  const realStatsBlock = `
VERIFIED LEARNER PROFILE & STATS (DO NOT INVENT OR EXAGGERATE ANY NUMBERS):
- Student Name: ${userDisplayName || "Learner"}
- Skill Level: ${memory.preferences.skillLevel}
- Preferred Explanation Style: ${memory.preferences.explanationStyle}
- Hint-First Preference: ${memory.preferences.hintFirst ? "Enabled" : "Disabled"}
- Current Streak: ${streak.currentStreak} day(s) | Longest Streak: ${streak.longestStreak} day(s) | Total Active Days: ${streak.totalLearningDays}
- Qualified Today: ${streak.qualifiedToday ? "Yes" : "No"} (${streak.todayCompletedCount} qualifying activities today)
- DSA Solved on Roadmap: ${dsaSummary.solvedCount}/${dsaSummary.totalCount} (Easy: ${dsaSummary.easySolved}, Medium: ${dsaSummary.mediumSolved}, Hard: ${dsaSummary.hardSolved})
- Aptitude Tests Completed: ${aptitudeSummary.testsCompleted} | Aptitude Practice Questions Solved: ${aptitudeSummary.practiceSolvedCount} | Avg Accuracy: ${aptitudeSummary.avgAccuracy}%
- Previously Studied Topics: ${studiedNames}
- Weak / Struggled Topics: ${weakNames}
- Struggled Questions: ${struggledNames}
- Recently Completed Practice Questions: ${recentCompletedNames}
`.trim();

  const dsaStructure = `
ACTIVE MODE: DSA TUTOR ${topic ? `(Topic focus: ${topic}${difficulty ? `, Difficulty: ${difficulty}` : ""})` : ""}
Supported Core DSA Topics: Arrays & Strings, Hashing, Two Pointers, Sliding Window, Binary Search, Sorting Algorithms, Linked Lists, Stacks & Queues, Recursion & Backtracking, Trees & BST, Heaps, Graphs, Greedy Algorithms, Dynamic Programming.

TEACHING STRUCTURE FOR DSA QUESTIONS:
When teaching or solving a DSA concept/problem, follow these 8 steps clearly with Markdown headings:
1. **Understand the Question**: Restate inputs, constraints, and what must be returned.
2. **Simple Explanation**: Explain the core idea in plain, everyday words.
3. **Identify the Pattern**: Name the DSA pattern (e.g., Sliding Window, Two Pointers, DP, Monotonic Stack) and why the constraints signal it.
4. **Approach (Step-by-Step)**: Explain why the algorithm works without jumping straight to code.
5. **Example & Dry Run**: Trace a small concrete example step by step showing state/variables changing.
6. **Time & Space Complexity**: State Big-O time and auxiliary space complexity clearly.
7. **Hint First**: Give a targeted guiding hint or next-step nudge so the student thinks actively.
8. **Code Policy**: ${
    explicitCodeRequest || action === "reveal_code"
      ? "The learner EXPLICITLY requested code. Provide clean, well-commented code alongside a brief complexity recap."
      : "DO NOT reveal full implementation code yet! Give intuition, approach steps, dry run, and hints only. Tell the student they can ask for another hint or request 'show code' when ready."
  }
`.trim();

  const aptitudeStructure = `
ACTIVE MODE: APTITUDE & PLACEMENT TUTOR ${topic ? `(Topic focus: ${topic}${difficulty ? `, Difficulty: ${difficulty}` : ""})` : ""}
Supported Core Aptitude Topics: Number Systems, Percentages, Profit & Loss, Ratio & Proportion, Averages, Time & Work, Time/Speed/Distance, Permutations & Combinations, Probability, Logical Reasoning, Data Interpretation.

TEACHING STRUCTURE FOR APTITUDE QUESTIONS:
1. **Understand & Extract Knowns**: Pull out exact numbers, units, and what is being asked.
2. **Method Selection**: Identify the cleanest placement-test concept or formula.
3. **Step-by-Step Calculations**: Walk through arithmetic carefully line by line (avoid skipping algebra steps).
4. **Placement Shortcut & Trap Check**: Share a mental math shortcut (e.g., ratio fractions, LCM work units, percentage multipliers) and warn about common traps.
5. **Hint / Code-Free Guidance**: ${
    explicitCodeRequest || action === "reveal_code"
      ? "The learner explicitly requested the full worked answer — provide the complete solution and ask if they want a similar practice problem."
      : "If the learner is trying a practice problem or asks for help solving one, give a guiding step-1 hint and ask them to compute the next step first before giving the final answer, unless they asked a pure conceptual question."
  }
`.trim();

  let actionDirective = "";
  if (action === "hint") {
    actionDirective =
      "SPECIAL ACTION: The learner clicked 'Give Hint'. Give ONE focused, progressive hint + tiny nudge question. DO NOT reveal the final solution or full code.";
  } else if (action === "reexplain") {
    actionDirective =
      "SPECIAL ACTION: The learner didn't understand the previous explanation. Re-explain the concept from a COMPLETELY DIFFERENT angle — use a real-life analogy, visual ASCII/Markdown trace table, and simpler vocabulary. Check if it makes sense now.";
  } else if (action === "reveal_code") {
    actionDirective =
      mode === "dsa"
        ? "SPECIAL ACTION: The learner explicitly requested the full implementation code. Show clean, readable TypeScript/Python/Java/C++ code (default Python/JS unless specified) with inline comments, dry-run verification, and Time/Space complexity."
        : "SPECIAL ACTION: The learner explicitly requested the full final answer & complete step-by-step calculation.";
  } else if (action === "example") {
    actionDirective =
      "SPECIAL ACTION: Walk through a crystal-clear concrete numerical/array dry-run example step by step without spoiling code unless requested.";
  } else if (action === "practice_generate") {
    actionDirective =
      `SPECIAL ACTION: Generate a fresh, realistic ${difficulty || "Medium"} ${mode.toUpperCase()} placement/interview practice problem${topic ? ` on ${topic}` : ""}, state constraints cleanly, provide 1 starter hint inside a collapsed note or at the end, and wait for the learner's attempt before revealing the final answer.`;
  }

  return `You are SALAAR — the dedicated AI Learning Agent inside CodeCrex.
Your persona is a calm, resolute, patient, high-focus mentor inspired by the grit and protective loyalty of Salaar: direct, respectful, encouraging, structured, and relentlessly clear. Never use slang excess or cheesy filler; speak like a sharp senior engineer and placement coach who builds deep understanding step by step.

CORE PEDAGOGICAL RULES:
- Teach rather than just handing out final answers.
- Adapt vocabulary and depth to the learner's profile (${memory.preferences.skillLevel} level, ${memory.preferences.explanationStyle} style).
- Support seamless multi-turn follow-up questions without losing context.
- NEVER fabricate user statistics, fake solved problems, or fake streak numbers. Only cite facts from VERIFIED LEARNER PROFILE & STATS above if asked.
- Keep responses neatly formatted in Markdown using bold headers, bullet points, and tables where helpful.

${mode === "dsa" ? dsaStructure : aptitudeStructure}

${actionDirective ? `\n${actionDirective}\n` : ""}
${realStatsBlock}`;
}

export function detectExplicitCodeOrSolutionRequest(
  message: string,
  action: string,
): boolean {
  if (action === "reveal_code") return true;
  const normalized = message.toLowerCase();
  return /\b(show code|give code|write code|full code|python code|java code|c\+\+ code|cpp code|js code|typescript code|reveal solution|show solution|full solution|give answer|reveal answer|code please)\b/i.test(
    normalized,
  );
}
