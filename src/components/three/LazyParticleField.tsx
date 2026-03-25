// Lazy-loaded wrapper for ParticleField to enable code splitting of Three.js
import { lazy, Suspense } from 'react';

const ParticleFieldInner = lazy(() =>
  import('./ParticleField').then(m => ({ default: m.ParticleField }))
);

export function LazyParticleField() {
  return (
    <Suspense fallback={null}>
      <ParticleFieldInner />
    </Suspense>
  );
}
