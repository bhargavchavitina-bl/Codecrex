import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Command,
  Lightbulb,
  Star,
  Target,
} from "lucide-react";
import type { aptitudeTopics } from "../data/aptitude";
type Topic = (typeof aptitudeTopics)[number];
type Example = [string, string];
const content: Record<
  string,
  {
    idea: string;
    formulas: string[];
    tricks: string[];
    examples: Example[];
    mistakes: string[];
    oa: string[];
  }
> = {
  Percentages: {
    idea: "A percentage expresses a part out of 100. Identify the base—the quantity that represents 100%—before calculating.",
    formulas: [
      "x% of y = y% of x",
      "Successive change = a + b + ab/100",
      "Restore after r% rise: reduce by r/(100+r) × 100%",
    ],
    tricks: [
      "Use friendly fractions: 25%=1/4, 12.5%=1/8.",
      "Use multipliers such as 1.2 and 0.8 for successive changes.",
      "Estimate the new value before doing exact arithmetic.",
    ],
    examples: [
      ["Find 18% of 250.", "10% is 25 and 8% is 20; total = 45."],
      [
        "A score rises from 60 to 75. Find the increase %.",
        "Increase 15 ÷ original 60 × 100 = 25%.",
      ],
      [
        "A value rises 15%, then falls 10%. Net change?",
        "1.15 × .90 = 1.035, a 3.5% increase.",
      ],
      ["After a 20% discount, price is ₹960. Original?", "960 ÷ .8 = ₹1,200."],
      [
        "A number falls 25%. By what percent must it rise to recover?",
        "Remaining fraction .75. Required rise = .25/.75 × 100 = 33⅓%.",
      ],
    ],
    mistakes: [
      "Adding successive percentages directly.",
      "Using the new value as the base for percentage change.",
      "Forgetting the direction when undoing a change.",
    ],
    oa: [
      "A 20% rise followed by a 20% fall gives what net change?",
      "A value is 40% of B. What percent of A is B?",
      "A price rises 25%; what decrease restores the original?",
    ],
  },
  "Profit & Loss": {
    idea: "Profit and loss compare cost price and selling price. Gain or loss percentage uses cost price; a discount is taken from marked price.",
    formulas: [
      "Profit = SP − CP; loss = CP − SP",
      "Profit % = profit / CP × 100",
      "Successive discounts = a + b − ab/100",
    ],
    tricks: [
      "Let CP be 100 when only percentages matter.",
      "Apply discounts as multipliers in sequence.",
      "Equal selling prices with equal gain and loss yield a net loss.",
    ],
    examples: [
      [
        "Cost ₹640, selling ₹800. Profit percent?",
        "Profit ₹160; 160/640 × 100 = 25%.",
      ],
      [
        "Marked price ₹2,000, discount 15%. Selling price?",
        "Discount ₹300; selling price ₹1,700.",
      ],
      [
        "₹900 item gets discounts of 10%, then 5%. Final price?",
        "900 × .9 × .95 = ₹769.50.",
      ],
      [
        "A ₹1,100 sale yields a 10% loss. Cost price?",
        "1,100 ÷ .9 = ₹1,222.22 (approximately).",
      ],
      [
        "Same selling price gives 25% gain and 25% loss. Overall?",
        "For equal selling prices, the result is a 6.25% loss.",
      ],
    ],
    mistakes: [
      "Computing profit percent on selling price.",
      "Applying a discount to cost price rather than marked price.",
      "Adding two successive discount percentages.",
    ],
    oa: [
      "An item costs ₹800 and sells for ₹1,000. Find gain %.",
      "Two discounts, 20% and 10%, equal which single discount?",
      "Why is equal selling price important in equal gain/loss questions?",
    ],
  },
  "Time & Work": {
    idea: "Convert completion times into work rates. Add rates for people working together, then convert the combined rate back into time.",
    formulas: [
      "Rate = 1 / time",
      "Combined rate = sum of individual rates",
      "Work = people × hours × days × efficiency",
    ],
    tricks: [
      "Use LCM of completion times as total work units.",
      "For an outlet or leak, subtract its rate.",
      "Scale workers and days inversely when hours and efficiency match.",
    ],
    examples: [
      [
        "A finishes in 15 days. Fraction completed in 5 days?",
        "Rate is 1/15 per day; in 5 days: 5/15 = 1/3.",
      ],
      [
        "A takes 12 days, B 18. Together?",
        "Rate 1/12+1/18=5/36, so time=36/5=7.2 days.",
      ],
      [
        "Eight workers finish in 9 days. How long for 12 workers?",
        "Work=72 worker-days; 72/12=6 days.",
      ],
      [
        "A pipe fills in 4h; outlet empties in 12h. Both open?",
        "Net rate=1/4−1/12=1/6; tank fills in 6 hours.",
      ],
      [
        "A takes 10 days. B is twice as efficient. Together?",
        "Rates 1/10 and 1/5; combined 3/10, so 10/3 days.",
      ],
    ],
    mistakes: [
      "Adding completion times instead of work rates.",
      "Forgetting to subtract an outlet’s rate.",
      "Mixing worker-days and days.",
    ],
    oa: [
      "A takes 10 days, B 15. How long together?",
      "A completes 1/3 of a job in 4 days. Find A’s full time.",
      "How does an outlet change a filling rate?",
    ],
  },
  "Time-Speed-Distance": {
    idea: "Distance, speed and time are linked. Decide whether distance or time stays fixed, then use consistent units.",
    formulas: [
      "Speed = distance / time",
      "Equal-distance average = 2xy/(x+y)",
      "km/h to m/s: multiply by 5/18",
    ],
    tricks: [
      "For equal distances, use the harmonic mean formula.",
      "For trains meeting, add lengths and relative speeds.",
      "Convert all units before calculating.",
    ],
    examples: [
      ["Convert 90 km/h to m/s.", "90 × 5/18 = 25 m/s."],
      ["Travel 210 km in 3.5h. Average speed?", "210 ÷ 3.5 = 60 km/h."],
      [
        "Equal distances at 40 and 60 km/h. Average speed?",
        "2×40×60/(40+60)=48 km/h.",
      ],
      [
        "A 180m train crosses a pole in 12s. Speed?",
        "180/12=15 m/s = 54 km/h.",
      ],
      [
        "Downstream speed 14 and upstream 8 km/h. Stream speed?",
        "(14−8)/2 = 3 km/h.",
      ],
    ],
    mistakes: [
      "Using an arithmetic mean of speeds for equal distances.",
      "Forgetting unit conversion.",
      "Leaving out platform length in a train crossing.",
    ],
    oa: [
      "A vehicle travels 120km in 2h. Find speed.",
      "Two vehicles move opposite ways at 40 and 50km/h. Relative speed?",
      "A train crosses a 200m platform. Which total distance is covered?",
    ],
  },
  Ratio: {
    idea: "A ratio compares quantities by division. Scale all parts by the same factor and use a common term when combining ratios.",
    formulas: [
      "a:b = c:d ⇒ ad = bc",
      "Share = part / total parts × whole",
      "Partnership share ∝ capital × time",
    ],
    tricks: [
      "Represent the ratio as k-multiples.",
      "Equalize the common term before combining ratios.",
      "Check whether a relationship is direct or inverse.",
    ],
    examples: [
      [
        "Divide 96 in ratio 5:7. Larger share?",
        "12 total parts; each=8. Larger share=7×8=56.",
      ],
      [
        "If a:b=3:4 and b:c=2:5, find a:c.",
        "Scale b to 4: ratios become 3:4 and 4:10. So 3:10.",
      ],
      [
        "₹7,200 divided in ratio 2:3:4. Middle share?",
        "9 parts; each=₹800. Middle share=₹2,400.",
      ],
      [
        "A:B capital 4:5, invested 12 and 8 months. Profit ratio?",
        "4×12:5×8 = 48:40 = 6:5.",
      ],
      [
        "x varies inversely with y; x=8 when y=6. Find x when y=12.",
        "xy stays 48; x=48/12=4.",
      ],
    ],
    mistakes: [
      "Treating ratio terms as actual quantities before finding k.",
      "Failing to scale ratios to a common term.",
      "Using inverse proportion as direct proportion.",
    ],
    oa: [
      "Share 360 in ratio 2:7.",
      "A:B=4:5 and B:C=10:3. Find A:C.",
      "If 6 machines take 8 hours, how long for 12?",
    ],
  },
  Probability: {
    idea: "Probability ranges from 0 to 1. Count equally likely outcomes carefully, especially when draws happen without replacement.",
    formulas: [
      "P(E)=favourable outcomes / total outcomes",
      "P(not E)=1−P(E)",
      "Independent: P(A and B)=P(A)P(B)",
    ],
    tricks: [
      "Use the complement for “at least one”.",
      "List small sample spaces to avoid missed outcomes.",
      "For without-replacement draws, update the denominator.",
    ],
    examples: [
      [
        "A fair die is rolled. Probability of a prime?",
        "Prime faces 2,3,5: 3/6=1/2.",
      ],
      [
        "Two coins tossed. Probability of at least one tail?",
        "Complement of HH: 1−1/4=3/4.",
      ],
      [
        "One card drawn. Probability of a king?",
        "4 kings among 52 cards: 1/13.",
      ],
      [
        "Bag has 4 red and 3 blue. Draw 2 without replacement. Both red?",
        "4/7 × 3/6 = 2/7.",
      ],
      [
        "Two dice: probability sum is 8?",
        "Five pairs sum to 8 among 36 outcomes: 5/36.",
      ],
    ],
    mistakes: [
      "Treating dependent draws as independent.",
      "Counting outcomes as equally likely when they are not.",
      "Forgetting the overlap in “A or B” events.",
    ],
    oa: [
      "A fair die: probability of a result greater than 4?",
      "Two coins: probability of exactly one head?",
      "Why does the denominator change after a draw without replacement?",
    ],
  },
  Series: {
    idea: "Look for a simple rule in differences, ratios, alternating terms, or familiar number families before extending a sequence.",
    formulas: [
      "Check first differences and second differences",
      "Then check ratios and alternating positions",
      "Compare terms with squares, cubes, and primes",
    ],
    tricks: [
      "Write the gap between every pair of neighboring terms.",
      "Split odd and even positions if the pattern alternates.",
      "Prefer the simplest rule that fits every term.",
    ],
    examples: [
      ["Next: 6, 10, 14, 18, …", "Add 4 each time; next is 22."],
      ["Next: 2, 6, 18, 54, …", "Multiply by 3 each time; next is 162."],
      ["Next: 1, 4, 9, 16, …", "Squares; next is 25."],
      [
        "Next: 3, 5, 8, 12, 17, …",
        "Differences +2,+3,+4,+5; next +6 gives 23.",
      ],
      [
        "Next: 2, 3, 5, 8, 13, …",
        "Each term sums the previous two; next is 21.",
      ],
    ],
    mistakes: [
      "Assuming every series is arithmetic.",
      "Missing a second alternating pattern.",
      "Choosing a complicated rule when a simpler one fits.",
    ],
    oa: [
      "Complete 4, 9, 14, 19, …",
      "Find the next term: 3, 6, 12, 24, …",
      "What should you test after first differences fail?",
    ],
  },
  "Blood Relations": {
    idea: "Translate each relationship from the speaker’s point of view. A small family tree prevents reversals and hidden gender assumptions.",
    formulas: [
      "Map one relationship at a time",
      "Track generations: parent +1, child −1",
      "Use gender only when a clue states it",
    ],
    tricks: [
      "Draw a tiny tree and label each person.",
      "Anchor “my” or “his/her” before following the chain.",
      "Restate the final relationship from the person asked about.",
    ],
    examples: [
      [
        "Mira is Ravi’s sister. Ravi is Tara’s father. Relation?",
        "Mira is Tara’s aunt.",
      ],
      ["N is P’s son. P is Q’s daughter. N to Q?", "N is Q’s grandson."],
      [
        "A is B’s brother. B is C’s mother. A to C?",
        "A is C’s maternal uncle.",
      ],
      ["R is S’s father. S is T’s sister. R to T?", "R is T’s father."],
      ["K is L’s mother. L and M are siblings. K to M?", "K is M’s mother."],
    ],
    mistakes: [
      "Assuming gender when it is not stated.",
      "Reversing the viewpoint of the relationship.",
      "Skipping a generation in a multi-link chain.",
    ],
    oa: [
      "A is B’s sister; B is C’s father. How is A related to C?",
      "P is Q’s son; Q is R’s daughter. P to R?",
      "Which clues do you need before naming a brother or sister?",
    ],
  },
  "Self-Introduction & HR Basics": {
    idea: "A fresher introduction should connect your degree, strongest evidence, and target role in about a minute. Keep the answer specific and natural, not memorized.",
    formulas: [
      "Present: degree + focus",
      "Proof: project or measurable result",
      "Next: why this role fits",
    ],
    tricks: [
      "Lead with the detail most relevant to this role.",
      "Use one concrete example for each claimed strength.",
      "Practice aloud, then keep the wording conversational.",
    ],
    examples: [
      [
        "How do I answer ‘Tell me about yourself’?",
        "I’m a final-year CSE student focused on frontend engineering. I built a campus events app in React, where I improved the search flow after testing it with classmates. I’m looking for a role where I can keep building accessible products.",
      ],
      [
        "How can I explain a strength?",
        "Name the strength, give a short example, and state the result: ‘I’m organized; I planned a four-person project in weekly milestones, which helped us deliver the demo on time.’",
      ],
      [
        "How should I discuss a weakness?",
        "Choose a real, manageable skill and explain what you are doing about it. Avoid presenting a disguised strength or a trait critical to the role.",
      ],
      [
        "How do I answer ‘Why this company’?",
        "Connect one verified detail about the company’s work to your own interests, then explain the contribution you hope to make.",
      ],
      [
        "What if I do not know an interview answer?",
        "Say what you do know, explain your reasoning, and ask a clarifying question if needed. Do not bluff.",
      ],
    ],
    mistakes: [
      "Reciting personal details unrelated to the role.",
      "Claiming skills without examples.",
      "Giving a scripted answer that sounds unnatural.",
    ],
    oa: [
      "Give a 45-second introduction tailored to a frontend role.",
      "Describe a time you changed your approach after feedback.",
      "Name one specific reason this role matches your current skills.",
    ],
  },
  "Resume & Profile Tips": {
    idea: "A fresher resume makes relevant evidence easy to scan: education, skills, projects, experience, and links. Strong project bullets explain what you built and what changed because of it.",
    formulas: [
      "Action verb + what you built + tools + result",
      "One page is a useful target for most fresher resumes",
      "Use consistent dates, headings, and spacing",
    ],
    tricks: [
      "Quantify users, latency, coverage, or scope when you can verify the number.",
      "Put the most role-relevant project first.",
      "Use simple formatting that parses cleanly in applicant tracking systems.",
    ],
    examples: [
      [
        "Improve ‘Made a website in React.’",
        "‘Built a React event portal with searchable listings and a responsive registration flow.’ Add a verified metric only if you measured it.",
      ],
      [
        "What belongs in a project entry?",
        "Project name, one-line purpose, your contribution, the stack, and two concise outcome-focused bullets.",
      ],
      [
        "How should skills be listed?",
        "Group skills you can discuss confidently; keep the list aligned with the role and your actual experience.",
      ],
      [
        "What makes a GitHub link useful?",
        "A working repository with a clear README, setup steps, screenshots where useful, and meaningful commit history.",
      ],
      [
        "How do I check ATS readability?",
        "Copy the exported PDF text into a plain-text editor and confirm that headings and dates appear in the expected order.",
      ],
    ],
    mistakes: [
      "Adding unverified impact numbers.",
      "Listing tools you cannot explain.",
      "Using decorative columns or graphics that scramble reading order.",
    ],
    oa: [
      "Rewrite one project bullet using action, scope, and result.",
      "Which two projects best support your target role?",
      "What should you verify before sharing your profile link?",
    ],
  },
  "Group Discussion Basics": {
    idea: "A group discussion rewards clear reasoning, listening, and useful collaboration. Contribute relevant points, build on others’ ideas, and make room for different voices.",
    formulas: [
      "Point → reason → example",
      "Acknowledge → add evidence → connect",
      "Opening: define the scope; closing: summarize shared ground",
    ],
    tricks: [
      "Take a breath and enter when you have a distinct point.",
      "Refer to an earlier speaker’s idea to show active listening.",
      "If the group stalls, offer a simple structure or comparison.",
    ],
    examples: [
      [
        "How can I open a discussion?",
        "Briefly define the issue and suggest two angles to examine, without claiming the only valid framing.",
      ],
      [
        "How do I disagree constructively?",
        "Acknowledge the point, state your concern, then support it with a reason or example.",
      ],
      [
        "What if I have not spoken yet?",
        "Listen for a gap or unanswered question, then contribute one concise point connected to the discussion.",
      ],
      [
        "How can I bring a quiet group forward?",
        "Invite a new angle with an open question rather than putting an individual on the spot.",
      ],
      [
        "How should a closing summary sound?",
        "Recap the main themes, note any trade-offs, and avoid claiming consensus when it was not reached.",
      ],
    ],
    mistakes: [
      "Interrupting or repeating an earlier point.",
      "Treating volume as confidence.",
      "Speaking only to score points instead of advancing the discussion.",
    ],
    oa: [
      "Give one reasoned point on a topic you have researched.",
      "How would you respectfully challenge an unsupported claim?",
      "Summarize two sides of a debate in under 30 seconds.",
    ],
  },
  "Online Assessment Patterns": {
    idea: "Campus assessments can combine aptitude, reasoning, verbal, and coding sections. Formats and cutoffs vary by role, cohort, and hiring cycle, so use this as general preparation rather than a company guarantee.",
    formulas: [
      "Read the current official careers instructions first",
      "Budget time by marks and question difficulty",
      "Verify the latest pattern on the company’s official careers page",
    ],
    tricks: [
      "Practice a timed mixed set to build section-switching stamina.",
      "Check permitted tools, browser requirements, and test environment in advance.",
      "Keep an error log and revisit the topic behind each mistake.",
    ],
    examples: [
      [
        "How should I prepare if a test has several sections?",
        "Practice each skill separately, then combine them in timed sets while tracking accuracy and time.",
      ],
      [
        "Can I assume a named company always uses one test pattern?",
        "No. Use company names as examples only and verify current instructions on its official careers page.",
      ],
      [
        "How do I handle a difficult timed question?",
        "Set a time limit, mark it for return, and protect time for questions you can solve confidently.",
      ],
      [
        "What should I check before a remote assessment?",
        "Confirm the official link, device and browser requirements, time zone, permitted resources, and a reliable connection.",
      ],
      [
        "How do I review a mock test?",
        "Separate concept errors, misreads, arithmetic slips, and time-pressure errors; choose one correction to practice next.",
      ],
    ],
    mistakes: [
      "Treating old online patterns as current facts.",
      "Spending too long on one hard item.",
      "Reviewing only the score instead of the underlying errors.",
    ],
    oa: [
      "Build a 30-minute practice plan across three skills.",
      "Where should you verify a current company assessment format?",
      "Which error type would you track after a mock test?",
    ],
  },
};
export default function LearnContent({ topic }: { topic: Topic }) {
  const names = Object.keys(content),
    [unit, setUnit] = useState(
      names.find((n) => topic.units.includes(n)) || topic.units[0],
    ),
    isScaffold = !content[unit],
    data = content[unit] || {
      idea: `Build a repeatable method for ${unit.toLowerCase()}. Identify what is given, choose a rule, and check whether the result satisfies the conditions.`,
      formulas: [
        "Identify the known values",
        "Write the relationship before calculating",
        "Check units and boundary cases",
      ],
      tricks: [
        "Estimate before calculating",
        "Keep each condition visible",
        "Check your result in reverse",
      ],
      examples: Array.from({ length: 5 }, (_, i) => [
        `Practice ${unit.toLowerCase()} example ${i + 1}`,
        "Start by listing the conditions and work through them one at a time.",
      ]),
      mistakes: [
        "Skipping a condition",
        "Using the wrong relationship",
        "Rounding too early",
      ],
      oa: [
        "Explain your setup before calculating.",
        "Which condition changes the method?",
        "Check your result against the original question.",
      ],
    };
  return (
    <div className="learn-layout">
      <aside className="learn-nav">
        <b>IN THIS PATH</b>
        {topic.units.map((u, i) => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={unit === u ? "learn-unit-active" : ""}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {u}
          </button>
        ))}
      </aside>
      <div className="learn-main">
        <section className="learn-intro card">
          {isScaffold && (
            <span className="scaffold-label">
              TODO · LESSON CONTENT TO BE ADDED
            </span>
          )}
          <span className="learn-tag">
            <Lightbulb size={14} /> THE IDEA
          </span>
          <h2>{unit}: a method you can reuse.</h2>
          <p>{data.idea}</p>
        </section>
        <section className="learn-section card">
          <div className="learn-section-title">
            <div className="section-icon formula-icon">
              <Command size={17} />
            </div>
            <div>
              <h3>Formula & method sheet</h3>
              <p>Start with the relationship that matches the question.</p>
            </div>
          </div>
          <div className="formula-grid">
            {data.formulas.map((f, i) => (
              <div className="formula-chip" key={f}>
                <span>0{i + 1}</span>
                <code>{f}</code>
              </div>
            ))}
          </div>
        </section>
        <section className="learn-section card">
          <div className="learn-section-title">
            <div className="section-icon trick-icon">
              <Star size={17} />
            </div>
            <div>
              <h3>Shortcuts & common traps</h3>
              <p>Use a shortcut only after the setup is clear.</p>
            </div>
          </div>
          <ul className="check-list">
            {data.tricks.map((m, i) => (
              <li key={m}>
                {i === 0 ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}{" "}
                {m}
              </li>
            ))}
          </ul>
          <ul className="mistake-list">
            {data.mistakes.map((m) => (
              <li key={m}>
                <AlertCircle size={15} />
                {m}
              </li>
            ))}
          </ul>
        </section>
        <section className="learn-section card">
          <div className="learn-section-title">
            <div className="section-icon example-icon">
              <Target size={17} />
            </div>
            <div>
              <h3>Five worked examples</h3>
              <p>Try the setup before opening each solution.</p>
            </div>
          </div>
          <div className="example-list">
            {data.examples.map(([q, a], i) => (
              <details className="example-item" key={q}>
                <summary>
                  <span className="example-number">0{i + 1}</span>
                  <b>{q}</b>
                  <ChevronDown size={16} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="learn-section card">
          <div className="learn-section-title">
            <div className="section-icon formula-icon">
              <Target size={17} />
            </div>
            <div>
              <h3>OA-style quick checks</h3>
              <p>Short prompts to apply the same ideas under time pressure.</p>
            </div>
          </div>
          <ol className="oa-list">
            {data.oa.map((q, i) => (
              <li key={q}>
                <span>0{i + 1}</span>
                {q}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
