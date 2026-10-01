import { useState, useEffect, useRef } from 'react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Modern web guidance fallback for light-dismiss on browsers without closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    const handleClick = (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClick);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText('jishughosh698@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <dialog
      ref={dialogRef}
      className="frosted-dialog"
      closedby="any"
      aria-labelledby="contactModalTitle"
    >
      <div className="dialog-content">
        <button
          className="dialog-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="dialog-header">
          <div className="section-badge">Get In Touch</div>
          <h2 id="contactModalTitle" className="dialog-title">Let's Talk</h2>
          <p className="dialog-subtitle">
            Have a project in mind or want to collaborate? Send a message or reach out directly.
          </p>
        </div>

        {/* Quick Email Copy Pill */}
        <div className="email-copy-bar">
          <span className="email-text">jishughosh698@gmail.com</span>
          <button
            type="button"
            className="copy-btn"
            onClick={copyEmail}
            aria-label="Copy email address"
          >
            {copied ? '✓ Copied!' : 'Copy Email'}
          </button>
        </div>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you shortly.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="modal-name">Your Name</label>
              <input
                id="modal-name"
                type="text"
                required
                placeholder="John Doe"
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-email">Your Email</label>
              <input
                id="modal-email"
                type="email"
                required
                placeholder="john@example.com"
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-message">Message</label>
              <textarea
                id="modal-message"
                rows={4}
                required
                placeholder="Tell me about your project, idea, or timeline..."
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-btn">
              Send Message ↗
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
