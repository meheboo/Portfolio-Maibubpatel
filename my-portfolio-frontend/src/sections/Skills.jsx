import { useState } from "react";
import { TechIcons } from "../components/TechIcons";
import SpotlightCard from "../components/SpotlightCard";

const ALL_SKILLS = [
  // Backend
  {
    name: "Node.js",
    category: "backend",
    categoryName: "Backend & APIs",
    role: "Non-blocking event loop runtime for high-throughput microservices and API gateways",
    badge: "Production Core",
    level: "95%",
    Icon: TechIcons.NodeJS,
    tagColor: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  {
    name: "NestJS",
    category: "backend",
    categoryName: "Backend & APIs",
    role: "Domain-Driven Design (DDD), modular dependency injection, and scalable microservices",
    badge: "Production Core",
    level: "90%",
    Icon: TechIcons.NestJS,
    tagColor: "border-rose-200 bg-rose-50 text-rose-800",
  },
  {
    name: "Express.js",
    category: "backend",
    categoryName: "Backend & APIs",
    role: "Lightweight REST API architecture, custom middleware pipelines, and route guards",
    badge: "High Scale",
    level: "95%",
    Icon: TechIcons.Express,
    tagColor: "border-slate-200 bg-slate-100 text-slate-800",
  },
  {
    name: "REST APIs",
    category: "backend",
    categoryName: "Backend & APIs",
    role: "Standardized HTTP contracts, versioning, idempotent operations, and payload validation",
    badge: "Production Core",
    level: "95%",
    Icon: TechIcons.RestAPI,
    tagColor: "border-indigo-200 bg-indigo-50 text-indigo-800",
  },
  {
    name: "JWT Authentication",
    category: "backend",
    categoryName: "Backend & APIs",
    role: "Multi-tenant Role-Based Access Control (RBAC), token rotation, and secure sessions",
    badge: "Security Core",
    level: "90%",
    Icon: TechIcons.JWT,
    tagColor: "border-purple-200 bg-purple-50 text-purple-800",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "database",
    categoryName: "Databases & Storage",
    role: "Horizontal database sharding, ACID transactions, complex joins, and B-Tree indexing",
    badge: "Production Core",
    level: "92%",
    Icon: TechIcons.PostgreSQL,
    tagColor: "border-sky-200 bg-sky-50 text-sky-800",
  },
  {
    name: "Prisma ORM",
    category: "database",
    categoryName: "Databases & Storage",
    role: "Type-safe database client, schema migrations, and sharded connection pooling",
    badge: "Daily Driver",
    level: "90%",
    Icon: TechIcons.Prisma,
    tagColor: "border-teal-200 bg-teal-50 text-teal-800",
  },
  {
    name: "MongoDB",
    category: "database",
    categoryName: "Databases & Storage",
    role: "Document modeling, aggregation pipelines, flexible schemas, and high-velocity storage",
    badge: "Production Core",
    level: "88%",
    Icon: TechIcons.MongoDB,
    tagColor: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  {
    name: "MySQL",
    category: "database",
    categoryName: "Databases & Storage",
    role: "Relational database modeling, normalization, indexed queries, and foreign key integrity",
    badge: "Relational",
    level: "85%",
    Icon: TechIcons.MySQL,
    tagColor: "border-amber-200 bg-amber-50 text-amber-800",
  },

  // Queues & Concurrency
  {
    name: "Redis",
    category: "queues",
    categoryName: "Queues & Caching",
    role: "Sub-millisecond memory caching, distributed locks (Redlock), and pub/sub messaging",
    badge: "High Scale",
    level: "90%",
    Icon: TechIcons.Redis,
    tagColor: "border-rose-200 bg-rose-50 text-rose-800",
  },
  {
    name: "BullMQ",
    category: "queues",
    categoryName: "Queues & Caching",
    role: "Asynchronous job orchestration, delayed jobs, exponential backoffs, and worker concurrency",
    badge: "High Scale",
    level: "88%",
    Icon: TechIcons.BullMQ,
    tagColor: "border-red-200 bg-red-50 text-red-800",
  },

  // Frontend
  {
    name: "React.js",
    category: "frontend",
    categoryName: "Frontend Engineering",
    role: "Component-driven architecture, custom hooks, virtual DOM performance, and state management",
    badge: "Production Core",
    level: "92%",
    Icon: TechIcons.React,
    tagColor: "border-cyan-200 bg-cyan-50 text-cyan-800",
  },
  {
    name: "JavaScript (ES6+)",
    category: "frontend",
    categoryName: "Frontend Engineering",
    role: "Asynchronous async/await, closures, functional programming, and modern JS idioms",
    badge: "Core Foundation",
    level: "95%",
    Icon: TechIcons.JavaScript,
    tagColor: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryName: "Frontend Engineering",
    role: "Strict type safety, custom interfaces, generic data structures, and enterprise scalability",
    badge: "Production Core",
    level: "90%",
    Icon: TechIcons.TypeScript,
    tagColor: "border-blue-200 bg-blue-50 text-blue-800",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryName: "Frontend Engineering",
    role: "Utility-first responsive layouts, custom design systems, and micro-interactions",
    badge: "Daily Driver",
    level: "95%",
    Icon: TechIcons.Tailwind,
    tagColor: "border-sky-200 bg-sky-50 text-sky-800",
  },
  {
    name: "HTML5",
    category: "frontend",
    categoryName: "Frontend Engineering",
    role: "Semantic markup, accessibility (a11y), clean document hierarchy, and SEO ergonomics",
    badge: "Web Standard",
    level: "95%",
    Icon: TechIcons.HTML5,
    tagColor: "border-orange-200 bg-orange-50 text-orange-800",
  },
  {
    name: "CSS3",
    category: "frontend",
    categoryName: "Frontend Engineering",
    role: "Flexbox, CSS Grid, custom keyframe animations, and glassmorphism styling",
    badge: "Web Standard",
    level: "90%",
    Icon: TechIcons.CSS3,
    tagColor: "border-blue-200 bg-blue-50 text-blue-800",
  },

  // DevOps & Tools
  {
    name: "Docker",
    category: "tools",
    categoryName: "DevOps & Cloud",
    role: "Containerized development, multi-stage Dockerfiles, and compose orchestrations",
    badge: "Infrastructure",
    level: "85%",
    Icon: TechIcons.Docker,
    tagColor: "border-blue-200 bg-blue-50 text-blue-800",
  },
  {
    name: "AWS",
    category: "tools",
    categoryName: "DevOps & Cloud",
    role: "EC2 instances, S3 storage buckets, and foundational cloud infrastructure",
    badge: "Cloud Ready",
    level: "80%",
    Icon: TechIcons.AWS,
    tagColor: "border-amber-200 bg-amber-50 text-amber-800",
  },
  {
    name: "Git",
    category: "tools",
    categoryName: "DevOps & Cloud",
    role: "Branching strategies, interactive rebasing, merge resolutions, and clean commit history",
    badge: "Daily Driver",
    level: "92%",
    Icon: TechIcons.Git,
    tagColor: "border-orange-200 bg-orange-50 text-orange-800",
  },
  {
    name: "GitHub",
    category: "tools",
    categoryName: "DevOps & Cloud",
    role: "Pull requests, code reviews, automated CI/CD actions, and repository management",
    badge: "Daily Driver",
    level: "92%",
    Icon: TechIcons.GitHub,
    tagColor: "border-slate-200 bg-slate-100 text-slate-800",
  },
  {
    name: "Postman",
    category: "tools",
    categoryName: "DevOps & Cloud",
    role: "API collection authoring, automated test scripts, mock servers, and contract inspection",
    badge: "Testing",
    level: "90%",
    Icon: TechIcons.Postman,
    tagColor: "border-orange-200 bg-orange-50 text-orange-800",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Technologies", count: 22 },
  { id: "backend", label: "Backend & APIs", count: 5 },
  { id: "database", label: "Databases & Storage", count: 4 },
  { id: "queues", label: "Queues & Caching", count: 2 },
  { id: "frontend", label: "Frontend", count: 6 },
  { id: "tools", label: "DevOps & Tools", count: 5 },
];

function Skills() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPipelineStep, setSelectedPipelineStep] = useState(1);

  const filteredSkills =
    activeFilter === "all"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeFilter);

  const pipelineSteps = [
    {
      step: 1,
      title: "Client Layer",
      tech: "React.js / Tailwind CSS",
      desc: "Fast, responsive user interface with client-side state handling and reactive data rendering.",
      activeClass: "border-cyan-400 bg-gradient-to-br from-cyan-50 to-sky-100/70 shadow-md ring-2 ring-cyan-200",
      accentColor: "text-cyan-700",
      dotColor: "bg-cyan-600",
      badge: "Frontend UI",
    },
    {
      step: 2,
      title: "API Gateway & Auth",
      tech: "NestJS / Node.js + JWT",
      desc: "Secure entry point with RBAC guards, input validation pipes, and route dispatching.",
      activeClass: "border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-100/70 shadow-md ring-2 ring-purple-200",
      accentColor: "text-purple-700",
      dotColor: "bg-purple-600",
      badge: "Gateway & Auth",
    },
    {
      step: 3,
      title: "Async Message Queue",
      tech: "BullMQ + Redis",
      desc: "Decoupled asynchronous worker engine with retries, delayed queues, and zero HTTP blocking.",
      activeClass: "border-rose-400 bg-gradient-to-br from-rose-50 to-pink-100/70 shadow-md ring-2 ring-rose-200",
      accentColor: "text-rose-700",
      dotColor: "bg-rose-600",
      badge: "Job Engine",
    },
    {
      step: 4,
      title: "Sharded Data Layer",
      tech: "PostgreSQL Prisma + MongoDB",
      desc: "High-scale multi-tenant storage with horizontal sharding router and optimized indexes.",
      activeClass: "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-100/70 shadow-md ring-2 ring-emerald-200",
      accentColor: "text-emerald-700",
      dotColor: "bg-emerald-600",
      badge: "Sharded Storage",
    },
  ];

  const categoryActiveStyles = {
    all: "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25",
    backend: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25",
    database: "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-500/25",
    queues: "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/25",
    frontend: "bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md shadow-cyan-500/25",
    tools: "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/25",
  };

  const categoryGradients = {
    backend: "from-emerald-500 to-teal-500",
    database: "from-sky-500 to-indigo-500",
    queues: "from-rose-500 to-pink-500",
    frontend: "from-cyan-500 to-blue-500",
    tools: "from-amber-500 to-orange-500",
  };

  const getBarClass = (cat) => {
    switch (cat) {
      case "backend":
        return "skill-bar-emerald";
      case "database":
        return "skill-bar-indigo";
      case "queues":
        return "skill-bar-rose";
      case "frontend":
        return "skill-bar-cyan";
      default:
        return "skill-bar-amber";
    }
  };

  const getIconBg = (cat) => {
    switch (cat) {
      case "backend":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
      case "database":
        return "border-sky-200 bg-sky-50 text-sky-700";
      case "queues":
        return "border-rose-200 bg-rose-50 text-rose-700";
      case "frontend":
        return "border-cyan-200 bg-cyan-50 text-cyan-700";
      default:
        return "border-amber-200 bg-amber-50 text-amber-700";
    }
  };

  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="section-badge-pill">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Technical Expertise</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Skills &{" "}
              <span className="text-aurora">
                System Tooling
              </span>.
            </h2>

            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Production-tested stack spanning distributed backend architectures, high-scale database sharding, asynchronous queues, and modern client engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-mono text-slate-800 dark:text-slate-200 shadow-2xs self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-indigo-700 dark:text-indigo-400">22 Verified Technologies</span>
          </div>
        </div>

        {/* Interactive Architecture Pipeline Banner */}
        <div className="mt-8 sm:mt-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Interactive Engineering Pattern
              </p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Distributed High-Throughput Request Lifecycle
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Click any stage below to inspect details
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pipelineSteps.map((step) => {
              const isSelected = selectedPipelineStep === step.step;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setSelectedPipelineStep(step.step)}
                  className={`rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? step.activeClass
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${step.accentColor}`}>
                      Stage 0{step.step}
                    </span>
                    {isSelected && (
                      <span className={`h-2.5 w-2.5 rounded-full ${step.dotColor} animate-pulse`} />
                    )}
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                    {step.tech}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Pipeline Detail Box */}
          <div className="mt-4 rounded-xl border border-indigo-200/90 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-sky-50/60 dark:from-indigo-950/60 dark:via-purple-950/50 dark:to-sky-950/50 p-4 text-sm text-slate-800 dark:text-slate-200 shadow-2xs">
            <span className="font-bold text-indigo-900 dark:text-indigo-300">
              {pipelineSteps[selectedPipelineStep - 1].title} ({pipelineSteps[selectedPipelineStep - 1].badge}):{" "}
            </span>
            {pipelineSteps[selectedPipelineStep - 1].desc}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          {CATEGORIES.map((cat) => {
            const isCatActive = activeFilter === cat.id;
            const activeStyle = categoryActiveStyles[cat.id] || categoryActiveStyles.all;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`btn-filter-pill rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isCatActive
                    ? `${activeStyle} font-bold -translate-y-0.5`
                    : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-80 font-mono text-[11px]">
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid with Cursor Spotlight Effect */}
        <div className="mt-6 sm:mt-7 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => {
            const Icon = skill.Icon;
            const barClass = getBarClass(skill.category);
            const iconBg = getIconBg(skill.category);
            const topGradient = categoryGradients[skill.category] || "from-indigo-500 to-purple-500";

            return (
              <SpotlightCard
                key={skill.name}
                as="article"
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Top Accent Stripe */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${topGradient}`} />

                <div className="relative z-10">
                  {/* Card Header: Icon, Name & Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border p-2.5 shadow-2xs transition-all duration-300 group-hover:scale-115 group-hover:rotate-1 group-hover:shadow-md ${iconBg} dark:bg-slate-800 dark:border-slate-700`}>
                        <Icon className="h-full w-full icon-interactive" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {skill.categoryName}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-medium shadow-2xs transition-transform group-hover:scale-105 ${skill.tagColor} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200`}
                    >
                      {skill.badge}
                    </span>
                  </div>

                  {/* Architecture Role Description */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {skill.role}
                  </p>
                </div>

                {/* Level Bar Meter with Tailored Colorful Fill */}
                <div className="relative z-10 mt-5 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>Proficiency</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{skill.level}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${barClass}`}
                      style={{ width: skill.level }}
                    />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Skills;
