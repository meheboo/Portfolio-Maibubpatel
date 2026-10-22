import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * NetworkStarCanvas
 * 
 * High-performance 60fps canvas component rendering an autonomous, continuous cosmic
 * network where stars and constellation lines move automatically and perpetually in the
 * background without requiring any mouse clicks or cursor movement.
 * 
 * - Permanent Cruise Velocity: Each star maintains a persistent natural velocity (baseVx, baseVy)
 *   so the starfield NEVER slows down, stops, or freezes regardless of user interaction.
 * - Autonomous Traveling Stars: Glowing stars continuously travel along the connecting lines
 *   between nodes, leaping across multiple hops and sparking arrival pulses automatically.
 * - Non-Interrupting Interactions: Mouse movement and clicks produce gorgeous gravitational
 *   filaments, shockwave rings, and surge pulses without disrupting the background cruise.
 * - Smooth Full-Page Scroll: Viewport-fixed positioning with depth-weighted scroll parallax and
 *   seamless toroidal wrapping keeps the animation alive across all portfolio sections.
 */
export default function NetworkStarCanvas() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId;
    let isTabVisible = true;

    // Track scroll velocity for realistic cosmic depth parallax traversal
    let lastScrollY = window.scrollY || document.documentElement.scrollTop;
    let scrollVelocity = 0;

    // Mouse tracking state (in viewport client coordinates)
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
      radius: 175,
    };

    // Shockwaves from mouse clicks
    const shockwaves = [];
    // Spark particles from clicks and node arrivals
    const sparks = [];
    // Autonomous traveling stars traversing along connecting lines
    let pulses = [];

    // Configuration based on screen size
    const getConfig = (w) => {
      if (w < 640) {
        return {
          starCount: 52,
          connectionDist: 115,
          bokehCount: 5,
          pulseCount: 12, // Concurrent traveling stars
        };
      }
      if (w < 1024) {
        return {
          starCount: 78,
          connectionDist: 135,
          bokehCount: 7,
          pulseCount: 18,
        };
      }
      return {
        starCount: 115,
        connectionDist: 155,
        bokehCount: 9,
        pulseCount: 26,
      };
    };

    let config = getConfig(window.innerWidth);

    // Stars list
    let stars = [];
    // Ambient floating bokeh orbs list
    let bokehOrbs = [];
    // Active constellation graph
    let activeEdges = [];
    let edgesByNode = new Map();

    // Color definitions for dark / light modes
    const getColors = () => {
      if (isDark) {
        return {
          coreStar: "#ffffff",
          stars: ["#38bdf8", "#00f2fe", "#60a5fa", "#ffffff", "#c084fc"],
          flareCyan: "rgba(56, 189, 248, 0.95)",
          flareElectric: "rgba(0, 242, 254, 0.9)",
          lineColor: [56, 189, 248],
          mouseLineColor: [0, 242, 254],
          pulseHead: "#ffffff",
          pulseGlow: "rgba(56, 189, 248, 0.85)",
          pulseTrail: "rgba(0, 242, 254, 0.95)",
          haloInner: "rgba(56, 189, 248, 0.75)",
          haloOuter: "rgba(0, 242, 254, 0.32)",
          shockwave: "rgba(56, 189, 248, ",
          shockwaveInner: "rgba(255, 255, 255, ",
          bokeh: [
            "rgba(14, 165, 233, 0.12)",
            "rgba(56, 189, 248, 0.10)",
            "rgba(99, 102, 241, 0.09)",
            "rgba(168, 85, 247, 0.08)",
          ],
        };
      } else {
        return {
          coreStar: "#1e1b4b",
          stars: [
            "#4338ca", // deep rich indigo-700
            "#1d4ed8", // royal blue-700
            "#6d28d9", // deep purple-700
            "#0284c7", // rich sky-600
            "#3730a3", // midnight indigo-800
          ],
          flareCyan: "rgba(79, 70, 229, 0.95)",
          flareElectric: "rgba(37, 99, 235, 0.90)",
          lineColor: [79, 70, 229], // indigo-600 constellation lines
          mouseLineColor: [99, 102, 241],
          pulseHead: "#312e81",
          pulseGlow: "rgba(79, 70, 229, 0.85)",
          pulseTrail: "rgba(99, 102, 241, 0.9)",
          haloInner: "rgba(99, 102, 241, 0.55)",
          haloOuter: "rgba(59, 130, 246, 0.28)",
          shockwave: "rgba(79, 70, 229, ",
          shockwaveInner: "rgba(99, 102, 241, ",
          bokeh: [
            "rgba(99, 102, 241, 0.12)",
            "rgba(56, 189, 248, 0.10)",
            "rgba(168, 85, 247, 0.09)",
            "rgba(14, 165, 233, 0.09)",
          ],
        };
      }
    };

    let colors = getColors();

    // Helper: Initialize Star Nodes with Permanent Cruise Velocities
    const initStars = () => {
      stars = [];
      pulses = [];
      const { starCount } = config;

      for (let i = 0; i < starCount; i++) {
        const isHyperStar = Math.random() < 0.18;
        // Each star gets an immutable natural cruise direction and speed
        const angle = Math.random() * Math.PI * 2;
        const cruiseSpeed = Math.random() * 0.35 + 0.35; // 0.35 to 0.70 px/frame constant drift
        const baseVx = Math.cos(angle) * cruiseSpeed;
        const baseVy = Math.sin(angle) * cruiseSpeed;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseVx,
          baseVy,
          vx: baseVx,
          vy: baseVy,
          baseRadius: isHyperStar
            ? (isDark ? Math.random() * 1.6 + 2.4 : Math.random() * 1.8 + 2.6)
            : (isDark ? Math.random() * 1.3 + 1.1 : Math.random() * 1.4 + 1.4),
          radius: 1.5,
          baseAlpha: isDark ? Math.random() * 0.35 + 0.65 : Math.random() * 0.20 + 0.80,
          alpha: 0.85,
          twinkleSpeed: Math.random() * 0.035 + 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          isHyperStar,
          flareAngle: Math.random() * Math.PI,
          flareSpeed: (Math.random() - 0.5) * 0.008,
          flareSize: isHyperStar ? Math.random() * 14 + 18 : 0,
          colorIndex: Math.floor(Math.random() * colors.stars.length),
          pulse: 0,
        });
      }

      // Seed initial active edges and traveling stars on frame 0
      const maxDistSq = config.connectionDist * config.connectionDist;
      const initialEdges = [];
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          if (dx * dx + dy * dy < maxDistSq) {
            initialEdges.push([i, j]);
          }
        }
      }

      if (initialEdges.length > 0) {
        for (let k = 0; k < config.pulseCount; k++) {
          const edge = initialEdges[Math.floor(Math.random() * initialEdges.length)];
          const fromIdx = Math.random() < 0.5 ? edge[0] : edge[1];
          const toIdx = fromIdx === edge[0] ? edge[1] : edge[0];
          const sFrom = stars[fromIdx];
          const sTo = stars[toIdx];
          const d = Math.hypot(sTo.x - sFrom.x, sTo.y - sFrom.y);

          pulses.push({
            fromIdx,
            toIdx,
            t: Math.random() * 0.85,
            speed: (Math.random() * 0.006 + 0.007) * (115 / Math.max(40, d)),
            size: Math.random() * 1.2 + 2.0,
            hopsLeft: Math.floor(Math.random() * 3) + 2,
            flareSize: Math.random() * 4 + 6,
          });
        }
      }
    };

    // Helper: Initialize Bokeh Glow Orbs
    const initBokeh = () => {
      bokehOrbs = [];
      for (let i = 0; i < config.bokehCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 0.12 + 0.08;
        bokehOrbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          radius: Math.random() * 85 + 75,
          color: colors.bokeh[i % colors.bokeh.length],
        });
      }
    };

    // Resize Handler with High-DPI support
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      config = getConfig(width);
      initStars();
      initBokeh();
    };

    handleResize();

    // Scroll parallax tracking (smoothly clamped to avoid sudden velocity spikes)
    const onScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const delta = currentScrollY - lastScrollY;
      const clampedDelta = Math.max(-40, Math.min(40, delta));
      scrollVelocity += clampedDelta * 0.15;
      lastScrollY = currentScrollY;
    };

    // Mouse / Touch Event Handlers
    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.active) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      }
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    // Supernova burst on click / tap (adds flair without stopping motion)
    const onClick = (e) => {
      const clickX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : width / 2);
      const clickY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : height / 2);

      // 1. Expanding shockwave ring
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.36,
        alpha: 1.0,
        speed: 7.0,
      });

      // 2. Sparkling burst particles
      const sparkCount = 20;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 3.8 + 2.2;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.4 + 1.2,
          alpha: 1.0,
          decay: Math.random() * 0.024 + 0.015,
          color: colors.stars[Math.floor(Math.random() * colors.stars.length)],
        });
      }

      // 3. Excite nearby stars with radial impulse
      const nearbyIndices = [];
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const dx = star.x - clickX;
        const dy = star.y - clickY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 230 * 230) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (1 - dist / 230) * 3.2;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
          star.pulse = 1.0;
          nearbyIndices.push(i);
        }
      }

      // 4. Trigger exciting electrical pulse surge outward through lines near click
      if (nearbyIndices.length >= 2 && activeEdges.length > 0) {
        const surgeCount = Math.min(5, nearbyIndices.length);
        for (let k = 0; k < surgeCount; k++) {
          const fromIdx = nearbyIndices[Math.floor(Math.random() * nearbyIndices.length)];
          const neighbors = edgesByNode.get(fromIdx);
          if (neighbors && neighbors.length > 0) {
            const toIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
            const sFrom = stars[fromIdx];
            const sTo = stars[toIdx];
            const d = Math.hypot(sTo.x - sFrom.x, sTo.y - sFrom.y);

            pulses.push({
              fromIdx,
              toIdx,
              t: 0,
              speed: (Math.random() * 0.01 + 0.012) * (115 / Math.max(40, d)),
              size: Math.random() * 1.4 + 2.4,
              hopsLeft: Math.floor(Math.random() * 3) + 2,
              flareSize: Math.random() * 5 + 7,
            });
          }
        }
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onMouseMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Tab visibility handling for performance
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastScrollY = window.scrollY || document.documentElement.scrollTop;
        scrollVelocity = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Helper: Draw 4-Point Celestial Diffraction Lens Flare
    const drawDiffractionFlare = (x, y, rayLen, rayWidth, alpha, color) => {
      if (rayLen <= 0 || rayWidth <= 0) return;
      ctx.save();
      ctx.translate(x, y);

      const fadeColor = isDark ? "rgba(56, 189, 248, 0)" : "rgba(79, 70, 229, 0)";

      // Horizontal lens flare ray
      const hGrad = ctx.createLinearGradient(-rayLen, 0, rayLen, 0);
      hGrad.addColorStop(0, fadeColor);
      hGrad.addColorStop(0.5, color);
      hGrad.addColorStop(1, fadeColor);

      ctx.fillStyle = hGrad;
      ctx.beginPath();
      ctx.moveTo(-rayLen, 0);
      ctx.lineTo(0, rayWidth);
      ctx.lineTo(rayLen, 0);
      ctx.lineTo(0, -rayWidth);
      ctx.closePath();
      ctx.fill();

      // Vertical lens flare ray
      const vGrad = ctx.createLinearGradient(0, -rayLen, 0, rayLen);
      vGrad.addColorStop(0, fadeColor);
      vGrad.addColorStop(0.5, color);
      vGrad.addColorStop(1, fadeColor);

      ctx.fillStyle = vGrad;
      ctx.beginPath();
      ctx.moveTo(0, -rayLen);
      ctx.lineTo(rayWidth, 0);
      ctx.lineTo(0, rayLen);
      ctx.lineTo(-rayWidth, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Main 60fps Animation Loop - Never stops, continuously autonomous
    const render = () => {
      if (!isTabVisible || !isDark) {
        // In light mode: clear canvas and pause drawing without stopping the loop
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate tracking
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.16;
        mouse.y += (mouse.targetY - mouse.y) * 0.16;
      }

      // Smooth decay of scroll velocity for natural inertia
      const scrollDrift = scrollVelocity;
      scrollVelocity *= 0.85;

      // -------------------------------------------------------------
      // 1. Render Ambient Floating Bokeh Nebula Orbs
      // -------------------------------------------------------------
      ctx.save();
      for (const orb of bokehOrbs) {
        orb.x += orb.vx;
        orb.y += orb.vy - scrollDrift * 0.12;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          orb.radius * 0.05,
          orb.x,
          orb.y,
          orb.radius
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. Automatic Star Physics & Smooth Cruise Motion (Never Stops)
      // -------------------------------------------------------------
      const mouseRadiusSq = mouse.radius * mouse.radius;

      for (const star of stars) {
        // Move star with inherent cruise drift + subtle depth scroll parallax
        star.x += star.vx;
        star.y += star.vy - scrollDrift * (star.isHyperStar ? 0.5 : 0.3);

        // Relax back toward permanent base cruise velocity (NEVER DECELERATES TO ZERO)
        star.vx = star.vx * 0.96 + star.baseVx * 0.04;
        star.vy = star.vy * 0.96 + star.baseVy * 0.04;

        // Toroidal screen boundary wrapping (seamlessly stays active everywhere)
        if (star.x < -25) star.x = width + 25;
        else if (star.x > width + 25) star.x = -25;

        if (star.y < -25) star.y = height + 25;
        else if (star.y > height + 25) star.y = -25;

        // Sinusoidal natural twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * (isDark ? 0.28 : 0.16);

        // Gentle interactive mouse attraction
        if (mouse.active) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq) || 1;
            const factor = 1 - dist / mouse.radius;

            // Subtle nudge without disrupting continuous drift
            star.vx += (dx / dist) * factor * 0.22;
            star.vy += (dy / dist) * factor * 0.22;

            // Excite star glow
            star.pulse = Math.max(star.pulse, factor * 0.95);
          }
        }

        // Decay pulse surge
        star.pulse = Math.max(0, star.pulse - 0.022);

        // Effective alpha and radius
        star.alpha = Math.min(1.0, star.baseAlpha + twinkle + star.pulse * 0.45);
        star.radius = star.baseRadius + star.pulse * 1.5;

        // Rotate diffraction flares on hyper-stars automatically
        if (star.isHyperStar) {
          star.flareAngle += star.flareSpeed;
        }
      }

      // -------------------------------------------------------------
      // 3. Render Constellation Connecting Lines & Build Graph
      // -------------------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";

      const maxDistSq = config.connectionDist * config.connectionDist;
      const [lr, lg, lb] = colors.lineColor;

      activeEdges = [];
      edgesByNode = new Map();

      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];

        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            let lineAlpha = isDark
              ? (1 - dist / config.connectionDist) * 0.38
              : (1 - dist / config.connectionDist) * 0.48 + 0.12;

            // Register edge for pulse traffic
            activeEdges.push([i, j]);
            if (!edgesByNode.has(i)) edgesByNode.set(i, []);
            if (!edgesByNode.has(j)) edgesByNode.set(j, []);
            edgesByNode.get(i).push(j);
            edgesByNode.get(j).push(i);

            // Brighten connecting filament if either star is pulsing
            const pulseBonus = Math.max(s1.pulse, s2.pulse);
            if (pulseBonus > 0) {
              lineAlpha = Math.min(0.95, lineAlpha + pulseBonus * 0.45);
            }

            ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${lineAlpha})`;
            ctx.lineWidth = pulseBonus > 0 ? (isDark ? 1.5 : 1.8) : (isDark ? 0.9 : 1.25);

            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }

        // Connecting filaments from mouse cursor to nearby stars
        if (mouse.active) {
          const dx = mouse.x - s1.x;
          const dy = mouse.y - s1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / mouse.radius) * (isDark ? 0.75 : 0.85);
            const [mr, mg, mb] = colors.mouseLineColor;

            ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${lineAlpha})`;
            ctx.lineWidth = isDark ? 1.35 : 1.6;

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(s1.x, s1.y);
            ctx.stroke();
          }
        }
      }

      // -------------------------------------------------------------
      // 4. Autonomous Traveling Glowing Stars (Continuous & Automatic)
      // -------------------------------------------------------------
      // Constantly dispatch new traveling stars along available network lines
      if (activeEdges.length > 0 && pulses.length < config.pulseCount) {
        const toSpawn = Math.min(2, config.pulseCount - pulses.length);
        for (let k = 0; k < toSpawn; k++) {
          const edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
          const fromIdx = Math.random() < 0.5 ? edge[0] : edge[1];
          const toIdx = fromIdx === edge[0] ? edge[1] : edge[0];
          const sFrom = stars[fromIdx];
          const sTo = stars[toIdx];
          const d = Math.hypot(sTo.x - sFrom.x, sTo.y - sFrom.y);

          pulses.push({
            fromIdx,
            toIdx,
            t: 0,
            speed: (Math.random() * 0.006 + 0.007) * (115 / Math.max(40, d)),
            size: Math.random() * 1.2 + 2.0,
            hopsLeft: Math.floor(Math.random() * 3) + 2,
            flareSize: Math.random() * 4 + 6,
          });
        }
      }

      // Update and render each traveling star
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const s1 = stars[p.fromIdx];
        const s2 = stars[p.toIdx];

        if (!s1 || !s2) {
          pulses.splice(i, 1);
          continue;
        }

        const dx = s2.x - s1.x;
        const dy = s2.y - s1.y;
        const distSq = dx * dx + dy * dy;

        // Discard if stars drifted too far or wrapped across screen
        if (distSq > maxDistSq * 1.35) {
          pulses.splice(i, 1);
          continue;
        }

        const dist = Math.sqrt(distSq);

        // Advance progress automatically
        p.t += p.speed;

        // Current head coordinates
        const currentT = Math.min(1.0, p.t);
        const headX = s1.x + dx * currentT;
        const headY = s1.y + dy * currentT;

        // Tapered luminous trailing comet tail along the line
        const trailDist = Math.min(dist * 0.38, 42);
        const trailT = Math.max(0, currentT - (trailDist / (dist || 1)));
        const tailX = s1.x + dx * trailT;
        const tailY = s1.y + dy * trailT;

        const trailGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        if (isDark) {
          trailGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
          trailGrad.addColorStop(0.55, "rgba(56, 189, 248, 0.45)");
          trailGrad.addColorStop(1, "rgba(0, 242, 254, 0.95)");
        } else {
          trailGrad.addColorStop(0, "rgba(99, 102, 241, 0)");
          trailGrad.addColorStop(0.55, "rgba(99, 102, 241, 0.65)");
          trailGrad.addColorStop(1, "rgba(79, 70, 229, 0.95)");
        }

        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = p.size * (isDark ? 1.35 : 1.55);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Glowing traveling star head
        const glowRad = p.size * (isDark ? 4.6 : 5.0);
        const headGrad = ctx.createRadialGradient(
          headX,
          headY,
          0,
          headX,
          headY,
          glowRad
        );
        if (isDark) {
          headGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
          headGrad.addColorStop(0.35, "rgba(56, 189, 248, 0.85)");
          headGrad.addColorStop(0.7, "rgba(0, 242, 254, 0.35)");
          headGrad.addColorStop(1, "transparent");
        } else {
          headGrad.addColorStop(0, "rgba(79, 70, 229, 1.0)");
          headGrad.addColorStop(0.4, "rgba(99, 102, 241, 0.8)");
          headGrad.addColorStop(0.75, "rgba(37, 99, 235, 0.35)");
          headGrad.addColorStop(1, "transparent");
        }

        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(headX, headY, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Center solid star hot-spot
        ctx.fillStyle = isDark ? "#ffffff" : "#1e1b4b";
        ctx.beginPath();
        ctx.arc(headX, headY, p.size * 0.75, 0, Math.PI * 2);
        ctx.fill();

        if (!isDark) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // 4-point micro lens flare
        drawDiffractionFlare(
          headX,
          headY,
          p.flareSize * (isDark ? 1 : 1.2),
          isDark ? 1.2 : 1.6,
          0.85,
          isDark ? "rgba(0, 242, 254, 0.9)" : "rgba(79, 70, 229, 0.95)"
        );

        // Node arrival event
        if (p.t >= 1.0) {
          s2.pulse = Math.min(1.0, s2.pulse + 0.6);

          // Micro stardust particles on arrival
          const microSparks = Math.floor(Math.random() * 3) + 3;
          for (let k = 0; k < microSparks; k++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 1.8 + 0.8;
            sparks.push({
              x: s2.x,
              y: s2.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              size: Math.random() * 1.5 + 0.8,
              alpha: 0.9,
              decay: Math.random() * 0.04 + 0.025,
              color: colors.stars[Math.floor(Math.random() * colors.stars.length)],
            });
          }

          // Continue journey along adjacent connected line if hops remain
          if (p.hopsLeft > 0 && edgesByNode.has(p.toIdx)) {
            const neighbors = edgesByNode.get(p.toIdx).filter((nIdx) => nIdx !== p.fromIdx);
            const candidates = neighbors.length > 0 ? neighbors : edgesByNode.get(p.toIdx);

            if (candidates && candidates.length > 0) {
              const nextIdx = candidates[Math.floor(Math.random() * candidates.length)];
              const nextStar = stars[nextIdx];
              const nextDist = Math.hypot(nextStar.x - s2.x, nextStar.y - s2.y);

              p.fromIdx = p.toIdx;
              p.toIdx = nextIdx;
              p.t = 0;
              p.speed = (Math.random() * 0.006 + 0.007) * (115 / Math.max(40, nextDist));
              p.hopsLeft--;
              continue;
            }
          }

          pulses.splice(i, 1);
        }
      }

      // -------------------------------------------------------------
      // 5. Render Star Nodes & Celestial Flares
      // -------------------------------------------------------------
      for (const star of stars) {
        const starColor = colors.stars[star.colorIndex % colors.stars.length];

        // A. Ambient Radial Glow Halo
        const glowRadius = star.isHyperStar
          ? star.radius * 6.5 + star.pulse * 10
          : star.radius * 3.8 + star.pulse * 6;

        const haloGrad = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          glowRadius
        );
        haloGrad.addColorStop(0, colors.haloInner);
        haloGrad.addColorStop(0.48, colors.haloOuter);
        haloGrad.addColorStop(1, "transparent");

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // B. Hyper-Star 4-Point Diffraction Lens Flare
        if (star.isHyperStar) {
          const currentFlareLen = (star.flareSize + star.pulse * 14) * (0.8 + Math.sin(star.twinklePhase) * 0.2);
          const flareWidth = star.pulse > 0 ? (isDark ? 2.5 : 3.0) : (isDark ? 1.7 : 2.2);
          drawDiffractionFlare(
            star.x,
            star.y,
            currentFlareLen * (isDark ? 1 : 1.15),
            flareWidth,
            star.alpha,
            colors.flareCyan
          );
        }

        // C. Brilliant Star Solid Core
        if (isDark) {
          ctx.fillStyle = star.pulse > 0 ? "#ffffff" : starColor;
        } else {
          ctx.fillStyle = star.pulse > 0 ? "#1e1b4b" : starColor;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Center hot-spot
        if (star.isHyperStar || star.pulse > 0.3) {
          if (isDark) {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(star.x, star.y, Math.max(0.8, star.radius * 0.5), 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(star.x, star.y, Math.max(0.7, star.radius * 0.45), 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = starColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // -------------------------------------------------------------
      // 6. Render Cursor Illuminating Flare
      // -------------------------------------------------------------
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          48
        );
        if (isDark) {
          cursorGlow.addColorStop(0, "rgba(255, 255, 255, 0.92)");
          cursorGlow.addColorStop(0.3, "rgba(56, 189, 248, 0.55)");
          cursorGlow.addColorStop(0.7, "rgba(0, 242, 254, 0.18)");
          cursorGlow.addColorStop(1, "transparent");
        } else {
          cursorGlow.addColorStop(0, "rgba(79, 70, 229, 0.75)");
          cursorGlow.addColorStop(0.35, "rgba(99, 102, 241, 0.45)");
          cursorGlow.addColorStop(0.7, "rgba(59, 130, 246, 0.18)");
          cursorGlow.addColorStop(1, "transparent");
        }

        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 48, 0, Math.PI * 2);
        ctx.fill();

        drawDiffractionFlare(
          mouse.x,
          mouse.y,
          24,
          isDark ? 1.8 : 2.2,
          0.85,
          colors.flareElectric
        );
      }

      // -------------------------------------------------------------
      // 7. Render Supernova Click Shockwaves
      // -------------------------------------------------------------
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const wave = shockwaves[i];
        wave.radius += wave.speed;
        wave.alpha = Math.max(0, 1 - wave.radius / wave.maxRadius);

        if (wave.alpha <= 0.01) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `${colors.shockwave}${wave.alpha * 0.65})`;
        ctx.lineWidth = Math.max(1, (1 - wave.radius / wave.maxRadius) * 3);

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `${colors.shockwaveInner}${wave.alpha * 0.85})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, Math.max(1, wave.radius - 2), 0, Math.PI * 2);
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 8. Render Stardust & Spark Particles
      // -------------------------------------------------------------
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.95;
        spark.vy *= 0.95;
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0.02) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.alpha;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("pointerdown", onClick);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] w-full h-full overflow-hidden select-none"
      style={{ zIndex: 1, display: isDark ? "block" : "none" }}
      aria-hidden="true"
    />
  );
}
