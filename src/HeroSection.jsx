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
import { playChimeSound, playHyperSound, toggleAudio } from './soundEffects';
import './HeroSection.css';

const MESSAGES = [
  "Hey! I'm Jishu. Welcome to my creative space 👋",
  "Fun fact: My head is tracking you at 60 FPS using pure vector math 📐",
  "Check out Xubhodaya and the Quant engine below 🚀",
  "Looking for high-velocity engineering with taste? Let's talk!",
  "Double-click me to unleash Hyper-Speed Focus mode ⚡"
];

export default function HeroSection() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const bubbleTimeoutRef = useRef(null);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Easter Egg & Character Interactive States
  const [speechMessage, setSpeechMessage] = useState('');
  const [isSpeechVisible, setIsSpeechVisible] = useState(false);
  const [isHyperMode, setIsHyperMode] = useState(false);
  const [isNodding, setIsNodding] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const messageIndexRef = useRef(0);

  // Character reaction trigger (stable callback)
  const triggerCharacterReaction = useCallback((customMsg) => {
    playChimeSound();
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

  // Double click Easter egg: Hyper-speed mode
  const triggerHyperMode = useCallback(() => {
    playHyperSound();
    setIsHyperMode(true);
    setIsNodding(true);
    setTimeout(() => setIsNodding(false), 300);

    setSpeechMessage("⚡ Hyper-Speed Focus Mode Engaged!");
    setIsSpeechVisible(true);

    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setIsSpeechVisible(false);
    }, 4500);

    setTimeout(() => {
      setIsHyperMode(false);
    }, 5000);
  }, []);

  // Idle Stare Callback
  const handleIdleStare = useCallback(() => {
    triggerCharacterReaction("Caught you staring! 👀");
  }, [triggerCharacterReaction]);

  // Sound toggle
  const handleToggleSound = () => {
    const muted = toggleAudio();
    setIsAudioMuted(muted);
    if (!muted) {
      playChimeSound();
    }
  };

  // Hero click & tap handler
  const handleHeroClick = (e) => {
    if (e.target.closest('button, a, input, textarea, nav, .hero-buttons')) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const dx = e.clientX - W * 0.50;
    const dy = e.clientY - H * 0.40;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // If within character proximity (radius ~40% of viewport)
    if (dist < Math.min(W, H) * 0.42) {
      triggerCharacterReaction();
    }
  };

  const handleHeroDoubleClick = (e) => {
    if (e.target.closest('button, a, input, textarea, nav, .hero-buttons')) return;
    triggerHyperMode();
  };

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
      <div
        ref={ringRef}
        className={`cursor-ring ${isHyperMode ? 'is-hyper-active' : ''}`}
        aria-hidden="true"
      />

      {/* Full-screen character animation (fixed, behind everything) */}
      <CharacterCanvas
        isHyperMode={isHyperMode}
        isNodding={isNodding}
        onIdleStare={handleIdleStare}
      />

      {/* Vignette gradient overlay for text readability */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Frosted-glass nav pill ──────────────────────── */}
      <nav className="nav-pill" aria-label="Site navigation">
        <a href="#hero">Home</a>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* ── Sound Toggle Pill (Top-Right) ────────────────── */}
      <button
        type="button"
        className="sound-toggle-btn"
        onClick={handleToggleSound}
        aria-label={isAudioMuted ? "Unmute interface audio" : "Mute interface audio"}
      >
        {isAudioMuted ? '🔇 Audio: OFF' : '🔊 Audio: ON'}
      </button>

      {/* ── Hero Section (100vh) ────────────────────────── */}
      <header
        id="hero"
        className="hero"
        onClick={handleHeroClick}
        onDoubleClick={handleHeroDoubleClick}
        title="Click me to chat • Double-click for Hyper-Speed!"
      >
        {/* Interactive Speech Bubble */}
        <SpeechBubble
          message={speechMessage}
          isVisible={isSpeechVisible}
          isHyperMode={isHyperMode}
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
