// src/data/aptitude/types.ts

export type AptitudeGroup = "quantitative" | "logical" | "verbal" | "interview";

export interface KeyConcept {
  term: string;
  definition: string;
}

export interface Formula {
  label: string;
  expression: string;
  whenToUse: string;
  example?: string;
}

export interface ReferenceTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface Shortcut {
  trick: string;
  whenItWorks: string;
}

export interface CommonTrap {
  mistake: string;
  fix: string;
}

export interface WorkedExample {
  question: string;
  steps: string[];
  answer: string;
  check?: () => number;
}

export interface OAExample {
  question: string;
  steps: string[];
  answer: string;
}

export interface EtiquetteQuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface AptitudeTopicData {
  id: string;
  group: AptitudeGroup;
  title: string;
  summary: string;
  context: {
    whyItMatters: string;
    whereItAppears: string;
    prerequisites: string[];
    targetTimePerQuestion: string;
    difficultyLevel: "Easy" | "Medium" | "Hard";
  };
  keyConcepts: KeyConcept[];
  formulas: Formula[];
  referenceTables?: ReferenceTable[];
  shortcuts: Shortcut[];
  commonTraps: CommonTrap[];
  workedExamples: WorkedExample[];
  oaExamples: OAExample[];
  rememberThis: string[];
  relatedTopics: string[];
  etiquetteQuiz?: EtiquetteQuizQuestion[];
}
