/**
 * HeroSection — Full-screen immersive layout + Multi-Section Portfolio.
 *
 * Structure:
 *   • CharacterCanvas  — full-screen fixed background (z-index: 0)
 *   • SpeechBubble     — floating interactive dialogue bubble (z-index: 25)
 *   • .hero-vignette   — dark gradient vignette (z-index: 1)
 *   • .nav-pill        — frosted-glass top-center navigation (z-index: 1000)
 *   • sound-toggle-btn — luxury audio toggle button (z-index: 1000)
 *   • .hero-text       — bottom-left name + bio + CTA (z-index: 10)
 *   • .content-wrapper — Work, About, and Contact sections (z-index: 10)
 *   • cursor-dot/ring  — magnetic white cursor with spring physics (z-index: 99998/99999)
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import CharacterCanvas from './CharacterCanvas';
import SpeechBubble from './SpeechBubble';
import ProjectsSection from './ProjectsSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import ContactModal from './ContactModal';
import ResumeModal from './ResumeModal';
import './HeroSection.css';

const MESSAGES = [
  "Hey! I'm Jishu. Welcome to my creative space 👋",
  "Fun fact: My head is tracking you at 60 FPS using pure vector math 📐",
  "Check out Xubhodaya and the Quant engine below 🚀",
  "Looking for high-velocity engineering with taste? Let's talk!"
];

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function HeroSection() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const bubbleTimeoutRef = useRef(null);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Active section scroll spy state
  const [activeSection, setActiveSection] = useState('hero');
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef(null);

  // Easter Egg & Character Interactive States
  const [speechMessage, setSpeechMessage] = useState('');
  const [isSpeechVisible, setIsSpeechVisible] = useState(false);
  const [isNodding, setIsNodding] = useState(false);
  const messageIndexRef = useRef(0);

  // Programmatic smooth scroll with temporary spy lock to avoid midway jitter
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }

    if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    isManualScrollRef.current = true;
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);
  }, []);

  // ── Scroll Spy Observer ──────────────────────────────────
  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);

    let ticking = false;
    const updateActiveSection = () => {
      if (isManualScrollRef.current) {
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom boundary: activate contact even if section is short
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveSection('contact');
        ticking = false;
        return;
      }

      // Top boundary: activate hero immediately
      if (scrollY < 120) {
        setActiveSection('hero');
        ticking = false;
        return;
      }

      // 35% viewport eye-level reference threshold
      const targetY = windowHeight * 0.35;
      let current = 'hero';
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetY) {
          current = el.id;
        }
      }
      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    };
  }, []);

  // Character reaction trigger (silent visual popup + subtle nod)
  const triggerCharacterReaction = useCallback((customMsg) => {
    setIsNodding(true);
    setTimeout(() => setIsNodding(false), 250);

    const nextMsg = customMsg || MESSAGES[messageIndexRef.current % MESSAGES.length];
    messageIndexRef.current += 1;
    setSpeechMessage(nextMsg);
    setIsSpeechVisible(true);

    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setIsSpeechVisible(false);
    }, 4200);
  }, []);

  // ── Automatic Ambient Message Rotation ────────────────────
  useEffect(() => {
    // Initial greeting after 2.2 seconds of arrival
    const initialTimer = setTimeout(() => {
      if (window.scrollY < 300) {
        triggerCharacterReaction(MESSAGES[0]);
      }
    }, 2200);

    // Ambient rotation every 10 seconds while hero section is in view
    const intervalTimer = setInterval(() => {
      if (window.scrollY < window.innerHeight * 0.4 && !isContactOpen && !isResumeOpen) {
        triggerCharacterReaction();
      }
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [triggerCharacterReaction, isContactOpen, isResumeOpen]);



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
      <CharacterCanvas
        isNodding={isNodding}
      />

      {/* Vignette gradient overlay for text readability */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Frosted-glass nav pill with active scroll spy ────────────────── */}
      <nav className="nav-pill" aria-label="Site navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* ── Hero Section (100vh) ────────────────────────── */}
      <header id="hero" className="hero">
        {/* Interactive Speech Bubble */}
        <SpeechBubble
          message={speechMessage}
          isVisible={isSpeechVisible}
        />

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

      {/* ── Interactive Modals ──────────────────── */}
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
