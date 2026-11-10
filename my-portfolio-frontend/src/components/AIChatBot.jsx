import React, { useState, useRef, useEffect } from "react";
import { INITIAL_SUGGESTIONS } from "../services/aiChatService";
import { apiClient } from "../services/apiClient";

const SESSION_STORAGE_KEY = "portfolio_ai_chat_session_id";

function getOrCreateSessionId() {
  try {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return `sess_${Date.now()}`;
  }
}

const CLEAN_WELCOME_MESSAGE = {
  id: "welcome",
  sender: "intro",
  text: "Hello! I'm your AI Technical Interview Assistant. Ask me anything about software development, programming, coding interviews, or system design.",
  timestamp: "Just now",
};

/**
 * Modern AI Vector Icon
 * A sleek cybernetic assistant mascot with glowing visor eyes, top antenna, and a twinkling 4-point star.
 */
function ModernAIIcon({ className = "w-7 h-7" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="aiFaceGrad" x1="4" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0e7ff" />
          </linearGradient>
          <linearGradient id="aiVisorGrad" x1="7" y1="10" x2="25" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="aiEyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="aiStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Top Antenna stalk & glowing beacon */}
        <line x1="16" y1="2.5" x2="16" y2="6.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="2.5" r="2" fill="#38bdf8" className="animate-pulse" />

        {/* Bot Outer Head Frame */}
        <rect
          x="4.5"
          y="6.5"
          width="23"
          height="18"
          rx="7"
          fill="url(#aiFaceGrad)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Ear Pods */}
        <rect x="2.5" y="11.5" width="2" height="8" rx="1" fill="#c7d2fe" />
        <rect x="27.5" y="11.5" width="2" height="8" rx="1" fill="#c7d2fe" />

        {/* Cyber Visor Screen */}
        <rect
          x="7.5"
          y="10"
          width="17"
          height="11"
          rx="4"
          fill="url(#aiVisorGrad)"
        />

        {/* Dual Glowing Visor Eyes with Reflection Catchlights */}
        <ellipse cx="12" cy="15.5" rx="2.2" ry="2.6" fill="url(#aiEyeGlow)" />
        <ellipse cx="20" cy="15.5" rx="2.2" ry="2.6" fill="url(#aiEyeGlow)" />
        <circle cx="12.8" cy="14.6" r="0.75" fill="#ffffff" />
        <circle cx="20.8" cy="14.6" r="0.75" fill="#ffffff" />

        {/* Subtle Friendly Visor Smile */}
        <path
          d="M14.5 18.5C15 19 17 19 17.5 18.5"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Chin Accent */}
        <line x1="14" y1="26.5" x2="18" y2="26.5" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Twinkling Generative AI Sparkle Star */}
      <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center pointer-events-none ai-sparkle-icon">
        <svg viewBox="0 0 16 16" fill="none" className="w-full h-full drop-shadow-[0_0_6px_rgba(56,189,248,0.85)]">
          <path
            d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z"
            fill="url(#aiStarGrad)"
          />
        </svg>
      </div>
    </div>
  );
}

export default function AIChatBot({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? controlledSetIsOpen : setInternalIsOpen;

  const [messages, setMessages] = useState([CLEAN_WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => textareaRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Load conversation history from backend on initial mount
  useEffect(() => {
    const fetchHistory = async () => {
      const sessionId = getOrCreateSessionId();
      try {
        const res = await apiClient.get(`/api/chat/history/${sessionId}`);
        if (res && res.success && Array.isArray(res.history) && res.history.length > 0) {
          const restoredMessages = [CLEAN_WELCOME_MESSAGE];
          for (const item of res.history) {
            if (item.userMsg) {
              restoredMessages.push({
                id: `hist-user-${item.id}`,
                sender: "user",
                text: item.userMsg,
                timestamp: item.createdAt
                  ? new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "Earlier",
              });
            }
            if (item.botReply) {
              restoredMessages.push({
                id: `hist-ai-${item.id}`,
                sender: "ai",
                text: item.botReply,
                timestamp: item.createdAt
                  ? new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "Earlier",
              });
            }
          }
          setMessages(restoredMessages);
        }
      } catch (err) {
        console.warn("Could not load chat history from backend:", err);
      } finally {
        setHistoryLoaded(true);
      }
    };

    if (!historyLoaded) {
      fetchHistory();
    }
  }, [historyLoaded]);

  // Keyboard accessibility: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const sessionId = getOrCreateSessionId();

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // POST directly to NestJS backend -> Ollama AI Integration
      const backendRes = await apiClient.post(
        "/api/chat/message",
        {
          sessionId,
          message: query,
        },
        { timeout: 120000 }
      );

      if (backendRes && backendRes.text) {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: backendRes.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: backendRes.actions || [],
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("No response text received from server.");
      }
    } catch (apiError) {
      console.error("AI chat error via backend:", apiError);
      const errorMessage =
        apiError?.data?.message ||
        apiError?.message ||
        "Unable to generate response from AI Assistant. Please verify connection and retry.";

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          isError: true,
          failedQuery: query,
          text: `⚠️ **Generation Failed**: ${errorMessage}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = (query) => {
    handleSendMessage(query);
  };

  const handleActionClick = (action) => {
    if (action.type === "scroll") {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        showToast(`Scrolled to #${action.target}`);
      }
    } else if (action.type === "link") {
      window.open(action.url, "_blank", "noopener,noreferrer");
    } else if (action.type === "copy") {
      navigator.clipboard.writeText(action.text);
      showToast(`✓ Copied: ${action.text}`);
    } else if (action.type === "prompt") {
      handleSendMessage(action.prompt);
    }
  };

  const handleClearChat = () => {
    // Generate fresh session ID to start clean session
    try {
      const newSessionId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
    } catch {
      // ignore
    }
    setMessages([CLEAN_WELCOME_MESSAGE]);
    showToast("Chat conversation cleared");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to format basic markdown-style text safely, with code block support
  const renderFormattedText = (text) => {
    const codeBlockRegex = /```([a-zA-Z0-9]*)\n([\s\S]*?)```/g;
    const elements = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const textChunk = text.substring(lastIndex, match.index);
        elements.push(
          <div key={`text-${key++}`}>
            {renderMarkdownLines(textChunk)}
          </div>
        );
      }

      const lang = match[1] || "code";
      const codeContent = match[2];
      elements.push(
        <div key={`code-${key++}`} className="my-2 rounded-xl border border-slate-700/60 bg-slate-900 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-1 bg-slate-800/90 border-b border-slate-700/50 text-[10px] font-mono text-slate-400">
            <span>{lang}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(codeContent.trim());
                showToast("✓ Code copied");
              }}
              className="hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Copy
            </button>
          </div>
          <pre className="p-3 text-[11px] font-mono text-slate-100 overflow-x-auto leading-relaxed whitespace-pre">
            <code>{codeContent.trim()}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      elements.push(
        <div key={`text-${key++}`}>
          {renderMarkdownLines(text.substring(lastIndex))}
        </div>
      );
    }

    return elements;
  };

  const renderMarkdownLines = (text) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-bold text-slate-900 dark:text-white text-sm mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        );
      }
      // Header 2
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-bold text-slate-900 dark:text-white text-sm mt-2 mb-1">
            {line.replace("## ", "")}
          </h3>
        );
      }
      // Header 1
      if (line.startsWith("# ")) {
        return (
          <h2 key={idx} className="font-extrabold text-slate-900 dark:text-white text-base mt-2 mb-1">
            {line.replace("# ", "")}
          </h2>
        );
      }
      // Bullet point
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={idx} className="ml-3 list-disc text-slate-700 dark:text-slate-300 text-xs my-0.5 leading-relaxed">
            {formatInlineText(line.replace(/^[-*]\s/, ""))}
          </li>
        );
      }
      // Numbered list item
      if (/^\d+\.\s/.test(line)) {
        return (
          <p key={idx} className="text-slate-700 dark:text-slate-300 text-xs my-1 leading-relaxed pl-1">
            {formatInlineText(line)}
          </p>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Standard line
      return (
        <p key={idx} className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed my-0.5">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  // Inline formatting helper for **bold**, `code`, and [links](url)
  const formatInlineText = (str) => {
    const parts = [];
    let remaining = str;
    let key = 0;

    while (remaining.length > 0) {
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      const codeMatch = remaining.match(/`(.*?)`/);

      let firstMatch = null;
      let matchType = null;
      let minIndex = remaining.length;

      if (linkMatch && linkMatch.index < minIndex) {
        minIndex = linkMatch.index;
        firstMatch = linkMatch;
        matchType = "link";
      }
      if (boldMatch && boldMatch.index < minIndex) {
        minIndex = boldMatch.index;
        firstMatch = boldMatch;
        matchType = "bold";
      }
      if (codeMatch && codeMatch.index < minIndex) {
        minIndex = codeMatch.index;
        firstMatch = codeMatch;
        matchType = "code";
      }

      if (!firstMatch) {
        parts.push(remaining);
        break;
      }

      if (minIndex > 0) {
        parts.push(remaining.substring(0, minIndex));
      }

      if (matchType === "link") {
        parts.push(
          <a
            key={key++}
            href={firstMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800 dark:hover:text-indigo-200"
          >
            {firstMatch[1]}
          </a>
        );
      } else if (matchType === "bold") {
        parts.push(
          <strong key={key++} className="font-bold text-slate-900 dark:text-white">
            {firstMatch[1]}
          </strong>
        );
      } else if (matchType === "code") {
        parts.push(
          <code
            key={key++}
            className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 font-mono text-[11px] text-indigo-700 dark:text-indigo-300 font-medium"
          >
            {firstMatch[1]}
          </code>
        );
      }

      remaining = remaining.substring(minIndex + firstMatch[0].length);
    }

    return parts;
  };

  return (
    <>
      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 rounded-xl border border-indigo-200 dark:border-indigo-800/70 bg-white/95 dark:bg-slate-900/95 px-3.5 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xl shadow-indigo-500/15 backdrop-blur-md animate-float-slow">
          {toastMessage}
        </div>
      )}

      {/* Mobile Backdrop for click-outside dismissal */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 dark:bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 sm:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Floating Chat Trigger Button Fixed at Bottom-Right */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 select-none">
        {/* Teaser pill visible on desktop when closed */}
        {!isOpen && hasUnread && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-indigo-200/90 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 px-3.5 py-2 shadow-lg shadow-indigo-500/15 backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-slate-100 transition-all duration-300 hover:scale-103 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-indigo-500/25 group cursor-pointer"
            aria-label="Open Technical Interview Assistant"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text font-bold">
              Tech Interview AI
            </span>
            <span className="text-xs transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              ✨
            </span>
          </button>
        )}

        {/* Main Launcher Floating Button with Layered Glow & Modern AI Icon */}
        <div className="relative group ai-floating-btn">
          {/* Ambient Breathing Radial Glow Halo */}
          {!isOpen && <div className="ai-glow-halo" />}

          {/* Radar Pulse Ping Ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-[ai-radar-ping_3.2s_ease-out_infinite] pointer-events-none" />
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
              isOpen
                ? "bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-slate-900/40 rotate-90 scale-95 ring-2 ring-slate-300 dark:ring-slate-700"
                : "btn-aurora-primary border border-white/40 ring-2 ring-indigo-400/25 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-4px_rgba(79,70,229,0.5),0_0_24px_4px_rgba(124,58,237,0.35)] active:scale-95"
            }`}
            aria-label={isOpen ? "Close AI Assistant" : "Open Technical Interview Assistant"}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            title={isOpen ? "Close Assistant (Esc)" : "Ask Technical Interview & Coding Questions"}
          >
            {isOpen ? (
              <svg
                className="h-5 w-5 text-white transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <div className="relative flex items-center justify-center">
                <ModernAIIcon className="w-8 h-8" />

                {/* Online Active Status Dot */}
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                </span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Interactive Chat Modal Window with Smooth Scale/Slide Transition */}
      <div
        role="dialog"
        aria-label="Technical Interview Assistant"
        aria-hidden={!isOpen}
        className={`fixed bottom-20 right-3.5 sm:bottom-24 sm:right-6 z-50 flex flex-col w-[410px] max-w-[calc(100vw-1.75rem)] h-[590px] max-h-[calc(100vh-6.5rem)] rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl overflow-hidden origin-bottom-right transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) ai-chat-window shadow-2xl ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-6 pointer-events-none"
        }`}
      >
        {/* Top Glowing Aurora Accent Rim */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shrink-0" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 px-4 py-3 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            {/* Outer rotating gradient ring for AI avatar */}
            <div className="relative p-[1.5px] rounded-xl overflow-hidden shadow-xs">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-spin-slow" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-slate-900">
                <ModernAIIcon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Tech Interview Assistant</span>
                <span className="rounded bg-indigo-100 dark:bg-indigo-950/80 px-1 py-0.2 text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-300 border border-transparent dark:border-indigo-800/50">
                  AI Coach
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Coding & Architecture Interview Prep</span>
              </p>
            </div>
          </div>

          {/* Header Control Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClearChat}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
              title="Clear conversation"
              aria-label="Clear chat"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
              title="Minimize chat (Esc)"
              aria-label="Close chat"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Starter Suggestions Bar - clickable prompt shortcuts */}
        <div className="border-b border-slate-100 dark:border-slate-850 bg-white/70 dark:bg-slate-900/70 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
          {INITIAL_SUGGESTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSendMessage(item.prompt)}
              disabled={isTyping}
              className="btn-filter-pill flex items-center gap-1 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 disabled:opacity-50 cursor-pointer transition-colors"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            // Clean introductory UI message styling
            if (msg.sender === "intro") {
              return (
                <div key={msg.id} className="flex flex-col items-center my-2 text-center">
                  <div className="max-w-[92%] rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-b from-indigo-50/70 to-purple-50/30 dark:from-indigo-950/30 dark:to-slate-900/60 p-4 shadow-xs">
                    <div className="flex justify-center mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                        <ModernAIIcon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                      {msg.text}
                    </p>
                  </div>
                  <span className="mt-1 px-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    Introductory Assistant
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`relative max-w-[88%] rounded-2xl p-3.5 shadow-2xs ${
                    msg.sender === "user"
                      ? "btn-aurora-primary text-white rounded-br-xs"
                      : msg.isError
                      ? "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-bl-xs"
                      : "bg-slate-50 dark:bg-slate-800/70 border border-slate-200/90 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 rounded-bl-xs"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="space-y-1">
                      {renderFormattedText(msg.text)}

                      {/* Error retry button */}
                      {msg.isError && msg.failedQuery && (
                        <div className="mt-2.5 pt-2 border-t border-rose-200/60 dark:border-rose-800/60 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRetry(msg.failedQuery)}
                            disabled={isTyping}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-[11px] font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
                          >
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                            </svg>
                            <span>Retry Question</span>
                          </button>
                        </div>
                      )}

                      {/* Interactive Action Chips for AI Response */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/70 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, actIdx) => (
                            <button
                              key={actIdx}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              disabled={isTyping}
                              className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 dark:border-indigo-800/80 bg-white dark:bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 shadow-2xs transition-all hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-400 dark:hover:border-indigo-600 hover:scale-102 active:scale-95 cursor-pointer disabled:opacity-50"
                            >
                              <span>{act.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <span className="mt-1 px-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator & Loading animation */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                <ModernAIIcon className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 px-3.5 py-2.5 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="ml-1 text-[11px] font-mono text-indigo-500 dark:text-indigo-400 animate-pulse">
                  Generating...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input & Dispatch Footer - Multiline textarea with Enter to send and Shift+Enter for new line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="border-t border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-3 backdrop-blur-md shrink-0"
        >
          <div className="relative flex items-center">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a technical interview or coding question..."
              disabled={isTyping}
              className="w-full resize-none rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900 pl-4 pr-12 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-600/10 dark:focus:ring-indigo-400/20 max-h-24"
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl btn-aurora-primary disabled:opacity-40 transition-transform active:scale-95 cursor-pointer"
              title={isTyping ? "Generating answer..." : "Send Message (Enter)"}
              aria-label="Send Message"
            >
              {isTyping ? (
                <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1 font-mono">
            <span>Powered by OpenAI & NestJS</span>
            <span>Enter ↵ to send • Shift+Enter newline</span>
          </div>
        </form>
      </div>
    </>
  );
}
