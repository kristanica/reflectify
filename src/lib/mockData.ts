export const CONSUMABLE_DATABASE = [
  {
    id: "c_scalpel",
    name: "Digital Scalpel",
    description:
      "Instantly severs 2 incorrect options from the current query. Clean, silent, and untraceable.",
    cost: 25,
    icon: "🗡️",
    action: "DECRYPT_OPTIONS",
  },
  {
    id: "c_amnesia",
    name: "Amnesia Pill",
    description:
      "Force the mainframe to forget the current question entirely. Skips to the next cycle. Do not look back.",
    cost: 50,
    icon: "💊",
    action: "SKIP_QUESTION",
  },
  {
    id: "c_clairvoyance",
    name: "Third Eye Exploit",
    description:
      "Tears open the firewall to reveal the hidden Explanation before you lock in your answer. See the unseen.",
    cost: 40,
    icon: "👁️",
    action: "REVEAL_EXPLANATION",
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
      "If you are currently at exactly 1 Life, all Credit payouts from all sources are Quadrupled.",
    cost: 175,
    icon: "🎗️",
    type: "PASSIVE",
    effect: "ADRENALINE_MULTIPLIER",
    value: 4,
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
