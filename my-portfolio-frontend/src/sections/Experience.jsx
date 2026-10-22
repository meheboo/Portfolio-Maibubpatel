import { VISTAS_LEARNING_URL } from "../constants";
import { TechIcons } from "../components/TechIcons";
import SpotlightCard from "../components/SpotlightCard";

const EXPERIENCES = [
  {
    role: "Backend Developer",
    company: "Dreammithra Pvt. Ltd. (Vista's Learning)",
    location: "Bangalore, Karnataka, India",
    period: "Feb 2026 – Present",
    isCurrent: true,
    liveUrl: VISTAS_LEARNING_URL,
    themeGradient: "from-emerald-500 via-teal-500 to-sky-500",
    hoverBorder: "hover:border-emerald-400 hover:shadow-emerald-500/10",
    companyColor: "text-emerald-700",
    bulletBg: "bg-emerald-100/80 text-emerald-800 border border-emerald-300/80",
    periodStyle: "border-emerald-300 bg-emerald-50 text-emerald-800",
    summary:
      "Leading backend service engineering for the Vista Learning Platform and School Management System, serving high-throughput digital education delivery across multiple tenant roles.",
    points: [
      "Architected and deployed a comprehensive School Management System using Next.js and Node.js, managing backend business logic and end-to-end API integration.",
      "Designed and implemented secure REST APIs for student records, attendance tracking, and multi-tenant Role-Based Access Control (RBAC) across Admin, Teacher, Parent, and Student user tiers.",
      "Managed database operations across PostgreSQL and MongoDB, optimizing B-tree indexes and query execution plans for sub-50ms latency under high concurrent traffic.",
      "Integrated dashboard analytics, centralized user management, and token-based authentication using JWT.",
      "Collaborated across full-stack architecture to enforce clean API contracts, error boundaries, and seamless client-server communication.",
    ],
    technologies: [
      { name: "Node.js", Icon: TechIcons.NodeJS },
      { name: "Next.js", Icon: TechIcons.React },
      { name: "PostgreSQL", Icon: TechIcons.PostgreSQL },
      { name: "MongoDB", Icon: TechIcons.MongoDB },
      { name: "REST APIs", Icon: TechIcons.RestAPI },
      { name: "JWT", Icon: TechIcons.JWT },
      { name: "TypeScript", Icon: TechIcons.TypeScript },
    ],
  },
  {
    role: "Backend Developer",
    company: "Paywize Technologies Private Limited",
    location: "Bangalore, Karnataka, India",
    period: "Aug 2024 – Jan 2026",
    isCurrent: false,
    themeGradient: "from-indigo-500 via-purple-500 to-violet-500",
    hoverBorder: "hover:border-indigo-400 hover:shadow-indigo-500/10",
    companyColor: "text-indigo-700",
    bulletBg: "bg-indigo-100/80 text-indigo-800 border border-indigo-300/80",
    periodStyle: "border-indigo-300 bg-indigo-50 text-indigo-800",
    summary:
      "Core backend engineer building distributed financial microservices, database sharding strategies, and asynchronous event-driven worker pipelines.",
    points: [
      "Architected scalable backend microservices using Node.js, NestJS, TypeScript, and Express.js adhering to modular domain-driven design.",
      "Built resilient role-based authentication and authorization mechanisms with JWT for Admin, Staff, and Student user tiers.",
      "Designed and optimized PostgreSQL and MongoDB database layers using Prisma ORM, including horizontal database sharding strategies to eliminate tenant lock contention.",
      "Implemented asynchronous background job processing pipelines using BullMQ and Redis for payment task processing, delayed queues, and retry logic.",
      "Engineered real-time features using Socket.IO and developed enterprise workflows including employee leave management and multi-level approval engines.",
      "Containerized backend services with Docker and enforced automated Git/GitHub version control workflows.",
    ],
    technologies: [
      { name: "NestJS", Icon: TechIcons.NestJS },
      { name: "Node.js", Icon: TechIcons.NodeJS },
      { name: "PostgreSQL", Icon: TechIcons.PostgreSQL },
      { name: "Redis", Icon: TechIcons.Redis },
      { name: "BullMQ", Icon: TechIcons.BullMQ },
      { name: "Prisma", Icon: TechIcons.Prisma },
      { name: "Docker", Icon: TechIcons.Docker },
      { name: "TypeScript", Icon: TechIcons.TypeScript },
    ],
  },
  {
    role: "MERN Development Intern",
    company: "PROWEBIC Pvt. Ltd.",
    location: "Bangalore, Karnataka, India",
    period: "Jan 2024 – Jun 2024",
    isCurrent: false,
    themeGradient: "from-sky-500 via-cyan-500 to-blue-500",
    hoverBorder: "hover:border-sky-400 hover:shadow-sky-500/10",
    companyColor: "text-sky-700",
    bulletBg: "bg-sky-100/80 text-sky-800 border border-sky-300/80",
    periodStyle: "border-sky-300 bg-sky-50 text-sky-800",
    summary:
      "Full-stack MERN development internship focused on REST API engineering, CI/CD pipeline optimization, and client payload validation.",
    points: [
      "Implemented secure authentication modules and modular backend services using Node.js, Express.js, and MongoDB.",
      "Contributed to CI/CD pipeline automation and build optimization, reducing deployment cycle times by 60%.",
      "Collaborated with senior engineers on REST API debugging, client payload validation, and clean state handling in React.",
    ],
    technologies: [
      { name: "Node.js", Icon: TechIcons.NodeJS },
      { name: "Express.js", Icon: TechIcons.Express },
      { name: "MongoDB", Icon: TechIcons.MongoDB },
      { name: "React.js", Icon: TechIcons.React },
      { name: "JavaScript", Icon: TechIcons.JavaScript },
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="section-badge-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>Career Milestones</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Professional{" "}
            <span className="text-aurora">
              Work Experience
            </span>.
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Proven track record architecting high-throughput backend services, database sharding strategies, and scalable systems across enterprise companies.
          </p>
        </div>

        {/* Timeline Container with Cursor Spotlight Cards */}
        <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
          {EXPERIENCES.map((item) => (
            <SpotlightCard
              key={item.company}
              as="article"
              className={`relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden ${item.hoverBorder}`}
            >
              {/* Decorative Top Accent Stripe */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${item.themeGradient}`} />

              <div className="relative z-10">
                {/* Header: Role, Company & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      {item.isCurrent && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-2xs">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          Current Position
                        </span>
                      )}
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
                      <p className={`text-base font-bold ${item.companyColor}`}>
                        {item.company}
                      </p>
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/90 dark:bg-indigo-950/70 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-2xs transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-xs hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-indigo-500"
                          title="Visit Vista's Learning Live Platform"
                        >
                          <span>Live Platform</span>
                          <span className="arrow-diagonal text-xs font-bold">↗</span>
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      📍 {item.location}
                    </p>
                  </div>

                  <div className={`rounded-xl border px-3.5 py-1.5 text-xs font-mono font-bold self-start sm:self-auto shadow-2xs ${item.periodStyle} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200`}>
                    {item.period}
                  </div>
                </div>

                {/* Role Summary */}
                <p className="mt-5 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {item.summary}
                </p>

                {/* Achievement Bullet Points with Colorful Check Badges */}
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold mt-0.5 shadow-2xs ${item.bulletBg} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200`}>
                        ✓
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies Badges */}
                <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-slate-100 dark:border-slate-800">
                  {item.technologies.map((tech) => {
                    const Icon = tech.Icon;
                    return (
                      <span
                        key={tech.name}
                        className="tech-badge-interactive group/tech inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/90 dark:bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs cursor-default hover:bg-white dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        {Icon && (
                          <span className="transition-transform duration-200 group-hover/tech:scale-120">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span>{tech.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Experience;
