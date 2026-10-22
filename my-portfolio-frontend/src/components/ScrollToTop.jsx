import React, { useState, useEffect } from "react";

export default function ScrollToTop({ isChatOpen = false }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 220);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Circular progress calculations for r = 18
  const radius = 18;
  const circumference = 2 * Math.PI * radius; // ~113.097
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`scroll-to-top-container ${isChatOpen ? "chat-active-hidden" : ""} ${
        isVisible && !isChatOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      aria-hidden={!isVisible || isChatOpen}
    >
      <div className="relative flex items-center gap-2">
        {/* Floating Tooltip Indicator */}
        <div className="scroll-to-top-tooltip hidden sm:flex items-center gap-1.5 rounded-full border border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 px-3 py-1 shadow-md shadow-slate-200/50 dark:shadow-black/40 backdrop-blur-md text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
          <span>Top</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{Math.round(scrollProgress)}%</span>
        </div>

        {/* Scroll To Top Action Button with Circular SVG Progress Ring */}
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-to-top-btn group focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          aria-label={`Scroll back to top of page (currently at ${Math.round(scrollProgress)}%)`}
          title="Scroll back to top"
        >
          {/* Circular SVG Progress Ring */}
          <svg className="progress-ring absolute inset-0 -rotate-90" width="52" height="52">
            <defs>
              <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="35%" stopColor="#7c3aed" />
                <stop offset="70%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="2.5"
              fill="transparent"
            />

            {/* Dynamic Active Progress Circle */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              stroke="url(#scrollProgressGradient)"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Upward Chevron Icon with Micro-Bounce Animation */}
          <svg
            className="h-5 w-5 text-slate-700 transition-transform duration-300 group-hover:text-indigo-600 group-hover:-translate-y-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
