"use client";

import React from "react";

export function BetterHeartSVG() {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Heart"
    >
      <defs>
        <radialGradient id="bh-grad" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#fff7" />
          <stop offset="12%" stopColor="#ffdce0" />
          <stop offset="45%" stopColor="#ff9aa6" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </radialGradient>

        <linearGradient id="bh-edge" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ff0000" stopOpacity="0.08" />
        </linearGradient>

        {/* soft outer glow */}
        <filter id="bh-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* inner shadow */}
        <filter id="bh-inner" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset dx="0" dy="4" result="off" />
          <feGaussianBlur in="off" stdDeviation="6" result="blur2" />
          <feComposite
            in="SourceGraphic"
            in2="blur2"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="inner"
          />
        </filter>
      </defs>

      {/* subtle background ellipse for depth */}
      <ellipse cx="100" cy="120" rx="64" ry="20" fill="rgba(0,0,0,0.06)" />

      {/* heart shape */}
      <g filter="url(#bh-glow)">
        <path
          d="M100 170
             C 60 142, 22 110, 48 74
             C 68 46, 104 54, 104 54
             C 104 54, 138 46, 152 74
             C 178 110, 140 142, 100 170 Z"
          fill="url(#bh-grad)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
      </g>

      {/* inner bevel / edge */}
      <path
        d="M100 170
             C 60 142, 22 110, 48 74
             C 68 46, 104 54, 104 54
             C 104 54, 138 46, 152 74
             C 178 110, 140 142, 100 170 Z"
        fill="none"
        stroke="url(#bh-edge)"
        strokeWidth="3"
        strokeOpacity="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* glossy highlight */}
      <path
        d="M70 72
           C 74 56, 96 50, 110 58
           C 120 63, 132 74, 124 88"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity="0.55"
        fill="none"
      />

      {/* small shine sparkles */}
      <g transform="translate(132,38) rotate(-12)">
        <rect
          x="-2.5"
          y="-8"
          width="5"
          height="16"
          rx="2"
          fill="#fff"
          opacity="0.85"
          transform="rotate(18)"
        />
      </g>

      <g transform="translate(78,36) rotate(8)">
        <rect
          x="-2.5"
          y="-6"
          width="5"
          height="12"
          rx="2"
          fill="#fff"
          opacity="0.42"
          transform="rotate(-12)"
        />
      </g>

      {/* subtle inner shadow overlay to ground the shape */}
      <g filter="url(#bh-inner)" opacity="0.18">
        <path
          d="M100 170
             C 60 142, 22 110, 48 74
             C 68 46, 104 54, 104 54
             C 104 54, 138 46, 152 74
             C 178 110, 140 142, 100 170 Z"
          fill="#000"
        />
      </g>
    </svg>
  );
}

/**
 * Small heart — dùng trong card overlay shared element
 */
export function BetterHeartSmallSVG() {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Small heart"
    >
      <defs>
        <linearGradient id="shg" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffd1d6" />
          <stop offset="100%" stopColor="#ff6b6b" />
        </linearGradient>
        <filter id="sg" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#sg)">
        <path
          d="M100 150
             C 72 130, 36 106, 50 80
             C 64 56, 96 64, 100 72
             C 104 64, 136 56, 150 80
             C 164 106, 128 130, 100 150 Z"
          fill="url(#shg)"
        />
      </g>

      <path
        d="M86 68 C 92 56, 108 54, 114 66"
        stroke="#fff"
        strokeWidth="4"
        strokeOpacity="0.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
