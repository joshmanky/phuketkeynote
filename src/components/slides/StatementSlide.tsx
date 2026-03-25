// Statement slide - Template A: left-aligned, gradient heading, clean typography
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../lib/animations';
import type { StatementSlideData } from '../../types';

interface Props {
  data: StatementSlideData;
}

export function StatementSlide({ data }: Props) {
  return (
    <div className="slide-base">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/[0.06] blur-[120px] top-[30%] left-[20%] -translate-y-1/2" />
      </div>

      <motion.div
        className="relative z-10 w-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.1] gradient-text-teal mb-8 md:mb-10"
        >
          {data.heading}
        </motion.h2>

        <motion.div variants={fadeUp} className="mb-8 md:mb-10">
          <div className="w-16 h-px bg-gradient-to-r from-teal-400/50 to-transparent" />
        </motion.div>

        <div className="space-y-4 md:space-y-5 max-w-3xl">
          {data.body.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-white/60 text-lg md:text-xl lg:text-[22px] leading-[1.5] font-light"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
