import './AboutSection.css';

export default function AboutSection() {
  return (
    <section id="about" className="portfolio-section about-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">About & Expertise</div>
          <h2 className="section-title">Architecting Digital Realities</h2>
          <p className="section-subtitle">
            Bridging pixel-perfect visual craft with distributed, resilient backend systems.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Core Philosophy */}
          <div className="bento-card bento-hero interactive-card">
            <div className="bento-tag">Philosophy</div>
            <h3 className="bento-title">High-Performance Craftsmanship</h3>
            <p className="bento-text">
              I believe modern web experiences should never compromise between visual ambition and raw speed.
              Whether implementing 60 FPS HTML5 Canvas animation math, shortest-path circular interpolation, or scalable microservices, I build with obsession over every millisecond and every pixel.
            </p>
            <div className="signature-container">
              <span className="bento-signature">Jishu Ghosh</span>
              <span className="signature-role">Full Stack Developer</span>
            </div>
          </div>

          {/* Card 2: Frontend Mastery */}
          <div className="bento-card bento-frontend interactive-card">
            <div className="bento-tag">Frontend & Creative UI</div>
            <h3 className="bento-card-title">Fluid Visual Systems</h3>
            <p className="bento-card-desc">
              Building responsive, accessible, zero-jank interfaces with modern web standards and GPU-accelerated graphics.
            </p>
            <ul className="skills-pill-list">
              <li className="skill-pill">React 19</li>
              <li className="skill-pill">TypeScript</li>
              <li className="skill-pill">HTML5 Canvas (60 FPS)</li>
              <li className="skill-pill">WebGL & Shaders</li>
              <li className="skill-pill">Next.js</li>
              <li className="skill-pill">Tailwind CSS</li>
              <li className="skill-pill">Spring Motion</li>
              <li className="skill-pill">Micro-Interactions</li>
            </ul>
          </div>

          {/* Card 3: Backend & Data Architectures */}
          <div className="bento-card bento-backend interactive-card">
            <div className="bento-tag">Backend & Architecture</div>
            <h3 className="bento-card-title">Resilient & Scalable Services</h3>
            <p className="bento-card-desc">
              Designing distributed backend APIs, high-throughput WebSockets, and structured relational & document schemas.
            </p>
            <ul className="skills-pill-list">
              <li className="skill-pill">Node.js & Express</li>
              <li className="skill-pill">Python & FastAPI</li>
              <li className="skill-pill">PostgreSQL & Timescale</li>
              <li className="skill-pill">Redis Caching & PubSub</li>
              <li className="skill-pill">WebSockets & RTC</li>
              <li className="skill-pill">Docker & Microservices</li>
              <li className="skill-pill">RESTful & GraphQL</li>
              <li className="skill-pill">CI/CD & DevOps</li>
            </ul>
          </div>

          {/* Card 4: Metrics & Principles */}
          <div className="bento-card bento-metrics interactive-card">
            <div className="bento-tag">Benchmarks</div>
            <div className="metrics-row">
              <div className="metric-box">
                <span className="metric-number">60 FPS</span>
                <span className="metric-label">Zero-Lag Render Loops</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">&lt;35ms</span>
                <span className="metric-label">Angular Lerp Latency</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">99.9%</span>
                <span className="metric-label">Uptime & Resilience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
