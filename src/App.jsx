import React, { useEffect, useMemo, useRef, useState } from 'react';
import SplineHero from './components/SplineHero';
import DurationSetter from './components/DurationSetter';
import TimerDisplay from './components/TimerDisplay';
import Alerts from './components/Alerts';

function useTimer() {
  const [running, setRunning] = useState(false);
  const [totalMs, setTotalMs] = useState(0);
  const [endTime, setEndTime] = useState(null); // timestamp in ms
  const [remainingMs, setRemainingMs] = useState(0);
  const [messages, setMessages] = useState([]);
  const lastHourRef = useRef(null);
  const intervalRef = useRef(null);

  const clearTicker = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = () => {
    if (!endTime) return;
    const now = Date.now();
    const remain = Math.max(0, endTime - now);
    setRemainingMs(remain);

    // Hourly markers + final hour emphasis
    if (totalMs > 0 && remain > 0) {
      const hoursLeft = Math.floor(remain / 3600000); // 0,1,2...
      if (lastHourRef.current === null) {
        lastHourRef.current = hoursLeft;
      } else if (hoursLeft !== lastHourRef.current) {
        lastHourRef.current = hoursLeft;
        if (hoursLeft > 0) {
          setMessages((prev) => [
            `⏰ Hour checkpoint reached. ${hoursLeft} hour${hoursLeft === 1 ? '' : 's'} remaining.`,
            ...prev,
          ]);
        }
      }

      if (remain <= 3600000 && !messages.some((m) => m.includes('Final hour'))) {
        setMessages((prev) => [
          '⚡ Final hour! Time to polish and submit.',
          ...prev,
        ]);
      }
    }

    if (remain === 0 && running) {
      setRunning(false);
      clearTicker();
      setMessages((prev) => ['✅ Time is up! Great work, team.', ...prev]);
    }
  };

  const startMs = (ms) => {
    clearTicker();
    const end = Date.now() + ms;
    setTotalMs(ms);
    setEndTime(end);
    setRemainingMs(ms);
    setRunning(true);
    lastHourRef.current = Math.floor(ms / 3600000);
    intervalRef.current = setInterval(tick, 1000);
  };

  const stop = () => {
    if (!running) return;
    clearTicker();
    const now = Date.now();
    if (endTime) {
      const remain = Math.max(0, endTime - now);
      setRemainingMs(remain);
    }
    setRunning(false);
  };

  const reset = () => {
    clearTicker();
    setRunning(false);
    setTotalMs(0);
    setEndTime(null);
    setRemainingMs(0);
    lastHourRef.current = null;
  };

  useEffect(() => {
    if (running && !intervalRef.current) {
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => clearTicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, endTime]);

  // Expose console API
  useEffect(() => {
    window.hackTimer = {
      stop,
      reset,
      startMs: (ms) => startMs(Number(ms) || 0),
      startHours: (h) => startMs((Number(h) || 0) * 3600000),
      status: () => ({ running, totalMs, remainingMs, endTime }),
    };
  }, [running, totalMs, remainingMs, endTime]);

  return {
    running,
    totalMs,
    remainingMs,
    messages,
    startMs,
    stop,
    reset,
    setMessages,
  };
}

export default function App() {
  const {
    running,
    totalMs,
    remainingMs,
    messages,
    startMs,
    stop,
    reset,
    setMessages,
  } = useTimer();

  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => document.body.classList.remove('bg-black');
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#F5DEB3]">
      <SplineHero />

      <main className="container mx-auto px-6 -mt-16 md:-mt-24 relative z-10 space-y-6 pb-16">
        <TimerDisplay remainingMs={remainingMs} totalMs={totalMs} running={running} />

        <DurationSetter
          running={running}
          onStart={(ms) => {
            setMessages([]);
            startMs(ms);
          }}
          onStop={stop}
          onReset={() => {
            reset();
            setMessages([]);
          }}
        />

        <section className="rounded-xl border border-[#D4AF37]/30 bg-black/60 backdrop-blur-sm p-5">
          <h3 className="text-[#F5DEB3] font-semibold text-lg mb-4">Alerts</h3>
          <Alerts messages={messages} />
        </section>
      </main>

      <footer className="border-t border-[#D4AF37]/20 bg-black/80">
        <div className="container mx-auto px-6 py-6 text-sm text-[#F5DEB3]/70">
          Pro tip: open the devtools console and try window.hackTimer.startHours(4)
        </div>
      </footer>
    </div>
  );
}
