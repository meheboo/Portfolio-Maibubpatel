import React from "react";

/**
 * High-fidelity, optimized SVG icons for all requested technologies & social platforms.
 * Includes authentic brand colors, scalable viewBoxes, and clean paths.
 */
export const TechIcons = {
  // Social & Platform Icons with Authentic Brand Colors
  GitHub: ({ className = "w-5 h-5", brandColor = true }) => (
    <svg
      viewBox="0 0 98 96"
      className={className}
      fill={brandColor ? "#24292F" : "currentColor"}
      role="img"
      aria-label="GitHub"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  ),

  LinkedIn: ({ className = "w-5 h-5", brandColor = true }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="LinkedIn"
    >
      <rect width="100" height="100" rx="20" fill={brandColor ? "#0A66C2" : "currentColor"} />
      <path
        d="M26 38h13v40H26V38zm6.5-18a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zM47 38h12.5v5.5h.2c1.7-3.3 6-6.7 12.3-6.7 13.2 0 15.6 8.7 15.6 20V78H74.5V59.5c0-4.4-.1-10.1-6.2-10.1-6.2 0-7.1 4.8-7.1 9.8V78H47V38z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  Email: ({ className = "w-5 h-5" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Email"
    >
      <rect width="100" height="100" rx="20" fill="#EA4335" />
      <path
        d="M20 28h60c3.3 0 6 2.7 6 6v32c0 3.3-2.7 6-6 6H20c-3.3 0-6-2.7-6-6V34c0-3.3 2.7-6 6-6z"
        fill="#FFFFFF"
      />
      <path
        d="M20 32l30 20 30-20"
        stroke="#EA4335"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M20 64l24-18m36 18l-24-18"
        stroke="#EA4335"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  Phone: ({ className = "w-5 h-5" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Phone / WhatsApp"
    >
      <rect width="100" height="100" rx="20" fill="#25D366" />
      <path
        d="M71.5 59.8c-1.3-.6-7.5-3.7-8.7-4.1-1.1-.4-2-.6-2.8.6-1 1.3-3.3 4.1-4.1 5-.8.8-1.5 1-2.8.3-7.5-3.7-12.4-8.5-16.1-16-.7-1.3-.1-2 .6-2.7.6-.6 1.3-1.5 2-2.3.6-.8.8-1.3 1.3-2.2.4-.8.2-1.7-.1-2.3-.4-.6-2.8-6.8-3.9-9.3-1-2.4-2.1-2.1-2.8-2.1-.8 0-1.7 0-2.6 0-1 0-2.3.4-3.5 1.7-1.3 1.3-4.8 4.7-4.8 11.5s5 13.3 5.7 14.3c.7 1 9.8 15 23.8 21 11.6 5 13.9 4 16.4 3.8 2.5-.2 7.5-3.1 8.6-6 1-3 1-5.5.7-6-.3-.6-1.1-.9-2.4-1.5z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  Resume: ({ className = "w-5 h-5" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Resume Document"
    >
      <rect width="100" height="100" rx="20" fill="#4F46E5" />
      <path
        d="M30 22h26l16 16v40c0 3.3-2.7 6-6 6H30c-3.3 0-6-2.7-6-6V28c0-3.3 2.7-6 6-6z"
        fill="#FFFFFF"
      />
      <path d="M56 22v16h16" fill="#C7D2FE" />
      <path d="M36 46h28M36 56h28M36 66h18" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  // Frontend Technologies
  React: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 115.3 100" className={className} fill="none">
      <ellipse cx="57.65" cy="50" rx="16" ry="46" transform="rotate(30 57.65 50)" stroke="#00D8FF" strokeWidth="4" />
      <ellipse cx="57.65" cy="50" rx="16" ry="46" transform="rotate(90 57.65 50)" stroke="#00D8FF" strokeWidth="4" />
      <ellipse cx="57.65" cy="50" rx="16" ry="46" transform="rotate(150 57.65 50)" stroke="#00D8FF" strokeWidth="4" />
      <circle cx="57.65" cy="50" r="8" fill="#00D8FF" />
    </svg>
  ),

  JavaScript: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className}>
      <rect width="100" height="100" rx="16" fill="#F7DF1E" />
      <path
        d="M26 78c3.5 2 7 3.5 11 3.5 6.5 0 10.5-3.5 10.5-12.5V36h-8.5v32.5c0 4.5-2 6.5-5.5 6.5-2.5 0-5-1-7.5-2.5v5.5zm40-1.5c4 2.5 8.5 4 13.5 4 8 0 13-4 13-10.5 0-6.5-4-9-10.5-12-6.5-3-9-5-9-9 0-3.5 2.5-6 7-6 4 0 7 1.5 9.5 3.5l3.5-5.5c-3-2-7-3.5-12.5-3.5-9 0-14 5-14 11 0 6.5 4 9 10 11.5 6.5 3 9 5 9 9.5 0 4-3 6.5-8 6.5-4.5 0-8.5-1.5-11.5-4l-4 5z"
        fill="#000000"
      />
    </svg>
  ),

  TypeScript: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className}>
      <rect width="100" height="100" rx="16" fill="#3178C6" />
      <path
        d="M18 36h28v7h-10v35h-8V43H18v-7zm30 33c3.5 2 7 3.5 11 3.5 6.5 0 10.5-3.5 10.5-10.5 0-6.5-4-9-10.5-12-6.5-3-9-5-9-9 0-3.5 2.5-6 7-6 4 0 7 1.5 9.5 3.5l3.5-5.5c-3-2-7-3.5-12.5-3.5-9 0-14 5-14 11 0 6.5 4 9 10 11.5 6.5 3 9 5 9 9.5 0 4-3 6.5-8 6.5-4.5 0-8.5-1.5-11.5-4l-4 5z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  HTML5: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M12 6l7.5 84.5L50 100l30.5-9.5L88 6H12z" fill="#E44D26" />
      <path d="M50 89.5l24-7.5 6.5-73.5H50v81z" fill="#F16529" />
      <path d="M50 38.5h16.5l-1.5 16.5H50V44h-8l-1-11h25l.5-5.5H23.5l2.5 28.5H50V44h-8l-1-11H50v5.5z" fill="#EBEBEB" />
      <path d="M50 55v11.5l11-3 1-12.5H50v4zm0 21.5l-11.5-3.5-.8-8.5H26.5l1.5 16.5L50 84.5v-8z" fill="#FFFFFF" />
    </svg>
  ),

  CSS3: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M12 6l7.5 84.5L50 100l30.5-9.5L88 6H12z" fill="#1572B6" />
      <path d="M50 89.5l24-7.5 6.5-73.5H50v81z" fill="#33A9DC" />
      <path d="M50 38.5h16.5l-1.5 16.5H50v11.5l11-3 1-12.5h11.5l-2 22L50 84.5v-8l11.5-3.5.8-8.5H50v-26z" fill="#FFFFFF" />
      <path d="M50 22v11H23.5l.5-5.5 25-5.5h1zM36.5 44H50v11H38l-.5-5.5H26l1.5 16.5L50 72v12.5l-22-6.5-1.5-16.5h11.5l.5 5.5z" fill="#EBEBEB" />
    </svg>
  ),

  Tailwind: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M26 42c3.5-14 13-21 28-21 18.5 0 24 10.5 32 17.5 5.5 4.5 11 6.5 14 6.5-3.5 14-13 21-28 21-18.5 0-24-10.5-32-17.5-5.5-4.5-11-6.5-14-6.5zm-26 28c3.5-14 13-21 28-21 18.5 0 24 10.5 32 17.5 5.5 4.5 11 6.5 14 6.5-3.5 14-13 21-28 21-18.5 0-24-10.5-32-17.5-5.5-4.5-11-6.5-14-6.5z"
        fill="#38BDF8"
      />
    </svg>
  ),

  // Backend
  NodeJS: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 6l38 22v44L50 94 12 72V28L50 6z" fill="#339933" />
      <path d="M50 14L20 31v38l30 17 30-17V31L50 14z" fill="#66CC33" />
      <path d="M50 26l18 10.5v21L50 68 32 57.5v-21L50 26z" fill="#FFFFFF" />
    </svg>
  ),

  Express: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className}>
      <rect width="100" height="100" rx="20" fill="#0F172A" />
      <text
        x="50"
        y="62"
        fontFamily="JetBrains Mono, monospace"
        fontSize="36"
        fontWeight="bold"
        textAnchor="middle"
        fill="#FFFFFF"
        letterSpacing="-1"
      >
        ex
      </text>
    </svg>
  ),

  NestJS: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M89 33.5c-3-12.5-14-16-14-16l-7 13.5c-3-5.5-8-9-15.5-9-12 0-22 9.5-22 21.5 0 1.5.2 3 .5 4.5l-8.5-7C21 39 18.5 40 18 41c-.5 1 0 2.5 1.5 4.5l14 17.5c2 2.5 4.5 4 7.5 4.5 6 .5 11.5-2.5 14-7.5l13.5 13c1.5 1.5 3.5 1.5 4.5 0l16-19.5c6-7.5 3-17.5 0-20z"
        fill="#E0234E"
      />
      <path
        d="M50 15c-15 0-27 12-27 27 0 5 1.5 9.5 4 13.5l14-17.5c1-1.5 2.5-2.5 4.5-3 5-1 9.5.5 13 4l12-14C64 17 57.5 15 50 15z"
        fill="#F34F70"
      />
    </svg>
  ),

  RestAPI: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="20" fill="#6366F1" />
      <circle cx="28" cy="50" r="10" fill="#FFFFFF" />
      <circle cx="72" cy="28" r="10" fill="#FFFFFF" />
      <circle cx="72" cy="72" r="10" fill="#FFFFFF" />
      <path d="M38 50h18m0 0l16-22m-16 22l16 22" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),

  JWT: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="20" fill="#000000" />
      <path
        d="M24 50l14 26 23-14 15-28L62 20 24 50z"
        stroke="#D63AFF"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="8" fill="#00F0FF" />
    </svg>
  ),

  // Database
  MongoDB: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M50 4c-3 10-18 24-20 44-2 23 15 39 20 48 5-9 22-25 20-48-2-20-17-34-20-44z"
        fill="#13AA52"
      />
      <path d="M50 4v92c2-4 15-18 17-38 2-20-14-44-17-54z" fill="#47A248" />
      <path d="M50 96v-30c-2 0-3-1-3-3s1-3 3-3v-7c0-2 1-3 3-3s3 1 3 3v7c2 0 3 1 3 3s-1 3-3 3v30z" fill="#FAF5EE" />
    </svg>
  ),

  PostgreSQL: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M50 10C30 10 20 22 18 36c-2 16 7 30 12 40 4 8 8 14 12 14s4-4 4-8c0-8-4-16-4-24 0-14 10-22 18-22s18 8 18 22c0 8-4 16-4 24 0 4 0 8 4 8s8-6 12-14c5-10 14-24 12-40-2-14-12-26-32-26z"
        fill="#336791"
      />
      <path d="M38 42c0-5 5-9 12-9s12 4 12 9-5 9-12 9-12-4-12-9z" fill="#FFFFFF" opacity="0.9" />
      <circle cx="43" cy="42" r="3" fill="#336791" />
      <circle cx="57" cy="42" r="3" fill="#336791" />
    </svg>
  ),

  MySQL: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="20" fill="#00618A" />
      <path
        d="M20 62c6-12 16-24 30-24 10 0 18 6 24 14 3-6 8-10 14-12-4 12-14 24-28 24-10 0-18-6-24-14-3 6-8 10-16 12z"
        fill="#E48E00"
      />
      <text
        x="50"
        y="42"
        fontFamily="system-ui, sans-serif"
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle"
        fill="#FFFFFF"
      >
        SQL
      </text>
    </svg>
  ),

  Prisma: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M48 6L14 74c-2 4 1 9 6 9h60c5 0 8-5 6-9L52 6c-1-3-3-3-4 0z"
        fill="#2D3748"
      />
      <path
        d="M50 14l30 65H58l-8-50-6 40-12-12L50 14z"
        fill="#16A394"
      />
    </svg>
  ),

  // Tools & Technologies
  Docker: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M94 48c-3-2-7-1-9 1-1-4-5-7-10-7-1 0-2 0-3 .5C68 30 54 30 46 36l-3-2c-2-1-4 0-5 2l-2 3c-8-1-18 3-23 11-1 2 0 4 2 5 10 4 23 4 33 0 13-5 27-2 36 6 4-3 8-7 10-13z"
        fill="#2496ED"
      />
      <rect x="22" y="32" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="31" y="32" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="40" y="32" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="31" y="23" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="40" y="23" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="49" y="32" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="49" y="23" width="7" height="7" rx="1" fill="#2496ED" />
      <rect x="58" y="32" width="7" height="7" rx="1" fill="#2496ED" />
    </svg>
  ),

  Redis: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 10L12 28v44l38 18 38-18V28L50 10z" fill="#DC382D" />
      <path d="M50 20L22 34v32l28 14 28-14V34L50 20z" fill="#A82820" />
      <path d="M50 30L32 40v20l18 10 18-10V40L50 30z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  ),

  BullMQ: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="20" fill="#991B1B" />
      <path
        d="M26 32c4-10 14-16 24-16s20 6 24 16c-6 4-10 10-10 18h-28c0-8-4-14-10-18z"
        fill="#F87171"
      />
      <circle cx="42" cy="48" r="4" fill="#FFFFFF" />
      <circle cx="58" cy="48" r="4" fill="#FFFFFF" />
      <path d="M40 68h20m-16 8h12" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  Git: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M93 43L57 7a10 10 0 00-14 0L7 43a10 10 0 000 14l36 36a10 10 0 0014 0l36-36a10 10 0 000-14z"
        fill="#F05032"
      />
      <circle cx="36" cy="44" r="7" fill="#FFFFFF" />
      <circle cx="64" cy="56" r="7" fill="#FFFFFF" />
      <circle cx="36" cy="68" r="7" fill="#FFFFFF" />
      <path d="M36 44v24m0-12l28 0" stroke="#FFFFFF" strokeWidth="5" />
    </svg>
  ),

  Postman: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="44" fill="#FF6C37" />
      <path
        d="M28 50l38-18-14 38-8-12-16-8z"
        fill="#FFFFFF"
      />
      <circle cx="68" cy="30" r="4" fill="#FFFFFF" />
    </svg>
  ),

  AWS: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <rect width="100" height="100" rx="20" fill="#232F3E" />
      <path
        d="M20 62c16 8 38 9 56-2m-4-4c4 2 8 7 10 10-2-1-6-4-10-8z"
        stroke="#FF9900"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="46"
        fontFamily="system-ui, sans-serif"
        fontSize="22"
        fontWeight="800"
        textAnchor="middle"
        fill="#FFFFFF"
        letterSpacing="2"
      >
        AWS
      </text>
    </svg>
  ),
};

export default TechIcons;
