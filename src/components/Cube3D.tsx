"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Twin auto-rotating cubes:
 *  Left cube  = 4 projects + skills + certs
 *  Right cube = 3 jobs + 3 education entries
 *
 * Both auto-spin in opposite directions; drag to override; auto resumes.
 */

interface Face {
  topLine: string;
  title: string;
  body: string;
  tag?: string;
  link?: string;
  accent?: "primary" | "secondary";
}

const PROJECT_FACES: Face[] = [
  { topLine: "01 / RAG", title: "DocuMind", body: "RAG document AI · semantic search · LLM-grounded responses with citations", tag: "Next.js · HF · Vercel KV", link: "https://kanhaiya772-documind.vercel.app", accent: "primary" },
  { topLine: "02 / AGENTIC AI", title: "SnipURL", body: "Agentic AI URL shortener · function calling · 5 tools · plain English commands", tag: "Next.js · Supabase · JWT", link: "https://kanhaiya772-snip-url.vercel.app", accent: "primary" },
  { topLine: "03 / CONVERSATIONAL", title: "FormCraft", body: "AI form builder · conversational chatbot fills forms · sentiment analytics", tag: "Next.js · HF · Supabase", link: "https://kanhaiya772-form-craft.vercel.app", accent: "primary" },
  { topLine: "04 / PRODUCTIVITY", title: "DevTrack", body: "AI Kanban · auto task generation · subtask breakdown · velocity insights", tag: "Next.js · @dnd-kit · HF", link: "https://kanhaiya772-dev-track.vercel.app", accent: "primary" },
  { topLine: "🧠 EXPERTISE", title: "AI / GenAI", body: "LLMs · RAG · Agentic AI · Function Calling · Prompt Engineering · Vector Embeddings", tag: "Production-ready", accent: "secondary" },
  { topLine: "🏆 CERTIFIED", title: "AWS × 3 + Anthropic", body: "AI Practitioner · GenAI Developer Pro · ML Engineer Associate · Claude 101", tag: "All verifiable", accent: "secondary" },
];

const EXPERIENCE_FACES: Face[] = [
  { topLine: "JUN 2025 — PRESENT", title: "PwC AC — US Advisory", body: "GenAI Developer (Associate Apprenticeship) · Hyderabad · Hybrid · Azure OpenAI, AWS Bedrock, RAG, Agentic AI", tag: "Current Role", accent: "primary" },
  { topLine: "JAN — JUN 2025", title: "Amazon", body: "QA Engineer Intern · Gurgaon · Cypress automation · 10% test cycle reduction · GraphQL API testing", tag: "Internship", accent: "primary" },
  { topLine: "JUL — AUG 2024", title: "Atharvo", body: "Machine Learning Intern · Remote · PyTorch & TensorFlow · Image recognition · 95%+ capstone accuracy", tag: "Internship", accent: "primary" },
  { topLine: "NOV 2022 — JUL 2025", title: "B.Tech CSE", body: "Dr. APJ Abdul Kalam Technical University · Uttar Pradesh · SGPA 7.8/10", tag: "Education", accent: "secondary" },
  { topLine: "JUL 2019 — JUN 2022", title: "Diploma CSE", body: "Mahamaya Polytechnic of IT, Hathras · Board of Technical Education U.P. · 72.9%", tag: "Education", accent: "secondary" },
  { topLine: "🏆 ACHIEVEMENTS", title: "400+ DSA Solved", body: "LeetCode · HackerRank · 4 production AI apps · 4 industry certifications", tag: "Self-Driven", accent: "secondary" },
];

function Cube({
  faces,
  reverseSpin = false,
}: {
  faces: Face[];
  reverseSpin?: boolean;
}) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(20);
  const dragRef = useRef<{ active: boolean; x: number; y: number; sx: number; sy: number }>({ active: false, x: 0, y: 0, sx: 0, sy: 0 });

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotY((y) => y + (reverseSpin ? -0.4 : 0.4));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, reverseSpin]);

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
    <div className="cube-stage">
      <div
        className="cube"
        style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {faces.map((face, idx) => (
          <div
            key={idx}
            className={`cube-face cube-face-${["front", "back", "right", "left", "top", "bottom"][idx]} cube-face-${face.accent || "primary"}`}
          >
            <div className="cube-face-content">
              <div className="cube-face-topline">{face.topLine}</div>
              <div className="cube-face-title">{face.title}</div>
              <div className="cube-face-body">{face.body}</div>
              {face.tag && <div className="cube-face-tag">{face.tag}</div>}
              {face.link && (
                <a href={face.link} target="_blank" rel="noopener" className="cube-face-link" onClick={(e) => e.stopPropagation()}>
                  Visit →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CubeShowcase() {
  return (
    <div className="cube-showcase">
      <div className="cube-pair">
        <div className="cube-block">
          <div className="cube-block-label">PROJECTS · SKILLS</div>
          <Cube faces={PROJECT_FACES} />
        </div>
        <div className="cube-block">
          <div className="cube-block-label">EXPERIENCE · EDUCATION</div>
          <Cube faces={EXPERIENCE_FACES} reverseSpin />
        </div>
      </div>
      <div className="cube-hint">↻ drag any cube to rotate · auto-spin resumes after 3s</div>
    </div>
  );
}
