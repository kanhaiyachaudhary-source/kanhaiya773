"use client";
import { useEffect, useRef } from "react";

/**
 * Theme-specific background animations that run forever.
 * Each theme has a unique animated canvas/SVG/DOM background.
 */
export default function ThemeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let theme = document.documentElement.getAttribute("data-theme") || "neon";
    let cleanup: (() => void) | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const start = () => {
      if (cleanup) { cleanup(); cleanup = null; }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (theme) {
        case "neon":      cleanup = neonAnim(ctx, canvas); break;
        case "nothing":   cleanup = nothingAnim(ctx, canvas); break;
        case "elegant":   cleanup = elegantAnim(ctx, canvas); break;
        case "classic":   cleanup = classicAnim(ctx, canvas); break;
        case "glass":     cleanup = glassAnim(ctx, canvas); break;
        case "game":      cleanup = gameAnim(ctx, canvas); break;
      }
    };
    start();

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") || "neon";
      if (newTheme !== theme) {
        theme = newTheme;
        start();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (cleanup) cleanup();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="theme-bg-canvas" />;
}

// ─── NEON: subtle grid + flowing stars ────────────────────────
function neonAnim(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): () => void {
  const GRID_SIZE = 60;

  // Stars that flow slowly across the screen in varied directions
  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    size: Math.random() * 1.6 + 0.6,
    baseAlpha: Math.random() * 0.4 + 0.6,
    twinkleSpeed: Math.random() * 0.03 + 0.008,
    twinklePhase: Math.random() * Math.PI * 2,
  }));

  let t = 0;
  let raf: number;

  const tick = () => {
    // Fully clear each frame — stars move without leaving trails
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle cyan grid — slightly bolder
    ctx.strokeStyle = "rgba(0, 255, 255, 0.13)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

    // Brighter dots at grid intersections
    ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
      for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
    }

    // Flowing stars
    stars.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      // Wrap around edges
      if (s.x < -5) s.x = canvas.width + 5;
      if (s.x > canvas.width + 5) s.x = -5;
      if (s.y < -5) s.y = canvas.height + 5;
      if (s.y > canvas.height + 5) s.y = -5;

      const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(t * s.twinkleSpeed + s.twinklePhase));
      ctx.fillStyle = `rgba(220, 250, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    t++;
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}

// ─── NOTHING: Dot matrix wave ────────────────────────
function nothingAnim(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): () => void {
  const spacing = 16;
  let t = 0;
  let raf: number;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const wave = Math.sin(dist * 0.018 - t * 0.04) * 0.5 + 0.5;
        const size = 0.6 + wave * 1.4;
        const opacity = 0.05 + wave * 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Occasional red highlight
    const rx = (canvas.width / 2) + Math.sin(t * 0.01) * 200;
    const ry = (canvas.height / 2) + Math.cos(t * 0.013) * 200;
    ctx.fillStyle = "rgba(255, 0, 51, 0.4)";
    ctx.beginPath();
    ctx.arc(rx, ry, 3, 0, Math.PI * 2);
    ctx.fill();
    t++;
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}

// ─── ELEGANT: Slow drifting light particles ────────────────────────
function elegantAnim(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): () => void {
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
  }));
  let raf: number;
  const tick = () => {
    ctx.fillStyle = "rgba(12, 13, 17, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8);
      grad.addColorStop(0, `rgba(212, 175, 110, ${p.opacity})`);
      grad.addColorStop(1, "rgba(212, 175, 110, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}

// ─── CLASSIC: Subtle floating dots (no animation feel) ────────────────────────
function classicAnim(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): () => void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return () => {};
}

// ─── GLASS: Floating bokeh bubbles + light streaks ────────────────────────
function glassAnim(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): () => void {
  const bubbles = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    vy: -(Math.random() * 0.6 + 0.2),
    radius: Math.random() * 80 + 20,
    hue: Math.floor(Math.random() * 60) + 200, // blues + purples
  }));
  let raf: number;
  const tick = () => {
    // Soft gradient backdrop
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "rgba(20, 30, 60, 0.04)");
    grad.addColorStop(1, "rgba(60, 30, 100, 0.04)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((b) => {
      b.y += b.vy;
      b.x += Math.sin(b.y * 0.01) * 0.3;
      if (b.y < -b.radius) {
        b.y = canvas.height + b.radius;
        b.x = Math.random() * canvas.width;
      }
      const gradB = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
      gradB.addColorStop(0, `hsla(${b.hue}, 80%, 70%, 0.18)`);
      gradB.addColorStop(0.5, `hsla(${b.hue}, 80%, 70%, 0.08)`);
      gradB.addColorStop(1, `hsla(${b.hue}, 80%, 70%, 0)`);
      ctx.fillStyle = gradB;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}

// ─── GAME: Bright 8-bit perspective grid + colored pixel rain ────────────────────────
function gameAnim(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): () => void {
  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 2.5 + 0.6,
    size: Math.floor(Math.random() * 3) + 2,
    color: ["#ff00ff", "#00ff66", "#ffeb00", "#00ffff", "#ff6600", "#ff0066"][Math.floor(Math.random() * 6)],
  }));
  let gridOffset = 0;
  let raf: number;

  const tick = () => {
    // Lighter trail so colors stay vivid
    ctx.fillStyle = "rgba(26, 0, 64, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bright magenta perspective grid
    gridOffset = (gridOffset + 0.6) % 50;
    ctx.strokeStyle = "rgba(255, 0, 255, 0.45)";
    ctx.lineWidth = 1.5;
    const horizonY = canvas.height * 0.55;
    for (let i = 0; i < 14; i++) {
      const progress = (i + gridOffset / 50) / 14;
      const y = horizonY + progress * progress * (canvas.height - horizonY);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    // Yellow vertical lines (perspective)
    ctx.strokeStyle = "rgba(255, 235, 0, 0.35)";
    for (let i = -12; i <= 12; i++) {
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + i * 60, horizonY);
      ctx.lineTo(canvas.width / 2 + i * canvas.width, canvas.height);
      ctx.stroke();
    }

    // Pixel stars (chunky 2x2)
    stars.forEach((s) => {
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = -10;
        s.x = Math.random() * canvas.width;
      }
      ctx.fillStyle = s.color;
      ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.size, s.size);
    });
    raf = requestAnimationFrame(tick);
  };
  tick();
  return () => cancelAnimationFrame(raf);
}
