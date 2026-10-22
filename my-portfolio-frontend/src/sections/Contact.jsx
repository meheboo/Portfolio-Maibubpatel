import { useState } from "react";
import { EMAIL_ADDRESS, PHONE_NUMBER, GITHUB_URL, LINKEDIN_URL } from "../constants";
import { TechIcons } from "../components/TechIcons";
import SpotlightCard from "../components/SpotlightCard";

const initialForm = {
  name: "",
  email: "",
  subject: "Full-Time Opportunity",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | sending | success | error

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: "error", message: "Please fill in all required fields." });
      return;
    }

    setStatus({ state: "sending", message: "Opening your email application..." });

    // Open mailto link as direct email dispatch
    const mailto = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${form.subject} from ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    )}`;

    setTimeout(() => {
      window.open(mailto, "_blank");
      setStatus({
        state: "success",
        message: "Your default email application has opened with your message ready to send!",
      });
      setForm(initialForm);
    }, 500);
  }

  function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-850 focus:ring-2 focus:ring-indigo-600/10 focus-visible:ring-2 focus-visible:ring-indigo-600";

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="section-badge-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>Direct Connection</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Let's Discuss{" "}
            <span className="text-aurora">
              Engineering Opportunities
            </span>.
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            I am actively open to Full-Time Backend, Full Stack, and Distributed Systems roles. Reach out directly or send a message below.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info Cards + Interactive Form */}
        <div className="mt-8 sm:mt-10 grid gap-6 lg:gap-8 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Direct Reach Cards with Cursor Spotlight & Brand Colors */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-6">
            {/* Email Card - Official Gmail Red Accent */}
            <SpotlightCard className="social-btn-email group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-xs focus-within:ring-2 focus-within:ring-[#EA4335]">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-4 text-left"
                  title="Click to open email application"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-2deg]">
                    <TechIcons.Email className="h-full w-full" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      Email Address
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#EA4335] transition-colors">
                      {EMAIL_ADDRESS}
                    </p>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 inline-block">
                      Opens email app ↗
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(EMAIL_ADDRESS, "email")}
                  className="btn-copy-interactive rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 shadow-2xs focus-visible:ring-2 focus-visible:ring-[#EA4335]"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </SpotlightCard>

            {/* Phone / WhatsApp Card - Official WhatsApp Green Accent */}
            <SpotlightCard className="social-btn-phone group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-xs focus-within:ring-2 focus-within:ring-[#25D366]">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                  className="flex items-center gap-4 text-left"
                  title="Click to call"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[2deg]">
                    <TechIcons.Phone className="h-full w-full" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      Phone / WhatsApp
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#25D366] transition-colors">
                      {PHONE_NUMBER}
                    </p>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 inline-block">
                      Available for calls & WhatsApp ↗
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PHONE_NUMBER, "phone")}
                  className="btn-copy-interactive rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 shadow-2xs focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </SpotlightCard>

            {/* Social Links Cards with Official Brand Colors */}
            <div className="grid grid-cols-2 gap-4">
              {/* GitHub Card */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn-github group flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs focus-visible:ring-2 focus-visible:ring-slate-800"
                title="Explore GitHub Repositories (@meheboo)"
                aria-label="Visit GitHub Profile"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-2 shadow-2xs transition-transform duration-300 group-hover:scale-110">
                    <TechIcons.GitHub className="h-full w-full" brandColor={true} />
                  </div>
                  <span className="text-xs text-slate-400 font-bold group-hover:text-slate-900 dark:group-hover:text-white transition-colors">↗</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white">GitHub</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">@meheboo</p>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn-linkedin group flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-xs focus-visible:ring-2 focus-visible:ring-[#0A66C2]"
                title="Connect on LinkedIn (Maibub Patel)"
                aria-label="Visit LinkedIn Profile"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 p-2 shadow-2xs transition-transform duration-300 group-hover:scale-110">
                    <TechIcons.LinkedIn className="h-full w-full" brandColor={true} />
                  </div>
                  <span className="text-xs text-blue-400 font-bold group-hover:text-[#0A66C2] transition-colors">↗</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0A66C2]">LinkedIn</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Maibub Patel</p>
                </div>
              </a>
            </div>

            {/* Location & Status Banner */}
            <SpotlightCard className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-2xs">
              <div className="relative z-10 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900 dark:text-white">Immediate Availability:</span>
                <span>Open for Full-Time Roles (Bangalore / Remote)</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Contact Message Form with Spotlight */}
          <div className="lg:col-span-6 flex flex-col">
            <SpotlightCard className="h-full rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Send an Inquiry</h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Direct Delivery</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fill in your details below to start a conversation regarding full-time roles or software engineering contracts.
                  </p>

                  {status.message && (
                    <div
                      className={`mt-4 rounded-2xl p-4 text-xs font-semibold ${
                        status.state === "success"
                          ? "border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : "border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                      }`}
                    >
                      {status.message}
                    </div>
                  )}

                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          Your Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. sarah@techcorp.com"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Subject / Discussion Type
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="Full-Time Backend Role">Full-Time Backend Role</option>
                        <option value="Full Stack Engineering Role">Full Stack Engineering Role</option>
                        <option value="Distributed Systems Project">Distributed Systems Project</option>
                        <option value="Technical Consultation">Technical Consultation</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        rows={5}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Hello Maibub, we reviewed your backend portfolio and would love to connect..."
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="btn-aurora-primary group flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer mt-5"
                >
                  <TechIcons.Email className="h-4 w-4 icon-interactive" />
                  <span>{status.state === "sending" ? "Opening Email App..." : "Send Message via Email"}</span>
                  <span className="arrow-slide font-bold">→</span>
                </button>
              </form>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
