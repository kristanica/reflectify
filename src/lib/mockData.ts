export const CONSUMABLE_DATABASE = [
  {
    id: "hack_5050",
    name: "50/50 Filter",
    description:
      "Instantly eliminates two incorrect options on a Multiple Choice question.",
    cost: 50,
    icon: "✂️",
    type: "CONSUMABLE",
    effect: "FIFTY_FIFTY",
    value: 2,
  },
  {
    id: "hack_skip",
    name: "Zero-Day Exploit",
    description:
      "Instantly bypasses the current question, marking it as correct and continuing your streak.",
    cost: 150, // Expensive, but guaranteed survival
    icon: "⏭️",
    type: "CONSUMABLE",
    effect: "SKIP_QUESTION",
    value: 1,
  },
  {
    id: "hack_freeze",
    name: "Cryostasis",
    description:
      "Freezes the question timer completely until you submit your answer.",
    cost: 75,
    icon: "❄️",
    type: "CONSUMABLE",
    effect: "FREEZE_TIMER",
    value: 1,
  },
  {
    id: "hack_siphon",
    name: "Siphon Script",
    description:
      "Instantly sacrifice your entire Combo Streak to gain +15 Credits for every streak point lost.",
    cost: 25, // Cheap to buy, but costs your momentum to use
    icon: "💉",
    type: "CONSUMABLE",
    effect: "SIPHON_STREAK",
    value: 15,
  },
  {
    id: "hack_ransomware",
    name: "Ransomware",
    description:
      "Lose exactly 50% of your current banked Credits, but instantly heal your Lives back to maximum.",
    cost: 50,
    icon: "💀",
    type: "CONSUMABLE",
    effect: "RANSOMWARE",
    value: 0.5,
  },
  {
    id: "hack_memory_leak",
    name: "Memory Leak",
    description:
      "Instantly doubles your current banked Credits (up to a maximum gain of +150 Credits).",
    cost: 50,
    icon: "📈",
    type: "CONSUMABLE",
    effect: "MEMORY_LEAK",
    value: 150, // Max cap
  },
];

export const MOCK_INVENTORY: ShopItem[] = [
  {
    id: "hack_5050",
    name: "50/50 Filter",
    description:
      "Instantly eliminates two incorrect options on a Multiple Choice question.",
    cost: 50,
    icon: "✂️",
    type: "CONSUMABLE",
    effect: "FIFTY_FIFTY",
    value: 2,
    quantity: 99,
  },
  {
    id: "hack_skip",
    name: "Zero-Day Exploit",
    description:
      "Instantly bypasses the current question, marking it as correct and continuing your streak.",
    cost: 150, // Expensive, but guaranteed survival
    icon: "⏭️",
    type: "CONSUMABLE",
    effect: "SKIP_QUESTION",
    value: 1,
    quantity: 99,
  },
  {
    id: "hack_freeze",
    name: "Cryostasis",
    description:
      "Freezes the question timer completely until you submit your answer.",
    cost: 75,
    icon: "❄️",
    type: "CONSUMABLE",
    effect: "FREEZE_TIMER",
    value: 1,
    quantity: 99,
  },
  {
    id: "hack_siphon",
    name: "Siphon Script",
    description:
      "Instantly sacrifice your entire Combo Streak to gain +15 Credits for every streak point lost.",
    cost: 25, // Cheap to buy, but costs your momentum to use
    icon: "💉",
    type: "CONSUMABLE",
    effect: "SIPHON_STREAK",
    value: 15,
    quantity: 99,
  },
  {
    id: "hack_ransomware",
    name: "Ransomware",
    description:
      "Lose exactly 50% of your current banked Credits, but instantly heal your Lives back to maximum.",
    cost: 50,
    icon: "💀",
    type: "CONSUMABLE",
    effect: "RANSOMWARE",
    value: 0.5,
    quantity: 99,
  },
  {
    id: "hack_memory_leak",
    name: "Memory Leak",
    description:
      "Instantly doubles your current banked Credits (up to a maximum gain of +150 Credits).",
    cost: 50,
    icon: "📈",
    type: "CONSUMABLE",
    effect: "MEMORY_LEAK",
    value: 150, // Max cap
    quantity: 99,
  },
];

export const AUGMENTS: ShopItem[] = [
  {
    id: "aug_metronome",
    name: "The Metronome",
    description:
      "Answering correctly in under 3 seconds grants +20 Credits. Taking longer than 10 seconds deducts -5 Credits.",
    cost: 150,
    icon: "⏱️",
    type: "PASSIVE",
    effect: "SPEED_PAYOUT",
    value: 20,
  },
  {
    id: "aug_sandbox",
    name: "The Sandbox",
    description:
      "Sets Lives to 1. Defeat the next Boss without taking damage to permanently increase MAX Lives by +2.",
    cost: 250,
    icon: "📦",
    type: "PASSIVE",
    effect: "RISK_MAX_LIVES",
    value: 2,
  },
  {
    id: "aug_dictionary",
    name: "The Dictionary Attack",
    description:
      "ANSWER button is disabled. Clicking an option instantly submits it. Every correct answer gives +5 bonus Credits.",
    cost: 100,
    icon: "📖",
    type: "PASSIVE",
    effect: "INSTANT_SUBMIT_PAYOUT",
    value: 5,
  },
  {
    id: "aug_rubber_band",
    name: "The Rubber Band",
    description:
      "If you are currently at exactly 1 Life, all Credit payouts from all sources are doubled.",
    cost: 175,
    icon: "🎗️",
    type: "PASSIVE",
    effect: "ADRENALINE_MULTIPLIER",
    value: 2,
  },
  {
    id: "aug_scapegoat",
    name: "The Scapegoat",
    description:
      "Absorbs a fatal error when at 1 Life, instantly healing you to full Lives before permanently deleting itself.",
    cost: 300,
    icon: "🐐",
    type: "PASSIVE",
    effect: "FATAL_OVERRIDE",
    value: 3, // Amount of lives it restores
  },
  {
    id: "aug_crammer",
    name: "Crammer's Algorithm",
    description:
      "True/False questions grant double Credits, but getting a Multiple Choice question wrong deals 2 Damage.",
    cost: 125,
    icon: "🧠",
    type: "PASSIVE",
    effect: "TF_MULTIPLIER",
    value: 2,
  },
  {
    id: "aug_synthesizer",
    name: "The Synthesizer",
    description:
      "Every time you lose a Life, the system instantly generates a random Hack (Consumable) in one of your empty slots.",
    cost: 200,
    icon: "🧪",
    type: "PASSIVE",
    effect: "DAMAGE_SYNTHESIS",
    value: 1,
  },
];



export const mockQuestions  = [
  {
    conceptId: "concept-001",
    type: "MULTIPLE_CHOICE",
    question: "Which statement best describes spaced repetition?",
    options: [
      "Reviewing material at increasing intervals over time (Answer)",
      "Reading all material once before an exam",
      "Studying only the easiest topics first",
      "Memorizing facts without testing recall",
    ],
    answer: "Reviewing material at increasing intervals over time",
    explanation:
      "Spaced repetition strengthens long-term memory by timing reviews before knowledge is likely to fade.",
  },
  {
    conceptId: "concept-002",
    type: "MULTIPLE_CHOICE",
    question:
      "What is the main purpose of active recall during studying?",
    options: [
      "To retrieve information from memory instead of only recognizing it (Answer)",
      "To avoid answering questions until the exam",
      "To make notes longer and more decorative",
      "To replace all review with passive rereading",
    ],
    answer:
      "To retrieve information from memory instead of only recognizing it",
    explanation:
      "Active recall improves retention because the learner must reconstruct the answer from memory.",
  },
  {
    conceptId: "concept-003",
    type: "MULTIPLE_CHOICE",
    question:
      "What is the main purpose of a concept in Reflectify's quiz generation flow?",
    options: [
      "To provide an atomic study idea that questions can be generated from (Answer)",
      "To determine the player's avatar appearance",
      "To replace the need for a deck",
      "To store shop item prices",
    ],
    answer:
      "To provide an atomic study idea that questions can be generated from",
    explanation:
      "Concepts act as small, quiz-ready knowledge units that the run can use for just-in-time question generation.",
  },
  {
    conceptId: "concept-004",
    type: "MULTIPLE_CHOICE",
    question:
      "Which option best describes a useful explanation after a quiz answer?",
    options: [
      "It explains why the answer is correct and helps repair misunderstanding (Answer)",
      "It repeats the answer without extra detail",
      "It gives unrelated trivia to make the card longer",
      "It hides the reasoning so the player must guess again",
    ],
    answer:
      "It explains why the answer is correct and helps repair misunderstanding",
    explanation:
      "Good explanations teach the underlying reason, helping the learner recover from mistakes and remember the concept.",
  },
  {
    conceptId: "concept-005",
    type: "BOSS_SCENARIO",
    question:
      "You are deep in a run and the system asks you to explain why passive rereading is weaker than active recall. Which answer best survives the boss check?",
    options: [
      "Active recall forces retrieval from memory, which strengthens learning more than simply recognizing familiar text (Answer)",
      "Passive rereading is always useless and should never be used",
      "Active recall only works when questions are multiple choice",
      "Passive rereading is better because it feels easier",
    ],
    answer:
      "Active recall forces retrieval from memory, which strengthens learning more than simply recognizing familiar text",
    explanation:
      "The strongest answer explains the mechanism: retrieval practice builds memory more effectively than familiarity from rereading.",
  },
  {
    conceptId: "concept-006",
    type: "MULTIPLE_CHOICE",
    question:
      "In a roguelike study run, why should difficulty usually be controlled by the game loop rather than by ingest settings?",
    options: [
      "Because the run loop should manage escalation, pressure, and randomness consistently (Answer)",
      "Because uploaded study material cannot contain difficult ideas",
      "Because all players should always receive the same questions",
      "Because difficulty should be chosen only after the final boss",
    ],
    answer:
      "Because the run loop should manage escalation, pressure, and randomness consistently",
    explanation:
      "Keeping difficulty in the run loop preserves the roguelike structure where danger and challenge evolve during play.",
  },
  {
    conceptId: "concept-007",
    type: "MULTIPLE_CHOICE",
    question:
      "What should a deck seed primarily provide to a Reflectify run?",
    options: [
      "Source concepts that the run can transform into questions (Answer)",
      "A fixed difficulty curve chosen by the player",
      "Permanent shop prices for every future run",
      "A replacement for session history",
    ],
    answer:
      "Source concepts that the run can transform into questions",
    explanation:
      "The deck is the study seed. The run system decides pacing, challenge, bosses, and rewards.",
  },
  {
    conceptId: "concept-008",
    type: "MULTIPLE_CHOICE",
    question:
      "If a generated question has no valid answer, what should the system do?",
    options: [
      "Filter or regenerate it before showing it to the player (Answer)",
      "Show it anyway to preserve speed",
      "Mark every option as correct",
      "Delete the player's current run",
    ],
    answer:
      "Filter or regenerate it before showing it to the player",
    explanation:
      "Broken questions make scoring unfair and damage trust, so they should not be shown as normal playable questions.",
  },
  {
    conceptId: "concept-009",
    type: "BOSS_SCENARIO",
    question:
      "A boss encounter asks the player to choose the safest behavior when the question queue is nearly empty. What should the system do?",
    options: [
      "Trigger a refill or recovery path and avoid leaving the player in endless loading (Answer)",
      "Keep showing loading forever until the player refreshes",
      "Delete the deck because it has been exhausted",
      "Automatically mark the next unanswered question as correct",
    ],
    answer:
      "Trigger a refill or recovery path and avoid leaving the player in endless loading",
    explanation:
      "A fair run should recover from low queue state or clearly communicate failure instead of silently hanging.",
  },
  {
    conceptId: "concept-010",
    type: "MULTIPLE_CHOICE",
    question:
      "What is the best reason to keep Prisma and database access out of client components?",
    options: [
      "Database code is server-only and can pull Node-specific modules into the browser bundle (Answer)",
      "Client components cannot render buttons",
      "Prisma only works with CSS modules",
      "Database queries must always be written in plain SQL",
    ],
    answer:
      "Database code is server-only and can pull Node-specific modules into the browser bundle",
    explanation:
      "Server-only database modules can depend on Node APIs that do not exist in the browser, causing bundle or runtime failures.",
  },
  {
    conceptId: "concept-011",
    type: "MULTIPLE_CHOICE",
    question:
      "How should server actions usually return results to client code?",
    options: [
      "As plain serializable objects such as { ok, message } (Answer)",
      "As browser-only DOM nodes",
      "As API-specific response objects only",
      "As raw database connections",
    ],
    answer:
      "As plain serializable objects such as { ok, message }",
    explanation:
      "Plain serializable return values are easier for client code to consume and avoid mixing API route semantics with server actions.",
  },
  {
    conceptId: "concept-012",
    type: "MULTIPLE_CHOICE",
    question:
      "Which ingest context field would help interpret a source without directly controlling gameplay difficulty?",
    options: [
      "Subject or domain (Answer)",
      "Boss frequency",
      "Hard mode toggle",
      "Preferred number of enemies",
    ],
    answer: "Subject or domain",
    explanation:
      "Subject or domain helps the model understand the material while leaving challenge tuning to the run system.",
  },
  {
    conceptId: "concept-013",
    type: "MULTIPLE_CHOICE",
    question:
      "Why can letting players choose exact question counts at ingest time weaken the roguelike structure?",
    options: [
      "Because question count is part of run pacing and pressure (Answer)",
      "Because question count only affects CSS styling",
      "Because decks cannot store more than one concept",
      "Because boss encounters require no questions",
    ],
    answer:
      "Because question count is part of run pacing and pressure",
    explanation:
      "Question count belongs to the run loop. If ingest controls it, the run system loses some authority over escalation.",
  },
  {
    conceptId: "concept-014",
    type: "BOSS_SCENARIO",
    question:
      "The player uploads a tiny deck with only a few concepts. The run has already used them all once. Which behavior is most consistent with a fair learning roguelike?",
    options: [
      "Recycle concepts carefully while making repetition feel like pressure, not a broken state (Answer)",
      "Crash the run because no new concepts remain",
      "Pretend the player answered future questions correctly",
      "Block all future runs from that deck permanently",
    ],
    answer:
      "Recycle concepts carefully while making repetition feel like pressure, not a broken state",
    explanation:
      "Tiny decks may need recycling, but the system should frame repetition as part of the challenge and avoid breaking the run.",
  },
  {
    conceptId: "concept-015",
    type: "MULTIPLE_CHOICE",
    question:
      "What should a session-based flashcard set most likely contain?",
    options: [
      "Questions the player actually saw or answered during a run (Answer)",
      "Every possible generated question for every deck",
      "Only shop item descriptions",
      "Unrelated questions from other users' decks",
    ],
    answer:
      "Questions the player actually saw or answered during a run",
    explanation:
      "Session-based flashcards are most useful when they reflect the specific material encountered in that run.",
  },
  {
    conceptId: "concept-016",
    type: "MULTIPLE_CHOICE",
    question:
      "Which answer best describes why session logs should be read before slower-moving roadmap notes?",
    options: [
      "Session logs contain the freshest handoff state and can reveal completed work not yet reflected elsewhere (Answer)",
      "Roadmaps should never be read",
      "Session logs replace all architecture documentation",
      "Changelogs are only useful for styling decisions",
    ],
    answer:
      "Session logs contain the freshest handoff state and can reveal completed work not yet reflected elsewhere",
    explanation:
      "Reading the current handoff first prevents stale roadmap items from being mistaken for today's active work.",
  },
  {
    conceptId: "concept-017",
    type: "BOSS_SCENARIO",
    question:
      "A player buys a single-use hack in one shop visit. Later, the same hack appears again in a new shop visit. What should the test check?",
    options: [
      "Whether the item is available again if sold-out state is meant to be scoped only to the previous visit (Answer)",
      "Whether all future shops permanently hide every item",
      "Whether the player loses the deck after purchasing",
      "Whether the item changes the user's email address",
    ],
    answer:
      "Whether the item is available again if sold-out state is meant to be scoped only to the previous visit",
    explanation:
      "The suspected bug is stale sold-out state carrying across later shop visits, so the test should verify the intended scope.",
  },
  {
    conceptId: "concept-018",
    type: "MULTIPLE_CHOICE",
    question:
      "What is the clearest role of a changelog in project memory?",
    options: [
      "To record meaningful completed changes (Answer)",
      "To replace all future planning",
      "To store temporary scratch ideas before they are reviewed",
      "To decide every UI color automatically",
    ],
    answer: "To record meaningful completed changes",
    explanation:
      "A changelog captures what changed, while decisions explain durable rationale and session logs provide handoff state.",
  },
  {
    conceptId: "concept-019",
    type: "MULTIPLE_CHOICE",
    question:
      "What is the best reason to avoid storing rough scratch ideas as durable decisions too early?",
    options: [
      "Scratch ideas may still be exploratory and should not become binding before review (Answer)",
      "Scratch ideas cannot contain text",
      "Decision logs are only for CSS bugs",
      "Roadmaps cannot reference future work",
    ],
    answer:
      "Scratch ideas may still be exploratory and should not become binding before review",
    explanation:
      "Keeping scratch separate lets ideas evolve before they are promoted into stable project direction.",
  },
  {
    conceptId: "concept-020",
    type: "BOSS_SCENARIO",
    question:
      "A run offers the player a powerful in-run shop item. The item is bought once, then appears in a later shop visit during the same run. Which design question matters most?",
    options: [
      "Whether sold-out status should last for one visit, one run, or permanent ownership (Answer)",
      "Whether the item should change the database provider",
      "Whether the deck title should become the item name",
      "Whether every question should become a boss scenario",
    ],
    answer:
      "Whether sold-out status should last for one visit, one run, or permanent ownership",
    explanation:
      "The bug cannot be fixed cleanly until the intended scope of sold-out state is clear.",
  },
];
