import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const VISION_COPY =
  'Welcome to Lumina Beans, where every sip tells a story of meticulous craftsmanship and unparalleled quality. Our journey begins amidst the lush hills of Quimbaya, Colombia, where the soul of our coffee is nurtured through four distinctive steps:';

function HighlightWord({ word, index, count, progress }) {
  const start = index / count;
  const end = (index + 1) / count;
  const color = useTransform(progress, [start, end], ['#241308', '#95271D']);
  return <motion.span style={{ color }}>{word} </motion.span>;
}

export default function Vision() {
  const copyRef = useRef(null);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: ['start 0.85', 'start 0.25'],
  });

  const words = VISION_COPY.split(' ');

  return (
    <section className="vision" id="vision">
      <div className="vision-inner">
        <motion.p
          className="script-accent center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          Our vision
        </motion.p>
        <motion.h2
          className="display-md center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Craft, Quality, Care
        </motion.h2>
        <motion.p
          ref={copyRef}
          className="vision-copy"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {reduceMotion
            ? VISION_COPY
            : words.map((word, i) => (
                <HighlightWord key={`${word}-${i}`} word={word} index={i} count={words.length} progress={scrollYProgress} />
              ))}
        </motion.p>
      </div>
    </section>
  );
}
