/**
 * HeroSection — Full-screen immersive layout + Multi-Section Portfolio.
 *
 * Structure:
 *   • CharacterCanvas  — full-screen fixed background (z-index: 0)
 *   • .hero-vignette   — dark gradient vignette (z-index: 1)
 *   • .nav-pill        — frosted-glass top-center navigation (z-index: 1000)
 *   • .hero-text       — bottom-left name + bio + CTA (z-index: 10)
 *   • .content-wrapper — Work, About, and Contact sections (z-index: 10)
 *   • cursor-dot/ring  — magnetic white cursor with spring physics (z-index: 99998/99999)
 */

import { useRef, useEffect, useState } from 'react';
import CharacterCanvas from './CharacterCanvas';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import ContactModal from './ContactModal';
import ResumeModal from './ResumeModal';
import './HeroSection.css';

export default function HeroSection() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // ── Magnetic cursor with Spring Physics & Event Delegation ──
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rawX = -9999, rawY = -9999, moved = false;
    let dotX = -9999, dotY = -9999;
    let ringX = -9999, ringY = -9999;
    let vx = 0, vy = 0;

    // Spring constants: K=0.18 stiffness, D=0.75 damping for magnetic overshoot
    const K = 0.18, D = 0.75;
    let rafId;

    function onMouseMove(e) {
      rawX = e.clientX;
      rawY = e.clientY;
      if (!moved) {
        dotX  = rawX; dotY  = rawY;
        ringX = rawX; ringY = rawY;
        moved = true;
      }
    }

    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!moved) return;

      // Dot: fast lerp (0.82)
      dotX += (rawX - dotX) * 0.82;
      dotY += (rawY - dotY) * 0.82;
      dot.style.transform = `translate(${dotX}px,${dotY}px)`;

      // Ring: spring physics with elastic overshoot
      const fx = (rawX - ringX) * K;
      const fy = (rawY - ringY) * K;
      vx = (vx + fx) * D;
      vy = (vy + fy) * D;
      ringX += vx;
      ringY += vy;
      ring.style.transform = `translate(${ringX}px,${ringY}px)`;
    }

    // Event delegation: automatically handles buttons, links, inputs & cards
    function onMouseOver(e) {
      const target = e.target;
      if (
        target.closest('a, button, input, textarea, [role="button"], [role="tab"], .interactive-card, .skill-pill')
      ) {
        dot.classList.add('is-hovering');
        ring.classList.add('is-hovering');
      }
    }

    function onMouseOut(e) {
      const target = e.target;
      if (
        target.closest('a, button, input, textarea, [role="button"], [role="tab"], .interactive-card, .skill-pill')
      ) {
        dot.classList.remove('is-hovering');
        ring.classList.remove('is-hovering');
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="portfolio-page">
      {/* ── Magnetic cursor ──────────────────────────────── */}
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      {/* Full-screen character animation (fixed, behind everything) */}
      <CharacterCanvas />

      {/* Vignette gradient overlay for text readability */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Frosted-glass nav pill ──────────────────────── */}
      <nav className="nav-pill" aria-label="Site navigation">
        <a href="#hero">Home</a>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* ── Hero Section (100vh) ────────────────────────── */}
      <header id="hero" className="hero">
        <div className="hero-text">
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">Jishu</h1>
          <p className="hero-bio">
            Full Stack Developer building elegant digital
            experiences — pixel-perfect UIs paired with
            scalable, thoughtful backend systems.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-resume"
              onClick={() => setIsResumeOpen(true)}
              aria-label="View and download resume"
            >
              Resume
              <span className="arrow" aria-hidden="true">↗</span>
            </button>
            <button
              className="btn-talk"
              onClick={() => setIsContactOpen(true)}
              aria-label="Open contact form"
            >
              Let's Talk
            </button>
          </div>
        </div>

        <a href="#work" className="scroll-indicator" aria-label="Scroll down to explore work">
          <span>Explore Work</span>
          <span className="scroll-indicator-arrow" aria-hidden="true">↓</span>
        </a>
      </header>

      {/* ── Multi-Section Portfolio Content ─────────────── */}
      <main className="content-wrapper">
        <ProjectsSection />
        <AboutSection />
        <ContactSection onOpenModal={() => setIsContactOpen(true)} />
      </main>

      {/* ── Interactive Modals ──────────────────────────── */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
