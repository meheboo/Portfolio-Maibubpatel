import React from "react";
import { TechIcons } from "./TechIcons";

function TechBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" style={{ zIndex: 0 }}>
      {/* Ambient Radial Color Spots with Subtle Blue-Purple Gradients */}
      <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-indigo-200/25 via-purple-200/20 to-blue-200/20 dark:from-indigo-600/20 dark:via-purple-600/15 dark:to-blue-600/15 blur-[140px] animate-pulse-glow" />
      <div
        className="absolute top-[32%] -right-36 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-blue-200/20 via-indigo-200/20 to-violet-200/15 dark:from-blue-600/15 dark:via-indigo-600/15 dark:to-violet-600/12 blur-[150px] animate-pulse-glow"
        style={{ animationDelay: "2.5s" }}
      />
      <div
        className="absolute top-[68%] -left-32 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-purple-200/20 via-indigo-200/20 to-sky-200/15 dark:from-purple-600/15 dark:via-indigo-600/15 dark:to-sky-600/12 blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "4.5s" }}
      />

      {/* Modern Developer Tech Grid Pattern */}
      <div className="absolute inset-0 bg-tech-dots opacity-40 dark:opacity-25" />
      <div className="absolute inset-0 bg-circuit-grid opacity-30 dark:opacity-20" />

      {/* Floating Ambient Technology Badges in Background */}
      
      {/* 1. Top Right - NestJS Badge */}
      <div className="absolute top-[12%] right-[4%] hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 px-3.5 py-2 shadow-sm backdrop-blur-xs animate-float-slow opacity-60 dark:opacity-50 hover:opacity-100 transition-opacity">
        <TechIcons.NestJS className="h-5 w-5" />
        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">NestJS v10</span>
      </div>

      {/* 2. Top Left - React Badge */}
      <div
        className="absolute top-[22%] left-[3%] hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 px-3.5 py-2 shadow-sm backdrop-blur-xs animate-float-reverse opacity-55 dark:opacity-50 hover:opacity-100 transition-opacity"
        style={{ animationDelay: "1s" }}
      >
        <TechIcons.React className="h-5 w-5" />
        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">React.js 19</span>
      </div>

      {/* 3. Mid Right - PostgreSQL Shard Badge */}
      <div
        className="absolute top-[42%] right-[2%] hidden xl:flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 px-3 py-1.5 shadow-sm backdrop-blur-xs animate-float-slow opacity-50 dark:opacity-40"
        style={{ animationDelay: "3s" }}
      >
        <TechIcons.PostgreSQL className="h-5 w-5" />
        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">PostgreSQL Sharded</span>
      </div>

      {/* 4. Mid Left - BullMQ & Redis Badge */}
      <div
        className="absolute top-[52%] left-[2%] hidden xl:flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 px-3 py-1.5 shadow-sm backdrop-blur-xs animate-float-reverse opacity-50 dark:opacity-40"
        style={{ animationDelay: "2s" }}
      >
        <TechIcons.BullMQ className="h-5 w-5" />
        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">BullMQ Async Queue</span>
      </div>

      {/* 5. Lower Right - Docker Container Badge */}
      <div
        className="absolute top-[75%] right-[5%] hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 px-3.5 py-2 shadow-sm backdrop-blur-xs animate-float-slow opacity-55 dark:opacity-45"
        style={{ animationDelay: "4s" }}
      >
        <TechIcons.Docker className="h-5 w-5" />
        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">Dockerized</span>
      </div>

      {/* 6. Lower Left - AWS Cloud Badge */}
      <div
        className="absolute top-[85%] left-[4%] hidden lg:flex items-center gap-2 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 px-3 py-1.5 shadow-sm backdrop-blur-xs animate-float-reverse opacity-50 dark:opacity-40"
        style={{ animationDelay: "1.5s" }}
      >
        <TechIcons.AWS className="h-5 w-5" />
        <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">Cloud Infrastructure</span>
      </div>
    </div>
  );
}

export default TechBackground;
