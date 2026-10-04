import { useState, useRef } from 'react';
import useScrollReveal from './useScrollReveal';
import './ContactSection.css';

export default function ContactSection({ onOpenModal }) {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useScrollReveal(sectionRef);

  const copyEmail = () => {
    navigator.clipboard.writeText('jishughosh698@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" ref={sectionRef} className="portfolio-section contact-section">
      <div className="section-container">
        <div className="contact-card interactive-card reveal-on-scroll">
          <div className="contact-glow-badge">Let's Connect</div>
          <h2 className="contact-title">Let's Build Something Exceptional</h2>
          <p className="contact-subtitle">
            Whether you have an ambitious product idea, need high-performance full-stack architecture, or want to discuss engineering, my inbox is always open.
          </p>

          <div className="contact-cta-row">
            <button className="card-btn card-btn-primary contact-main-btn" onClick={onOpenModal}>
              Send a Message
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </button>

            <button className="card-btn card-btn-secondary" onClick={copyEmail}>
              {copied ? '✓ Copied Email' : 'Copy Email Address'}
            </button>
          </div>

          <div className="social-links-bar">
            <a
              href="https://github.com/JISHU-GHOSH"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <span className="social-dot">•</span>
            <a
              href="mailto:jishughosh698@gmail.com"
              className="social-link"
              aria-label="Send direct email"
            >
              jishughosh698@gmail.com
            </a>
            <span className="social-dot">•</span>
            <a
              href="https://www.linkedin.com/in/jishu-ghosh-6b9270336/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className="social-dot">•</span>
            <a
              href="https://x.com/JISHU-GHOSH"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="X / Twitter profile"
            >
              X (Twitter)
            </a>
          </div>

          <div className="footer-copyright">
            <p>© 2026 Jishu Ghosh. Built with React 19, Vite & HTML5 Canvas 60 FPS.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
