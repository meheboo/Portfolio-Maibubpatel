import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TechBackground from "./components/TechBackground";
import TechMarquee from "./components/TechMarquee";
import ScrollToTop from "./components/ScrollToTop";
import CursorGlow from "./components/CursorGlow";
import NetworkStarCanvas from "./components/NetworkStarCanvas";
import AIChatBot from "./components/AIChatBot";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Ambient Mouse Tracking Cursor Spotlight */}
      <CursorGlow />

      {/* Ambient Floating Tech Elements & Gradient Mesh Background */}
      <TechBackground />

      {/* Interactive Glowing Cosmic Network Stars Canvas */}
      <NetworkStarCanvas />

      {/* Main Content Layout */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Persistent Sticky Navbar */}
        <Navbar />

        <main className="flex-1 pt-16 sm:pt-20">
          <Hero />

          {/* Top Moving Tech Skills Banner: Left Corner to Right Corner Complete */}
          <TechMarquee />

          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />

          {/* Bottom Moving Tech Skills Banner: Left Corner to Right Corner Complete */}
          <TechMarquee reverse={false} subtitle="Continuous Engineering & Tech Stack" />
        </main>

        <Footer />
      </div>

      {/* Interactive Floating Circular Scroll-to-Top Button */}
      <ScrollToTop isChatOpen={isChatOpen} />

      {/* Interactive Portfolio AI Assistant Chatbot */}
      <AIChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}

export default App;
