import { motion } from 'framer-motion';
import Logo from './Logo';

const STEAM_WISPS = [
  { d: 'M26 30 C20 24, 32 18, 26 12 C20 6, 32 2, 26 -4', delay: 0 },
  { d: 'M36 30 C30 24, 42 18, 36 12 C30 6, 42 2, 36 -4', delay: 0.5 },
  { d: 'M46 30 C40 24, 52 18, 46 12 C40 6, 52 2, 46 -4', delay: 1 },
];

function CoffeeCup() {
  return (
    <svg viewBox="0 0 80 70" className="frame-loader-cup" aria-hidden="true">
      {STEAM_WISPS.map((wisp) => (
        <motion.path
          key={wisp.d}
          d={wisp.d}
          fill="none"
          stroke="#F3D2B3"
          strokeWidth="2.4"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.9, 0.9, 0], y: [6, -2, -10, -20] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: wisp.delay,
            times: [0, 0.25, 0.75, 1],
          }}
        />
      ))}
      <ellipse cx="36" cy="34" rx="16" ry="3.4" fill="#EFE3D8" />
      <path
        d="M20 34h32l-2.4 21.5c-.6 5.1-4.9 9-10 9h-7.2c-5.1 0-9.4-3.9-10-9L20 34Z"
        fill="#FFFFFF"
      />
      <path
        d="M52 39c6.2 0 11.2 4.6 11.2 10.5S58.2 60 52 60"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FrameLoader({ progress = 0 }) {
  return (
    <div className="frame-loader">
      <div className="logo frame-loader-logo">
        <Logo />
      </div>
      <CoffeeCup />
      <div className="frame-loader-track">
        <div className="frame-loader-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="frame-loader-text">Loading {progress}%</p>
    </div>
  );
}
