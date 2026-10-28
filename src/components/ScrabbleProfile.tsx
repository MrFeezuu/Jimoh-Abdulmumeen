import { useEffect, useRef, useState } from "react";
import { PLAYER } from "../data/player";
import LiveClock from "./LiveClock";
import { useWespaRating } from "./WespaRatingContext";

function useInView(threshold = 0.15) {
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

function useCounter(target: number, duration: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, active]);
  return val;
}

function Counter({ target, suffix = "", label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const val = useCounter(target, 1600, active);
  return (
    <div className="text-center p-6" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--surface)" }}>
      <div className="text-3xl font-black" style={{ fontFamily: "var(--font-display)", color: "var(--gold-lt)" }}>
        {val}{suffix}
      </div>
      <div className="text-xs tracking-widest uppercase mt-2" style={{ color: "var(--muted)" }}>{label}</div>
    </div>
  );
}

export default function ScrabbleProfile() {
  const { ref, inView } = useInView(0.2);
  const { rating } = useWespaRating();
  const ratingVal = useCounter(rating, 2000, inView);

  return (
    <section id="profile" style={{ background: "var(--bg)" }} className="py-24 relative overflow-hidden">
      {/* board grid */}
      <div className="board-grid-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Live clock bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 p-4"
          style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--surface)" }}
        >
          <div>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold)" }}>
              Nigeria Time
            </p>
            <LiveClock />
          </div>
          <div className="hidden sm:block w-px h-12" style={{ background: "var(--border)" }} />
          <div className="text-right">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>
              Active since
            </p>
            <p className="text-2xl font-black" style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}>
              2009
            </p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>15+ competitive years</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs tracking-[.3em] uppercase" style={{ color: "var(--gold)" }}>Scrabble Profile</span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        <div ref={ref} className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start">

          {/* Left: big rating */}
          <div>
            <p className="text-xs tracking-[.3em] uppercase mb-4" style={{ color: "var(--muted)" }}>
              Current WESPA Rating
            </p>
            <div
              className="leading-none mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(6rem, 18vw, 14rem)",
                color: "transparent",
                WebkitTextStroke: "2px var(--gold)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(40px)",
                transition: "all .8s ease",
              }}
              aria-label={`WESPA Rating: ${rating}`}
            >
              {ratingVal}
            </div>
            <p className="text-sm mb-8" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
              Official WESPA (World English-language Scrabble Players Association) rating.
              Rankings are maintained on the WESPA global database.
            </p>

            {/* Titles row */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: "WESPA", badge: "International Master" },
                { label: "PANASA", badge: "Scrabble Expert" },
                { label: "NSF", badge: "Gold Medallist" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="px-4 py-2"
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--surface)" }}
                >
                  <div className="text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>{t.label}</div>
                  <div className="text-sm font-medium" style={{ color: "var(--cream)" }}>{t.badge}</div>
                </div>
              ))}
            </div>

            <a
              href={PLAYER.social.wespa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
              style={{
                background: "var(--gold)",
                color: "#141210",
                borderRadius: "var(--radius)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-lt)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
            >
              View Official Scrabble Profile
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 w-full lg:min-w-[280px] lg:max-w-[320px]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(30px)",
              transition: "all .8s ease .2s",
            }}
          >
            <Counter target={PLAYER.gamesPlayed} suffix="+"  label="Games Played"    active={inView} />
            <Counter target={PLAYER.wins}         suffix="+"  label="Games Won"       active={inView} />
            <Counter target={68}                  suffix="%"  label="Win Rate"        active={inView} />
            <Counter target={PLAYER.tournamentWins} suffix="+" label="Tournament Wins" active={inView} />
            <Counter target={PLAYER.tournaments}  suffix="+"  label="Events Entered"  active={inView} />
            <Counter target={3}                   suffix=""   label="Gold Medals"     active={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}
