export type MCQ = {
  id: string;
  topicId: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
};
export const aptitudeTopics = [
  {
    id: "quantitative",
    name: "Quantitative Aptitude",
    icon: "∑",
    description: "Build speed and accuracy with numbers.",
    units: [
      "Number System",
      "Percentages",
      "Profit & Loss",
      "Simple & Compound Interest",
      "Ratio",
      "Averages",
      "Mixtures & Alligation",
      "Ages",
      "Time & Work",
      "Pipes & Cisterns",
      "Time-Speed-Distance",
      "Trains",
      "Boats & Streams",
      "Permutation & Combination",
      "Probability",
      "Algebra Basics",
      "Geometry & Mensuration",
      "Clocks & Calendars",
      "Data Sufficiency",
    ],
  },
  {
    id: "logical",
    name: "Logical Reasoning",
    icon: "◈",
    description: "Find the structure behind every puzzle.",
    units: [
      "Series",
      "Coding-Decoding",
      "Blood Relations",
      "Directions",
      "Seating Arrangement",
      "Syllogisms",
      "Puzzles",
      "Venn Diagrams",
      "Data Interpretation",
    ],
  },
  {
    id: "verbal",
    name: "Verbal Ability",
    icon: "Aa",
    description: "Sharpen comprehension and communication.",
    units: [
      "Reading Comprehension",
      "Sentence Correction",
      "Fill in the Blanks",
      "Para Jumbles",
      "Vocabulary",
    ],
  },
  {
    id: "interview",
    name: "Interview Prep",
    icon: "✳",
    description: "Bring your story and preparation together.",
    units: [
      "Self-Introduction & HR Basics",
      "Resume & Profile Tips",
      "Group Discussion Basics",
      "Online Assessment Patterns",
      "Mock Tests",
    ],
  },
];
import { expandedMCQs } from "./aptitude-expanded.js";
export const aptitudeQuestions: MCQ[] = [...expandedMCQs];
