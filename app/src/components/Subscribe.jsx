import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Subscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Thank you! Your submission has been received!');
    setName('');
    setEmail('');
  };

  return (
    <section className="subscribe" id="subscribe">
      <video
        className="subscribe-photo-slot"
        src={`${import.meta.env.BASE_URL}video/coffe-video-parallex.mp4`}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <motion.div
        className="subscribe-content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <p className="script-accent on-dark">Subscribe</p>
        <h2 className="display-md">&amp; Never Run<br />Out of Your<br />Coffee</h2>
        <p className="subscribe-copy">
          Subscribe and get 15% discount on Premium coffee bags. Also you will not miss any
          upcoming discounts.
        </p>
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="FULL NAME"
            required
            aria-label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="EMAIL"
            required
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Subscribe
          </motion.button>
        </form>
        <p className="form-msg" role="status">{message}</p>
      </motion.div>
    </section>
  );
}
