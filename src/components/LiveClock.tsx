import { useEffect, useState } from "react";

type ClockMode = "analog" | "digital";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function AnalogClock({ h, m, s }: { h: number; m: number; s: number }) {
  const secDeg  = s * 6;
  const minDeg  = m * 6 + s * 0.1;
  const hourDeg = ((h % 12) / 12) * 360 + m * 0.5;

  return (
    <svg viewBox="0 0 100 100" width="64" height="64" aria-hidden="true">
      {/* Face */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(212,160,23,.25)" strokeWidth="1.5"/>
      {/* Hour marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x1 = 50 + 40 * Math.cos(angle);
        const y1 = 50 + 40 * Math.sin(angle);
        const x2 = 50 + 44 * Math.cos(angle);
        const y2 = 50 + 44 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212,160,23,.5)" strokeWidth="1.5" strokeLinecap="round"/>;
      })}
      {/* Hour hand */}
      <line
        x1="50" y1="50"
        x2={50 + 26 * Math.cos((hourDeg - 90) * Math.PI / 180)}
        y2={50 + 26 * Math.sin((hourDeg - 90) * Math.PI / 180)}
        stroke="var(--cream)" strokeWidth="3" strokeLinecap="round"
        style={{ transition: "all .3s ease" }}
      />
      {/* Minute hand */}
      <line
        x1="50" y1="50"
        x2={50 + 35 * Math.cos((minDeg - 90) * Math.PI / 180)}
        y2={50 + 35 * Math.sin((minDeg - 90) * Math.PI / 180)}
        stroke="var(--cream)" strokeWidth="2" strokeLinecap="round"
        style={{ transition: "all .3s ease" }}
      />
      {/* Second hand */}
      <line
        x1="50" y1="50"
        x2={50 + 38 * Math.cos((secDeg - 90) * Math.PI / 180)}
        y2={50 + 38 * Math.sin((secDeg - 90) * Math.PI / 180)}
        stroke="var(--gold)" strokeWidth="1" strokeLinecap="round"
      />
      {/* Centre dot */}
      <circle cx="50" cy="50" r="3" fill="var(--gold)"/>
    </svg>
  );
}

export default function LiveClock() {
  // Keep the server render and the browser's first render identical. Reading
  // the current time during state initialization can cross a second boundary
  // before hydration and causes React to discard the server-rendered tree.
  const [now, setNow] = useState<Date | null>(null);
  const [mode, setMode] = useState<ClockMode>("digital");

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Nigeria time: WAT = UTC+1
  const wat = now ? new Date(now.getTime() + 60 * 60 * 1000) : null;

  const h = wat?.getUTCHours() ?? 0;
  const m = wat?.getUTCMinutes() ?? 0;
  const s = wat?.getUTCSeconds() ?? 0;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dateStr = wat
    ? `${days[wat.getUTCDay()]}, ${months[wat.getUTCMonth()]} ${wat.getUTCDate()}`
    : "Nigeria time";

  return (
    <button
      onClick={() => setMode((v) => v === "digital" ? "analog" : "digital")}
      className="flex items-center gap-3 group"
      aria-label="Toggle clock mode"
      title="Click to toggle clock style"
    >
      {mode === "analog" && wat ? (
        <AnalogClock h={h} m={m} s={s} />
      ) : (
        <div className="text-right">
          <div
            className="font-black leading-none tabular-nums"
            style={{ fontFamily: "var(--font-display)", color: "var(--cream)", fontSize: "1.6rem" }}
          >
            {wat ? `${pad(h12)}:${pad(m)}:${pad(s)}` : "--:--:--"}
            {wat && <span className="text-xs ml-1" style={{ color: "var(--gold)" }}>{ampm}</span>}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {dateStr} · WAT
          </div>
        </div>
      )}

      {/* Live indicator */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--gold)",
              animation: "pulseGold 2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
            Live
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--muted)" }}>Nigeria</span>
      </div>
    </button>
  );
}
