import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

// backgroundColor is animated from JS, so it needs a literal color rather
// than var(--color-accent) — Framer Motion can't tween a CSS custom property.
const roastingVariants = {
  hidden: { opacity: 0, y: 24, backgroundColor: 'rgba(246, 220, 194, 0)' },
  visible: {
    opacity: 1,
    y: 0,
    backgroundColor: 'rgb(246 220 194)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      backgroundColor: { duration: 0.9, ease: 'easeOut' },
    },
  },
};

// Each bean's resting spot (xEnd/restY, as % / px from the row's near edge),
// which edge it settles on, and which side it flies in from. Left/right
// entries are interleaved so each pile fills in from both sides at once
// rather than side-by-side.
const BEANS_BOTTOM = [
  { edge: 'bottom', side: 'left', xEnd: 3, restY: 2, rotate: -18, scale: 1 },
  { edge: 'bottom', side: 'right', xEnd: 95, restY: 8, rotate: 24, scale: 0.9 },
  { edge: 'bottom', side: 'left', xEnd: 11, restY: 12, rotate: 34, scale: 1.1 },
  { edge: 'bottom', side: 'right', xEnd: 87, restY: 0, rotate: -14, scale: 0.95 },
  { edge: 'bottom', side: 'left', xEnd: 20, restY: 6, rotate: -30, scale: 1 },
  { edge: 'bottom', side: 'right', xEnd: 78, restY: 14, rotate: 10, scale: 1.05 },
  { edge: 'bottom', side: 'left', xEnd: 29, restY: 0, rotate: 16, scale: 0.9 },
  { edge: 'bottom', side: 'right', xEnd: 69, restY: 10, rotate: -22, scale: 1 },
  { edge: 'bottom', side: 'left', xEnd: 38, restY: 16, rotate: 28, scale: 1.1 },
  { edge: 'bottom', side: 'right', xEnd: 60, restY: 4, rotate: -32, scale: 0.95 },
  { edge: 'bottom', side: 'left', xEnd: 47, restY: 1, rotate: -8, scale: 1 },
  { edge: 'bottom', side: 'right', xEnd: 53, restY: 18, rotate: 20, scale: 0.9 },
];

const BEANS_TOP = [
  { edge: 'top', side: 'left', xEnd: 7, restY: 6, rotate: 22, scale: 0.95 },
  { edge: 'top', side: 'right', xEnd: 91, restY: 0, rotate: -20, scale: 1 },
  { edge: 'top', side: 'left', xEnd: 16, restY: 14, rotate: -26, scale: 1.05 },
  { edge: 'top', side: 'right', xEnd: 83, restY: 10, rotate: 30, scale: 0.9 },
  { edge: 'top', side: 'left', xEnd: 25, restY: 2, rotate: 12, scale: 1 },
  { edge: 'top', side: 'right', xEnd: 74, restY: 16, rotate: -14, scale: 1.1 },
  { edge: 'top', side: 'left', xEnd: 34, restY: 8, rotate: -32, scale: 0.9 },
  { edge: 'top', side: 'right', xEnd: 65, restY: 4, rotate: 18, scale: 1 },
  { edge: 'top', side: 'left', xEnd: 43, restY: 18, rotate: 8, scale: 0.95 },
  { edge: 'top', side: 'right', xEnd: 57, restY: 0, rotate: -22, scale: 1.05 },
];

// Interleave the two piles (rather than concatenating) so each stagger step
// animates one bottom bean and one top bean together — both piles fill in
// at the same time instead of the bottom pile finishing before the top starts.
const BEANS = [];
const maxLen = Math.max(BEANS_BOTTOM.length, BEANS_TOP.length);
for (let i = 0; i < maxLen; i++) {
  if (BEANS_BOTTOM[i]) BEANS.push(BEANS_BOTTOM[i]);
  if (BEANS_TOP[i]) BEANS.push(BEANS_TOP[i]);
}

const beansContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

function beanVariants(b) {
  const fromX = b.side === 'left' ? '-60vw' : '60vw';
  const fromRotate = b.side === 'left' ? -70 : 70;
  const fromY = b.edge === 'bottom' ? '-70vh' : '70vh';
  return {
    hidden: { x: fromX, y: fromY, opacity: 0, rotate: fromRotate },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: b.rotate,
      transition: { type: 'spring', stiffness: 110, damping: 11, mass: 0.7 },
    },
  };
}

function CoffeeBean({ b, reduceMotion }) {
  return (
    <motion.svg
      className="coffee-bean"
      width={30 * b.scale}
      height={42 * b.scale}
      viewBox="0 0 30 42"
      aria-hidden="true"
      style={{ left: `${b.xEnd}%`, [b.edge]: `${b.restY}px` }}
      variants={reduceMotion ? undefined : beanVariants(b)}
    >
      <path d="M15 1C7 1 1 10 1 21s6 20 14 20 14-9 14-20S23 1 15 1Z" fill="var(--color-title-dark)" />
      <path d="M15 3C10 9 10 33 15 39" stroke="var(--color-primary)" strokeWidth="1.6" fill="none" opacity="0.55" />
    </motion.svg>
  );
}

function CoffeeBeansFall() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <motion.div
      className="coffee-beans-fall"
      aria-hidden="true"
      variants={reduceMotion ? undefined : beansContainerVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.4 }}
    >
      {BEANS.map((b, i) => (
        <CoffeeBean key={i} b={b} reduceMotion={reduceMotion} />
      ))}
    </motion.div>
  );
}

export default function Process() {
  return (
    <section className="process">
      <motion.article
        className="process-row roasting-row"
        id="roasting"
        variants={roastingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <CoffeeBeansFall />

        <div className="process-text center">
          <p className="script-accent on-dark">Roasting</p>
          <h3 className="display-md">Time to Warm<br />the Beans Up</h3>
          <p>
            In the hands of our master roasters, the green beans undergo a metamorphosis, as they
            are carefully roasted to perfection. Here, in the crucible of our roastery, the
            alchemy of heat and time transforms raw beans into a masterpiece of flavor,
            complexity, and balance.
          </p>
        </div>
      </motion.article>
    </section>
  );
}
