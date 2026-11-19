import { aptitudeQuestions } from "../src/data/aptitude.ts";
let failed = 0;
const ids = new Set<string>();
const requiredTopics = [
  "percentages",
  "profit-loss",
  "time-work",
  "time-speed-distance",
  "ratio",
  "probability",
  "series",
  "blood-relations",
];
for (const [i, q] of aptitudeQuestions.entries()) {
  const issues: string[] = [];
  if (!q.id) issues.push("missing id");
  if (!q.topicId) issues.push("missing topicId");
  if (!q.question.trim()) issues.push("empty question");
  if (q.options.length !== 4) issues.push("expected four options");
  if (new Set(q.options).size !== 4) issues.push("duplicate options");
  if (
    !Number.isInteger(q.correctIndex) ||
    q.correctIndex < 0 ||
    q.correctIndex > 3
  )
    issues.push("invalid correctIndex");
  if (!q.explanation.trim()) issues.push("missing explanation");
  if (ids.has(q.id)) issues.push("duplicate id");
  ids.add(q.id);
  if (issues.length) {
    failed++;
    console.error(`MCQ ${i + 1}: ${issues.join(", ")}`);
  }
}
for (const topicId of requiredTopics) {
  const count = aptitudeQuestions.filter(
    (question) => question.topicId === topicId,
  ).length;
  if (count !== 15) {
    failed++;
    console.error(`${topicId}: expected 15 original MCQs, found ${count}`);
  }
}
const arithmeticChecks: [string, number, string][] = [
  ["percentages-01", 240 * 0.15, "36"],
  ["percentages-02", ((100 - 80) / 80) * 100, "25%"],
  ["percentages-03", (1.1 * 0.9 - 1) * 100, "1% decrease"],
  ["percentages-04", 800 / 0.8, "₹1,000"],
  ["percentages-09", 5000 * 1.1 ** 2, "6,050"],
  ["profit-loss-01", ((500 - 400) / 400) * 100, "25%"],
  ["profit-loss-03", 10 + 20 - (10 * 20) / 100, "28%"],
  ["profit-loss-09", 1500 * 1.16, "₹1,740"],
  ["time-work-02", 1 / (1 / 10 + 1 / 15), "6 days"],
  ["time-work-05", 1 / (1 / 4 - 1 / 12), "6 days"],
  ["time-work-14", 1 / ((1 / 4 + 1 / 6 + 1 / 12) / 2), "4 days"],
  ["time-work-15", 4 + 3 / 4 / (1 / 16 + 1 / 24), "11.2 days"],
  ["time-speed-distance-01", 72 * (5 / 18), "20"],
  ["time-speed-distance-05", (2 * 30 * 60) / (30 + 60), "40 km/h"],
  ["time-speed-distance-09", (150 + 250) / 20, "20 s"],
  ["time-speed-distance-13", (200 + 100) / ((54 + 36) * (5 / 18)), "12 s"],
  ["ratio-15", (12 / 35) * 350, "120"],
];
for (const [id, calculated, expected] of arithmeticChecks) {
  const question = aptitudeQuestions.find((item) => item.id === id);
  const expectedNumber =
    Number(expected.replace(/[^\d.]/g, "")) *
    (expected.includes("decrease") ? -1 : 1);
  if (
    !question ||
    Math.abs(calculated - expectedNumber) > 0.02 ||
    question.options[question.correctIndex] !== expected
  ) {
    failed++;
    console.error(
      `${id}: arithmetic check failed (expected ${expected}, got ${question?.options[question.correctIndex] ?? "missing"})`,
    );
  }
}
if (failed) {
  console.error(`${failed} ambiguous or invalid MCQs.`);
  process.exitCode = 1;
} else
  console.log(
    `Checked ${aptitudeQuestions.length} aptitude questions: schema, 15-question topic counts, duplicate IDs, and ${arithmeticChecks.length} arithmetic answer checks passed. Verbal and reasoning answers still need editorial review.`,
  );
