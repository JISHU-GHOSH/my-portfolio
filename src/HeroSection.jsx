/**
 * HeroSection — Full-screen immersive layout.
 *
 * Structure:
 *   • CharacterCanvas  — full-screen fixed background (z-index: 0)
 *   • .hero-vignette   — dark gradient vignette (z-index: 1)
 *   • .nav-pill        — frosted-glass top-center nav (z-index: 100)
 *   • .hero-text       — bottom-left name + bio + CTA (z-index: 10)
 *   • cursor-dot/ring  — magnetic white cursor (z-index: 9998/9999)
 */

import { useRef, useEffect } from 'react';
import CharacterCanvas from './CharacterCanvas';
import './HeroSection.css';

export default function HeroSection() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  // ── Magnetic cursor ───────────────────────────────────────
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Raw mouse position — updated only by mousemove, never read by rAF asynchronously
    let rawX = -9999, rawY = -9999, moved = false;

    // Dot spring state (very stiff — nearly instant, just prevents the 1-frame event lag)
    let dotX = -9999, dotY = -9999;

    // Ring spring state — softer, gives the trailing aura its elastic personality
    let ringX = -9999, ringY = -9999;
    let vx = 0, vy = 0;
    // k=0.18 (stiffness), d=0.75 (damping <1 = slight overshoot = magnetic snap feel)
    const K = 0.18, D = 0.75;

    let rafId;

    // mousemove: update raw coords ONLY — no DOM writes here
    function onMouseMove(e) {
      rawX = e.clientX;
      rawY = e.clientY;
      if (!moved) {
        // Snap everything to cursor on first move — no lerp-from-origin flash
        dotX  = rawX; dotY  = rawY;
        ringX = rawX; ringY = rawY;
        moved = true;
      }
    }

    // Single rAF loop drives BOTH elements — in sync, same frame, no timeline drift
    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!moved) return;

      // ── Dot: very fast lerp (0.82/frame ≈ feels instant, ~1 frame of smoothing) ──
      dotX += (rawX - dotX) * 0.82;
      dotY += (rawY - dotY) * 0.82;
      dot.style.transform = `translate(${dotX}px,${dotY}px)`;

      // ── Ring: spring physics — elastic, has slight overshoot ("magnetic" pull) ──
      const fx = (rawX - ringX) * K;
      const fy = (rawY - ringY) * K;
      vx = (vx + fx) * D;
      vy = (vy + fy) * D;
      ringX += vx;
      ringY += vy;
      ring.style.transform = `translate(${ringX}px,${ringY}px)`;
    }

    // Hover: both elements scale up together
    function onEnter() { dot.classList.add('is-hovering'); ring.classList.add('is-hovering'); }
    function onLeave() { dot.classList.remove('is-hovering'); ring.classList.remove('is-hovering'); }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    const targets = document.querySelectorAll('a, button, [role="button"]');
    targets.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      targets.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <>
      {/* ── Magnetic cursor ──────────────────────────────── */}
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <div className="hero">
        {/* Full-screen character animation (fixed, behind everything) */}
        <CharacterCanvas />

        {/* Vignette gradient overlay for text readability */}
        <div className="hero-vignette" aria-hidden="true" />

        {/* ── Frosted-glass nav pill ──────────────────────── */}
        <nav className="nav-pill" aria-label="Site navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* ── Bottom-left hero text ───────────────────────── */}
        <div className="hero-text">

          <p className="hero-greeting">Hi, I'm</p>

          <h1 className="hero-name">Jishu</h1>

          <p className="hero-bio">
            Full Stack Developer building elegant digital
            experiences — pixel-perfect UIs paired with
            scalable, thoughtful backend systems.
          </p>

          <div className="hero-buttons">
            <button className="btn-resume" aria-label="Download resume">
              Resume
              <span className="arrow" aria-hidden="true">↗</span>
            </button>
            <button className="btn-talk" aria-label="Get in touch">
              Let's Talk
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
