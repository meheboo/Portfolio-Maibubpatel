import { useState } from "react";
import { VISTAS_LEARNING_URL } from "../constants";
import { TechIcons } from "../components/TechIcons";
import SpotlightCard from "../components/SpotlightCard";

const PROJECTS = [
  {
    id: "vistas",
    title: "Vista's Learning Platform",
    category: "fullstack",
    year: "2026",
    type: "Enterprise EdTech Platform & School Management",
    badge: "Flagship Production",
    badgeColor: "border-emerald-300 bg-emerald-50 text-emerald-800",
    themeGradient: "from-emerald-500 via-teal-500 to-sky-500",
    hoverBorder: "hover:border-emerald-400 hover:shadow-emerald-500/10",
    solutionBorder: "border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 to-teal-50/50",
    solutionHeader: "text-emerald-800",
    problem:
      "Large-scale digital education ecosystem requiring high-throughput REST APIs, multi-tenant RBAC (Admin, Teacher, Parent, Student), and fast digital learning delivery across thousands of active students.",
    solution:
      "Engineered backend business logic, database layers, and RESTful APIs using Node.js, Next.js, PostgreSQL, and MongoDB. Implemented student records, attendance tracking, secure JWT authentication, and query optimization for high performance.",
    technologies: [
      { name: "Node.js", Icon: TechIcons.NodeJS },
      { name: "Next.js", Icon: TechIcons.React },
      { name: "PostgreSQL", Icon: TechIcons.PostgreSQL },
      { name: "MongoDB", Icon: TechIcons.MongoDB },
      { name: "REST APIs", Icon: TechIcons.RestAPI },
      { name: "JWT", Icon: TechIcons.JWT },
      { name: "TypeScript", Icon: TechIcons.TypeScript },
    ],
    status: "Live Production Platform",
    githubUrl: null, // Commercial client system
    liveUrl: VISTAS_LEARNING_URL,
    liveLabel: "Live Platform",
  },
  {
    id: "wallet",
    title: "Wallet Backend System",
    category: "backend",
    year: "2025",
    type: "Distributed Financial Backend Architecture",
    badge: "Core Architecture",
    badgeColor: "border-indigo-300 bg-indigo-50 text-indigo-800",
    themeGradient: "from-indigo-500 via-purple-500 to-violet-500",
    hoverBorder: "hover:border-indigo-400 hover:shadow-indigo-500/10",
    solutionBorder: "border-indigo-200/90 bg-gradient-to-br from-indigo-50/80 to-purple-50/50",
    solutionHeader: "text-indigo-800",
    problem:
      "High-concurrency financial operations require strict transactional consistency, horizontal database scaling across multiple tenant shards, and asynchronous payment event execution.",
    solution:
      "Engineered a resilient NestJS wallet backend utilizing PostgreSQL with horizontal database sharding algorithms, Prisma ORM for type-safe data access, and BullMQ/Redis for non-blocking asynchronous event processing.",
    technologies: [
      { name: "NestJS", Icon: TechIcons.NestJS },
      { name: "TypeScript", Icon: TechIcons.TypeScript },
      { name: "Prisma ORM", Icon: TechIcons.Prisma },
      { name: "PostgreSQL", Icon: TechIcons.PostgreSQL },
      { name: "Redis", Icon: TechIcons.Redis },
      { name: "BullMQ", Icon: TechIcons.BullMQ },
      { name: "Docker", Icon: TechIcons.Docker },
    ],
    status: "Production Architecture",
    githubUrl: "https://github.com/meheboo?tab=repositories",
    liveUrl: null,
    liveLabel: "Live Demo",
  },
  {
    id: "simplilearn",
    title: "Enterprise Learning Platform (SimpliLearn Clone)",
    category: "fullstack",
    year: "2025",
    type: "Full Stack / EdTech Web Application",
    badge: "Live Web App",
    badgeColor: "border-cyan-300 bg-cyan-50 text-cyan-800",
    themeGradient: "from-cyan-500 via-sky-500 to-blue-500",
    hoverBorder: "hover:border-cyan-400 hover:shadow-cyan-500/10",
    solutionBorder: "border-cyan-200/90 bg-gradient-to-br from-cyan-50/80 to-sky-50/50",
    solutionHeader: "text-cyan-800",
    problem:
      "Educational platforms need fast server-side rendered pages, course catalog exploration, seamless search, and responsive user onboarding across all viewport sizes.",
    solution:
      "Developed a responsive learning platform using Next.js, React, and Tailwind CSS featuring dynamic course catalog navigation, responsive UI components, and modern web ergonomics.",
    technologies: [
      { name: "React.js", Icon: TechIcons.React },
      { name: "JavaScript", Icon: TechIcons.JavaScript },
      { name: "Tailwind CSS", Icon: TechIcons.Tailwind },
      { name: "HTML5", Icon: TechIcons.HTML5 },
      { name: "CSS3", Icon: TechIcons.CSS3 },
    ],
    status: "Live Application",
    githubUrl: "https://github.com/meheboo?tab=repositories",
    liveUrl: "https://stellar-profiterole-9504d0.netlify.app",
    liveLabel: "Live Demo",
  },
  {
    id: "todolist",
    title: "React Task & Workflow Manager",
    category: "frontend",
    year: "2024",
    type: "Single-Page Productivity Application",
    badge: "Productivity Tool",
    badgeColor: "border-amber-300 bg-amber-50 text-amber-800",
    themeGradient: "from-amber-500 via-orange-500 to-yellow-500",
    hoverBorder: "hover:border-amber-400 hover:shadow-amber-500/10",
    solutionBorder: "border-amber-200/90 bg-gradient-to-br from-amber-50/80 to-yellow-50/50",
    solutionHeader: "text-amber-800",
    problem:
      "Users need a zero-latency personal productivity tool with real-time state persistence and intuitive task transitions without page reloads.",
    solution:
      "Implemented a single-page React productivity manager featuring local state persistence, dynamic status categorization, and clean keyboard accessibility.",
    technologies: [
      { name: "React.js", Icon: TechIcons.React },
      { name: "JavaScript", Icon: TechIcons.JavaScript },
      { name: "CSS3", Icon: TechIcons.CSS3 },
      { name: "HTML5", Icon: TechIcons.HTML5 },
    ],
    status: "Live Application",
    githubUrl: "https://github.com/meheboo?tab=repositories",
    liveUrl: "https://reactjs-todolist-191patel.netlify.app/",
    liveLabel: "Live Demo",
  },
];

const PROJECT_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Live Web & EdTech" },
  { id: "backend", label: "Backend Architecture" },
  { id: "frontend", label: "Frontend & Tools" },
];

function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="section-badge-pill">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Selected Portfolio</span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Featured{" "}
              <span className="text-aurora">
                Systems & Applications
              </span>.
            </h2>

            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Production backends, live commercial education platforms, and deployed full-stack web applications demonstrating verified technical engineering.
            </p>
          </div>

          <a
            href="https://github.com/meheboo?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modern-secondary group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 self-start md:self-auto focus-visible:ring-2 focus-visible:ring-slate-800"
          >
            <TechIcons.GitHub className="h-4 w-4 icon-interactive" brandColor={true} />
            <span>Explore All Repositories</span>
            <span className="arrow-diagonal text-xs font-bold">↗</span>
          </a>
        </div>

        {/* Project Filter Pills */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`btn-filter-pill rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                filter === cat.id
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/25 font-bold -translate-y-0.5"
                  : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid with Cursor Spotlight Effect */}
        <div className="mt-6 sm:mt-7 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              as="article"
              className={`group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden ${project.hoverBorder}`}
            >
              {/* Decorative Top Accent Stripe */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${project.themeGradient}`} />

              <div className="relative z-10">
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold font-mono shadow-2xs ${project.badgeColor} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200`}
                  >
                    {project.badge}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold">{project.year}</span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                  {project.type}
                </p>

                {/* Problem & Solution Panels */}
                <div className="mt-5 space-y-3 text-sm leading-relaxed">
                  <div className="rounded-2xl border border-rose-200/70 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/40 to-slate-50/50 dark:from-rose-950/30 dark:to-slate-900/50 p-4 shadow-2xs">
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      Engineering Challenge:
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {project.problem}
                    </p>
                  </div>

                  <div className={`rounded-2xl border p-4 shadow-2xs ${project.solutionBorder} dark:bg-slate-800/60 dark:border-slate-700`}>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${project.solutionHeader} dark:text-emerald-400`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Architectural Solution:
                    </p>
                    <p className="text-slate-800 dark:text-slate-200">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Technologies Pills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => {
                    const TechIcon = tech.Icon;
                    return (
                      <span
                        key={tech.name}
                        className="tech-badge-interactive group/tech inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs cursor-default hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        {TechIcon && (
                          <span className="transition-transform duration-200 group-hover/tech:scale-120">
                            <TechIcon className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span>{tech.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-aurora-primary group inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-md shadow-indigo-600/20"
                    title={`Open ${project.title} live platform`}
                  >
                    <span>{project.liveLabel || "Live Demo"}</span>
                    <span className="arrow-diagonal font-bold">↗</span>
                  </a>
                )}

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn-github group inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:border-slate-800 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-slate-800"
                    title={`View ${project.title} source code on GitHub`}
                  >
                    <TechIcons.GitHub className="h-4 w-4 icon-interactive" brandColor={true} />
                    <span>Source Code</span>
                    <span className="arrow-diagonal font-bold">↗</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    🔒 Commercial Production Platform
                  </span>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;
