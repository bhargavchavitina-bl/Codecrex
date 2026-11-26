import { topics } from "./topics.js";

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
