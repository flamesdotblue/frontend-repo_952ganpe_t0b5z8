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
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-cyan-400/20 bg-[#0b1033]/60 p-6 text-center shadow-[0_0_30px_rgba(0,212,255,0.08)] backdrop-blur">
      <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/70">Time Remaining</div>
      <div className="font-mono text-6xl tabular-nums text-cyan-100 drop-shadow-[0_0_20px_rgba(0,212,255,0.25)] sm:text-7xl md:text-8xl">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#0a0e27]">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!running && totalMs > 0 && clamped === 0 && (
        <div className="mt-2 text-cyan-200/80">Time's up! Great job pushing through.</div>
      )}

      {!running && (
        <button
          onClick={onReset}
          className="mt-2 inline-flex items-center justify-center rounded-md border border-cyan-500/30 px-3 py-1.5 text-sm text-cyan-200 transition hover:border-cyan-300/70 hover:bg-cyan-400/5"
        >
          Reset
        </button>
      )}
    </div>
  );
}
