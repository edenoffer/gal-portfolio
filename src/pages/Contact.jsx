import { useState } from 'react';
import styles from './Contact.module.css';

const FORM_ENDPOINT = 'https://formspree.io/f/xzdkerwo';

const links = [
  {
    label: 'Portfolio',
    value: 'just-a-gal.com',
    href: 'https://just-a-gal.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/gal-michalevicz',
    href: 'https://linkedin.com/in/gal-michalevicz',
  },
];

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus('success');
        setFields({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className="mono">Contact</span>
        <h1 className={styles.heading}>Let's work<br />together.</h1>
      </header>

      <hr className={styles.rule} />

      {/* Contact form */}
      <section className={styles.formSection}>
        {status === 'success' ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            <p className={styles.successTitle}>Message sent.</p>
            <p className={styles.successSub}>I'll get back to you soon.</p>
            <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                value={fields.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email <span className={styles.required}>*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                value={fields.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message <span className={styles.required}>*</span></label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                value={fields.message}
                onChange={handleChange}
                placeholder="Tell me about the project..."
                required
                rows={5}
              />
            </div>
            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again or reach out on LinkedIn.</p>
            )}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending'}
              data-cursor=""
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </section>

      <hr className={styles.rule} />

      {/* Other links */}
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label} className={styles.linkRow}>
            <span className={styles.linkLabel}>{link.label}</span>
            <a
              href={link.href}
              className={styles.linkValue}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor=""
            >
              {link.value}
              <span className={styles.arrow}>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
