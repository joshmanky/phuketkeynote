// Framer Motion AnimatePresence slide transition wrapper
import { AnimatePresence, motion } from 'framer-motion';
import { usePresentation } from '../../context/PresentationContext';
import { SlideRenderer } from './SlideRenderer';
import { BackgroundLayer } from '../ui/BackgroundLayer';

const slideVariants = {
  initial: { opacity: 0, scale: 0.94, y: 20 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, scale: 1.06, y: -20,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SlideTransition() {
  const { currentSlide } = usePresentation();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <BackgroundLayer slideIndex={currentSlide} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <SlideRenderer slideIndex={currentSlide} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
