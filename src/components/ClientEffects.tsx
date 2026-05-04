"use client";
import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // Theme persistence + hero photo swap
    const themeToImage: Record<string, string> = {
      neon: "/images/kanhaiya-1.jpg",     // leather jacket - neon vibe
      nothing: "/images/kanhaiya-3.jpg",  // hidden anyway
      elegant: "/images/kanhaiya-4.jpg",  // formal blazer - elegant
      classic: "/images/kanhaiya-3.jpg",  // grayscale photo
      glass: "/images/kanhaiya-2.jpg",    // clean shot - glass
      game: "/images/kanhaiya-1.jpg",     // hidden anyway
    };
    const heroPhoto = document.getElementById("heroPhoto");
    const updateHeroPhoto = (theme: string) => {
      if (heroPhoto && themeToImage[theme]) {
        heroPhoto.style.backgroundImage = `url(${themeToImage[theme]})`;
      }
    };

    const saved = localStorage.getItem("kc-theme") || "neon";
    document.documentElement.setAttribute("data-theme", saved);
    updateHeroPhoto(saved);
    const buttons = document.querySelectorAll<HTMLButtonElement>(".theme-btn");
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.set === saved));

    const onThemeClick = (e: Event) => {
      const btn = (e.currentTarget as HTMLButtonElement);
      const t = btn.dataset.set!;
      document.documentElement.setAttribute("data-theme", t);
      localStorage.setItem("kc-theme", t);
      updateHeroPhoto(t);
      buttons.forEach((b) => b.classList.toggle("active", b.dataset.set === t));
    };
    buttons.forEach((b) => b.addEventListener("click", onThemeClick));

    // Cursor (neon only)
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dot) { dot.style.left = mouseX + "px"; dot.style.top = mouseY + "px"; }
    };
    document.addEventListener("mousemove", onMove);
    let rafId: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ring) { ring.style.left = ringX + "px"; ring.style.top = ringY + "px"; }
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const expandOn = () => ring?.classList.add("expand");
    const expandOff = () => ring?.classList.remove("expand");
    const interactiveEls = document.querySelectorAll("a, button, .project-card, .skill-tag, .cert-card, .interest-card");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", expandOn);
      el.addEventListener("mouseleave", expandOff);
    });

    // Particles
    const particles = document.getElementById("particles");
    if (particles && particles.childElementCount === 0) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const size = Math.random() * 3 + 1;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDelay = Math.random() * 20 + "s";
        p.style.animationDuration = (Math.random() * 15 + 15) + "s";
        particles.appendChild(p);
      }
    }

    // Typewriter
    const typedEl = document.getElementById("typed");
    const phrases = [
      "GenAI Developer",
      "Prompt Engineer",
      "AI App Builder",
      "RAG Specialist",
      "Agentic AI Designer",
      "AWS Certified Pro",
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    let typingTimer: any;
    const type = () => {
      if (!typedEl) return;
      const current = phrases[phraseIdx];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          typingTimer = setTimeout(type, 500);
          return;
        }
        typingTimer = setTimeout(type, 40);
      } else {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          typingTimer = setTimeout(() => { isDeleting = true; type(); }, 1800);
          return;
        }
        typingTimer = setTimeout(type, 80);
      }
    };
    type();

    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Smooth scroll for anchor nav links
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
    const onNavClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    navLinks.forEach((l) => l.addEventListener("click", onNavClick));

    return () => {
      buttons.forEach((b) => b.removeEventListener("click", onThemeClick));
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(typingTimer);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", expandOn);
        el.removeEventListener("mouseleave", expandOff);
      });
      navLinks.forEach((l) => l.removeEventListener("click", onNavClick));
      observer.disconnect();
    };
  }, []);

  return null;
}
