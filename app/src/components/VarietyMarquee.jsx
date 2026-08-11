import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const VARIETIES = ['Typica', 'Bourbon', 'Caturra', 'Catuai', 'Geisha', 'Pacamara'];

function VarietyGroup({ hidden }) {
  return (
    <div className="variety-group" aria-hidden={hidden || undefined}>
      {VARIETIES.map((name, i) => (
        <span className="variety-item" key={i}>
          {name}
          <span className="variety-dot" />
        </span>
      ))}
    </div>
  );
}

export default function VarietyMarquee() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section className="variety-marquee" aria-label="Coffee bean varieties">
      <motion.div
        className="variety-track"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={reduceMotion ? undefined : { duration: 24, ease: 'linear', repeat: Infinity }}
      >
        <VarietyGroup />
        <VarietyGroup hidden />
      </motion.div>
    </section>
  );
}
