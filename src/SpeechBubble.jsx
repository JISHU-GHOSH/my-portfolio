import './SpeechBubble.css';

export default function SpeechBubble({ message, isVisible }) {
  if (!isVisible && !message) return null;

  return (
    <aside
      className={`speech-bubble-container ${isVisible ? 'is-visible' : 'is-fading'}`}
      aria-live="polite"
      role="status"
    >
      <div className="speech-bubble-card">
        <div className="speech-bubble-badge">
          💬 JISHU
        </div>
        <p className="speech-bubble-text">{message}</p>
        <div className="speech-bubble-tail" aria-hidden="true" />
      </div>
    </aside>
  );
}
