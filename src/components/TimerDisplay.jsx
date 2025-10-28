import React from 'react';

function pad(n) {
  return n.toString().padStart(2, '0');
}

export default function TimerDisplay({ remainingMs, totalMs, running, onReset }) {
  const clamped = Math.max(0, remainingMs);
  const hours = Math.floor(clamped / 3600000);
  const minutes = Math.floor((clamped % 3600000) / 60000);
  const seconds = Math.floor((clamped % 60000) / 1000);

  const progress = totalMs > 0 ? 100 - Math.min(100, (clamped / totalMs) * 100) : 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-[#D4AF37]/30 bg-black/60 p-6 text-center shadow-[0_0_30px_rgba(212,175,55,0.12)] backdrop-blur">
      <div className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]/80">Time Remaining</div>
      <div className="font-mono text-6xl tabular-nums text-[#F8FAFC] drop-shadow-[0_0_20px_rgba(212,175,55,0.25)] sm:text-7xl md:text-8xl">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#111111]">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E6C04F] transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!running && totalMs > 0 && clamped === 0 && (
        <div className="mt-2 text-[#F5DEB3]">Time's up! Great job pushing through.</div>
      )}

      {!running && (
        <button
          onClick={onReset}
          className="mt-2 inline-flex items-center justify-center rounded-md border border-[#D4AF37]/40 px-3 py-1.5 text-sm text-[#F3F4F6] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
        >
          Reset
        </button>
      )}
    </div>
  );
}
