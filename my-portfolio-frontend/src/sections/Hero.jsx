import { useState } from "react";
import { RESUME_URL, GITHUB_URL, LINKEDIN_URL, EMAIL_ADDRESS } from "../constants";
import { TechIcons } from "../components/TechIcons";
import SpotlightCard from "../components/SpotlightCard";

const CORE_TECH_LIST = [
  { name: "React.js", Icon: TechIcons.React, role: "Frontend UI" },
  { name: "Node.js", Icon: TechIcons.NodeJS, role: "Runtime Engine" },
  { name: "Express.js", Icon: TechIcons.Express, role: "REST APIs" },
  { name: "NestJS", Icon: TechIcons.NestJS, role: "Enterprise Architecture" },
  { name: "JavaScript", Icon: TechIcons.JavaScript, role: "Core Language" },
  { name: "TypeScript", Icon: TechIcons.TypeScript, role: "Type Safety" },
  { name: "PostgreSQL", Icon: TechIcons.PostgreSQL, role: "Relational / Sharding" },
  { name: "MongoDB", Icon: TechIcons.MongoDB, role: "Document NoSQL" },
  { name: "Docker", Icon: TechIcons.Docker, role: "Containers" },
];

const ARCHITECTURE_SNIPPET = {
  filename: "ShardingRouter.ts",
  description: "PostgreSQL Horizontal Database Sharding Strategy",
  code: `@Injectable()
export class DatabaseShardingRouter {
  private shardClients = new Map<number, PrismaClient>();

  async getShardForTenant(tenantId: string): Promise<PrismaClient> {
    const shardIndex = crc32(tenantId) % TOTAL_SHARDS;
    const client = this.shardClients.get(shardIndex);
    if (!client) throw new NotFoundException(\`Shard \${shardIndex} offline\`);
    return client; // Zero cross-tenant lock contention
  }
}`,
};

function Hero() {
  const [showCodePreview, setShowCodePreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ARCHITECTURE_SNIPPET.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative scroll-mt-24 pt-2 pb-8 sm:pt-4 sm:pb-12 md:pb-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline, Bio, CTAs, and Subtle Tech Icons */}
          <div className="lg:col-span-7">
            
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 dark:border-emerald-800/80 bg-emerald-50/90 dark:bg-emerald-950/60 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-2xs mb-5 backdrop-blur-xs transition-transform duration-200 hover:scale-102 max-w-full">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="truncate sm:whitespace-normal">
                Available for Full-Time Roles <span className="hidden sm:inline">• Full Stack & Backend Engineer</span>
              </span>
            </div>

            {/* Developer Name Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">
                Maibub Patel
              </span>
              <span className="h-1 w-8 bg-indigo-500/40 rounded-full" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.18] sm:leading-[1.12]">
              Full Stack Developer{" "}
              <span className="block mt-1 text-aurora">
                | React.js & Node.js
              </span>
            </h1>

            {/* Professional Introduction */}
            <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">Maibub Patel</strong>. I engineer scalable full-stack web applications and high-throughput backend services based in Bangalore, India.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Experienced in architecting multi-tenant REST APIs, horizontal database sharding algorithms, asynchronous worker pipelines with BullMQ & Redis, and responsive user interfaces with React.js and Next.js.
            </p>

            {/* Prominent Hero Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("projects");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 84;
                    window.scrollTo({ top, behavior: "smooth" });
                    history.pushState(null, "", "#projects");
                  }
                }}
                className="btn-aurora-primary group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-md shadow-indigo-500/20 focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              >
                <span>View Projects</span>
                <span className="arrow-diagonal text-base font-bold">↗</span>
              </a>

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
                className="btn-modern-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                title="Send an email or message"
              >
                <TechIcons.Email className="h-4 w-4 icon-interactive" />
                <span>Contact Me</span>
              </a>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-indigo-500"
                title="View Resume in PDF format"
              >
                <TechIcons.Resume className="h-4 w-4 icon-interactive" />
                <span>Resume</span>
                <span className="text-xs">↗</span>
              </a>

              {/* Quick Social Icons Strip */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-github flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs focus-visible:ring-2 focus-visible:ring-slate-800"
                  title="GitHub Profile (@meheboo)"
                  aria-label="GitHub Profile"
                >
                  <TechIcons.GitHub className="h-5 w-5 icon-interactive" brandColor={true} />
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn-linkedin flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <TechIcons.LinkedIn className="h-5 w-5 icon-interactive" brandColor={true} />
                </a>

                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="social-btn-email flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xs focus-visible:ring-2 focus-visible:ring-[#EA4335]"
                  title={`Direct Email (${EMAIL_ADDRESS})`}
                  aria-label="Send Direct Email"
                >
                  <TechIcons.Email className="h-5 w-5 icon-interactive" />
                </a>
              </div>
            </div>

            {/* Subtle Technology Icons Strip (9 Requested Technologies) */}
            <div className="mt-7 border-t border-slate-200/80 dark:border-slate-800 pt-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Core Technologies
                </span>
                <span className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold">• 9 Key Proficiencies</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {CORE_TECH_LIST.map((tech) => {
                  const Icon = tech.Icon;
                  return (
                    <div
                      key={tech.name}
                      className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-slate-700/60 hover:text-indigo-900 dark:hover:text-indigo-300 hover:shadow-xs hover:-translate-y-0.5 cursor-default"
                      title={`${tech.name} - ${tech.role}`}
                    >
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-115" />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SpotlightCard className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-3 text-center shadow-2xs">
                <p className="text-xl font-bold text-slate-900 dark:text-white">1+ Yr</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Production Exp</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl border border-indigo-100 dark:border-indigo-950/60 bg-white/80 dark:bg-slate-900/80 p-3 text-center shadow-2xs">
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">99.9%</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Target Uptime</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl border border-cyan-100 dark:border-cyan-950/60 bg-white/80 dark:bg-slate-900/80 p-3 text-center shadow-2xs">
                <p className="text-xl font-bold text-sky-700 dark:text-sky-400">&lt;50ms</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">P95 Latency</p>
              </SpotlightCard>
              <SpotlightCard className="rounded-xl border border-emerald-100 dark:border-emerald-950/60 bg-white/80 dark:bg-slate-900/80 p-3 text-center shadow-2xs">
                <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">5+ Apps</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Deployed Systems</p>
              </SpotlightCard>
            </div>

          </div>

          {/* Right Column: Developer Photo Showcase & Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Ambient Glow behind Portrait */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-sky-500/15 dark:from-indigo-600/30 dark:via-purple-600/25 dark:to-sky-600/25 blur-2xl transform scale-105" />

              {/* Main Profile Showcase Card */}
              <SpotlightCard className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 backdrop-blur-xl">
                
                {/* Floating Tech Badges around Photo */}
                <div className="relative">
                  <div className="absolute -top-3 -left-3 z-10 flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-md animate-float-slow hover:scale-105 transition-transform">
                    <TechIcons.React className="h-4 w-4" />
                    <span>React 19</span>
                  </div>

                  <div className="absolute -top-3 -right-3 z-10 flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-md animate-float-reverse hover:scale-105 transition-transform">
                    <TechIcons.NodeJS className="h-4 w-4" />
                    <span>Node.js</span>
                  </div>

                  <div className="absolute top-[50%] -left-4 z-10 hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-md animate-float-slow hover:scale-105 transition-transform">
                    <TechIcons.NestJS className="h-4 w-4" />
                    <span>NestJS</span>
                  </div>

                  <div className="absolute top-[50%] -right-4 z-10 hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-md animate-float-reverse hover:scale-105 transition-transform">
                    <TechIcons.PostgreSQL className="h-4 w-4" />
                    <span>PostgreSQL</span>
                  </div>

                  {/* High Quality Developer Photo */}
                  <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80 overflow-hidden rounded-2xl border-4 border-white dark:border-slate-800 shadow-2xl ring-1 ring-slate-200/80 dark:ring-slate-700 group">
                    <img
                      src="/profile.jpg"
                      alt="Maibub Patel - Full Stack Developer | React.js & Node.js"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-104"
                    />

                    {/* Gradient Overlay at Bottom of Photo */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />

                    {/* On-Photo Availability Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium backdrop-blur-md bg-slate-900/40 rounded-xl px-3 py-1.5 border border-white/20">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold">Open to Work</span>
                      </div>
                      <span className="text-[11px] text-white/80">Full-Time</span>
                    </div>
                  </div>
                </div>

                {/* Profile Details Below Photo */}
                <div className="mt-5 text-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Maibub Patel</h2>
                  <p className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    Full Stack Developer | React.js & Node.js
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                    <span>📍</span> Bangalore, Karnataka, India
                  </p>
                </div>

                {/* Current Role Pill */}
                <div className="mt-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 p-3 text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">CURRENT POSITION</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Backend Developer @ Dreammithra (Vista's Learning)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Enterprise School Management System & Multi-Tenant REST APIs
                  </p>
                </div>

                {/* Collapsible Backend Architecture Code Peek */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setShowCodePreview(!showCodePreview)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200/70 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-600 transition-colors"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span>💻</span> {showCodePreview ? "Hide" : "Preview"} Production Sharding Code
                    </span>
                    <span className="text-xs">{showCodePreview ? "▲" : "▼"}</span>
                  </button>

                  {showCodePreview && (
                    <div className="mt-2 rounded-xl bg-[#0f172a] text-slate-200 overflow-hidden text-left border border-slate-800 shadow-md">
                      <div className="flex items-center justify-between border-b border-slate-800 bg-[#0a0f1d] px-3 py-2 text-[11px] font-mono text-slate-400">
                        <span>{ARCHITECTURE_SNIPPET.filename}</span>
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="hover:text-white transition-colors"
                        >
                          {copied ? "✓ Copied" : "📋 Copy"}
                        </button>
                      </div>
                      <pre className="p-3 text-[11px] font-mono text-indigo-300 leading-relaxed overflow-x-auto">
                        <code>{ARCHITECTURE_SNIPPET.code}</code>
                      </pre>
                    </div>
                  )}
                </div>

              </SpotlightCard>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
