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
    conceptId: "mock-001",
    type: "TRUE_OR_FALSE",
    question: "The OSI network model consists of exactly four layers.",
    options: ["True", "False"],
    answer: "False",
    explanation:
      "The OSI model has seven layers, while the TCP/IP model has four.",
  },
  {
    conceptId: "mock-002",
    type: "MULTIPLE_CHOICE",
    question:
      "Which of the following hashing algorithms is currently considered cryptographically secure?",
    options: ["MD5", "SHA-256", "CRC32", "LM Hash"],
    answer: "SHA-256",
    explanation:
      "MD5 and LM Hash are highly vulnerable to collision attacks, making SHA-256 the only secure option listed.",
  },
  {
    conceptId: "mock-003",
    type: "MULTIPLE_CHOICE",
    question:
      "A server is experiencing a massive SYN flood attack resulting in system failure. Which network component is being exploited?",
    options: [
      "The DNS Resolver",
      "The Transport Layer (TCP Handshake)",
      "The Physical Subnet",
      "The BGP Routing Protocol",
      "The SSL/TLS Handshake",
    ],
    answer: "The Transport Layer (TCP Handshake)",
    explanation:
      "A SYN flood targets the TCP handshake process by leaving thousands of connections half-open.",
  },
  {
    conceptId: "mock-004",
    type: "MULTIPLE_CHOICE",
    question:
      "Which of the following statements regarding Asymmetric Encryption are definitively correct?",
    options: [
      "It relies entirely on a single shared key.",
      "It is computationally much faster than Symmetric Encryption.",
      "It uses a public key for encryption and a private key for decryption.",
      "Both A and B are correct.",
      "Both B and C are correct.",
      "None of the above are correct.",
    ],
    answer:
      "It uses a public key for encryption and a private key for decryption.",
    explanation:
      "Asymmetric encryption relies on a mathematically linked key pair and is significantly slower than symmetric methods.",
  },
];
