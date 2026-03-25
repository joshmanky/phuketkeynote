// Warning slide with red theme and urgent visual treatment
import { motion } from 'framer-motion';
import { AlertTriangle, Clock } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';

interface Props {
  heading: string;
  body: string[];
}

export function WarningSlide({ heading, body }: Props) {
  return (
    <div className="slide-base">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-red-500/[0.06] blur-[120px] top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/4" />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-16 max-w-3xl mx-auto text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle size={28} className="text-red-400" />
          </div>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-black text-red-400 leading-tight mb-6"
        >
          {heading}
        </motion.h2>

        <motion.div variants={fadeUp} className="mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-4 text-left">
          {body.map((paragraph, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-red-500/[0.04] border border-red-500/15 rounded-xl p-4 md:p-5"
            >
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-red-400/50 shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm md:text-base leading-relaxed">{paragraph}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-live" />
            <span className="text-red-400/70 text-[10px] font-bold tracking-wider uppercase">Puenktlichkeit ist Pflicht</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
