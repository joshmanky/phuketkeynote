// Animated ambient background that smoothly transitions between slide backgrounds
import { motion } from 'framer-motion';

const GLOW_CONFIGS = [
  [
    { x: '15%', y: '20%', color: 'rgba(20, 184, 166, 0.12)', size: 500 },
    { x: '80%', y: '75%', color: 'rgba(30, 64, 175, 0.08)', size: 400 },
  ],
  [
    { x: '75%', y: '70%', color: 'rgba(245, 158, 11, 0.08)', size: 450 },
    { x: '25%', y: '25%', color: 'rgba(20, 184, 166, 0.04)', size: 300 },
  ],
  [
    { x: '50%', y: '40%', color: 'rgba(255, 255, 255, 0.03)', size: 500 },
    { x: '50%', y: '60%', color: 'rgba(6, 182, 212, 0.06)', size: 350 },
  ],
];

interface Props {
  slideIndex: number;
}

export function BackgroundLayer({ slideIndex }: Props) {
  const glows = GLOW_CONFIGS[slideIndex % GLOW_CONFIGS.length];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ background: '#080d18' }}>
      {glows.map((glow, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: glow.size, height: glow.size, filter: 'blur(100px)' }}
          animate={{ left: glow.x, top: glow.y, backgroundColor: glow.color }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
