import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "", isMobile = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
        isMobile
          ? "w-full py-2.5 px-4 justify-between border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200"
          : "h-9 w-9 border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:scale-105 active:scale-95"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
    >
      {/* Visual Ambient Glow on hover */}
      <div
        className={`absolute inset-0 -z-10 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 blur-sm ${
          isDark
            ? "bg-amber-400/20"
            : "bg-indigo-500/20"
        }`}
      />

      {isMobile ? (
        <>
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <span className="flex h-5 w-5 items-center justify-center text-base">
              {isDark ? "☀️" : "🌙"}
            </span>
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            {isDark ? "Active Dark" : "Active Light"}
          </span>
        </>
      ) : (
        <div className="relative h-4.5 w-4.5 flex items-center justify-center overflow-hidden">
          {/* Sun Icon (shows when Dark to switch to Light) */}
          <svg
            className={`absolute h-4.5 w-4.5 text-amber-400 transition-all duration-500 ease-out transform ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>

          {/* Moon Icon (shows when Light to switch to Dark) */}
          <svg
            className={`absolute h-4.5 w-4.5 text-slate-700 transition-all duration-500 ease-out transform ${
              isDark
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </div>
      )}
    </button>
  );
}
