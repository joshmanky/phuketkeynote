// Title slide with shimmer text, floating particles, and scan line effect
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { FloatingParticles } from '../ui/FloatingParticles';
import { staggerContainer, fadeUp } from '../../lib/animations';

interface Props {
  title: string;
  subtitle: string;
  location: string;
  dateRange: string;
}

export function TitleSlide({ title, subtitle, location, dateRange }: Props) {
  return (
    <div className="slide-base">
      <FloatingParticles count={30} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div
          className="absolute left-0 right-0 h-[100px]"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(20,184,166,0.03), transparent)',
            animation: 'scan 8s linear infinite',
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-teal-500/[0.08] blur-[120px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/[0.04] blur-[80px] bottom-[10%] right-[15%]" />
      </div>

      <motion.div
        className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-live" />
            <span className="text-teal-400/80 text-[10px] font-bold tracking-[0.3em] uppercase">{subtitle}</span>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-black leading-[0.95] shimmer-text mb-8"
        >
          {title}
        </motion.h1>

        <motion.div variants={fadeUp} className="mb-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent mx-auto" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-white/50">
            <MapPin size={15} className="text-teal-400/70" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2 text-white/50">
            <Calendar size={15} className="text-teal-400/70" />
            <span className="text-sm font-medium">{dateRange}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
