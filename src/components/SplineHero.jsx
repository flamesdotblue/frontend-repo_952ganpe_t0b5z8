import React from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/S118QUiq5TT2ONdc/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gold gradient veil for contrast - allows interactions with scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#E6C04F] to-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]">
              TECHSPARKS
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#F5DEB3]/90 max-w-2xl">
            Synchronized hackathon timer with a futuristic 3D backdrop.
          </p>
        </div>
      </div>
    </section>
  );
}
