import { topics } from "./topics.ts";

export type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topicId: string;
  topicIds?: string[];
  pattern: string;
  patternByTopic?: Record<string, string>;
  leetcodeSlug: string;
  companies: string[];
  tags: string[];
  note?: string;
  importance: 1 | 2 | 3;
};

export function problemMatchesTopic(p: Problem, topicId: string): boolean {
  return p.topicId === topicId || (p.topicIds ? p.topicIds.includes(topicId) : false);
}

export function getProblemPatternForTopic(p: Problem, topicId: string): string {
  if (p.patternByTopic && p.patternByTopic[topicId]) {
    return p.patternByTopic[topicId];
  }
  return p.pattern;
}

export const problems: Problem[] = [
  {
    "id": "two-pointers-remove-duplicates-from-sorted-array",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Same Direction"
    },
    "leetcodeSlug": "remove-duplicates-from-sorted-array",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "arrays-remove-element",
    "title": "Remove Element",
    "difficulty": "Easy",
    "topicId": "arrays",
    "pattern": "Two Pointers",
    "leetcodeSlug": "remove-element",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "arrays-move-zeroes",
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Same Direction"
    },
    "leetcodeSlug": "move-zeroes",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "arrays-merge-sorted-array",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topicId": "arrays",
    "pattern": "Two Pointers",
    "leetcodeSlug": "merge-sorted-array",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "arrays-squares-of-a-sorted-array",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topicId": "arrays",
    "pattern": "Two Pointers",
    "leetcodeSlug": "squares-of-a-sorted-array",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "two-pointers-two-sum-ii-input-array-is-sorted",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Opposite Ends"
    },
    "leetcodeSlug": "two-sum-ii-input-array-is-sorted",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "two-pointers-3sum",
    "title": "3Sum",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Opposite Ends"
    },
    "leetcodeSlug": "3sum",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "arrays-3sum-closest",
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Two Pointers",
    "leetcodeSlug": "3sum-closest",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "arrays-4sum",
    "title": "4Sum",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Two Pointers",
    "leetcodeSlug": "4sum",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "two-pointers-sort-colors",
    "title": "Sort Colors",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers",
      "sorting"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Same Direction",
      "sorting": "Counting & Bucketing"
    },
    "leetcodeSlug": "sort-colors",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "arrays-container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Opposite Ends"
    },
    "leetcodeSlug": "container-with-most-water",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "arrays-boats-to-save-people",
    "title": "Boats to Save People",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Two Pointers",
    "leetcodeSlug": "boats-to-save-people",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "arrays-trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "arrays": "Two Pointers",
      "two-pointers": "Opposite Ends"
    },
    "leetcodeSlug": "trapping-rain-water",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "sliding-window-maximum-average-subarray-i",
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "sliding-window"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "arrays": "Sliding Window",
      "sliding-window": "Fixed Window"
    },
    "leetcodeSlug": "maximum-average-subarray-i",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "arrays-contains-duplicate-ii",
    "title": "Contains Duplicate II",
    "difficulty": "Easy",
    "topicId": "arrays",
    "pattern": "Sliding Window",
    "leetcodeSlug": "contains-duplicate-ii",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "arrays-minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "sliding-window",
      "two-pointers"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "arrays": "Sliding Window",
      "sliding-window": "Variable Window",
      "two-pointers": "Same Direction"
    },
    "leetcodeSlug": "minimum-size-subarray-sum",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "arrays-fruit-into-baskets",
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Sliding Window",
    "leetcodeSlug": "fruit-into-baskets",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "arrays-longest-subarray-of-1s-after-deleting-one-element",
    "title": "Longest Subarray of 1's After Deleting One Element",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Sliding Window",
    "leetcodeSlug": "longest-subarray-of-1s-after-deleting-one-element",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "arrays-max-consecutive-ones-iii",
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Sliding Window",
    "leetcodeSlug": "max-consecutive-ones-iii",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "arrays-subarrays-with-k-different-integers",
    "title": "Subarrays with K Different Integers",
    "difficulty": "Hard",
    "topicId": "arrays",
    "pattern": "Sliding Window",
    "leetcodeSlug": "subarrays-with-k-different-integers",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "strings-minimum-window-substring",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "strings",
      "sliding-window"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "arrays": "Sliding Window",
      "strings": "Sliding Window",
      "sliding-window": "Variable Window"
    },
    "leetcodeSlug": "minimum-window-substring",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "sliding-window-sliding-window-maximum",
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "sliding-window",
      "queue-deque"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "arrays": "Sliding Window",
      "sliding-window": "Monotonic Window",
      "queue-deque": "Monotonic Deque"
    },
    "leetcodeSlug": "sliding-window-maximum",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "arrays-subarray-product-less-than-k",
    "title": "Subarray Product Less Than K",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Sliding Window",
    "leetcodeSlug": "subarray-product-less-than-k",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "arrays-maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "dp"
    ],
    "pattern": "Kadane's",
    "patternByTopic": {
      "arrays": "Kadane's",
      "dp": "1D & 2D"
    },
    "leetcodeSlug": "maximum-subarray",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 3
  },
  {
    "id": "arrays-maximum-product-subarray",
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "dp"
    ],
    "pattern": "Kadane's",
    "patternByTopic": {
      "arrays": "Kadane's",
      "dp": "1D & 2D"
    },
    "leetcodeSlug": "maximum-product-subarray",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 3
  },
  {
    "id": "arrays-maximum-sum-circular-subarray",
    "title": "Maximum Sum Circular Subarray",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Kadane's",
    "leetcodeSlug": "maximum-sum-circular-subarray",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 3
  },
  {
    "id": "arrays-maximum-subarray-sum-with-one-deletion",
    "title": "Maximum Subarray Sum with One Deletion",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Kadane's",
    "leetcodeSlug": "maximum-subarray-sum-with-one-deletion",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 2
  },
  {
    "id": "arrays-best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "dp"
    ],
    "pattern": "Kadane's",
    "patternByTopic": {
      "arrays": "Kadane's",
      "dp": "1D & 2D"
    },
    "leetcodeSlug": "best-time-to-buy-and-sell-stock",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 3
  },
  {
    "id": "dp-best-time-to-buy-and-sell-stock-with-cooldown",
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "dp"
    ],
    "pattern": "Kadane's",
    "patternByTopic": {
      "arrays": "Kadane's",
      "dp": "1D & 2D"
    },
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 2
  },
  {
    "id": "arrays-best-time-to-buy-and-sell-stock-with-transaction-fee",
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Kadane's",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-with-transaction-fee",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 2
  },
  {
    "id": "dp-house-robber",
    "title": "House Robber",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "dp"
    ],
    "pattern": "Kadane's",
    "patternByTopic": {
      "arrays": "Kadane's",
      "dp": "1D & 2D"
    },
    "leetcodeSlug": "house-robber",
    "companies": [],
    "tags": [
      "kadane's"
    ],
    "importance": 3
  },
  {
    "id": "arrays-running-sum-of-1d-array",
    "title": "Running Sum of 1d Array",
    "difficulty": "Easy",
    "topicId": "arrays",
    "pattern": "Prefix Sum",
    "leetcodeSlug": "running-sum-of-1d-array",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 2
  },
  {
    "id": "prefix-sum-find-pivot-index",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "prefix-sum"
    ],
    "pattern": "Prefix Sum",
    "patternByTopic": {
      "arrays": "Prefix Sum",
      "prefix-sum": "Running Sum"
    },
    "leetcodeSlug": "find-pivot-index",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 2
  },
  {
    "id": "prefix-sum-range-sum-query-immutable",
    "title": "Range Sum Query - Immutable",
    "difficulty": "Easy",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "prefix-sum"
    ],
    "pattern": "Prefix Sum",
    "patternByTopic": {
      "arrays": "Prefix Sum",
      "prefix-sum": "Range Queries"
    },
    "leetcodeSlug": "range-sum-query-immutable",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 2
  },
  {
    "id": "arrays-range-sum-query-2d-immutable",
    "title": "Range Sum Query 2D - Immutable",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Prefix Sum",
    "leetcodeSlug": "range-sum-query-2d-immutable",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 2
  },
  {
    "id": "arrays-product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "prefix-sum"
    ],
    "pattern": "Prefix Sum",
    "patternByTopic": {
      "arrays": "Prefix Sum",
      "prefix-sum": "Running Sum"
    },
    "leetcodeSlug": "product-of-array-except-self",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 3
  },
  {
    "id": "arrays-continuous-subarray-sum",
    "title": "Continuous Subarray Sum",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Prefix Sum",
    "leetcodeSlug": "continuous-subarray-sum",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 3
  },
  {
    "id": "arrays-subarray-sums-divisible-by-k",
    "title": "Subarray Sums Divisible by K",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Prefix Sum",
    "leetcodeSlug": "subarray-sums-divisible-by-k",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 3
  },
  {
    "id": "prefix-sum-subarray-sum-equals-k",
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "prefix-sum"
    ],
    "pattern": "Prefix Sum",
    "patternByTopic": {
      "arrays": "Prefix Sum",
      "prefix-sum": "Prefix + Hashing"
    },
    "leetcodeSlug": "subarray-sum-equals-k",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 3
  },
  {
    "id": "prefix-sum-contiguous-array",
    "title": "Contiguous Array",
    "difficulty": "Medium",
    "topicId": "arrays",
    "topicIds": [
      "arrays",
      "prefix-sum"
    ],
    "pattern": "Prefix Sum",
    "patternByTopic": {
      "arrays": "Prefix Sum",
      "prefix-sum": "Prefix + Hashing"
    },
    "leetcodeSlug": "contiguous-array",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 3
  },
  {
    "id": "arrays-maximum-size-subarray-sum-equals-k",
    "title": "Maximum Size Subarray Sum Equals k",
    "difficulty": "Medium",
    "topicId": "arrays",
    "pattern": "Prefix Sum",
    "leetcodeSlug": "maximum-size-subarray-sum-equals-k",
    "companies": [],
    "tags": [
      "prefix sum"
    ],
    "importance": 2
  },
  {
    "id": "strings-valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "strings": "Two Pointers",
      "two-pointers": "Opposite Ends"
    },
    "leetcodeSlug": "valid-palindrome",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "strings-valid-palindrome-ii",
    "title": "Valid Palindrome II",
    "difficulty": "Easy",
    "topicId": "strings",
    "pattern": "Two Pointers",
    "leetcodeSlug": "valid-palindrome-ii",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "strings-reverse-string",
    "title": "Reverse String",
    "difficulty": "Easy",
    "topicId": "strings",
    "pattern": "Two Pointers",
    "leetcodeSlug": "reverse-string",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "strings-reverse-vowels-of-a-string",
    "title": "Reverse Vowels of a String",
    "difficulty": "Easy",
    "topicId": "strings",
    "pattern": "Two Pointers",
    "leetcodeSlug": "reverse-vowels-of-a-string",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "strings-reverse-words-in-a-string",
    "title": "Reverse Words in a String",
    "difficulty": "Medium",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "two-pointers"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "strings": "Two Pointers",
      "two-pointers": "Same Direction"
    },
    "leetcodeSlug": "reverse-words-in-a-string",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "strings-longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "dp"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "strings": "Two Pointers",
      "dp": "Strings & Grids"
    },
    "leetcodeSlug": "longest-palindromic-substring",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "strings-palindromic-substrings",
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "dp"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "strings": "Two Pointers",
      "dp": "Strings & Grids"
    },
    "leetcodeSlug": "palindromic-substrings",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 3
  },
  {
    "id": "strings-count-substrings-that-differ-by-one-character",
    "title": "Count Substrings That Differ by One Character",
    "difficulty": "Medium",
    "topicId": "strings",
    "pattern": "Two Pointers",
    "leetcodeSlug": "count-substrings-that-differ-by-one-character",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "strings-compare-version-numbers",
    "title": "Compare Version Numbers",
    "difficulty": "Medium",
    "topicId": "strings",
    "pattern": "Two Pointers",
    "leetcodeSlug": "compare-version-numbers",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "strings-integer-to-roman",
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "topicId": "strings",
    "pattern": "Two Pointers",
    "leetcodeSlug": "integer-to-roman",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "strings-roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "math"
    ],
    "pattern": "Two Pointers",
    "patternByTopic": {
      "strings": "Two Pointers",
      "math": "Combinatorics"
    },
    "leetcodeSlug": "roman-to-integer",
    "companies": [],
    "tags": [
      "two pointers"
    ],
    "importance": 2
  },
  {
    "id": "sliding-window-longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "sliding-window"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "strings": "Sliding Window",
      "sliding-window": "Variable Window"
    },
    "leetcodeSlug": "longest-substring-without-repeating-characters",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "strings-longest-substring-with-at-most-k-distinct-characters",
    "title": "Longest Substring with At Most K Distinct Characters",
    "difficulty": "Medium",
    "topicId": "strings",
    "pattern": "Sliding Window",
    "leetcodeSlug": "longest-substring-with-at-most-k-distinct-characters",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "sliding-window-longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "sliding-window"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "strings": "Sliding Window",
      "sliding-window": "Variable Window"
    },
    "leetcodeSlug": "longest-repeating-character-replacement",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "sliding-window-permutation-in-string",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "topicId": "strings",
    "topicIds": [
      "strings",
      "sliding-window"
    ],
    "pattern": "Sliding Window",
    "patternByTopic": {
      "strings": "Sliding Window",
      "sliding-window": "Fixed Window"
    },
    "leetcodeSlug": "permutation-in-string",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "strings-find-all-anagrams-in-a-string",
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "topicId": "strings",
    "pattern": "Sliding Window",
    "leetcodeSlug": "find-all-anagrams-in-a-string",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 3
  },
  {
    "id": "strings-substring-with-concatenation-of-all-words",
    "title": "Substring with Concatenation of All Words",
    "difficulty": "Hard",
    "topicId": "strings",
    "pattern": "Sliding Window",
    "leetcodeSlug": "substring-with-concatenation-of-all-words",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "strings-minimum-window-subsequence",
    "title": "Minimum Window Subsequence",
    "difficulty": "Hard",
    "topicId": "strings",
    "pattern": "Sliding Window",
    "leetcodeSlug": "minimum-window-subsequence",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "strings-find-the-longest-substring-containing-vowels-in-even-counts",
    "title": "Find the Longest Substring Containing Vowels in Even Counts",
    "difficulty": "Medium",
    "topicId": "strings",
    "pattern": "Sliding Window",
    "leetcodeSlug": "find-the-longest-substring-containing-vowels-in-even-counts",
    "companies": [],
    "tags": [
      "sliding window"
    ],
    "importance": 2
  },
  {
    "id": "arrays-two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "two-sum",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 3
  },
  {
    "id": "arrays-contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "contains-duplicate",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 2
  },
  {
    "id": "arrays-majority-element",
    "title": "Majority Element",
    "difficulty": "Easy",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "majority-element",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 2
  },
  {
    "id": "strings-valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "valid-anagram",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 2
  },
  {
    "id": "strings-group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "group-anagrams",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 3
  },
  {
    "id": "arrays-rotate-array",
    "title": "Rotate Array",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "rotate-array",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 2
  },
  {
    "id": "arrays-next-permutation",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "next-permutation",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 3
  },
  {
    "id": "arrays-missing-number",
    "title": "Missing Number",
    "difficulty": "Easy",
    "topicId": "bit-manipulation",
    "pattern": "XOR Patterns",
    "leetcodeSlug": "missing-number",
    "companies": [],
    "tags": [
      "xor patterns"
    ],
    "importance": 2
  },
  {
    "id": "arrays-find-the-duplicate-number",
    "title": "Find the Duplicate Number",
    "difficulty": "Medium",
    "topicId": "two-pointers",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "find-the-duplicate-number",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 2
  },
  {
    "id": "arrays-first-missing-positive",
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "topicId": "sorting",
    "pattern": "Counting & Bucketing",
    "leetcodeSlug": "first-missing-positive",
    "companies": [],
    "tags": [
      "counting & bucketing"
    ],
    "importance": 2
  },
  {
    "id": "strings-longest-common-prefix",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "topicId": "tries",
    "pattern": "Prefix Search",
    "leetcodeSlug": "longest-common-prefix",
    "companies": [],
    "tags": [
      "prefix search"
    ],
    "importance": 1
  },
  {
    "id": "strings-find-the-index-of-the-first-occurrence-in-a-string",
    "title": "Find the Index of the First Occurrence in a String",
    "difficulty": "Easy",
    "topicId": "two-pointers",
    "pattern": "Same Direction",
    "leetcodeSlug": "find-the-index-of-the-first-occurrence-in-a-string",
    "companies": [],
    "tags": [
      "same direction"
    ],
    "importance": 1
  },
  {
    "id": "strings-string-to-integer-atoi",
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Modular Arithmetic",
    "leetcodeSlug": "string-to-integer-atoi",
    "companies": [],
    "tags": [
      "modular arithmetic"
    ],
    "importance": 2
  },
  {
    "id": "hashing-longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "longest-consecutive-sequence",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 3
  },
  {
    "id": "heap-top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "topicId": "heap",
    "topicIds": [
      "heap",
      "hashing"
    ],
    "pattern": "Top K",
    "patternByTopic": {
      "heap": "Top K",
      "hashing": "Frequency map & complement lookup"
    },
    "leetcodeSlug": "top-k-frequent-elements",
    "companies": [],
    "tags": [
      "top k"
    ],
    "importance": 3
  },
  {
    "id": "hashing-4sum-ii",
    "title": "4Sum II",
    "difficulty": "Medium",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "4sum-ii",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 2
  },
  {
    "id": "hashing-isomorphic-strings",
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "topicId": "hashing",
    "pattern": "Frequency map & complement lookup",
    "leetcodeSlug": "isomorphic-strings",
    "companies": [],
    "tags": [
      "frequency map & complement lookup"
    ],
    "importance": 1
  },
  {
    "id": "binary-search-binary-search",
    "title": "Binary Search",
    "difficulty": "Easy",
    "topicId": "binary-search",
    "pattern": "Classic Search",
    "leetcodeSlug": "binary-search",
    "companies": [],
    "tags": [
      "classic search"
    ],
    "importance": 3
  },
  {
    "id": "binary-search-search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "topicId": "binary-search",
    "pattern": "Rotated Arrays",
    "leetcodeSlug": "search-in-rotated-sorted-array",
    "companies": [],
    "tags": [
      "rotated arrays"
    ],
    "importance": 3
  },
  {
    "id": "binary-search-find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "topicId": "binary-search",
    "pattern": "Rotated Arrays",
    "leetcodeSlug": "find-minimum-in-rotated-sorted-array",
    "companies": [],
    "tags": [
      "rotated arrays"
    ],
    "importance": 2
  },
  {
    "id": "binary-search-koko-eating-bananas",
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "topicId": "binary-search",
    "pattern": "Search on Answer",
    "leetcodeSlug": "koko-eating-bananas",
    "companies": [],
    "tags": [
      "search on answer"
    ],
    "importance": 3
  },
  {
    "id": "binary-search-median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "topicId": "binary-search",
    "pattern": "Search on Answer",
    "leetcodeSlug": "median-of-two-sorted-arrays",
    "companies": [],
    "tags": [
      "search on answer"
    ],
    "importance": 3
  },
  {
    "id": "sorting-merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topicId": "sorting",
    "pattern": "Intervals",
    "leetcodeSlug": "merge-intervals",
    "companies": [],
    "tags": [
      "intervals"
    ],
    "importance": 3
  },
  {
    "id": "sorting-largest-number",
    "title": "Largest Number",
    "difficulty": "Medium",
    "topicId": "sorting",
    "pattern": "Custom Ordering",
    "leetcodeSlug": "largest-number",
    "companies": [],
    "tags": [
      "custom ordering"
    ],
    "importance": 2
  },
  {
    "id": "sorting-meeting-rooms",
    "title": "Meeting Rooms",
    "difficulty": "Easy",
    "topicId": "sorting",
    "pattern": "Intervals",
    "leetcodeSlug": "meeting-rooms",
    "companies": [],
    "tags": [
      "intervals"
    ],
    "importance": 2
  },
  {
    "id": "sorting-insertion-sort-list",
    "title": "Insertion Sort List",
    "difficulty": "Medium",
    "topicId": "sorting",
    "pattern": "Custom Ordering",
    "leetcodeSlug": "insertion-sort-list",
    "companies": [],
    "tags": [
      "custom ordering"
    ],
    "importance": 1
  },
  {
    "id": "recursion-backtracking-subsets",
    "title": "Subsets",
    "difficulty": "Medium",
    "topicId": "recursion-backtracking",
    "pattern": "Subsets & Combinations",
    "leetcodeSlug": "subsets",
    "companies": [],
    "tags": [
      "subsets & combinations"
    ],
    "importance": 3
  },
  {
    "id": "recursion-backtracking-combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topicId": "recursion-backtracking",
    "pattern": "Subsets & Combinations",
    "leetcodeSlug": "combination-sum",
    "companies": [],
    "tags": [
      "subsets & combinations"
    ],
    "importance": 3
  },
  {
    "id": "recursion-backtracking-permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "topicId": "recursion-backtracking",
    "pattern": "Permutations",
    "leetcodeSlug": "permutations",
    "companies": [],
    "tags": [
      "permutations"
    ],
    "importance": 3
  },
  {
    "id": "recursion-backtracking-word-search",
    "title": "Word Search",
    "difficulty": "Medium",
    "topicId": "recursion-backtracking",
    "pattern": "Constraint Search",
    "leetcodeSlug": "word-search",
    "companies": [],
    "tags": [
      "constraint search"
    ],
    "importance": 3
  },
  {
    "id": "recursion-backtracking-n-queens",
    "title": "N-Queens",
    "difficulty": "Hard",
    "topicId": "recursion-backtracking",
    "pattern": "Constraint Search",
    "leetcodeSlug": "n-queens",
    "companies": [],
    "tags": [
      "constraint search"
    ],
    "importance": 2
  },
  {
    "id": "recursion-backtracking-letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "topicId": "recursion-backtracking",
    "pattern": "Subsets & Combinations",
    "leetcodeSlug": "letter-combinations-of-a-phone-number",
    "companies": [],
    "tags": [
      "subsets & combinations"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-reverse-linked-list",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topicId": "linked-list",
    "pattern": "Reversal",
    "leetcodeSlug": "reverse-linked-list",
    "companies": [],
    "tags": [
      "reversal"
    ],
    "importance": 3
  },
  {
    "id": "linked-list-linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "topicId": "linked-list",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "linked-list-cycle",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 3
  },
  {
    "id": "linked-list-merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topicId": "linked-list",
    "pattern": "Merge & Intersections",
    "leetcodeSlug": "merge-two-sorted-lists",
    "companies": [],
    "tags": [
      "merge & intersections"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-reorder-list",
    "title": "Reorder List",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Reversal",
    "leetcodeSlug": "reorder-list",
    "companies": [],
    "tags": [
      "reversal"
    ],
    "importance": 3
  },
  {
    "id": "linked-list-remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "remove-nth-node-from-end-of-list",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Merge & Intersections",
    "leetcodeSlug": "lru-cache",
    "companies": [],
    "tags": [
      "merge & intersections"
    ],
    "importance": 3
  },
  {
    "id": "stack-valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "topicId": "stack",
    "pattern": "Parsing & Matching",
    "leetcodeSlug": "valid-parentheses",
    "companies": [],
    "tags": [
      "parsing & matching"
    ],
    "importance": 3
  },
  {
    "id": "stack-min-stack",
    "title": "Min Stack",
    "difficulty": "Medium",
    "topicId": "stack",
    "pattern": "Min Stack",
    "leetcodeSlug": "min-stack",
    "companies": [],
    "tags": [
      "min stack"
    ],
    "importance": 2
  },
  {
    "id": "stack-daily-temperatures",
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "topicId": "stack",
    "pattern": "Monotonic Stack",
    "leetcodeSlug": "daily-temperatures",
    "companies": [],
    "tags": [
      "monotonic stack"
    ],
    "importance": 3
  },
  {
    "id": "stack-largest-rectangle-in-histogram",
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topicId": "stack",
    "pattern": "Monotonic Stack",
    "leetcodeSlug": "largest-rectangle-in-histogram",
    "companies": [],
    "tags": [
      "monotonic stack"
    ],
    "importance": 3
  },
  {
    "id": "stack-evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "topicId": "stack",
    "pattern": "Parsing & Matching",
    "leetcodeSlug": "evaluate-reverse-polish-notation",
    "companies": [],
    "tags": [
      "parsing & matching"
    ],
    "importance": 2
  },
  {
    "id": "queue-deque-implement-queue-using-stacks",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topicId": "queue-deque",
    "pattern": "Design",
    "leetcodeSlug": "implement-queue-using-stacks",
    "companies": [],
    "tags": [
      "design"
    ],
    "importance": 1
  },
  {
    "id": "queue-deque-number-of-recent-calls",
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "topicId": "queue-deque",
    "pattern": "Design",
    "leetcodeSlug": "number-of-recent-calls",
    "companies": [],
    "tags": [
      "design"
    ],
    "importance": 1
  },
  {
    "id": "queue-deque-rotting-oranges",
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "topicId": "queue-deque",
    "pattern": "BFS Queue",
    "leetcodeSlug": "rotting-oranges",
    "companies": [],
    "tags": [
      "bfs queue"
    ],
    "importance": 2
  },
  {
    "id": "heap-kth-largest-element-in-an-array",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "topicId": "heap",
    "pattern": "Top K",
    "leetcodeSlug": "kth-largest-element-in-an-array",
    "companies": [],
    "tags": [
      "top k"
    ],
    "importance": 3
  },
  {
    "id": "heap-find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "topicId": "heap",
    "pattern": "Two Heaps",
    "leetcodeSlug": "find-median-from-data-stream",
    "companies": [],
    "tags": [
      "two heaps"
    ],
    "importance": 3
  },
  {
    "id": "heap-merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "topicId": "heap",
    "pattern": "K-way Merge",
    "leetcodeSlug": "merge-k-sorted-lists",
    "companies": [],
    "tags": [
      "k-way merge"
    ],
    "importance": 3
  },
  {
    "id": "heap-last-stone-weight",
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "topicId": "heap",
    "pattern": "Top K",
    "leetcodeSlug": "last-stone-weight",
    "companies": [],
    "tags": [
      "top k"
    ],
    "importance": 1
  },
  {
    "id": "heap-task-scheduler",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topicId": "heap",
    "pattern": "Top K",
    "leetcodeSlug": "task-scheduler",
    "companies": [],
    "tags": [
      "top k"
    ],
    "importance": 2
  },
  {
    "id": "trees-maximum-depth-of-binary-tree",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "maximum-depth-of-binary-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 3
  },
  {
    "id": "trees-invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "invert-binary-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-binary-tree-level-order-traversal",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "Level Order",
    "leetcodeSlug": "binary-tree-level-order-traversal",
    "companies": [],
    "tags": [
      "level order"
    ],
    "importance": 3
  },
  {
    "id": "trees-diameter-of-binary-tree",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "diameter-of-binary-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 3
  },
  {
    "id": "trees-lowest-common-ancestor-of-a-binary-tree",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "lowest-common-ancestor-of-a-binary-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 3
  },
  {
    "id": "trees-serialize-and-deserialize-binary-tree",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "topicId": "trees",
    "pattern": "Tree Construction",
    "leetcodeSlug": "serialize-and-deserialize-binary-tree",
    "companies": [],
    "tags": [
      "tree construction"
    ],
    "importance": 3
  },
  {
    "id": "bst-validate-binary-search-tree",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Search & Validate",
    "leetcodeSlug": "validate-binary-search-tree",
    "companies": [],
    "tags": [
      "search & validate"
    ],
    "importance": 3
  },
  {
    "id": "bst-kth-smallest-element-in-a-bst",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Successor & Predecessor",
    "leetcodeSlug": "kth-smallest-element-in-a-bst",
    "companies": [],
    "tags": [
      "successor & predecessor"
    ],
    "importance": 2
  },
  {
    "id": "bst-lowest-common-ancestor-of-a-binary-search-tree",
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Search & Validate",
    "leetcodeSlug": "lowest-common-ancestor-of-a-binary-search-tree",
    "companies": [],
    "tags": [
      "search & validate"
    ],
    "importance": 2
  },
  {
    "id": "bst-convert-sorted-array-to-binary-search-tree",
    "title": "Convert Sorted Array to Binary Search Tree",
    "difficulty": "Easy",
    "topicId": "bst",
    "pattern": "Balanced Operations",
    "leetcodeSlug": "convert-sorted-array-to-binary-search-tree",
    "companies": [],
    "tags": [
      "balanced operations"
    ],
    "importance": 1
  },
  {
    "id": "graphs-number-of-islands",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "number-of-islands",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 3
  },
  {
    "id": "graphs-clone-graph",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "clone-graph",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 2
  },
  {
    "id": "graphs-course-schedule",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Topological Sort",
    "leetcodeSlug": "course-schedule",
    "companies": [],
    "tags": [
      "topological sort"
    ],
    "importance": 3
  },
  {
    "id": "graphs-network-delay-time",
    "title": "Network Delay Time",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Shortest Path",
    "leetcodeSlug": "network-delay-time",
    "companies": [],
    "tags": [
      "shortest path"
    ],
    "importance": 2
  },
  {
    "id": "graphs-redundant-connection",
    "title": "Redundant Connection",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Union Find & MST",
    "leetcodeSlug": "redundant-connection",
    "companies": [],
    "tags": [
      "union find & mst"
    ],
    "importance": 2
  },
  {
    "id": "graphs-min-cost-to-connect-all-points",
    "title": "Min Cost to Connect All Points",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Union Find & MST",
    "leetcodeSlug": "min-cost-to-connect-all-points",
    "companies": [],
    "tags": [
      "union find & mst"
    ],
    "importance": 2
  },
  {
    "id": "graphs-pacific-atlantic-water-flow",
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "pacific-atlantic-water-flow",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 2
  },
  {
    "id": "graphs-word-ladder",
    "title": "Word Ladder",
    "difficulty": "Hard",
    "topicId": "graphs",
    "pattern": "Shortest Path",
    "leetcodeSlug": "word-ladder",
    "companies": [],
    "tags": [
      "shortest path"
    ],
    "importance": 2
  },
  {
    "id": "greedy-jump-game",
    "title": "Jump Game",
    "difficulty": "Medium",
    "topicId": "greedy",
    "pattern": "Choice & Exchange",
    "leetcodeSlug": "jump-game",
    "companies": [],
    "tags": [
      "choice & exchange"
    ],
    "importance": 3
  },
  {
    "id": "greedy-gas-station",
    "title": "Gas Station",
    "difficulty": "Medium",
    "topicId": "greedy",
    "pattern": "Choice & Exchange",
    "leetcodeSlug": "gas-station",
    "companies": [],
    "tags": [
      "choice & exchange"
    ],
    "importance": 2
  },
  {
    "id": "greedy-non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topicId": "greedy",
    "pattern": "Intervals",
    "leetcodeSlug": "non-overlapping-intervals",
    "companies": [],
    "tags": [
      "intervals"
    ],
    "importance": 2
  },
  {
    "id": "greedy-partition-labels",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "topicId": "greedy",
    "pattern": "Scheduling",
    "leetcodeSlug": "partition-labels",
    "companies": [],
    "tags": [
      "scheduling"
    ],
    "importance": 2
  },
  {
    "id": "greedy-candy",
    "title": "Candy",
    "difficulty": "Hard",
    "topicId": "greedy",
    "pattern": "Choice & Exchange",
    "leetcodeSlug": "candy",
    "companies": [],
    "tags": [
      "choice & exchange"
    ],
    "importance": 2
  },
  {
    "id": "dp-climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "topicId": "dp",
    "pattern": "1D & 2D",
    "leetcodeSlug": "climbing-stairs",
    "companies": [],
    "tags": [
      "1d & 2d"
    ],
    "importance": 2
  },
  {
    "id": "dp-coin-change",
    "title": "Coin Change",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Knapsack & Partition",
    "leetcodeSlug": "coin-change",
    "companies": [],
    "tags": [
      "knapsack & partition"
    ],
    "importance": 3
  },
  {
    "id": "dp-longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Subsequences & LIS",
    "leetcodeSlug": "longest-increasing-subsequence",
    "companies": [],
    "tags": [
      "subsequences & lis"
    ],
    "importance": 3
  },
  {
    "id": "dp-longest-common-subsequence",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "longest-common-subsequence",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 3
  },
  {
    "id": "dp-word-break",
    "title": "Word Break",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "word-break",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-unique-paths",
    "title": "Unique Paths",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "unique-paths",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-edit-distance",
    "title": "Edit Distance",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "edit-distance",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-partition-equal-subset-sum",
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Knapsack & Partition",
    "leetcodeSlug": "partition-equal-subset-sum",
    "companies": [],
    "tags": [
      "knapsack & partition"
    ],
    "importance": 2
  },
  {
    "id": "dp-longest-palindromic-subsequence",
    "title": "Longest Palindromic Subsequence",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Subsequences & LIS",
    "leetcodeSlug": "longest-palindromic-subsequence",
    "companies": [],
    "tags": [
      "subsequences & lis"
    ],
    "importance": 2
  },
  {
    "id": "tries-implement-trie-prefix-tree",
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "topicId": "tries",
    "pattern": "Prefix Search",
    "leetcodeSlug": "implement-trie-prefix-tree",
    "companies": [],
    "tags": [
      "prefix search"
    ],
    "importance": 2
  },
  {
    "id": "tries-design-add-and-search-words-data-structure",
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "topicId": "tries",
    "pattern": "Word Dictionary",
    "leetcodeSlug": "design-add-and-search-words-data-structure",
    "companies": [],
    "tags": [
      "word dictionary"
    ],
    "importance": 2
  },
  {
    "id": "bit-manipulation-single-number",
    "title": "Single Number",
    "difficulty": "Easy",
    "topicId": "bit-manipulation",
    "pattern": "XOR Patterns",
    "leetcodeSlug": "single-number",
    "companies": [],
    "tags": [
      "xor patterns"
    ],
    "importance": 2
  },
  {
    "id": "bit-manipulation-counting-bits",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "topicId": "bit-manipulation",
    "pattern": "Bit Counting",
    "leetcodeSlug": "counting-bits",
    "companies": [],
    "tags": [
      "bit counting"
    ],
    "importance": 2
  },
  {
    "id": "bit-manipulation-sum-of-two-integers",
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "topicId": "bit-manipulation",
    "pattern": "Masks & Subsets",
    "leetcodeSlug": "sum-of-two-integers",
    "companies": [],
    "tags": [
      "masks & subsets"
    ],
    "importance": 1
  },
  {
    "id": "math-happy-number",
    "title": "Happy Number",
    "difficulty": "Easy",
    "topicId": "math",
    "topicIds": [
      "math",
      "two-pointers"
    ],
    "pattern": "GCD & Primes",
    "patternByTopic": {
      "two-pointers": "Fast & Slow"
    },
    "leetcodeSlug": "happy-number",
    "companies": [],
    "tags": [
      "gcd & primes"
    ],
    "importance": 1
  },
  {
    "id": "math-powx-n",
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Modular Arithmetic",
    "leetcodeSlug": "powx-n",
    "companies": [],
    "tags": [
      "modular arithmetic"
    ],
    "importance": 2
  },
  {
    "id": "math-count-primes",
    "title": "Count Primes",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "GCD & Primes",
    "leetcodeSlug": "count-primes",
    "companies": [],
    "tags": [
      "gcd & primes"
    ],
    "importance": 1
  },
  {
    "id": "intervals-insert-interval",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "topicId": "intervals",
    "pattern": "Merge & Insert",
    "leetcodeSlug": "insert-interval",
    "companies": [],
    "tags": [
      "merge & insert"
    ],
    "importance": 2
  },
  {
    "id": "intervals-meeting-rooms-ii",
    "title": "Meeting Rooms II",
    "difficulty": "Medium",
    "topicId": "intervals",
    "pattern": "Meeting Rooms",
    "leetcodeSlug": "meeting-rooms-ii",
    "companies": [],
    "tags": [
      "meeting rooms"
    ],
    "importance": 2
  },
  {
    "id": "intervals-employee-free-time",
    "title": "Employee Free Time",
    "difficulty": "Hard",
    "topicId": "intervals",
    "pattern": "Sweep Line",
    "leetcodeSlug": "employee-free-time",
    "companies": [],
    "tags": [
      "sweep line"
    ],
    "importance": 1
  },
  {
    "id": "binary-search-search-insert-position",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "topicId": "binary-search",
    "pattern": "Classic Search",
    "leetcodeSlug": "search-insert-position",
    "companies": [],
    "tags": [
      "classic search"
    ],
    "importance": 2
  },
  {
    "id": "binary-search-find-first-and-last-position-of-element-in-sorted-array",
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "topicId": "binary-search",
    "pattern": "Classic Search",
    "leetcodeSlug": "find-first-and-last-position-of-element-in-sorted-array",
    "companies": [],
    "tags": [
      "classic search"
    ],
    "importance": 3
  },
  {
    "id": "binary-search-sqrtx",
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "topicId": "binary-search",
    "pattern": "Classic Search",
    "leetcodeSlug": "sqrtx",
    "companies": [],
    "tags": [
      "classic search"
    ],
    "importance": 1
  },
  {
    "id": "binary-search-find-peak-element",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "topicId": "binary-search",
    "pattern": "Classic Search",
    "leetcodeSlug": "find-peak-element",
    "companies": [],
    "tags": [
      "classic search"
    ],
    "importance": 2
  },
  {
    "id": "binary-search-capacity-to-ship-packages-within-d-days",
    "title": "Capacity To Ship Packages Within D Days",
    "difficulty": "Medium",
    "topicId": "binary-search",
    "pattern": "Search on Answer",
    "leetcodeSlug": "capacity-to-ship-packages-within-d-days",
    "companies": [],
    "tags": [
      "search on answer"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-add-two-numbers",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Merge & Intersections",
    "leetcodeSlug": "add-two-numbers",
    "companies": [],
    "tags": [
      "merge & intersections"
    ],
    "importance": 3
  },
  {
    "id": "linked-list-middle-of-the-linked-list",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "topicId": "linked-list",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "middle-of-the-linked-list",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-linked-list-cycle-ii",
    "title": "Linked List Cycle II",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "linked-list-cycle-ii",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-palindrome-linked-list",
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "topicId": "linked-list",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "palindrome-linked-list",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-intersection-of-two-linked-lists",
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "topicId": "linked-list",
    "pattern": "Fast & Slow",
    "leetcodeSlug": "intersection-of-two-linked-lists",
    "companies": [],
    "tags": [
      "fast & slow"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-copy-list-with-random-pointer",
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Merge & Intersections",
    "leetcodeSlug": "copy-list-with-random-pointer",
    "companies": [],
    "tags": [
      "merge & intersections"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-reverse-nodes-in-k-group",
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "topicId": "linked-list",
    "pattern": "Reversal",
    "leetcodeSlug": "reverse-nodes-in-k-group",
    "companies": [],
    "tags": [
      "reversal"
    ],
    "importance": 2
  },
  {
    "id": "linked-list-sort-list",
    "title": "Sort List",
    "difficulty": "Medium",
    "topicId": "linked-list",
    "pattern": "Merge & Intersections",
    "leetcodeSlug": "sort-list",
    "companies": [],
    "tags": [
      "merge & intersections"
    ],
    "importance": 2
  },
  {
    "id": "stack-next-greater-element-i",
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "topicId": "stack",
    "pattern": "Monotonic Stack",
    "leetcodeSlug": "next-greater-element-i",
    "companies": [],
    "tags": [
      "monotonic stack"
    ],
    "importance": 2
  },
  {
    "id": "stack-car-fleet",
    "title": "Car Fleet",
    "difficulty": "Medium",
    "topicId": "stack",
    "pattern": "Monotonic Stack",
    "leetcodeSlug": "car-fleet",
    "companies": [],
    "tags": [
      "monotonic stack"
    ],
    "importance": 2
  },
  {
    "id": "stack-asteroid-collision",
    "title": "Asteroid Collision",
    "difficulty": "Medium",
    "topicId": "stack",
    "pattern": "Monotonic Stack",
    "leetcodeSlug": "asteroid-collision",
    "companies": [],
    "tags": [
      "monotonic stack"
    ],
    "importance": 2
  },
  {
    "id": "stack-decode-string",
    "title": "Decode String",
    "difficulty": "Medium",
    "topicId": "stack",
    "pattern": "Parsing & Matching",
    "leetcodeSlug": "decode-string",
    "companies": [],
    "tags": [
      "parsing & matching"
    ],
    "importance": 2
  },
  {
    "id": "queue-deque-implement-stack-using-queues",
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "topicId": "queue-deque",
    "pattern": "Design",
    "leetcodeSlug": "implement-stack-using-queues",
    "companies": [],
    "tags": [
      "design"
    ],
    "importance": 1
  },
  {
    "id": "queue-deque-design-circular-queue",
    "title": "Design Circular Queue",
    "difficulty": "Medium",
    "topicId": "queue-deque",
    "pattern": "Design",
    "leetcodeSlug": "design-circular-queue",
    "companies": [],
    "tags": [
      "design"
    ],
    "importance": 1
  },
  {
    "id": "heap-k-closest-points-to-origin",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "topicId": "heap",
    "pattern": "Top K",
    "leetcodeSlug": "k-closest-points-to-origin",
    "companies": [],
    "tags": [
      "top k"
    ],
    "importance": 2
  },
  {
    "id": "heap-reorganize-string",
    "title": "Reorganize String",
    "difficulty": "Medium",
    "topicId": "heap",
    "pattern": "Top K",
    "leetcodeSlug": "reorganize-string",
    "companies": [],
    "tags": [
      "top k"
    ],
    "importance": 2
  },
  {
    "id": "trees-same-tree",
    "title": "Same Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "same-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-symmetric-tree",
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "symmetric-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-subtree-of-another-tree",
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "subtree-of-another-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-balanced-binary-tree",
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "balanced-binary-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-path-sum",
    "title": "Path Sum",
    "difficulty": "Easy",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "path-sum",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-count-good-nodes-in-binary-tree",
    "title": "Count Good Nodes in Binary Tree",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "count-good-nodes-in-binary-tree",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-flatten-binary-tree-to-linked-list",
    "title": "Flatten Binary Tree to Linked List",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "DFS Traversals",
    "leetcodeSlug": "flatten-binary-tree-to-linked-list",
    "companies": [],
    "tags": [
      "dfs traversals"
    ],
    "importance": 2
  },
  {
    "id": "trees-binary-tree-right-side-view",
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "Level Order",
    "leetcodeSlug": "binary-tree-right-side-view",
    "companies": [],
    "tags": [
      "level order"
    ],
    "importance": 2
  },
  {
    "id": "trees-binary-tree-zigzag-level-order-traversal",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "Level Order",
    "leetcodeSlug": "binary-tree-zigzag-level-order-traversal",
    "companies": [],
    "tags": [
      "level order"
    ],
    "importance": 2
  },
  {
    "id": "trees-construct-binary-tree-from-preorder-and-inorder-traversal",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "topicId": "trees",
    "pattern": "Tree Construction",
    "leetcodeSlug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "companies": [],
    "tags": [
      "tree construction"
    ],
    "importance": 2
  },
  {
    "id": "trees-binary-tree-maximum-path-sum",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "topicId": "trees",
    "pattern": "Tree Construction",
    "leetcodeSlug": "binary-tree-maximum-path-sum",
    "companies": [],
    "tags": [
      "tree construction"
    ],
    "importance": 3
  },
  {
    "id": "bst-insert-into-a-binary-search-tree",
    "title": "Insert into a Binary Search Tree",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Search & Validate",
    "leetcodeSlug": "insert-into-a-binary-search-tree",
    "companies": [],
    "tags": [
      "search & validate"
    ],
    "importance": 1
  },
  {
    "id": "bst-delete-node-in-a-bst",
    "title": "Delete Node in a BST",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Search & Validate",
    "leetcodeSlug": "delete-node-in-a-bst",
    "companies": [],
    "tags": [
      "search & validate"
    ],
    "importance": 2
  },
  {
    "id": "bst-binary-search-tree-iterator",
    "title": "Binary Search Tree Iterator",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Successor & Predecessor",
    "leetcodeSlug": "binary-search-tree-iterator",
    "companies": [],
    "tags": [
      "successor & predecessor"
    ],
    "importance": 2
  },
  {
    "id": "bst-recover-binary-search-tree",
    "title": "Recover Binary Search Tree",
    "difficulty": "Medium",
    "topicId": "bst",
    "pattern": "Search & Validate",
    "leetcodeSlug": "recover-binary-search-tree",
    "companies": [],
    "tags": [
      "search & validate"
    ],
    "importance": 2
  },
  {
    "id": "graphs-max-area-of-island",
    "title": "Max Area of Island",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "max-area-of-island",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 2
  },
  {
    "id": "graphs-surrounded-regions",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "surrounded-regions",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 2
  },
  {
    "id": "graphs-number-of-provinces",
    "title": "Number of Provinces",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "number-of-provinces",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 2
  },
  {
    "id": "graphs-is-graph-bipartite",
    "title": "Is Graph Bipartite?",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "BFS / DFS",
    "leetcodeSlug": "is-graph-bipartite",
    "companies": [],
    "tags": [
      "bfs / dfs"
    ],
    "importance": 2
  },
  {
    "id": "graphs-course-schedule-ii",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Topological Sort",
    "leetcodeSlug": "course-schedule-ii",
    "companies": [],
    "tags": [
      "topological sort"
    ],
    "importance": 2
  },
  {
    "id": "graphs-accounts-merge",
    "title": "Accounts Merge",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Union Find & MST",
    "leetcodeSlug": "accounts-merge",
    "companies": [],
    "tags": [
      "union find & mst"
    ],
    "importance": 2
  },
  {
    "id": "graphs-cheapest-flights-within-k-stops",
    "title": "Cheapest Flights Within K Stops",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Shortest Path",
    "leetcodeSlug": "cheapest-flights-within-k-stops",
    "companies": [],
    "tags": [
      "shortest path"
    ],
    "importance": 2
  },
  {
    "id": "graphs-path-with-minimum-effort",
    "title": "Path With Minimum Effort",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Shortest Path",
    "leetcodeSlug": "path-with-minimum-effort",
    "companies": [],
    "tags": [
      "shortest path"
    ],
    "importance": 2
  },
  {
    "id": "graphs-find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
    "title": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
    "difficulty": "Medium",
    "topicId": "graphs",
    "pattern": "Shortest Path",
    "leetcodeSlug": "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
    "companies": [],
    "tags": [
      "shortest path"
    ],
    "importance": 1
  },
  {
    "id": "greedy-assign-cookies",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "topicId": "greedy",
    "pattern": "Choice & Exchange",
    "leetcodeSlug": "assign-cookies",
    "companies": [],
    "tags": [
      "choice & exchange"
    ],
    "importance": 1
  },
  {
    "id": "greedy-lemonade-change",
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "topicId": "greedy",
    "pattern": "Choice & Exchange",
    "leetcodeSlug": "lemonade-change",
    "companies": [],
    "tags": [
      "choice & exchange"
    ],
    "importance": 1
  },
  {
    "id": "greedy-jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topicId": "greedy",
    "pattern": "Choice & Exchange",
    "leetcodeSlug": "jump-game-ii",
    "companies": [],
    "tags": [
      "choice & exchange"
    ],
    "importance": 2
  },
  {
    "id": "greedy-hand-of-straights",
    "title": "Hand of Straights",
    "difficulty": "Medium",
    "topicId": "greedy",
    "pattern": "Scheduling",
    "leetcodeSlug": "hand-of-straights",
    "companies": [],
    "tags": [
      "scheduling"
    ],
    "importance": 1
  },
  {
    "id": "greedy-minimum-number-of-arrows-to-burst-balloons",
    "title": "Minimum Number of Arrows to Burst Balloons",
    "difficulty": "Medium",
    "topicId": "greedy",
    "topicIds": [
      "greedy",
      "intervals"
    ],
    "pattern": "Intervals",
    "patternByTopic": {
      "greedy": "Intervals",
      "intervals": "Sweep Line"
    },
    "leetcodeSlug": "minimum-number-of-arrows-to-burst-balloons",
    "companies": [],
    "tags": [
      "intervals"
    ],
    "importance": 2
  },
  {
    "id": "dp-min-cost-climbing-stairs",
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "topicId": "dp",
    "pattern": "1D & 2D",
    "leetcodeSlug": "min-cost-climbing-stairs",
    "companies": [],
    "tags": [
      "1d & 2d"
    ],
    "importance": 2
  },
  {
    "id": "dp-house-robber-ii",
    "title": "House Robber II",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "1D & 2D",
    "leetcodeSlug": "house-robber-ii",
    "companies": [],
    "tags": [
      "1d & 2d"
    ],
    "importance": 2
  },
  {
    "id": "dp-decode-ways",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "1D & 2D",
    "leetcodeSlug": "decode-ways",
    "companies": [],
    "tags": [
      "1d & 2d"
    ],
    "importance": 3
  },
  {
    "id": "dp-coin-change-ii",
    "title": "Coin Change II",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Knapsack & Partition",
    "leetcodeSlug": "coin-change-ii",
    "companies": [],
    "tags": [
      "knapsack & partition"
    ],
    "importance": 2
  },
  {
    "id": "dp-target-sum",
    "title": "Target Sum",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Knapsack & Partition",
    "leetcodeSlug": "target-sum",
    "companies": [],
    "tags": [
      "knapsack & partition"
    ],
    "importance": 2
  },
  {
    "id": "dp-ones-and-zeroes",
    "title": "Ones and Zeroes",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Knapsack & Partition",
    "leetcodeSlug": "ones-and-zeroes",
    "companies": [],
    "tags": [
      "knapsack & partition"
    ],
    "importance": 1
  },
  {
    "id": "dp-minimum-path-sum",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "minimum-path-sum",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-triangle",
    "title": "Triangle",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "triangle",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 1
  },
  {
    "id": "dp-maximal-square",
    "title": "Maximal Square",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "maximal-square",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-distinct-subsequences",
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "topicId": "dp",
    "pattern": "Subsequences & LIS",
    "leetcodeSlug": "distinct-subsequences",
    "companies": [],
    "tags": [
      "subsequences & lis"
    ],
    "importance": 2
  },
  {
    "id": "dp-interleaving-string",
    "title": "Interleaving String",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "interleaving-string",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-regular-expression-matching",
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "topicId": "dp",
    "pattern": "Strings & Grids",
    "leetcodeSlug": "regular-expression-matching",
    "companies": [],
    "tags": [
      "strings & grids"
    ],
    "importance": 2
  },
  {
    "id": "dp-best-time-to-buy-and-sell-stock-ii",
    "title": "Best Time to Buy and Sell Stock II",
    "difficulty": "Medium",
    "topicId": "dp",
    "pattern": "1D & 2D",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-ii",
    "companies": [],
    "tags": [
      "1d & 2d"
    ],
    "importance": 2
  },
  {
    "id": "tries-replace-words",
    "title": "Replace Words",
    "difficulty": "Medium",
    "topicId": "tries",
    "pattern": "Prefix Search",
    "leetcodeSlug": "replace-words",
    "companies": [],
    "tags": [
      "prefix search"
    ],
    "importance": 1
  },
  {
    "id": "tries-word-search-ii",
    "title": "Word Search II",
    "difficulty": "Hard",
    "topicId": "tries",
    "pattern": "Word Dictionary",
    "leetcodeSlug": "word-search-ii",
    "companies": [],
    "tags": [
      "word dictionary"
    ],
    "importance": 2
  },
  {
    "id": "tries-maximum-xor-of-two-numbers-in-an-array",
    "title": "Maximum XOR of Two Numbers in an Array",
    "difficulty": "Medium",
    "topicId": "tries",
    "pattern": "Bitwise Trie",
    "leetcodeSlug": "maximum-xor-of-two-numbers-in-an-array",
    "companies": [],
    "tags": [
      "bitwise trie"
    ],
    "importance": 2
  },
  {
    "id": "bit-manipulation-number-of-1-bits",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "topicId": "bit-manipulation",
    "pattern": "Bit Counting",
    "leetcodeSlug": "number-of-1-bits",
    "companies": [],
    "tags": [
      "bit counting"
    ],
    "importance": 1
  },
  {
    "id": "bit-manipulation-reverse-bits",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "topicId": "bit-manipulation",
    "pattern": "Bit Counting",
    "leetcodeSlug": "reverse-bits",
    "companies": [],
    "tags": [
      "bit counting"
    ],
    "importance": 1
  },
  {
    "id": "bit-manipulation-power-of-two",
    "title": "Power of Two",
    "difficulty": "Easy",
    "topicId": "bit-manipulation",
    "pattern": "Bit Counting",
    "leetcodeSlug": "power-of-two",
    "companies": [],
    "tags": [
      "bit counting"
    ],
    "importance": 1
  },
  {
    "id": "bit-manipulation-single-number-ii",
    "title": "Single Number II",
    "difficulty": "Medium",
    "topicId": "bit-manipulation",
    "pattern": "XOR Patterns",
    "leetcodeSlug": "single-number-ii",
    "companies": [],
    "tags": [
      "xor patterns"
    ],
    "importance": 2
  },
  {
    "id": "math-plus-one",
    "title": "Plus One",
    "difficulty": "Easy",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "plus-one",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 1
  },
  {
    "id": "math-palindrome-number",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "palindrome-number",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 1
  },
  {
    "id": "math-reverse-integer",
    "title": "Reverse Integer",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "reverse-integer",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 2
  },
  {
    "id": "math-excel-sheet-column-number",
    "title": "Excel Sheet Column Number",
    "difficulty": "Easy",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "excel-sheet-column-number",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 1
  },
  {
    "id": "math-factorial-trailing-zeroes",
    "title": "Factorial Trailing Zeroes",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "GCD & Primes",
    "leetcodeSlug": "factorial-trailing-zeroes",
    "companies": [],
    "tags": [
      "gcd & primes"
    ],
    "importance": 2
  },
  {
    "id": "math-multiply-strings",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "multiply-strings",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 2
  },
  {
    "id": "math-rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "rotate-image",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 2
  },
  {
    "id": "math-spiral-matrix",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "spiral-matrix",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 2
  },
  {
    "id": "math-set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topicId": "math",
    "pattern": "Combinatorics",
    "leetcodeSlug": "set-matrix-zeroes",
    "companies": [],
    "tags": [
      "combinatorics"
    ],
    "importance": 2
  },
  {
    "id": "intervals-interval-list-intersections",
    "title": "Interval List Intersections",
    "difficulty": "Medium",
    "topicId": "intervals",
    "pattern": "Merge & Insert",
    "leetcodeSlug": "interval-list-intersections",
    "companies": [],
    "tags": [
      "merge & insert"
    ],
    "importance": 2
  }
];

export const allTopics = topics;
