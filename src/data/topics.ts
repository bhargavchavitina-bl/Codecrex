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
    ["Two Pointers", "Sliding Window", "Kadane's", "Prefix Sum"],
  ],
  [
    "strings",
    "Strings",
    "Transform, compare and parse strings",
    ["Two Pointers", "Sliding Window"],
  ],
  [
    "hashing",
    "Hashing",
    "Trade space for near-constant lookup",
    ["Frequency map & complement lookup"],
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
];

const tips: Record<string, string> = {
  "Two Pointers":
    "Sorted arrays, pairs/triplets, in-place rewrites, opposite-end traversal.",
  "Sliding Window":
    "Contiguous subarray with a fixed size k or a condition (longest, shortest, at most K).",
  "Kadane's":
    "Best contiguous subarray sum/product: at each index decide to extend or restart.",
  "Prefix Sum":
    "Range-sum and subarray-sum queries; pair with a hash map to count subarrays.",
  "Frequency map & complement lookup":
    "Need O(1) “have I seen this?” lookups or counts.",
  "Opposite Ends": "Move inward from both sides until conditions meet.",
  "Fast & Slow": "Detect cycles or find midpoints with unequal speeds.",
  "Same Direction": "Filter, compress, or rewrite an array in place.",
  "Fixed Window": "Track running metrics over a window of length k.",
  "Variable Window": "Expand right until invalid, then shrink left to restore.",
  "Monotonic Window": "Maintain an ordered queue of window extrema.",
  "Running Sum": "Precompute cumulative totals to answer range queries in O(1).",
  "Range Queries": "Calculate subarray sums using prefix difference.",
  "Prefix + Hashing":
    "Pair running prefix sums with a hash map to count subarrays.",
  "Classic Search":
    "Eliminate half the candidates each step in sorted collections.",
  "Search on Answer": "Binary search the monotonic solution space.",
  "Rotated Arrays": "Determine which half is sorted, then narrow.",
  "Custom Ordering": "Define custom comparators to reveal structure.",
  "Counting & Bucketing": "Sort in linear time when values have limited range.",
  Intervals: "Sort start/end points to detect overlap.",
  "Subsets & Combinations": "Choose, explore, unchoose.",
  Permutations: "Explore all orderings by swapping or marking visited.",
  "Constraint Search": "Prune branches that cannot lead to a valid answer.",
  Reversal: "Track prev, curr, next to reverse pointers in-place.",
  "Merge & Intersections": "Splice lists together or align head offsets.",
  "Monotonic Stack":
    "Maintain monotonic order to find next greater/smaller elements.",
  "Parsing & Matching":
    "Match opening/closing tokens or evaluate expressions.",
  "Min Stack": "Track secondary state alongside each element.",
  "BFS Queue": "Level-order traversal and shortest unweighted paths.",
  "Monotonic Deque": "Maintain sliding window maximum or minimum.",
  Design: "Implement custom data structures with amortized O(1) ops.",
  "Top K": "Keep k elements in a heap to find top candidates in O(n log k).",
  "Two Heaps":
    "Balance a max-heap and min-heap to track medians dynamically.",
  "K-way Merge": "Merge multiple sorted lists using a heap of head elements.",
  "DFS Traversals": "Pre-order, in-order, post-order recursive tree walks.",
  "Level Order": "Queue-based breadth-first tree exploration by depth.",
  "Tree Construction": "Rebuild trees from traversal orders.",
  "Search & Validate": "Use left < root < right invariant to search in O(h).",
  "Successor & Predecessor": "Locate in-order neighbors.",
  "Balanced Operations":
    "Maintain height balance for predictable logarithmic depth.",
  "BFS / DFS": "Explore connected components and paths.",
  "Shortest Path": "Dijkstra and BFS for minimum cost paths.",
  "Topological Sort":
    "Order directed acyclic graph dependencies using in-degrees.",
  "Union Find & MST":
    "Disjoint-set forests to track connected components and cycles.",
  Scheduling: "Prioritize shortest, earliest, or highest value tasks.",
  "Choice & Exchange":
    "Make locally optimal decisions that guarantee global optimality.",
  "1D & 2D": "Define base cases and step transitions.",
  "Subsequences & LIS":
    "Formulate recurrence on prefixes and previous matches.",
  "Knapsack & Partition":
    "Decide whether to include each item given bounded capacity.",
  "Strings & Grids": "Compare characters or move along grid coordinates.",
  "Prefix Search": "Store characters along edges for fast prefix matching.",
  "Word Dictionary":
    "Support wildcard search through backtracking over trie branches.",
  "Bitwise Trie": "Insert binary numbers to find maximum XOR pairs.",
  "XOR Patterns": "Use x ^ x = 0 to isolate unique values.",
  "Masks & Subsets": "Enumerate subsets using bit shifts 1 << i.",
  "Bit Counting": "Clear least significant bit with n & (n - 1).",
};

const stringTips: Record<string, string> = {
  "Two Pointers":
    "Palindromes, reversals, in-place edits, comparing/merging strings, expanding around a center.",
  "Sliding Window":
    "Substring problems: longest/shortest with a condition, anagram/permutation matching, character counts.",
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
    patterns: patterns.map((p, i) => ({
      name: p,
      tip:
        id === "strings" && stringTips[p]
          ? stringTips[p]
          : tips[p] ||
            [
              `Look for ${p.toLowerCase()} clues in the constraints and input shape.`,
              `Track the invariant that stays true after each move.`,
              `Ask whether extra state can make each decision constant time.`,
            ][i % 3],
      problems: [],
    })),
  }),
);
