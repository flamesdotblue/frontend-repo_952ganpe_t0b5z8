import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SplineHero from './components/SplineHero';
import DurationSetter from './components/DurationSetter';
import TimerDisplay from './components/TimerDisplay';
import Alerts from './components/Alerts';

const LS_KEYS = {
  start: 'ht_start',
  duration: 'ht_duration_ms',
  running: 'ht_running',
  lastHour: 'ht_lastNotifiedHour',
  finalWarned: 'ht_finalHourWarned',
};

function readNumber(key, def = 0) {
  const v = localStorage.getItem(key);
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : def;
}

export default function App() {
  const [running, setRunning] = useState(() => localStorage.getItem(LS_KEYS.running) === '1');
  const [startTs, setStartTs] = useState(() => readNumber(LS_KEYS.start, 0));
  const [durationMs, setDurationMs] = useState(() => readNumber(LS_KEYS.duration, 0));
  const [lastHourNotified, setLastHourNotified] = useState(() => readNumber(LS_KEYS.lastHour, 0));
  const [finalHourWarned, setFinalHourWarned] = useState(() => localStorage.getItem(LS_KEYS.finalWarned) === '1');
  const [now, setNow] = useState(Date.now());
  const [alerts, setAlerts] = useState([]);
  const intervalRef = useRef(null);

  const remainingMs = useMemo(() => {
    if (!running || !startTs || !durationMs) return Math.max(0, durationMs);
    const end = startTs + durationMs;
    return Math.max(0, end - now);
  }, [running, startTs, durationMs, now]);

  const elapsedMs = useMemo(() => {
    if (!running || !startTs) return 0;
    return Math.max(0, now - startTs);
  }, [running, startTs, now]);

  const pushAlert = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setAlerts((prev) => [...prev, { id, message, type }]);
    // Auto-dismiss after ~3.5s
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 3600);
  }, []);

  // Tick interval
  useEffect(() => {
    if (running) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setNow(Date.now());
        }, 500);
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  // Hourly notifications and final-hour warning
  useEffect(() => {
    if (!running) return;

    // Hourly alerts
    const hoursElapsed = Math.floor(elapsedMs / 3600000);
    if (hoursElapsed >= 1 && hoursElapsed > lastHourNotified) {
      const remainingHours = Math.max(0, Math.ceil(remainingMs / 3600000));
      pushAlert(`${hoursElapsed} hour${hoursElapsed > 1 ? 's' : ''} has passed! ${remainingHours} hour${remainingHours !== 1 ? 's' : ''} remaining.`, 'success');
      setLastHourNotified(hoursElapsed);
      localStorage.setItem(LS_KEYS.lastHour, String(hoursElapsed));
    }

    // Final hour warning (trigger once when crossing under 1 hour remaining)
    if (!finalHourWarned && remainingMs <= 3600000 && remainingMs > 0) {
      pushAlert('⚠️ Warning: Only 1 hour remaining!', 'warning');
      setFinalHourWarned(true);
      localStorage.setItem(LS_KEYS.finalWarned, '1');
    }

    // Completion
    if (remainingMs === 0 && running) {
      pushAlert("Time's up!", 'warning');
      setRunning(false);
      localStorage.setItem(LS_KEYS.running, '0');
    }
  }, [elapsedMs, remainingMs, running, lastHourNotified, finalHourWarned, pushAlert]);

  // Resume state on load
  useEffect(() => {
    const wasRunning = localStorage.getItem(LS_KEYS.running) === '1';
    if (wasRunning) {
      setRunning(true);
      setStartTs(readNumber(LS_KEYS.start, 0));
      setDurationMs(readNumber(LS_KEYS.duration, 0));
      setLastHourNotified(readNumber(LS_KEYS.lastHour, 0));
      setFinalHourWarned(localStorage.getItem(LS_KEYS.finalWarned) === '1');
      setNow(Date.now());
    }
  }, []);

  const handleStart = useCallback((totalMs) => {
    const start = Date.now();
    setDurationMs(totalMs);
    setStartTs(start);
    setRunning(true);
    setLastHourNotified(0);
    setFinalHourWarned(false);

    localStorage.setItem(LS_KEYS.duration, String(totalMs));
    localStorage.setItem(LS_KEYS.start, String(start));
    localStorage.setItem(LS_KEYS.running, '1');
    localStorage.setItem(LS_KEYS.lastHour, '0');
    localStorage.setItem(LS_KEYS.finalWarned, '0');

    pushAlert('Timer started. Good luck!', 'success');
  }, [pushAlert]);

  const handleReset = useCallback(() => {
    setRunning(false);
    setStartTs(0);
    setDurationMs(0);
    setLastHourNotified(0);
    setFinalHourWarned(false);
    localStorage.removeItem(LS_KEYS.start);
    localStorage.removeItem(LS_KEYS.duration);
    localStorage.setItem(LS_KEYS.running, '0');
    localStorage.setItem(LS_KEYS.lastHour, '0');
    localStorage.setItem(LS_KEYS.finalWarned, '0');
    pushAlert('Timer reset.', 'info');
  }, [pushAlert]);

  // Console control API
  const stopTimer = useCallback(() => {
    setRunning(false);
    localStorage.setItem(LS_KEYS.running, '0');
    pushAlert('Timer paused.', 'info');
  }, [pushAlert]);

  const startMs = useCallback((ms) => {
    const total = Number(ms);
    if (!Number.isFinite(total) || total <= 0) {
      pushAlert('Start failed: provide a positive millisecond value.', 'warning');
      return;
    }
    handleStart(total);
  }, [handleStart, pushAlert]);

  const startHours = useCallback((h = 1) => {
    const hours = Number(h);
    if (!Number.isFinite(hours) || hours <= 0) {
      pushAlert('Start failed: provide a positive hour value.', 'warning');
      return;
    }
    handleStart(Math.round(hours * 3600000));
  }, [handleStart, pushAlert]);

  const status = useCallback(() => ({
    running,
    startTs,
    durationMs,
    remainingMs,
    elapsedMs,
    lastHourNotified,
    finalHourWarned,
  }), [running, startTs, durationMs, remainingMs, elapsedMs, lastHourNotified, finalHourWarned]);

  useEffect(() => {
    // Expose simple console API: window.hackTimer
    if (typeof window !== 'undefined') {
      window.hackTimer = {
        stop: stopTimer,
        reset: handleReset,
        startMs,
        startHours,
        status,
      };
    }
    return () => {
      if (typeof window !== 'undefined' && window.hackTimer) {
        delete window.hackTimer;
      }
    };
  }, [stopTimer, handleReset, startMs, startHours, status]);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-cyan-50">
      <SplineHero />

      <main className="mx-auto -mt-16 flex max-w-6xl flex-col gap-6 px-4 pb-20">
        {!running && (
          <DurationSetter onStart={handleStart} disabled={running} />
        )}

        <TimerDisplay
          remainingMs={remainingMs}
          totalMs={durationMs}
          running={running}
          onReset={handleReset}
        />

        <section className="mx-auto w-full max-w-3xl rounded-xl border border-cyan-400/10 bg-[#0b1033]/40 p-4 text-xs text-cyan-200/70">
          • Hourly notifications will appear here as subtle toasts. • Your timer automatically resumes after refresh or system restart. • Keep this tab open for smoothest visuals; timing stays accurate regardless.
        </section>
      </main>

      <Alerts alerts={alerts} onDismiss={(id) => setAlerts((prev) => prev.filter((a) => a.id !== id))} />
    </div>
  );
}
