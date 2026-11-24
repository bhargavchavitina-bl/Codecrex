// src/data/aptitude/quantitative-part2.ts
// Comprehensive Aptitude Data: Quantitative Part 2 (Topics 11 to 19)

import type { AptitudeTopicData } from "./types";

export const quantitativePart2Topics: AptitudeTopicData[] = [
  // 11. Time, Speed & Distance
  {
    id: "time-speed-distance",
    group: "quantitative",
    title: "Time, Speed & Distance",
    summary:
      "Master the fundamental relationship between speed, time, and distance, including unit conversions, average speed over equal distances, and relative motion.",
    context: {
      whyItMatters:
        "Time, Speed, and Distance (TSD) is a cornerstone of quantitative aptitude. It directly models real-world motion and serves as the conceptual foundation for train problems, circular tracks, and river navigation.",
      whereItAppears:
        "Featured prominently in campus placement tests (TCS, Infosys, Cognizant, Wipro), bank PO exams, CAT, and AFCAT.",
      prerequisites: ["Ratio & Proportion", "Basic Algebra", "Unit Conversions"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Speed-Distance-Time Triangle",
        definition: "Speed = Distance / Time. When distance is constant, speed is inversely proportional to time (s1/s2 = t2/t1). When time is constant, distance is directly proportional to speed (d1/d2 = s1/s2).",
      },
      {
        term: "Unit Conversion Factor",
        definition: "To convert km/h to m/s, multiply by 5/18 (since 1000 m / 3600 s = 5/18). To convert m/s to km/h, multiply by 18/5.",
      },
      {
        term: "Relative Speed",
        definition: "When two bodies move towards each other, their relative speed is the sum of their speeds (s1 + s2). When they move in the same direction, relative speed is the absolute difference |s1 - s2|.",
      },
      {
        term: "Harmonic Average Speed",
        definition: "When a journey covers two equal distances at speeds x and y, average speed is the harmonic mean: 2xy / (x + y). Over three equal distances, it is 3xyz / (xy + yz + zx).",
      },
    ],
    formulas: [
      {
        label: "Basic Motion Relationship",
        expression: "Distance = Speed x Time; Speed = Distance / Time; Time = Distance / Speed",
        whenToUse: "Direct calculations involving uniform motion.",
        example: "Travelling at 60 km/h for 2.5 hours gives Distance = 60 x 2.5 = 150 km.",
      },
      {
        label: "km/h to m/s Conversion",
        expression: "v (m/s) = v (km/h) x (5 / 18); v (km/h) = v (m/s) x (18 / 5)",
        whenToUse: "Converting speed units between metric systems.",
        example: "72 km/h = 72 x (5/18) = 20 m/s.",
      },
      {
        label: "Average Speed (Equal Distances)",
        expression: "Avg Speed = 2xy / (x + y)",
        whenToUse: "When travelling to a destination at speed x and returning at speed y over identical distances.",
        example: "Going at 40 km/h and returning at 60 km/h: Avg Speed = (2 x 40 x 60) / (40 + 60) = 4800 / 100 = 48 km/h.",
      },
      {
        label: "Late and Early Distance Formula",
        expression: "Distance = [s1 x s2 x (t1 + t2)] / |s2 - s1|",
        whenToUse: "When travelling at s1 makes you t1 late and travelling at s2 makes you t2 early (times expressed in hours).",
        example: "Walking at 4 km/h is 10 min late; at 5 km/h is 5 min early. Time diff = 15/60 h. Distance = (4 x 5 x 15/60) / (5 - 4) = 5 km.",
      },
      {
        label: "Relative Speed & Catch-Up Time",
        expression: "Time to meet/catch up = Initial Separation / Relative Speed",
        whenToUse: "Determining when two objects meet or one overtakes another.",
        example: "Car A chases Car B separated by 60 km at speeds 80 km/h and 50 km/h: Time = 60 / (80 - 50) = 2 hours.",
      },
    ],
    referenceTables: [
      {
        title: "Standard Speed Conversions",
        headers: ["km/h", "m/s", "miles/h (approx)"],
        rows: [
          ["18 km/h", "5 m/s", "11.18 mph"],
          ["36 km/h", "10 m/s", "22.37 mph"],
          ["54 km/h", "15 m/s", "33.55 mph"],
          ["72 km/h", "20 m/s", "44.74 mph"],
          ["90 km/h", "25 m/s", "55.92 mph"],
          ["108 km/h", "30 m/s", "67.11 mph"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Inverse Time-Speed Ratio",
        whenItWorks: "Whenever distance is constant. If speed increases by 25% (5/4), time taken drops to 4/5 (decrease of 20% or 1/5).",
      },
      {
        trick: "Late/Early Time Difference Summation",
        whenItWorks: "If one case is late and the other is early, add the time deviations (t1 + t2). If both are late or both early, subtract them |t1 - t2|.",
      },
      {
        trick: "Relative Speed in Linear Chases",
        whenItWorks: "Freeze the leading object and let the chasing object move at the relative speed (s_chaser - s_leader) over the initial head start distance.",
      },
    ],
    commonTraps: [
      {
        mistake: "Computing arithmetic mean (x + y)/2 for average speed over equal distances.",
        fix: "Never take arithmetic average of speeds unless time spent travelling at each speed is exactly identical. Use harmonic mean 2xy/(x + y) for equal distances.",
      },
      {
        mistake: "Mixing minutes with km/h without dividing minutes by 60.",
        fix: "Always convert time differences from minutes to hours by dividing by 60 before plugging into speed equations.",
      },
      {
        mistake: "Incorrect relative speed direction sign.",
        fix: "Opposite directions (towards or away from each other) add speeds (s1 + s2); same direction subtracts speeds (|s1 - s2|).",
      },
    ],
    workedExamples: [
      {
        question: "A motorist travels from Town A to Town B at 60 km/h and returns at 40 km/h. Find the average speed for the round trip in km/h.",
        steps: [
          "Let distance AB = d.",
          "Time going = d / 60, time returning = d / 40.",
          "Total distance = 2d.",
          "Total time = d/60 + d/40 = (2d + 3d) / 120 = 5d / 120 = d / 24.",
          "Average speed = Total distance / Total time = 2d / (d / 24) = 48 km/h.",
          "Alternatively, using 2xy/(x + y): 2(60)(40)/(60 + 40) = 4800 / 100 = 48 km/h.",
        ],
        answer: "48 km/h",
        check: () => (2 * 60 * 40) / (60 + 40),
      },
      {
        question: "Walking at 3/4 of his normal speed, a man reaches his office 20 minutes late. Find his usual time in minutes.",
        steps: [
          "Since distance is constant, Speed and Time are inversely related.",
          "New speed = (3/4) x usual speed, so new time = (4/3) x usual time.",
          "Increase in time = (4/3 - 1) x usual time = (1/3) x usual time = 20 minutes.",
          "Usual time = 20 x 3 = 60 minutes.",
        ],
        answer: "60 minutes",
        check: () => 20 * 3,
      },
      {
        question: "If a student walks at 5 km/h, he is 10 minutes late for school. If he walks at 6 km/h, he arrives 5 minutes early. Find the distance to school in km.",
        steps: [
          "Speed 1 (s1) = 5 km/h, Speed 2 (s2) = 6 km/h.",
          "One is late (10 min) and one is early (5 min), so total time difference = 10 + 5 = 15 minutes = 15/60 hour = 1/4 hour.",
          "Difference in times: D/5 - D/6 = 1/4.",
          "D/30 = 1/4 => D = 30 / 4 = 7.5 km.",
        ],
        answer: "7.5 km",
        check: () => 30 / 4,
      },
      {
        question: "A thief steals a car at 1:30 PM and drives it at 40 km/h. The theft is discovered at 2:00 PM and the owner sets off in another car at 50 km/h. At what time will the owner catch the thief, and how many hours after 2:00 PM?",
        steps: [
          "Head start time of the thief = from 1:30 PM to 2:00 PM = 30 minutes = 0.5 hour.",
          "Distance covered by thief in 0.5 hour = 40 x 0.5 = 20 km.",
          "Relative speed of owner chasing thief = 50 - 40 = 10 km/h.",
          "Time taken to catch the thief = 20 km / 10 km/h = 2 hours.",
          "Time of capture = 2:00 PM + 2 hours = 4:00 PM.",
        ],
        answer: "2 hours (caught at 4:00 PM)",
        check: () => 20 / (50 - 40),
      },
      {
        question: "Two cyclists start at the same time from points A and B towards each other at 15 km/h and 20 km/h respectively. If distance AB is 70 km, after how many hours will they meet?",
        steps: [
          "Cyclists are moving towards each other, so their relative speed = 15 + 20 = 35 km/h.",
          "Distance to cover between them = 70 km.",
          "Time to meet = Distance / Relative Speed = 70 / 35 = 2 hours.",
        ],
        answer: "2 hours",
        check: () => 70 / (15 + 20),
      },
    ],
    oaExamples: [
      {
        question: "An express train covers 360 km at a uniform speed. If its speed had been 10 km/h more, it would have taken 3 hours less. Find the original speed in km/h.",
        steps: [
          "Let original speed be v. 360/v - 360/(v + 10) = 3.",
          "Divide by 3: 120/v - 120/(v + 10) = 1 => 120(v + 10 - v) = v(v + 10).",
          "1200 = v^2 + 10v => v^2 + 10v - 1200 = 0.",
          "(v + 40)(v - 30) = 0 => v = 30 km/h (speed cannot be negative).",
        ],
        answer: "30 km/h",
      },
      {
        question: "A boy goes to school at 3 km/h and returns at 2 km/h. If he takes 5 hours in all, find the distance in km.",
        steps: [
          "Let distance be D. D/3 + D/2 = 5.",
          "5D / 6 = 5 => D = 6 km.",
        ],
        answer: "6 km",
      },
      {
        question: "A car covers four successive 3 km stretches at speeds of 10, 20, 30 and 60 km/h respectively. What is the average speed over the entire 12 km in km/h?",
        steps: [
          "Time 1 = 3/10, Time 2 = 3/20, Time 3 = 3/30 = 1/10, Time 4 = 3/60 = 1/20.",
          "Total time = 3/10 + 3/20 + 2/20 + 1/20 = 6/20 + 3/20 + 2/20 + 1/20 = 12/20 = 3/5 hour.",
          "Average speed = Total distance / Total time = 12 / (3/5) = 12 x 5 / 3 = 20 km/h.",
        ],
        answer: "20 km/h",
      },
    ],
    rememberThis: [
      "Multiply km/h by 5/18 to get m/s; multiply m/s by 18/5 to get km/h.",
      "Average speed over equal distances is 2xy/(x + y), never (x + y)/2.",
      "When distance is fixed, speed and time are inversely proportional: s1/s2 = t2/t1.",
      "In relative motion: add speeds when moving towards each other, subtract speeds when moving in the same direction.",
    ],
    relatedTopics: ["trains", "boats-streams", "ratio-proportion"],
  },

  // 12. Problems on Trains
  {
    id: "trains",
    group: "quantitative",
    title: "Problems on Trains",
    summary:
      "Solve train crossing scenarios where the physical length of the train, platforms, bridges, and moving observers determine effective distance and crossing time.",
    context: {
      whyItMatters:
        "Train problems are high-frequency aptitude questions that test spatial reasoning and relative motion under non-negligible object lengths.",
      whereItAppears:
        "Campus recruitments (Infosys, TCS, Capgemini, Accenture), RRB NTPC, SSC CGL, and State PSC examinations.",
      prerequisites: ["Time, Speed & Distance", "Relative Speed", "Unit Conversions"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Stationary Point Object Crossing",
        definition: "When a train crosses a pole, tree, telegraph post, or stationary person, the distance covered equals the length of the train alone (Distance = L_train).",
      },
      {
        term: "Stationary Extended Object Crossing",
        definition: "When a train crosses a platform, tunnel, or stationary train of length P, the total distance covered equals the sum of both lengths (Distance = L_train + P).",
      },
      {
        term: "Two Moving Trains Crossing",
        definition: "When two trains of lengths L1 and L2 cross each other, total distance is always L1 + L2. Relative speed is v1 + v2 in opposite directions, and |v1 - v2| in the same direction.",
      },
      {
        term: "Meeting Point Reciprocal Speed Ratio",
        definition: "If two trains start simultaneously from A and B and, after meeting, take t1 and t2 hours to reach B and A respectively, then v1 / v2 = sqrt(t2 / t1).",
      },
    ],
    formulas: [
      {
        label: "Crossing a Pole/Man",
        expression: "Time = L / v",
        whenToUse: "A train of length L moving at speed v crosses a point object.",
        example: "A 150 m train at 54 km/h (15 m/s) crosses a pole in 150 / 15 = 10 s.",
      },
      {
        label: "Crossing a Platform/Bridge",
        expression: "Time = (L + P) / v",
        whenToUse: "A train of length L passes a platform or bridge of length P.",
        example: "A 200 m train passing a 300 m platform at 25 m/s: Time = (200 + 300) / 25 = 20 s.",
      },
      {
        label: "Two Trains Crossing Each Other",
        expression: "Time = (L1 + L2) / (v1 + v2) [Opposite] OR Time = (L1 + L2) / |v1 - v2| [Same Direction]",
        whenToUse: "Calculating the time taken for two trains to completely pass each other.",
        example: "Two 120 m trains at 40 km/h and 32 km/h in opposite directions: Dist = 240 m, Rel Speed = 72 km/h = 20 m/s. Time = 240/20 = 12 s.",
      },
      {
        label: "After-Meeting Speed Ratio Formula",
        expression: "v1 / v2 = sqrt(t2 / t1)",
        whenToUse: "Two trains start towards each other and take t1 and t2 hours after meeting to reach their respective destinations.",
        example: "If t1 = 4 hours and t2 = 9 hours, then v1/v2 = sqrt(9/4) = 3/2.",
      },
    ],
    referenceTables: [
      {
        title: "Train Crossing Distance Matrix",
        headers: ["Target Object", "Object Length Considered?", "Effective Distance"],
        rows: [
          ["Pole / Tree / Signal", "No (negligible)", "L_train"],
          ["Stationary Person", "No (negligible)", "L_train"],
          ["Platform / Bridge / Tunnel", "Yes", "L_train + L_platform"],
          ["Moving Train (Opposite)", "Yes", "L1 + L2 (Speed = v1 + v2)"],
          ["Moving Train (Same Dir)", "Yes", "L1 + L2 (Speed = v1 - v2)"],
          ["Person sitting in another train", "No (only that person's point)", "L_first_train (not second)"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Pre-convert Speed to m/s",
        whenItWorks: "Always convert train speeds to m/s immediately (multiply by 5/18) before computing, since train lengths are universally in metres.",
      },
      {
        trick: "Passenger in Train Crossing",
        whenItWorks: "When a train passes a man sitting in another train, only the length of the passing train is considered, NOT the train the man is sitting in.",
      },
      {
        trick: "Difference of Platform Lengths",
        whenItWorks: "If a train crosses platform 1 in t1 and platform 2 in t2, Train Speed = (P2 - P1) / (t2 - t1).",
      },
    ],
    commonTraps: [
      {
        mistake: "Adding platform length when crossing a passenger inside the train.",
        fix: "If a train crosses a passenger sitting inside a moving train, the distance covered is only the length of the passing train, not both trains.",
      },
      {
        mistake: "Mixing km/h speeds directly with metres of train length without converting.",
        fix: "Never compute metres / (km/h). Convert km/h to m/s first by multiplying by 5/18.",
      },
      {
        mistake: "Subtracting lengths when trains move in the same direction.",
        fix: "Lengths ALWAYS add (L1 + L2) regardless of whether trains travel in the same or opposite direction.",
      },
    ],
    workedExamples: [
      {
        question: "A train 240 m in length crosses a telegraph post in 16 seconds. What is the speed of the train in km/h?",
        steps: [
          "Distance = length of train = 240 m.",
          "Time = 16 s.",
          "Speed in m/s = 240 / 16 = 15 m/s.",
          "Speed in km/h = 15 x (18 / 5) = 3 x 18 = 54 km/h.",
        ],
        answer: "54 km/h",
        check: () => (240 / 16) * (18 / 5),
      },
      {
        question: "A train 300 m long is travelling at 72 km/h. How many seconds will it take to cross a platform 200 m long?",
        steps: [
          "Convert speed to m/s: 72 x (5 / 18) = 20 m/s.",
          "Total distance = Train length + Platform length = 300 + 200 = 500 m.",
          "Time taken = Distance / Speed = 500 / 20 = 25 seconds.",
        ],
        answer: "25 seconds",
        check: () => (300 + 200) / (72 * (5 / 18)),
      },
      {
        question: "Two trains 140 m and 160 m long are running towards each other on parallel tracks at 40 km/h and 50 km/h respectively. In how many seconds will they clear each other?",
        steps: [
          "Total distance = L1 + L2 = 140 + 160 = 300 m.",
          "Since they move towards each other, relative speed = 40 + 50 = 90 km/h.",
          "Convert relative speed to m/s: 90 x (5 / 18) = 25 m/s.",
          "Time = Distance / Relative speed = 300 / 25 = 12 seconds.",
        ],
        answer: "12 seconds",
        check: () => 300 / (90 * (5 / 18)),
      },
      {
        question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/h, what is the length of the platform in metres?",
        steps: [
          "Speed in m/s = 54 x (5 / 18) = 15 m/s.",
          "Length of the train = Speed x time to cross man = 15 x 20 = 300 m.",
          "Total distance to cross platform = Speed x time = 15 x 36 = 540 m.",
          "Length of platform = Total distance - Length of train = 540 - 300 = 240 m.",
        ],
        answer: "240 metres",
        check: () => 15 * 36 - 15 * 20,
      },
      {
        question: "Two trains start at the same moment from Kolkata and Delhi towards each other. After meeting, they take 4 hours and 9 hours respectively to reach Delhi and Kolkata. Find the ratio of their speeds.",
        steps: [
          "According to the after-meeting formula: v1 / v2 = sqrt(t2 / t1).",
          "Here t1 = 4 hours and t2 = 9 hours.",
          "v1 / v2 = sqrt(9 / 4) = 3 / 2.",
          "The ratio of their speeds is 3 : 2.",
        ],
        answer: "3:2 (or 1.5)",
        check: () => Math.sqrt(9 / 4),
      },
    ],
    oaExamples: [
      {
        question: "A train 125 m long passes a man running at 5 km/h in the same direction in 10 seconds. Find the speed of the train in km/h.",
        steps: [
          "Let train speed be v km/h. Relative speed = (v - 5) km/h.",
          "Relative speed in m/s = Distance / Time = 125 / 10 = 12.5 m/s.",
          "Convert to km/h: 12.5 x (18 / 5) = 2.5 x 18 = 45 km/h.",
          "v - 5 = 45 => v = 50 km/h.",
        ],
        answer: "50 km/h",
      },
      {
        question: "A train travelling at 60 km/h crosses a pole in 9 seconds. What is the length of the train?",
        steps: [
          "Speed = 60 x (5/18) = 50/3 m/s.",
          "Length = Speed x Time = (50/3) x 9 = 150 m.",
        ],
        answer: "150 metres",
      },
      {
        question: "Two trains of equal lengths take 10 seconds and 15 seconds respectively to cross a telegraph post. If the length of each train is 120 m, in what time (in seconds) will they cross each other when travelling in opposite directions?",
        steps: [
          "Speed 1 = 120 / 10 = 12 m/s.",
          "Speed 2 = 120 / 15 = 8 m/s.",
          "Relative speed in opposite directions = 12 + 8 = 20 m/s.",
          "Total distance = 120 + 120 = 240 m.",
          "Time to cross = 240 / 20 = 12 seconds.",
        ],
        answer: "12 seconds",
      },
    ],
    rememberThis: [
      "Distances always add: crossing another train or platform is always L1 + L2.",
      "Speed of train relative to a stationary platform is just the train's own speed.",
      "When crossing a point object (pole, man), distance is just the train's length.",
      "In after-meeting problems, v1 / v2 = sqrt(t2 / t1).",
    ],
    relatedTopics: ["time-speed-distance", "boats-streams", "ratio-proportion"],
  },

  // 13. Boats & Streams
  {
    id: "boats-streams",
    group: "quantitative",
    title: "Boats & Streams",
    summary:
      "Solve river navigation problems involving upstream resistance, downstream assistance, still-water boat speed, and stream current velocities.",
    context: {
      whyItMatters:
        "Boats and Streams tests relative motion in a medium where the frame of reference itself is moving with velocity v.",
      whereItAppears:
        "Standard in banking examinations (IBPS PO, SBI Clerk), SSC CGL, campus assessments (Wipro, Cognizant, Tech Mahindra), and defense services.",
      prerequisites: ["Time, Speed & Distance", "Linear Equations"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Easy",
    },
    keyConcepts: [
      {
        term: "Downstream Speed (D)",
        definition: "When moving along with the water stream, the speed of the stream assists the boat: D = u + v, where u is boat speed in still water and v is stream speed.",
      },
      {
        term: "Upstream Speed (U)",
        definition: "When moving against the water stream, the stream opposes the boat: U = u - v. For the boat to move forward, u must be strictly greater than v.",
      },
      {
        term: "Still Water Speed Extraction",
        definition: "Adding the two equations D = u + v and U = u - v yields u = (D + U) / 2.",
      },
      {
        term: "Stream Velocity Extraction",
        definition: "Subtracting U from D yields v = (D - U) / 2.",
      },
    ],
    formulas: [
      {
        label: "Downstream & Upstream Speeds",
        expression: "D = u + v; U = u - v",
        whenToUse: "Calculating effective travel speed in a moving river.",
        example: "Boat speed 12 km/h in still water, current 3 km/h: D = 15 km/h, U = 9 km/h.",
      },
      {
        label: "Still Water Speed & Stream Velocity",
        expression: "u = (D + U) / 2; v = (D - U) / 2",
        whenToUse: "Finding boat speed or stream speed from downstream and upstream rates.",
        example: "D = 18 km/h, U = 10 km/h => u = (18 + 10)/2 = 14 km/h, v = (18 - 10)/2 = 4 km/h.",
      },
      {
        label: "Round-Trip Average Speed",
        expression: "Avg Speed = (D x U) / u = (u^2 - v^2) / u",
        whenToUse: "Determining the average speed of a boat travelling to a point and returning to the start.",
        example: "With u = 10, v = 2: Avg speed = (100 - 4)/10 = 96/10 = 9.6 km/h.",
      },
      {
        label: "Upstream to Downstream Time Multiplier",
        expression: "u / v = (n + 1) / (n - 1)",
        whenToUse: "When upstream travel takes n times as long as downstream travel over the same distance.",
        example: "If upstream takes 3 times as long (n = 3), then u/v = (3 + 1)/(3 - 1) = 4/2 = 2/1.",
      },
    ],
    shortcuts: [
      {
        trick: "Direct Ratio u / v = (n + 1) / (n - 1)",
        whenItWorks: "Whenever a question says 'it takes n times as long to row upstream as to row downstream'. Instantly set u/v = (n + 1)/(n - 1).",
      },
      {
        trick: "Average Speed is Always Less than u",
        whenItWorks: "For any round trip in running water, the average speed (u^2 - v^2)/u is always strictly less than the still-water speed u.",
      },
      {
        trick: "Quick Check D - U = 2v",
        whenItWorks: "The difference between downstream speed and upstream speed is always exactly twice the stream speed: D - U = 2v.",
      },
    ],
    commonTraps: [
      {
        mistake: "Confusing Still Water Speed (u) with Downstream Speed (D).",
        fix: "u is speed in tranquil water. Downstream is u + v. Never use u when the boat is moving in a flowing stream.",
      },
      {
        mistake: "Forgetting that a round trip has two legs of distance d (total distance = 2d).",
        fix: "Round trip total distance = 2d, and total time = d/D + d/U.",
      },
      {
        mistake: "Using arithmetic mean (D + U)/2 for round-trip average speed.",
        fix: "The arithmetic mean (D + U)/2 gives the still water speed u, NOT the round-trip average speed! Round trip average speed is (u^2 - v^2)/u.",
      },
    ],
    workedExamples: [
      {
        question: "A boat can travel with a speed of 13 km/h in still water. If the speed of the stream is 4 km/h, find the time taken by the boat to go 68 km downstream in hours.",
        steps: [
          "Still water speed u = 13 km/h, stream speed v = 4 km/h.",
          "Downstream speed D = u + v = 13 + 4 = 17 km/h.",
          "Distance = 68 km.",
          "Time = Distance / Downstream speed = 68 / 17 = 4 hours.",
        ],
        answer: "4 hours",
        check: () => 68 / (13 + 4),
      },
      {
        question: "A man can row upstream at 8 km/h and downstream at 12 km/h. Find the speed of the boat in still water and the rate of the current in km/h.",
        steps: [
          "Given D = 12 km/h and U = 8 km/h.",
          "Speed in still water u = (D + U) / 2 = (12 + 8) / 2 = 10 km/h.",
          "Rate of current v = (D - U) / 2 = (12 - 8) / 2 = 2 km/h.",
        ],
        answer: "10 km/h still water, 2 km/h stream",
        check: () => (12 + 8) / 2,
      },
      {
        question: "A boat takes twice as long to row upstream as to row downstream between two points. If the speed of the stream is 3 km/h, find the speed of the boat in still water in km/h.",
        steps: [
          "Since upstream time is 2 times downstream time, n = 2.",
          "Using shortcut u / v = (n + 1) / (n - 1) = (2 + 1) / (2 - 1) = 3 / 1.",
          "Given v = 3 km/h.",
          "u = 3 x v = 3 x 3 = 9 km/h.",
        ],
        answer: "9 km/h",
        check: () => 3 * ((2 + 1) / (2 - 1)),
      },
      {
        question: "A man rows to a place 48 km distant and comes back in 14 hours. He finds that he can row 4 km with the stream in the same time as 3 km against the stream. Find the rate of the stream in km/h.",
        steps: [
          "Ratio of Downstream speed to Upstream speed: D / U = 4 / 3.",
          "Let D = 4k and U = 3k.",
          "Total round-trip time: 48 / (4k) + 48 / (3k) = 14.",
          "12/k + 16/k = 14 => 28/k = 14 => k = 2.",
          "So D = 4(2) = 8 km/h and U = 3(2) = 6 km/h.",
          "Rate of stream v = (D - U) / 2 = (8 - 6) / 2 = 1 km/h.",
        ],
        answer: "1 km/h",
        check: () => (8 - 6) / 2,
      },
      {
        question: "In one hour, a boat goes 11 km along the stream and 5 km against the stream. The speed of the boat in still water (in km/h) is:",
        steps: [
          "D = 11 km/h, U = 5 km/h.",
          "Speed in still water = (D + U) / 2 = (11 + 5) / 2 = 8 km/h.",
        ],
        answer: "8 km/h",
        check: () => (11 + 5) / 2,
      },
    ],
    oaExamples: [
      {
        question: "A motorboat whose speed in still water is 15 km/h goes 30 km downstream and comes back in a total of 4 hours 30 minutes. Determine the speed of the stream in km/h.",
        steps: [
          "u = 15, Total time = 4.5 hours = 9/2 hours.",
          "30/(15 + v) + 30/(15 - v) = 9/2.",
          "30 [ (15 - v + 15 + v) / (225 - v^2) ] = 9/2 => 30 [ 30 / (225 - v^2) ] = 9/2.",
          "900 / (225 - v^2) = 9/2 => 100 / (225 - v^2) = 1/2 => 225 - v^2 = 200 => v^2 = 25 => v = 5 km/h.",
        ],
        answer: "5 km/h",
      },
      {
        question: "A boat goes 24 km upstream and 28 km downstream in 6 hours. It goes 30 km upstream and 21 km downstream in 6.5 hours. Find the speed of the stream.",
        steps: [
          "Let 1/U = x, 1/D = y.",
          "24x + 28y = 6 and 30x + 21y = 6.5.",
          "Solving simultaneously gives x = 1/6 (U = 6) and y = 1/14 (D = 14).",
          "v = (D - U) / 2 = (14 - 6) / 2 = 4 km/h.",
        ],
        answer: "4 km/h",
      },
      {
        question: "If a swimmer's speed against the current is 4 km/h and speed of the current is 1.5 km/h, what is the swimmer's speed with the current in km/h?",
        steps: [
          "U = u - v = 4 km/h with v = 1.5 km/h => u = 4 + 1.5 = 5.5 km/h.",
          "D = u + v = 5.5 + 1.5 = 7 km/h.",
        ],
        answer: "7 km/h",
      },
    ],
    rememberThis: [
      "Still water speed u = (D + U)/2; Stream velocity v = (D - U)/2.",
      "The difference D - U is always equal to 2v.",
      "If upstream takes n times downstream time: u / v = (n + 1) / (n - 1).",
      "Average speed for a round trip is (u^2 - v^2) / u, which is strictly less than u.",
    ],
    relatedTopics: ["time-speed-distance", "trains", "ratio-proportion"],
  },

  // 14. Permutations & Combinations
  {
    id: "permutation-combination",
    group: "quantitative",
    title: "Permutations & Combinations",
    summary:
      "Master combinatorial counting principles, factorial operations, linear arrangements with duplicates, circular layouts, and selection groups.",
    context: {
      whyItMatters:
        "P&C forms the bedrock of discrete probability, algorithm analysis, cryptographic security, and coding theory.",
      whereItAppears:
        "Ubiquitous in tech placement exams (Amazon, Microsoft, Infosys, Capgemini, TCS Digital), CAT, GATE CS, and GMAT.",
      prerequisites: ["Factorials", "Basic Arithmetic Operations"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Hard",
    },
    keyConcepts: [
      {
        term: "Fundamental Principle of Counting",
        definition: "Multiplication Rule: If an event can occur in m ways and a subsequent event in n ways, both occur in m x n ways. Addition Rule: If mutually exclusive choices exist in m and n ways, either occurs in m + n ways.",
      },
      {
        term: "Permutation (Order Matters)",
        definition: "Arrangement of r elements selected from n distinct elements: nPr = n! / (n - r)!.",
      },
      {
        term: "Combination (Order Does Not Matter)",
        definition: "Selection of r elements from n distinct elements without regard to order: nCr = n! / [r! (n - r)!].",
      },
      {
        term: "Permutations with Repetitions",
        definition: "Number of distinct arrangements of n items where p are of one type, q of another, and r of a third is n! / (p! q! r!).",
      },
    ],
    formulas: [
      {
        label: "Permutation Formula",
        expression: "nPr = n! / (n - r)!",
        whenToUse: "Arranging r items out of n where order of placement matters.",
        example: "Arranging 3 people out of 5 in chairs: 5P3 = 5 x 4 x 3 = 60.",
      },
      {
        label: "Combination Formula & Symmetry",
        expression: "nCr = n! / [r!(n - r)!]; nCr = nC(n - r); nCr + nC(r - 1) = (n + 1)Cr",
        whenToUse: "Selecting groups, teams, or hands where order is irrelevant.",
        example: "Selecting 3 committee members from 7: 7C3 = (7 x 6 x 5) / (3 x 2 x 1) = 35.",
      },
      {
        label: "Circular Permutations",
        expression: "Arrangements in circle = (n - 1)!; Necklace/Garland = (n - 1)! / 2",
        whenToUse: "Arranging items in a circle where rotations are equivalent.",
        example: "6 people around a circular table: (6 - 1)! = 5! = 120 ways.",
      },
      {
        label: "Identical Items Partition (Stars and Bars)",
        expression: "Non-negative: (n + r - 1)C(r - 1); Positive: (n - 1)C(r - 1)",
        whenToUse: "Distributing n identical items among r distinct recipients.",
        example: "Distributing 10 identical candies among 3 children with each getting at least 1: (10 - 1)C(3 - 1) = 9C2 = 36 ways.",
      },
      {
        label: "Handshakes & Polygon Diagonals",
        expression: "Handshakes = n(n - 1) / 2; Polygon Diagonals = n(n - 3) / 2",
        whenToUse: "Pairwise handshakes or internal diagonals of an n-sided polygon.",
        example: "Diagonals of an octagon (n = 8): 8(5)/2 = 20 diagonals.",
      },
    ],
    referenceTables: [
      {
        title: "P&C Problem Classification Matrix",
        headers: ["Scenario", "Order Matters?", "Formula"],
        rows: [
          ["Ranking / Password / Words", "Yes", "nPr or n! / (p! q!)"],
          ["Committees / Teams / Cards", "No", "nCr"],
          ["Seating in Circle", "Yes (relative)", "(n - 1)!"],
          ["Beads on Necklace", "No (flippable)", "(n - 1)! / 2"],
          ["Identical objects to r people", "No", "(n + r - 1)C(r - 1)"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Complementary Counting ('At Least One')",
        whenItWorks: "Whenever a question specifies 'at least one', calculate: Total Arrangements - Arrangements with None.",
      },
      {
        trick: "String / Tie Method (Items Together)",
        whenItWorks: "When certain items must always stay together, bundle them into a single super-item, arrange the bundle with the others, then multiply by internal arrangements.",
      },
      {
        trick: "Gap Method (Items Never Together)",
        whenItWorks: "When certain items must never sit next to each other, first arrange the unrestricted items, then place the restricted items in the gaps between them.",
      },
    ],
    commonTraps: [
      {
        mistake: "Confusing Permutation (order matters) with Combination (order does not matter).",
        fix: "Ask: 'If I swap the order of two selected elements, does it create a new outcome?' If yes, use P; if no, use C.",
      },
      {
        mistake: "Forgetting to divide by internal factorials for repeated letters in anagrams.",
        fix: "Count duplicate letters and divide n! by p! q! for each repeated letter.",
      },
      {
        mistake: "Overcounting when using 'at least' without complementary counting.",
        fix: "Avoid branching into overlapping cases; use Complement = Total - None.",
      },
    ],
    workedExamples: [
      {
        question: "In how many ways can the letters of the word 'LEADER' be arranged?",
        steps: [
          "The word 'LEADER' contains 6 letters in total: L, E, A, D, E, R.",
          "Letter 'E' appears 2 times; all other letters appear once.",
          "Number of permutations = 6! / 2!.",
          "6! = 720; 2! = 2.",
          "Total ways = 720 / 2 = 360 ways.",
        ],
        answer: "360 ways",
        check: () => 720 / 2,
      },
      {
        question: "From a group of 7 men and 6 women, five persons are to be selected to form a committee so that at least 3 men are there on the committee. In how many ways can it be done?",
        steps: [
          "Case 1: 3 men and 2 women => (7C3) x (6C2) = [(7 x 6 x 5)/(3 x 2 x 1)] x [(6 x 5)/2] = 35 x 15 = 525.",
          "Case 2: 4 men and 1 woman => (7C4) x (6C1) = 35 x 6 = 210.",
          "Case 3: 5 men and 0 women => (7C5) x (6C0) = 21 x 1 = 21.",
          "Total ways = 525 + 210 + 21 = 756 ways.",
        ],
        answer: "756 ways",
        check: () => 35 * 15 + 35 * 6 + 21 * 1,
      },
      {
        question: "In how many different ways can 5 boys and 5 girls sit in a circle such that no two boys sit together?",
        steps: [
          "First, seat the 5 girls in a circle. Number of ways = (5 - 1)! = 4! = 24 ways.",
          "Once the girls are seated, they create 5 distinct gaps between them.",
          "The 5 boys can be placed in these 5 gaps in 5! ways (since the positions are now distinct relative to the girls).",
          "5! = 120 ways.",
          "Total arrangements = 4! x 5! = 24 x 120 = 2880 ways.",
        ],
        answer: "2880 ways",
        check: () => 24 * 120,
      },
      {
        question: "How many diagonals does a regular decagon (10-sided polygon) have?",
        steps: [
          "Number of diagonals in an n-sided polygon = n(n - 3) / 2.",
          "For n = 10: 10 x (10 - 3) / 2 = 10 x 7 / 2 = 35 diagonals.",
        ],
        answer: "35 diagonals",
        check: () => (10 * 7) / 2,
      },
      {
        question: "At a conference, every one of the 12 delegates shakes hands with every other delegate exactly once. How many total handshakes take place?",
        steps: [
          "Each handshake is a combination of 2 people chosen from 12.",
          "Total handshakes = 12C2 = (12 x 11) / 2 = 66 handshakes.",
        ],
        answer: "66 handshakes",
        check: () => (12 * 11) / 2,
      },
    ],
    oaExamples: [
      {
        question: "How many 4-digit numbers can be formed using digits 1, 2, 3, 4, 5, 6 without repetition such that the number is divisible by 5?",
        steps: [
          "A number is divisible by 5 if its last digit is 5.",
          "Unit digit has only 1 choice (must be 5).",
          "Remaining 3 positions can be filled by any of the remaining 5 digits: 5P3 = 5 x 4 x 3 = 60.",
          "Total numbers = 60.",
        ],
        answer: "60 numbers",
      },
      {
        question: "In how many ways can 4 prizes be distributed among 5 students when each student may receive any number of prizes?",
        steps: [
          "Each prize can be given to any of the 5 students.",
          "Number of choices for prize 1 = 5, prize 2 = 5, prize 3 = 5, prize 4 = 5.",
          "Total ways = 5^4 = 625 ways.",
        ],
        answer: "625 ways",
      },
      {
        question: "In how many ways can 6 books be chosen from 9 books such that 2 particular books are always included?",
        steps: [
          "Since 2 particular books are always included, we only need to choose 6 - 2 = 4 more books from the remaining 9 - 2 = 7 books.",
          "Number of ways = 7C4 = 7C3 = (7 x 6 x 5) / (3 x 2 x 1) = 35 ways.",
        ],
        answer: "35 ways",
      },
    ],
    rememberThis: [
      "Permutation = Order matters (nPr); Combination = Order does not matter (nCr).",
      "Always use n! / (p! q!) when arranging letters with repeating symbols.",
      "Circular permutations of n items equals (n - 1)!.",
      "For 'at least one', calculate Total - None.",
    ],
    relatedTopics: ["probability", "algebra-basics", "number-system"],
  },

  // 15. Probability
  {
    id: "probability",
    group: "quantitative",
    title: "Probability",
    summary:
      "Quantify likelihood and uncertainty across classical events, independent trials, mutually exclusive sets, card distributions, and conditional spaces.",
    context: {
      whyItMatters:
        "Probability is essential for machine learning, data science, risk modeling, and technical reasoning across quantitative assessments.",
      whereItAppears:
        "Heavily tested in campus placements (Amazon, Microsoft, Infosys, Cognizant), banking exams, CAT, and GATE.",
      prerequisites: ["Permutations & Combinations", "Fractions & Decimals"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Sample Space (S)",
        definition: "The set of all possible outcomes of a random experiment. P(S) = 1. The probability of any event E satisfies 0 <= P(E) <= 1.",
      },
      {
        term: "Classical Probability Formula",
        definition: "P(E) = n(E) / n(S) = (Number of favorable outcomes) / (Total number of equally likely outcomes).",
      },
      {
        term: "Independent Events",
        definition: "Two events A and B are independent if the occurrence of one does not affect the occurrence of the other: P(A and B) = P(A) x P(B).",
      },
      {
        term: "Mutually Exclusive Events",
        definition: "Events that cannot happen simultaneously: P(A and B) = 0. Therefore, P(A or B) = P(A) + P(B).",
      },
    ],
    formulas: [
      {
        label: "Complementary Probability",
        expression: "P(not E) = 1 - P(E); P(At least one) = 1 - P(None)",
        whenToUse: "When calculating favorable cases directly is tedious.",
        example: "Probability of getting at least one head in 3 flips = 1 - P(TTT) = 1 - 1/8 = 7/8.",
      },
      {
        label: "Addition Rule of Probability",
        expression: "P(A or B) = P(A) + P(B) - P(A and B)",
        whenToUse: "Finding the probability of either of two non-exclusive events occurring.",
        example: "Card is Ace or Spade: 4/52 + 13/52 - 1/52 = 16/52 = 4/13.",
      },
      {
        label: "Conditional Probability",
        expression: "P(A | B) = P(A and B) / P(B)",
        whenToUse: "Probability of event A given that event B has already occurred.",
        example: "If P(A and B) = 0.2 and P(B) = 0.5, P(A|B) = 0.2/0.5 = 0.4.",
      },
      {
        label: "Dice and Coin Sample Spaces",
        expression: "n Coins = 2^n; n Dice = 6^n",
        whenToUse: "Finding total outcomes for multiple independent coin tosses or dice rolls.",
        example: "Two dice give 6^2 = 36 outcomes; three coins give 2^3 = 8 outcomes.",
      },
    ],
    referenceTables: [
      {
        title: "Two-Dice Sum Probability Distribution",
        headers: ["Sum", "Favorable Combinations", "Count", "Probability"],
        rows: [
          ["2 or 12", "(1,1) or (6,6)", "1 each", "1/36"],
          ["3 or 11", "(1,2),(2,1) or (5,6),(6,5)", "2 each", "2/36 = 1/18"],
          ["4 or 10", "(1,3),(2,2),(3,1) etc.", "3 each", "3/36 = 1/12"],
          ["5 or 9", "4 combinations each", "4 each", "4/36 = 1/9"],
          ["6 or 8", "5 combinations each", "5 each", "5/36"],
          ["7", "(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)", "6 (Peak)", "6/36 = 1/6"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "The 'At Least One' Complement Trick",
        whenItWorks: "Whenever asked for P(at least one success), compute 1 - P(all failures).",
      },
      {
        trick: "Pyramid Symmetry for Sum of 2 Dice",
        whenItWorks: "For sum s between 2 and 7, count is (s - 1). For sum s between 8 and 12, count is (13 - s).",
      },
      {
        trick: "Odds to Probability Conversion",
        whenItWorks: "If odds in favor of an event are a : b, then P(E) = a / (a + b). If odds against are a : b, P(E) = b / (a + b).",
      },
    ],
    commonTraps: [
      {
        mistake: "Treating 'without replacement' draws as independent events.",
        fix: "When drawing without replacement, the total sample space decreases after each draw (e.g., from 52 to 51). Use combinations or adjusted fractions.",
      },
      {
        mistake: "Double counting the intersection in P(A or B).",
        fix: "Always subtract P(A and B) unless you know for certain that events A and B cannot occur together.",
      },
      {
        mistake: "Assuming all dice sums are equally likely.",
        fix: "The sum 7 is 6 times more likely than the sum 2 or 12.",
      },
    ],
    workedExamples: [
      {
        question: "In a single throw of two dice, what is the probability of getting a total sum of 7 or 11?",
        steps: [
          "Total outcomes when rolling 2 dice = 6 x 6 = 36.",
          "Outcomes giving sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 outcomes.",
          "Outcomes giving sum 11: (5,6), (6,5) -> 2 outcomes.",
          "These events are mutually exclusive.",
          "Total favorable outcomes = 6 + 2 = 8.",
          "Probability = 8 / 36 = 2 / 9 (approx 0.22).",
        ],
        answer: "2/9 (or 0.22)",
        check: () => 8 / 36,
      },
      {
        question: "Three unbiased coins are tossed. What is the probability of getting at least 2 heads?",
        steps: [
          "Total outcomes for 3 coins = 2^3 = 8.",
          "Sample space = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}.",
          "At least 2 heads means exactly 2 heads or 3 heads.",
          "Exactly 2 heads: {HHT, HTH, THH} -> 3 outcomes.",
          "Exactly 3 heads: {HHH} -> 1 outcome.",
          "Total favorable = 3 + 1 = 4 outcomes.",
          "Probability = 4 / 8 = 1/2 = 0.5.",
        ],
        answer: "1/2 (or 0.5)",
        check: () => 4 / 8,
      },
      {
        question: "Two cards are drawn at random from a standard pack of 52 cards without replacement. What is the probability that both are kings?",
        steps: [
          "Total number of kings in deck = 4.",
          "Total ways to choose 2 cards from 52 = 52C2 = (52 x 51) / 2 = 1326.",
          "Favorable ways to choose 2 kings from 4 = 4C2 = (4 x 3) / 2 = 6.",
          "Probability = 6 / 1326 = 1 / 221 (approx 0.0045).",
        ],
        answer: "1/221",
        check: () => 1326 / 6,
      },
      {
        question: "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?",
        steps: [
          "Total balls = 6 + 8 = 14.",
          "Number of white balls = 8.",
          "Probability = 8 / 14 = 4 / 7 (approx 0.57).",
        ],
        answer: "4/7",
        check: () => 8 / 2,
      },
      {
        question: "What is the probability of getting at least one 6 in two rolls of a fair six-sided die?",
        steps: [
          "Using complement: P(at least one 6) = 1 - P(no 6 in either roll).",
          "P(no 6 on a single roll) = 5/6.",
          "P(no 6 on two rolls) = (5/6) x (5/6) = 25/36.",
          "P(at least one 6) = 1 - 25/36 = 11/36 (approx 0.31).",
        ],
        answer: "11/36",
        check: () => 36 - 25,
      },
    ],
    oaExamples: [
      {
        question: "A problem in mathematics is given to three students A, B, C whose chances of solving it are 1/2, 1/3 and 1/4 respectively. What is the probability that the problem is solved?",
        steps: [
          "P(A fails) = 1 - 1/2 = 1/2.",
          "P(B fails) = 1 - 1/3 = 2/3.",
          "P(C fails) = 1 - 1/4 = 3/4.",
          "P(all three fail) = (1/2) x (2/3) x (3/4) = 1/4.",
          "P(problem is solved) = 1 - P(all fail) = 1 - 1/4 = 3/4.",
        ],
        answer: "3/4 (or 0.75)",
      },
      {
        question: "From a pack of 52 cards, two cards are drawn together at random. What is the probability of both being hearts or both being kings?",
        steps: [
          "Total ways = 52C2 = 1326.",
          "Both hearts: 13C2 = 78.",
          "Both kings: 4C2 = 6.",
          "Both King of Hearts is impossible since there is only 1 King of Hearts in the deck.",
          "Total favorable = 78 + 6 = 84.",
          "Probability = 84 / 1326 = 14 / 221.",
        ],
        answer: "14/221",
      },
      {
        question: "If two unbiased dice are rolled, what is the probability that the product of the two numbers obtained is even?",
        steps: [
          "Product is odd only when both numbers are odd.",
          "Odd numbers on die: {1, 3, 5} (3 choices).",
          "Total odd products = 3 x 3 = 9.",
          "P(product is odd) = 9 / 36 = 1/4.",
          "P(product is even) = 1 - 1/4 = 3/4.",
        ],
        answer: "3/4 (or 0.75)",
      },
    ],
    rememberThis: [
      "Probability is always bounded: 0 <= P(E) <= 1.",
      "P(At least one) = 1 - P(None) is the single most useful shortcut.",
      "In independent events, multiply individual probabilities: P(A and B) = P(A) x P(B).",
      "Sum of two dice totals to 7 most frequently (probability 1/6).",
    ],
    relatedTopics: ["permutation-combination", "data-sufficiency", "averages"],
  },

  // 16. Algebra Basics
  {
    id: "algebra-basics",
    group: "quantitative",
    title: "Algebra Basics",
    summary:
      "Leverage polynomial identities, quadratic discriminants, root relations, indices laws, and logarithmic properties to simplify complex expressions.",
    context: {
      whyItMatters:
        "Algebra is the underlying language of quantitative problem solving. Rapid recognition of algebraic patterns eliminates brute-force arithmetic.",
      whereItAppears:
        "Every major test including TCS NQT, Infosys, Capgemini, CAT, SSC CGL, and GATE General Aptitude.",
      prerequisites: ["Linear Equations", "Arithmetic Operations"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Polynomial Identities",
        definition: "Invertible algebraic identities such as (a+b)^2, a^2 - b^2 = (a-b)(a+b), and a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca).",
      },
      {
        term: "Quadratic Equation Roots",
        definition: "For ax^2 + bx + c = 0, roots are x = [-b +/- sqrt(b^2 - 4ac)] / 2a. Sum of roots = -b/a, product of roots = c/a.",
      },
      {
        term: "Discriminant (D)",
        definition: "D = b^2 - 4ac. If D > 0, roots are real and distinct; if D = 0, real and equal; if D < 0, complex conjugates.",
      },
      {
        term: "Laws of Exponents & Logarithms",
        definition: "a^m x a^n = a^(m+n); a^m / a^n = a^(m-n); (a^m)^n = a^(mn); log(xy) = log x + log y; log(x/y) = log x - log y; log(x^k) = k log x.",
      },
    ],
    formulas: [
      {
        label: "Core Quadratic Form & Vieta",
        expression: "x = [-b +/- sqrt(b^2 - 4ac)] / 2a; Sum = -b/a; Product = c/a",
        whenToUse: "Finding solutions or inspecting properties of quadratic equations.",
        example: "For x^2 - 5x + 6 = 0: Sum = 5, Product = 6 => roots are 2 and 3.",
      },
      {
        label: "Difference of Squares and Cubes",
        expression: "a^2 - b^2 = (a - b)(a + b); a^3 + b^3 = (a + b)(a^2 - ab + b^2); a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
        whenToUse: "Factorising polynomial expressions or simplifying division questions.",
        example: "(17^3 - 7^3) / (17^2 + 17x7 + 7^2) = 17 - 7 = 10.",
      },
      {
        label: "Conditional Identity a^3 + b^3 + c^3 = 3abc",
        expression: "If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc",
        whenToUse: "Whenever given three terms that sum to zero.",
        example: "If a = 25, b = -15, c = -10, then a + b + c = 0 => 25^3 + (-15)^3 + (-10)^3 = 3(25)(-15)(-10) = 11250.",
      },
      {
        label: "Progressions (AP & GP)",
        expression: "AP: Tn = a + (n-1)d, Sn = n/2 [2a + (n-1)d]; GP: Tn = a r^(n-1), S_inf = a / (1 - r) [|r| < 1]",
        whenToUse: "Arithmetic series with common difference d or geometric series with common ratio r.",
        example: "Sum of infinite GP 1 + 1/2 + 1/4 + ...: S = 1 / (1 - 1/2) = 2.",
      },
    ],
    shortcuts: [
      {
        trick: "Symmetric Substitution (x + 1/x)",
        whenItWorks: "If x + 1/x = k, then x^2 + 1/x^2 = k^2 - 2, and x^3 + 1/x^3 = k^3 - 3k.",
      },
      {
        trick: "Testing Option Values for Variables",
        whenItWorks: "In algebraic identities, substitute small test integers (e.g., a = 1, b = 2) to eliminate incorrect options in seconds.",
      },
      {
        trick: "Instant Sum and Product Factorisation",
        whenItWorks: "For x^2 - Sx + P = 0, look for two numbers that multiply to P and add to S.",
      },
    ],
    commonTraps: [
      {
        mistake: "Dividing both sides of an inequality by an unknown variable.",
        fix: "Never divide by a variable without knowing its sign; if negative, the inequality reverses.",
      },
      {
        mistake: "Assuming sqrt(a^2) = +/- a.",
        fix: "The principal square root sqrt(x) is always non-negative: sqrt(a^2) = |a|.",
      },
      {
        mistake: "Canceling terms without checking for zero division.",
        fix: "If you cancel (x - 2) from both sides, you must retain x = 2 as a possible root.",
      },
    ],
    workedExamples: [
      {
        question: "If x + 1/x = 5, find the value of x^2 + 1/x^2.",
        steps: [
          "Square both sides of the equation: (x + 1/x)^2 = 5^2.",
          "x^2 + 2(x)(1/x) + 1/x^2 = 25.",
          "x^2 + 2 + 1/x^2 = 25.",
          "x^2 + 1/x^2 = 25 - 2 = 23.",
        ],
        answer: "23",
        check: () => 5 * 5 - 2,
      },
      {
        question: "If x + 1/x = 4, find the value of x^3 + 1/x^3.",
        steps: [
          "Cube both sides: (x + 1/x)^3 = 4^3.",
          "x^3 + 1/x^3 + 3(x)(1/x)(x + 1/x) = 64.",
          "x^3 + 1/x^3 + 3(4) = 64.",
          "x^3 + 1/x^3 = 64 - 12 = 52.",
        ],
        answer: "52",
        check: () => 4 * 4 * 4 - 3 * 4,
      },
      {
        question: "Find the roots of the quadratic equation 2x^2 - 7x + 3 = 0.",
        steps: [
          "Here a = 2, b = -7, c = 3.",
          "Discriminant D = b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = 25.",
          "x = [-(-7) +/- sqrt(25)] / (2 x 2) = (7 +/- 5) / 4.",
          "Root 1 = (7 + 5) / 4 = 12 / 4 = 3.",
          "Root 2 = (7 - 5) / 4 = 2 / 4 = 0.5.",
        ],
        answer: "3 and 0.5",
        check: () => (7 + 5) / 4,
      },
      {
        question: "Evaluate: (0.73 x 0.73 x 0.73 + 0.27 x 0.27 x 0.27) / (0.73 x 0.73 - 0.73 x 0.27 + 0.27 x 0.27).",
        steps: [
          "Let a = 0.73 and b = 0.27.",
          "The expression is (a^3 + b^3) / (a^2 - ab + b^2).",
          "Since a^3 + b^3 = (a + b)(a^2 - ab + b^2), the expression simplifies to (a + b).",
          "a + b = 0.73 + 0.27 = 1.",
        ],
        answer: "1",
        check: () => 0.73 + 0.27,
      },
      {
        question: "Find the sum of the infinite geometric series: 3 + 1 + 1/3 + 1/9 + ...",
        steps: [
          "First term a = 3.",
          "Common ratio r = 1/3 (since |r| < 1, sum exists).",
          "S_infinity = a / (1 - r) = 3 / (1 - 1/3) = 3 / (2/3) = 3 x 3 / 2 = 4.5.",
        ],
        answer: "4.5",
        check: () => 3 / (1 - 1 / 3),
      },
    ],
    oaExamples: [
      {
        question: "If log_10(2) = 0.3010, find the value of log_10(50).",
        steps: [
          "log_10(50) = log_10(100 / 2) = log_10(100) - log_10(2).",
          "log_10(100) = 2.",
          "2 - 0.3010 = 1.6990.",
        ],
        answer: "1.699",
      },
      {
        question: "If 2^(x - 1) + 2^(x + 1) = 320, find the value of x.",
        steps: [
          "2^x / 2 + 2^x x 2 = 320.",
          "2^x [1/2 + 2] = 320 => 2^x [5/2] = 320.",
          "2^x = 320 x 2 / 5 = 64 x 2 = 128 = 2^7.",
          "x = 7.",
        ],
        answer: "7",
      },
      {
        question: "If the roots of the equation x^2 - px + q = 0 differ by 1, express p in terms of q.",
        steps: [
          "Let roots be r and r + 1.",
          "Sum of roots = 2r + 1 = p => 2r = p - 1 => r = (p - 1)/2.",
          "Product of roots = r(r + 1) = q.",
          "Alternatively, (alpha - beta)^2 = (alpha + beta)^2 - 4(alpha)(beta) => 1^2 = p^2 - 4q => p^2 = 4q + 1.",
        ],
        answer: "p^2 = 4q + 1",
      },
    ],
    rememberThis: [
      "If x + 1/x = k, then x^2 + 1/x^2 = k^2 - 2.",
      "If a + b + c = 0, then a^3 + b^3 + c^3 = 3abc.",
      "Discriminant D = b^2 - 4ac dictates whether roots are real or complex.",
      "Infinite GP sum converges only when |r| < 1: S = a / (1 - r).",
    ],
    relatedTopics: ["number-system", "geometry-mensuration", "data-sufficiency"],
  },

  // 17. Geometry & Mensuration
  {
    id: "geometry-mensuration",
    group: "quantitative",
    title: "Geometry & Mensuration",
    summary:
      "Calculate perimeters, areas, surface areas, and volumes for 2D plane figures and 3D solids using standard geometric theorems and scaling rules.",
    context: {
      whyItMatters:
        "Mensuration questions test precise spatial formula recall and dimensional unit consistency across geometric figures.",
      whereItAppears:
        "Frequently asked in campus tests (Cognizant, Infosys, TCS), SSC CGL, RRB, and state examinations.",
      prerequisites: ["Algebra Basics", "Square Roots", "Unit Conversion"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Pythagorean Theorem & Triples",
        definition: "In a right triangle, a^2 + b^2 = c^2. Common integer triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25), (9,40,41).",
      },
      {
        term: "2D Area and Perimeter",
        definition: "Triangle: 1/2 x b x h or Heron's formula sqrt[s(s-a)(s-b)(s-c)]. Equilateral: (sqrt(3)/4) a^2. Circle: Area = pi r^2, Circumference = 2 pi r.",
      },
      {
        term: "3D Surface Area and Volume",
        definition: "Cylinder: V = pi r^2 h, TSA = 2 pi r (r + h). Cone: V = (1/3) pi r^2 h, Slant height l = sqrt(r^2 + h^2). Sphere: V = (4/3) pi r^3, Area = 4 pi r^2.",
      },
      {
        term: "Geometric Similarity Scaling",
        definition: "If linear dimensions scale by factor k, perimeters scale by k, areas scale by k^2, and volumes scale by k^3.",
      },
    ],
    formulas: [
      {
        label: "Heron's Formula & Equilateral Triangle",
        expression: "Heron: A = sqrt[s(s - a)(s - b)(s - c)], where s = (a + b + c) / 2; Equilateral: A = (sqrt(3) / 4) a^2",
        whenToUse: "Area of a general triangle with known sides or an equilateral triangle.",
        example: "Equilateral triangle with side 6: Area = (sqrt(3)/4) x 36 = 9 sqrt(3).",
      },
      {
        label: "Circle, Sector & Annulus",
        expression: "Circle: A = pi r^2, C = 2 pi r; Sector Area = (theta / 360) pi r^2; Arc Length = (theta / 360) 2 pi r",
        whenToUse: "Circular regions, arc curves, and pie sector cuts.",
        example: "Sector with theta = 60 degrees, r = 6: Arc = (60/360) x 2 pi (6) = 2 pi.",
      },
      {
        label: "3D Solids Volume Matrix",
        expression: "Cuboid: V = lbh; Cylinder: V = pi r^2 h; Cone: V = (1/3) pi r^2 h; Sphere: V = (4/3) pi r^3",
        whenToUse: "Calculating capacities and volumes of 3D objects.",
        example: "Sphere with r = 3: V = (4/3) pi (27) = 36 pi.",
      },
      {
        label: "Polygon Interior Angles",
        expression: "Sum of interior angles = (n - 2) x 180 degrees; Each interior angle of regular n-gon = [(n - 2) x 180] / n",
        whenToUse: "Determining angle sums for n-sided polygons.",
        example: "Hexagon (n = 6): Sum = (6 - 2) x 180 = 720 degrees; Each regular angle = 720 / 6 = 120 degrees.",
      },
    ],
    referenceTables: [
      {
        title: "Standard 3D Mensuration Formulas",
        headers: ["Solid", "Curved / Lateral Surface Area", "Total Surface Area", "Volume"],
        rows: [
          ["Cube (side a)", "4a^2", "6a^2", "a^3"],
          ["Cuboid (l, b, h)", "2h(l + b)", "2(lb + bh + lh)", "lbh"],
          ["Cylinder (r, h)", "2 pi r h", "2 pi r (r + h)", "pi r^2 h"],
          ["Cone (r, h, l)", "pi r l", "pi r (l + r)", "(1/3) pi r^2 h"],
          ["Sphere (r)", "4 pi r^2", "4 pi r^2", "(4/3) pi r^3"],
          ["Hemisphere (r)", "2 pi r^2", "3 pi r^2", "(2/3) pi r^3"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Pythagorean Triple Multiples",
        whenItWorks: "Triangles with sides (3k, 4k, 5k) or (5k, 12k, 13k) are right-angled automatically without testing a^2 + b^2.",
      },
      {
        trick: "Percentage Change in Area (Successive)",
        whenItWorks: "If radius of a circle increases by r%, area changes by 2r + r^2/100 %.",
      },
      {
        trick: "Diagonal of a Cube",
        whenItWorks: "The longest rod that can fit inside a cube of edge a is a sqrt(3); inside a cuboid it is sqrt(l^2 + b^2 + h^2).",
      },
    ],
    commonTraps: [
      {
        mistake: "Using diameter instead of radius in circular/spherical formulas.",
        fix: "Check whether the question gives diameter d or radius r. Halve d to obtain r before squaring or cubing.",
      },
      {
        mistake: "Confusing slant height l with vertical height h in cone formulas.",
        fix: "Volume uses vertical height h; Curved Surface Area uses slant height l = sqrt(r^2 + h^2).",
      },
      {
        mistake: "Ignoring hemisphere flat base in Total Surface Area.",
        fix: "Curved surface area of a hemisphere is 2 pi r^2, but Total Surface Area includes the circular base: 3 pi r^2.",
      },
    ],
    workedExamples: [
      {
        question: "Find the area of a right-angled triangle whose hypotenuse is 13 cm and one of the other sides is 5 cm in cm^2.",
        steps: [
          "By Pythagorean theorem: a^2 + b^2 = c^2 => 5^2 + b^2 = 13^2.",
          "25 + b^2 = 169 => b^2 = 144 => b = 12 cm.",
          "Area = 1/2 x base x height = 1/2 x 5 x 12 = 30 cm^2.",
        ],
        answer: "30 cm^2",
        check: () => (5 * 12) / 2,
      },
      {
        question: "The circumference of a circle is 44 cm. What is its area in cm^2? (Take pi = 22/7)",
        steps: [
          "Circumference = 2 x pi x r = 44.",
          "2 x (22/7) x r = 44 => (44/7) x r = 44 => r = 7 cm.",
          "Area = pi x r^2 = (22/7) x 7^2 = 22 x 7 = 154 cm^2.",
        ],
        answer: "154 cm^2",
        check: () => (22 / 7) * 49,
      },
      {
        question: "What is the length of the longest pole that can be placed in a room 12 m long, 9 m broad and 8 m high in metres?",
        steps: [
          "The longest pole corresponds to the spatial body diagonal of the cuboid.",
          "Diagonal = sqrt(l^2 + b^2 + h^2).",
          "l = 12, b = 9, h = 8.",
          "l^2 + b^2 + h^2 = 12^2 + 9^2 + 8^2 = 144 + 81 + 64 = 289.",
          "sqrt(289) = 17 metres.",
        ],
        answer: "17 metres",
        check: () => Math.sqrt(144 + 81 + 64),
      },
      {
        question: "If the radius of a circle is increased by 20%, by what percentage does its area increase?",
        steps: [
          "Area is proportional to r^2.",
          "Net percentage change for two successive increases of 20% = a + b + ab/100.",
          "Net change = 20 + 20 + (20 x 20)/100 = 40 + 4 = 44%.",
        ],
        answer: "44%",
        check: () => 20 + 20 + (20 * 20) / 100,
      },
      {
        question: "A solid metallic sphere of radius 3 cm is melted and recast into small spherical balls each of radius 0.5 cm. How many small balls are formed?",
        steps: [
          "Number of balls = Volume of large sphere / Volume of one small ball.",
          "Volume is proportional to r^3.",
          "Number of balls = (R / r)^3 = (3 / 0.5)^3 = 6^3 = 216.",
        ],
        answer: "216 balls",
        check: () => Math.pow(3 / 0.5, 3),
      },
    ],
    oaExamples: [
      {
        question: "The perimeter of an equilateral triangle is 18 cm. Find its area in cm^2.",
        steps: [
          "Side a = 18 / 3 = 6 cm.",
          "Area = (sqrt(3)/4) x a^2 = (sqrt(3)/4) x 36 = 9 sqrt(3) cm^2 (approx 15.59 cm^2).",
        ],
        answer: "9 sqrt(3) cm^2 (or 15.59)",
      },
      {
        question: "A cylinder and a cone have equal base radii and equal heights. What is the ratio of their volumes?",
        steps: [
          "V_cylinder = pi r^2 h.",
          "V_cone = (1/3) pi r^2 h.",
          "Ratio = (pi r^2 h) / [(1/3) pi r^2 h] = 3 : 1.",
        ],
        answer: "3:1",
      },
      {
        question: "Find the total surface area of a solid hemisphere of radius 7 cm in cm^2. (Use pi = 22/7)",
        steps: [
          "Total surface area of solid hemisphere = 3 pi r^2.",
          "TSA = 3 x (22/7) x 7^2 = 3 x 22 x 7 = 462 cm^2.",
        ],
        answer: "462 cm^2",
      },
    ],
    rememberThis: [
      "Linear scaling k changes perimeter by k, area by k^2, and volume by k^3.",
      "Hemisphere Total Surface Area is 3 pi r^2 (including the circular flat top).",
      "The longest rod in a cuboid room is sqrt(l^2 + b^2 + h^2).",
      "Common Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25).",
    ],
    relatedTopics: ["algebra-basics", "number-system", "ratio-proportion"],
  },

  // 18. Clocks & Calendars
  {
    id: "clocks-calendars",
    group: "quantitative",
    title: "Clocks & Calendars",
    summary:
      "Calculate hand angular separations, overlap points, gain/loss timing, and leap-year odd days to determine exact weekdays and clock positions.",
    context: {
      whyItMatters:
        "Clocks and Calendars questions test modular arithmetic, relative angular velocities, and periodic calendar cycles.",
      whereItAppears:
        "Regularly tested in campus recruitment drives (Wipro, TCS, Capgemini), banking exams (IBPS/SBI), and UPSC CSAT.",
      prerequisites: ["Modular Arithmetic", "Basic Fractions"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Medium",
    },
    keyConcepts: [
      {
        term: "Hand Angular Speeds",
        definition: "The minute hand moves at 360 / 60 = 6 degrees/min. The hour hand moves at 360 / 720 = 0.5 degrees/min. Relative speed = 6 - 0.5 = 5.5 = 11/2 degrees/min.",
      },
      {
        term: "Angle Formula at H:M",
        definition: "Angle theta = |30H - 5.5M| or |30H - (11/2)M|. If theta > 180 degrees, the reflex angle is 360 - theta.",
      },
      {
        term: "Coincidence and Right Angles",
        definition: "Hands coincide every 720/11 = 65 5/11 minutes (11 times in 12 hours, 22 times in 24 hours). Hands are at right angles 22 times in 12 hours (44 times in 24 hours).",
      },
      {
        term: "Calendar Odd Days",
        definition: "An ordinary year of 365 days has 52 weeks + 1 odd day. A leap year of 366 days has 52 weeks + 2 odd days. A century year must be divisible by 400 to be a leap year.",
      },
    ],
    formulas: [
      {
        label: "Angle Between Clock Hands",
        expression: "theta = |30H - 5.5M|",
        whenToUse: "Finding the acute angle between hour and minute hands at time H hours and M minutes.",
        example: "At 3:30: |30(3) - 5.5(30)| = |90 - 165| = 75 degrees.",
      },
      {
        label: "Coincidence Time in an Hour",
        expression: "M = (30H) / 5.5 = (60H) / 11 minutes past H",
        whenToUse: "Finding the exact minute when the hands overlap between H and H+1 o'clock.",
        example: "Between 4 and 5 o'clock: M = (60 x 4)/11 = 240/11 = 21 9/11 minutes past 4.",
      },
      {
        label: "Century Odd Days Cycle",
        expression: "100 years = 5 odd days; 200 years = 3; 300 years = 1; 400 years = 0",
        whenToUse: "Finding day of the week for dates across centuries.",
        example: "The year 2000 has 0 odd days since it is divisible by 400.",
      },
      {
        label: "Weekday Day Codes",
        expression: "0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday",
        whenToUse: "Converting accumulated total odd days modulo 7 into the weekday.",
        example: "Total odd days = 17 => 17 mod 7 = 3 => Wednesday.",
      },
    ],
    referenceTables: [
      {
        title: "Monthly Odd Days in Ordinary vs Leap Year",
        headers: ["Month", "Days", "Odd Days (Ordinary)", "Odd Days (Leap)"],
        rows: [
          ["January", "31", "3", "3"],
          ["February", "28 / 29", "0", "1"],
          ["March", "31", "3", "3"],
          ["April", "30", "2", "2"],
          ["May", "31", "3", "3"],
          ["June", "30", "2", "2"],
          ["July", "31", "3", "3"],
          ["August", "31", "3", "3"],
          ["September", "30", "2", "2"],
          ["October", "31", "3", "3"],
          ["November", "30", "2", "2"],
          ["December", "31", "3", "3"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Relative Speed of Hands (5.5 deg/min)",
        whenItWorks: "To calculate how many minutes it takes for the minute hand to gain D degrees over the hour hand, divide D by 5.5 (or multiply by 2/11).",
      },
      {
        trick: "Century Leap Year Rule",
        whenItWorks: "Years ending in 00 (e.g., 1700, 1800, 1900) are NOT leap years unless divisible by 400 (1600, 2000, 2400 are leap years).",
      },
      {
        trick: "Same Calendar Year Repeat",
        whenItWorks: "A leap year repeats after 28 years. A non-leap year repeats after 6 or 11 years (test for 0 net odd days).",
      },
    ],
    commonTraps: [
      {
        mistake: "Treating 1900 as a leap year because it is divisible by 4.",
        fix: "Century years must be divisible by 400 to be leap years. 1900 is NOT a leap year; 2000 IS a leap year.",
      },
      {
        mistake: "Reporting an angle greater than 180 degrees.",
        fix: "The angle between two hands is always the smaller angle. If |30H - 5.5M| gives 285 degrees, the answer is 360 - 285 = 75 degrees.",
      },
      {
        mistake: "Assuming hands coincide 12 times in 12 hours.",
        fix: "Hands coincide only 11 times in 12 hours because the 11-12 and 12-1 overlaps merge into exactly one at 12:00.",
      },
    ],
    workedExamples: [
      {
        question: "Find the angle between the hour hand and the minute hand of a clock at 3:40.",
        steps: [
          "Use formula: theta = |30H - 5.5M|.",
          "Here H = 3 and M = 40.",
          "theta = |30(3) - 5.5(40)| = |90 - 220| = |-130| = 130 degrees.",
          "Since 130 <= 180, the angle between the hands is 130 degrees.",
        ],
        answer: "130 degrees",
        check: () => Math.abs(30 * 3 - 5.5 * 40),
      },
      {
        question: "At what time between 4 and 5 o'clock will the hands of a watch point in opposite directions (straight line, 180 deg)?",
        steps: [
          "At 4 o'clock, the minute hand is at 0 min and the hour hand is at 20 min (separated by 120 degrees).",
          "For opposite direction, angular separation must be 180 degrees.",
          "Total angle to be gained = 120 + 180 = 300 degrees.",
          "Time taken = 300 / 5.5 = 600 / 11 = 54 6/11 minutes past 4.",
        ],
        answer: "54 6/11 minutes past 4 (or 54.55)",
        check: () => 600 / 11,
      },
      {
        question: "It was Sunday on Jan 1, 2006. What was the day of the week on Jan 1, 2010?",
        steps: [
          "Total number of years from 2006 to 2010 = 4 years.",
          "2006, 2007, 2009 are ordinary years (1 odd day each = 3 odd days).",
          "2008 is a leap year (2 odd days).",
          "Total odd days = 3 + 2 = 5 odd days.",
          "Sunday + 5 days = Friday.",
        ],
        answer: "Friday",
        check: () => (3 * 1 + 1 * 2) % 7,
      },
      {
        question: "How many times do the hands of a clock coincide in a day (24 hours)?",
        steps: [
          "The hands coincide once every 65 5/11 minutes.",
          "In 12 hours, they coincide 11 times.",
          "In 24 hours, they coincide 11 x 2 = 22 times.",
        ],
        answer: "22 times",
        check: () => 11 * 2,
      },
      {
        question: "What was the day of the week on 15th August 1947?",
        steps: [
          "1600 years = 0 odd days.",
          "300 years (1601 to 1900) = 1 odd day.",
          "46 years (1901 to 1946) = 11 leap years + 35 ordinary years = 11(2) + 35(1) = 22 + 35 = 57 odd days = 1 odd day (57 mod 7).",
          "Year 1947 until August 15: Jan(3) + Feb(0) + Mar(3) + Apr(2) + May(3) + Jun(2) + Jul(3) + Aug(15) = 31 days = 3 odd days (31 mod 7).",
          "Total odd days = 0 + 1 + 1 + 3 = 5 odd days.",
          "Day code 5 corresponds to Friday.",
        ],
        answer: "Friday",
        check: () => (0 + 1 + 1 + 3) % 7,
      },
    ],
    oaExamples: [
      {
        question: "At what time between 7 and 8 o'clock will the hands of a clock be at right angles (90 degrees) for the first time?",
        steps: [
          "At 7 o'clock, the angle is 30 x 7 = 210 degrees.",
          "To be at 90 degrees for the first time, minute hand must gain 210 - 90 = 120 degrees.",
          "Time = 120 / 5.5 = 240 / 11 = 21 9/11 minutes past 7.",
        ],
        answer: "21 9/11 minutes past 7",
      },
      {
        question: "A watch gains 5 seconds in 3 minutes and was set right at 8 AM. What time will it show at 10 PM on the same day?",
        steps: [
          "From 8 AM to 10 PM is 14 hours = 14 x 60 = 840 minutes.",
          "Gain in 3 minutes = 5 seconds.",
          "Total gain in 840 minutes = (5 / 3) x 840 = 5 x 280 = 1400 seconds.",
          "1400 seconds = 23 minutes 20 seconds.",
          "Time shown = 10:23:20 PM.",
        ],
        answer: "10:23:20 PM",
      },
      {
        question: "Which year will have the same calendar as 2007?",
        steps: [
          "Count odd days starting from 2007: 2007 (1), 2008 (2), 2009 (1), 2010 (1), 2011 (1) -> Sum = 6 odd days.",
          "2012 (2) -> Sum = 8 odd days.",
          "2013 (1), 2014 (1), 2015 (1), 2016 (2), 2017 (1) -> Sum = 14 odd days (divisible by 7).",
          "The next year 2018 will have the same calendar as 2007.",
        ],
        answer: "2018",
      },
    ],
    rememberThis: [
      "Angle between clock hands: theta = |30H - 5.5M|.",
      "The hands coincide 11 times in 12 hours (22 times in 24 hours).",
      "Ordinary year = 1 odd day; Leap year = 2 odd days.",
      "Century years are leap years ONLY if divisible by 400.",
    ],
    relatedTopics: ["number-system", "time-speed-distance", "averages"],
  },

  // 19. Data Sufficiency
  {
    id: "data-sufficiency",
    group: "quantitative",
    title: "Data Sufficiency",
    summary:
      "Determine whether given mathematical statements provide sufficient information to answer value or yes/no questions without calculating full numerical solutions.",
    context: {
      whyItMatters:
        "Data Sufficiency evaluates analytical efficiency, decision making, and logical necessity rather than mechanical computation.",
      whereItAppears:
        "Universal in GMAT, CAT, NMAT, SNAP, and advanced rounds of tech assessments (TCS Digital, Capgemini, Infosys).",
      prerequisites: ["Number System", "Algebra Basics", "Percentages"],
      targetTimePerQuestion: "60-90 s",
      difficultyLevel: "Hard",
    },
    keyConcepts: [
      {
        term: "The Sufficiency Standard",
        definition: "A statement is sufficient if it yields ONE and only one definite value for value questions, or a definitive YES or definitive NO for binary questions.",
      },
      {
        term: "The 12-TEN Elimination Framework",
        definition: "Test Statement (1) alone. If sufficient, options reduce to (A) or (D). If insufficient, options reduce to (B), (C), or (E). Then test Statement (2) independently.",
      },
      {
        term: "Standard DS Five Options",
        definition: "(A) Statement (1) ALONE is sufficient, but (2) is not. (B) Statement (2) ALONE is sufficient, but (1) is not. (C) BOTH statements TOGETHER are sufficient. (D) EACH statement ALONE is sufficient. (E) Statements (1) and (2) TOGETHER are NOT sufficient.",
      },
      {
        term: "The Binary Yes/No Rule",
        definition: "In Yes/No questions, a statement that conclusively answers 'NO' for all cases is SUFFICIENT. Only an ambiguous 'sometimes Yes, sometimes No' is insufficient.",
      },
    ],
    formulas: [
      {
        label: "Sufficiency Decision Flow",
        expression: "Step 1: Simplify Q -> Step 2: Test (1) alone -> Step 3: Test (2) alone -> Step 4: If needed, combine (1) + (2)",
        whenToUse: "Rigorous execution order to avoid bias and premature statement combining.",
        example: "Testing (2) must be done completely forgetting Statement (1).",
      },
      {
        label: "Linear System Solvability Rule",
        expression: "n independent linear equations for n variables yields a unique solution",
        whenToUse: "Algebraic DS questions with multiple variables.",
        example: "2x + 3y = 12 and 4x + 6y = 24 are dependent (same equation), hence insufficient to find x.",
      },
      {
        label: "Number of Factors / Integer Constraints",
        expression: "If x is integer and x^2 = 25 => x = +/- 5 (Insufficient if sign is not restricted)",
        whenToUse: "Quadratic or absolute value equations that yield two roots.",
        example: "x^2 = 36 gives x = 6 or -6. If asked 'Is x > 0?', it is insufficient.",
      },
      {
        label: "Ratio vs Absolute Value Criterion",
        expression: "Ratio alone cannot determine absolute value without at least one concrete scalar quantity",
        whenToUse: "Questions asking for age, salary, or count when statements only supply ratios.",
        example: "Knowing A:B = 3:4 cannot give A's salary unless a sum, difference, or concrete value is provided.",
      },
    ],
    referenceTables: [
      {
        title: "Standard GMAT / CAT Data Sufficiency Options",
        headers: ["Option", "Statement 1 Alone?", "Statement 2 Alone?", "Combined Together?"],
        rows: [
          ["(A)", "Sufficient", "Insufficient", "Not needed"],
          ["(B)", "Insufficient", "Sufficient", "Not needed"],
          ["(C)", "Insufficient", "Insufficient", "Sufficient together"],
          ["(D)", "Sufficient", "Sufficient", "Not needed"],
          ["(E)", "Insufficient", "Insufficient", "Still Insufficient"],
        ],
      },
    ],
    shortcuts: [
      {
        trick: "Stop Solving Once Sufficiency is Guaranteed",
        whenItWorks: "Do not waste time doing the final multiplication or division. If an equation has 1 linear unknown, it is guaranteed solvable.",
      },
      {
        trick: "Forget Statement (1) When Testing Statement (2)",
        whenItWorks: "Always cover Statement (1) with your hand when evaluating Statement (2) to prevent accidental carryover bias.",
      },
      {
        trick: "Test Extreme Numbers (0, 1, -1, Fractions)",
        whenItWorks: "When testing inequality statements, plug in 0, 1, -1, 1/2, and -1/2 to look for counterexamples.",
      },
    ],
    commonTraps: [
      {
        mistake: "Assuming variables are positive integers.",
        fix: "Unless explicitly stated that x is an integer, x could be a negative number, zero, or a fraction (e.g. -0.5).",
      },
      {
        mistake: "Carrying information from Statement (1) into Statement (2).",
        fix: "Statement (2) must be evaluated in total isolation before deciding to combine both.",
      },
      {
        mistake: "Believing a 'NO' answer means insufficient.",
        fix: "A definitive, consistent 'NO' means the statement provides sufficient information to answer the question.",
      },
    ],
    workedExamples: [
      {
        question: "Is the integer x even? Statement (1): 2x is an even integer. Statement (2): x / 2 is an integer.",
        steps: [
          "Question: Is x even? (Yes/No).",
          "Test Statement (1): 2x is even. If x = 1 (odd), 2x = 2 (even). If x = 2 (even), 2x = 4 (even). x can be odd or even. NOT sufficient.",
          "Test Statement (2): x/2 is an integer. This means x = 2k for some integer k, so x must be a multiple of 2, hence x is always even (Definite YES). SUFFICIENT.",
          "Therefore, Statement (2) alone is sufficient, but (1) is not (Option B).",
        ],
        answer: "Statement (2) alone is sufficient (Option B)",
        check: () => 2,
      },
      {
        question: "What is the value of x? Statement (1): x^2 - 5x + 6 = 0. Statement (2): x > 2.",
        steps: [
          "Test Statement (1): (x - 2)(x - 3) = 0 => x = 2 or x = 3. Two possible values, not unique. NOT sufficient.",
          "Test Statement (2): x > 2. Infinitely many values. NOT sufficient.",
          "Combine (1) and (2): From (1), x = 2 or 3. From (2), x > 2, which eliminates x = 2, leaving uniquely x = 3. Both together are SUFFICIENT.",
          "Therefore, Option C (both together needed).",
        ],
        answer: "Both statements together are sufficient (Option C)",
        check: () => 3,
      },
      {
        question: "What is the average of integers a, b, and c? Statement (1): a + b = 14. Statement (2): c = 7.",
        steps: [
          "Average = (a + b + c) / 3.",
          "Test Statement (1): a + b = 14. c is unknown. NOT sufficient.",
          "Test Statement (2): c = 7. a + b is unknown. NOT sufficient.",
          "Combine (1) and (2): a + b + c = 14 + 7 = 21. Average = 21 / 3 = 7. Unique answer obtained. Both together SUFFICIENT.",
        ],
        answer: "7 (Option C)",
        check: () => (14 + 7) / 3,
      },
      {
        question: "Is x > y? Statement (1): x + z > y + z. Statement (2): xz > yz.",
        steps: [
          "Test Statement (1): Subtract z from both sides: x > y. This directly answers the question with a definite YES. SUFFICIENT.",
          "Test Statement (2): xz > yz. If z > 0, x > y. If z < 0, dividing by z reverses the sign, giving x < y. Since sign of z is unknown, NOT sufficient.",
          "Therefore, Statement (1) alone is sufficient (Option A).",
        ],
        answer: "Statement (1) alone is sufficient (Option A)",
        check: () => 1,
      },
      {
        question: "What is the ratio of two numbers x and y? Statement (1): 3x = 5y. Statement (2): x - y = 10.",
        steps: [
          "Question asks for ratio x / y.",
          "Test Statement (1): 3x = 5y => x / y = 5 / 3. Unique ratio found! SUFFICIENT.",
          "Test Statement (2): x - y = 10. Could be (11, 1) giving ratio 11, or (20, 10) giving ratio 2. NOT sufficient.",
          "Therefore, Statement (1) alone is sufficient (Option A).",
        ],
        answer: "Statement (1) alone is sufficient (Option A)",
        check: () => 1,
      },
    ],
    oaExamples: [
      {
        question: "Is integer n divisible by 6? Statement (1): n is divisible by 2. Statement (2): n is divisible by 3.",
        steps: [
          "To be divisible by 6, n must be divisible by both 2 and 3.",
          "Statement (1) alone: 4 is divisible by 2 but not 6; 6 is divisible by 2 and 6. Insufficient.",
          "Statement (2) alone: 9 is divisible by 3 but not 6; 6 is divisible by 3 and 6. Insufficient.",
          "Combined: Since 2 and 3 are coprime, any integer divisible by both 2 and 3 must be divisible by 2 x 3 = 6. Definite YES. Sufficient.",
        ],
        answer: "Both statements together are sufficient (Option C)",
      },
      {
        question: "What is the value of 2-digit number N? Statement (1): Sum of digits is 7. Statement (2): Difference of digits is 3.",
        steps: [
          "Statement (1): N could be 16, 25, 34, 43, 52, 61, 70. Insufficient.",
          "Statement (2): N could be 14, 41, 25, 52, etc. Insufficient.",
          "Combined: Digits could be (5,2) yielding 52 or 25. Two values still possible, so not unique. Insufficient.",
        ],
        answer: "Statements together are NOT sufficient (Option E)",
      },
      {
        question: "Is x^2 > x? Statement (1): x > 1. Statement (2): x > 0.",
        steps: [
          "x^2 > x holds whenever x < 0 or x > 1.",
          "Statement (1): If x > 1, x^2 is always strictly greater than x. Definite YES. Sufficient.",
          "Statement (2): If x = 0.5, (0.5)^2 = 0.25 < 0.5 (NO). If x = 2, 2^2 = 4 > 2 (YES). Ambiguous. Insufficient.",
          "Statement (1) alone is sufficient (Option A).",
        ],
        answer: "Statement (1) alone is sufficient (Option A)",
      },
    ],
    rememberThis: [
      "Never carry information from Statement (1) into Statement (2).",
      "In yes/no questions, a definite 'NO' is completely SUFFICIENT.",
      "Recognize linear solvability: stop calculating the moment uniqueness is proven.",
      "Check fractions and negative numbers before concluding sufficiency on inequalities.",
    ],
    relatedTopics: ["algebra-basics", "number-system", "percentages"],
  },
];
