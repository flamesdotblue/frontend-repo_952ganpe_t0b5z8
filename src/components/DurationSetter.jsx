import React, { useState } from 'react';

export default function DurationSetter({ onStart, onReset, onStop, running }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const start = () => {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const ms = (h * 60 + m) * 60 * 1000;
    if (ms > 0) onStart(ms);
  };

  return (
    <div className="w-full rounded-xl border border-[#D4AF37]/30 bg-black/60 backdrop-blur-sm p-5 md:p-6">
      <h3 className="text-[#F5DEB3] font-semibold text-lg mb-4">Set Duration</h3>
      <div className="grid grid-cols-2 gap-4 items-end md:grid-cols-4">
        <div>
          <label className="block text-sm text-[#F5DEB3]/80 mb-1">Hours</label>
          <input
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-lg bg-black/70 border border-[#D4AF37]/30 text-[#F5DEB3] px-3 py-2 outline-none focus:border-[#E6C04F]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F5DEB3]/80 mb-1">Minutes</label>
          <input
            type="number"
            min="0"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full rounded-lg bg-black/70 border border-[#D4AF37]/30 text-[#F5DEB3] px-3 py-2 outline-none focus:border-[#E6C04F]"
          />
        </div>
        <button
          onClick={start}
          className="col-span-2 md:col-span-1 h-10 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E6C04F] text-black font-semibold shadow hover:brightness-110 transition"
          disabled={running}
        >
          {running ? 'Running…' : 'Start'}
        </button>
        <div className="flex gap-3 col-span-2 md:col-span-1">
          <button
            onClick={onStop}
            className="flex-1 h-10 rounded-lg border border-[#D4AF37]/40 text-[#F5DEB3] hover:bg-white/5 transition"
          >
            Stop
          </button>
          <button
            onClick={onReset}
            className="flex-1 h-10 rounded-lg border border-[#D4AF37]/40 text-[#F5DEB3] hover:bg-white/5 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
