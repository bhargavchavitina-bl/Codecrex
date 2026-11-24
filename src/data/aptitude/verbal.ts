// src/data/aptitude/verbal.ts
// Comprehensive Aptitude Data: Verbal Ability (Topics 29 to 33)

import type { AptitudeTopicData } from "./types";

export const verbalTopics: AptitudeTopicData[] = [
  // 29. Reading Comprehension
  {
    id: "reading-comprehension",
    group: "verbal",
    title: "Reading Comprehension",
    summary:
      "Analyze passage structure, extract central themes, evaluate authorial tone, deduce logical inferences, and resolve contextual vocabulary questions.",
    context: {
      whyItMatters:
        "Reading Comprehension (RC) evaluates rapid reading speed, critical analysis, retention, and the ability to distinguish stated facts from unwarranted assumptions.",
      whereItAppears:
        "Present in CAT (VARC), GRE, GMAT, TCS NQT, Infosys, Capgemini, and Bank PO English sections.",
      prerequisites: ["Vocabulary", "Grammar Fundamentals", "Skimming & Scanning"],
      targetTimePerQuestion: "45-75 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Main Idea vs Supporting Details",
        definition: "The primary thesis represents the core argument the author defends throughout the text. Supporting details provide empirical evidence, examples, or historical context to substantiate the main idea.",
      },
      {
        term: "Inference vs Stated Fact",
        definition: "A stated fact is explicitly articulated in the text. An inference is a conclusion logically derived from the stated premises that is 100% necessarily true without relying on external real-world assumptions.",
      },
      {
        term: "Authorial Tone & Attitude",
        definition: "The perspective the author adopts toward the subject matter: objective/analytical, critical, eulogistic/laudatory, cynical, didactic, or skeptical.",
      },
      {
        term: "Extreme Language Elimination",
        definition: "Options containing absolute qualifiers ('always', 'never', 'solely', 'impossible', 'entirely') are almost always false unless explicitly backed by identical wording in the text.",
      },
    ],
    formulas: [
      {
        label: "Question-First Skimming Technique",
        expression: "1. Read Question Stems -> 2. Identify Keywords -> 3. Skim Passage Skeleton -> 4. Targeted Deep Read",
        whenToUse: "Efficiently navigating dense 300-500 word passages under strict time limits.",
        example: "Preview questions to know whether to focus on line 12 or the conclusion.",
      },
      {
        label: "First and Last Sentence Structural Rule",
        expression: "Paragraph Thesis = First Sentence + Last Transition Sentence",
        whenToUse: "Rapidly extracting the main argument of each paragraph.",
        example: "The first sentence introduces the subtopic; the final sentence links to the next argument.",
      },
      {
        label: "Inference Boundary Constraint",
        expression: "Valid Inference = Stated Premise + Deductive Step (Zero External Assumptions)",
        whenToUse: "Answering 'It can be inferred from the passage that...' questions.",
        example: "If passage says 'All tested samples were zinc', we infer none were copper.",
      },
      {
        label: "Tone Classification Matrix",
        expression: "Tone = Adjectives used + Balance of arguments + Author's stance",
        whenToUse: "Identifying the author's tone or attitude.",
        example: "Words like 'flawed', 'overstated' indicate a critical tone.",
      },
    ],
    referenceTables: [
      {
        title: "Standard RC Question Types & Strategies",
        headers: ["Question Type", "Stem Phrasing", "Solving Strategy"],
        rows: [
          ["Main Idea", "The primary purpose of the passage is...", "Synthesize paragraph topic sentences; avoid narrow details"],
          ["Direct Detail", "According to paragraph 2...", "Locate specific keyword and read 2 lines before/after"],
          ["Inference", "The passage implies that...", "Must be mathematically/logically inescapable from text"],
          ["Author Tone", "The author's attitude can be described as...", "Inspect qualitative adjectives and concluding remarks"],
          ["Vocabulary in Context", "As used in line 14, the word X most nearly means...", "Substitute each option into the sentence to test fit"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Eliminate Extremes First",
        whenItWorks: "Cross out options with 'always', 'never', 'all', 'only' unless the text uses the exact same extreme words.",
      },
      {
        trick: "Check the Boundary of the Passage",
        whenItWorks: "Never select an option because it is a true scientific fact in real life if the passage itself does not mention or support it.",
      },
      {
        trick: "The 'Broad vs Narrow' Trap Check",
        whenItWorks: "For main idea questions, eliminate options that only summarize a single paragraph or go beyond the author's scope.",
      },
    ],
    commonTraps: [
      {
        mistake: "Choosing an option that is scientifically true but absent from the text.",
        fix: "RC tests reading comprehension of the provided text, NOT outside general knowledge.",
      },
      {
        mistake: "Mistaking a supporting example for the central thesis.",
        fix: "Examples illustrate the thesis; the main idea must encapsulate the entire passage.",
      },
      {
        mistake: "Over-inferring beyond what is strictly stated.",
        fix: "An inference in verbal ability is a direct logical consequence, not a speculative guess.",
      },
    ],
    workedExamples: [
      {
        question: "Passage: 'Technological automation has undeniably accelerated industrial throughput across modern manufacturing. However, when deployed without proactive workforce reskilling, it frequently destabilizes intermediate labour markets by displacing skilled artisans while disproportionately rewarding top-tier technical specialists.' Question: What is the primary purpose of the author?",
        steps: [
          "Examine the passage structure:",
          "Sentence 1 acknowledges the benefit of automation (accelerated throughput).",
          "Sentence 2 introduces the pivot 'However' and highlights the adverse impact (destabilizing intermediate labour when reskilling is absent).",
          "The author balances praise for productivity with a caution about labour market disruption without reskilling.",
          "The primary purpose is to highlight the dual economic impact of automation and emphasize the necessity of workforce reskilling.",
        ],
        answer: "To highlight the mixed economic consequences of automation and the need for workforce reskilling",
        check: () => 1,
      },
      {
        question: "Based on the passage above, what can be logically inferred about skilled artisans?",
        steps: [
          "Text states: 'it frequently destabilizes intermediate labour markets by displacing skilled artisans while disproportionately rewarding top-tier technical specialists.'",
          "Inference: Skilled artisans face displacement when organizations automate without offering reskilling initiatives.",
          "They do not automatically transition to top-tier specialist roles without specific technical preparation.",
        ],
        answer: "They are vulnerable to displacement under automation unless reskilled",
        check: () => 1,
      },
      {
        question: "Passage: 'The architectural integrity of distributed databases relies fundamentally on consensus algorithms. While synchronous consensus guarantees strict serializability, it inevitably introduces network latency overhead during partition events.' Question: What is the main trade-off described?",
        steps: [
          "Identify the contrasting elements connected by 'While'.",
          "Benefit: Strict serializability (consistency).",
          "Cost: Latency overhead during network partitions.",
          "Trade-off: Consistency versus performance/latency.",
        ],
        answer: "Data consistency versus latency during network partitions",
        check: () => 1,
      },
      {
        question: "In the sentence 'The committee found the proposed timeline completely untenable given the supply chain bottlenecks', the word 'untenable' most nearly means:",
        steps: [
          "Context: Supply chain bottlenecks make the proposed timeline difficult or impossible to maintain.",
          "Untenable means incapable of being defended or maintained; unviable or unsustainable.",
          "Substitute 'unsustainable' into the sentence: 'found the proposed timeline completely unsustainable'. Fits perfectly.",
        ],
        answer: "Unsustainable / Unviable",
        check: () => 1,
      },
      {
        question: "Passage: 'Unlike her predecessors who viewed urban density as an ecological liability, Dr. Varma demonstrated that compact metropolitan centers exhibit substantially lower per-capita carbon emissions than suburban developments.' The author's tone toward Dr. Varma's work is:",
        steps: [
          "Author uses positive framing: 'demonstrated that compact metropolitan centers exhibit substantially lower per-capita emissions'.",
          "Contrasts her empirical finding against previous misconceptions ('Unlike her predecessors who viewed... as an ecological liability').",
          "The tone is appreciative, objective, and supportive of her evidence-based conclusion.",
        ],
        answer: "Objective and supportive / Appreciative",
        check: () => 1,
      },
    ],
    oaExamples: [
      {
        question: "Passage states: 'Renewable energy adoption reached record levels in 2023, yet grid storage infrastructure lagged behind demand.' What is the author's primary concern?",
        steps: [
          "Record adoption of renewable energy is positive.",
          "The word 'yet' signals the deficiency: grid storage infrastructure is insufficient to meet demand.",
        ],
        answer: "Insufficient energy storage capacity to support renewable generation",
      },
      {
        question: "Which word would weaken the argument that 'remote work uniformly benefits employee wellbeing'?",
        steps: [
          "Any empirical evidence showing isolated employees experiencing higher burnout or social isolation directly weakens the claim of uniform benefit.",
        ],
        answer: "Evidence showing increased isolation and blurred work-life boundaries",
      },
      {
        question: "If a passage uses phrases like 'dubious assertions' and 'empirically hollow claims', the tone is best described as:",
        steps: [
          "'Dubious' and 'empirically hollow' express direct skepticism and intellectual disdain.",
          "Tone is critical and skeptical.",
        ],
        answer: "Critical / Skeptical",
      },
    ],
    rememberThis: [
      "Always read the question stems before reading long passages.",
      "Stay strictly within the four corners of the text; zero outside knowledge.",
      "Eliminate options with extreme qualifiers (always, never, only).",
      "The first and last sentences of each paragraph almost always contain the core argument.",
    ],
    relatedTopics: ["sentence-correction", "fill-in-blanks", "vocabulary"],
  },

  // 30. Sentence Correction & Error Spotting
  {
    id: "sentence-correction",
    group: "verbal",
    title: "Sentence Correction & Error Spotting",
    summary:
      "Detect and rectify grammatical errors across subject-verb agreement, pronoun-antecedent reference, modifier placement, parallelism, and idiomatic prepositions.",
    context: {
      whyItMatters:
        "Sentence Correction measures formal grammatical precision, clarity of communication, and syntactic rigor.",
      whereItAppears:
        "Heavily tested in TCS NQT, Infosys, Capgemini, Cognizant, GMAT, and Bank PO English papers.",
      prerequisites: ["Parts of Speech", "Tenses", "Subject-Verb Identification"],
      targetTimePerQuestion: "45-75 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Subject-Verb Agreement",
        definition: "A singular subject takes a singular verb; a plural subject takes a plural verb. Intervening prepositional phrases (e.g. 'The box of chocolates is/are') never alter the number of the subject.",
      },
      {
        term: "The 'Neither...Nor' Proximity Rule",
        definition: "When subjects are joined by 'either...or' or 'neither...nor', the verb agrees in number with the subject placed closest to it.",
      },
      {
        term: "Misplaced & Dangling Modifiers",
        definition: "A modifying phrase must be positioned immediately adjacent to the noun it modifies. A dangling modifier occurs when the intended subject is completely omitted.",
      },
      {
        term: "Parallel Structure (Parallelism)",
        definition: "Items in a list or joined by correlative conjunctions ('both...and', 'not only...but also') must appear in identical grammatical form (all gerunds, all infinitives, or all clauses).",
      },
    ],
    formulas: [
      {
        label: "Singular Indefinite Pronouns Rule",
        expression: "Each, Every, Either, Neither, Everyone, Somebody, Nobody => Takes SINGULAR Verb",
        whenToUse: "Sentences starting with or modified by indefinite distributive pronouns.",
        example: "'Each of the participants was awarded a certificate' (NOT were).",
      },
      {
        label: "Proximity Concord Rule",
        expression: "Neither [S1] nor [S2] + Verb => Verb agrees strictly with S2",
        whenToUse: "Compound subjects joined by 'or', 'nor', 'either...or', 'neither...nor'.",
        example: "'Neither the manager nor the engineers were present' vs 'Neither the engineers nor the manager was present'.",
      },
      {
        label: "Correlative Conjunction Parallelism",
        expression: "Not only [Grammatical Form X] but also [Grammatical Form X]",
        whenToUse: "Balancing clauses and phrases linked by correlative pairs.",
        example: "'He not only designed the system but also tested the code' (verb-object pairs).",
      },
      {
        label: "Uncountable Noun Invariant Plurals",
        expression: "Information, Advice, Furniture, Luggage, Equipment, News => ALWAYS Singular (No -s)",
        whenToUse: "Correcting common mass noun errors.",
        example: "'She gave me valuable advice' (NEVER 'advices').",
      },
    ],
    referenceTables: [
      {
        title: "Fixed Preposition Combinations",
        headers: ["Verb / Adjective", "Correct Preposition", "Incorrect Usage"],
        rows: [
          ["Prefer", "to", "prefer X than Y (Wrong)"],
          ["Different", "from", "different than / to (Wrong)"],
          ["Good / Bad", "at", "good in mathematics (Wrong)"],
          ["Congratulate", "on", "congratulate for (Wrong)"],
          ["Accused", "of", "accused with (Wrong)"],
          ["Cope", "with", "cope up with (Wrong)"],
          ["Discuss", "None (Direct object)", "discuss about (Redundant)"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Cross Out Intervening Prepositional Phrases",
        whenItWorks: "In 'The quality [of these apples] is/are good', bracket out '[of these apples]' to immediately match 'quality' with 'is'.",
      },
      {
        trick: "Eliminate Redundancies Instantly",
        whenItWorks: "Spot redundancies: 'return back' (use 'return'), 'repeat again' (use 'repeat'), 'revert back' (use 'revert').",
      },
      {
        trick: "Subjunctive Mood for Unreal Conditions",
        whenItWorks: "In hypothetical or contrary-to-fact 'if' clauses, always use 'were': 'If I were the CEO...' (never 'was').",
      },
    ],
    commonTraps: [
      {
        mistake: "Matching the verb to the nearest noun in prepositional phrases.",
        fix: "In 'One of the students is/are', the subject is 'One', requiring the singular verb 'is'.",
      },
      {
        mistake: "Using 'cope up with'.",
        fix: "The correct English idiom is strictly 'cope with'. 'Cope up with' is a widespread colloquial error.",
      },
      {
        mistake: "Using 'fewer' with uncountable mass quantities.",
        fix: "Use 'fewer' for countable items (fewer errors, fewer bottles); use 'less' for uncountable quantities (less time, less water).",
      },
    ],
    workedExamples: [
      {
        question: "Find the grammatical error: 'Each of the candidates who were shortlisted (A) / are required to bring (B) / their original identity documents (C) / to the interview venue. (D)'",
        steps: [
          "Identify the main subject of the sentence: 'Each of the candidates'.",
          "'Each' is an indefinite distributive pronoun that is strictly singular.",
          "The main verb in Part (B) is 'are required'.",
          "A singular subject ('Each') must take the singular verb 'is required'.",
          "Therefore, the error is in Part (B).",
        ],
        answer: "Part (B) — should be 'is required'",
        check: () => 2,
      },
      {
        question: "Correct the sentence: 'Neither the project lead nor the software developers was able to reproduce the concurrency bug.'",
        steps: [
          "The subjects are joined by 'neither...nor'.",
          "Apply the proximity concord rule: the verb agrees with the subject closest to it.",
          "The closest subject is 'the software developers' (plural).",
          "The singular verb 'was' must be corrected to the plural verb 'were'.",
          "Corrected sentence: 'Neither the project lead nor the software developers were able to reproduce the concurrency bug.'",
        ],
        answer: "Replace 'was' with 'were'",
        check: () => 1,
      },
      {
        question: "Identify the error: 'Walking through the botanical garden, (A) / the colorful exotic flowers (B) / caught the attention (C) / of the botanist. (D)'",
        steps: [
          "Check the introductory participial modifier: 'Walking through the botanical garden'.",
          "The noun immediately following the comma is 'the colorful exotic flowers'.",
          "This illogically implies that the flowers were walking through the garden (Dangling Modifier).",
          "The botanist was doing the walking.",
          "Correction: 'Walking through the botanical garden, the botanist was captivated by the colorful exotic flowers.'",
          "Error is in Part (B) / structure.",
        ],
        answer: "Dangling modifier — flowers were not walking",
        check: () => 2,
      },
      {
        question: "Identify the error: 'He is proficient in python, (A) / good in mathematics, (B) / and prefers backend engineering (C) / than frontend design. (D)'",
        steps: [
          "Look at Part (B): the idiom is 'good at mathematics', not 'good in'.",
          "Look at Part (D): the comparative verb 'prefer' takes the preposition 'to', not 'than'. 'Prefers backend engineering to frontend design'.",
          "Both represent classic fixed preposition errors.",
        ],
        answer: "Preposition errors: 'good at' and 'prefer X to Y'",
        check: () => 4,
      },
      {
        question: "Which sentence is grammatically correct? (A) She gave me many advices. (B) She gave me much advice. (C) She gave me many advice.",
        steps: [
          "'Advice' is an uncountable noun that cannot be pluralized with an -s, nor quantified by 'many'.",
          "Correct quantification uses 'much advice' or 'a piece of advice'.",
          "Sentence (B) is grammatically correct.",
        ],
        answer: "Sentence (B)",
        check: () => 2,
      },
    ],
    oaExamples: [
      {
        question: "Spot the error: 'Hardly had the meeting started than the power supply was interrupted.'",
        steps: [
          "Correlative conjunction pair rule: 'Hardly...when' and 'Scarcely...when'.",
          "'No sooner' pairs with 'than'.",
          "Replace 'than' with 'when'.",
        ],
        answer: "Replace 'than' with 'when'",
      },
      {
        question: "Correct the sentence: 'The team was discussing about the architectural changes.'",
        steps: [
          "'Discuss' is a transitive verb that takes a direct object without 'about'.",
          "Remove 'about': 'The team was discussing the architectural changes.'",
        ],
        answer: "Remove 'about'",
      },
      {
        question: "Identify the correct form: 'One of my friends (has/have) relocated to Seattle.'",
        steps: [
          "Subject is 'One' (singular).",
          "Takes singular verb 'has'.",
        ],
        answer: "has",
      },
    ],
    rememberThis: [
      "Intervening phrases ('of the students', 'along with his friends') do not change the subject's number.",
      "With 'neither...nor', the verb agrees with the subject closest to it.",
      "Fixed idioms: 'prefer X to Y' (never than), 'good at' (never in), 'cope with' (never cope up with).",
      "Uncountable nouns (advice, furniture, information, equipment) never take -s.",
    ],
    relatedTopics: ["fill-in-blanks", "reading-comprehension", "para-jumbles"],
  },

  // 31. Fill in the Blanks
  {
    id: "fill-in-blanks",
    group: "verbal",
    title: "Fill in the Blanks",
    summary:
      "Select words and contextual collocations that preserve syntactic harmony, tonal consistency, and logical transitions in single and double-blank sentences.",
    context: {
      whyItMatters:
        "Fill in the Blanks tests vocabulary depth, semantic precision, and structural reading comprehension simultaneously.",
      whereItAppears:
        "Ubiquitous in TCS, Infosys, Capgemini, Cognizant, GRE Verbal, and Banking exams.",
      prerequisites: ["Vocabulary", "Sentence Correction", "Discourse Markers"],
      targetTimePerQuestion: "45-75 s",
      difficultyLevel: "Easy",
    },
    keyConcepts: [
      {
        term: "Discourse Markers / Transitional Clues",
        definition: "Signals that indicate the relationship between clauses: Contrast (however, although, whereas, despite), Cause-and-Effect (because, therefore, thus, consequently), or Continuation (furthermore, moreover, similarly).",
      },
      {
        term: "Tone & Connotation Matching",
        definition: "Determine whether the missing word must carry a positive (+), negative (-), or neutral (0) valence based on the surrounding sentiment of the sentence.",
      },
      {
        term: "Natural Collocations",
        definition: "Predictable, conventional pairings of words in natural English (e.g., 'make an error', 'pay attention', 'heavy rain', 'mitigate risk', 'stark contrast').",
      },
      {
        term: "The Double-Blank Elimination Strategy",
        definition: "Evaluate the blank that is easier or has the most restrictive grammatical constraint first to eliminate 50-75% of options immediately.",
      },
    ],
    formulas: [
      {
        label: "Transition Directionality Equation",
        expression: "Contrast Marker => Blank is Opposite to Clue; Continuation Marker => Blank Matches Clue",
        whenToUse: "Determining semantic direction of the missing word.",
        example: "'Although he was usually [parsimonious], today he was [generous]'.",
      },
      {
        label: "Grammatical Part-of-Speech Filter",
        expression: "Identify needed form: Noun, Verb, Adjective, or Adverb before reading options",
        whenToUse: "Eliminating grammatically impossible choices.",
        example: "Preceded by 'a very [blank] candidate' requires an adjective.",
      },
      {
        label: "Double Blank Independent Matrix",
        expression: "Eliminate option if EITHER Blank 1 OR Blank 2 fails",
        whenToUse: "Efficiently filtering multi-blank choices.",
        example: "If Blank 1 doesn't fit, don't waste time checking Blank 2.",
      },
      {
        label: "Cause-and-Effect Alignment",
        expression: "Cause (+/-) leads to Result (+/-)",
        whenToUse: "Sentences with 'because', 'since', 'as a result of'.",
        example: "Because of severe drought (negative cause), harvest was meager (negative result).",
      },
    ],
    referenceTables: [
      {
        title: "Discourse Connectors Classification",
        headers: ["Category", "Connectors", "Logical Impact"],
        rows: [
          ["Contrast", "Although, but, however, despite, yet, whereas", "Flips polarity between clauses (+ to - or - to +)"],
          ["Cause & Effect", "Because, since, thus, therefore, consequently", "Maintains causal alignment (Cause -> Effect)"],
          ["Addition", "Moreover, furthermore, in addition, besides", "Reinforces the existing sentiment"],
          ["Condition", "Unless, provided that, if, lest", "Introduces contingency constraint"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Predict Before Looking at the Options",
        whenItWorks: "Formulate your own simple word for the blank before reading the choices to avoid being seduced by clever distractor words.",
      },
      {
        trick: "Eliminate by Part of Speech",
        whenItWorks: "If the blank requires an adjective, immediately cross out any nouns or adverbs among the options.",
      },
      {
        trick: "Polarity (+ / -) Labeling",
        whenItWorks: "Label the target blank with a (+) or (-) sign based on contextual clues, then reject options with mismatched sentiment.",
      },
    ],
    commonTraps: [
      {
        mistake: "Selecting a word that fits Blank 1 perfectly while ignoring a fatal mismatch in Blank 2.",
        fix: "Both words in a double blank must satisfy meaning, grammar, and tone simultaneously.",
      },
      {
        mistake: "Overlooking subtle negative words ('hardly', 'scarcely', 'seldom', 'rarely').",
        fix: "Negations reverse the polarity of the entire clause; pay sharp attention to negative adverbs.",
      },
      {
        mistake: "Choosing words that sound elevated but create an unnatural collocation.",
        fix: "Prioritize standard English idiom and conventional collocations over obscure synonyms.",
      },
    ],
    workedExamples: [
      {
        question: "Fill in the blank: 'Despite the CEO's _______ presentation, the board members remained _______ about the proposed acquisition.' (A) eloquent ... skeptical (B) lackluster ... enthusiastic (C) brief ... convinced (D) hurried ... satisfied",
        steps: [
          "The sentence starts with the contrast marker 'Despite'.",
          "This requires the CEO's presentation quality to contrast with the board's reaction.",
          "Option (A): 'eloquent' (positive presentation) contrasts with 'skeptical' (doubtful board). Fits the 'Despite' contrast perfectly.",
          "Option (B): 'lackluster' and 'enthusiastic' also contrast, but board members rarely become enthusiastic because of a lackluster presentation.",
          "Option (A) provides the most coherent, logical, and idiomatically sound pair.",
        ],
        answer: "eloquent ... skeptical (Option A)",
        check: () => 1,
      },
      {
        question: "Fill in the blank: 'Because the evidence presented by the prosecution was entirely _______, the judge dismissed the indictment.' (A) circumstantial (B) compelling (C) incontrovertible (D) decisive",
        steps: [
          "Sentence has cause-and-effect marker 'Because'.",
          "Result: Judge dismissed the indictment (negative outcome for prosecution).",
          "Therefore, the evidence must have been weak, speculative, or inadequate.",
          "'Compelling', 'incontrovertible', and 'decisive' all mean strong and conclusive evidence (would lead to conviction).",
          "'Circumstantial' denotes indirect evidence lacking direct proof.",
          "The correct word is 'circumstantial'.",
        ],
        answer: "circumstantial (Option A)",
        check: () => 1,
      },
      {
        question: "Fill in the blank: 'The new climate policy aims to _______ industrial greenhouse emissions without _______ economic growth.' (A) curb ... curtailing (B) expand ... hindering (C) foster ... limiting (D) eradicate ... promoting",
        steps: [
          "First blank: what do you do to greenhouse emissions? We want to reduce or limit them ('curb' or 'eradicate').",
          "Second blank: what do we want to avoid doing to economic growth? Avoid slowing or damaging it ('curtailing' or 'hindering').",
          "Option (A) 'curb ... curtailing' fits both slots with exact semantic harmony.",
        ],
        answer: "curb ... curtailing (Option A)",
        check: () => 1,
      },
      {
        question: "Fill in the blank: 'His colleagues found him difficult to work with because of his _______ demeanor and reluctance to compromise.' (A) affable (B) intractable (C) docile (D) benevolent",
        steps: [
          "Clue: 'difficult to work with' and 'reluctance to compromise'.",
          "The missing adjective must mean stubborn, unyielding, or inflexible.",
          "'Affable' = friendly; 'Docile' = compliant; 'Benevolent' = kind.",
          "'Intractable' = stubborn, hard to manage, unyielding.",
          "The correct word is 'intractable'.",
        ],
        answer: "intractable (Option B)",
        check: () => 2,
      },
      {
        question: "Fill in the blank: 'The archaeologist handled the ancient fragile parchment with extreme _______.' (A) disdain (B) reverence (C) negligence (D) apathy",
        steps: [
          "Clue: 'ancient fragile parchment'.",
          "One handles fragile historical treasures with great care and respect.",
          "'Disdain' = contempt; 'Negligence' = carelessness; 'Apathy' = lack of interest.",
          "'Reverence' = deep respect and veneration.",
          "The best word is 'reverence'.",
        ],
        answer: "reverence (Option B)",
        check: () => 2,
      },
    ],
    oaExamples: [
      {
        question: "Complete the sentence: 'The startup received substantial funding _______ its unproven business model.'",
        steps: [
          "Funding received (positive) vs unproven model (negative).",
          "Requires a contrast preposition: 'despite' or 'in spite of'.",
        ],
        answer: "despite (or in spite of)",
      },
      {
        question: "Fill in: 'The committee was _______ in its decision, voting unanimously to adopt the proposal.'",
        steps: [
          "Clue: 'voting unanimously'.",
          "The appropriate adjective is 'resolute' or 'united'.",
        ],
        answer: "united (or unanimous)",
      },
      {
        question: "Fill in the blank: 'He was so _______ that he believed every tall tale told by his peers.'",
        steps: [
          "Someone who easily believes anything is 'credulous' or 'gullible'.",
        ],
        answer: "credulous (or gullible)",
      },
    ],
    rememberThis: [
      "Contrast markers (despite, although, however) flip the polarity of the blank.",
      "Cause-and-effect markers (because, therefore) maintain identical polarity.",
      "Predict your own word for the blank before reading multiple-choice distractors.",
      "In double blanks, eliminate options where either blank fails.",
    ],
    relatedTopics: ["vocabulary", "sentence-correction", "reading-comprehension"],
  },

  // 32. Para Jumbles
  {
    id: "para-jumbles",
    group: "verbal",
    title: "Para Jumbles",
    summary:
      "Reconstruct coherent paragraph sequences from scrambled sentences by isolating independent opening anchors, mandatory transitional pairs, and summarizing closers.",
    context: {
      whyItMatters:
        "Para Jumbles assess logical structuring, discourse coherence, and identification of referential antecedents.",
      whereItAppears:
        "High-weight question type in CAT (VARC), TCS NQT, Infosys, Capgemini, and Bank PO English.",
      prerequisites: ["Pronoun-Antecedent Agreement", "Transition Words"],
      targetTimePerQuestion: "45-75 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Independent Opening Sentence (Anchor)",
        definition: "The topic sentence that introduces a new subject or concept without depending on prior context. It never begins with dependent pronouns ('he', 'she', 'they', 'this', 'these') or contrast connectors ('however', 'therefore', 'furthermore').",
      },
      {
        term: "Mandatory Pairs",
        definition: "Two sentences that MUST appear consecutively due to: (1) Full noun followed by pronoun antecedent, (2) Chronological sequence, (3) Question followed by answer, or (4) Cause followed by effect.",
      },
      {
        term: "Acronym & Full Name Precedence",
        definition: "The sentence introducing the full formal name (e.g. 'World Health Organization') must always precede the sentence using the abbreviation or acronym ('WHO').",
      },
      {
        term: "Concluding / Summarizing Sentence",
        definition: "The final sentence typically provides a broader synthesis, summary, or future outlook, frequently signaled by 'thus', 'therefore', 'in summary', or 'ultimately'.",
      },
    ],
    formulas: [
      {
        label: "Sentence Ordering Algorithm",
        expression: "1. Identify Independent Opener -> 2. Establish Mandatory Pair -> 3. Match with Options -> 4. Read Full Sequence to Verify",
        whenToUse: "Standard methodology to solve para jumbles under 60 seconds.",
        example: "If BD is a mandatory pair and only Option (C) contains BD, select (C) and verify.",
      },
      {
        label: "Noun-to-Pronoun Progression",
        expression: "Sentence with Proper Noun -> Sentence with Pronoun (He / She / It / They)",
        whenToUse: "Binding pairs of sentences.",
        example: "'Dr. Raman discovered...' precedes 'He then published...'.",
      },
      {
        label: "General to Specific Hierarchy",
        expression: "Broad Conceptual Framework -> Specific Empirical Example / Case Study",
        whenToUse: "Arranging paragraphs that discuss theory and evidence.",
        example: "General statement on renewable energy precedes specific statistics about solar panel efficiency.",
      },
      {
        label: "Chronological Time Markers",
        expression: "Past (Initially / Historically) -> Present (Currently / Today) -> Future (In future)",
        whenToUse: "Historical narrative or evolutionary paragraphs.",
        example: "'In 1990...' precedes 'A decade later...' which precedes 'Today...'.",
      },
    ],
    referenceTables: [
      {
        title: "Para Jumble Clue Typology",
        headers: ["Clue Type", "Signaling Indicators", "Ordering Deduction"],
        rows: [
          ["Pronoun Antecedent", "He, she, they, this, these, that", "Must immediately follow the sentence defining the noun"],
          ["Acronym Order", "Full Name vs Acronym", "Full Name sentence precedes Acronym sentence"],
          ["Conclusive Marker", "Thus, therefore, consequently, in conclusion", "Positioned at the end of the argument"],
          ["Definite Article", "The + Noun (vs 'A/An' + Noun)", "'A problem arose' precedes 'The problem was resolved'"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Eliminate Openers with Pronouns or Connectors",
        whenItWorks: "Sentences starting with 'However', 'Therefore', 'This phenomenon', or 'They' can almost never be the opening sentence.",
      },
      {
        trick: "Search for a Single Mandatory Pair",
        whenItWorks: "Identify two sentences that are inseparable (e.g. A followed by C). Inspect options: if only one option has 'AC', that is your answer.",
      },
      {
        trick: "The 'A/An' before 'The' Rule",
        whenItWorks: "A concept introduced with 'a' or 'an' ('a novel theory') must precede the sentence referring to it with 'the' ('the theory').",
      },
    ],
    commonTraps: [
      {
        mistake: "Testing all permutations (e.g. trying ABCD, then ACBD, then BACD).",
        fix: "Never brute-force permutations. Find the opening sentence or a mandatory pair first, then use options to eliminate.",
      },
      {
        mistake: "Selecting an opener that assumes context from another sentence.",
        fix: "The opening sentence must stand completely alone as an independent conceptual introduction.",
      },
      {
        mistake: "Failing to read the final sequence in order before submitting.",
        fix: "Always read the chosen sequence from start to finish once to verify smooth logical and grammatical transition.",
      },
    ],
    workedExamples: [
      {
        question: "Arrange sentences A, B, C, D in logical sequence: (A) However, rapid urban migration has strained this infrastructure. (B) Megacities were originally designed with centralised water systems. (C) Consequently, municipal authorities are now turning to decentralized rainwater harvesting. (D) These traditional systems were capable of serving modest populations.",
        steps: [
          "Check openers: (A) starts with 'However' (contrast - not opener); (C) starts with 'Consequently' (conclusion - not opener); (D) starts with 'These traditional systems' (dependent pronoun - not opener).",
          "Sentence (B) introduces the core subject: 'Megacities were originally designed with centralised water systems.' B is the independent opener.",
          "Find mandatory pair: Sentence (B) talks about centralised systems; Sentence (D) refers to them: 'These traditional systems were capable of serving modest populations.' So (B-D) is a mandatory pair.",
          "Sentence (A) introduces the problem with 'However': urban migration strained this infrastructure.",
          "Sentence (C) provides the consequence: 'Consequently, municipal authorities are now turning to...' (C is the conclusion).",
          "The complete logical sequence is B -> D -> A -> C.",
        ],
        answer: "BDAC",
        check: () => 1,
      },
      {
        question: "Arrange in logical order: (A) This computational overhead makes real-time processing difficult. (B) Deep neural networks have achieved remarkable accuracy in computer vision. (C) To mitigate this latency, researchers have developed model quantization techniques. (D) However, their multi-billion parameter architectures demand immense memory.",
        steps: [
          "Opener: Sentence (B) is the general introduction ('Deep neural networks have achieved...').",
          "Next: Sentence (D) introduces the drawback ('However, their multi-billion parameter architectures demand immense memory').",
          "Next: Sentence (A) elaborates on that drawback ('This computational overhead makes real-time processing difficult').",
          "Finally: Sentence (C) offers the solution ('To mitigate this latency, researchers have developed model quantization...').",
          "Logical sequence: B -> D -> A -> C.",
        ],
        answer: "BDAC",
        check: () => 1,
      },
      {
        question: "Reorder: (A) He proposed the theory of general relativity in 1915. (B) Albert Einstein was one of the most influential physicists of the twentieth century. (C) This revolutionary work fundamentally altered our understanding of gravity and spacetime. (D) It supplanted Newton's centuries-old gravitational framework.",
        steps: [
          "Opener: (B) introduces Albert Einstein by full name.",
          "Mandatory pair: (A) follows (B) as it introduces the theory in 1915 ('He proposed...').",
          "Sentence (C) refers to 'This revolutionary work', modifying general relativity.",
          "Sentence (D) concludes with its historic impact: 'It supplanted Newton's...'.",
          "Sequence: B -> A -> C -> D.",
        ],
        answer: "BACD",
        check: () => 1,
      },
      {
        question: "Order the sentences: (A) In contrast, renewable sources produce zero operational emissions. (B) Global electricity generation is transitioning away from fossil fuels. (C) Coal and gas facilities have historically dominated power generation grids. (D) Their combustion releases billions of tons of carbon dioxide annually.",
        steps: [
          "Opener: (B) sets the broad global context of electricity transition.",
          "Sentence (C) explains the historical dominance of coal and gas.",
          "Sentence (D) details 'Their combustion...' (referring to coal and gas in C). So (C-D) is a pair.",
          "Sentence (A) contrasts this with renewable sources ('In contrast, renewable sources produce zero...').",
          "Sequence: B -> C -> D -> A.",
        ],
        answer: "BCDA",
        check: () => 1,
      },
      {
        question: "Reconstruct the sequence: (A) Such errors can compromise critical aerospace navigation. (B) Floating-point arithmetic is prone to minute rounding discrepancies. (C) For this reason, mission-critical systems implement redundant fault-tolerant architectures. (D) Over millions of iterative cycles, these micro-discrepancies accumulate significantly.",
        steps: [
          "Opener: (B) introduces the technical concept: 'Floating-point arithmetic is prone to minute rounding discrepancies.'",
          "Mandatory pair: (D) links to discrepancies ('these micro-discrepancies accumulate significantly').",
          "Sentence (A) shows the consequence ('Such errors can compromise critical aerospace navigation').",
          "Sentence (C) provides the systemic safeguard ('For this reason, mission-critical systems implement...').",
          "Sequence: B -> D -> A -> C.",
        ],
        answer: "BDAC",
        check: () => 1,
      },
    ],
    oaExamples: [
      {
        question: "Find the opening sentence among: (A) They migrated across the Bering Strait. (B) Early human populations expanded eastward. (C) This journey took thousands of years. (D) Eventually, they settled in the Americas.",
        steps: [
          "(A) starts with 'They'; (C) starts with 'This journey'; (D) starts with 'Eventually, they'.",
          "Sentence (B) is the only independent noun opener.",
        ],
        answer: "Sentence (B)",
      },
      {
        question: "Identify the mandatory pair: (A) The company launched its flagship smartphone. (B) It featured a proprietary neural processor. (C) Consumers queued for hours outside stores.",
        steps: [
          "The smartphone in (A) is described in (B) ('It featured...').",
          "AB is a mandatory pair.",
        ],
        answer: "Pair (A-B)",
      },
      {
        question: "What role does a sentence starting with 'Consequently, the initiative was terminated' play in a paragraph?",
        steps: [
          "'Consequently' signals a direct causal outcome and resolution.",
          "It serves as the concluding sentence.",
        ],
        answer: "Concluding sentence",
      },
    ],
    rememberThis: [
      "The opening sentence is independent: no pronouns (he, they, this) or contrast connectors (however, therefore).",
      "Full names always precede acronyms (e.g. World Health Organization before WHO).",
      "Find one mandatory pair (e.g. BD) to eliminate 75% of multiple-choice options immediately.",
      "Always read your selected sequence through once to verify natural logical flow.",
    ],
    relatedTopics: ["reading-comprehension", "sentence-correction", "fill-in-blanks"],
  },

  // 33. Vocabulary
  {
    id: "vocabulary",
    group: "verbal",
    title: "Vocabulary",
    summary:
      "Master high-frequency roots, prefixes, one-word substitutions, idiomatic phrases, and commonly confused homophones and paronyms.",
    context: {
      whyItMatters:
        "A robust vocabulary enhances reading comprehension speed, verbal precision, and performance across synonyms, antonyms, and analogy tests.",
      whereItAppears:
        "Tested in TCS NQT, Infosys, Capgemini, GRE, CAT, and Banking exams.",
      prerequisites: ["Etymology Basics", "Context Clues"],
      targetTimePerQuestion: "45-75 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Etymology & Morphological Roots",
        definition: "Deciphering unfamiliar words by breaking them into their constituent Latin and Greek morphemes: Prefix (direction/attitude) + Root (core meaning) + Suffix (part of speech).",
      },
      {
        term: "One-Word Substitutions",
        definition: "Replacing descriptive multi-word phrases with precise single technical or literary terms (e.g., 'one who loves books' = bibliophile).",
      },
      {
        term: "Idiomatic Expressions",
        definition: "Phrases whose figurative meaning cannot be deduced purely from the literal definition of their individual words (e.g., 'bite the bullet' = endure a difficult situation bravely).",
      },
      {
        term: "Commonly Confused Words (Homophones & Paronyms)",
        definition: "Words with identical or similar pronunciation but distinct spellings and meanings (e.g., affect vs effect, principal vs principle, compliment vs complement).",
      },
    ],
    formulas: [
      {
        label: "Etymological Decomposition",
        expression: "Meaning = Prefix + Root + Suffix",
        whenToUse: "Decoding obscure or unfamiliar words in exams.",
        example: "Bene (good) + dict (say) + ion (noun) = Benediction (a blessing).",
      },
      {
        label: "Synonym Valence Matching",
        expression: "Target Word Valence (+/-) = Correct Synonym Valence (+/-)",
        whenToUse: "Eliminating incorrect synonym options.",
        example: "If target word is 'nefarious' (-), eliminate positive words like 'laudable' (+).",
      },
      {
        label: "Affect vs Effect Usage Rule",
        expression: "Affect = Verb (to influence); Effect = Noun (the result/consequence)",
        whenToUse: "Choosing between affect and effect in sentences.",
        example: "'The outage affected our servers; the effect was severe downtime.'",
      },
      {
        label: "Principal vs Principle Usage Rule",
        expression: "Principal = School head / Main capital; Principle = Core fundamental truth / moral rule",
        whenToUse: "Distinguishing between homophones ending in -pal and -ple.",
        example: "'The principal invested the principal amount on strict principles.'",
      },
    ],
    referenceTables: [
      {
        title: "High-Yield One-Word Substitutions",
        headers: ["Phrase / Definition", "One-Word Substitution"],
        rows: [
          ["One who loves mankind and works for their welfare", "Philanthropist"],
          ["One who hates or distrusts mankind", "Misanthrope"],
          ["One who knows or speaks many languages", "Polyglot"],
          ["Able to use both hands with equal dexterity", "Ambidextrous"],
          ["Possessing infinite and unlimited power", "Omnipotent"],
          ["Knowing everything; all-knowing", "Omniscient"],
          ["Present everywhere at the same time", "Omnipresent"],
          ["One who travels on foot along roads", "Pedestrian"],
          ["One who does not believe in the existence of God", "Atheist"],
          ["A self-centered person who talks constantly of himself", "Egoist"],
          ["One who hates women", "Misogynist"],
          ["A lover and collector of books", "Bibliophile"],
        ],
      },
      {
        title: "Essential Idiomatic Expressions",
        headers: ["Idiom", "Exact Meaning"],
        rows: [
          ["A blessing in disguise", "A misfortune that unexpectedly yields positive outcomes"],
          ["Break the ice", "Initiate conversation in an awkward or quiet social setting"],
          ["Burn the midnight oil", "Work or study late into the night"],
          ["Once in a blue moon", "Very rarely; almost never"],
          ["Cost an arm and a leg", "Extremely expensive"],
          ["Hit the nail on the head", "Be precisely and accurately correct"],
          ["Bite the bullet", "Endure a difficult, painful, or unavoidable situation bravely"],
          ["Spill the beans", "Divulge a secret prematurely or indiscreetly"],
          ["Under the weather", "Feeling slightly unwell or indisposed"],
          ["Piece of cake", "An exceedingly simple task"],
          ["Call it a day", "Conclude working on an activity for the day"],
        ],
      },
      {
        title: "Commonly Confused Words Matrix",
        headers: ["Pair", "Word 1 Meaning", "Word 2 Meaning"],
        rows: [
          ["affect / effect", "Verb: to influence", "Noun: the result or outcome"],
          ["principal / principle", "Head of school / Main capital", "Fundamental moral truth or rule"],
          ["stationary / stationery", "Not moving; fixed in place", "Writing materials (paper, pens)"],
          ["complement / compliment", "Something that completes", "Praise or admiration"],
          ["council / counsel", "An assembly / governing body", "Advice or legal guidance"],
          ["adapt / adopt", "To adjust to new conditions", "To legally take as one's own"],
          ["accept / except", "To receive willingly", "Excluding; with the omission of"],
          ["emigrate / immigrate", "To leave one's home country", "To enter and settle in a new country"],
          ["lose / loose", "Verb: to be deprived of", "Adjective: not tight or firmly fixed"],
          ["than / then", "Used in comparisons", "Denoting time or sequence"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Root Keyword Anchors",
        whenItWorks: "Learn roots: 'bene' = good (benefit), 'mal' = bad (malfunction), 'dict' = say (predict), 'chron' = time (chronology), 'path' = feeling (sympathy).",
      },
      {
        trick: "StationEry has an 'E' for Envelopes",
        whenItWorks: "Differentiate stationery (writing paper/envelopes) from stationary (standing still with 'A').",
      },
      {
        trick: "Valence Elimination for Antonyms",
        whenItWorks: "The antonym of a negative word must be positive. If asked for antonym of 'abhor' (-), eliminate all negative choices immediately.",
      },
    ],
    commonTraps: [
      {
        mistake: "Selecting a word that sounds similar but has an unrelated meaning (e.g. discreet vs discrete).",
        fix: "'Discreet' means prudent/cautious; 'discrete' means separate and distinct.",
      },
      {
        mistake: "Confusing literal meanings with idiomatic expressions.",
        fix: "'Kick the bucket' is an idiom meaning to die, not literally kicking a pail.",
      },
      {
        mistake: "Using 'affect' as a noun for 'result'.",
        fix: "'The effect of the policy' is correct. Use 'effect' as a noun.",
      },
    ],
    workedExamples: [
      {
        question: "Select the synonym of 'EPHEMERAL': (A) Eternal (B) Transient (C) Robust (D) Pervasive",
        steps: [
          "Etymology: 'Ephemeral' comes from Greek 'ephemeros' (lasting only a day).",
          "Meaning: Lasting for a very short time; fleeting.",
          "Option (A) 'Eternal' is an antonym.",
          "Option (B) 'Transient' means lasting only for a short time; impermanent. Exact synonym.",
          "Option (C) 'Robust' means strong; Option (D) 'Pervasive' means widespread.",
          "The correct synonym is 'Transient'.",
        ],
        answer: "Transient (Option B)",
        check: () => 2,
      },
      {
        question: "Select the antonym of 'METICULOUS': (A) Scrupulous (B) Careless (C) Fastidious (D) Methodical",
        steps: [
          "'Meticulous' means showing great attention to detail; very careful and precise (+).",
          "Its antonym must mean careless, negligent, or sloppy (-).",
          "'Scrupulous', 'Fastidious', and 'Methodical' are all synonyms of meticulous.",
          "'Careless' is the exact opposite.",
        ],
        answer: "Careless (Option B)",
        check: () => 2,
      },
      {
        question: "What is the meaning of the idiom 'to throw in the towel'?",
        steps: [
          "Originating from boxing, when a corner throws a towel into the ring, it signals surrender.",
          "Meaning: To admit defeat or give up on an endeavor.",
        ],
        answer: "To admit defeat / surrender",
        check: () => 1,
      },
      {
        question: "Choose the correct word: 'The new regulations will not (affect/effect) our division, but their overall (affect/effect) on the firm is substantial.'",
        steps: [
          "Slot 1 follows modal verb 'will not', requiring a verb => 'affect'.",
          "Slot 2 is preceded by possessive adjective 'their overall', requiring a noun => 'effect'.",
          "Correct pair: affect ... effect.",
        ],
        answer: "affect ... effect",
        check: () => 1,
      },
      {
        question: "Give the one-word substitution for: 'A person who can use both hands with equal skill.'",
        steps: [
          "Prefix 'ambi' = both; root 'dexter' = right-handed / skillful.",
          "Term is 'Ambidextrous'.",
        ],
        answer: "Ambidextrous",
        check: () => 1,
      },
    ],
    oaExamples: [
      {
        question: "What does the Latin root 'bene' mean, as in 'benefactor' and 'benevolent'?",
        steps: [
          "Latin 'bene' means 'good' or 'well'.",
        ],
        answer: "Good / Well",
      },
      {
        question: "Select the pair that exhibits the same relationship: 'CANDLE : WAX' (A) Tire : Rubber (B) Wood : Table (C) Glass : Mirror (D) Metal : Furnace",
        steps: [
          "A candle is made entirely of wax (Object : Raw material).",
          "A tire is made of rubber (Object : Raw material).",
        ],
        answer: "Tire : Rubber (Option A)",
      },
      {
        question: "What does the idiom 'bite the bullet' mean?",
        steps: [
          "To face a grim or painful situation with fortitude.",
        ],
        answer: "To endure a grim situation with courage",
      },
    ],
    rememberThis: [
      "Root words unlock dozens of vocabulary meanings: 'bene' (good), 'mal' (bad), 'poly' (many).",
      "Affect is a Verb (to influence); Effect is a Noun (the result).",
      "StationEry with an 'e' = envelopes/paper; StationAry with an 'a' = at rest.",
      "In antonym questions, flip the valence (+/-) of the target word to eliminate distractors.",
    ],
    relatedTopics: ["reading-comprehension", "fill-in-blanks", "sentence-correction"],
  },
];
