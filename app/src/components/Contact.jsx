import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thanks — we will get back to you shortly.');
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <motion.div
          className="contact-text"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 6h18v12H3z" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Contact Us
          </span>
          <h2 className="display-md">How Can<br />We Help?</h2>
          <p>
            We&rsquo;re here to help every step of the way. Whether you have a question about a
            subscription, feedback on a roast, or want to talk wholesale, reach out below.
          </p>
          <div className="contact-photos">
            <div className="contact-photo two" />
            <div className="contact-photo one" />
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="contact-form-row">
            <input
              type="text"
              placeholder="FIRST NAME"
              required
              aria-label="First name"
              value={form.firstName}
              onChange={update('firstName')}
            />
            <input
              type="text"
              placeholder="LAST NAME"
              required
              aria-label="Last name"
              value={form.lastName}
              onChange={update('lastName')}
            />
          </div>
          <input
            type="email"
            placeholder="EMAIL"
            required
            aria-label="Email"
            value={form.email}
            onChange={update('email')}
          />
          <input
            type="tel"
            placeholder="PHONE"
            aria-label="Phone"
            value={form.phone}
            onChange={update('phone')}
          />
          <textarea
            placeholder="ENTER YOUR MESSAGE"
            aria-label="Message"
            value={form.message}
            onChange={update('message')}
          />
          <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Send Message
          </motion.button>
          <p className="contact-form-msg" role="status">{status}</p>
        </motion.form>
      </div>
    </section>
  );
}
