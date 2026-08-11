import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Jane Whitfield',
    photo: `${import.meta.env.BASE_URL}images/JaneWhitfield.jpg`,
    date: 'Nov 12, 2025',
    rating: 5,
    quote: 'The Bourbon roast is rich and syrupy — my mornings completely changed since I started subscribing.',
  },
  {
    name: 'Marcus Reyes',
    photo: `${import.meta.env.BASE_URL}images/Marcus.jpg`,
    date: 'Oct 3, 2025',
    rating: 5,
    quote: 'Every bag tastes like it was roasted yesterday. The Caturra has a bright citrus note I have not found anywhere else.',
  },
  {
    name: 'Priya Anand',
    photo: `${import.meta.env.BASE_URL}images/priya.jpg`,
    date: 'Sep 21, 2025',
    rating: 4,
    quote: 'Shipping is fast and the packaging keeps everything fresh. The Typica is now a permanent fixture on my counter.',
  },
  {
    name: 'Owen Blake',
    photo: `${import.meta.env.BASE_URL}images/OwenBlake.jpg`,
    date: 'Aug 30, 2025',
    rating: 5,
    quote: 'Lumina Beans turned my weekday pour-over into the best part of my routine. Worth every penny.',
  },
];

function Star({ filled }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 1l2.6 5.9 6.4.6-4.8 4.4 1.4 6.3L10 14.9 4.4 18.2l1.4-6.3L1 7.5l6.4-.6L10 1Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function ReviewCard({ r }) {
  return (
    <motion.article className="review-card" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <div className="review-photo-frame" style={{ backgroundImage: `url('${r.photo}')` }} />
      <div className="review-body">
        <h3>{r.name}</h3>
        <div className="review-meta">
          <span className="review-badge">Verified Buyer</span>
          <span className="review-date">{r.date}</span>
        </div>
        <div className="review-stars" aria-label={`${r.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < r.rating} />
          ))}
        </div>
        <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
      </div>
    </motion.article>
  );
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const pairs = [];
  for (let i = 0; i < REVIEWS.length; i += 2) pairs.push(REVIEWS.slice(i, i + 2));
  const canPrev = index > 0;
  const canNext = index < pairs.length - 1;

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-head">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <p className="script-accent">Loved By You</p>
          <h2 className="display-md">Customer<br />Reviews</h2>
        </motion.div>

        <div>
          <p className="reviews-tagline">
            There&rsquo;s always room for coffee — it&rsquo;s not just a drink, it&rsquo;s a ritual worth savoring every morning.
          </p>
          <div className="reviews-nav">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              disabled={!canPrev}
              onClick={() => setIndex((i) => i - 1)}
              aria-label="Previous reviews"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <path d="M7 1 1 6l6 5M1 6h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              disabled={!canNext}
              onClick={() => setIndex((i) => i + 1)}
              aria-label="Next reviews"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <path d="M9 1l6 5-6 5M15 6H1" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="reviews-grid"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4 }}
        >
          {pairs[index].map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
