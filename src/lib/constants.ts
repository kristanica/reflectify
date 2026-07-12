import { BookOpen, Shield, Sparkles, Trophy, User } from "lucide-react";

export const navItems = [
  { name: "Keep", href: "/dashboard", icon: Shield },
  { name: "Archives (Seeds)", href: "/decks", icon: BookOpen },
  { name: "Shop", href: "/shop", icon: Sparkles },

  { name: "Player Profile", href: "/profile", icon: User },
];

export const successLogs = ["Answer correct.", "Correct.", "Success."];
// random logs
export const failLogs = ["Answer incorrect.", "Incorrect.", "Failed."];

export const MOCK_QUESTIONS = [
  {
    conceptId: "cmqf8rzxq0005dccsvuvk2ekd",
    type: "MULTIPLE_CHOICE",
    question: "When did extraterrestrial beings invade Earth?",
    options: ["5012 AD", "502 AD", "5012 BC", "5201 AD"],
    answer: "5012 AD",
    explanation: "The invasion of Earth began in 5012 AD.",
  },
  {
    conceptId: "cmqf8rzxq0006dccsrtem6ctt",
    type: "MULTIPLE_CHOICE",
    question:
      "What force did the extraterrestrial beings use to dominate Earth?",
    options: [
      "Armies of Machine Lifeforms",
      "Human lunar colonies",
      "Android resistance fleets",
      "Project YoRHa command units",
    ],
    answer: "Armies of Machine Lifeforms",
    explanation:
      "The extraterrestrial invaders used Machine Lifeform armies to dominate Earth.",
  },
  {
    conceptId: "cmqf8rzxq0007dccsoot8memj",
    type: "TRUE_OR_FALSE",
    question:
      "Humanity fled to the Moon to escape the invasion by Machine Lifeforms.",
    options: ["True", "False"],
    answer: "True",
    explanation:
      "Humanity escaped the invasion by fleeing from Earth to the Moon.",
  },
  {
    conceptId: "cmqf8rzxq0008dccsujmz83t8",
    type: "MULTIPLE_CHOICE",
    question: "What became of Earth's surface after the invasion?",
    options: [
      "It was left in ruins",
      "It became a human refuge",
      "It was turned into an orbital bunker",
      "It was reclaimed by the Council of Humanity",
    ],
    answer: "It was left in ruins",
    explanation: "The invasion left Earth's surface in ruins.",
  },
  {
    conceptId: "cmqf8rzxq0009dccs9xnf2zah",
    type: "MULTIPLE_CHOICE",
    question:
      "Which force was left behind on Earth to handle the struggle for retrieval?",
    options: [
      "Artificial android forces",
      "Extraterrestrial commanders",
      "Human lunar soldiers",
      "The Council of Humanity",
    ],
    answer: "Artificial android forces",
    explanation:
      "Artificial android forces remained on Earth to continue the struggle.",
  },
  {
    conceptId: "cmqf8rzxq000adccs897s4mk8",
    type: "MULTIPLE_CHOICE",
    question: "What is Project YoRHa?",
    options: [
      "An elite military unit of next-generation androids",
      "A council of surviving humans on the Moon",
      "A Machine Lifeform command network",
      "An extraterrestrial invasion fleet",
    ],
    answer: "An elite military unit of next-generation androids",
    explanation:
      "Project YoRHa is an elite military unit created from next-generation androids.",
  },
  {
    conceptId: "cmqf8rzxq000bdccsr09pg9sm",
    type: "TRUE_OR_FALSE",
    question: "Project YoRHa operates from an orbital bunker.",
    options: ["True", "False"],
    answer: "True",
    explanation: "YoRHa's operational base is an orbital bunker.",
  },
  {
    conceptId: "cmqf8rzxq000cdccsboa2rcfx",
    type: "MULTIPLE_CHOICE",
    question: "What is YoRHa No. 2 Type B, also known as 2B?",
    options: [
      "A combat specialist android",
      "A scanner unit android",
      "A Machine Lifeform leader",
      "A human lunar commander",
    ],
    answer: "A combat specialist android",
    explanation: "2B is designated as a combat specialist android.",
  },
  {
    conceptId: "cmqf8rzxq000ddccs9x2q71r1",
    type: "MULTIPLE_CHOICE",
    question: "What role does YoRHa No. 9 Type S, or 9S, serve?",
    options: [
      "Scanner unit android",
      "Combat specialist android",
      "Orbital bunker commander",
      "Machine Lifeform diplomat",
    ],
    answer: "Scanner unit android",
    explanation: "9S is designated as a scanner unit android.",
  },
  {
    conceptId: "cmqf8rzxq000edccs5gxksgx1",
    type: "TRUE_OR_FALSE",
    question:
      'Androids in Project YoRHa follow the core directive: "For the glory of mankind."',
    options: ["True", "False"],
    answer: "True",
    explanation:
      'YoRHa androids are driven by the directive, "For the glory of mankind."',
  },
  {
    conceptId: "cmqf8rzxq0005dccsvuvk2ekd",
    type: "TRUE_OR_FALSE",
    question: "The extraterrestrial invasion began before 5012 AD.",
    options: ["True", "False"],
    answer: "False",
    explanation: "The invasion began in 5012 AD.",
  },
  {
    conceptId: "cmqf8rzxq0005dccsvuvk2ekd",
    type: "MULTIPLE_CHOICE",
    question: "What event occurred in 5012 AD?",
    options: [
      "The extraterrestrial invasion of Earth",
      "The creation of Project YoRHa",
      "Humanity's extinction",
      "The Machine Lifeforms' retreat",
    ],
    answer: "The extraterrestrial invasion of Earth",
    explanation: "Extraterrestrial beings invaded Earth in 5012 AD.",
  },
];
