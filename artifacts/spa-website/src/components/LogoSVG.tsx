import type { SVGProps } from "react";

/**
 * The Harmony Palms logo — inlined SVG.
 *
 * WHY INLINE?
 * By embedding the SVG directly in the component (instead of loading
 * a separate file), the logo renders on the very first paint — no
 * network request, no file fetch, no delay. It appears the instant
 * the HTML arrives from the server.
 *
 * To change colors or size, just edit the props below.
 */
export default function LogoSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="The Harmony Palms Wellness Spa"
      {...props}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5C451" />
          <stop offset="100%" stopColor="#E3A630" />
        </linearGradient>
      </defs>

      {/* Outer enso circle (open at top-right) */}
      <path
        d="M 168 62
           A 72 72 0 1 0 152 152"
        stroke="url(#goldGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner crescent accent at top */}
      <path
        d="M 158 46 A 65 65 0 0 1 178 74"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lotus petals (5) — outlined style */}
      {/* Center petal */}
      <path
        d="M 100 68 C 90 92, 92 114, 100 126 C 108 114, 110 92, 100 68 Z"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner-left petal */}
      <path
        d="M 86 80 C 74 102, 80 118, 92 126 C 98 114, 96 96, 86 80 Z"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner-right petal */}
      <path
        d="M 114 80 C 126 102, 120 118, 108 126 C 102 114, 104 96, 114 80 Z"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Outer-left petal */}
      <path
        d="M 72 98 C 62 118, 68 130, 88 134 C 90 120, 82 106, 72 98 Z"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Outer-right petal */}
      <path
        d="M 128 98 C 138 118, 132 130, 112 134 C 110 120, 118 106, 128 98 Z"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center head/circle (filled) */}
      <circle cx="100" cy="117" r="9" fill="url(#goldGrad)" />

      {/* Shoulders / body wrap under head */}
      <path
        d="M 82 132 Q 100 128 118 132 Q 115 142 100 144 Q 85 142 82 132 Z"
        fill="url(#goldGrad)"
      />

      {/* Cradling hand (crescent palm) */}
      <path
        d="M 46 140
           Q 100 170 154 140
           Q 150 160 120 170
           Q 100 175 80 170
           Q 52 160 46 140 Z"
        fill="url(#goldGrad)"
      />
      {/* Thumb */}
      <path
        d="M 154 140 Q 170 135 168 124 Q 162 130 154 140 Z"
        fill="url(#goldGrad)"
      />
    </svg>
  );
}
