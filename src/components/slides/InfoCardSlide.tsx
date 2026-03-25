// Info card slide - Template C: horizontal card grid with accent borders
import { motion } from 'framer-motion';
import { Car, Bike, AlertTriangle, Video, Camera, Heart } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';
import type { InfoCardSlideData } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  car: <Car size={22} />,
  bike: <Bike size={22} />,
  'alert-triangle': <AlertTriangle size={22} />,
  video: <Video size={22} />,
  camera: <Camera size={22} />,
  heart: <Heart size={22} />,
};

const ACCENT_BORDER: Record<string, string> = {
  teal: 'border-l-teal-400',
  amber: 'border-l-amber-400',
  red: 'border-l-red-400',
};

const ACCENT_ICON: Record<string, string> = {
  teal: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  red: 'text-red-400 bg-red-500/10 border-red-500/20',
};

interface Props {
  data: InfoCardSlideData;
}

export function InfoCardSlide({ data }: Props) {
  return (
    <div className="slide-base">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[450px] h-[450px] rounded-full bg-teal-500/[0.05] blur-[100px] top-[30%] left-[50%] -translate-x-1/2" />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-16 max-w-4xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2">{data.heading}</h2>
          {data.subheading && (
            <p className="text-white/35 text-sm md:text-base">{data.subheading}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.items.map((item, i) => {
            const borderColor = ACCENT_BORDER[item.accent || 'teal'] || ACCENT_BORDER.teal;
            const iconColor = ACCENT_ICON[item.accent || 'teal'] || ACCENT_ICON.teal;
            const icon = ICON_MAP[item.icon];

            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white/[0.03] border border-white/[0.06] border-l-2 ${borderColor} rounded-xl p-5 md:p-6 transition-colors hover:border-white/[0.1]`}
              >
                <div className={`w-10 h-10 rounded-xl border ${iconColor} flex items-center justify-center mb-4`}>
                  {icon}
                </div>
                <h3 className="text-white font-bold text-sm md:text-base mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
