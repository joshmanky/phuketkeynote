// 3D slide transition wrapper with enter/exit animations
import { usePresentation } from '../../context/PresentationContext';
import { SLIDES } from '../../data/slides';
import { SlideRenderer } from './SlideRenderer';

export function SlideTransition() {
  const { currentSlide, previousSlide, isTransitioning, transitionDirection } = usePresentation();

  const activeSlide = isTransitioning && previousSlide !== null ? previousSlide : currentSlide;
  const incomingSlide = isTransitioning ? currentSlide : null;

  const exitTransition = isTransitioning && previousSlide !== null
    ? SLIDES[incomingSlide ?? currentSlide]?.transition || 'mindflow'
    : null;
  const enterTransition = isTransitioning && incomingSlide !== null
    ? SLIDES[incomingSlide]?.transition || 'mindflow'
    : null;

  const reverseSuffix = transitionDirection === 'backward' ? '-reverse' : '';

  return (
    <div className="slide-container">
      <div
        key={`slide-${activeSlide}`}
        className={`slide-base ${exitTransition ? `slide-exit-${exitTransition}${reverseSuffix}` : ''}`}
      >
        <SlideRenderer slideIndex={activeSlide} />
      </div>

      {isTransitioning && incomingSlide !== null && (
        <div
          key={`slide-${incomingSlide}`}
          className={`slide-base ${enterTransition ? `slide-enter-${enterTransition}${reverseSuffix}` : ''}`}
        >
          <SlideRenderer slideIndex={incomingSlide} />
        </div>
      )}
    </div>
  );
}
