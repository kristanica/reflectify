import { BookOpen, Shield, Sparkles, Trophy, User } from "lucide-react";

export const navItems = [
  { name: "Keep", href: "/dashboard", icon: Shield },
  { name: "Archives (Seeds)", href: "/decks", icon: BookOpen },
  { name: "Shop", href: "/shop", icon: Sparkles },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Player Profile", href: "/profile", icon: User },
];

export const successLogs = [
  "LOGIC GATE SHATTERED. HARVESTING DATA.",
  "TRUTH FRAGMENT EXTRACTED. NODE COMPROMISED.",
  "SYNAPSE ALIGNED. SECURITY PROTOCOL OBLITERATED.",
];
// random logs
export const failLogs = [
  "FATAL MISMATCH. BLACK ICE DEPLOYED.",
  "PARADOX TRIGGERED. ACTIVE TRACE INITIATED.",
  "LOGIC FAULT DETECTED. NEURAL FEEDBACK SEVERING LINK.",
];
