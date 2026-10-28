import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, type Result } from "../data/player";

const RESULT_STYLE: Record<string, { bg: string; color: string; border?: string }> = {
  Winner:          { bg: "rgba(212,160,23,1)",    color: "#141210" },
  "1st Runner Up": { bg: "rgba(200,200,200,.12)",  color: "#d1d5db", border: "1px solid rgba(200,200,200,.25)" },
  "2nd Runner Up": { bg: "rgba(146,64,14,.25)",    color: "#fcd34d", border: "1px solid rgba(146,64,14,.4)" },
  "Gold Medalist": { bg: "rgba(212,160,23,1)",    color: "#141210" },
  "Silver Medalist": { bg: "rgba(180,180,180,.18)", color: "#d1d5db" },
  "Fourth Position": { bg: "rgba(21,45,92,.6)", color: "var(--muted)" },
  "Fifth Position": { bg: "rgba(21,45,92,.6)", color: "var(--muted)" },
  "Seventh Position": { bg: "rgba(21,45,92,.6)", color: "var(--muted)" },
};

const years = [...new Set(ACHIEVEMENTS.map((a) => a.year))].sort((a, b) => b - a);

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Achievements() {
  const [activeYear, setActiveYear] = useState<number | "all">("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { ref, inView } = useInView();

  const filtered = activeYear === "all"
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter((a) => a.year === activeYear);

  const wins = ACHIEVEMENTS.filter((a) => a.result === "Winner" || a.result === "Gold Medalist").length;

  return (
    <section id="achievements" style={{ background: "var(--surface)" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs tracking-[.3em] uppercase" style={{ color: "var(--gold)" }}>Achievements</span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <h2
            className="text-4xl sm:text-5xl font-black leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
          >
            TOURNAMENT<br />
            <span className="gold-shimmer">RECORD</span>
          </h2>
          <div className="text-right">
            <div className="text-4xl font-black" style={{ fontFamily: "var(--font-display)", color: "var(--gold)" }}>
              {wins}
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              Championship wins
            </div>
          </div>
        </div>

        {/* Year filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveYear("all")}
            className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200"
            style={{
              background: activeYear === "all" ? "var(--gold)" : "transparent",
              color: activeYear === "all" ? "#141210" : "var(--muted)",
              border: "1px solid " + (activeYear === "all" ? "var(--gold)" : "var(--border)"),
              borderRadius: "var(--radius)",
            }}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                background: activeYear === y ? "var(--gold)" : "transparent",
                color: activeYear === y ? "#141210" : "var(--muted)",
                border: "1px solid " + (activeYear === y ? "var(--gold)" : "var(--border)"),
                borderRadius: "var(--radius)",
              }}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Achievement list */}
        <div ref={ref} className="space-y-2">
          {filtered.map((a, i) => {
            const rs = RESULT_STYLE[a.result];
            return (
              <div
                key={`${a.year}-${i}`}
                className="achievement-card group flex items-center gap-4 p-4"
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(12px)",
                  transition: `opacity .5s ease ${Math.min(i, 12) * .04}s, transform .5s ease ${Math.min(i, 12) * .04}s, border-color .3s ease`,
                }}
              >
                {/* Year */}
                <div
                  className="w-12 text-right text-xs font-black flex-shrink-0 tabular-nums"
                  style={{ fontFamily: "var(--font-display)", color: "rgba(212,160,23,.35)", fontSize: "1rem" }}
                >
                  {a.year}
                </div>

                {/* Divider */}
                <div className="w-px h-8 flex-shrink-0" style={{ background: "var(--border)" }} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium" style={{ color: "var(--cream)" }}>
                      {a.event}
                    </p>
                    {a.featured && (
                      <span
                        className="text-xs px-1.5 py-0.5"
                        style={{ background: "var(--gold-dim)", color: "var(--gold)", borderRadius: "2px" }}
                      >
                        ★
                      </span>
                    )}
                  </div>
                  {a.location && (
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      {a.location}
                    </p>
                  )}
                </div>

                {/* Photo thumb */}
                {a.photo && (
                  <button
                    onClick={() => setLightbox(a.photo!)}
                    className="w-10 h-10 overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-110"
                    style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
                    aria-label={`View photo from ${a.event}`}
                  >
                    <img src={a.photo} alt={a.event} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                )}

                {/* Result badge */}
                <div
                  className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 flex-shrink-0"
                  style={{
                    background: rs.bg,
                    color: rs.color,
                    border: rs.border ?? "none",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {a.result}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(20,18,16,.97)", backdropFilter: "blur(10px)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Achievement photo"
            className="max-w-full max-h-[85vh] object-contain"
            style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
          />
          <button
            className="absolute top-5 right-7 text-3xl font-light transition-colors"
            style={{ color: "var(--gold)" }}
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
