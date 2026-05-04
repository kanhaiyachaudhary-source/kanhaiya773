import Chatbot from "@/components/Chatbot";
import ContactForm from "@/components/ContactForm";
import ClientEffects from "@/components/ClientEffects";
import ThemeBackground from "@/components/ThemeBackground";
import Cube3D from "@/components/Cube3D";
import ParticleUniverse from "@/components/ParticleUniverseWrapper";

export default function Home() {
  return (
    <>
      <ClientEffects />
      <ThemeBackground />

      {/* Custom cursor (neon only) */}
      <div className="cursor-dot" id="cursorDot"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* Particles (legacy, hidden via CSS — canvas handles bg now) */}
      <div className="particles" id="particles"></div>

      {/* Theme switcher — 6 themes */}
      <div className="theme-switcher">
        <button className="theme-btn active" data-set="neon" title="Neon Cyberpunk">N</button>
        <button className="theme-btn" data-set="nothing" title="Nothing OS">·</button>
        <button className="theme-btn" data-set="elegant" title="Elegant Editorial">E</button>
        <button className="theme-btn" data-set="classic" title="Classic Newspaper">C</button>
        <button className="theme-btn" data-set="glass" title="Glass Morphism">◇</button>
        <button className="theme-btn" data-set="game" title="Gamify Arcade">▶</button>
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">KC</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#certifications">Certs</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="reveal">
          <div className="hero-meta">
            <span>HE / HIM</span>
            <span className="hero-meta-dot"></span>
            <span>GURUGRAM, INDIA</span>
            <span className="hero-meta-dot"></span>
            <span>EST. 2002</span>
          </div>
          <h1>Kanhaiya<br/>Chaudhary</h1>
          <div className="hero-typed" id="typed">GenAI Developer</div>
          <p className="hero-bio">
            Building intelligent systems at <strong>PwC</strong> — my third company. Specialised in
            <strong> agentic AI</strong>, prompt engineering, and LLM-powered automation.
            AWS Certified <strong>AI Practitioner</strong> &amp; <strong>GenAI Developer Professional</strong>.
            Passionate about turning cutting-edge models into real-world products.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Work →</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            <a href="/files/Kanhaiya_Chaudhary_Resume.pdf" download className="btn btn-secondary">↓ Resume</a>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="hero-particles-wrap">
            <ParticleUniverse />
            <div className="hero-photo-overlay" id="heroPhoto" style={{ backgroundImage: "url(/images/kanhaiya-2.jpg)" }} />
            <div className="hero-card-badge badge-1">
              <div className="label">Current Role</div>
              <div className="value">GenAI Dev · PwC AC</div>
            </div>
            <div className="hero-card-badge badge-2">
              <div className="label">Certified</div>
              <div className="value">AWS - GenAI Professional Developer</div>
            </div>
          </div>
        </div>
        <div className="hero-stats reveal">
          <div>
            <div className="stat-num">&lt;1 Yr</div>
            <div className="stat-label">In The Industry</div>
          </div>
          <div>
            <div className="stat-num">4×</div>
            <div className="stat-label">Certifications</div>
          </div>
          <div>
            <div className="stat-num">3rd</div>
            <div className="stat-label">Company (PwC)</div>
          </div>
          <div>
            <div className="stat-num">AWS</div>
            <div className="stat-label">Cloud Platform</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" data-num="02 — ABOUT">
        <div className="section-label reveal">About</div>
        <h2 className="section-title reveal">A bit about me</h2>
        <p className="section-subtitle reveal">From Diploma in CSE to building production GenAI at PwC.</p>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I&apos;m a <strong>GenAI Developer</strong> based in Gurugram, currently working at <strong>PwC AC (Acceleration Center) — US Advisory</strong> as part of the GenAI Developer Associate Apprenticeship — building production-grade AI applications for enterprise clients using <strong>Azure OpenAI</strong>, <strong>AWS Bedrock</strong>, and <strong>Hugging Face</strong>.
            </p>
            <p>
              My journey started with a <strong>Diploma in Computer Science</strong> at Mahamaya Polytechnic, then a <strong>B.Tech in CSE</strong> from AKTU. Along the way I interned at <strong>Atharvo</strong> (Machine Learning) and <strong>Amazon</strong> (Quality Assurance) before joining PwC.
            </p>
            <p>
              I love building things — I&apos;ve shipped <strong>4 production AI applications</strong> from scratch covering RAG, agentic AI with function calling, and conversational AI. I&apos;m obsessed with prompt engineering, LLM evaluation, and the intersection of AI &amp; great UX.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m grinding DSA (400+ problems solved), studying for AWS certs, or exploring new GenAI tools. Always learning, always shipping.
            </p>
          </div>
          <div className="about-cards">
            <div className="about-card reveal">
              <div className="about-card-icon">🚀</div>
              <div className="about-card-title">Current Role</div>
              <div className="about-card-value">GenAI Developer<br/>PwC AC US Advisory</div>
            </div>
            <div className="about-card reveal">
              <div className="about-card-icon">📍</div>
              <div className="about-card-title">Location</div>
              <div className="about-card-value">Gurugram<br/>India</div>
            </div>
            <div className="about-card reveal">
              <div className="about-card-icon">🎓</div>
              <div className="about-card-title">Education</div>
              <div className="about-card-value">B.Tech CSE<br/>SGPA: 7.8/10</div>
            </div>
            <div className="about-card reveal">
              <div className="about-card-icon">🏆</div>
              <div className="about-card-title">Achievement</div>
              <div className="about-card-value">400+<br/>DSA Problems</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" data-num="03 — EXPERIENCE">
        <div className="section-label reveal">Experience</div>
        <h2 className="section-title reveal">Where I&apos;ve worked</h2>
        <p className="section-subtitle reveal">From manual testing to production GenAI — three diverse roles.</p>
        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-meta">Jun 2025 — Present</div>
            <div className="timeline-role">GenAI Developer (Associate Apprenticeship)</div>
            <div className="timeline-company">PwC AC — US Advisory <span className="loc">· Hyderabad · Hybrid</span></div>
            <ul className="timeline-bullets">
              <li>Develop production-grade Generative AI applications for enterprise clients using Azure OpenAI, AWS Bedrock, and Hugging Face Inference APIs.</li>
              <li>Design and implement RAG pipelines integrating Azure AI Search, vector embeddings, and LLM-based response generation.</li>
              <li>Build agentic AI workflows using function calling and tool-use patterns to automate document processing.</li>
              <li>Apply prompt engineering best practices to optimize LLM accuracy, reduce hallucinations, and minimize token costs.</li>
            </ul>
          </div>
          <div className="timeline-item reveal">
            <div className="timeline-meta">Jan 2025 — Jun 2025</div>
            <div className="timeline-role">Quality Assurance Engineer Intern</div>
            <div className="timeline-company">Amazon <span className="loc">· Gurgaon, Haryana · On-site</span></div>
            <ul className="timeline-bullets">
              <li>Automated 10+ regression test cases using Cypress (TypeScript) on a scalable framework integrated with Git and Brazil, reducing test cycle time by 10%.</li>
              <li>Performed manual and automation testing including API testing with GraphQL.</li>
              <li>Collaborated with cross-functional teams to triage and resolve 10+ critical UI/API issues; increased test coverage from 30% to 40%.</li>
            </ul>
          </div>
          <div className="timeline-item reveal">
            <div className="timeline-meta">Jul 2024 — Aug 2024</div>
            <div className="timeline-role">Machine Learning Intern</div>
            <div className="timeline-company">Atharvo <span className="loc">· Remote</span></div>
            <ul className="timeline-bullets">
              <li>Implemented and trained ML models for image recognition tasks using PyTorch and TensorFlow.</li>
              <li>Performed data preprocessing, feature engineering, and model evaluation across multiple datasets.</li>
              <li>Achieved 95%+ accuracy on a capstone project using real-world data.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" data-num="04 — PROJECTS">
        <div className="section-label reveal">Featured Work</div>
        <h2 className="section-title reveal">AI Projects</h2>
        <p className="section-subtitle reveal">Four production AI applications. Each showcases a different GenAI paradigm.</p>

        {/* 3D ROTATING CUBE — drag to rotate, auto-spin */}
        <div className="reveal">
          <Cube3D />
        </div>

        <div className="projects-grid">
          <div className="project-card reveal">
            <div className="project-num">01 / RAG</div>
            <h3 className="project-title">DocuMind</h3>
            <div className="project-tagline">Intelligent Document Processing with RAG</div>
            <p className="project-desc">
              End-to-end RAG system. Upload PDF/DOCX → semantic chunking → vector embeddings → cosine similarity retrieval → LLM-grounded responses with source citations.
            </p>
            <div className="project-features">
              <div className="project-features-label">5 AI Features</div>
              <div className="project-features-text">Field Extraction · Classification · Summarization · Semantic Q&amp;A · Smart Routing</div>
            </div>
            <div className="project-stack">
              <span>Next.js 14</span><span>TypeScript</span><span>Hugging Face</span><span>Vercel KV</span><span>RAG</span>
            </div>
            <div className="project-actions">
              <a href="https://kanhaiya772-documind.vercel.app" target="_blank" rel="noopener" className="project-link primary">→ Live Demo</a>
              <a href="https://github.com/kanhaiyachaudhary-source/documind" target="_blank" rel="noopener" className="project-link">Code</a>
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-num">02 / Agentic AI</div>
            <h3 className="project-title">SnipURL</h3>
            <div className="project-tagline">Agentic AI URL Shortener with Function Calling</div>
            <p className="project-desc">
              AI assistant powered by function calling. The LLM picks the right tool (list, search, create, delete, get_stats) — manage links via plain English commands.
            </p>
            <div className="project-features">
              <div className="project-features-label">4 AI Features + Auth</div>
              <div className="project-features-text">Agentic Chatbot · Auto-Slug · Title Extraction · Link Insights · JWT Auth</div>
            </div>
            <div className="project-stack">
              <span>Next.js 14</span><span>TypeScript</span><span>Supabase</span><span>JWT</span><span>Tool Use</span>
            </div>
            <div className="project-actions">
              <a href="https://kanhaiya772-snip-url.vercel.app" target="_blank" rel="noopener" className="project-link primary">→ Live Demo</a>
              <a href="https://github.com/kanhaiyachaudhary-source/kanhaiya772-SnipURL" target="_blank" rel="noopener" className="project-link">Code</a>
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-num">03 / Conversational AI</div>
            <h3 className="project-title">FormCraft</h3>
            <div className="project-tagline">Conversational AI Form Builder</div>
            <p className="project-desc">
              AI bot asks questions one-by-one in natural language, extracts structured data from free-form English answers, validates against field types.
            </p>
            <div className="project-features">
              <div className="project-features-label">4 AI Features</div>
              <div className="project-features-text">AI Form Generator · Conversational Chatbot · Response Insights · Smart Validation</div>
            </div>
            <div className="project-stack">
              <span>Next.js 14</span><span>TypeScript</span><span>Supabase</span><span>JWT</span><span>Multi-turn AI</span>
            </div>
            <div className="project-actions">
              <a href="https://kanhaiya772-form-craft.vercel.app" target="_blank" rel="noopener" className="project-link primary">→ Live Demo</a>
              <a href="https://github.com/kanhaiyachaudhary-source/kanhaiya772-FormCraft" target="_blank" rel="noopener" className="project-link">Code</a>
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-num">04 / Productivity AI</div>
            <h3 className="project-title">DevTrack</h3>
            <div className="project-tagline">AI-Powered Project Management</div>
            <p className="project-desc">
              Kanban-style project manager with AI superpowers. Type a project description → AI generates entire task list. Click any task → AI breaks it down.
            </p>
            <div className="project-features">
              <div className="project-features-label">3 AI Features + Drag-Drop</div>
              <div className="project-features-text">AI Task Generator · Task Breakdown · Project Insights · @dnd-kit Kanban</div>
            </div>
            <div className="project-stack">
              <span>Next.js 14</span><span>TypeScript</span><span>Supabase</span><span>@dnd-kit</span><span>JWT</span>
            </div>
            <div className="project-actions">
              <a href="https://kanhaiya772-dev-track.vercel.app" target="_blank" rel="noopener" className="project-link primary">→ Live Demo</a>
              <a href="https://github.com/kanhaiyachaudhary-source/kanhaiya-devTrack" target="_blank" rel="noopener" className="project-link">Code</a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" data-num="05 — SKILLS">
        <div className="section-label reveal">Tech Stack</div>
        <h2 className="section-title reveal">Skills &amp; Tools</h2>
        <p className="section-subtitle reveal">The technologies I use day-to-day to ship production AI.</p>
        <div className="skills-grid">
          <div className="skill-cat reveal">
            <div className="skill-cat-title">🧠 AI &amp; GenAI</div>
            <div className="skill-list">
              <span className="skill-tag">LLMs</span><span className="skill-tag">RAG</span>
              <span className="skill-tag">Agentic AI</span><span className="skill-tag">Function Calling</span>
              <span className="skill-tag">Prompt Engineering</span><span className="skill-tag">Vector Embeddings</span>
              <span className="skill-tag">Semantic Search</span><span className="skill-tag">Conversational AI</span>
              <span className="skill-tag">Document AI</span>
            </div>
          </div>
          <div className="skill-cat reveal">
            <div className="skill-cat-title">☁️ AI Platforms</div>
            <div className="skill-list">
              <span className="skill-tag">Azure OpenAI</span><span className="skill-tag">Azure AI Studio</span>
              <span className="skill-tag">AWS Bedrock</span><span className="skill-tag">AWS SageMaker</span>
              <span className="skill-tag">Hugging Face</span><span className="skill-tag">Anthropic Claude</span>
              <span className="skill-tag">OpenAI GPT-4</span><span className="skill-tag">LangChain</span>
            </div>
          </div>
          <div className="skill-cat reveal">
            <div className="skill-cat-title">⚡ Languages</div>
            <div className="skill-list">
              <span className="skill-tag">Python</span><span className="skill-tag">TypeScript</span>
              <span className="skill-tag">JavaScript</span><span className="skill-tag">SQL</span>
              <span className="skill-tag">HTML/CSS</span>
            </div>
          </div>
          <div className="skill-cat reveal">
            <div className="skill-cat-title">🛠️ Frameworks</div>
            <div className="skill-list">
              <span className="skill-tag">Next.js 14</span><span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span><span className="skill-tag">FastAPI</span>
              <span className="skill-tag">Tailwind CSS</span><span className="skill-tag">Cypress</span>
            </div>
          </div>
          <div className="skill-cat reveal">
            <div className="skill-cat-title">💾 Databases &amp; Infra</div>
            <div className="skill-list">
              <span className="skill-tag">PostgreSQL</span><span className="skill-tag">Supabase</span>
              <span className="skill-tag">Vercel KV</span><span className="skill-tag">Vector DBs</span>
              <span className="skill-tag">REST APIs</span><span className="skill-tag">Vercel</span>
              <span className="skill-tag">Docker</span>
            </div>
          </div>
          <div className="skill-cat reveal">
            <div className="skill-cat-title">🔐 Auth &amp; Methods</div>
            <div className="skill-list">
              <span className="skill-tag">JWT</span><span className="skill-tag">bcrypt</span>
              <span className="skill-tag">OAuth</span><span className="skill-tag">HTTP-only cookies</span>
              <span className="skill-tag">Agile/Scrum</span><span className="skill-tag">TDD</span>
              <span className="skill-tag">CI/CD</span><span className="skill-tag">Git</span>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" data-num="06 — CERTS">
        <div className="section-label reveal">Credentials</div>
        <h2 className="section-title reveal">Certifications</h2>
        <p className="section-subtitle reveal">Verified credentials from AWS &amp; Anthropic. Click to verify or download.</p>
        <div className="certs-grid">
          <div className="cert-card reveal">
            <div className="cert-icon">AWS</div>
            <div className="cert-info">
              <div className="cert-name">Certified AI Practitioner</div>
              <div className="cert-issuer">Amazon Web Services · 2026</div>
              <div className="cert-actions">
                <a href="https://cp.certmetrics.com/amazon/en/credentials/status/3895311" target="_blank" rel="noopener" className="cert-btn">Verify ↗</a>
                <a href="/files/AWS_Certified_AI_Practitioner.pdf" download className="cert-btn">↓ PDF</a>
              </div>
            </div>
          </div>
          <div className="cert-card reveal">
            <div className="cert-icon">AWS</div>
            <div className="cert-info">
              <div className="cert-name">GenAI Developer (Professional)</div>
              <div className="cert-issuer">Amazon Web Services · 2026</div>
              <div className="cert-actions">
                <a href="https://cp.certmetrics.com/amazon/en/credentials/status/3801711" target="_blank" rel="noopener" className="cert-btn">Verify ↗</a>
                <a href="/files/AWS_Certified_Generative_AI_Developer.pdf" download className="cert-btn">↓ PDF</a>
              </div>
            </div>
          </div>
          <div className="cert-card reveal">
            <div className="cert-icon">AWS</div>
            <div className="cert-info">
              <div className="cert-name">ML Engineer Associate</div>
              <div className="cert-issuer">Amazon Web Services · 2026</div>
              <div className="cert-actions">
                <a href="https://cp.certmetrics.com/amazon/en/credentials/status/3801756" target="_blank" rel="noopener" className="cert-btn">Verify ↗</a>
                <a href="/files/AWS_Certified_Machine_Learning_Engineer_Associate.pdf" download className="cert-btn">↓ PDF</a>
              </div>
            </div>
          </div>
          <div className="cert-card reveal">
            <div className="cert-icon" style={{ background: "linear-gradient(135deg, #d97757, #c45e3d)" }}>A</div>
            <div className="cert-info">
              <div className="cert-name">Claude 101 &amp; Claude Code 101</div>
              <div className="cert-issuer">Anthropic · 2026</div>
              <div className="cert-actions">
                <a href="https://verify.skilljar.com/c/rcr53h8d7k5t" target="_blank" rel="noopener" className="cert-btn">Verify ↗</a>
                <a href="/files/Anthropic_Claude_101.pdf" download className="cert-btn">↓ PDF</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" data-num="07 — EDUCATION">
        <div className="section-label reveal">Academic Background</div>
        <h2 className="section-title reveal">Education</h2>
        <p className="section-subtitle reveal">Computer science from Diploma → B.Tech, plus high school fundamentals.</p>
        <div className="edu-grid">
          <div className="edu-card reveal">
            <div className="edu-period">Nov 2022 — Jul 2025</div>
            <div className="edu-degree">B.Tech, Computer Science Engineering</div>
            <div className="edu-school">Dr. APJ Abdul Kalam Technical University<br/>Uttar Pradesh, India</div>
            <div className="edu-grade">📊 SGPA: 7.8 / 10</div>
          </div>
          <div className="edu-card reveal">
            <div className="edu-period">Jul 2019 — Jun 2022</div>
            <div className="edu-degree">Diploma, Computer Science Engineering</div>
            <div className="edu-school">Mahamaya Polytechnic of Information Technology, Hathras<br/>Board of Technical Education, U.P.</div>
            <div className="edu-grade">📊 Aggregate: 72.9%</div>
          </div>
          <div className="edu-card reveal">
            <div className="edu-period">Apr 2018 — Mar 2019</div>
            <div className="edu-degree">High School (UP Board)</div>
            <div className="edu-school">S V D S College, Aligarh</div>
            <div className="edu-grade">📊 80%</div>
          </div>
          <div className="edu-card reveal">
            <div className="edu-period">Self-Learning · Ongoing</div>
            <div className="edu-degree">DSA &amp; Cloud Certifications</div>
            <div className="edu-school">LeetCode, HackerRank, AWS, Anthropic<br/>Continuous learning</div>
            <div className="edu-grade">📊 400+ DSA Solved</div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section id="interests" data-num="08 — INTERESTS">
        <div className="section-label reveal">Beyond Code</div>
        <h2 className="section-title reveal">Interests &amp; Hobbies</h2>
        <p className="section-subtitle reveal">What I do when I&apos;m not building AI apps.</p>
        <div className="interests-grid">
          <div className="interest-card reveal"><span className="interest-emoji">🤖</span><div className="interest-name">AI Research</div><div className="interest-desc">Reading papers, trying new models</div></div>
          <div className="interest-card reveal"><span className="interest-emoji">💻</span><div className="interest-name">DSA</div><div className="interest-desc">Daily LeetCode grind</div></div>
          <div className="interest-card reveal"><span className="interest-emoji">📚</span><div className="interest-name">Learning</div><div className="interest-desc">Online courses, certifications</div></div>
          <div className="interest-card reveal"><span className="interest-emoji">🚀</span><div className="interest-name">Side Projects</div><div className="interest-desc">Shipping new AI apps</div></div>
          <div className="interest-card reveal"><span className="interest-emoji">🎮</span><div className="interest-name">Gaming</div><div className="interest-desc">Strategy &amp; puzzle games</div></div>
          <div className="interest-card reveal"><span className="interest-emoji">🎵</span><div className="interest-name">Music</div><div className="interest-desc">Lo-fi while coding</div></div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-num="09 — CONTACT">
        <div className="section-label reveal">Get In Touch</div>
        <h2 className="section-title reveal">Let&apos;s connect</h2>
        <p className="section-subtitle reveal">Open to opportunities, collaborations, and interesting AI conversations.</p>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <a href="mailto:kanhiyachaudhary772@gmail.com" className="contact-card">
              <div className="contact-icon">✉️</div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">kanhiyachaudhary772@gmail.com</div>
              </div>
            </a>
            <a href="tel:+918445647996" className="contact-card">
              <div className="contact-icon">📱</div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value">+91 8445647996</div>
              </div>
            </a>
            <a href="https://linkedin.com/in/kanhaiya772" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-icon">💼</div>
              <div>
                <div className="contact-label">LinkedIn</div>
                <div className="contact-value">@kanhaiya772</div>
              </div>
            </a>
            <a href="https://github.com/kanhaiyachaudhary-source" target="_blank" rel="noopener" className="contact-card">
              <div className="contact-icon">🐙</div>
              <div>
                <div className="contact-label">GitHub</div>
                <div className="contact-value">@kanhaiyachaudhary-source</div>
              </div>
            </a>
          </div>
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Built with <span className="heart">♥</span> by Kanhaiya Chaudhary &middot; © 2026</p>
        <p style={{ marginTop: 6, fontSize: 10, opacity: 0.5 }}>Designed in 4 themes &middot; Deployed on Vercel</p>
      </footer>

      <Chatbot />
    </>
  );
}
