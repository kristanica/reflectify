export const AUGMENT_DATABASE = [
  {
    id: "j_parasite",
    name: "Data Parasite",
    description:
      "Your first correct answer in a sector deals +2 Damage to the ICE. It feeds on their structural weakness.",
    cost: 45,
    icon: "🦠",
    effectType: "BONUS_DAMAGE",
    value: 2,
  },
  {
    id: "j_blood_pact",
    name: "Blood Pact Algorithm",
    description:
      "True/False questions grant +15 Credits. A heavy purse, but it demands absolute perfection.",
    cost: 60,
    icon: "🩸",
    effectType: "BONUS_CREDITS",
    value: 15,
  },
  {
    id: "j_martyr",
    name: "Martyr's Protocol",
    description:
      "Absorbs 1 fatal error that would otherwise kill you. The script burns itself out to save your rig. Breaks after use.",
    cost: 100,
    icon: "🫀",
    effectType: "SHIELD",
    value: 1,
  },
  {
    id: "j_whisper",
    name: "Whisper in the Wire",
    description:
      "Every correct answer grants +5 Credits. It listens to your keystrokes and rewards your silence.",
    cost: 50,
    icon: "🕸️",
    effectType: "BONUS_CREDITS",
    value: 5,
  },
  {
    id: "j_executioner",
    name: "The Executioner",
    description:
      "If the Boss is below 2 HP, your next correct answer deals double damage. Finish them.",
    cost: 120,
    icon: "⚔️",
    effectType: "BONUS_DAMAGE",
    value: 1,
  },
];

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
