import { RESUME_URL, GITHUB_URL, LINKEDIN_URL, EMAIL_ADDRESS, PHONE_NUMBER } from "../constants";
import { TechIcons } from "./TechIcons";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-[#0b0f19]/60 backdrop-blur-md py-6 sm:py-8">
      {/* Top Accent Rim from left corner to right corner */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 via-purple-500/60 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute inset-x-0 top-0 -z-10 flex justify-center pointer-events-none">
        <div className="h-32 w-full max-w-5xl rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Social Icons & Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {/* Resume */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aurora-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Download Resume (PDF)"
            aria-label="Download Resume in PDF format"
          >
            <TechIcons.Resume className="h-4 w-4 icon-interactive" />
            <span>Resume</span>
            <span className="arrow-diagonal text-[10px] font-bold">↗</span>
          </a>

          {/* GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modern-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-800"
            title="GitHub Repositories (@meheboo)"
            aria-label="Visit GitHub Profile"
          >
            <TechIcons.GitHub className="h-4 w-4 icon-interactive" brandColor={true} />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modern-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0A66C2] focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
            title="Connect on LinkedIn"
            aria-label="Visit LinkedIn Profile"
          >
            <TechIcons.LinkedIn className="h-4 w-4 icon-interactive" brandColor={true} />
            <span>LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="btn-modern-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#EA4335] focus-visible:ring-2 focus-visible:ring-[#EA4335]"
            title={`Send Email to ${EMAIL_ADDRESS}`}
            aria-label="Send direct email"
          >
            <TechIcons.Email className="h-4 w-4 icon-interactive" />
            <span>Email</span>
          </a>

          {/* Phone / WhatsApp */}
          <a
            href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modern-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#25D366] focus-visible:ring-2 focus-visible:ring-[#25D366]"
            title={`WhatsApp / Call (${PHONE_NUMBER})`}
            aria-label="Chat on WhatsApp or Call"
          >
            <TechIcons.Phone className="h-4 w-4 icon-interactive" />
            <span>WhatsApp</span>
          </a>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-modern-secondary group inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            title="Scroll back to top"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-1 font-bold text-indigo-600">↑</span>
          </button>
        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2.5 sm:px-2">
          <p>© {new Date().getFullYear()} Maibub Patel. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono">
            <span>Built with React 19, Tailwind CSS & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
