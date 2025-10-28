import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <section className="relative h-[52vh] min-h-[420px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Geb1kGWmIba9zPiH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for contrast; does not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-end px-6 pb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-[0.2em] text-[#D4AF37] drop-shadow-[0_0_18px_rgba(212,175,55,0.35)] sm:text-5xl">
          TECHSPARKS
        </h1>
      </div>
    </section>
  );
}
