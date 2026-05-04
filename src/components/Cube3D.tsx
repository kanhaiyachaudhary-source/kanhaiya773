"use client";
import { useEffect, useRef, useState } from "react";

interface Face {
  bg: string;       // image url or CSS gradient
  label: string;
  sublabel?: string;
  link?: string;
}

const FACES: Face[] = [
  { bg: "/images/kanhaiya-1.jpg", label: "Kanhaiya", sublabel: "GenAI Developer · PwC AC US Advisory" },
  { bg: "/images/kanhaiya-2.jpg", label: "DocuMind", sublabel: "RAG Document Processing", link: "https://kanhaiya772-documind.vercel.app" },
  { bg: "/images/kanhaiya-3.jpg", label: "SnipURL", sublabel: "Agentic AI URL Shortener", link: "https://kanhaiya772-snip-url.vercel.app" },
  { bg: "/images/kanhaiya-4.jpg", label: "FormCraft", sublabel: "Conversational AI Forms", link: "https://kanhaiya772-form-craft.vercel.app" },
  { bg: "/images/kanhaiya-1.jpg", label: "DevTrack", sublabel: "AI Project Management", link: "https://kanhaiya772-dev-track.vercel.app" },
  { bg: "/images/kanhaiya-2.jpg", label: "AWS Certified", sublabel: "AI Practitioner · GenAI Pro · ML Engineer" },
];

export default function Cube3D() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(20);
  const dragRef = useRef<{ active: boolean; x: number; y: number; sx: number; sy: number }>({ active: false, x: 0, y: 0, sx: 0, sy: 0 });

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotY((y) => y + 0.4);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const onPointerDown = (e: React.PointerEvent) => {
    setAutoRotate(false);
    dragRef.current = { active: true, x: e.clientX, y: e.clientY, sx: rotX, sy: rotY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setRotY(dragRef.current.sy + dx * 0.5);
    setRotX(Math.max(-60, Math.min(60, dragRef.current.sx - dy * 0.5)));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setTimeout(() => setAutoRotate(true), 3000);
  };

  return (
    <div className="cube-section">
      <div className="cube-stage">
        <div
          className="cube"
          style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {FACES.map((face, idx) => (
            <div
              key={idx}
              className={`cube-face cube-face-${["front", "back", "right", "left", "top", "bottom"][idx]}`}
              style={{ backgroundImage: `url(${face.bg})` }}
            >
              <div className="cube-face-overlay">
                <div className="cube-face-content">
                  <div className="cube-face-label">{face.label}</div>
                  {face.sublabel && <div className="cube-face-sublabel">{face.sublabel}</div>}
                  {face.link && (
                    <a href={face.link} target="_blank" rel="noopener" className="cube-face-link">
                      Visit →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cube-hint">↻ drag to rotate · auto-spin resumes after 3s</div>
    </div>
  );
}
