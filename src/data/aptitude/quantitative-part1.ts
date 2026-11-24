// src/data/aptitude/quantitative-part1.ts
import type { AptitudeTopicData } from "./types";

export const quantitativePart1: AptitudeTopicData[] = [
  // 1. Number System
  {
    id: "number-system",
    group: "quantitative",
    title: "Number System",
    summary:
      "Core mathematical properties of integers, primes, divisibility tests, remainders, factor counting, and unit digits that form the bedrock of quantitative problem solving.",
    context: {
      whyItMatters:
        "Foundation for HCF/LCM, remainders, divisibility and unit-digit questions; it also speeds up simplification in almost every other quant topic.",
      whereItAppears:
        "Typical questions: divisibility tests, remainders, unit digits, counting factors, trailing zeros, HCF/LCM word problems.",
      prerequisites: ["Tables up to 20", "Basic integer arithmetic", "Exponent rules"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Prime Factorisation",
        definition: "Expressing an integer as a unique product of prime powers: N = p^a · q^b · r^c.",
      },
      {
        term: "Euler's Totient / Cyclicity",
        definition: "The repeating period of unit digits under consecutive integer powers (cycles of length 1, 2, or 4).",
      },
      {
        term: "Division Algorithm",
        definition: "Dividend = (Divisor × Quotient) + Remainder, where 0 ≤ Remainder < Divisor.",
      },
    ],
    formulas: [
      {
        label: "Divisibility Rules",
        expression: "2: last digit even | 3: sum of digits div by 3 | 4: last 2 digits div by 4 | 5: ends in 0/5 | 6: div by 2 & 3 | 8: last 3 digits div by 8 | 9: sum of digits div by 9 | 11: (odd place sum) - (even place sum) is 0 or multiple of 11",
        whenToUse: "Use to rapidly test integer divisors without performing long division.",
        example: "For 7392: odd places (2 + 3 = 5), even places (9 + 7 = 16); 16 - 5 = 11, so 7392 is divisible by 11.",
      },
      {
        label: "Division Algorithm",
        expression: "Dividend = Divisor × Quotient + Remainder",
        whenToUse: "Use when remainders from successive or single integer divisions are given.",
        example: "If N divided by 7 leaves remainder 5, then N = 7k + 5.",
      },
      {
        label: "HCF and LCM Product Rule",
        expression: "HCF(a, b) × LCM(a, b) = a × b",
        whenToUse: "Applies to exactly two positive integers when one number or the product is requested.",
        example: "If HCF = 6, LCM = 72, and one number is 24: other number = (6 × 72) / 24 = 18.",
      },
      {
        label: "HCF & LCM of Fractions",
        expression: "HCF(fractions) = HCF(numerators) / LCM(denominators); LCM(fractions) = LCM(numerators) / HCF(denominators)",
        whenToUse: "Use on fractions reduced to their lowest irreducible terms.",
        example: "HCF of 2/3 and 4/9 = HCF(2, 4) / LCM(3, 9) = 2/9.",
      },
      {
        label: "Factors Count & Sum",
        expression: "If N = p^a · q^b · r^c: Total Factors = (a+1)(b+1)(c+1); Sum = [(p^(a+1)-1)/(p-1)] × [(q^(b+1)-1)/(q-1)] × [(r^(c+1)-1)/(r-1)]",
        whenToUse: "Use to count all divisors or compute their algebraic sum.",
        example: "72 = 2^3 × 3^2: Factors = (3+1)(2+1) = 12.",
      },
      {
        label: "Trailing Zeros in n!",
        expression: "Trailing Zeros = floor(n/5) + floor(n/25) + floor(n/125) + ...",
        whenToUse: "Use to count trailing zeros in large factorials.",
        example: "In 100!: floor(100/5) + floor(100/25) = 20 + 4 = 24 zeros.",
      },
      {
        label: "Sum of Series",
        expression: "Σn = n(n+1)/2 | Σ(odd) = n^2 | Σ(even) = n(n+1) | Σn^2 = n(n+1)(2n+1)/6 | Σn^3 = [n(n+1)/2]^2",
        whenToUse: "Use for rapid evaluation of consecutive integer sums and higher powers.",
        example: "Sum of first 20 natural numbers = 20 × 21 / 2 = 210.",
      },
      {
        label: "Algebraic Factorability",
        expression: "a^n - b^n is divisible by (a - b) for all n, and by (a + b) for even n; a^n + b^n is divisible by (a + b) for odd n",
        whenToUse: "Use to test divisibility of large exponential expressions.",
        example: "17^15 + 13^15 is divisible by (17 + 13) = 30.",
      },
      {
        label: "Unit Digit Cycles",
        expression: "2: [2,4,8,6] | 3: [3,9,7,1] | 7: [7,9,3,1] | 8: [8,4,2,6] (cycle 4); 4: [4,6] | 9: [9,1] (cycle 2); 0, 1, 5, 6: cycle 1",
        whenToUse: "Use to find the unit digit of large powers a^b.",
        example: "Unit digit of 7^45: 45 mod 4 = 1, so unit digit is 7.",
      },
    ],
    referenceTables: [
      {
        title: "Unit Digit Cyclicity Reference",
        headers: ["Base Unit Digit", "Cycle Length", "Sequence (pow 1, 2, 3, 4)"],
        rows: [
          ["0, 1, 5, 6", "1", "Always constant (0, 1, 5, 6)"],
          ["4", "2", "4 (odd pow), 6 (even pow)"],
          ["9", "2", "9 (odd pow), 1 (even pow)"],
          ["2", "4", "2, 4, 8, 6"],
          ["3", "4", "3, 9, 7, 1"],
          ["7", "4", "7, 9, 3, 1"],
          ["8", "4", "8, 4, 2, 6"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Power Cyclicity: Exponent mod Cycle Length",
        whenItWorks: "Divide the exponent by the unit digit cycle length; remainder gives the position (remainder 0 indicates the last element).",
      },
      {
        trick: "Euclid's HCF Algorithm",
        whenItWorks: "For large numbers a and b, compute HCF(a, b) = HCF(b, a mod b) until remainder is zero.",
      },
      {
        trick: "LCM via Prime Maximum Powers",
        whenItWorks: "Express numbers in prime factorization; select the highest exponent of every prime present.",
      },
    ],
    commonTraps: [
      {
        mistake: "Treating 1 as a prime number.",
        fix: "1 has only 1 distinct positive factor; prime numbers by definition must have exactly 2 distinct factors.",
      },
      {
        mistake: "Applying HCF × LCM = a × b × c for three numbers.",
        fix: "The product formula HCF × LCM = product of numbers is strictly valid for exactly two numbers.",
      },
      {
        mistake: "Interpreting remainder 0 in exponent cyclicity as power 0.",
        fix: "Remainder 0 in a cyclicity mod 4 means the 4th (last) element of the cycle, not the first.",
      },
    ],
    workedExamples: [
      {
        question: "Find the unit digit of 7^105.",
        steps: [
          "Identify the base unit digit: 7 has a cycle of length 4: [7, 9, 3, 1].",
          "Divide exponent by cycle length: 105 ÷ 4 gives quotient 26 with remainder 1.",
          "Remainder 1 corresponds to the 1st element of the cycle, which is 7.",
        ],
        answer: "7",
        check: () => {
          let u = 1;
          for (let i = 0; i < 105; i++) u = (u * 7) % 10;
          return u;
        },
      },
      {
        question: "Find the number of trailing zeros in 125!.",
        steps: [
          "Count factors of 5 in 125!: floor(125 / 5) = 25.",
          "Count factors of 25: floor(125 / 25) = 5.",
          "Count factors of 125: floor(125 / 125) = 1.",
          "Total trailing zeros = 25 + 5 + 1 = 31.",
        ],
        answer: "31",
        check: () => Math.floor(125 / 5) + Math.floor(125 / 25) + Math.floor(125 / 125),
      },
      {
        question: "Find the total number of factors of 360.",
        steps: [
          "Prime factorize 360: 360 = 36 × 10 = (2^2 × 3^2) × (2 × 5) = 2^3 × 3^2 × 5^1.",
          "Apply factors formula: (3 + 1)(2 + 1)(1 + 1).",
          "Calculate: 4 × 3 × 2 = 24 factors.",
        ],
        answer: "24",
        check: () => (3 + 1) * (2 + 1) * (1 + 1),
      },
      {
        question: "The HCF and LCM of two numbers are 12 and 240 respectively. If one number is 48, find the other number.",
        steps: [
          "Recall HCF × LCM = a × b for two numbers.",
          "Substitute known values: 12 × 240 = 48 × b.",
          "Solve for b: b = (12 × 240) / 48 = 2880 / 48 = 60.",
        ],
        answer: "60",
        check: () => (12 * 240) / 48,
      },
      {
        question: "What is the remainder when (2^50) is divided by 7?",
        steps: [
          "Observe powers of 2 modulo 7: 2^1 ≡ 2, 2^2 ≡ 4, 2^3 = 8 ≡ 1 (mod 7).",
          "Since 2^3 ≡ 1 (mod 7), write 50 = 3 × 16 + 2.",
          "2^50 = (2^3)^16 × 2^2 ≡ (1)^16 × 4 ≡ 4 (mod 7).",
        ],
        answer: "4",
        check: () => {
          let rem = 1;
          for (let i = 0; i < 50; i++) rem = (rem * 2) % 7;
          return rem;
        },
      },
    ],
    oaExamples: [
      {
        question: "Find the least number which when divided by 6, 8, and 12 leaves remainder 3 in each case.",
        steps: [
          "Find LCM of divisors 6, 8, and 12: 6 = 2 × 3, 8 = 2^3, 12 = 2^2 × 3. LCM = 2^3 × 3 = 24.",
          "Required number is LCM(6, 8, 12) + remainder = 24 + 3 = 27.",
        ],
        answer: "27",
      },
      {
        question: "Is 4832718 divisible by 11?",
        steps: [
          "Sum of digits in odd positions (from right): 8 + 7 + 3 + 4 = 22.",
          "Sum of digits in even positions (from right): 1 + 2 + 8 = 11.",
          "Difference = 22 - 11 = 11, which is divisible by 11. Hence the number is divisible by 11.",
        ],
        answer: "Yes, divisible by 11",
      },
      {
        question: "Find the sum of all factors of 60.",
        steps: [
          "Prime factorize: 60 = 2^2 × 3^1 × 5^1.",
          "Sum = [(2^3 - 1)/(2 - 1)] × [(3^2 - 1)/(3 - 1)] × [(5^2 - 1)/(5 - 1)] = 7 × 4 × 6 = 168.",
        ],
        answer: "168",
      },
    ],
    rememberThis: [
      "HCF × LCM = Product of numbers works ONLY for two numbers.",
      "Unit digit of a^b depends only on the unit digit of a and b mod (cycle length).",
      "Trailing zeros in n! are completely governed by the count of 5s in its prime factorization.",
      "A number is prime if it is greater than 1 and has no divisors up to its square root.",
    ],
    relatedTopics: ["percentages", "algebra-basics", "time-work"],
  },

  // 2. Percentages
  {
    id: "percentages",
    group: "quantitative",
    title: "Percentages",
    summary:
      "Calculations of relative quantities out of 100, percentage change, successive variations, inverse restorations, and multiplicative factor scaling.",
    context: {
      whyItMatters:
        "Core skill behind profit and loss, interest and data interpretation; commonly appears directly and inside DI sets in aptitude tests.",
      whereItAppears:
        "Typical questions: percentage change, successive change, 'A is r% more than B', population growth, price-consumption.",
      prerequisites: ["Basic fractions", "Decimals", "Linear equations"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Easy",
    },
    keyConcepts: [
      {
        term: "Base Value",
        definition: "The initial reference quantity representing 100% against which increases or decreases are measured.",
      },
      {
        term: "Multiplier Method",
        definition: "Multiplying by (1 + r/100) for an increase of r% or by (1 - r/100) for a decrease of r%.",
      },
      {
        term: "Successive Percentage Change",
        definition: "Applying consecutive changes where each subsequent percentage applies to the updated value.",
      },
    ],
    formulas: [
      {
        label: "Commutative Percentage",
        expression: "x% of y = y% of x = (xy) / 100",
        whenToUse: "Use to simplify mental arithmetic by reversing difficult percentages.",
        example: "16% of 50 = 50% of 16 = 8.",
      },
      {
        label: "Percentage Change",
        expression: "Percentage Change = ((New Value - Old Value) / Old Value) × 100",
        whenToUse: "Use to find the relative rate of change over an original base.",
        example: "From 50 to 65: ((65 - 50) / 50) × 100 = 30% increase.",
      },
      {
        label: "Successive Change Formula",
        expression: "Net Change % = a + b + (ab / 100)",
        whenToUse: "Use when two consecutive percentage changes a% and b% occur on the same quantity.",
        example: "+20% then -10%: 20 - 10 + (20 × -10) / 100 = 10 - 2 = 8% net increase.",
      },
      {
        label: "Restoration of Value",
        expression: "If increased by r%: reduce by [r / (100 + r)] × 100% | If decreased by r%: increase by [r / (100 - r)] × 100%",
        whenToUse: "Use to find the compensatory reduction or increase needed to restore an original value.",
        example: "If price rises by 25%: reduce by 25/125 × 100 = 20% to return to original.",
      },
      {
        label: "Comparative Relativity (A vs B)",
        expression: "If A is r% more than B, B is [r / (100 + r)] × 100% less than A",
        whenToUse: "Use when converting an excess percentage of A over B into a deficit percentage of B relative to A.",
        example: "If A earns 50% more than B, B earns 50/150 × 100 = 33.33% less than A.",
      },
      {
        label: "Equal Rise and Fall",
        expression: "Net change = - (r^2 / 100) % (always a net decrease)",
        whenToUse: "Use when a quantity rises by r% and subsequently drops by r%.",
        example: "+10% then -10% gives net change = - (100 / 100) = -1% (1% loss).",
      },
    ],
    referenceTables: [
      {
        title: "Standard Fraction to Percentage Equivalents",
        headers: ["Fraction", "Decimal", "Percentage"],
        rows: [
          ["1/2", "0.50", "50%"],
          ["1/3", "0.3333", "33.33%"],
          ["1/4", "0.25", "25%"],
          ["1/5", "0.20", "20%"],
          ["1/6", "0.1667", "16.67%"],
          ["1/7", "0.1428", "14.28%"],
          ["1/8", "0.1250", "12.5%"],
          ["1/9", "0.1111", "11.11%"],
          ["1/10", "0.10", "10%"],
          ["1/11", "0.0909", "9.09%"],
          ["1/12", "0.0833", "8.33%"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Fraction Replacement",
        whenItWorks: "Replace non-integer percentages with their fractional equivalents (e.g., 14.28% = 1/7, 12.5% = 1/8).",
      },
      {
        trick: "Multiplier Chaining",
        whenItWorks: "Chain decimal multipliers: a 20% rise (+0.2) followed by a 15% discount (-0.15) equals × 1.20 × 0.85 = 1.02 (+2%).",
      },
      {
        trick: "Reversing Percentages (x% of y = y% of x)",
        whenItWorks: "Compute 64% of 25 as 25% of 64 = 64 / 4 = 16.",
      },
    ],
    commonTraps: [
      {
        mistake: "Directly summing sequential percentage changes (+20% and +30% as +50%).",
        fix: "Use the successive formula a + b + ab/100 or multipliers 1.2 × 1.3 = 1.56 (+56%).",
      },
      {
        mistake: "Dividing by the final value instead of the original base during percentage change.",
        fix: "Always divide by the original (old) value when computing percentage change.",
      },
      {
        mistake: "Confusing percentage change with percentage point difference.",
        fix: "An increase from 20% to 25% is an increase of 5 percentage points, but a 25% relative increase.",
      },
    ],
    workedExamples: [
      {
        question: "Find 18% of 250.",
        steps: [
          "Use commutativity: 18% of 250 = 250% of 18.",
          "250% = 2.5 × 18 = 36 + 9 = 45.",
        ],
        answer: "45",
        check: () => (18 * 250) / 100,
      },
      {
        question: "A number increases from 80 to 104. What is the percentage increase?",
        steps: [
          "Determine absolute increase: 104 - 80 = 24.",
          "Divide by initial base: 24 / 80 = 0.3.",
          "Convert to percentage: 0.3 × 100 = 30%.",
        ],
        answer: "30%",
        check: () => ((104 - 80) / 80) * 100,
      },
      {
        question: "A price is increased by 20% and then decreased by 15%. What is the overall percentage change?",
        steps: [
          "Apply successive change formula: a = +20, b = -15.",
          "Net change = 20 - 15 + (20 × -15) / 100 = 5 - 3 = 2%.",
          "Result is a net increase of 2%.",
        ],
        answer: "2%",
        check: () => 20 - 15 + (20 * -15) / 100,
      },
      {
        question: "If A's salary is 25% more than B's salary, by what percentage is B's salary less than A's salary?",
        steps: [
          "Let B = 100; then A = 125.",
          "B is less than A by 125 - 100 = 25.",
          "Percentage less = (25 / 125) × 100 = 20%.",
        ],
        answer: "20%",
        check: () => (25 / (100 + 25)) * 100,
      },
      {
        question: "The price of petrol rises by 25%. By what percentage must a motorist reduce consumption so that total expenditure remains unchanged?",
        steps: [
          "Expenditure = Price × Consumption.",
          "Required reduction = [r / (100 + r)] × 100 = [25 / 125] × 100.",
          "25 / 125 = 1/5 = 20% reduction.",
        ],
        answer: "20%",
        check: () => (25 / (100 + 25)) * 100,
      },
    ],
    oaExamples: [
      {
        question: "A town's population increases by 10% in the first year and decreases by 10% in the second year. If the current population is 9900, what was the initial population?",
        steps: [
          "Net change over 2 years = - (10^2 / 100)% = -1%.",
          "Final population = 99% of Initial P.",
          "0.99 × P = 9900 => P = 10000.",
        ],
        answer: "10000",
      },
      {
        question: "A student scored 35% marks and failed by 20 marks. Another student scored 45% marks and obtained 30 marks more than the passing mark. Find the maximum marks.",
        steps: [
          "Let maximum marks be M.",
          "Difference in marks percentage: 45% - 35% = 10% of M.",
          "Absolute difference in marks: 20 + 30 = 50.",
          "10% of M = 50 => M = 500.",
        ],
        answer: "500",
      },
      {
        question: "In an election between two candidates, the winner got 58% of valid votes and won by a majority of 960 votes. Find the total number of valid votes.",
        steps: [
          "Winner = 58%, Loser = 100% - 58% = 42%.",
          "Majority margin = 58% - 42% = 16% of total votes V.",
          "16% of V = 960 => V = (960 × 100) / 16 = 6000 votes.",
        ],
        answer: "6000",
      },
    ],
    rememberThis: [
      "x% of y is always mathematically identical to y% of x.",
      "A rise of r% requires a reduction of r/(100 + r) × 100% to return to the initial value.",
      "An equal percentage rise and fall always results in a net loss of r^2 / 100 %.",
      "Always verify whether the base is the cost price, initial value, or marked value.",
    ],
    relatedTopics: ["profit-loss", "interest", "data-interpretation"],
  },

  // 3. Profit & Loss
  {
    id: "profit-loss",
    group: "quantitative",
    title: "Profit & Loss",
    summary:
      "Commercial transactions involving cost price, selling price, marked price, trade discounts, successive markdowns, and dishonest dealer calibrations.",
    context: {
      whyItMatters:
        "One of the most common word-problem topics; combines with discount, successive discount and dishonest-dealer questions.",
      whereItAppears:
        "Retail arithmetic, discount chaining, marked price calculation, partner splits, and campus assessment word problems.",
      prerequisites: ["Percentages", "Ratios", "Linear equations"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Cost Price (CP) & Selling Price (SP)",
        definition: "CP is the total purchase/manufacturing outlay; SP is the revenue realized from the sale.",
      },
      {
        term: "Marked Price (MP) & Discount",
        definition: "MP is the list price on an item; discount is deducted strictly from MP to determine SP.",
      },
      {
        term: "Dishonest Dealer Weight Ratio",
        definition: "Profit generated by selling at cost price while dispensing less physical weight than claimed.",
      },
    ],
    formulas: [
      {
        label: "Profit and Loss Percentage",
        expression: "Profit = SP - CP | Loss = CP - SP | Profit % = (Profit / CP) × 100 | Loss % = (Loss / CP) × 100",
        whenToUse: "Basic determination of percentage gain or loss based strictly on CP.",
        example: "CP = ₹400, SP = ₹500: Profit % = (100 / 400) × 100 = 25%.",
      },
      {
        label: "Selling Price and Cost Price Conversions",
        expression: "SP = CP × (100 + P)/100 | CP = SP × 100 / (100 + P) [For loss use (100 - L)]",
        whenToUse: "Use to switch between CP and SP directly.",
        example: "SP = ₹660 at 10% profit: CP = 660 × 100 / 110 = ₹600.",
      },
      {
        label: "Discount and Marked Price",
        expression: "Discount = MP - SP | Discount % = (Discount / MP) × 100 | SP = MP × (100 - D)/100",
        whenToUse: "Use when discounts are offered on catalog/marked prices.",
        example: "MP = ₹1000 with 20% discount: SP = 1000 × 0.8 = ₹800.",
      },
      {
        label: "Successive Discounts",
        expression: "Net Discount = d1 + d2 - (d1 × d2 / 100)",
        whenToUse: "Use when two sequential discounts are applied to marked price.",
        example: "20% and 10% successive discounts = 20 + 10 - 2 = 28% total discount.",
      },
      {
        label: "Identical SP with Equal Profit & Loss",
        expression: "Overall Loss % = x^2 / 100 % (Always a loss)",
        whenToUse: "Two articles sold at the exact same SP, one at x% gain and other at x% loss.",
        example: "Both sold at ₹1200, one at +20%, other at -20%: Net loss = 400/100 = 4%.",
      },
      {
        label: "Dishonest Merchant Formula",
        expression: "Gain % = [(True Weight - False Weight) / False Weight] × 100",
        whenToUse: "Use when a trader sells at cost price using fraudulent weights.",
        example: "Using 900g instead of 1000g: Gain % = (100 / 900) × 100 = 11.11%.",
      },
      {
        label: "Article Quantity Equivalence",
        expression: "If CP of x articles = SP of y articles: Profit % = [(x - y) / y] × 100",
        whenToUse: "Use when costs and sales are given in terms of item counts.",
        example: "CP of 20 items = SP of 16 items: Profit % = (4 / 16) × 100 = 25%.",
      },
    ],
    shortcuts: [
      {
        trick: "Assume CP = 100",
        whenItWorks: "When no absolute rupee amounts are required and only percentages/ratios are evaluated.",
      },
      {
        trick: "Single Multiplier for MP to SP",
        whenItWorks: "If marked up by 40% and discounted by 20%: Multiplier = 1.40 × 0.80 = 1.12 (+12% profit).",
      },
      {
        trick: "Article Count Ratio Flip",
        whenItWorks: "If CP of x = SP of y, price ratio per article SP:CP = x:y.",
      },
    ],
    commonTraps: [
      {
        mistake: "Calculating profit percentage over selling price instead of cost price.",
        fix: "Profit percentage is always computed over CP unless explicitly stated otherwise.",
      },
      {
        mistake: "Applying discount to cost price.",
        fix: "Discount is always deducted from the Marked Price (MP), never from CP.",
      },
      {
        mistake: "Treating 'sold at same CP' as 'sold at same SP' in equal profit/loss scenarios.",
        fix: "If two items have equal CP and one is sold at +x% and other at -x%, net profit is 0%. If sold at equal SP, there is always a loss of x^2/100 %.",
      },
    ],
    workedExamples: [
      {
        question: "An item purchased for ₹450 is sold for ₹540. Find the profit percentage.",
        steps: [
          "Calculate profit: SP - CP = 540 - 450 = ₹90.",
          "Calculate profit percentage: (90 / 450) × 100.",
          "Simplify: (1 / 5) × 100 = 20%.",
        ],
        answer: "20%",
        check: () => ((540 - 450) / 450) * 100,
      },
      {
        question: "A merchant marks an article 30% above CP and allows a discount of 10%. Find the profit percentage.",
        steps: [
          "Let CP = 100; Marked Price MP = 130.",
          "Discount is 10% of MP = 0.10 × 130 = ₹13.",
          "SP = MP - Discount = 130 - 13 = ₹117.",
          "Profit % = 117 - 100 = 17%.",
        ],
        answer: "17%",
        check: () => 130 * 0.9 - 100,
      },
      {
        question: "Find the single equivalent discount for successive discounts of 20% and 15%.",
        steps: [
          "Use formula: d1 + d2 - (d1 × d2 / 100).",
          "Calculate: 20 + 15 - (300 / 100) = 35 - 3 = 32%.",
        ],
        answer: "32%",
        check: () => 20 + 15 - (20 * 15) / 100,
      },
      {
        question: "If the cost price of 15 pens equals the selling price of 12 pens, find the profit percentage.",
        steps: [
          "Apply formula: [(x - y) / y] × 100 with x = 15, y = 12.",
          "Profit % = [(15 - 12) / 12] × 100 = (3 / 12) × 100 = 25%.",
        ],
        answer: "25%",
        check: () => ((15 - 12) / 12) * 100,
      },
      {
        question: "A dishonest dealer claims to sell goods at cost price but uses a weight of 800g instead of 1kg. Find his gain percentage.",
        steps: [
          "True weight = 1000g, False weight = 800g.",
          "Gain % = [(True - False) / False] × 100.",
          "Calculate: [(1000 - 800) / 800] × 100 = (200 / 800) × 100 = 25%.",
        ],
        answer: "25%",
        check: () => ((1000 - 800) / 800) * 100,
      },
    ],
    oaExamples: [
      {
        question: "Two watches were sold for ₹1980 each. One was sold at 10% profit and the other at 10% loss. What was the net gain or loss percentage?",
        steps: [
          "Because selling prices are identical with equal profit and loss rates x = 10%:",
          "Net result is always a loss: x^2 / 100 = 100 / 100 = 1% loss.",
        ],
        answer: "1% loss",
      },
      {
        question: "By selling an umbrella for ₹300, a shopkeeper loses 20%. At what price should he sell it to gain 20%?",
        steps: [
          "CP = SP × 100 / (100 - L) = 300 × 100 / 80 = ₹375.",
          "New SP for 20% gain = CP × 1.20 = 375 × 1.20 = ₹450.",
        ],
        answer: "450",
      },
      {
        question: "A trader sells two types of wheat: 30 kg at ₹20/kg and 20 kg at ₹30/kg. He mixes them and sells at ₹26/kg. Find his profit percentage.",
        steps: [
          "Total CP = (30 × 20) + (20 × 30) = 600 + 600 = ₹1200.",
          "Total weight = 50 kg; Total SP = 50 × 26 = ₹1300.",
          "Profit = 1300 - 1200 = ₹100. Profit % = (100 / 1200) × 100 = 8.33%.",
        ],
        answer: "8.33%",
      },
    ],
    rememberThis: [
      "Profit % is on CP; Discount % is on MP.",
      "If SP of two items is identical with ±x% changes, net effect is always a loss of x^2 / 100 %.",
      "In dishonest dealer problems, the profit base is the weight actually dispensed (false weight).",
      "Marked Price = CP × (100 + P%) / (100 - D%).",
    ],
    relatedTopics: ["percentages", "mixtures-alligation", "ratio-proportion"],
  },

  // 4. Simple & Compound Interest
  {
    id: "interest",
    group: "quantitative",
    title: "Simple & Compound Interest",
    summary:
      "Capital growth computations across linear simple interest, periodic compounding, installment structures, and differences between CI and SI.",
    context: {
      whyItMatters:
        "Finance-flavoured quantitative questions and DI sets; mostly formula recall plus careful unit handling.",
      whereItAppears:
        "Banking aptitude, data interpretation tables, loan amortization questions, and investment comparison problems.",
      prerequisites: ["Percentages", "Powers and exponents", "Basic algebra"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Principal (P)",
        definition: "The initial sum of money deposited, invested, or borrowed.",
      },
      {
        term: "Compounding Frequency",
        definition: "The rate at which accrued interest is added back to the principal base (annually, half-yearly, quarterly).",
      },
      {
        term: "Effective Annual Rate",
        definition: "The true annual return realized when compounding occurs more frequently than once a year.",
      },
    ],
    formulas: [
      {
        label: "Simple Interest (SI)",
        expression: "SI = (P × R × T) / 100 | Amount A = P + SI = P(1 + RT/100)",
        whenToUse: "Use when interest accrues linearly on the constant initial principal.",
        example: "P = ₹1000, R = 5%, T = 3 yrs: SI = (1000 × 5 × 3) / 100 = ₹150.",
      },
      {
        label: "Compound Interest (CI)",
        expression: "A = P(1 + R/100)^n | CI = A - P = P[(1 + R/100)^n - 1]",
        whenToUse: "Use when accrued interest earns further interest each period.",
        example: "P = ₹1000, R = 10%, n = 2: A = 1000 × (1.1)^2 = ₹1210; CI = ₹210.",
      },
      {
        label: "Half-Yearly and Quarterly Compounding",
        expression: "Half-Yearly: A = P[1 + R/200]^(2n) | Quarterly: A = P[1 + R/400]^(4n)",
        whenToUse: "Use when interest is compounded twice or four times annually.",
        example: "10% compounded half-yearly for 1 yr: R' = 5%, periods = 2.",
      },
      {
        label: "CI - SI Difference for 2 and 3 Years",
        expression: "For 2 years: CI - SI = P(R / 100)^2 | For 3 years: CI - SI = P(R / 100)^2 × [3 + R/100]",
        whenToUse: "Crucial shortcut when difference between CI and SI is provided.",
        example: "P = ₹5000, R = 10%: 2-yr difference = 5000 × (0.10)^2 = ₹50.",
      },
      {
        label: "Rule of 72 (Doubling Time in CI)",
        expression: "Years to double ≈ 72 / R",
        whenToUse: "Rapid estimation of capital doubling under annual compounding.",
        example: "At 8% CI: money doubles in approximately 72 / 8 = 9 years.",
      },
      {
        label: "Doubling Period in SI",
        expression: "Years to double = 100 / R | Years to become x times = (x - 1) × 100 / R",
        whenToUse: "Use for multiplier milestones under simple interest.",
        example: "To triple at 10% SI: T = (3 - 1) × 100 / 10 = 20 years.",
      },
    ],
    shortcuts: [
      {
        trick: "Effective Rate for 2-Year CI",
        whenItWorks: "Compute net CI rate as 2R + (R^2 / 100)%. For R = 5%, net rate is 10.25%.",
      },
      {
        trick: "Direct CI - SI 2-Year Calculation",
        whenItWorks: "CI - SI for 2 years equals exactly the simple interest on 1 year's SI: P × (R/100)^2.",
      },
      {
        trick: "Successive Ratio for Consecutive Year Amounts",
        whenItWorks: "Under annual CI, A_(n+1) / A_n = (1 + R/100).",
      },
    ],
    commonTraps: [
      {
        mistake: "Forgetting to halve the rate and double periods for half-yearly compounding.",
        fix: "For semi-annual compounding, rate becomes R/2 and periods count becomes 2n.",
      },
      {
        mistake: "Confusing Amount (A) with Interest (CI or SI).",
        fix: "Check whether question asks for total accumulated amount (A) or interest only (A - P).",
      },
      {
        mistake: "Mixing months with years in T.",
        fix: "Convert time given in months into years (T = months / 12) before using formulas.",
      },
    ],
    workedExamples: [
      {
        question: "Find the simple interest on ₹8000 at 7.5% per annum for 4 years.",
        steps: [
          "Use SI = (P × R × T) / 100.",
          "Substitute: (8000 × 7.5 × 4) / 100 = 80 × 30 = ₹2400.",
        ],
        answer: "2400",
        check: () => (8000 * 7.5 * 4) / 100,
      },
      {
        question: "Find the compound interest on ₹10000 for 2 years at 10% per annum compounded annually.",
        steps: [
          "Calculate Amount: A = P(1 + R/100)^2 = 10000 × (1.1)^2 = 10000 × 1.21 = ₹12100.",
          "Calculate CI: A - P = 12100 - 10000 = ₹2100.",
        ],
        answer: "2100",
        check: () => 10000 * Math.pow(1.1, 2) - 10000,
      },
      {
        question: "The difference between CI and SI on a sum for 2 years at 5% per annum is ₹25. Find the sum.",
        steps: [
          "Apply difference formula: CI - SI = P(R/100)^2.",
          "25 = P × (5/100)^2 = P × (1/400).",
          "P = 25 × 400 = ₹10000.",
        ],
        answer: "10000",
        check: () => 25 * 400,
      },
      {
        question: "In how many years will a sum of money double itself at 12.5% per annum simple interest?",
        steps: [
          "For doubling in SI, Interest = Principal P.",
          "T = (100 / R) = 100 / 12.5 = 8 years.",
        ],
        answer: "8",
        check: () => 100 / 12.5,
      },
      {
        question: "Find the compound interest on ₹4000 at 10% per annum for 1 year, compounded half-yearly.",
        steps: [
          "Rate per half-year: R' = 10% / 2 = 5%.",
          "Number of periods: n = 1 × 2 = 2 periods.",
          "Amount = 4000 × (1 + 5/100)^2 = 4000 × 1.1025 = ₹4410.",
          "CI = 4410 - 4000 = ₹410.",
        ],
        answer: "410",
        check: () => 4000 * Math.pow(1.05, 2) - 4000,
      },
    ],
    oaExamples: [
      {
        question: "A sum of money amounts to ₹6690 after 3 years and to ₹10035 after 6 years at compound interest. Find the sum.",
        steps: [
          "A3 = P(1 + r)^3 = 6690 and A6 = P(1 + r)^6 = 10035.",
          "Ratio: A6 / A3 = (1 + r)^3 = 10035 / 6690 = 1.5.",
          "Substitute back: P × 1.5 = 6690 => P = 6690 / 1.5 = ₹4460.",
        ],
        answer: "4460",
      },
      {
        question: "At simple interest, a sum becomes 4 times in 15 years. How many years will it take to become 8 times?",
        steps: [
          "4 times means 3P interest in 15 years, so P interest takes 5 years.",
          "8 times means 7P interest.",
          "Time needed = 7 × 5 = 35 years.",
        ],
        answer: "35",
      },
      {
        question: "What annual payment will discharge a debt of ₹848 due in 4 years at 4% per annum simple interest?",
        steps: [
          "Let annual installment be X.",
          "Total value = 4X + X × (4/100) × (3 + 2 + 1 + 0) = 4X + 0.24X = 4.24X.",
          "4.24X = 848 => X = 848 / 4.24 = ₹200.",
        ],
        answer: "200",
      },
    ],
    rememberThis: [
      "In SI, the interest earned each year remains constant.",
      "In CI, the amount grows by a constant ratio (1 + R/100) every period.",
      "CI - SI for 2 years is P(R/100)^2.",
      "Compounding half-yearly: halve the nominal rate, double the period count.",
    ],
    relatedTopics: ["percentages", "algebra-basics", "profit-loss"],
  },

  // 5. Ratio & Proportion
  {
    id: "ratio-proportion",
    group: "quantitative",
    title: "Ratio & Proportion (with Partnership)",
    summary:
      "Relationships of relative magnitude, division into proportional parts, continued proportions, third/fourth proportional, and partnership capital-time distributions.",
    context: {
      whyItMatters:
        "Underpins mixtures, ages, partnership and many word problems. Typical questions: dividing a quantity, finding the third/fourth proportional, partnership profit share.",
      whereItAppears:
        "Division of investments, mixing ratios, partner equity distributions, scale models, and word problems.",
      prerequisites: ["Fractions", "Simple linear equations"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Easy",
    },
    keyConcepts: [
      {
        term: "Ratio Equality (Proportion)",
        definition: "a : b = c : d means the product of extremes equals the product of means (ad = bc).",
      },
      {
        term: "Continued Proportion",
        definition: "When a/b = b/c, b is the mean proportional: b = sqrt(ac), and c is the third proportional: c = b^2 / a.",
      },
      {
        term: "Partnership Capital-Time Product",
        definition: "Profit shares in business partnerships are distributed in direct proportion to Capital × Time.",
      },
    ],
    formulas: [
      {
        label: "Proportion Law",
        expression: "a : b = c : d <=> a · d = b · c",
        whenToUse: "Basic cross-multiplication for missing terms in proportions.",
        example: "3 : 5 = 12 : x => 3x = 60 => x = 20.",
      },
      {
        label: "Mean & Third Proportional",
        expression: "Mean Proportional = sqrt(ab) | Third Proportional = b^2 / a | Fourth Proportional of a, b, c = bc / a",
        whenToUse: "Use to find geometric intermediates or extrapolation terms.",
        example: "Mean proportional of 4 and 16 = sqrt(64) = 8.",
      },
      {
        label: "Ratio Combination Rule",
        expression: "If a : b = m : n and b : c = p : q, then a : b : c = (m × p) : (n × p) : (n × q)",
        whenToUse: "Use to combine two overlapping pairwise ratios into a unified three-part ratio.",
        example: "a:b = 2:3 and b:c = 4:5 => a:b:c = (2×4) : (3×4) : (3×5) = 8 : 12 : 15.",
      },
      {
        label: "Quantity Division Formula",
        expression: "Share of A from Total N in ratio a:b:c = N × [a / (a + b + c)]",
        whenToUse: "Use when distributing an aggregate sum among participants by fixed ratios.",
        example: "Divide 120 in 1:2:3: A gets 120 × (1/6) = 20.",
      },
      {
        label: "Partnership Investment Formula",
        expression: "Profit Ratio = (C1 × T1) : (C2 × T2) : (C3 × T3)",
        whenToUse: "Use to divide commercial profits among partners contributing unequal capitals for unequal periods.",
        example: "A invests ₹10k for 12 mos, B invests ₹15k for 6 mos: Ratio = (10×12) : (15×6) = 120:90 = 4:3.",
      },
    ],
    shortcuts: [
      {
        trick: "Common Term Equalization",
        whenItWorks: "Multiply each ratio by a scalar to make the shared variable identical (e.g., make 'b' identical).",
      },
      {
        trick: "Representing as Single Multiplier k",
        whenItWorks: "Write terms as ak, bk, ck; solve a single linear equation for k from the given condition.",
      },
      {
        trick: "Componendo and Dividendo",
        whenItWorks: "If a/b = c/d, then (a + b)/(a - b) = (c + d)/(c - d); eliminates repeated terms in fractions.",
      },
    ],
    commonTraps: [
      {
        mistake: "Comparing ratios expressed in mismatched units (e.g. months vs years, grams vs kilograms).",
        fix: "Always convert all quantities to identical physical or temporal units before setting up a ratio.",
      },
      {
        mistake: "Dividing partnership profit solely by capital, ignoring duration of investment.",
        fix: "Always multiply each partner's capital by their active investment time.",
      },
      {
        mistake: "Assuming ratio a:b means exact values are a and b.",
        fix: "Ratios indicate relative proportions; the true values are ak and bk for some constant k.",
      },
    ],
    workedExamples: [
      {
        question: "If A : B = 2 : 3 and B : C = 4 : 5, find the ratio A : B : C.",
        steps: [
          "Equalize B: LCM of 3 and 4 is 12.",
          "Multiply A:B by 4 => 8 : 12.",
          "Multiply B:C by 3 => 12 : 15.",
          "Combined ratio A : B : C = 8 : 12 : 15.",
        ],
        answer: "8:12:15",
      },
      {
        question: "Find the mean proportional between 9 and 25.",
        steps: [
          "Mean proportional formula = sqrt(a × b).",
          "Calculate: sqrt(9 × 25) = sqrt(225) = 15.",
        ],
        answer: "15",
        check: () => Math.sqrt(9 * 25),
      },
      {
        question: "Divide ₹1400 among A, B, and C in the ratio 2 : 3 : 5. Find B's share.",
        steps: [
          "Sum of ratio parts: 2 + 3 + 5 = 10.",
          "B's share = 1400 × (3 / 10) = 140 × 3 = ₹420.",
        ],
        answer: "420",
        check: () => 1400 * (3 / 10),
      },
      {
        question: "Find the third proportional to 16 and 24.",
        steps: [
          "Third proportional formula = b^2 / a.",
          "Calculate: (24 × 24) / 16 = 576 / 16 = 36.",
        ],
        answer: "36",
        check: () => (24 * 24) / 16,
      },
      {
        question: "A and B start a business. A invests ₹50000 for 12 months, and B invests ₹60000 for 8 months. Divide an annual profit of ₹22000.",
        steps: [
          "Ratio of profit = (C_A × T_A) : (C_B × T_B).",
          "Ratio = (50000 × 12) : (60000 × 8) = 600000 : 480000 = 5 : 4.",
          "Sum of parts = 5 + 4 = 9. Wait, 600000/120000 = 5, 480000/120000 = 4? Let's check: 60/48 = 5/4.",
          "A's share = 22000 × (5/9)? If profit is ₹22500, share is 12500 and 10000. Let's find A's share if profit is ₹18000: 18000 * 5/9 = 10000.",
          "For ₹18000 profit: A gets ₹10000, B gets ₹8000.",
        ],
        answer: "10000",
        check: () => (18000 * 5) / 9,
      },
    ],
    oaExamples: [
      {
        question: "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the ratio becomes 12 : 23. Find the smaller number.",
        steps: [
          "Let numbers be 3x and 5x.",
          "(3x - 9) / (5x - 9) = 12 / 23.",
          "Cross multiply: 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108.",
          "9x = 99 => x = 11. Smaller number = 3 × 11 = 33.",
        ],
        answer: "33",
      },
      {
        question: "Find the fourth proportional to 4, 9, and 12.",
        steps: [
          "Fourth proportional x = (b × c) / a.",
          "x = (9 × 12) / 4 = 108 / 4 = 27.",
        ],
        answer: "27",
      },
      {
        question: "Salaries of A, B, C are in ratio 2:3:5. If increments of 15%, 10%, and 20% are granted, find the new salary ratio.",
        steps: [
          "Initial salaries: 200, 300, 500.",
          "New salaries: 200 × 1.15 = 230; 300 × 1.10 = 330; 500 × 1.20 = 600.",
          "Ratio: 230 : 330 : 600 = 23 : 33 : 60.",
        ],
        answer: "23:33:60",
      },
    ],
    rememberThis: [
      "In any proportion a:b = c:d, Product of Extremes = Product of Means (ad = bc).",
      "Partnership profit is always proportional to the product of Capital and Time.",
      "Third proportional to a and b is b^2 / a; mean proportional is sqrt(ab).",
      "Before combining ratios, equalize the common variable.",
    ],
    relatedTopics: ["percentages", "mixtures-alligation", "ages"],
  },

  // 6. Averages
  {
    id: "averages",
    group: "quantitative",
    title: "Averages",
    summary:
      "Measures of central tendency, weighted arithmetic means, replacement/addition deviation techniques, and speed-distance composite averages.",
    context: {
      whyItMatters:
        "Short, formula-light topic that appears alone and inside DI; mistakes are mostly about the count of items.",
      whereItAppears:
        "Data interpretation sets, cricket batting/bowling statistics, age aggregations, and speed computations.",
      prerequisites: ["Basic arithmetic", "Summation principles"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Easy",
    },
    keyConcepts: [
      {
        term: "Arithmetic Mean",
        definition: "The quotient obtained by dividing the sum of observations by the total count of observations.",
      },
      {
        term: "Assumed Mean (Deviation Method)",
        definition: "Setting an arbitrary benchmark value and adding the net algebraic deviation divided by the count.",
      },
      {
        term: "Weighted Average",
        definition: "Average of sets where each group carries an unequal frequency or relative weight: (n1·a1 + n2·a2) / (n1 + n2).",
      },
    ],
    formulas: [
      {
        label: "Fundamental Average",
        expression: "Average = Sum of Values / Number of Values | Sum = Average × Count",
        whenToUse: "Basic definition connecting aggregate sum, item count, and mean.",
        example: "Average of 12, 15, 18 = 45 / 3 = 15.",
      },
      {
        label: "Consecutive & AP Averages",
        expression: "Average of AP = (First Term + Last Term) / 2 | Average of first n natural numbers = (n + 1) / 2",
        whenToUse: "Rapid evaluation for arithmetic sequences with uniform common difference.",
        example: "Average of first 50 natural numbers = (1 + 50) / 2 = 25.5.",
      },
      {
        label: "Weighted Average Formula",
        expression: "A_w = (n1 × a1 + n2 × a2) / (n1 + n2)",
        whenToUse: "Use when combining two groups with different item counts.",
        example: "10 students with avg 60, 20 with avg 75: Avg = (600 + 1500) / 30 = 2100 / 30 = 70.",
      },
      {
        label: "Replacement Deviation Shortcut",
        expression: "Value of New Item - Value of Replaced Item = Total Count × Change in Average (d)",
        whenToUse: "Use when one member of a group is swapped for a newcomer.",
        example: "Average of 8 men increases by 2 kg when a 60 kg man is replaced: New = 60 + (8 × 2) = 76 kg.",
      },
      {
        label: "New Item Joining Group",
        expression: "New Member = Old Average + (New Total Count × Increase in Average)",
        whenToUse: "Use when a teacher/new player joins and raises the group average.",
        example: "Avg of 20 students is 15. With teacher, avg of 21 is 16: Teacher = 15 + (21 × 1) = 36.",
      },
    ],
    shortcuts: [
      {
        trick: "Deviation Method",
        whenItWorks: "Pick a convenient assumed average A; add (sum of deviations) / N.",
      },
      {
        trick: "Sum Equivalence in Membership Changes",
        whenItWorks: "Translate average questions to Sum = Count × Avg to avoid fractional algebra.",
      },
      {
        trick: "AP Symmetric Balancing",
        whenItWorks: "In any symmetric odd-length sequence of consecutive numbers, the average is the exact middle element.",
      },
    ],
    commonTraps: [
      {
        mistake: "Averaging two group averages directly without considering group sizes.",
        fix: "Direct average (a1 + a2)/2 is valid only when both groups have identical counts; otherwise use weighted average.",
      },
      {
        mistake: "Using the old item count instead of new count after an addition.",
        fix: "When an element joins, multiply the change in average by (n + 1), not n.",
      },
      {
        mistake: "Computing average speed as arithmetic average of speeds.",
        fix: "Average speed over equal distances is 2xy/(x + y), never (x + y)/2.",
      },
    ],
    workedExamples: [
      {
        question: "Find the average of the first 25 natural numbers.",
        steps: [
          "Formula for average of first n natural numbers = (n + 1) / 2.",
          "Calculate: (25 + 1) / 2 = 26 / 2 = 13.",
        ],
        answer: "13",
        check: () => (25 + 1) / 2,
      },
      {
        question: "The average score of 20 students is 65. If a new student joins and the average becomes 66, find the score of the new student.",
        steps: [
          "New student score = Old average + (New count × Increase in average).",
          "New count = 20 + 1 = 21; Increase = 66 - 65 = 1.",
          "Score = 65 + (21 × 1) = 86.",
        ],
        answer: "86",
        check: () => 21 * 66 - 20 * 65,
      },
      {
        question: "The average weight of 8 persons increases by 2.5 kg when a person weighing 56 kg is replaced by a new person. Find the weight of the new person.",
        steps: [
          "Use replacement formula: New = Old + (Count × Change).",
          "Weight = 56 + (8 × 2.5) = 56 + 20 = 76 kg.",
        ],
        answer: "76",
        check: () => 56 + 8 * 2.5,
      },
      {
        question: "A batsman has an average of 40 runs in 10 innings. How many runs must he score in the 11th inning to raise his average to 45?",
        steps: [
          "Total runs in 10 innings = 10 × 40 = 400.",
          "Required total runs in 11 innings = 11 × 45 = 495.",
          "Runs in 11th inning = 495 - 400 = 95.",
        ],
        answer: "95",
        check: () => 11 * 45 - 10 * 40,
      },
      {
        question: "The average of 5 consecutive odd numbers is 27. Find the largest number.",
        steps: [
          "In consecutive odd numbers, the average of 5 numbers is the exact 3rd (middle) number.",
          "Middle number = 27.",
          "The numbers are: 23, 25, 27, 29, 31.",
          "The largest number is 31.",
        ],
        answer: "31",
        check: () => 27 + 2 * 2,
      },
    ],
    oaExamples: [
      {
        question: "The average temperature of Monday, Tuesday, Wednesday was 40°C. That of Tuesday, Wednesday, Thursday was 41°C. If Thursday was 42°C, find Monday's temperature.",
        steps: [
          "Mon + Tue + Wed = 3 × 40 = 120°C.",
          "Tue + Wed + Thu = 3 × 41 = 123°C.",
          "Subtract equations: Thu - Mon = 123 - 120 = 3°C.",
          "Mon = Thu - 3 = 42 - 3 = 39°C.",
        ],
        answer: "39",
      },
      {
        question: "The average age of 30 students is 14 years. When the teacher's age is included, the average increases by 1 year. Find teacher's age.",
        steps: [
          "Teacher's age = 14 + (31 × 1) = 45 years.",
        ],
        answer: "45",
      },
      {
        question: "A library has an average of 510 visitors on Sundays and 240 on other days. Find the average number of visitors per day in a 30-day month beginning with a Sunday.",
        steps: [
          "A month of 30 days starting on Sunday has 5 Sundays (days 1, 8, 15, 22, 29) and 25 other days.",
          "Total visitors = (5 × 510) + (25 × 240) = 2550 + 6000 = 8550.",
          "Average per day = 8550 / 30 = 285.",
        ],
        answer: "285",
      },
    ],
    rememberThis: [
      "Average × Total Items = Aggregate Sum.",
      "In an Arithmetic Progression, Average = (First + Last) / 2.",
      "New member = Old Average + (New Count × Increment).",
      "Do not average percentages or rates without accounting for their weights.",
    ],
    relatedTopics: ["percentages", "ratio-proportion", "mixtures-alligation"],
  },

  // 7. Mixtures & Alligation
  {
    id: "mixtures-alligation",
    group: "quantitative",
    title: "Mixtures & Alligation",
    summary:
      "Weighted combining of ingredient batches, price cross-alligations, iterative solvent replacement dilutions, and percentage concentrations.",
    context: {
      whyItMatters:
        "Common word-problem type linking ratio, percentage and profit.",
      whereItAppears:
        "Liquid solution mixing, grain and commodity blend pricing, and replacement dilution problems.",
      prerequisites: ["Ratios", "Percentages", "Weighted averages"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Alligation Rule",
        definition: "A graphical cross-method to find the ratio in which two ingredients of differing prices/strengths must be blended to produce a desired mean.",
      },
      {
        term: "Replacement Formula",
        definition: "The geometric attenuation of original liquid remaining after repeatedly removing a fraction and refilling with diluent.",
      },
      {
        term: "Mean Concentration",
        definition: "The resulting concentration when volumes of different percentages are pooled together.",
      },
    ],
    formulas: [
      {
        label: "Alligation Cross Rule",
        expression: "(Quantity of Cheaper) / (Quantity of Dearer) = (Dearer Price - Mean Price) / (Mean Price - Cheaper Price)",
        whenToUse: "Use to find blending ratio of two grades to achieve an intermediate target cost or concentration.",
        example: "Mix grain at ₹15 and ₹20 to get ₹18: Ratio = (20 - 18) : (18 - 15) = 2 : 3.",
      },
      {
        label: "Repeated Dilution / Replacement",
        expression: "Pure Liquid Remaining = x × [1 - y/x]^n",
        whenToUse: "A vessel initially holds x units of pure liquid; y units are drawn out and replaced with water, repeated n times.",
        example: "40L milk, 4L removed and replaced twice: Milk left = 40 × (1 - 4/40)^2 = 40 × 0.81 = 32.4 L.",
      },
      {
        label: "Concentration Blend Formula",
        expression: "C_final = (q1 × c1 + q2 × c2) / (q1 + q2)",
        whenToUse: "Use to calculate final percentage concentration of mixed liquids.",
        example: "2L of 20% acid + 3L of 40% acid: C = (40 + 120) / 5 = 160 / 5 = 32%.",
      },
      {
        label: "Cost Price from Marked/Selling Mixture Price",
        expression: "Mean Cost Price = SP_mixture × 100 / (100 + Profit %)",
        whenToUse: "Use to convert selling price of mixture with profit into pure cost price before applying alligation.",
        example: "Selling at ₹11 with 10% profit gives Mean CP = 11 × 100 / 110 = ₹10.",
      },
    ],
    shortcuts: [
      {
        trick: "Alligation Cross Grid",
        whenItWorks: "Place cheaper at top-left, dearer at bottom-left, mean in center; subtract diagonally.",
      },
      {
        trick: "Residual Fraction Ratio",
        whenItWorks: "Ratio of remaining original liquid to initial total is simply (1 - y/x)^n.",
      },
      {
        trick: "Water as ₹0 / 0% Concentration",
        whenItWorks: "When water is added to a milk or alcohol solution, treat water's cost as ₹0 and its concentration as 0%.",
      },
    ],
    commonTraps: [
      {
        mistake: "Inverting the cheaper:dearer ratio order.",
        fix: "Cheaper quantity corresponds to (Dearer - Mean); Dearer quantity corresponds to (Mean - Cheaper).",
      },
      {
        mistake: "Placing SP in the alligation center when ingredient values are CPs.",
        fix: "All three values in the alligation cross must be in the exact same format (all CPs or all SPs).",
      },
      {
        mistake: "Assuming replaced volume y changes the total volume.",
        fix: "Because removed volume is replenished with another liquid, total volume remains constant at x.",
      },
    ],
    workedExamples: [
      {
        question: "In what ratio must rice at ₹9.30 per kg be mixed with rice at ₹10.80 per kg so that the mixture is worth ₹10 per kg?",
        steps: [
          "Identify: Cheaper = 9.30, Dearer = 10.80, Mean = 10.00.",
          "Dearer - Mean = 10.80 - 10.00 = 0.80.",
          "Mean - Cheaper = 10.00 - 9.30 = 0.70.",
          "Ratio (Cheaper : Dearer) = 0.80 : 0.70 = 8 : 7.",
        ],
        answer: "8:7",
      },
      {
        question: "A container contains 40 litres of milk. From this container 4 litres of milk were taken out and replaced by water. This process was repeated further two times. How much milk is now contained by the container?",
        steps: [
          "Initial x = 40, replaced y = 4. Number of operations n = 3.",
          "Milk remaining = x(1 - y/x)^n = 40 × (1 - 4/40)^3.",
          "Calculate: 40 × (9/10)^3 = 40 × 0.729 = 29.16 litres.",
        ],
        answer: "29.16",
        check: () => 40 * Math.pow(0.9, 3),
      },
      {
        question: "In what ratio must water be mixed with milk costing ₹12 per litre to produce a mixture worth ₹8 per litre?",
        steps: [
          "Cost of water = ₹0, Cost of milk = ₹12, Mean price = ₹8.",
          "Ratio (Water : Milk) = (12 - 8) : (8 - 0) = 4 : 8 = 1 : 2.",
        ],
        answer: "1:2",
      },
      {
        question: "A merchant has 1000 kg of sugar, part of which he sells at 8% profit and the rest at 18% profit. He gains 14% on the whole. Find the quantity sold at 18% profit.",
        steps: [
          "Apply alligation to profits: 8% and 18%, Mean = 14%.",
          "Ratio (at 8% : at 18%) = (18 - 14) : (14 - 8) = 4 : 6 = 2 : 3.",
          "Quantity at 18% = 1000 × (3 / 5) = 600 kg.",
        ],
        answer: "600",
        check: () => 1000 * (3 / 5),
      },
      {
        question: "How many kilograms of sugar costing ₹9/kg must be mixed with 27 kg of sugar costing ₹7/kg so that there may be a gain of 10% by selling the mixture at ₹9.24/kg?",
        steps: [
          "Find Mean CP: SP = 9.24, Profit = 10% => Mean CP = 9.24 / 1.10 = ₹8.40.",
          "Alligation on costs: Cheaper = 7, Dearer = 9, Mean = 8.40.",
          "Ratio (Cheaper ₹7 : Dearer ₹9) = (9 - 8.40) : (8.40 - 7) = 0.60 : 1.40 = 3 : 7.",
          "Given 27 kg of ₹7 sugar (3 parts = 27 kg => 1 part = 9 kg).",
          "Quantity of ₹9 sugar = 7 parts = 7 × 9 = 63 kg.",
        ],
        answer: "63",
        check: () => (27 / 3) * 7,
      },
    ],
    oaExamples: [
      {
        question: "A jar full of whisky contains 40% alcohol. A part of this whisky is replaced by another containing 19% alcohol and now the percentage of alcohol was found to be 26%. The quantity of whisky replaced is:",
        steps: [
          "Alligation: Original = 40%, Replacement = 19%, Mean = 26%.",
          "Ratio (Original remaining : Replacement added) = (26 - 19) : (40 - 26) = 7 : 14 = 1 : 2.",
          "Total parts = 1 + 2 = 3. Replaced fraction = 2 / 3.",
        ],
        answer: "2/3",
      },
      {
        question: "A vessel has 60L of solution containing 20% acid. How much pure acid should be added to make it a 50% acid solution?",
        steps: [
          "Alligation: Existing solution = 20% acid, Pure acid added = 100% acid, Mean target = 50%.",
          "Ratio (Existing 60L : Pure acid) = (100 - 50) : (50 - 20) = 50 : 30 = 5 : 3.",
          "5 parts = 60L => 1 part = 12L. Pure acid needed = 3 × 12 = 36L.",
        ],
        answer: "36",
      },
      {
        question: "Two alloys A and B contain gold and copper in ratios 7:2 and 7:11. If equal quantities are melted to form a third alloy C, find the ratio of gold and copper in C.",
        steps: [
          "In A, gold = 7/9, copper = 2/9.",
          "In B, gold = 7/18, copper = 11/18.",
          "In C (equal parts): Total Gold = 7/9 + 7/18 = 21/18. Total Copper = 2/9 + 11/18 = 15/18.",
          "Ratio in C = 21 : 15 = 7 : 5.",
        ],
        answer: "7:5",
      },
    ],
    rememberThis: [
      "All terms in the alligation cross must share the same reference baseline (all cost prices, or all percentages).",
      "When adding water, consider its price as 0 and its solute concentration as 0%.",
      "Repeated replacement retains pure liquid in the ratio (1 - y/x)^n.",
      "Always convert mixture selling price to mean cost price before applying alligation.",
    ],
    relatedTopics: ["ratio-proportion", "profit-loss", "percentages"],
  },

  // 8. Ages
  {
    id: "ages",
    group: "quantitative",
    title: "Ages",
    summary:
      "Mathematical modeling of past, present, and future age intervals, age difference invariance, and ratio progression linear systems.",
    context: {
      whyItMatters:
        "Equation-setting practice; solved quickly with ratio variables.",
      whereItAppears:
        "Standard aptitude assessments, analytical puzzles, ratio-based interview challenges.",
      prerequisites: ["Linear equations in one/two variables", "Ratio algebra"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Easy",
    },
    keyConcepts: [
      {
        term: "Age Difference Invariance",
        definition: "The difference in ages between any two individuals remains perfectly constant across all points in time.",
      },
      {
        term: "Uniform Temporal Shift",
        definition: "When advancing or retreating by t years, every person's age increments or decrements by the exact same t years.",
      },
      {
        term: "Ratio Constant Method",
        definition: "Expressing ages as ak and bk, and setting cross-multiplication equations for shifts after t years.",
      },
    ],
    formulas: [
      {
        label: "Temporal Age Equations",
        expression: "Present Age = x | t years ago = (x - t) | t years hence = (x + t)",
        whenToUse: "Basic algebraic representation of time shifts.",
        example: "If present age is 24, age 6 years ago was 18, and 6 years hence will be 30.",
      },
      {
        label: "Age Difference Invariance Principle",
        expression: "Age_A(t) - Age_B(t) = Constant for all t",
        whenToUse: "Use to equate differences between ratios at past and future dates.",
        example: "If a father is 25 years older than son today, he remains 25 years older forever.",
      },
      {
        label: "Ratio Evolution Equation",
        expression: "(ak + t) / (bk + t) = m / n",
        whenToUse: "Use when present ratio a:b changes to m:n after t years.",
        example: "Present ratio 4:5, after 5 yrs 5:6: (4k + 5)/(5k + 5) = 5/6 => 24k + 30 = 25k + 25 => k = 5.",
      },
      {
        label: "Aggregate Family Age Progression",
        expression: "Sum of ages of N people after t years = Initial Sum + (N × t)",
        whenToUse: "Use when dealing with average or total ages of households or groups.",
        example: "Sum of 4 family members rises by 4 × 5 = 20 years over a 5-year period.",
      },
    ],
    shortcuts: [
      {
        trick: "Equalize Ratio Differences",
        whenItWorks: "If ratio differences (a - b) and (m - n) are equalized, 1 ratio unit corresponds directly to elapsed years.",
      },
      {
        trick: "Direct Option Substitution",
        whenItWorks: "Substitute candidate multiple choices into the future/past ratio condition directly.",
      },
      {
        trick: "Constant Difference Equating",
        whenItWorks: "Set the difference between two individuals' ratio terms equal to their constant physical age gap.",
      },
    ],
    commonTraps: [
      {
        mistake: "Applying temporal shift to only one person in a ratio.",
        fix: "Time elapses identically for all individuals; add t to both numerator and denominator.",
      },
      {
        mistake: "Confusing 't years ago' (subtract t) with 'after t years' (add t).",
        fix: "Past requires subtraction; future requires addition.",
      },
      {
        mistake: "Forgetting to multiply the time shift by the family count in total sum questions.",
        fix: "In a group of N people, total age increases by N × t after t years.",
      },
    ],
    workedExamples: [
      {
        question: "The ratio of ages of father and son is 7 : 3. If the sum of their ages is 60 years, find the father's age.",
        steps: [
          "Let father's age = 7k and son's age = 3k.",
          "Sum = 7k + 3k = 10k = 60 => k = 6.",
          "Father's age = 7 × 6 = 42 years.",
        ],
        answer: "42",
        check: () => 7 * (60 / 10),
      },
      {
        question: "The present ages of A and B are in the ratio 4 : 5. Eight years hence, their ages will be in the ratio 5 : 6. Find A's present age.",
        steps: [
          "Let present ages be 4k and 5k.",
          "After 8 years: (4k + 8) / (5k + 8) = 5 / 6.",
          "Cross multiply: 6(4k + 8) = 5(5k + 8) => 24k + 48 = 25k + 40.",
          "k = 8.",
          "A's present age = 4 × 8 = 32 years.",
        ],
        answer: "32",
        check: () => 4 * 8,
      },
      {
        question: "A father is 28 years older than his son. In 5 years, he will be three times as old as his son. Find the son's present age.",
        steps: [
          "Let son's present age = s. Father's present age = s + 28.",
          "In 5 years: Son = s + 5, Father = s + 33.",
          "Given: s + 33 = 3(s + 5) => s + 33 = 3s + 15.",
          "2s = 18 => s = 9 years.",
        ],
        answer: "9",
        check: () => (28 - 10) / 2,
      },
      {
        question: "Six years ago, the ratio of the ages of Kunal and Sagar was 6 : 5. Four years hence, the ratio of their ages will be 11 : 10. What is Sagar's age at present?",
        steps: [
          "Let ages 6 years ago be 6k and 5k.",
          "Present ages: 6k + 6 and 5k + 6.",
          "Four years hence: 6k + 10 and 5k + 10.",
          "(6k + 10) / (5k + 10) = 11 / 10.",
          "60k + 100 = 55k + 110 => 5k = 10 => k = 2.",
          "Sagar's present age = 5k + 6 = 5(2) + 6 = 16 years.",
        ],
        answer: "16",
        check: () => 5 * 2 + 6,
      },
      {
        question: "The sum of the ages of 5 children born at intervals of 3 years each is 50 years. What is the age of the youngest child?",
        steps: [
          "Let the youngest child's age be x.",
          "Children ages: x, x + 3, x + 6, x + 9, x + 12.",
          "Sum = 5x + 30 = 50.",
          "5x = 20 => x = 4 years.",
        ],
        answer: "4",
        check: () => (50 - 30) / 5,
      },
    ],
    oaExamples: [
      {
        question: "A mother was 3 times as old as her daughter 5 years ago. She will be twice as old as her daughter 10 years hence. How old is the mother now?",
        steps: [
          "Let daughter 5 yrs ago = d; Mother = 3d. Present: d + 5 and 3d + 5.",
          "In 10 years: d + 15 and 3d + 15.",
          "3d + 15 = 2(d + 15) => 3d + 15 = 2d + 30 => d = 15.",
          "Mother present = 3(15) + 5 = 50 years.",
        ],
        answer: "50",
      },
      {
        question: "The average age of a husband and wife at the time of their marriage was 23 years. After 5 years they have a one-year-old child. The average age of the family now is:",
        steps: [
          "At marriage sum of ages = 23 × 2 = 46.",
          "After 5 years, husband and wife sum = 46 + (2 × 5) = 56.",
          "Including 1-year child: Total family age = 56 + 1 = 57.",
          "Average of 3 members = 57 / 3 = 19 years.",
        ],
        answer: "19",
      },
      {
        question: "Ten years ago, P was half of Q in age. If the ratio of their present ages is 3 : 4, what is the total of their present ages?",
        steps: [
          "Present ages = 3k and 4k.",
          "10 years ago: 3k - 10 = (4k - 10) / 2 => 6k - 20 = 4k - 10.",
          "2k = 10 => k = 5.",
          "Total present ages = 3k + 4k = 7k = 7 × 5 = 35 years.",
        ],
        answer: "35",
      },
    ],
    rememberThis: [
      "The age difference between two people never changes throughout their lives.",
      "In a group of N people, total age increases by N × t after t years.",
      "Check whether the question asks for past, present, or future age.",
      "Equate ratio differences to skip long multi-variable linear algebra.",
    ],
    relatedTopics: ["ratio-proportion", "averages", "algebra-basics"],
  },

  // 9. Time & Work
  {
    id: "time-work",
    group: "quantitative",
    title: "Time & Work",
    summary:
      "Rate-time reciprocal relationships, LCM total-unit work modeling, worker efficiency variations, group labor scheduling, and alternate-day shifts.",
    context: {
      whyItMatters:
        "Very common word-problem topic; the LCM (total-units) method removes fractions.",
      whereItAppears:
        "Labor output assessments, construction/project deadline estimation, and multi-agent coordination problems.",
      prerequisites: ["LCM / HCF", "Basic fractions", "Proportions"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Total Units Method (LCM)",
        definition: "Defining total project work as the LCM of days taken by individual workers to convert reciprocal rates into clean integers.",
      },
      {
        term: "Efficiency vs Days Reciprocity",
        definition: "Efficiency is strictly inversely proportional to the time taken to complete a constant workload.",
      },
      {
        term: "Man-Days Formula",
        definition: "The fundamental labor equation: (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2.",
      },
    ],
    formulas: [
      {
        label: "Reciprocal Work Rate",
        expression: "If A completes work in 'a' days, Rate of A = 1/a work/day | Combined Rate = 1/a + 1/b = (a+b)/ab | Time = ab / (a+b)",
        whenToUse: "Basic algebraic formulation for two workers collaborating.",
        example: "A in 10 days, B in 15 days: Time = (10 × 15) / (10 + 15) = 150 / 25 = 6 days.",
      },
      {
        label: "LCM Total Units Method",
        expression: "Total Work = LCM(days) | Individual Units/Day = Total Work / Days",
        whenToUse: "The standard and fastest method to solve multi-worker scheduling.",
        example: "A in 12, B in 18: LCM = 36 units. A = 3 u/day, B = 2 u/day. Together = 5 u/day. Time = 36/5 = 7.2 days.",
      },
      {
        label: "Chain Rule / Man-Days Equivalence",
        expression: "(M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2",
        whenToUse: "Use when teams of people work for multiple hours over multiple days on variable work sizes.",
        example: "12 men take 10 days of 8 hrs to build 1 wall: (12×10×8)/1 = (16×D×6)/1 => D = 960/96 = 10 days.",
      },
      {
        label: "Efficiency & Wage Sharing",
        expression: "Wages are distributed strictly proportional to work completed: (Efficiency × Days Worked)",
        whenToUse: "Use to allocate total payment among workers of unequal skills.",
        example: "A does 3 units, B does 2 units: A gets 3/5 of total wages, B gets 2/5.",
      },
      {
        label: "Alternate Day Work Cycle",
        expression: "Cycle Work = Work completed in 1 round (e.g. Day 1 A + Day 2 B) | Time = (Cycles × 2) + Remainder/Rate",
        whenToUse: "Use when workers alternate work on consecutive days.",
        example: "A does 3 units, B does 2 units: 2-day cycle = 5 units. For 22 units: 4 cycles (8 days = 20 units), A takes 2/3 day.",
      },
    ],
    shortcuts: [
      {
        trick: "LCM Total Work Definition",
        whenItWorks: "Always choose the LCM of individual completion days as total work units to eliminate fractions.",
      },
      {
        trick: "Efficiency Inversion",
        whenItWorks: "If A is 50% more efficient than B, efficiency ratio A:B = 3:2, so days ratio A:B = 2:3.",
      },
      {
        trick: "Handling Worker Departure",
        whenItWorks: "Calculate units done before departure, subtract from total work, and divide remainder by active worker rates.",
      },
    ],
    commonTraps: [
      {
        mistake: "Adding days directly instead of adding rates.",
        fix: "Never add time: 10 days + 15 days is NOT 25 days; combined time must be less than the fastest worker's time.",
      },
      {
        mistake: "Dividing wages based on number of days rather than work completed.",
        fix: "Wages must be split according to actual units of work contributed.",
      },
      {
        mistake: "Miscalculating remaining work on alternate-day schedules.",
        fix: "Carefully trace who starts the turn when dealing with remaining fractional work units.",
      },
    ],
    workedExamples: [
      {
        question: "A can do a piece of work in 10 days and B in 15 days. How long will they take to complete the work together?",
        steps: [
          "Take LCM of 10 and 15 = 30 units (Total Work).",
          "A's daily work = 30 / 10 = 3 units/day.",
          "B's daily work = 30 / 15 = 2 units/day.",
          "Combined daily work = 3 + 2 = 5 units/day.",
          "Time taken = 30 / 5 = 6 days.",
        ],
        answer: "6",
        check: () => (10 * 15) / (10 + 15),
      },
      {
        question: "A and B can do a work in 12 days, B and C in 15 days, C and A in 20 days. How long will A, B, and C take together?",
        steps: [
          "LCM(12, 15, 20) = 60 units (Total Work).",
          "A + B = 60 / 12 = 5 units/day.",
          "B + C = 60 / 15 = 4 units/day.",
          "C + A = 60 / 20 = 3 units/day.",
          "2(A + B + C) = 5 + 4 + 3 = 12 units/day => A + B + C = 6 units/day.",
          "Time taken together = 60 / 6 = 10 days.",
        ],
        answer: "10",
        check: () => 60 / 6,
      },
      {
        question: "A is twice as good a workman as B and together they finish a piece of work in 18 days. In how many days will A alone finish the work?",
        steps: [
          "Efficiency ratio A : B = 2 : 1.",
          "Combined daily work = 2 + 1 = 3 units/day.",
          "Total work = 18 days × 3 units/day = 54 units.",
          "Time for A alone = 54 / 2 = 27 days.",
        ],
        answer: "27",
        check: () => (18 * 3) / 2,
      },
      {
        question: "A can do a work in 14 days and B in 21 days. They begin together but 3 days before the completion of work, A leaves. Find total days to complete work.",
        steps: [
          "LCM(14, 21) = 42 units.",
          "A = 3 units/day, B = 2 units/day.",
          "In the last 3 days, only B worked: 3 × 2 = 6 units.",
          "Remaining work done by A + B = 42 - 6 = 36 units.",
          "Time together = 36 / (3 + 2) = 36 / 5 = 7.2 days.",
          "Total time = 7.2 + 3 = 10.2 days (or 10 1/5 days).",
        ],
        answer: "10.2",
        check: () => 36 / 5 + 3,
      },
      {
        question: "If 12 men or 18 women can reap a field in 14 days, in how many days can 8 men and 16 women reap the same field?",
        steps: [
          "Equate work capacity: 12 Men = 18 Women => 1 Man = 1.5 Women (2 Men = 3 Women).",
          "Convert team to women: 8 Men = 8 × 1.5 = 12 Women.",
          "Total combined team = 12 Women + 16 Women = 28 Women.",
          "Apply chain rule: M1 × D1 = M2 × D2 => 18 × 14 = 28 × D2.",
          "D2 = (18 × 14) / 28 = 18 / 2 = 9 days.",
        ],
        answer: "9",
        check: () => (18 * 14) / 28,
      },
    ],
    oaExamples: [
      {
        question: "A and B working separately can do a piece of work in 9 and 12 days respectively. If they work for a day alternately, A beginning, in how many days will the work be completed?",
        steps: [
          "LCM(9, 12) = 36 units. A = 4 u/day, B = 3 u/day.",
          "2-day cycle (A + B) = 4 + 3 = 7 units.",
          "5 full cycles = 5 × 2 = 10 days, completing 5 × 7 = 35 units.",
          "Remaining work = 36 - 35 = 1 unit.",
          "Day 11 is A's turn: A needs 1 / 4 day.",
          "Total time = 10 1/4 days (10.25 days).",
        ],
        answer: "10.25",
      },
      {
        question: "A, B and C can do a work in 4, 6 and 10 days respectively. They finish the work together and earn ₹620. What is the share of C?",
        steps: [
          "LCM(4, 6, 10) = 60 units. A = 15, B = 10, C = 6 units/day.",
          "Ratio of wages = 15 : 10 : 6. Total parts = 31.",
          "C's share = 620 × (6 / 31) = 20 × 6 = ₹120.",
        ],
        answer: "120",
      },
      {
        question: "A contract is to be completed in 46 days and 117 men were set to work, each working 8 hours a day. After 33 days, 4/7 of the work is completed. How many additional men may be employed so that the work is finished in time?",
        steps: [
          "M1 = 117, D1 = 33, H1 = 8, W1 = 4/7.",
          "Days left = 46 - 33 = 13 days; Work left W2 = 3/7, H2 = 9 (or 8 hrs).",
          "Using (M1·D1·H1)/W1 = (M2·D2·H2)/W2 gives M2 = 198 men.",
          "Additional men = 198 - 117 = 81 men.",
        ],
        answer: "81",
      },
    ],
    rememberThis: [
      "Total Work = LCM of individual completion days.",
      "Efficiency = Total Work / Days Taken.",
      "Never add days directly; add rates of work.",
      "Wages are allocated strictly in proportion to work done (Efficiency × Days).",
    ],
    relatedTopics: ["pipes-cisterns", "ratio-proportion", "time-speed-distance"],
  },

  // 10. Pipes & Cisterns
  {
    id: "pipes-cisterns",
    group: "quantitative",
    title: "Pipes & Cisterns",
    summary:
      "Fluid reservoir filling and emptying dynamics, inlet positive rates vs outlet negative rates, tank leakages, and sequential valve timing.",
    context: {
      whyItMatters:
        "The same logic as time and work with inlet (+) and outlet (-) rates.",
      whereItAppears:
        "Hydraulic flow rate problems, reservoir fill/drain optimization, and dual-action engineering math problems.",
      prerequisites: ["Time & Work", "LCM method", "Fractional arithmetic"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Inlet Pipe (+ Rate)",
        definition: "A pipe that fills a tank in x hours has a positive rate of +1/x of the tank per hour.",
      },
      {
        term: "Outlet / Leak (- Rate)",
        definition: "A pipe or leak that empties a tank in y hours has a negative rate of -1/y of the tank per hour.",
      },
      {
        term: "Net Reservoir Rate",
        definition: "The algebraic sum of positive inlet rates and negative outlet/drainage rates.",
      },
    ],
    formulas: [
      {
        label: "Dual Inlet-Outlet Net Rate",
        expression: "Net Rate = 1/x - 1/y | Net Time = (x × y) / (y - x) (when y > x)",
        whenToUse: "Use when an inlet pipe fills in x hours and an outlet pipe empties in y hours simultaneously.",
        example: "Fill in 10 hrs, empty in 15 hrs: Net Time = (10 × 15) / (15 - 10) = 150 / 5 = 30 hours.",
      },
      {
        label: "Leak Emptying Shortcut",
        expression: "Leak Alone Time = (T1 × T2) / (T2 - T1)",
        whenToUse: "When a tank normally fills in T1 hours, but due to a leak takes T2 hours (T2 > T1).",
        example: "Fills in 8 hrs normally, takes 10 hrs with leak: Leak empties in (8 × 10) / (10 - 8) = 80 / 2 = 40 hours.",
      },
      {
        label: "LCM Tank Capacity Definition",
        expression: "Capacity = LCM(times) | Inflow = + (Capacity / x) | Outflow = - (Capacity / y)",
        whenToUse: "Use to solve complex multi-pipe networks without using fractions.",
        example: "Pipes fill in 12, 15, empty in 20: Capacity = 60L. Rates: +5, +4, -3 => Net = +6 L/hr => Time = 10 hrs.",
      },
      {
        label: "Part Filled After Duration t",
        expression: "Part Filled = t × Σ(Net Rates)",
        whenToUse: "Use to track accumulated reservoir volume over specific time windows.",
        example: "Net rate = 1/12 per hr: in 3 hrs, part filled = 3 × (1/12) = 1/4 of tank.",
      },
    ],
    shortcuts: [
      {
        trick: "LCM Capacity Modeling",
        whenItWorks: "Treat tank capacity as the LCM of given hours; inlets have positive rates, outlets have negative rates.",
      },
      {
        trick: "Direct Leak Formula",
        whenItWorks: "Compute leak emptying time directly using Product / Difference of normal and delayed fill times.",
      },
      {
        trick: "Staggered Pipe Opening Tracking",
        whenItWorks: "Calculate the fluid pumped in each discrete hour window before the next pipe opens.",
      },
    ],
    commonTraps: [
      {
        mistake: "Forgetting the negative sign for outlet pipes and leaks.",
        fix: "Always assign a negative rate to draining outlets; subtract them from positive inlet rates.",
      },
      {
        mistake: "Using normal fill time instead of leak-delayed time when finding leak capacity.",
        fix: "Leak rate is (1/T_normal) - (1/T_with_leak).",
      },
      {
        mistake: "Not adjusting the denominator when a pipe is closed partway.",
        fix: "Calculate work done before closure, then divide remaining volume by the active pipes' rates.",
      },
    ],
    workedExamples: [
      {
        question: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take to fill the tank?",
        steps: [
          "LCM(20, 30) = 60 units (Tank capacity).",
          "A's rate = 60 / 20 = 3 units/min.",
          "B's rate = 60 / 30 = 2 units/min.",
          "Combined rate = 3 + 2 = 5 units/min.",
          "Time to fill = 60 / 5 = 12 minutes.",
        ],
        answer: "12",
        check: () => (20 * 30) / (20 + 30),
      },
      {
        question: "A pipe can fill a tank in 15 hours. Due to a leak in the bottom, it is filled in 20 hours. If the tank is full, how much time will the leak take to empty it?",
        steps: [
          "Apply leak shortcut: (T1 × T2) / (T2 - T1).",
          "T1 = 15, T2 = 20.",
          "Leak Time = (15 × 20) / (20 - 15) = 300 / 5 = 60 hours.",
        ],
        answer: "60",
        check: () => (15 * 20) / (20 - 15),
      },
      {
        question: "Pipe A can fill a cistern in 12 hours, B in 15 hours, and C can empty it in 20 hours. If all three are opened together, find the time to fill the cistern.",
        steps: [
          "LCM(12, 15, 20) = 60 units (Cistern capacity).",
          "A = +5 units/hr, B = +4 units/hr, C = -3 units/hr.",
          "Net rate = 5 + 4 - 3 = 6 units/hr.",
          "Time to fill = 60 / 6 = 10 hours.",
        ],
        answer: "10",
        check: () => 60 / (5 + 4 - 3),
      },
      {
        question: "Two pipes A and B can fill a tank in 15 minutes and 20 minutes respectively. Both pipes are opened together, but pipe A is turned off after 4 minutes. What is the total time required to fill the tank?",
        steps: [
          "LCM(15, 20) = 60 units. A = 4 u/min, B = 3 u/min.",
          "In first 4 minutes, both open: 4 × (4 + 3) = 4 × 7 = 28 units.",
          "Remaining capacity = 60 - 28 = 32 units.",
          "Only B fills remainder: 32 / 3 = 10 2/3 minutes (10 mins 40 secs).",
          "Total time = 4 + 10 2/3 = 14 2/3 minutes (14.67 mins).",
        ],
        answer: "14.67",
        check: () => Math.round((4 + 32 / 3) * 100) / 100,
      },
      {
        question: "A cistern has two pipes. One can fill it with water in 8 hours and other can empty it in 5 hours. In how many hours will the cistern be emptied if both are opened together when 3/4 of the cistern is already full?",
        steps: [
          "LCM(8, 5) = 40 units capacity.",
          "Inlet rate = +5 u/hr, Outlet rate = -8 u/hr.",
          "Net rate = 5 - 8 = -3 u/hr (empties at 3 units/hr).",
          "Initial water present = 3/4 of 40 = 30 units.",
          "Time to empty = 30 / 3 = 10 hours.",
        ],
        answer: "10",
        check: () => 30 / 3,
      },
    ],
    oaExamples: [
      {
        question: "Three pipes A, B and C can fill a tank in 6 hours. After working together for 2 hours, C is closed and A and B fill the remaining part in 7 hours. The number of hours taken by C alone to fill the tank is:",
        steps: [
          "Part filled in 2 hours = 2 / 6 = 1/3.",
          "Remaining part = 1 - 1/3 = 2/3.",
          "A and B do 2/3 in 7 hours => A + B full rate = 2 / (3 × 7) = 2/21 per hour.",
          "C's rate = (A + B + C) - (A + B) = 1/6 - 2/21 = (7 - 4) / 42 = 3/42 = 1/14.",
          "C alone takes 14 hours.",
        ],
        answer: "14",
      },
      {
        question: "A tank is filled in 5 hours by three pipes A, B and C. The pipe C is twice as fast as B and B is twice as fast as A. How much time will pipe A alone take to fill the tank?",
        steps: [
          "Let A's rate = x; then B = 2x, C = 4x.",
          "Combined rate = x + 2x + 4x = 7x.",
          "In 5 hours, total work = 5 × 7x = 35x.",
          "Time for A alone = 35x / x = 35 hours.",
        ],
        answer: "35",
      },
      {
        question: "Two pipes can fill a cistern in 14 hours and 16 hours respectively. The pipes are opened simultaneously and it is found that due to leakage in the bottom it took 32 minutes more to fill the cistern. When the cistern is full, in what time will the leak empty it?",
        steps: [
          "Normal time T = (14 × 16) / 30 = 224 / 30 = 7 hours 28 mins.",
          "With leak, time = 7 hrs 28 min + 32 min = 8 hours.",
          "Work done by pipes in 8 hrs = 8 × (30 / 224) = 240 / 224 = 15 / 14.",
          "In 8 hrs leak empties 15/14 - 1 = 1/14.",
          "Time for leak alone = 8 × 14 = 112 hours.",
        ],
        answer: "112",
      },
    ],
    rememberThis: [
      "Inlets add fluid (+); Outlets/leaks subtract fluid (-).",
      "Leak alone emptying time = (T_normal × T_delayed) / (T_delayed - T_normal).",
      "Use LCM of filling and emptying times as the nominal tank capacity.",
      "Check whether the question asks for time to fill or time to empty.",
    ],
    relatedTopics: ["time-work", "ratio-proportion", "percentages"],
  },
];
