# Jishu — Luxury Portfolio Hero & Interactive Character Tracking

An award-winning, interactive portfolio hero section featuring a 60 FPS zero-ghosting, zero-lag character animation that tracks user cursor movements with real-time rotational physics and direct eye contact.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)
![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas%2060%20FPS-E34F26?style=for-the-badge&logo=html5)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Key Features

* **Zero-Ghosting 60 FPS Canvas Renderer:**
  * Uses pre-rendered high-quality WebP frames (64 directional angles + 1 neutral eye-contact frame) sampled along the 360° rotational trajectory.
  * Draws **exactly one crisp frame per tick** without alpha blending (avoiding double-face ghosting artifacts).
* **Smooth Shortest-Path Circular Angular Lerp:**
  * Computes the cursor vector relative to the character's eye center `atan2(-dy, dx)`.
  * Circular shortest-path normalization prevents 359° $\to$ 0° long-way snaps.
  * Two-phase tracking: constant linear response during rapid cursor sweeps with a gentle 3-frame deceleration settling into the target.
* **Direct Eye-Contact Deadzone:**
  * When the cursor enters within 12% of screen distance from the face, smoothly locks into `center.webp` for direct eye contact.
  * Continuous angle calculation across deadzone boundaries ensures zero snapping on exit.
* **Seamless Background & Inpainting:**
  * Matched precisely to the canvas background (`#9e150d`).
  * Processed with OpenCV Telea inpainting to eliminate artifacts or watermarks seamlessly.
* **Custom Magnetic Spring Cursor:**
  * Glowing white dot with a trailing aura ring.
  * Driven by second-order spring dynamics ($K=0.18, D=0.75$) with slight underdamped overshoot for a tactile "magnetic" feeling.
* **Frosted-Glass Luxury Typography & Navigation:**
  * Floating frosted-glass pill navbar with 20px backdrop blur and saturation.
  * Modern sans-serif greeting paired with Google Fonts **Dancing Script** for an elegant signature aesthetic.
  * Responsive CTA pill buttons with micro-interactions.

---

## 📐 Mathematical Architecture

1. **Cursor-to-Face Vector:**
   $$\vec{v} = (x_{cursor} - x_{face}, y_{cursor} - y_{face})$$
   $$\theta = \text{atan2}(-dy, dx)$$

2. **Shortest Angular Distance:**
   $$\Delta \theta = \theta_{target} - \theta_{current}$$
   $$\text{if } \Delta \theta > \pi \implies \Delta \theta = \Delta \theta - 2\pi$$
   $$\text{if } \Delta \theta < -\pi \implies \Delta \theta = \Delta \theta + 2\pi$$

3. **Spring-Physics Cursor Dynamics:**
   $$F = (X_{mouse} - X_{ring}) \cdot K$$
   $$V = (V + F) \cdot D$$
   $$X_{ring} = X_{ring} + V$$

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/JISHU-GHOSH/my-portfolio.git

# Navigate into the project directory
cd my-portfolio

# Install dependencies
npm install
```

### Development Server

Run the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```
my-portfolio/
├── public/
│   └── frames/                 # 64 directional WebP frames + center.webp
├── src/
│   ├── CharacterCanvas.jsx     # 60 FPS Canvas renderer with circular lerp
│   ├── HeroSection.jsx         # Layout, typography & spring cursor
│   ├── HeroSection.css         # Frosted glass, layout, typography styles
│   ├── App.jsx                 # App root component
│   ├── index.css               # Global styles & custom cursor classes
│   └── main.jsx                # Vite React entrypoint
├── scripts/
│   └── extract_frames.py       # Python/OpenCV video frame extraction & inpainting
├── index.html                  # HTML template with Google Fonts & preloads
├── package.json                # Project dependencies and metadata
├── vite.config.js              # Vite configuration
├── LICENSE                     # MIT License
└── README.md                   # Documentation
```

---

## 👤 Author

**Jishu Ghosh**
* GitHub: [@JISHU-GHOSH](https://github.com/JISHU-GHOSH)
* Email: [jishughosh698@gmail.com](mailto:jishughosh698@gmail.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
