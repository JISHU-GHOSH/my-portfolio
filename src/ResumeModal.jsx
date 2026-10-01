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
          {/* Section: Profile */}
          <div className="resume-block">
            <h4 className="block-title">Profile</h4>
            <p className="block-text">
              High-velocity Full Stack Developer and creative technologist who builds by intuition and momentum.
              Skilled in transforming complex ideas into fluid, production-grade applications with deep foundations in
              Python, C++, C, JavaScript, and modern AI/agentic development workflows.
            </p>
          </div>

          {/* Section: Technical Expertise */}
          <div className="resume-block">
            <h4 className="block-title">Core Languages & Technical Stack</h4>
            <div className="resume-skills-grid">
              <div className="resume-skill-col">
                <strong>Programming Languages:</strong>
                <span>Python, C++, C, JavaScript (ESNext), HTML5, CSS3, TypeScript, SQL</span>
              </div>
              <div className="resume-skill-col">
                <strong>Frontend & Creative:</strong>
                <span>React 19, HTML5 Canvas (60 FPS), WebGL, Vite, Tailwind CSS, Spring Physics</span>
              </div>
              <div className="resume-skill-col">
                <strong>Backend & Data:</strong>
                <span>FastAPI, Node.js, Express, DuckDB, SQLite, PostgreSQL, WebSockets, Redis, OpenCV</span>
              </div>
            </div>
          </div>

          {/* Section: Featured Systems */}
          <div className="resume-block">
            <h4 className="block-title">Featured Projects</h4>
            <div className="resume-item">
              <div className="resume-item-top">
                <span className="item-name">Memory Companion (Xubhodaya)</span>
                <span className="item-meta">Smart India Hackathon 2026 • Python • FastAPI • React</span>
              </div>
              <p className="item-desc">
                AI dementia cognitive therapeutic platform with non-punitive progressive hint scaffolding, voice synthesis, and micro-interaction touch dwell telemetry.
              </p>
            </div>

            <div className="resume-item">
              <div className="resume-item-top">
                <span className="item-name">News-Driven Quantitative Prediction Engine</span>
                <span className="item-meta">Collaboration with Hridesh Joshi • Python • DuckDB • React 19</span>
              </div>
              <p className="item-desc">
                Multi-algorithmic market prediction and alpha generation engine featuring causal temporal decay kernels, Bayesian game theory, and live trading terminal.
              </p>
            </div>

            <div className="resume-item">
              <div className="resume-item-top">
                <span className="item-name">Interactive 3D Cursor Character Portfolio</span>
                <span className="item-meta">React 19 • HTML5 Canvas • OpenCV Telea Inpainting • Vite</span>
              </div>
              <p className="item-desc">
                Ultra-smooth zero-ghosting 60 FPS head-tracking engine using shortest-path circular angular lerping, deadzone eye-contact, and spring cursor physics.
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
                Core coursework in Data Structures & Algorithms, Object-Oriented Programming (C++), Operating Systems, and Database Management Systems.
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
