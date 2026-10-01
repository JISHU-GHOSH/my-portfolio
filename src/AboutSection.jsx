import './AboutSection.css';

export default function AboutSection() {
  return (
    <section id="about" className="portfolio-section about-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">About & Philosophy</div>
          <h2 className="section-title">Code as an Intuitive Medium</h2>
          <p className="section-subtitle">
            Operating at the intersection of aesthetic taste, rapid flow-state building, and deep computational foundations.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Vibe Coder Philosophy (Without Buzzwords) */}
          <div className="bento-card bento-hero interactive-card">
            <div className="bento-tag">The Approach</div>
            <h3 className="bento-title">Speed, Taste & Fluid Execution</h3>
            <p className="bento-text">
              I build by intuition and momentum. Rather than getting bogged down in ceremony, I operate in a creative flow-state—harnessing modern AI tools, agentic workflows, and high-level leverage to translate raw vision into functional, polished software in record time.
            </p>
            <p className="bento-text" style={{ marginTop: '-12px' }}>
              For me, great software is defined by how it <em>feels</em>: the micro-interactions, the response latency, the tactile feedback, and the emotional resonance of the interface. When aesthetic obsession meets rapid execution, magic happens.
            </p>
            <div className="signature-container">
              <span className="bento-signature">Jishu Ghosh</span>
              <span className="signature-role">Full Stack Developer & Creative Technologist</span>
            </div>
          </div>

          {/* Card 2: Core Programming Languages */}
          <div className="bento-card bento-frontend interactive-card">
            <div className="bento-tag">Languages & Foundations</div>
            <h3 className="bento-card-title">Polyglot Fluency</h3>
            <p className="bento-card-desc">
              Strong computational roots from systems programming up to modern expressive web languages.
            </p>
            <ul className="skills-pill-list">
              <li className="skill-pill" style={{ fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)' }}>Python</li>
              <li className="skill-pill" style={{ fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)' }}>C++</li>
              <li className="skill-pill" style={{ fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)' }}>C</li>
              <li className="skill-pill" style={{ fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)' }}>JavaScript (ESNext)</li>
              <li className="skill-pill" style={{ fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)' }}>HTML5 & Semantic Web</li>
              <li className="skill-pill" style={{ fontWeight: '700', borderColor: 'rgba(255,255,255,0.3)' }}>CSS3 & GPU Styling</li>
              <li className="skill-pill">TypeScript</li>
              <li className="skill-pill">SQL</li>
            </ul>
          </div>

          {/* Card 3: Portfolio & Modern Stack */}
          <div className="bento-card bento-backend interactive-card">
            <div className="bento-tag">Modern Ecosystem & Tooling</div>
            <h3 className="bento-card-title">Production & Creative Stack</h3>
            <p className="bento-card-desc">
              The frameworks, APIs, and pipelines used to engineer this portfolio and complex full-stack platforms:
            </p>
            <ul className="skills-pill-list">
              <li className="skill-pill">React 19</li>
              <li className="skill-pill">Vite</li>
              <li className="skill-pill">HTML5 Canvas (60 FPS)</li>
              <li className="skill-pill">OpenCV (Python Inpainting)</li>
              <li className="skill-pill">Spring Dynamics</li>
              <li className="skill-pill">FastAPI & Node.js</li>
              <li className="skill-pill">Tailwind CSS</li>
              <li className="skill-pill">WebSockets</li>
              <li className="skill-pill">DuckDB & SQLite</li>
              <li className="skill-pill">PostgreSQL</li>
              <li className="skill-pill">Git & GitHub Actions</li>
            </ul>
          </div>

          {/* Card 4: Execution Metrics */}
          <div className="bento-card bento-metrics interactive-card">
            <div className="bento-tag">Execution Standards</div>
            <div className="metrics-row">
              <div className="metric-box">
                <span className="metric-number">Flow State</span>
                <span className="metric-label">High-Velocity Prototyping</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">60 FPS</span>
                <span className="metric-label">Zero-Jank Visuals</span>
              </div>
              <div className="metric-box">
                <span className="metric-number">&lt;35ms</span>
                <span className="metric-label">Real-time Interaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
