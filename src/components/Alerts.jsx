import React from 'react';

export default function Alerts({ alerts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 mx-auto flex w-full max-w-3xl flex-col items-center gap-2 px-4">
      {alerts.map((a) => (
        <div
          key={a.id}
          className={`pointer-events-auto w-full rounded-xl border px-4 py-3 text-sm shadow-lg transition-all duration-500 ${
            a.type === 'warning'
              ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-100'
              : a.type === 'success'
              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
              : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100'
          } animate-[fadeIn_.2s_ease-out]`}
          onClick={() => onDismiss(a.id)}
        >
          {a.message}
        </div>
      ))}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
