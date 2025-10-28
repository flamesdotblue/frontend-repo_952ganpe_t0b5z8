import React, { useState } from 'react';

export default function DurationSetter({ onStart, disabled }) {
  const [hours, setHours] = useState(6);
  const [minutes, setMinutes] = useState(0);

  const setPreset = (h) => {
    setHours(h);
    setMinutes(0);
  };

  const handleStart = () => {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const totalMs = (h * 60 + m) * 60 * 1000;
    if (totalMs <= 0) return;
    onStart(totalMs);
  };

  return (
    <div className={`mx-auto w-full max-w-3xl rounded-2xl border border-[#D4AF37]/30 bg-black/60 p-5 shadow-[0_0_30px_rgba(212,175,55,0.12)] backdrop-blur `}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-1 flex-col gap-3">
          <label className="text-xs uppercase tracking-wider text-[#F5DEB3]/80">Set Duration</label>
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#D4AF37]/80">Hours</div>
              <input
                type="number"
                min="0"
                max="72"
                value={hours}
                onChange={(e) => setHours(Math.max(0, Math.min(72, Number(e.target.value))))}
                className="mt-1 w-full rounded-lg border border-[#D4AF37]/30 bg-[#0a0a0a] px-3 py-2 text-[#F3F4F6] outline-none ring-0 transition focus:border-[#D4AF37]/60 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.25)]"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#D4AF37]/80">Minutes</div>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                className="mt-1 w-full rounded-lg border border-[#D4AF37]/30 bg-[#0a0a0a] px-3 py-2 text-[#F3F4F6] outline-none ring-0 transition focus:border-[#D4AF37]/60 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.25)]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreset(4)}
              className="rounded-md border border-[#D4AF37]/30 px-3 py-1.5 text-sm text-[#F3F4F6] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
            >
              4h
            </button>
            <button
              type="button"
              onClick={() => setPreset(6)}
              className="rounded-md border border-[#D4AF37]/30 px-3 py-1.5 text-sm text-[#F3F4F6] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
            >
              6h
            </button>
            <button
              type="button"
              onClick={() => setPreset(12)}
              className="rounded-md border border-[#D4AF37]/30 px-3 py-1.5 text-sm text-[#F3F4F6] transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10"
            >
              12h
            </button>
          </div>

          <button
            type="button"
            onClick={handleStart}
            disabled={disabled}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#E6C04F] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Start Timer
            <span className="pointer-events-none inline-block translate-x-0 transition group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
