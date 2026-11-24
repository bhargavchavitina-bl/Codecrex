// src/data/aptitude/index.ts
// Aggregator for all 37 Aptitude Topics across Quantitative, Logical, Verbal, and Interview

import { quantitativePart1 } from "./quantitative-part1";
import { quantitativePart2Topics } from "./quantitative-part2";
import { logicalTopics } from "./logical";
import { verbalTopics } from "./verbal";
import { interviewTopics } from "./interview";
import type { AptitudeTopicData, AptitudeGroup } from "./types";

export * from "./types";

export const allAptitudeTopics: AptitudeTopicData[] = [
  ...quantitativePart1,
  ...quantitativePart2Topics,
  ...logicalTopics,
  ...verbalTopics,
  ...interviewTopics,
];

export const aptitudeTopicsMap: Map<string, AptitudeTopicData> = new Map(
  allAptitudeTopics.map((topic) => [topic.id, topic])
);

export function getAptitudeTopicById(id: string): AptitudeTopicData | undefined {
  return aptitudeTopicsMap.get(id);
}

export function getAptitudeTopicsByGroup(group: AptitudeGroup): AptitudeTopicData[] {
  return allAptitudeTopics.filter((topic) => topic.group === group);
}
