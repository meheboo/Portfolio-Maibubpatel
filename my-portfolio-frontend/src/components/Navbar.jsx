import { useState, useEffect } from "react";
import { RESUME_URL } from "../constants";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Scroll depth tracking and active section observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollTop > 15);

      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // At the very top, activate Home
      if (scrollTop < 80) {
        setActiveSection("home");
        return;
      }

      // At the bottom of the page, activate Contact
      if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      const sections = ["home", "about", "skills", "projects", "experience", "education", "contact"];
      const navbarOffset = 110;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navbarOffset) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Check if URL has hash on initial load and smoothly navigate
    const initialHash = window.location.hash ? window.location.hash.replace("#", "") : null;
    if (initialHash) {
      setTimeout(() => {
        const el = document.getElementById(initialHash);
        if (el) {
          const navbarHeight = 84;
          const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, absoluteTop - navbarHeight),
            behavior: "smooth",
          });
          setActiveSection(initialHash);
        }
      }, 150);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Programmatic smooth scroll to exact section position with fixed navbar compensation
  const scrollToSection = (e, targetId) => {
    if (e) {
      e.preventDefault();
    }
    setMobileMenuOpen(false);

    if (targetId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (window.location.hash !== "#home") {
        history.pushState(null, "", "#home");
      }
      setActiveSection("home");
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 84;
      const elementRect = element.getBoundingClientRect();
      const absoluteTop = elementRect.top + window.scrollY;
      const targetScrollY = Math.max(0, absoluteTop - navbarHeight);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });

      if (window.location.hash !== `#${targetId}`) {
        history.pushState(null, "", `#${targetId}`);
      }
      setActiveSection(targetId);
    }
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 w-full px-3 pt-3 pb-2 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none"
      style={{ boxShadow: "none", filter: "none" }}
    >
      <div
        className={`clean-navbar-pill mx-auto max-w-6xl rounded-2xl border transition-all duration-300 pointer-events-auto relative shadow-none ${
          scrolled
            ? "border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md"
            : "border-slate-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
        }`}
        style={{
          boxShadow: "none",
          WebkitBoxShadow: "none",
          filter: "none",
        }}
      >
        {/* Dynamic Reading Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 rounded-t-2xl transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, boxShadow: "none" }}
          aria-hidden="true"
        />

        <div className="flex h-16 items-center justify-between px-3.5 sm:px-6">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="group flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500 transition-transform duration-200 hover:scale-101 cursor-pointer"
            aria-label="Maibub Patel - Home"
          >
            {/* Monogram Badge */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 font-bold text-white transition-all duration-300 group-hover:scale-105">
              <span className="text-sm tracking-tight font-extrabold">MP</span>
              {/* Availability Beacon */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Maibub Patel
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for hire
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links & Action */}
          <div className="hidden lg:flex items-center gap-3">
            <nav
              aria-label="Main Navigation"
              className="flex items-center gap-1 sm:gap-1.5"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`relative px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 rounded-lg cursor-pointer ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/70 dark:bg-indigo-950/60"
                        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Quick Resume View CTA Button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aurora-primary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-transform duration-200 hover:scale-102 focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Open Resume (PDF)"
              aria-label="Open Resume in new tab"
            >
              <span>Resume</span>
              <span className="text-[11px] font-bold">↗</span>
            </a>

            {/* Light / Dark Mode Toggle Button */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition hover:border-slate-300 dark:hover:border-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex flex-col items-center justify-between w-5 h-4">
                <span
                  className={`h-0.5 w-full bg-slate-700 dark:bg-slate-200 rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5 bg-indigo-600 dark:bg-indigo-400" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-slate-700 dark:bg-slate-200 rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-slate-700 dark:bg-slate-200 rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-indigo-600 dark:bg-indigo-400" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="clean-navbar-pill border-t border-slate-100 dark:border-slate-800 px-4 py-4 bg-white dark:bg-slate-900 rounded-b-2xl lg:hidden shadow-none"
            style={{ boxShadow: "none", WebkitBoxShadow: "none" }}
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-bold"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                  </a>
                );
              })}

              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-aurora-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-xs"
                >
                  <span>View Resume (PDF)</span>
                  <span className="text-xs font-bold">↗</span>
                </a>

                <ThemeToggle isMobile={true} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
