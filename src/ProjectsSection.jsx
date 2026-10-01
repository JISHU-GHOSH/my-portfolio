import { useState } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    id: 'echopulse',
    title: 'EchoPulse',
    tagline: 'Real-Time Collaborative Canvas Platform',
    description:
      'High-throughput collaborative drawing and diagramming canvas with zero-lag multi-user vector synchronization over WebSockets and optimized 60 FPS HTML5 Canvas engine.',
    category: 'Full Stack',
    tags: ['React 19', 'WebSockets', 'HTML5 Canvas', 'Node.js', 'Redis'],
    github: 'https://github.com/JISHU-GHOSH/my-portfolio',
    demo: '#',
    featured: true,
    stats: '60 FPS • <20ms Sync'
  },
  {
    id: 'nexusai',
    title: 'NexusAI',
    tagline: 'Autonomous Multi-Agent Knowledge Orchestrator',
    description:
      'Distributed agent workflow framework executing complex multi-step reasoning, dynamic tool usage, and vector-search RAG retrieval across heterogeneous data sources.',
    category: 'AI & Systems',
    tags: ['Python', 'FastAPI', 'LangChain', 'Vector DB', 'React'],
    github: 'https://github.com/JISHU-GHOSH/my-portfolio',
    demo: '#',
    featured: true,
    stats: 'Multi-Agent • RAG'
  },
  {
    id: 'quantix',
    title: 'Quantix',
    tagline: 'High-Frequency Algorithmic Analytics Engine',
    description:
      'Ultra-responsive trading dashboard rendering interactive candlestick metrics and historical backtests with sub-100ms data ingestion and PostgreSQL timeseries schemas.',
    category: 'FinTech',
    tags: ['Next.js', 'TypeScript', 'TradingView API', 'PostgreSQL', 'Go'],
    github: 'https://github.com/JISHU-GHOSH/my-portfolio',
    demo: '#',
    featured: false,
    stats: 'Sub-100ms • Timeseries'
  },
  {
    id: 'aurapay',
    title: 'AuraPay',
    tagline: 'Multi-Tenant Subscription & Invoicing Engine',
    description:
      'Secure payment orchestration microservice with automated recurring billing, webhooks idempotency, Stripe integration, and real-time revenue analytics.',
    category: 'Full Stack',
    tags: ['Node.js', 'Express', 'Stripe API', 'Prisma', 'Docker'],
    github: 'https://github.com/JISHU-GHOSH/my-portfolio',
    demo: '#',
    featured: false,
    stats: 'Idempotent • Microservice'
  }
];

const CATEGORIES = ['All', 'Full Stack', 'AI & Systems', 'FinTech'];

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
          <h2 className="section-title">Crafted with Precision</h2>
          <p className="section-subtitle">
            A curated collection of full-stack architectures, real-time engines, and interactive applications.
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
                  Source
                </a>
                <a
                  href={project.demo}
                  className="card-btn card-btn-primary"
                  aria-label={`View live demo of ${project.title}`}
                >
                  Live Demo
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
