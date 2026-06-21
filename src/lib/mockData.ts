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
