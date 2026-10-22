import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [coords, setCoords] = useState({ x: -400, y: -400 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let targetX = -400;
    let targetY = -400;
    let currentX = -400;
    let currentY = -400;
    let rafId;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const lerp = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setCoords({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-[100px] transition-transform"
        style={{
          left: `${coords.x - 210}px`,
          top: `${coords.y - 210}px`,
          background:
            "radial-gradient(circle, var(--accent-glow, rgba(99, 102, 241, 0.18)) 0%, rgba(124, 58, 237, 0.08) 45%, transparent 70%)",
          willChange: "left, top",
        }}
      />
    </div>
  );
}
