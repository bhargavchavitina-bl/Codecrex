export type Topic = {
  id: string;
  name: string;
  category: string;
  description: string;
  patterns: { name: string; tip: string; problems: string[] }[];
};
const groups: [string, string, string, string[]][] = [
  [
    "arrays",
    "Arrays",
    "Start with the fundamentals",
    ["Traversal & In-place", "Kadane & Subarrays", "Two-dimensional Arrays"],
  ],
  [
    "strings",
    "Strings",
    "Transform, compare and parse strings",
    ["Frequency & Parsing", "Palindromes", "String Matching"],
  ],
  [
    "hashing",
    "Hashing",
    "Trade space for near-constant lookup",
    ["Frequency Maps", "Sets & Lookups", "Prefix Hashing"],
  ],
  [
    "two-pointers",
    "Two Pointers",
    "Move two indices with intent",
    ["Opposite Ends", "Fast & Slow", "Same Direction"],
  ],
  [
    "sliding-window",
    "Sliding Window",
    "Maintain a dynamic contiguous window",
    ["Fixed Window", "Variable Window", "Monotonic Window"],
  ],
  [
    "prefix-sum",
    "Prefix Sum",
    "Precompute ranges and cumulative totals",
    ["Running Sum", "Range Queries", "Prefix + Hashing"],
  ],
  [
    "binary-search",
    "Binary Search",
    "Cut the search space in half",
    ["Classic Search", "Search on Answer", "Rotated Arrays"],
  ],
  [
    "sorting",
    "Sorting",
    "Order the data to reveal structure",
    ["Custom Ordering", "Counting & Bucketing", "Intervals"],
  ],
  [
    "recursion-backtracking",
    "Recursion & Backtracking",
    "Explore choices, then undo them",
    ["Subsets & Combinations", "Permutations", "Constraint Search"],
  ],
  [
    "linked-list",
    "Linked List",
    "Pointer moves, carefully composed",
    ["Reversal", "Fast & Slow", "Merge & Intersections"],
  ],
  [
    "stack",
    "Stack",
    "Last in, first out reasoning",
    ["Monotonic Stack", "Parsing & Matching", "Min Stack"],
  ],
  [
    "queue-deque",
    "Queue & Deque",
    "Process in arrival order or both ends",
    ["BFS Queue", "Monotonic Deque", "Design"],
  ],
  [
    "heap",
    "Heap / Priority Queue",
    "Keep the best candidate in reach",
    ["Top K", "Two Heaps", "K-way Merge"],
  ],
  [
    "trees",
    "Trees",
    "Traverse and reason recursively",
    ["DFS Traversals", "Level Order", "Tree Construction"],
  ],
  [
    "bst",
    "Binary Search Trees",
    "Use the ordered tree invariant",
    ["Search & Validate", "Successor & Predecessor", "Balanced Operations"],
  ],
  [
    "graphs",
    "Graphs",
    "Model relationships and explore",
    ["BFS / DFS", "Shortest Path", "Topological Sort", "Union Find & MST"],
  ],
  [
    "greedy",
    "Greedy",
    "Choose locally, prove it globally",
    ["Intervals", "Scheduling", "Choice & Exchange"],
  ],
  [
    "dp",
    "Dynamic Programming",
    "Turn overlapping work into a state transition",
    [
      "1D & 2D",
      "Subsequences & LIS",
      "Knapsack & Partition",
      "Strings & Grids",
    ],
  ],
  [
    "tries",
    "Tries",
    "Index strings by shared prefixes",
    ["Prefix Search", "Word Dictionary", "Bitwise Trie"],
  ],
  [
    "bit-manipulation",
    "Bit Manipulation",
    "Work directly with binary representation",
    ["XOR Patterns", "Masks & Subsets", "Bit Counting"],
  ],
  [
    "math",
    "Math & Number Theory",
    "Use number properties to simplify",
    ["GCD & Primes", "Combinatorics", "Modular Arithmetic"],
  ],
  [
    "intervals",
    "Intervals",
    "Sort boundaries, then merge or schedule",
    ["Merge & Insert", "Sweep Line", "Meeting Rooms"],
  ],
];
const patternOverrides: Record<string, string[]> = {
  arrays: [
    "Traversal & In-place",
    "Two Pointers",
    "Sliding Window",
    "Prefix Sum",
  ],
};
const tips: Record<string, string> = {
  "Traversal & In-place": "Single pass, track running state (max, min, count).",
  "Two Pointers": "Sorted input, pairs/triplets, or opposite-end traversal.",
  "Sliding Window": "Look for longest, shortest, fixed size k, or at most K.",
  "Prefix Sum": "Range sums, subarray sums, or repeated prefix-based queries.",
  Fundamentals:
    "Use character counts and two-pointer scans to compare strings.",
  "Expand around center / substrings":
    "For palindromes, try each possible center.",
  "Frequency map & complement lookup":
    "Need O(1) “have I seen this?” lookups or counts.",
};
export const topics: Topic[] = groups.map(
  ([id, name, description, patterns]) => ({
    id,
    name,
    category: [
      "arrays",
      "strings",
      "hashing",
      "two-pointers",
      "sliding-window",
      "prefix-sum",
      "binary-search",
      "sorting",
    ].includes(id)
      ? "Foundations"
      : [
            "recursion-backtracking",
            "linked-list",
            "stack",
            "queue-deque",
            "heap",
            "trees",
            "bst",
            "graphs",
          ].includes(id)
        ? "Data structures"
        : "Problem solving",
    description,
    patterns: (patternOverrides[id] || patterns).map((p, i) => ({
      name: p,
      tip:
        tips[p] ||
        [
          `Look for ${p.toLowerCase()} clues in the constraints and input shape.`,
          `Track the invariant that stays true after each move.`,
          `Ask whether extra state can make each decision constant time.`,
        ][i % 3],
      problems: [],
    })),
  }),
);
