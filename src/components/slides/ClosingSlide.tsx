// Closing slide with letter-by-letter reveal and particle burst effect
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import { staggerContainer, fadeUp } from '../../lib/animations';

interface Props {
  title: string;
  subtitle: string;
}

export function ClosingSlide({ title, subtitle }: Props) {
  const burstParticles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const distance = 80 + Math.random() * 180;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: 0.4 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
      };
    });
  }, []);

  return (
    <div className="slide-base">
      <FloatingParticles count={20} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-teal-500/[0.08] blur-[120px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/[0.04] blur-[70px] top-[15%] right-[15%]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {burstParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-teal-400/50"
            style={{ left: '50%', top: '50%', width: p.size, height: p.size }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [0, 0.7, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{ duration: 2, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center px-6 md:px-16 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20">
            <Plane size={24} className="text-teal-400" />
          </div>
        </motion.div>

        <div className="mb-6 overflow-hidden">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black shimmer-text">
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div variants={fadeUp}>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent mx-auto mb-6" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-white/40 text-lg md:text-xl font-light">
          {subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12">
          <p className="text-white/15 text-[10px] tracking-[0.25em] uppercase">
            Phuket, Thailand &middot; 2026
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
