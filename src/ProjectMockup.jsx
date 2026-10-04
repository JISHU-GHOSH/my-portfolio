/**
 * ProjectMockup — Vector-crisp, hardware-accelerated UI previews for project cards.
 * Zero external image dependencies. 100% SVG + CSS.
 */

export default function ProjectMockup({ projectId }) {
  if (projectId === 'promptforge-ai') {
    return (
      <div className="project-mockup mockup-promptforge" aria-hidden="true">
        <div className="mockup-bar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <span className="mockup-filename">promptforge // sidepanel-studio</span>
          <span className="mockup-badge badge-purple">FAILOVER OK</span>
        </div>

        <div className="mockup-body mockup-body-split">
          <div className="mockup-wand-wrap">
            <div className="mockup-wand-badge">
              <span className="wand-icon">🪄</span>
              <span className="wand-sub">&lt;180ms Groq</span>
            </div>
          </div>

          <div className="mockup-telemetry-col">
            <div className="mockup-telemetry-row">
              <span className="telemetry-label">Cascade:</span>
              <span className="telemetry-val val-purple">Groq ➔ Gemini ➔ Claude</span>
            </div>
            <div className="mockup-telemetry-row">
              <span className="telemetry-label">In-Page Wand:</span>
              <span className="telemetry-val">ChatGPT • Claude • Gemini</span>
            </div>
            <div className="mockup-telemetry-row">
              <span className="telemetry-label">Test Suite:</span>
              <span className="telemetry-val">138/138 Passed</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'xubhodaya') {
    return (
      <div className="project-mockup mockup-xubhodaya" aria-hidden="true">
        <div className="mockup-bar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <span className="mockup-filename">xubhodaya // cognitive-care</span>
          <span className="mockup-badge badge-emerald">SIH 2026</span>
        </div>

        <div className="mockup-body mockup-body-split">
          <div className="mockup-gauge-wrap">
            <svg width="64" height="64" viewBox="0 0 72 72" className="mockup-gauge-svg">
              <circle cx="36" cy="36" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
              <circle
                cx="36"
                cy="36"
                r="28"
                stroke="#10b981"
                strokeWidth="5"
                strokeDasharray="175.9"
                strokeDashoffset="24"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90 36 36)"
              />
              <text x="36" y="34" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="sans-serif">
                88%
              </text>
              <text x="36" y="47" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" letterSpacing="0.08em" fontWeight="600">
                STABLE
              </text>
            </svg>
          </div>

          <div className="mockup-telemetry-col">
            <div className="mockup-telemetry-row">
              <span className="telemetry-label">Hints:</span>
              <span className="telemetry-val val-emerald">Level 1/3 (Semantic)</span>
            </div>
            <div className="mockup-telemetry-row">
              <span className="telemetry-label">Motor Dwell:</span>
              <span className="telemetry-val">142ms · Normal</span>
            </div>
            <div className="mockup-telemetry-row">
              <span className="telemetry-label">Audio:</span>
              <span className="telemetry-val">Voice Companion Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'quant-engine') {
    return (
      <div className="project-mockup mockup-quant" aria-hidden="true">
        <div className="mockup-bar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <span className="mockup-filename">quant-terminal // duckdb-ws</span>
          <span className="mockup-badge badge-amber">LIVE 28ms</span>
        </div>

        <div className="mockup-body mockup-body-chart">
          <svg width="100%" height="52" viewBox="0 0 240 52" preserveAspectRatio="none" className="mockup-chart-svg">
            <line x1="0" y1="16" x2="240" y2="16" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="36" x2="240" y2="36" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            
            {/* Candlesticks */}
            <g opacity="0.8">
              <line x1="22" y1="14" x2="22" y2="40" stroke="#10b981" strokeWidth="1" />
              <rect x="18" y="20" width="8" height="15" fill="#10b981" rx="1" />

              <line x1="48" y1="20" x2="48" y2="46" stroke="#ef4444" strokeWidth="1" />
              <rect x="44" y="25" width="8" height="14" fill="#ef4444" rx="1" />

              <line x1="74" y1="10" x2="74" y2="36" stroke="#10b981" strokeWidth="1" />
              <rect x="70" y="14" width="8" height="16" fill="#10b981" rx="1" />

              <line x1="100" y1="6" x2="100" y2="32" stroke="#10b981" strokeWidth="1" />
              <rect x="96" y="10" width="8" height="16" fill="#10b981" rx="1" />

              <line x1="126" y1="14" x2="126" y2="42" stroke="#ef4444" strokeWidth="1" />
              <rect x="122" y="18" width="8" height="16" fill="#ef4444" rx="1" />

              <line x1="152" y1="4" x2="152" y2="28" stroke="#10b981" strokeWidth="1" />
              <rect x="148" y="7" width="8" height="16" fill="#10b981" rx="1" />

              <line x1="178" y1="2" x2="178" y2="24" stroke="#10b981" strokeWidth="1" />
              <rect x="174" y="5" width="8" height="14" fill="#10b981" rx="1" />

              <line x1="204" y1="1" x2="204" y2="18" stroke="#f59e0b" strokeWidth="1.5" />
              <rect x="199" y="3" width="10" height="11" fill="#f59e0b" rx="1" />
            </g>

            {/* Glowing Spline Trend Line */}
            <path
              d="M 10 38 Q 45 34 72 20 T 145 13 T 230 4"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.2"
              className="chart-trend-glow"
            />
          </svg>

          <div className="mockup-chart-footer">
            <span className="ticker-chip">Alpha SNR: <strong>+3.42σ</strong></span>
            <span className="ticker-chip">Order Routing: <strong>SOR VWAP</strong></span>
            <span className="ticker-chip">DuckDB: <strong>&lt;35ms</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / 3D Canvas character hero preview
  return (
    <div className="project-mockup mockup-canvas" aria-hidden="true">
      <div className="mockup-bar">
        <div className="mockup-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <span className="mockup-filename">character-canvas // 60fps-engine</span>
        <span className="mockup-badge badge-crimson">60 FPS</span>
      </div>

      <div className="mockup-body mockup-body-split">
        <div className="mockup-radar-wrap">
          <svg width="64" height="64" viewBox="0 0 72 72" className="mockup-radar-svg">
            <circle cx="36" cy="36" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            <circle cx="36" cy="36" r="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" strokeDasharray="2 3" />
            <circle cx="36" cy="36" r="10" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" />
            <line x1="36" y1="4" x2="36" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="4" y1="36" x2="68" y2="36" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <g className="radar-sweep-pivot">
              <line x1="36" y1="36" x2="62" y2="20" stroke="#ff4d4d" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="62" cy="20" r="3" fill="#ff4d4d" />
            </g>
            <circle cx="36" cy="36" r="2.5" fill="#ffffff" />
          </svg>
        </div>

        <div className="mockup-telemetry-col">
          <div className="mockup-telemetry-row">
            <span className="telemetry-label">Tracking:</span>
            <span className="telemetry-val val-crimson">atan2(-dy, dx) Vector</span>
          </div>
          <div className="mockup-telemetry-row">
            <span className="telemetry-label">Buffer:</span>
            <span className="telemetry-val">64 WebP (Telea Clean)</span>
          </div>
          <div className="mockup-telemetry-row">
            <span className="telemetry-label">Dynamics:</span>
            <span className="telemetry-val">Circular Shortest-Path</span>
          </div>
        </div>
      </div>
    </div>
  );
}
