import SpotlightCard from "../components/SpotlightCard";

const EDUCATION_DATA = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Visvesvaraya Technological University (VTU)",
    location: "Bangalore, Karnataka, India",
    year: "2020 – 2022",
    badge: "Master's Degree",
    badgeColor: "border-indigo-300 bg-indigo-50 text-indigo-800",
    themeGradient: "from-indigo-600 via-purple-600 to-violet-600",
    hoverBorder: "hover:border-indigo-400 hover:shadow-indigo-500/10",
    instColor: "text-indigo-700",
    chipColor: "border-indigo-200/80 bg-indigo-50/70 text-indigo-900 hover:bg-white hover:border-indigo-400 hover:text-indigo-700",
    details:
      "Advanced graduate curriculum focusing on Distributed Computing, Advanced Database Management Systems (RDBMS & NoSQL), Object-Oriented Software Design, Cloud Architecture, and Enterprise Web Technologies.",
    highlights: [
      "Distributed Systems Architecture",
      "RDBMS & NoSQL Optimization",
      "Advanced Data Structures & Algorithms",
      "Cloud Infrastructure",
      "Object-Oriented Design Patterns",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Gulbarga University",
    location: "Kalaburagi, Karnataka, India",
    year: "2017 – 2020",
    badge: "Bachelor's Degree",
    badgeColor: "border-sky-300 bg-sky-50 text-sky-800",
    themeGradient: "from-sky-500 via-cyan-500 to-teal-500",
    hoverBorder: "hover:border-sky-400 hover:shadow-sky-500/10",
    instColor: "text-sky-700",
    chipColor: "border-sky-200/80 bg-sky-50/70 text-sky-900 hover:bg-white hover:border-sky-400 hover:text-sky-700",
    details:
      "Comprehensive foundational undergraduate education in Computer Science fundamentals, Algorithmic Analysis, Relational Database Modeling, System Programming, and Web Standards.",
    highlights: [
      "Data Structures & Algorithms",
      "Relational Database Design",
      "Operating Systems & Linux CLI",
      "Computer Networks & Protocols",
      "Full-Lifecycle Software Engineering",
    ],
  },
];

function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="section-badge-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>Academic Qualifications</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Education &{" "}
            <span className="text-aurora">
              Credentials
            </span>.
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Formal graduate and undergraduate degrees in computer applications and distributed software engineering.
          </p>
        </div>

        {/* Education Cards Grid with Cursor Spotlight Effect */}
        <div className="mt-7 sm:mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
          {EDUCATION_DATA.map((item) => (
            <SpotlightCard
              key={item.degree}
              as="article"
              className={`group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden ${item.hoverBorder}`}
            >
              {/* Decorative Top Accent Stripe */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${item.themeGradient}`} />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-semibold shadow-2xs ${item.badgeColor} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200`}
                    >
                      {item.badge}
                    </span>
                    <span className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 shadow-2xs">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.degree}
                  </h3>

                  <p className={`mt-1 text-base font-bold ${item.instColor}`}>
                    {item.institution}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    📍 {item.location}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.details}
                  </p>

                  {/* Highlights Coursework */}
                  <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {item.highlights.map((topic) => (
                      <span
                        key={topic}
                        className={`tech-badge-interactive rounded-lg border px-2.5 py-1 text-xs font-medium shadow-2xs transition-all duration-200 ${item.chipColor} dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">Verified Academic Degree</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Education;
