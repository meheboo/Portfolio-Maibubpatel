import React from "react";
import { TechIcons } from "./TechIcons";

const TECH_ITEMS = [
  { name: "Node.js", category: "Backend Runtime", Icon: TechIcons.NodeJS },
  { name: "NestJS", category: "Enterprise Architecture", Icon: TechIcons.NestJS },
  { name: "React.js", category: "Frontend UI", Icon: TechIcons.React },
  { name: "PostgreSQL", category: "Relational / Sharding", Icon: TechIcons.PostgreSQL },
  { name: "Redis", category: "In-Memory Caching", Icon: TechIcons.Redis },
  { name: "BullMQ", category: "Async Job Queues", Icon: TechIcons.BullMQ },
  { name: "Express.js", category: "REST Microservices", Icon: TechIcons.Express },
  { name: "Docker", category: "Containerization", Icon: TechIcons.Docker },
  { name: "MongoDB", category: "NoSQL Database", Icon: TechIcons.MongoDB },
  { name: "Prisma ORM", category: "Type-Safe DB Layer", Icon: TechIcons.Prisma },
  { name: "JWT Auth", category: "Token Security / RBAC", Icon: TechIcons.JWT },
  { name: "TypeScript", category: "Type Safety", Icon: TechIcons.TypeScript },
  { name: "Tailwind CSS", category: "Modern Styling", Icon: TechIcons.Tailwind },
  { name: "AWS", category: "Cloud Infrastructure", Icon: TechIcons.AWS },
  { name: "REST APIs", category: "API Design", Icon: TechIcons.RestAPI },
  { name: "Git & GitHub", category: "Version Control", Icon: TechIcons.GitHub },
  { name: "Postman", category: "API Testing", Icon: TechIcons.Postman },
  { name: "MySQL", category: "Relational Database", Icon: TechIcons.MySQL },
];

function TechMarquee({ reverse = false, className = "", subtitle = null }) {
  // If reverse is requested, reverse the array order
  const baseItems = reverse ? [...TECH_ITEMS].reverse() : TECH_ITEMS;
  // Duplicate array for seamless infinite loop
  const marqueeList = [...baseItems, ...baseItems];

  return (
    <div className={`relative w-full overflow-hidden border-y border-slate-200/70 dark:border-slate-800/70 bg-white/40 dark:bg-slate-900/40 py-2.5 sm:py-3 backdrop-blur-xs ${className}`}>
      {/* Optional Subtitle / Tag */}
      {subtitle && (
        <div className="text-center mb-2.5">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50/90 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800 rounded-full px-3.5 py-1 shadow-2xs">
            {subtitle}
          </span>
        </div>
      )}

      {/* Edge gradient masks spanning from left corner to right corner */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#f8fafc]/70 dark:from-[#0b0f19]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-[#f8fafc]/70 dark:from-[#0b0f19]/70 to-transparent" />

      {/* Marquee Track: Right-to-Left (animate-marquee) */}
      <div className={`${reverse ? "animate-marquee-reverse" : "animate-marquee"} flex items-center gap-4`}>
        {marqueeList.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={`${item.name}-${index}`}
              className="group flex items-center gap-2.5 sm:gap-3 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 shadow-2xs transition-all duration-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/15 hover:scale-105 cursor-default shrink-0"
            >
              <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center">
                <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 icon-interactive" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 transition-transform duration-200 group-hover:scale-125" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechMarquee;
