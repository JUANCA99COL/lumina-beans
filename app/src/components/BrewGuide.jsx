import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const STEPS = [
  {
    index: '01',
    title: 'Grind Just Before Brewing',
    copy: 'Fresh, never stale — grind your beans right before brewing to lock in the aromatic oils that develop during roasting. A medium-coarse grind unlocks the full character of our single-origin beans.',
  },
  {
    index: '02',
    title: 'Slow, Steady Extraction',
    copy: 'Use water just off the boil, around 200°F, and let the grounds bloom for thirty seconds before the full pour. Patience draws out the caramel sweetness and bright acidity Quimbaya beans are known for.',
  },
  {
    index: '03',
    title: 'Savor Every Sip',
    copy: 'Pour into a warmed cup and pause before your first sip. Notice the aroma, the body, the lingering finish — every cup carries the story of the hands that grew and roasted it.',
  },
];

function BrewStep({ index, title, copy }) {
  const [active, setActive] = useState(false);
  return (
    <motion.div
      className={`brew-step${active ? ' is-active' : ''}`}
      viewport={{ margin: '-45% 0px -45% 0px' }}
      onViewportEnter={() => setActive(true)}
      onViewportLeave={() => setActive(false)}
    >
      <span className="brew-step-index">{index}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </motion.div>
  );
}

export default function BrewGuide() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section className="brew-guide" id="brew-guide">
      <motion.p
        className="script-accent center"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        How To Brew
      </motion.p>
      <motion.h2
        className="display-md center"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Three Steps<br />To Your Cup
      </motion.h2>

      <div className="brew-grid">
        <div className="brew-copy">
          {STEPS.map((step) => (
            <BrewStep key={step.index} {...step} />
          ))}
        </div>
        <div className="brew-visual">
          <div className="brew-visual-slot img-slot brewing" />
        </div>
      </div>
    </section>
  );
}
