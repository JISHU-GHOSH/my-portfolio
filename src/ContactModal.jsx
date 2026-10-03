import { useState, useEffect, useRef } from 'react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  // Access key from environment (e.g. VITE_WEB3FORMS_KEY)
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;

  const triggerMailtoFallback = (customMessage) => {
    const subject = encodeURIComponent(`Portfolio Message from ${formState.name}`);
    const body = encodeURIComponent(
      `Hi Jishu,\n\n${formState.message || customMessage || ''}\n\n---\nFrom: ${formState.name}\nEmail: ${formState.email}`
    );
    window.open(`mailto:jishughosh698@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setStatusMessage('');

    if (web3formsKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: formState.name,
            email: formState.email,
            message: formState.message,
            from_name: 'Portfolio Contact Form',
            subject: `Portfolio Message from ${formState.name}`,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setSubmitStatus('success');
          setFormState({ name: '', email: '', message: '' });
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch {
        triggerMailtoFallback();
        setSubmitStatus('fallback');
        setStatusMessage('Network or API response issue. Opened directly in your mail client!');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Direct mail client trigger with full content prefilled
      triggerMailtoFallback();
      setSubmitStatus('fallback');
      setIsSubmitting(false);
    }
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

        {submitStatus === 'success' ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. Your message was delivered directly to my inbox and I will get back to you shortly.</p>
            <button
              type="button"
              className="reset-form-btn"
              onClick={() => setSubmitStatus(null)}
            >
              Send Another Message
            </button>
          </div>
        ) : submitStatus === 'fallback' ? (
          <div className="success-message">
            <div className="success-icon email-icon">✉</div>
            <h3>Opening Your Email Client</h3>
            <p>
              Your message was pre-formatted and opened in your email client addressed to{' '}
              <strong>jishughosh698@gmail.com</strong>.
            </p>
            {statusMessage && <p className="status-note">{statusMessage}</p>}
            <div className="fallback-btn-row">
              <button
                type="button"
                className="submit-btn"
                onClick={() => triggerMailtoFallback()}
              >
                Re-open Email App ↗
              </button>
              <button
                type="button"
                className="reset-form-btn"
                onClick={() => setSubmitStatus(null)}
              >
                Back to Form
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

            <div className="form-group">
              <label htmlFor="modal-name">Your Name</label>
              <input
                id="modal-name"
                type="text"
                required
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
                placeholder="Tell me about your project, idea, or timeline..."
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="sending-indicator">
                  <span className="spinner-dot" />
                  Sending Message...
                </span>
              ) : (
                'Send Message ↗'
              )}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
