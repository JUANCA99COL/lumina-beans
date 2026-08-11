import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const VARIETALS = [
  { key: 'bourbon', name: 'Bourbon', copy: "Sweet, syrupy body with notes of caramel, Lumina's signature varietal." },
  { key: 'typica', name: 'Typica', copy: 'Clean, tea-like acidity and a delicate floral finish — the heirloom of Quimbaya.' },
  { key: 'caturra', name: 'Caturra', copy: 'Bright citrus acidity and a full, round mouthfeel from the high-altitude slopes.' },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const springy = { type: 'spring', stiffness: 300, damping: 22 };

function OfferCard({ v, hasHover, reduceMotion }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 24, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
    show: { opacity: 1, y: 0, boxShadow: '0px 0px 0px rgba(0,0,0,0)', transition: { duration: 0.5, ease: 'easeOut' } },
    active: {
      y: reduceMotion ? 0 : -8,
      boxShadow: '0px 20px 40px rgba(0,0,0,0.28)',
      transition: springy,
    },
  };
  const imageVariants = {
    rest: { scale: 1 },
    active: { scale: reduceMotion ? 1 : 1.08, transition: springy },
  };

  const [active, setActive] = useState(false);

  return (
    <motion.article
      className="offer-card"
      variants={cardVariants}
      animate={!hasHover && active ? 'active' : undefined}
      whileHover={hasHover ? 'active' : undefined}
      whileTap={!hasHover ? 'active' : undefined}
      onHoverStart={() => hasHover && setActive(true)}
      onHoverEnd={() => hasHover && setActive(false)}
      onTap={() => !hasHover && setActive((v) => !v)}
    >
      <div className="offer-photo-frame">
        <motion.div
          className={`offer-photo img-slot ${v.key}`}
          variants={imageVariants}
          animate={active ? 'active' : 'rest'}
        />
      </div>
      <h3>{v.name}</h3>
      <p>{v.copy}</p>
      <a href="#offer" className="offer-card-cta">
        Shop Now
      </a>
    </motion.article>
  );
}

export default function Offer() {
  const hasHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section className="offer" id="offer">
      <svg
        className="offer-torn-edge"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,18 L31,9 L62,24 L93,14 L124,28 L155,11 L186,20 L217,7 L248,25 L279,16 L310,10 L341,22 L372,13 L403,30 L434,8 L465,19 L496,26 L527,12 L558,17 L589,9 L620,23 L651,15 L682,7 L713,28 L744,11 L775,20 L806,14 L837,9 L868,25 L899,18 L930,10 L961,22 L992,16 L1023,8 L1054,27 L1085,13 L1116,19 L1147,11 L1178,24 L1200,15 L1200,100 L0,100 Z"
          style={{ fill: 'var(--color-primary)' }}
        />
      </svg>

      <motion.p
        className="script-accent center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        Our Offer
      </motion.p>
      <motion.h2
        className="display-md center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Three Origins,<br />One Terroir
      </motion.h2>

      <motion.div
        className="offer-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {VARIETALS.map((v) => (
          <OfferCard key={v.key} v={v} hasHover={hasHover} reduceMotion={reduceMotion} />
        ))}
      </motion.div>
    </section>
  );
}
