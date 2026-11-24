// src/data/aptitude/interview.ts
// Comprehensive Aptitude Data: Interview Preparation (Topics 34 to 37)

import type { AptitudeTopicData } from "./types";

export const interviewTopics: AptitudeTopicData[] = [
  // 34. Self-Introduction & HR Basics
  {
    id: "hr-basics",
    group: "interview",
    title: "Self-Introduction & HR Basics",
    summary:
      "Master behavioural interview frameworks, structured self-introductions, the STAR methodology, and professional workplace etiquette.",
    context: {
      whyItMatters:
        "The HR and managerial round assesses cultural alignment, authenticity, communication clarity, problem-solving maturity, and collaborative temperament.",
      whereItAppears:
        "Standard final round in campus recruitments (TCS, Infosys, Cognizant, Wipro, Amazon, Microsoft) and corporate hiring drives.",
      prerequisites: ["Self-Reflection", "Project Understanding", "Basic Etiquette"],
      targetTimePerQuestion: "Not timed (60-90 s response)",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "The Present-Past-Future Self-Introduction",
        definition: "A concise 60-90 second narrative: Present (Name, current degree, institution, primary technical stack), Past (Key project or internship achievement with a concrete outcome), Future (Target role, alignment with company domain, and eagerness to contribute).",
      },
      {
        term: "The STAR Behavioral Framework",
        definition: "Structure every situational response as: Situation (Context/problem background), Task (Your specific mandate), Action (Concrete steps you initiated and technologies used), Result (Quantifiable outcome, lessons learned, and metrics).",
      },
      {
        term: "Authentic Strengths and Mitigated Weaknesses",
        definition: "Strengths must be backed by tangible evidence (e.g., 'consistency, as demonstrated by maintaining a daily streak or open-source commits'). Weaknesses must be genuine, non-critical, and accompanied by active remedial steps currently being taken.",
      },
      {
        term: "Corporate & Virtual Interview Etiquette",
        definition: "Maintaining steady eye contact (looking at the webcam), structured active listening without interrupting, professional attire, clean audio setup, and asking insightful questions at the end.",
      },
    ],
    formulas: [
      {
        label: "60-90 Second Pitch Framework",
        expression: "Present (20s: Who you are & stack) + Past (40s: Standout project & metric) + Future (20s: Why this role/team)",
        whenToUse: "Answering 'Tell me about yourself' or 'Walk me through your resume'.",
        example: "'I am a CS senior specializing in React and Node. Recently, I built a collaborative tool that halved data latency. I'm excited about your cloud team.'",
      },
      {
        label: "STAR Behavioral Response Formula",
        expression: "Situation (15%) + Task (15%) + Action (50%) + Result (20%)",
        whenToUse: "Answering behavioral questions: 'Tell me about a time you resolved a team conflict / failed at a task'.",
        example: "Focus 50% of your time on the concrete Actions YOU personally took.",
      },
      {
        label: "The 'Why Our Company?' Formula",
        expression: "Company Value / Product Innovation + Personal Technical Interest + Shared Impact Vision",
        whenToUse: "Answering 'Why do you want to join our company?'.",
        example: "Citing their distributed database engine or recent open-source contribution and linking it to your skills.",
      },
      {
        label: "Salary & Relocation Transparency Rule",
        expression: "Acknowledge Company Standard Band + Reiterate Growth Focus + Flexible Geographic Readiness",
        whenToUse: "Addressing compensation and relocation preferences.",
        example: "'I am guided by company standard bands for freshers and am fully open to relocating.'",
      },
    ],
    referenceTables: [
      {
        title: "Behavioral Interview Questions & Core Evaluative Competencies",
        headers: ["Question Type", "Interviewer Evaluates", "Optimal Approach"],
        rows: [
          ["Tell me about yourself", "Communication clarity, confidence, relevance", "Present-Past-Future framework within 90 seconds"],
          ["Greatest strength", "Self-awareness, applicability to role", "Pick a core skill and illustrate with an actual project story"],
          ["Greatest weakness", "Honesty, growth mindset, remediation", "Pick a real non-fatal flaw and detail active steps to improve"],
          ["Why should we hire you?", "Value proposition, team fit, work ethic", "Highlight unique intersection of technical rigor and team adaptability"],
          ["Where do you see yourself in 5 years?", "Ambition, stability, career planning", "Focus on technical mastery, mentorship, and increasing ownership"],
          ["Do you have any questions for us?", "Curiosity, genuine interest, research", "Ask about engineering culture, deployment cycles, or tech stack evolution"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "The 'Action' Heavy STAR Balance",
        whenItWorks: "Keep Situation and Task brief (30 seconds total); spend the bulk of your answer detailing the exact technical and interpersonal Actions YOU executed.",
      },
      {
        trick: "Prepare Three Versatile Master Stories",
        whenItWorks: "Have 3 real project stories prepared: (1) Technical triumph, (2) Debugging/failure turnaround, (3) Team disagreement resolved through data.",
      },
      {
        trick: "Reverse Questioning at Turn Conclusion",
        whenItWorks: "Always have 2 thoughtful questions ready for the panel (e.g. 'What does success look like for a new engineer in their first 90 days?').",
      },
    ],
    commonTraps: [
      {
        mistake: "Reciting your entire resume line-by-line during self-introduction.",
        fix: "The interviewer already has your resume. Provide a high-level narrative connecting your key technical passions and proudest milestones.",
      },
      {
        mistake: "Claiming fake cliché weaknesses like 'I am too perfectionist' or 'I work too hard'.",
        fix: "Interviewers immediately detect this. Choose an authentic skill (e.g., public speaking, delegating tasks) and explain your ongoing improvement plan.",
      },
      {
        mistake: "Criticizing your college, professors, or former project team members.",
        fix: "Always maintain professional grace. Reframe challenges as constructive learning opportunities.",
      },
    ],
    workedExamples: [
      {
        question: "Model Response: 'Tell me about yourself.'",
        steps: [
          "Present: 'Hello, I'm Bhargav, currently completing my degree in Computer Science at NIAT. My core technical focus lies in scalable full-stack web applications using React, TypeScript, and backend architectures.'",
          "Past: 'Over the past year, I developed CodeCrex, a platform optimizing quantitative and technical preparation. I architected the state management system and automated data validation pipelines that cut test failures by 40%.'",
          "Future: 'I've followed your engineering team's recent migration to distributed microservices. I am eager to apply my strong foundations in data structures and frontend architecture to build performant, resilient software here.'",
        ],
        answer: "Concise 75-second structured pitch highlighting identity, project impact, and specific company alignment.",
      },
      {
        question: "Model Response using STAR: 'Tell me about a time your project faced a critical technical failure.'",
        steps: [
          "Situation: 'During the launch of our campus event portal 2 days before registration, concurrent traffic crashed the database connection pool.'",
          "Task: 'As the backend lead, I had to prevent registration downtime and restore system stability within 6 hours.'",
          "Action: 'I profiled database queries using logging middleware and identified an N+1 query vulnerability in the authentication flow. I refactored the query to batch fetch user records, added a Redis caching layer for active sessions, and tuned the connection pool threshold.'",
          "Result: 'Database CPU utilization dropped from 95% to 22%, and the portal processed over 3,000 concurrent registrations without a single dropped transaction.'",
        ],
        answer: "Structured STAR response detailing metric-driven technical remediation.",
      },
      {
        question: "Model Response: 'What is your greatest weakness and how are you addressing it?'",
        steps: [
          "Acknowledge authentic weakness: 'Earlier in my projects, I had a tendency to spend excessive time optimizing code prematurely before getting a working prototype into the hands of users.'",
          "Illustrate realization: 'During a hackathon, this delayed our submission because I spent 3 hours perfecting an algorithm when a simpler implementation would have sufficed for the MVP.'",
          "Detail ongoing active correction: 'Since then, I adopt a strict 'make it work, make it right, make it fast' approach. I time-box initial prototyping to 60% of the milestone and only optimize after core functionality is verified.'",
        ],
        answer: "Authentic, non-fatal professional weakness paired with demonstrable self-correction.",
      },
      {
        question: "Model Response: 'Why should we hire you over other candidates with similar qualifications?'",
        steps: [
          "Connect skills with reliability: 'While many candidates have solid algorithmic skills, what sets me apart is my disciplined consistency and end-to-end execution.'",
          "Provide proof: 'I maintained a 100+ day streak solving complex DSA problems, and I treat testing, documentation, and maintainability as first-class citizens in my repositories.'",
          "Highlight team value: 'I ramp up rapidly on unfamiliar stacks, welcome code reviews enthusiastically, and am committed to delivering measurable business value from day one.'",
        ],
        answer: "Balanced differentiation emphasizing technical rigor, execution speed, and collaborative openness.",
      },
      {
        question: "Model Response: 'Do you have any questions for us?'",
        steps: [
          "Avoid trivial or self-serving questions (e.g. 'How many leave days do I get?').",
          "Ask high-impact technical and cultural questions:",
          "Question 1: 'What are the biggest technical challenges the team is currently solving regarding scalability?'",
          "Question 2: 'How does your engineering team approach mentorship and continuous learning for junior engineers?'",
        ],
        answer: "Insightful questions reflecting enthusiasm, intellectual curiosity, and long-term career perspective.",
      },
    ],
    oaExamples: [
      {
        question: "How should you answer: 'Are you comfortable working in rotating night shifts or relocating to another city?'",
        steps: [
          "Be honest and positive. If flexible, state clearly: 'Yes, I am fully open to relocating and adapting to team requirements.'",
          "If you have genuine medical or family constraints, state them politely without being evasive.",
        ],
        answer: "Affirmative, flexible readiness or transparent, polite statement of fixed constraints",
      },
      {
        question: "What is the best way to handle a technical question when you genuinely do not know the answer?",
        steps: [
          "Never guess wildly or try to bluff the interviewer.",
          "State honestly: 'I haven't encountered that specific API/concept yet, but based on my knowledge of X, here is how I would reason through it...'",
          "Walk through your thought process logically.",
        ],
        answer: "Honest acknowledgment coupled with structured first-principles logical reasoning",
      },
      {
        question: "How should you respond to: 'Where do you see yourself in five years?'",
        steps: [
          "Focus on professional competencies rather than rigid job titles.",
          "Express ambition to become a high-impact technical contributor, master cloud architectures, and mentor junior teammates.",
        ],
        answer: "Growth in technical mastery, system ownership, and peer mentorship",
      },
    ],
    rememberThis: [
      "Keep your self-introduction to 60-90 seconds: Present -> Past -> Future.",
      "In behavioral questions, spend 50% of your time detailing your specific Actions in STAR.",
      "Never recite canned fake weaknesses like 'I work too hard'.",
      "Always ask 1-2 thoughtful engineering questions when invited at the conclusion.",
    ],
    relatedTopics: ["resume-tips", "gd-basics", "oa-patterns"],
    etiquetteQuiz: [
      {
        question: "During a virtual technical or HR interview, where should you primarily direct your gaze when speaking?",
        options: [
          "Directly at your own video preview thumbnail to monitor your expressions",
          "Directly into the camera lens to simulate natural eye contact with the interviewer",
          "Down at your keyboard or notes to ensure complete accuracy",
          "At the bottom of the screen away from the interviewer's face",
        ],
        correctIndex: 1,
        explanation:
          "Looking directly into the webcam lens creates the psychological perception of direct, confident eye contact for the interviewer on the other end.",
      },
      {
        question: "If an interviewer asks you a question that you don't fully understand or that was muffled by audio lag, what is the most professional response?",
        options: [
          "Stay silent and wait for them to repeat it spontaneously",
          "Guess what they meant and answer an unrelated question with confidence",
          "Politely apologize for the audio blip and ask them to clarify or repeat the question",
          "Pretend your internet disconnected and reload the tab immediately",
        ],
        correctIndex: 2,
        explanation:
          "Politely asking for clarification ('Pardon me, there was a minor audio stutter—could you please repeat the question?') demonstrates professional maturity and clear communication.",
      },
      {
        question: "When discussing a major conflict or failure that occurred in a previous academic group project, you should:",
        options: [
          "Blame your teammates explicitly so the interviewer knows you were not responsible",
          "Pretend you have never experienced any disagreement or setback in your life",
          "Focus on the interpersonal objective facts, your constructive conflict-resolution actions, and key lessons learned",
          "Criticize the college administration for assigning poor project partners",
        ],
        correctIndex: 2,
        explanation:
          "Interviewers assess emotional intelligence and accountability; focus on constructive mediation, de-escalation, and collaborative takeaways.",
      },
      {
        question: "When the interviewer asks 'Do you have any questions for us?' near the end of the session, the optimal response is:",
        options: [
          "'No, I have no questions. You explained everything.'",
          "'Can you tell me how many paid leaves and vacation days freshers receive?'",
          "'Could you share more about the engineering challenges the team is facing with your current tech stack?'",
          "'Did I pass the interview, and what score did I receive?'",
        ],
        correctIndex: 2,
        explanation:
          "Asking about team engineering challenges or tech stack evolution exhibits genuine intellectual engagement, motivation, and professional foresight.",
      },
      {
        question: "What is the proper etiquette regarding audio and background noise during an online assessment or interview?",
        options: [
          "Keep your microphone unmuted in a loud public café with friends chatting",
          "Use a quiet, well-lit room, use headphones with a clear microphone, and mute notifications beforehand",
          "Play background music softly to create a relaxed environment",
          "Keep your webcam turned off until the interviewer explicitly demands it",
        ],
        correctIndex: 1,
        explanation:
          "A quiet environment, dedicated headset, muted system notifications, and prompt video readiness are fundamental signs of interview professionalism.",
      },
    ],
  },

  // 35. Resume & Profile Tips
  {
    id: "resume-tips",
    group: "interview",
    title: "Resume & Profile Tips",
    summary:
      "Craft high-impact ATS-optimized single-page resumes, action-driven metric bullets, GitHub portfolio showcases, and professional LinkedIn profiles.",
    context: {
      whyItMatters:
        "The resume is your primary gateway to shortlisting. Automated Applicant Tracking Systems (ATS) reject over 70% of resumes before human review.",
      whereItAppears:
        "Universal prerequisite across on-campus placements, off-campus hiring, internships, and tech job applications.",
      prerequisites: ["Project Experience", "Basic Typography & Layout"],
      targetTimePerQuestion: "Not timed (Iterative crafting)",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "The One-Page Imperative for Freshers",
        definition: "Undergraduate and early-career resumes must strictly adhere to a single 1-page layout. Two-page resumes signal a lack of editing discipline and dilution of impact.",
      },
      {
        term: "ATS-Friendly Clean Formatting",
        definition: "Avoid multi-column tables, text boxes, icons, graphics, circular progress bars, and header/footer text traps that scramble ATS parsers. Use standard single-column hierarchies.",
      },
      {
        term: "The Google XYZ Bullet Formula",
        definition: "Accomplished [X] as measured by [Y] by doing [Z]. Every project bullet must begin with a strong active verb, specify the technical stack, and quantify the measurable outcome.",
      },
      {
        term: "Active Technical Portfolio Links",
        definition: "Include clickable, working links to your LinkedIn profile, GitHub repositories, and live project deployments. Every pinned GitHub repository must feature an informative README with setup steps.",
      },
    ],
    formulas: [
      {
        label: "High-Impact Project Bullet Equation",
        expression: "Action Verb + Technical System Built + Core Technologies Used + Quantifiable Metric / Impact",
        whenToUse: "Drafting every project or internship bullet point.",
        example: "'Architected a real-time collaborative code editor using WebSockets and Redis, reducing synchronization latency by 35% across 500 concurrent sessions.'",
      },
      {
        label: "Standard Section Ordering for Freshers",
        expression: "1. Header -> 2. Education -> 3. Technical Skills -> 4. Projects -> 5. Experience/Internships -> 6. Achievements/Certifications",
        whenToUse: "Structuring a clean 1-page campus resume.",
        example: "Education goes near the top for students; skills and projects form the core body.",
      },
      {
        label: "Keywords Match Density Rule",
        expression: "Resume Keywords intersect Job Description Core Requirements >= 60%",
        whenToUse: "Customizing resumes for specific off-campus roles.",
        example: "If the job description mentions Docker, REST APIs, and PostgreSQL, ensure those exact terms appear naturally in your skills and project bullets.",
      },
      {
        label: "GitHub Repository Quality Standard",
        expression: "Clean Repo = Live Demo URL + Architecture Diagram + One-Command Local Run Instructions + License",
        whenToUse: "Polishing pinned portfolio links.",
        example: "A repository with an empty README creates a negative impression; write clear setup steps.",
      },
    ],
    referenceTables: [
      {
        title: "Strong Action Verbs vs Weak Passive Verbs",
        headers: ["Weak / Passive Phrasing", "Strong Action Verb", "Impactful Example"],
        rows: [
          ["Was responsible for frontend", "Engineered / Architected", "Engineered responsive client dashboards in React and Tailwind"],
          ["Worked on database queries", "Optimized / Refactored", "Optimized SQL indexing, decreasing query execution time by 45%"],
          ["Helped with testing", "Automated / Implemented", "Automated end-to-end integration test suites with Jest and Cypress"],
          ["Created an app", "Designed and Deployed", "Designed and deployed a microservice pipeline on AWS ECS with Docker"],
          ["Learned about algorithms", "Implemented / Formulated", "Implemented custom caching algorithms handling 10k requests/sec"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Export as Plain Searchable PDF",
        whenItWorks: "Always test your exported PDF: select and copy text into Notepad. If text copies cleanly without broken words or scrambled order, ATS will parse it flawlessly.",
      },
      {
        trick: "Eliminate Vague Skill Percentage Bars",
        whenItWorks: "Never write 'Python: 85%' or 'Java: 90%'. Categorize skills by domain: Languages, Frameworks, Developer Tools, Databases.",
      },
      {
        trick: "One Font Family Hierarchy",
        whenItWorks: "Use one clean font family (Inter, Calibri, Arial, Helvetica) with 3 sizes: 14-16pt Name, 11-12pt Section Headings, 9.5-10.5pt Body text.",
      },
    ],
    commonTraps: [
      {
        mistake: "Writing a long subjective 'Career Objective' paragraph.",
        fix: "Replace generic objectives with a clean Technical Skills section. Your objective is evident: to secure the target role.",
      },
      {
        mistake: "Listing dead or broken GitHub/deployment links.",
        fix: "Test every single hyperlink on your exported PDF before submitting applications.",
      },
      {
        mistake: "Typos, inconsistent date formatting, or uneven bullet margins.",
        fix: "Spelling and formatting errors are the #1 reason recruiters instantly reject candidate resumes.",
      },
    ],
    workedExamples: [
      {
        question: "Transform this weak bullet: 'I made a weather app in react that calls an API to show forecasts.'",
        steps: [
          "Identify issues: First person 'I made', lacks technical depth, no metrics or performance details.",
          "Apply formula: Action Verb + System + Tech Stack + Outcome.",
          "Draft: 'Developed a responsive weather analytics application using React, TypeScript, and OpenWeatherMap REST API, implementing client-side debounced search and localStorage caching to reduce redundant network calls by 60%.'",
        ],
        answer: "Engineered responsive weather analytics dashboard using React and TypeScript with client-side caching, reducing redundant network requests by 60%.",
      },
      {
        question: "Transform this weak bullet: 'Responsible for bug fixing in the team project.'",
        steps: [
          "Identify issues: Passive 'Responsible for', vague 'bug fixing'.",
          "Apply formula: 'Diagnosed and resolved 25+ critical concurrency and state synchronization defects across the user authentication pipeline, boosting test suite pass rate to 98%.'",
        ],
        answer: "Diagnosed and resolved 25+ critical state synchronization defects across authentication flow, boosting automated test pass rate to 98%.",
      },
      {
        question: "How should technical skills be organized on a 1-page resume?",
        steps: [
          "Group skills into distinct, logical categories:",
          "Languages: TypeScript, JavaScript, Python, C++, SQL.",
          "Frontend & Backend: React, Node.js, Express, Tailwind CSS.",
          "Databases & Cloud: PostgreSQL, MongoDB, Redis, Supabase, Docker.",
          "Tools & Practices: Git, GitHub Actions, Linux, Vite, Agile.",
        ],
        answer: "Categorized under domain groupings (Languages, Frameworks, Databases, Tools) without arbitrary percentage bars.",
      },
      {
        question: "What are the essential elements of an effective GitHub project README?",
        steps: [
          "1. Project Title & 1-line elevator pitch.",
          "2. Live interactive deployment URL.",
          "3. Architecture diagram or visual GIF demonstration.",
          "4. Key features and technology stack badges.",
          "5. Clear local setup instructions (git clone, npm install, npm run dev).",
        ],
        answer: "Title, live demo link, visual preview, architecture overview, and reproducible local run instructions.",
      },
      {
        question: "How should an undergraduate student describe an internship where they only observed and helped lightly?",
        steps: [
          "Focus on what you built, researched, or contributed:",
          "Detail tools learned and small features, bug fixes, or documentation delivered.",
          "Never fabricate metrics; highlight genuine contributions accurately.",
        ],
        answer: "Detail specific tools utilized, research analyzed, bug tickets addressed, and documentation written without exaggeration.",
      },
    ],
    oaExamples: [
      {
        question: "Is it advisable to include photos, birthdates, or marital status on a software engineering resume?",
        steps: [
          "In international and standard corporate hiring, personal demographic details (photo, age, marital status) are excluded to prevent bias and comply with equal-opportunity standards.",
        ],
        answer: "No, exclude photos and personal demographics",
      },
      {
        question: "What is the ideal page length for a college fresher applying to software engineering roles?",
        steps: [
          "Strictly 1 single page.",
        ],
        answer: "Exactly 1 page",
      },
      {
        question: "How should candidate contact details be formatted at the top of a resume?",
        steps: [
          "Full Name (Bold, 16pt), Email, Phone Number, City/State, LinkedIn URL, GitHub URL, Portfolio URL.",
        ],
        answer: "Single-line or two-line header containing name, contact, location, and clickable professional links",
      },
    ],
    rememberThis: [
      "Strictly 1 page for all early-career and campus resumes.",
      "Use the XYZ formula: Accomplished [X] measured by [Y] by doing [Z].",
      "Avoid graphics, tables, text boxes, and skill percentage bars that confuse ATS.",
      "Ensure every hyperlink (LinkedIn, GitHub, Live Demo) works seamlessly.",
    ],
    relatedTopics: ["hr-basics", "gd-basics", "oa-patterns"],
  },

  // 36. Group Discussion Basics
  {
    id: "gd-basics",
    group: "interview",
    title: "Group Discussion Basics",
    summary:
      "Navigate campus selection group discussions with structured topic initiation, collaborative moderation, persuasive point synthesis, and balanced summarization.",
    context: {
      whyItMatters:
        "Group Discussions (GD) serve as a mass filtering round testing spontaneous communication, emotional composure, team leadership, active listening, and assertiveness.",
      whereItAppears:
        "Standard selection round for management trainees, corporate campus drives (TCS, Infosys, Deloitte, Mu Sigma), and B-school admissions.",
      prerequisites: ["Current Affairs", "Logical Argumentation", "Public Speaking"],
      targetTimePerQuestion: "Not timed (15-20 min group exercise)",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "The 4 Core Functional Roles in a GD",
        definition: "Initiator (Defines the topic scope and framework), Contributor (Presents substantiated arguments), Moderator (Re-engages quiet members and de-escalates heated disputes), Summarizer (Synthesizes agreed perspectives neutrally).",
      },
      {
        term: "The PREP Argument Structure",
        definition: "Structure every point as: Point (Clear thesis), Reason (Logical justification), Example (Empirical fact or case study), Point (Reiterated takeaway).",
      },
      {
        term: "Assertive Entry vs Aggressive Interruption",
        definition: "Never shout over peers. Wait for a natural breath or pause, validate the preceding speaker's point, and pivot smoothly ('Building on Rahul's observation on sustainability, another critical dimension is economic feasibility...').",
      },
      {
        term: "Evaluation Dimensions",
        definition: "Recruiters evaluate: (1) Content quality and factual depth, (2) Articulation and voice modulation, (3) Team building and listening, (4) Leadership and conflict resolution.",
      },
    ],
    formulas: [
      {
        label: "Initiation Framework",
        expression: "Topic Definition + Multi-Dimensional Framework (Economic, Social, Technological, Ethical) + Open Invitation",
        whenToUse: "Opening a GD when you understand the topic clearly.",
        example: "'Good morning friends. Today's topic is AI in Healthcare. Let's analyze it across diagnostic accuracy, cost, and patient privacy.'",
      },
      {
        label: "PREP Argumentation Model",
        expression: "Point + Reason + Example + Point (Restated)",
        whenToUse: "Delivering any individual contribution within 30-45 seconds.",
        example: "'Remote work boosts productivity (P) by eliminating commute stress (R), as seen in tech firms reporting 20% higher output (E), confirming its viability (P).'",
      },
      {
        label: "Constructive Pivot / Counter-Argument",
        expression: "Acknowledge Preceding Point ('I appreciate that perspective...') + Introduce Nuance / Limitation + Propose Alternative",
        whenToUse: "Disagreeing with a peer without appearing confrontational.",
        example: "'While Priya rightly notes the cost of EV adoption, we must also factor in long-term battery subsidies.'",
      },
      {
        label: "Neutral Summarization Formula",
        expression: "Objective Consensus Points + Stated Counter-Arguments + Balanced Forward-Looking Synthesis",
        whenToUse: "Concluding the GD when requested by the moderator or panel.",
        example: "Never introduce your own personal opinion in the final summary; summarize the group's collective deliberations.",
      },
    ],
    referenceTables: [
      {
        title: "Typical GD Topic Archetypes & Approaches",
        headers: ["Topic Category", "Example Topic", "Optimal Analytical Angle"],
        rows: [
          ["Factual / Current Affairs", "Electric Vehicles: Future of Mobility", "Data-driven, policy incentives, infrastructure bottlenecks, environmental impact"],
          ["Controversial / Opinion", "Moonlighting: Ethical Dilemma or Employee Right?", "Dual perspective: employer IP security vs employee autonomy and work-life boundaries"],
          ["Abstract / Metaphorical", "Red is not always Danger", "Symbolic thinking: passion, energy, celebration vs warning signals in technology/life"],
          ["Case-Study / Dilemma", "Allocating a corporate crisis budget", "Stakeholder prioritization, ROI, short-term survival vs long-term brand equity"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "PESTLE Framework for Broadening Any Topic",
        whenItWorks: "If stuck for ideas, analyze the topic through PESTLE: Political, Economic, Social, Technological, Legal, and Environmental dimensions.",
      },
      {
        trick: "Invite Silent Participants",
        whenItWorks: "If the discussion turns into a shouting match, turn to a silent member: 'We have heard several thoughts here; let us hear what Sneha thinks on this aspect.' Earns massive leadership points.",
      },
      {
        trick: "Jot Down 3 Key Points During Prep Time",
        whenItWorks: "In the 1-2 minutes of preparation time, write down 3 distinct points with concrete examples rather than a continuous essay.",
      },
    ],
    commonTraps: [
      {
        mistake: "Dominating the discussion or shouting to be heard.",
        fix: "A GD is a discussion, not a debate. Dominating participants are regularly disqualified for poor teamwork.",
      },
      {
        mistake: "Remaining completely silent out of hesitation.",
        fix: "Aim to make 3-4 concise, high-value entries of 30-45 seconds each throughout the discussion.",
      },
      {
        mistake: "Introducing a new personal opinion during the final summary.",
        fix: "The summary must strictly reflect the group's collective points, not your personal closing stance.",
      },
    ],
    workedExamples: [
      {
        question: "Model Initiation: Topic: 'Artificial Intelligence: A Boon or a Bane for Employment?'",
        steps: [
          "Greet the group warmly and state the topic clearly.",
          "Define key terms: 'Good morning everyone. Today we are discussing whether AI is an engine of employment generation or a driver of job displacement.'",
          "Provide a multi-dimensional framework: 'Historically, technological shifts like the Industrial Revolution displaced specific manual tasks while creating vast new industries. Today, we can evaluate this across routine automation, new high-skill opportunities, and the urgency of national reskilling frameworks.'",
          "Pass the floor collaboratively: 'I invite my peers to share their thoughts.'",
        ],
        answer: "Clear, neutral, structural initiation establishing a multi-faceted framework for the group.",
      },
      {
        question: "Model Pivot: How to enter a discussion where two participants are arguing heatedly.",
        steps: [
          "Wait for a slight cadence dip.",
          "Use a calming, firm, and constructive tone:",
          "'Both Ankit and Rohit raise valid perspectives regarding startup risk and corporate stability. However, if we look at the core issue from the perspective of early-career learning, both environments offer distinct accelerators. Let us examine how mentorship structures differ across both.'",
        ],
        answer: "Validating both sides, de-escalating tension, and refocusing the group on a deeper analytical facet.",
      },
      {
        question: "Model Contribution using PREP: 'Remote Work vs In-Office Work'",
        steps: [
          "Point: 'A hybrid model provides the optimal balance for modern engineering organizations.'",
          "Reason: 'It preserves the deep, uninterrupted focus required for architectural development while reserving in-office time for high-bandwidth brainstorming and design sprints.'",
          "Example: 'Companies like GitHub and Gitlab have demonstrated high retention and velocity through asynchronous documentation combined with periodic team co-locations.'",
          "Point: 'Therefore, hybrid flexibility rather than dogmatic extremes maximizes both productivity and retention.'",
        ],
        answer: "Compact 40-second contribution supported by logical rationale and industry precedent.",
      },
      {
        question: "Model Summary: Concluding a 15-minute GD on 'Cashless Economy'",
        steps: [
          "Summarize neutrally: 'To synthesize our group's discussion on a cashless economy, we reached consensus that digital payments have vastly improved financial inclusion, transparency, and transaction velocity.'",
          "Mention counterpoints raised: 'Simultaneously, the group highlighted pressing vulnerabilities regarding cybersecurity fraud, digital literacy in rural belts, and server downtime.'",
          "Conclude with forward-looking balance: 'The consensus is that while the transition to a cashless society is inevitable and beneficial, it must be supported by robust data privacy laws and rural digital infrastructure.'",
        ],
        answer: "Balanced, objective recap capturing consensus, concerns, and future requirements without personal bias.",
      },
      {
        question: "How to handle an abstract topic: 'Zero is the ultimate number.'",
        steps: [
          "Acknowledge the abstract nature and propose tangible interpretations:",
          "Mathematical: Zero represents the foundation of binary computing (0 and 1) and placeholder arithmetic.",
          "Philosophical / Ecological: 'Net Zero' carbon emissions as an urgent environmental priority.",
          "Personal / Professional: Starting from zero (a beginner's mindset) as the prerequisite for innovation.",
        ],
        answer: "Anchor abstract themes to binary technology, environmental net-zero goals, and growth mindsets.",
      },
    ],
    oaExamples: [
      {
        question: "What should you do if you are entirely unfamiliar with the assigned GD topic?",
        steps: [
          "Do not panic and do not try to speak first.",
          "Listen intently to the first 2-3 speakers to deduce the core theme and context.",
          "Formulate a point building on a sensible argument raised by another participant.",
        ],
        answer: "Listen attentively to the opening speakers to understand the context, then contribute a reasoned supporting point",
      },
      {
        question: "Is it advantageous to speak continuously for 3 minutes in a 15-minute group discussion?",
        steps: [
          "No. A 3-minute monologue monopolizes time, reflects poor teamwork, and is heavily penalized by evaluators.",
        ],
        answer: "No, keep entries concise (30-45 seconds) and invite others to contribute",
      },
      {
        question: "How should you respond if someone rudely interrupts your point?",
        steps: [
          "Do not shout back. Maintain calm composure, smile, and say: 'Please allow me 15 seconds to conclude my thought, and I will gladly pass the floor to you.'",
        ],
        answer: "Politely and firmly request a brief moment to conclude your thought before ceding the floor",
      },
    ],
    rememberThis: [
      "A GD is a collaborative discussion, not an aggressive debate.",
      "Use the PREP model: Point, Reason, Example, Point.",
      "Apply the PESTLE framework when you need multi-dimensional arguments quickly.",
      "Bring quiet members into the conversation to demonstrate mature leadership.",
    ],
    relatedTopics: ["hr-basics", "resume-tips", "oa-patterns"],
  },

  // 37. Online Assessment Patterns
  {
    id: "oa-patterns",
    group: "interview",
    title: "Online Assessment Patterns",
    summary:
      "Understand standard corporate online assessment structures, sectional timing constraints, negative marking strategies, and technical proctoring best practices.",
    context: {
      whyItMatters:
        "Online Assessments (OA) constitute the initial automated filter that screens out 80-90% of applicants in campus and off-campus recruitment drives.",
      whereItAppears:
        "TCS NQT, Infosys DSE/SP, Cognizant GenC, Capgemini, Wipro, Amazon OA, and standard HackerRank/Mettl tests.",
      prerequisites: ["Quantitative Aptitude", "Logical Reasoning", "Basic DSA"],
      targetTimePerQuestion: "Not timed (Assessment overview)",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Tri-Partite OA Architecture",
        definition: "Most campus and entry-level corporate assessments comprise three distinct sections: (1) Cognitive Aptitude (Quantitative, Logical, Verbal), (2) Technical MCQs (Data Structures, OOP, OS, DBMS, Computer Networks), and (3) Hands-on Coding (1-3 algorithmic problems).",
      },
      {
        term: "Sectional Timing vs Cumulative Timing",
        definition: "In sectionally timed assessments (e.g. TCS NQT), unused time in one section does NOT carry over to subsequent sections, and backward navigation between sections is frequently locked.",
      },
      {
        term: "Negative Marking Risk-Reward Calculation",
        definition: "When an assessment deducts marks for incorrect answers (e.g. +1 for correct, -0.25 for incorrect), blind guessing yields a negative expected value (-0.0625). Guess only if you can confidently eliminate at least 2 options.",
      },
      {
        term: "AI & Human Proctoring Compliance",
        definition: "Modern OA platforms (HackerRank, Mettl, Wheebox, CodeChef) track tab switching, full-screen exits, webcam eye-tracking, secondary monitor connections, and external audio feeds. Any infraction flags automatic disqualification.",
      },
    ],
    formulas: [
      {
        label: "Expected Value of Guessing Formula",
        expression: "EV = (p_correct x Marks_Correct) - (p_incorrect x Penalty)",
        whenToUse: "Deciding whether to guess on negative-marking questions.",
        example: "With 4 choices and -0.25 penalty: EV = (1/4)(1) - (3/4)(0.25) = 0.25 - 0.1875 = +0.0625 (barely neutral). If 2 options eliminated: EV = (1/2)(1) - (1/2)(0.25) = +0.375 (strongly positive).",
      },
      {
        label: "Time Budget Allocation Rule",
        expression: "Time per Question = Section Duration / Number of Questions - Buffer (2-3 min)",
        whenToUse: "Establishing pacing before starting a section.",
        example: "40 minutes for 30 questions gives 40/30 = 80 seconds per question with a 2-minute review buffer.",
      },
      {
        label: "Coding Problem Time Distribution",
        expression: "Read & Understand (15%) + Algorithm & Complexity Plan (25%) + Code Implementation (35%) + Edge Cases & Debugging (25%)",
        whenToUse: "Managing 30-45 minute coding challenges in an OA.",
        example: "Never start coding in minute 1; design the approach on scratch paper first.",
      },
      {
        label: "Error Log Tracking Cycle",
        expression: "Mistake Identified -> Log Category (Concept / Calculation / Misread) -> Review 48h Later",
        whenToUse: "Systematic preparation in the weeks leading up to recruitment drives.",
        example: "Reviewing an error log prevents repeating the same conceptual traps.",
      },
    ],
    referenceTables: [
      {
        title: "Standard Corporate OA Formats Overview",
        headers: ["Company / Pattern", "Typical Sections", "Key Features / Navigation"],
        rows: [
          ["TCS NQT (Cognitive + IT)", "Numerical, Verbal, Reasoning + Advanced Coding", "Strict sectional timing; no backward navigation between questions"],
          ["Infosys (Specialist / DSE)", "Pseudocode, Numerical, Verbal + 3 Coding Problems", "High weight on pseudocode tracing and dynamic programming"],
          ["Cognizant (GenC / GenC Next)", "Quantitative, Analytical, English + Domain MCQs", "Adaptive difficulty in certain platforms; sectional cutoffs apply"],
          ["Amazon / Tech Majors", "2 Coding Questions + Work Style Simulation", "Emphasis on LeetCode Medium/Hard and Amazon Leadership Principles"],
          ["Wipro (Elite National Talent)", "Aptitude + Essay Writing + 2 Coding Problems", "Automated grammar scoring for essay; standard DSA questions"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Eliminate 2 Choices Before Guessing",
        whenItWorks: "Under 1/4 negative marking, never guess blindly. Only guess if you can eliminate at least two choices, which turns your expected score positive (+0.375).",
      },
      {
        trick: "Two-Pass Question Strategy",
        whenItWorks: "Pass 1: Answer every question you can solve in under 45 seconds immediately. Pass 2: Dedicate remaining time to intermediate questions you marked for review.",
      },
      {
        trick: "Edge Case Checklist for Coding Problems",
        whenItWorks: "Always test: (1) Empty array/string, (2) Single element, (3) All duplicates, (4) Negative numbers, (5) Maximum boundary values (overflow/BigInt).",
      },
    ],
    commonTraps: [
      {
        mistake: "Spending 10 minutes stuck on a single difficult quantitative question.",
        fix: "Every question carries equal marks in a section. Skip questions that stall you after 60 seconds and return later.",
      },
      {
        mistake: "Switching tabs or minimizing full-screen mode during proctored tests.",
        fix: "Modern proctoring systems flag window blurs and log them as cheating incidents. Keep secondary applications completely closed.",
      },
      {
        mistake: "Not reading whether negative marking applies to the section.",
        fix: "Always read the instructions screen carefully before starting each section to adjust your guessing strategy.",
      },
    ],
    workedExamples: [
      {
        question: "How should a candidate manage time in a 60-minute section containing 50 aptitude questions with negative marking?",
        steps: [
          "Determine time allocation: 60 minutes for 50 questions = approx 70 seconds per question.",
          "First Pass (0 to 35 min): Rapidly scan and solve all high-confidence questions (typically 25-30 questions). Mark unsure questions for review.",
          "Second Pass (35 to 55 min): Work through marked questions where you can eliminate at least 2 options.",
          "Final 5 minutes: Verify answers and ensure all confirmed responses are saved. Do NOT make last-second wild guesses on unfamiliar questions.",
        ],
        answer: "Two-pass strategy: solve rapid wins first, tackle high-probability eliminations second, avoid wild guesses.",
      },
      {
        question: "In an OA with +2 for correct and -0.5 for wrong answers, you are down to 2 options on a problem. Should you guess?",
        steps: [
          "Number of remaining options = 2.",
          "Probability of correct guess = 1/2 = 0.5; Probability of incorrect guess = 1/2 = 0.5.",
          "Expected Value (EV) = (0.5 x 2) - (0.5 x 0.5) = 1.0 - 0.25 = +0.75 marks.",
          "Since the expected value is strongly positive (+0.75 marks), you SHOULD make the educated guess.",
        ],
        answer: "Yes, because the expected value is positive (+0.75 marks).",
      },
      {
        question: "What technical checks must be performed 30 minutes before an online proctored exam begins?",
        steps: [
          "1. Hardware: Laptop connected to AC power charger (never run on battery alone).",
          "2. Network: Stable internet with mobile hotspot ready as an immediate backup.",
          "3. Permissions: Ensure browser has camera and microphone permissions enabled.",
          "4. Environment: Close all background apps (Discord, Telegram, IDEs, browser tabs) and ensure a quiet, well-lit room without backlight glare.",
        ],
        answer: "Hardware power, internet redundancy, webcam/mic permissions, and background process shutdown.",
      },
      {
        question: "In a coding section of 45 minutes for 2 problems, what is the best strategy?",
        steps: [
          "Divide time: 20 minutes for Problem 1 (typically Easy/Medium), 25 minutes for Problem 2 (typically Medium).",
          "Read both problem statements first to identify which one maps to familiar patterns (e.g. Hash Map, Two Pointers).",
          "Solve the easier problem first to secure partial/full test suite marks.",
          "Write clean, modular code with boundary checks to pass all hidden edge test cases.",
        ],
        answer: "Solve the easier problem completely first, test edge cases, then allocate dedicated focus to problem 2.",
      },
      {
        question: "Why do automated coding platforms fail solutions that work on custom test inputs?",
        steps: [
          "1. Time Limit Exceeded (TLE): Algorithm exceeds O(N) or O(N log N) complexity requirement for large inputs (e.g. N = 10^5).",
          "2. Integer Overflow: Arithmetic operations exceeding 32-bit signed integer limits.",
          "3. Unhandled Edge Cases: Empty inputs, single element, negative numbers, or duplicates.",
        ],
        answer: "TLE due to high time complexity, integer overflow, or failing boundary edge cases.",
      },
    ],
    oaExamples: [
      {
        question: "If a test platform locks backward navigation between questions, how does your strategy change?",
        steps: [
          "You cannot use a two-pass strategy. You must make a final decision on each question before clicking 'Next'.",
          "Give each question a fixed time limit (e.g. 75 seconds); if unresolved, eliminate unlikely choices and select the best probability answer.",
        ],
        answer: "Single-pass discipline: eliminate choices and commit before advancing, never leaving unanswered items",
      },
      {
        question: "What should you do if your browser crashes during a live proctored online test?",
        steps: [
          "Do not panic. Most platforms save your answers on server session sync.",
          "Re-open the browser, use the original test link, log in again immediately, and notify the placement coordinator or platform support email.",
        ],
        answer: "Re-open browser immediately via original link, resume session, and notify support",
      },
      {
        question: "How important are hidden test cases in OA coding problems?",
        steps: [
          "Hidden test cases determine 70-80% of your total coding score; public sample cases only test basic logic.",
        ],
        answer: "Critical: hidden cases evaluate efficiency (TLE) and boundary edge cases",
      },
    ],
    rememberThis: [
      "Always check if negative marking and sectional time limits apply before starting.",
      "Guess only when you can eliminate at least two choices under negative marking.",
      "Check edge cases on coding problems: empty input, single element, negative values, integer overflow.",
      "Never switch tabs or minimize the test window during AI-proctored assessments.",
    ],
    relatedTopics: ["hr-basics", "resume-tips", "gd-basics"],
  },
];
