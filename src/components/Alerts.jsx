import React from 'react';

export default function Alerts({ messages }) {
  if (!messages.length) return null;
  return (
    <div className="space-y-3">
      {messages.map((m, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-[#E6C04F]/40 bg-black/60 text-[#F5DEB3] p-3"
        >
          <span className="text-sm">{m}</span>
        </div>
      ))}
    </div>
  );
}
