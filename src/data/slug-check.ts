import { problems } from "./problems.ts";
export const slugs = [...new Set(problems.map((p) => p.leetcodeSlug))];
