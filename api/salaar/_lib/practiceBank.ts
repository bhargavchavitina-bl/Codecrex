import { problems, problemMatchesTopic, type Problem } from "../../../src/data/problems.ts";
import { topics } from "../../../src/data/topics.ts";
import { expandedMCQs } from "../../../src/data/aptitude-expanded.ts";
import type { MCQ } from "../../../src/data/aptitude.ts";
import type { LearningMode } from "./types.ts";

export interface PracticeQuestionClientView {
  id: string;
  category: LearningMode;
  topicId: string;
  topicName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  prompt: string;
  options: string[];
  leetcodeSlug?: string;
  patternHintLabel?: string;
  hintCountAvailable: number;
}

export interface PracticeQuestionInternal extends PracticeQuestionClientView {
  correctIndex: number;
  hints: string[];
  approachExplanation: string;
  fullSolution: string;
  complexity?: { time: string; space: string };
}

export const DSA_PRACTICE_TOPICS = topics.map((t) => ({
  id: t.id,
  name: t.name,
  category: t.category,
}));

export const APTITUDE_PRACTICE_TOPICS = [
  { id: "number-system", name: "Number Systems" },
  { id: "percentages", name: "Percentages" },
  { id: "profit-loss", name: "Profit & Loss" },
  { id: "ratio-proportion", name: "Ratio & Proportion" },
  { id: "averages", name: "Averages" },
  { id: "time-work", name: "Time & Work" },
  { id: "time-speed-distance", name: "Time, Speed & Distance" },
  { id: "permutation-combination", name: "Permutations & Combinations" },
  { id: "probability", name: "Probability" },
  { id: "logical-reasoning", name: "Logical Reasoning" },
  { id: "data-interpretation", name: "Data Interpretation" },
] as const;

// Additional curated & verified practice bank items for aptitude topics not in expandedMCQs
const supplementalAptitudeMCQs: MCQ[] = [
  // Number System
  {
    id: "number-system-01",
    topicId: "number-system",
    difficulty: "Easy",
    question: "What is the unit digit of 7^45?",
    options: ["1", "3", "7", "9"],
    correctIndex: 2,
    explanation:
      "The unit digits of powers of 7 repeat in a cycle of 4: [7, 9, 3, 1]. Since 45 mod 4 = 1, the unit digit matches 7^1 = 7.",
  },
  {
    id: "number-system-02",
    topicId: "number-system",
    difficulty: "Easy",
    question: "The HCF of two numbers is 6 and their LCM is 72. If one number is 24, what is the other number?",
    options: ["12", "18", "24", "36"],
    correctIndex: 1,
    explanation:
      "Use HCF × LCM = a × b. So b = (6 × 72) / 24 = 432 / 24 = 18.",
  },
  {
    id: "number-system-03",
    topicId: "number-system",
    difficulty: "Medium",
    question: "How many trailing zeros does 100! (100 factorial) have?",
    options: ["20", "22", "24", "25"],
    correctIndex: 2,
    explanation:
      "Count powers of 5 dividing 100!: floor(100/5) + floor(100/25) = 20 + 4 = 24 trailing zeros.",
  },
  {
    id: "number-system-04",
    topicId: "number-system",
    difficulty: "Medium",
    question: "How many total positive factors does 72 have?",
    options: ["8", "10", "12", "16"],
    correctIndex: 2,
    explanation:
      "Prime factorize 72 = 2^3 × 3^2. Total factors = (3 + 1) × (2 + 1) = 4 × 3 = 12.",
  },
  {
    id: "number-system-05",
    topicId: "number-system",
    difficulty: "Hard",
    question: "A number divided by 56 leaves remainder 29. What remainder will it leave when divided by 8?",
    options: ["3", "4", "5", "7"],
    correctIndex: 2,
    explanation:
      "Write N = 56k + 29 = 8(7k) + 8(3) + 5 = 8(7k + 3) + 5. Since 56 is divisible by 8, divide 29 by 8 directly: remainder is 5.",
  },
  // Averages
  {
    id: "averages-01",
    topicId: "averages",
    difficulty: "Easy",
    question: "The average of 5 consecutive integers starting from 11 is:",
    options: ["12", "13", "14", "15"],
    correctIndex: 1,
    explanation:
      "The 5 consecutive integers are 11, 12, 13, 14, 15. For an odd number of evenly spaced terms, the average equals the middle term: 13.",
  },
  {
    id: "averages-02",
    topicId: "averages",
    difficulty: "Medium",
    question: "The average weight of 8 persons increases by 2.5 kg when a new person replaces one weighing 65 kg. What is the new person's weight?",
    options: ["75 kg", "80 kg", "85 kg", "90 kg"],
    correctIndex: 2,
    explanation:
      "Total weight added = 8 × 2.5 = 20 kg. So new weight = 65 + 20 = 85 kg.",
  },
  {
    id: "averages-03",
    topicId: "averages",
    difficulty: "Medium",
    question: "A batsman has an average of 42 runs in 10 innings. How many runs must he score in the 11th inning to raise his average to 45?",
    options: ["68", "72", "75", "78"],
    correctIndex: 2,
    explanation:
      "Current total = 42 × 10 = 420. Desired total for 11 innings = 45 × 11 = 495. Runs needed = 495 − 420 = 75.",
  },
  {
    id: "averages-04",
    topicId: "averages",
    difficulty: "Hard",
    question: "A car travels A to B at 40 km/h and returns B to A at 60 km/h. What is the average speed for the whole round trip?",
    options: ["45 km/h", "48 km/h", "50 km/h", "52 km/h"],
    correctIndex: 1,
    explanation:
      "For equal distances at speeds x and y, average speed = 2xy / (x + y) = (2 × 40 × 60) / (40 + 60) = 4800 / 100 = 48 km/h.",
  },
  // Permutations & Combinations
  {
    id: "permutation-combination-01",
    topicId: "permutation-combination",
    difficulty: "Easy",
    question: "In how many distinct ways can the letters of the word APPLE be arranged?",
    options: ["30", "60", "90", "120"],
    correctIndex: 1,
    explanation:
      "APPLE has 5 letters with P repeated 2 times. Arrangements = 5! / 2! = 120 / 2 = 60.",
  },
  {
    id: "permutation-combination-02",
    topicId: "permutation-combination",
    difficulty: "Medium",
    question: "From a group of 7 men and 6 women, 5 persons must be chosen to form a committee with at least 3 men. In how many ways can this be done?",
    options: ["564", "645", "735", "756"],
    correctIndex: 3,
    explanation:
      "Cases: (3M, 2W) + (4M, 1W) + (5M, 0W) = C(7,3)C(6,2) + C(7,4)C(6,1) + C(7,5) = 35×15 + 35×6 + 21 = 525 + 210 + 21 = 756.",
  },
  {
    id: "permutation-combination-03",
    topicId: "permutation-combination",
    difficulty: "Hard",
    question: "How many 3-digit even numbers can be formed from digits {1, 2, 3, 4, 5, 6} without repetition?",
    options: ["40", "48", "60", "72"],
    correctIndex: 2,
    explanation:
      "Unit digit must be even ({2, 4, 6} -> 3 choices). Remaining 2 positions take 5 × 4 = 20 choices. Total = 3 × 20 = 60.",
  },
  // Logical Reasoning extra
  {
    id: "logical-reasoning-01",
    topicId: "logical-reasoning",
    difficulty: "Easy",
    question: "Find the next number in the series: 2, 5, 10, 17, 26, ?",
    options: ["35", "36", "37", "39"],
    correctIndex: 2,
    explanation:
      "Pattern is n^2 + 1 for n = 1, 2, 3, 4, 5: next is 6^2 + 1 = 37 (also differences increase by +2: +3, +5, +7, +9, +11).",
  },
  {
    id: "logical-reasoning-02",
    topicId: "logical-reasoning",
    difficulty: "Medium",
    question: "A person walks 10 m North, turns right and walks 15 m, then turns right and walks 10 m. How far and in which direction is he from the start?",
    options: ["15 m East", "15 m West", "10 m South", "25 m East"],
    correctIndex: 0,
    explanation:
      "North 10 m and South 10 m cancel out vertically; turning right from North points East, so net displacement is 15 m East.",
  },
  // Data Interpretation
  {
    id: "data-interpretation-01",
    topicId: "data-interpretation",
    difficulty: "Easy",
    question: "A department budget of ₹2,00,000 allocates 35% to R&D, 25% to Operations, and 40% to Salaries. How much more is spent on Salaries than Operations?",
    options: ["₹20,000", "₹25,000", "₹30,000", "₹35,000"],
    correctIndex: 2,
    explanation:
      "Difference in share = 40% − 25% = 15%. 15% of ₹2,00,000 = 0.15 × 200,000 = ₹30,000.",
  },
  {
    id: "data-interpretation-02",
    topicId: "data-interpretation",
    difficulty: "Medium",
    question: "Monthly sales grew from 400 units in Q1 to 520 units in Q2, then dropped 10% in Q3. What was the Q3 sales volume and net % change from Q1?",
    options: ["468 units, +17%", "472 units, +18%", "450 units, +12.5%", "480 units, +20%"],
    correctIndex: 0,
    explanation:
      "Q3 = 520 × 0.90 = 468 units. Net change over Q1 = (468 − 400) / 400 × 100 = 68 / 4 = +17%.",
  },
  {
    id: "data-interpretation-03",
    topicId: "data-interpretation",
    difficulty: "Hard",
    question: "Company revenue rose 20% to ₹60 Cr in 2025 while costs fell 10% from ₹40 Cr. By what percentage did profit grow?",
    options: ["40%", "50%", "60%", "140%"],
    correctIndex: 3,
    explanation:
      "2024 Revenue = 60 / 1.2 = ₹50 Cr, Cost = ₹40 Cr => 2024 Profit = ₹10 Cr. 2025 Revenue = ₹60 Cr, Cost = 40 × 0.9 = ₹36 Cr => 2025 Profit = ₹24 Cr. Profit growth = (24 − 10)/10 × 100 = 140%.",
  },
];

const PATTERN_DISTRACTOR_POOL: Array<{ pattern: string; time: string; space: string }> = [
  { pattern: "Two Pointers", time: "O(n)", space: "O(1)" },
  { pattern: "Sliding Window", time: "O(n)", space: "O(k)" },
  { pattern: "Hash Map Lookup", time: "O(n)", space: "O(n)" },
  { pattern: "Binary Search", time: "O(log n)", space: "O(1)" },
  { pattern: "Monotonic Stack", time: "O(n)", space: "O(n)" },
  { pattern: "Dynamic Programming", time: "O(n^2)", space: "O(n)" },
  { pattern: "Heap / Priority Queue", time: "O(n log k)", space: "O(k)" },
  { pattern: "BFS / DFS Graph Walk", time: "O(V + E)", space: "O(V)" },
  { pattern: "Greedy Interval / Choice", time: "O(n log n)", space: "O(1)" },
  { pattern: "Recursion & Backtracking", time: "O(2^n)", space: "O(n)" },
];

function getComplexityByPattern(pattern: string): { time: string; space: string } {
  const p = pattern.toLowerCase();
  if (p.includes("binary") || p.includes("search")) return { time: "O(log n) to O(n log U)", space: "O(1)" };
  if (p.includes("two pointers") || p.includes("kadane") || p.includes("same direction") || p.includes("fast & slow") || p.includes("reversal")) {
    return { time: "O(n)", space: "O(1)" };
  }
  if (p.includes("sliding") || p.includes("window") || p.includes("prefix") || p.includes("hashing") || p.includes("frequency") || p.includes("stack") || p.includes("deque")) {
    return { time: "O(n)", space: "O(n)" };
  }
  if (p.includes("heap") || p.includes("top k") || p.includes("merge") || p.includes("sort") || p.includes("interval")) {
    return { time: "O(n log n)", space: "O(n)" };
  }
  if (p.includes("dfs") || p.includes("bfs") || p.includes("tree") || p.includes("graph") || p.includes("topological") || p.includes("union") || p.includes("trie")) {
    return { time: "O(V + E) / O(n)", space: "O(h) / O(V)" };
  }
  if (p.includes("subset") || p.includes("permutation") || p.includes("constraint")) {
    return { time: "O(b^d · n)", space: "O(d)" };
  }
  if (p.includes("1d") || p.includes("knapsack") || p.includes("subsequence") || p.includes("strings")) {
    return { time: "O(n · m)", space: "O(m) optimized" };
  }
  return { time: "O(n)", space: "O(n)" };
}

function deterministicHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function mapDsaProblemToPractice(problem: Problem, topicIdOverride?: string): PracticeQuestionInternal {
  const activeTopicId = topicIdOverride || problem.topicId;
  const topicObj = topics.find((t) => t.id === activeTopicId) || topics[0];
  const patternName =
    (problem.patternByTopic && problem.patternByTopic[activeTopicId]) || problem.pattern;
  const patternMeta = topicObj.patterns.find((p) => p.name === patternName);
  const comp = getComplexityByPattern(patternName);

  const correctLabel = `${patternName} · Time ${comp.time}, Space ${comp.space}`;
  const hash = deterministicHash(problem.id);

  // Pick 3 non-overlapping distractors cleanly
  const distractors: string[] = [];
  for (let i = 0; i < PATTERN_DISTRACTOR_POOL.length && distractors.length < 3; i++) {
    const candidate = PATTERN_DISTRACTOR_POOL[(hash + i * 3) % PATTERN_DISTRACTOR_POOL.length];
    if (!candidate.pattern.toLowerCase().includes(patternName.toLowerCase().split(" ")[0])) {
      distractors.push(`${candidate.pattern} · Time ${candidate.time}, Space ${candidate.space}`);
    }
  }
  while (distractors.length < 3) {
    distractors.push(`Brute-force Nested Loops · Time O(n^3), Space O(1)`);
  }

  const correctIndex = hash % 4;
  const options = [...distractors];
  options.splice(correctIndex, 0, correctLabel);

  const hint1 = `Focus on the core bottleneck for "${problem.title}". Think about how ${topicObj.name} constraints punish brute-force O(n^2) scans and ask what state needs to stay maintained in a single pass.`;
  const hint2 = `Pattern clue: ${patternMeta?.tip || `Consider applying the ${patternName} pattern.`}`;
  const approachExplanation = `1. Break "${problem.title}" down by asking what invariant holds at each step.\n2. Use **${patternName}** (${patternMeta?.tip || topicObj.description}).\n3. Update pointers/state incrementally to achieve **${comp.time}** time and **${comp.space}** space.`;
  const fullSolution = `**Optimal Pattern**: ${patternName}\n**Time Complexity**: ${comp.time}\n**Space Complexity**: ${comp.space}\n\n**Walkthrough**:\n- Identify whether ordering, hashing, or window invariants eliminate repeated work.\n- Implement **${patternName}** cleanly across inputs, handling edge cases (empty inputs, duplicates, boundary indices).\n- Full problem practice link: https://leetcode.com/problems/${problem.leetcodeSlug}/`;

  return {
    id: `dsa:${problem.id}`,
    category: "dsa",
    topicId: activeTopicId,
    topicName: topicObj.name,
    difficulty: problem.difficulty,
    title: problem.title,
    prompt: `Which optimal algorithmic pattern & complexity signature solves "${problem.title}" (${topicObj.name} · ${problem.difficulty})?`,
    options,
    leetcodeSlug: problem.leetcodeSlug,
    patternHintLabel: patternName,
    hintCountAvailable: 3,
    correctIndex,
    hints: [hint1, hint2, approachExplanation],
    approachExplanation,
    fullSolution,
    complexity: comp,
  };
}

function mapMcqToPractice(mcq: MCQ, topicIdOverride?: string): PracticeQuestionInternal {
  const topicId = topicIdOverride || mcq.topicId;
  const topicInfo = APTITUDE_PRACTICE_TOPICS.find((t) => t.id === topicId);
  const topicName = topicInfo?.name || mcq.topicId;

  const hint1 = `Start by identifying the given quantities and what must be calculated in this ${topicName} question. Avoid mental rounding too early.`;
  const firstSentence = mcq.explanation.split(/[.]/)[0]?.trim();
  const hint2 = firstSentence
    ? `Method hint: ${firstSentence}.`
    : `Apply standard ${topicName} relations carefully and check units.`;

  return {
    id: `apt:${mcq.id}`,
    category: "aptitude",
    topicId,
    topicName,
    difficulty: mcq.difficulty,
    title: `${topicName} · ${mcq.id}`,
    prompt: mcq.question,
    options: [...mcq.options],
    hintCountAvailable: 2,
    correctIndex: mcq.correctIndex,
    hints: [hint1, hint2],
    approachExplanation: hint2,
    fullSolution: mcq.explanation,
  };
}

export function getAllPracticeQuestions(filters?: {
  category?: LearningMode;
  topicId?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  limit?: number;
}): PracticeQuestionInternal[] {
  const result: PracticeQuestionInternal[] = [];

  if (!filters?.category || filters.category === "dsa") {
    const filteredDsa = problems.filter((p) => {
      if (filters?.topicId && filters.topicId !== "all") {
        if (!problemMatchesTopic(p, filters.topicId)) return false;
      }
      if (filters?.difficulty && p.difficulty !== filters.difficulty) return false;
      return true;
    });
    for (const p of filteredDsa) {
      result.push(mapDsaProblemToPractice(p, filters?.topicId && filters.topicId !== "all" ? filters.topicId : undefined));
    }
  }

  if (!filters?.category || filters.category === "aptitude") {
    const combinedMcqs = [...expandedMCQs, ...supplementalAptitudeMCQs];
    const filteredApt = combinedMcqs.filter((q) => {
      if (filters?.topicId && filters.topicId !== "all") {
        if (filters.topicId === "ratio-proportion") {
          if (q.topicId !== "ratio" && q.topicId !== "ratio-proportion") return false;
        } else if (filters.topicId === "logical-reasoning") {
          if (
            !["series", "blood-relations", "logical-reasoning", "coding-decoding", "directions"].includes(
              q.topicId,
            )
          ) {
            return false;
          }
        } else if (q.topicId !== filters.topicId) {
          return false;
        }
      }
      if (filters?.difficulty && q.difficulty !== filters.difficulty) return false;
      return true;
    });
    for (const q of filteredApt) {
      result.push(
        mapMcqToPractice(
          q,
          filters?.topicId && filters.topicId !== "all" ? filters.topicId : q.topicId === "ratio" ? "ratio-proportion" : q.topicId,
        ),
      );
    }
  }

  const cap = filters?.limit || 30;
  return result.slice(0, cap);
}

export function findPracticeQuestionById(questionId: string): PracticeQuestionInternal | null {
  if (questionId.startsWith("dsa:")) {
    const rawId = questionId.slice(4);
    const p = problems.find((item) => item.id === rawId);
    return p ? mapDsaProblemToPractice(p) : null;
  }
  if (questionId.startsWith("apt:")) {
    const rawId = questionId.slice(4);
    const allMcqs = [...expandedMCQs, ...supplementalAptitudeMCQs];
    const q = allMcqs.find((item) => item.id === rawId);
    return q ? mapMcqToPractice(q) : null;
  }
  return null;
}

export function sanitizePracticeQuestion(q: PracticeQuestionInternal): PracticeQuestionClientView {
  return {
    id: q.id,
    category: q.category,
    topicId: q.topicId,
    topicName: q.topicName,
    difficulty: q.difficulty,
    title: q.title,
    prompt: q.prompt,
    options: q.options,
    leetcodeSlug: q.leetcodeSlug,
    patternHintLabel: q.patternHintLabel,
    hintCountAvailable: q.hints.length,
  };
}
