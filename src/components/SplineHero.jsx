import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <section className="relative h-[52vh] min-h-[420px] w-full overflow-hidden bg-[#0a0e27]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4TrRyLcIHhcItjnk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay to improve text contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0e27]/40 via-[#0a0e27]/60 to-[#0a0e27]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-end px-6 pb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-cyan-200 drop-shadow-[0_0_20px_rgba(0,212,255,0.35)] sm:text-5xl">
          Hackathon Timer
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-cyan-100/80 sm:text-base">
          Stay focused. Track time precisely across sessions with hourly updates and a final-hour warning.
        </p>
      </div>
    </section>
  );
}
