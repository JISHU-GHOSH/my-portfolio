import { useEffect, useRef } from 'react';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    const handleClick = (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="frosted-dialog resume-dialog"
      closedby="any"
      aria-labelledby="resumeModalTitle"
    >
      <div className="dialog-content resume-dialog-content">
        <button
          className="dialog-close-btn"
          onClick={onClose}
          aria-label="Close resume preview"
        >
          ✕
        </button>

        <div className="resume-header">
          <div className="resume-header-info">
            <span className="section-badge">Curriculum Vitae</span>
            <h2 id="resumeModalTitle" className="resume-name">Jishu Ghosh</h2>
            <p className="resume-role">Full Stack Developer & Creative Technologist</p>
          </div>
          <div className="resume-header-actions">
            <a
              href="/resume.pdf"
              download="Jishu_Ghosh_Resume.pdf"
              className="card-btn card-btn-primary"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download PDF
            </a>
          </div>
        </div>

        <div className="resume-body">
          {/* Section: Summary */}
          <div className="resume-block">
            <h4 className="block-title">Summary</h4>
            <p className="block-text">
              Results-driven Full Stack Developer specializing in building high-performance web applications,
              interactive visual interfaces, and resilient backend systems. Adept at translating complex designs into
              pixel-perfect 60 FPS experiences with scalable architectures, modern APIs, and optimized databases.
            </p>
          </div>

          {/* Section: Core Skills */}
          <div className="resume-block">
            <h4 className="block-title">Technical Expertise</h4>
            <div className="resume-skills-grid">
              <div className="resume-skill-col">
                <strong>Frontend:</strong>
                <span>React 19, TypeScript, HTML5 Canvas, WebGL, Next.js, Tailwind CSS</span>
              </div>
              <div className="resume-skill-col">
                <strong>Backend & APIs:</strong>
                <span>Node.js, Express, Python, FastAPI, WebSockets, RESTful, GraphQL</span>
              </div>
              <div className="resume-skill-col">
                <strong>Data & Cloud:</strong>
                <span>PostgreSQL, Redis, MongoDB, Docker, Git, AWS, Vercel</span>
              </div>
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div className="resume-block">
            <h4 className="block-title">Featured Projects</h4>
            <div className="resume-item">
              <div className="resume-item-top">
                <span className="item-name">EchoPulse — Real-Time Collaborative Canvas Platform</span>
                <span className="item-meta">React 19 • Canvas • WebSockets • Redis</span>
              </div>
              <p className="item-desc">
                Architected zero-lag multi-user collaborative canvas with real-time vector synchronization over WebSockets running at 60 FPS.
              </p>
            </div>

            <div className="resume-item">
              <div className="resume-item-top">
                <span className="item-name">NexusAI — Autonomous Agent Orchestrator</span>
                <span className="item-meta">Python • FastAPI • Vector DB • LangChain</span>
              </div>
              <p className="item-desc">
                Developed an asynchronous multi-agent framework executing multi-step reasoning and semantic RAG retrieval across heterogeneous datasets.
              </p>
            </div>
          </div>

          {/* Section: Education */}
          <div className="resume-block">
            <h4 className="block-title">Education</h4>
            <div className="resume-item">
              <div className="resume-item-top">
                <span className="item-name">B.Tech in Computer Science & Engineering</span>
                <span className="item-meta">2022 – 2026</span>
              </div>
              <p className="item-desc">
                Core Focus: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks.
              </p>
            </div>
          </div>
        </div>

        <div className="resume-footer-bar">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="card-btn card-btn-secondary"
          >
            Open Full PDF in New Tab ↗
          </a>
        </div>
      </div>
    </dialog>
  );
}
