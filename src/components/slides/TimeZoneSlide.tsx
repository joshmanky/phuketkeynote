// Timezone slide - Template B: split layout with clocks left, content right
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';
import { useCountUp } from '../../hooks/useCountUp';

interface Props {
  phuketTime: string;
  germanyTime: string;
  keyPoints: string[];
  subtitle?: string;
}

export function TimeZoneSlide({ phuketTime, germanyTime, keyPoints, subtitle }: Props) {
  const phuketHour = useCountUp(parseInt(phuketTime), 1500);
  const germanyHour = useCountUp(parseInt(germanyTime), 1500);

  return (
    <div className="slide-base">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/[0.06] blur-[100px] top-[20%] left-[10%]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/[0.04] blur-[80px] bottom-[15%] right-[15%]" />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-16 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">
            <Clock size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">Die Zeitverschiebung als Waffe</h2>
          {subtitle && (
            <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          <motion.div variants={fadeUp} className="flex-1 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
            <div className="w-full max-w-[200px] bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
              <p className="text-amber-400/70 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Phuket</p>
              <p className="text-4xl md:text-5xl font-black text-white tabular-nums">
                {String(phuketHour).padStart(2, '0')}:00
              </p>
              <p className="text-white/25 text-xs mt-1">Ortszeit</p>
            </div>

            <ArrowRight size={18} className="text-white/15 rotate-90 lg:rotate-0 shrink-0" />

            <div className="w-full max-w-[200px] bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
              <p className="text-teal-400/70 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Deutschland</p>
              <p className="text-4xl md:text-5xl font-black text-white tabular-nums">
                {String(germanyHour).padStart(2, '0')}:00
              </p>
              <p className="text-white/25 text-xs mt-1">MEZ</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center mx-8">
            <div className="w-px h-4/5 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>
          <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="flex-1 flex flex-col justify-center space-y-3">
            {keyPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3"
              >
                <div className="w-6 h-6 rounded-lg bg-teal-500/10 border border-teal-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-teal-400 text-[10px] font-bold">{i + 1}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
