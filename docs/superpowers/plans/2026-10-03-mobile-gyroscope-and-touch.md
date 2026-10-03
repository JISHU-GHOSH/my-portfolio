# Mobile Gyroscope and Touch Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement responsive mobile touch tracking and device gyroscope (tilt) interaction for the 60 FPS character canvas hero with smooth fallback and auto-centering.

**Architecture:** Extend `CharacterCanvas.jsx` to ingest both multi-phase touch coordinates (`touchstart`, `touchmove`, `touchend`, `touchcancel`) and device orientation angles (`beta` pitch and `gamma` roll via `deviceorientation`). When touching, direct touch coordinates drive the gaze; when idle on handheld devices, subtle gyro tilt steers the gaze in the direction the phone is physically tilted. On touch release, smoothly lerp gaze back to eye contact. In `HeroSection.css`, hide the desktop magnetic spring cursor on touch-only devices.

**Tech Stack:** React 19, HTML5 Canvas 60 FPS, Web DeviceOrientation API, Touch Events API, CSS `@media (hover: none) and (pointer: coarse)`.

**Spec:** User request: "lets do mobile gyroscope and touch interaction plan it first".

## Global Constraints

- Never use CSS 3D transforms (`perspective`, `rotateX`, `rotateY`) on the canvas.
- Maintain constant 60 FPS animation loop with zero GC allocations per tick.
- Gyroscope must be passive and non-blocking, gracefully failing on desktop browsers or devices without sensors.
- Hand tremors (<1.5° angular fluctuation) must be filtered with a deadband to avoid jittery head twitching.
- On iOS 13+, `DeviceOrientationEvent.requestPermission` must only be invoked on an explicit user gesture (`touchstart`).

---

### Task 1: Touch Interaction & Mobile Cursor Polish

**Files:**
- Modify: `portfolio-hero/src/CharacterCanvas.jsx:85-115`
- Modify: `portfolio-hero/src/HeroSection.css:20-40`

**Interfaces:**
- Consumes: Canvas tracking loop `state.current` (`mouseX`, `mouseY`)
- Produces: Instant responsiveness on first touch, auto-centering on touch release, hidden desktop cursor on touch screens

- [ ] **Step 1: Add touchstart, touchend, and touchcancel listeners with auto-center drift**

In `CharacterCanvas.jsx`:
```javascript
let isTouching = false;
let touchReturnRaf = null;

const onTouchStart = (e) => {
  if (e.touches && e.touches[0] && window.innerWidth > 0 && window.innerHeight > 0) {
    isTouching = true;
    if (touchReturnRaf) cancelAnimationFrame(touchReturnRaf);
    s.mouseX = e.touches[0].clientX / window.innerWidth;
    s.mouseY = e.touches[0].clientY / window.innerHeight;
  }
};

const onTouchMove = (e) => {
  if (e.touches && e.touches[0] && window.innerWidth > 0 && window.innerHeight > 0) {
    s.mouseX = e.touches[0].clientX / window.innerWidth;
    s.mouseY = e.touches[0].clientY / window.innerHeight;
  }
};

const onTouchEnd = () => {
  isTouching = false;
  // Smoothly return gaze to center eye contact (0.5, 0.5) over ~300ms
  function driftToCenter() {
    if (isTouching) return;
    const dx = 0.5 - s.mouseX;
    const dy = 0.5 - s.mouseY;
    if (Math.abs(dx) > 0.005 || Math.abs(dy) > 0.005) {
      s.mouseX += dx * 0.12;
      s.mouseY += dy * 0.12;
      touchReturnRaf = requestAnimationFrame(driftToCenter);
    } else {
      s.mouseX = 0.5;
      s.mouseY = 0.5;
    }
  }
  touchReturnRaf = requestAnimationFrame(driftToCenter);
};
```

- [ ] **Step 2: Hide desktop magnetic cursor ring on touch-only devices in CSS**

In `HeroSection.css`:
```css
@media (hover: none) and (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none !important;
  }
}
```

- [ ] **Step 3: Test and verify touch behavior and cursor visibility**
Run: `npm run lint` and verify no syntax or ref warnings.

---

### Task 2: Device Gyroscope Tilt Integration

**Files:**
- Modify: `portfolio-hero/src/CharacterCanvas.jsx`

**Interfaces:**
- Consumes: `window.DeviceOrientationEvent`, `window.addEventListener('deviceorientation')`
- Produces: Normalized `mouseX` and `mouseY` steering when device is tilted

- [ ] **Step 1: Implement tilt normalization with deadband and natural resting angle**

```javascript
// Natural handheld angle is ~45 deg pitch (beta), 0 deg roll (gamma)
let lastBeta = null;
let lastGamma = null;

const onDeviceOrientation = (e) => {
  if (isTouching) return; // Touch takes priority over tilt
  if (e.beta === null || e.gamma === null) return;

  const rawBeta = e.beta;   // Pitch: front-to-back tilt [-180, 180]
  const rawGamma = e.gamma; // Roll: left-to-right tilt [-90, 90]

  // Filter small hand tremors (deadband 1.2 degrees)
  if (lastBeta !== null && Math.abs(rawBeta - lastBeta) < 1.2 &&
      lastGamma !== null && Math.abs(rawGamma - lastGamma) < 1.2) {
    return;
  }
  lastBeta = rawBeta;
  lastGamma = rawGamma;

  // Natural resting pitch for handheld phones: 45°
  // Tilting up (towards face): beta 25° -> s.mouseY 0.2
  // Tilting down (towards desk): beta 65° -> s.mouseY 0.8
  const clampedBeta = Math.max(20, Math.min(70, rawBeta));
  const targetY = 0.2 + ((clampedBeta - 20) / 50) * 0.6;

  // Roll: -30° (tilt left) to +30° (tilt right)
  const clampedGamma = Math.max(-30, Math.min(30, rawGamma));
  const targetX = 0.5 + (clampedGamma / 60) * 0.6;

  // Smooth lerp into target coordinates
  s.mouseX += (targetX - s.mouseX) * 0.15;
  s.mouseY += (targetY - s.mouseY) * 0.15;
};
```

- [ ] **Step 2: Add iOS 13+ permission trigger on first touch**

```javascript
let permissionRequested = false;
const requestOrientationPermission = () => {
  if (permissionRequested) return;
  permissionRequested = true;
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
        }
      })
      .catch(() => {});
  }
};
```

- [ ] **Step 3: Cleanup listeners on unmount**

Ensure `removeEventListener('deviceorientation', onDeviceOrientation)` and `cancelAnimationFrame(touchReturnRaf)` are properly called in the `useEffect` cleanup return.

---

### Task 3: Build Verification & Live Deployment

**Files:**
- Verify: `portfolio-hero/src/CharacterCanvas.jsx`
- Verify: `portfolio-hero/src/HeroSection.css`

- [ ] **Step 1: Run code linter**
Run: `npm run lint`
Expected: 0 errors, 0 warnings.

- [ ] **Step 2: Run production build**
Run: `npm run build`
Expected: Production build passes cleanly with zero chunk warnings.

- [ ] **Step 3: Commit and push to main**
```bash
git add src/CharacterCanvas.jsx src/HeroSection.css docs/superpowers/plans/2026-10-03-mobile-gyroscope-and-touch.md
git commit -m "feat(mobile): add device gyroscope tilt tracking and fluid touch interaction"
git push
```

- [ ] **Step 4: Verify GitHub Actions deployment status**
Run: `gh run list --limit 1` and verify status `success`.
