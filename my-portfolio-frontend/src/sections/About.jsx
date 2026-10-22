import { RESUME_URL } from "../constants";
import { TechIcons } from "../components/TechIcons";
import SpotlightCard from "../components/SpotlightCard";

function About() {
  const pillars = [
    {
      title: "Frontend Engineering",
      subtitle: "React.js, Next.js & Modern UI",
      desc: "Developing fast, responsive, and accessible client-side applications with React.js 19, Next.js, and modern CSS architecture. Focused on component modularity, fluid user feedback, and clean state flows.",
      Icon: TechIcons.React,
      badge: "Frontend UI",
      badgeColor: "border-cyan-300 bg-cyan-50 text-cyan-800",
      iconBg: "border-cyan-200/90 bg-gradient-to-br from-cyan-50 to-sky-100 text-cyan-600 shadow-sm shadow-cyan-500/10",
      hoverBorder: "hover:border-cyan-400 hover:shadow-cyan-500/10",
      topGradient: "from-cyan-500 to-sky-500",
      accentText: "text-cyan-700",
    },
    {
      title: "Scalable Backend & APIs",
      subtitle: "Node.js, Express.js & NestJS",
      desc: "Architecting domain-driven RESTful microservices with strict dependency injection, robust middleware pipelines, error boundaries, and multi-tenant Role-Based Access Control (RBAC).",
      Icon: TechIcons.NodeJS,
      badge: "Backend Core",
      badgeColor: "border-emerald-300 bg-emerald-50 text-emerald-800",
      iconBg: "border-emerald-200/90 bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-600 shadow-sm shadow-emerald-500/10",
      hoverBorder: "hover:border-emerald-400 hover:shadow-emerald-500/10",
      topGradient: "from-emerald-500 to-teal-500",
      accentText: "text-emerald-700",
    },
    {
      title: "Database Engineering & Sharding",
      subtitle: "PostgreSQL, Prisma & MongoDB",
      desc: "Implementing horizontal database sharding algorithms, B-Tree indexes, connection pooling, and multi-tenant schema isolation to eliminate concurrency locks and ensure sub-50ms query latency.",
      Icon: TechIcons.PostgreSQL,
      badge: "Data Scale",
      badgeColor: "border-indigo-300 bg-indigo-50 text-indigo-800",
      iconBg: "border-indigo-200/90 bg-gradient-to-br from-indigo-50 to-purple-100 text-indigo-600 shadow-sm shadow-indigo-500/10",
      hoverBorder: "hover:border-indigo-400 hover:shadow-indigo-500/10",
      topGradient: "from-indigo-500 to-purple-500",
      accentText: "text-indigo-700",
    },
    {
      title: "Async Pipelines & Concurrency",
      subtitle: "BullMQ, Redis & Docker",
      desc: "Building non-blocking background task workers with automated retry strategies, exponential backoff, dead-letter queues, Redis caching layers, and containerized Docker environments.",
      Icon: TechIcons.BullMQ,
      badge: "Async Engine",
      badgeColor: "border-rose-300 bg-rose-50 text-rose-800",
      iconBg: "border-rose-200/90 bg-gradient-to-br from-rose-50 to-pink-100 text-rose-600 shadow-sm shadow-rose-500/10",
      hoverBorder: "hover:border-rose-400 hover:shadow-rose-500/10",
      topGradient: "from-rose-500 to-pink-500",
      accentText: "text-rose-700",
    },
  ];

  const quickFacts = [
    {
      label: "Location",
      val: "Bangalore, Karnataka, India",
      dot: "bg-emerald-500",
      cardBg: "border-emerald-200/80 dark:border-emerald-800/60 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-teal-950/30 text-emerald-950 dark:text-emerald-200",
      labelColor: "text-emerald-700 dark:text-emerald-400",
    },
    {
      label: "Current Role",
      val: "Backend Developer @ Vista's Learning",
      dot: "bg-indigo-500",
      cardBg: "border-indigo-200/80 dark:border-indigo-800/60 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/40 dark:from-slate-900 dark:via-indigo-950/30 dark:to-violet-950/30 text-indigo-950 dark:text-indigo-200",
      labelColor: "text-indigo-700 dark:text-indigo-400",
    },
    {
      label: "Degree",
      val: "Master of Computer Applications (MCA)",
      dot: "bg-amber-500",
      cardBg: "border-amber-200/80 dark:border-amber-800/60 bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/40 dark:from-slate-900 dark:via-amber-950/30 dark:to-yellow-950/30 text-amber-950 dark:text-amber-200",
      labelColor: "text-amber-700 dark:text-amber-400",
    },
    {
      label: "Core Stack",
      val: "React.js, Node.js, Express, NestJS, Postgres",
      dot: "bg-sky-500",
      cardBg: "border-sky-200/80 dark:border-sky-800/60 bg-gradient-to-br from-white via-sky-50/30 to-cyan-50/40 dark:from-slate-900 dark:via-sky-950/30 dark:to-cyan-950/30 text-sky-950 dark:text-sky-200",
      labelColor: "text-sky-700 dark:text-sky-400",
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="section-badge-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>About The Engineer</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Passionate About Crafting{" "}
            <span className="text-aurora">
              Resilient Full-Stack Systems
            </span>.
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
            I am a full-stack and backend engineer based in <strong className="text-slate-900 dark:text-white">Bangalore, India</strong> with hands-on production experience building scalable architectures, high-concurrency transactional services, and modern interactive web applications.
          </p>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Through engineering roles at <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-200/60 dark:border-indigo-800">Dreammithra (Vista's Learning)</span> and <span className="font-semibold text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/60 px-2 py-0.5 rounded-lg border border-sky-200/60 dark:border-sky-800">Paywize Technologies</span>, I have architected high-throughput REST APIs, horizontal database sharding strategies, asynchronous job worker pipelines with BullMQ, and responsive user experiences using React.js.
          </p>
        </div>

        {/* Quick Facts Grid Bar */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {quickFacts.map((fact) => (
            <SpotlightCard
              key={fact.label}
              className={`rounded-2xl border p-4 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${fact.cardBg}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`h-2 w-2 rounded-full ${fact.dot} animate-pulse`} />
                <p className={`text-[11px] font-mono font-bold uppercase tracking-wider ${fact.labelColor}`}>
                  {fact.label}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {fact.val}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* 4 Core Pillars Cards Grid */}
        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.Icon;
            return (
              <SpotlightCard
                key={pillar.title}
                as="article"
                className={`group relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden ${pillar.hoverBorder}`}
              >
                {/* Decorative Top Accent Stripe */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${pillar.topGradient}`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border p-2.5 transition-all duration-300 group-hover:scale-115 group-hover:rotate-2 group-hover:shadow-lg ${pillar.iconBg}`}>
                      <Icon className="h-full w-full icon-interactive" />
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shadow-2xs ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className={`mt-1 text-xs font-mono font-semibold ${pillar.accentText}`}>
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {pillar.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-8 sm:mt-10 rounded-3xl border border-indigo-200/90 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-100/70 via-purple-100/60 to-cyan-100/70 dark:from-indigo-950/60 dark:via-purple-950/50 dark:to-cyan-950/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-indigo-200/80 dark:border-indigo-700 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Immediate Availability
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Looking for a dedicated Full Stack or Backend Engineer?
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-xl">
              I am available for full-time opportunities and ready to deliver immediate impact to your engineering team with production React, Node.js, NestJS, and PostgreSQL.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 84;
                  window.scrollTo({ top, behavior: "smooth" });
                  history.pushState(null, "", "#contact");
                }
              }}
              className="btn-aurora-primary rounded-xl px-5 py-3 text-xs font-semibold shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <span>Get In Touch</span>
              <span className="arrow-slide">→</span>
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern-secondary rounded-xl px-4 py-3 text-xs font-semibold"
            >
              <span>View Resume ↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
