import { useState } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    id: 'xubhodaya',
    title: 'Memory Companion (Xubhodaya)',
    tagline: 'AI Dementia Cognitive Care & Memory Assistance Platform',
    description:
      'Digital therapeutic platform built for Smart India Hackathon (SIH 2026). Features 3-step progressive non-punitive hints, voice recognition, touch dwell micro-telemetry for motor stiffness detection, and 30-day longitudinal cognitive scoring.',
    category: 'AI & Healthcare',
    tags: ['Python', 'FastAPI', 'SQLite', 'React', 'Vite', 'Tailwind CSS', 'Web Speech API'],
    github: 'https://github.com/JISHU-GHOSH/xubhodaya',
    demo: 'https://github.com/JISHU-GHOSH/xubhodaya',
    featured: true,
    stats: 'SIH 2026 • Cognitive AI'
  },
  {
    id: 'quant-engine',
    title: 'News-Driven Quantitative Engine',
    tagline: 'Multi-Algorithmic Market Prediction & Execution System',
    description:
      'Institutional-grade quantitative alpha generation engine integrating causal temporal decay kernels, Bayesian game-theoretic scenario stress-testing, SOR smart order routing, and a real-time WebGL/Canvas research terminal.',
    category: 'Quantitative Systems',
    tags: ['Python', 'DuckDB', 'FastAPI', 'WebSockets', 'React 19', 'Algorithms', 'Mathematical Modeling'],
    github: 'https://github.com/joshihridesh001-png/Quant-stuff',
    demo: 'https://github.com/joshihridesh001-png/Quant-stuff',
    featured: true,
    stats: 'Sub-100ms • Algorithmic'
  },
  {
    id: 'portfolio-hero',
    title: 'Interactive 3D Character Hero',
    tagline: 'Zero-Ghosting 60 FPS Cursor Tracking Engine',
    description:
      'Ultra-luxury portfolio centerpiece featuring real-time angular head tracking, shortest-path circular lerp, OpenCV Telea inpainting, deadzone eye contact, and second-order spring dynamics.',
    category: 'Creative Tech',
    tags: ['React 19', 'HTML5 Canvas', 'Python / OpenCV', 'Spring Physics', 'Vite'],
    github: 'https://github.com/JISHU-GHOSH/my-portfolio',
    demo: 'http://localhost:5173',
    featured: true,
    stats: '60 FPS • <35ms Response'
  }
];

const CATEGORIES = ['All', 'AI & Healthcare', 'Quantitative Systems', 'Creative Tech'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="portfolio-section projects-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">Selected Work</div>
          <h2 className="section-title">Projects & Systems</h2>
          <p className="section-subtitle">
            Real-world systems spanning cognitive healthcare AI, quantitative algorithmic finance, and high-performance interactive architectures.
          </p>

          <div className="category-tabs" role="tablist">
            {CATEGORIES.map(category => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className={`category-tab ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card interactive-card">
              <div className="card-top">
                <span className="card-category">{project.category}</span>
                <span className="card-stats">{project.stats}</span>
              </div>

              <h3 className="card-title">{project.title}</h3>
              <p className="card-tagline">{project.tagline}</p>
              <p className="card-description">{project.description}</p>

              <div className="card-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>

              <div className="card-actions">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-btn card-btn-secondary"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Repository
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-btn card-btn-primary"
                  aria-label={`Explore ${project.title}`}
                >
                  Explore
                  <span className="btn-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
