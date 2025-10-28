import React from 'react';

function formatTime(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, '0'))
    .join(':');
}

export default function TimerDisplay({ remainingMs, totalMs, running }) {
  const progress = totalMs > 0 ? Math.max(0, Math.min(1, 1 - remainingMs / totalMs)) : 0;
  const percent = Math.round(progress * 100);
  return (
    <div className="w-full rounded-xl border border-[#D4AF37]/30 bg-black/60 backdrop-blur-sm p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-[#F5DEB3] font-semibold text-lg">Time Remaining</h3>
        <span className="text-sm text-[#F5DEB3]/70">{running ? 'Running' : 'Stopped'}</span>
      </div>
      <div className="text-5xl md:text-6xl font-mono font-bold text-[#E6C04F] drop-shadow-[0_0_12px_rgba(230,192,79,0.25)]">
        {formatTime(remainingMs)}
      </div>
      <div className="mt-6">
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E6C04F] to-[#D4AF37] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-[#F5DEB3]/70">{percent}%</div>
      </div>
    </div>
  );
}
