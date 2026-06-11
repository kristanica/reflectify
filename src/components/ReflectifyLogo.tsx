import React from "react";

export const ReflectifyLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full max-w-[256px] max-h-[256px]"
    {...props}
  >
    <defs>
      {/* Background radial gradient (Dark Navy) */}
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#1a1a32" />
        <stop offset="100%" stopColor="#080811" />
      </radialGradient>

      {/* Metallic Gold Gradient */}
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b8860b" />
        <stop offset="30%" stopColor="#ffd700" />
        <stop offset="70%" stopColor="#f0a500" />
        <stop offset="100%" stopColor="#8b6508" />
      </linearGradient>

      {/* Mirror Glass Gradient */}
      <linearGradient id="portalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f1126" />
        <stop offset="100%" stopColor="#221e4a" />
      </linearGradient>

      {/* Gold Glow Filter */}
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Outer background seal */}
    <circle
      cx="128"
      cy="128"
      r="120"
      fill="url(#bgGrad)"
      stroke="url(#goldGrad)"
      strokeWidth="2.5"
      opacity="0.95"
    />

    {/* Outer golden decoration rings */}
    <circle
      cx="128"
      cy="128"
      r="114"
      stroke="url(#goldGrad)"
      strokeWidth="0.5"
      strokeDasharray="4 2"
      opacity="0.5"
    />

    {/* Elegant Tapered Handle */}
    <path
      d="M128 160 L128 215 C128 222, 122 228, 115 228 C108 228, 108 234, 115 234 L141 234 C148 234, 148 228, 141 228 C134 228, 128 222, 128 215 Z"
      fill="url(#goldGrad)"
    />
    <circle cx="128" cy="200" r="5" fill="#ffd700" opacity="0.6" />

    {/* Outer Gold Mirror Frame */}
    <ellipse
      cx="128"
      cy="105"
      rx="56"
      ry="70"
      fill="none"
      stroke="url(#goldGrad)"
      strokeWidth="6"
      filter="url(#goldGlow)"
    />
    <ellipse
      cx="128"
      cy="105"
      rx="51"
      ry="65"
      fill="none"
      stroke="url(#goldGrad)"
      strokeWidth="1.5"
    />

    {/* Inner Mirror Glass */}
    <ellipse cx="128" cy="105" rx="46" ry="60" fill="url(#portalGrad)" />

    {/* Top & Bottom filigree crest decorations */}
    {/* Top Crown */}
    <path d="M128 24 L134 33 H122 Z" fill="url(#goldGrad)" />
    <circle cx="128" cy="20" r="3" fill="#ffd700" filter="url(#goldGlow)" />
    {/* Bottom Junction Connector */}
    <circle cx="128" cy="178" r="8" fill="url(#goldGrad)" />

    {/* Constellation lines linking magical stars */}
    <path
      d="M120 80 L132 60"
      stroke="#ffd700"
      strokeWidth="0.75"
      opacity="0.25"
      strokeDasharray="2"
    />
    <path
      d="M120 80 L142 112"
      stroke="#ffd700"
      strokeWidth="0.75"
      opacity="0.25"
      strokeDasharray="2"
    />
    <path
      d="M112 123 L142 112"
      stroke="#ffd700"
      strokeWidth="0.75"
      opacity="0.25"
      strokeDasharray="2"
    />

    {/* Stars / Sparks inside the mirror */}
    {/* Primary Glowing Star */}
    <path
      d="M120 70 Q120 80, 110 80 Q120 80, 120 90 Q120 80, 130 80 Q120 80, 120 70 Z"
      fill="#ffd700"
      opacity="0.95"
      filter="url(#goldGlow)"
    />
    {/* Secondary Star */}
    <path
      d="M142 105 Q142 112, 135 112 Q142 112, 142 119 Q142 112, 149 112 Q142 112, 142 105 Z"
      fill="#f0a500"
      opacity="0.9"
    />
    {/* Tertiary Star */}
    <path
      d="M112 118 Q112 123, 107 123 Q112 123, 112 128 Q112 123, 117 123 Q112 123, 112 118 Z"
      fill="#f0ede8"
      opacity="0.8"
    />
    {/* Minor background star */}
    <path
      d="M132 57 Q132 60, 129 60 Q132 60, 132 63 Q132 60, 135 60 Q132 60, 132 57 Z"
      fill="#f0ede8"
      opacity="0.6"
    />

    {/* Glass shimmer / Moon-like reflection curve */}
    <path
      d="M92 90 A 46 60 0 0 0 148 155 A 46 60 0 0 1 92 90 Z"
      fill="#f0ede8"
      opacity="0.06"
    />
  </svg>
);
