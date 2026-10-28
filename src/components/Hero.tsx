import { useEffect, useState } from "react";
import { PLAYER, TILE_VALUES } from "../data/player";
import WespaRating from "./WespaRating";
import { useWespaRating } from "./WespaRatingContext";

function HeroTile({
  letter, delay, animate, size = "lg",
}: {
  letter: string; delay: number; animate: boolean; size?: "sm" | "lg" | "xl";
}) {
  const val = TILE_VALUES[letter.toUpperCase()] ?? 0;
  const cls =
    size === "xl"
      ? "w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg xs:text-xl sm:text-2xl md:text-3xl"
      : size === "lg"
      ? "w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 text-sm xs:text-base sm:text-xl md:text-2xl"
      : "w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 text-xs xs:text-sm sm:text-base";

  return (
    <div
      className={`hero-tile scrabble-tile ${cls} flex items-center justify-center ${animate ? "animate" : ""}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: "forwards" }}
      aria-hidden="true"
    >
      {letter}
      {val > 0 && <span className="tile-value">{val}</span>}
    </div>
  );
}

export default function Hero() {
  const { rating } = useWespaRating();
  const [tilesIn, setTilesIn]   = useState(false);
  const [photoIn, setPhotoIn]   = useState(false);
  const [statsIn, setStatsIn]   = useState(false);
  const [ctaIn, setCtaIn]       = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setTilesIn(true),  200),
      setTimeout(() => setPhotoIn(true),  2000),
      setTimeout(() => setStatsIn(true),  2300),
      setTimeout(() => setCtaIn(true),    2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const first   = PLAYER.firstName.split("");
  const last    = PLAYER.lastName.split("");
  const lastBase = first.length * 0.11 + 0.15;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "var(--bg)" }}
      aria-label="Hero"
    >
      {/* Board grid background */}
      <div className="board-grid-bg absolute inset-0 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%", left: "45%", transform: "translate(-50%,-50%)",
          width: "70vw", height: "70vw",
          background: "radial-gradient(circle, rgba(212,160,23,.05) 0%, transparent 65%)",
        }}
      />

      {/* Decorative edge tiles — desktop only */}
      <div className="absolute top-20 left-4 hidden xl:flex gap-1 opacity-20 pointer-events-none" aria-hidden="true">
        {["W","O","R","D"].map((l, i) => (
          <div key={l} className="scrabble-tile w-7 h-7 flex items-center justify-center text-xs font-black" style={{ opacity: 1 - i * .18 }}>
            {l}<span className="tile-value" style={{ fontSize: ".32rem" }}>{TILE_VALUES[l]}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-36 right-4 hidden xl:flex flex-col gap-1 opacity-15 pointer-events-none" aria-hidden="true">
        {["S","C","O","R","E"].map((l) => (
          <div key={l} className="scrabble-tile w-7 h-7 flex items-center justify-center text-xs font-black">
            {l}<span className="tile-value" style={{ fontSize: ".32rem" }}>{TILE_VALUES[l]}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">

          {/* Grid: content left | photo right */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">

            {/* ── LEFT ── */}
            <div className="min-w-0">
              <p className="text-xs tracking-[.28em] uppercase mb-4 sm:mb-6" style={{ color: "var(--muted)" }}>
                Scrabble Player · Nigeria
              </p>

              {/* First name tiles */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
                {first.map((l, i) => (
                  <HeroTile key={i} letter={l} delay={i * 0.11} animate={tilesIn} size="xl" />
                ))}
              </div>

              {/* Last name tiles */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-6 sm:mb-8">
                {last.map((l, i) => (
                  <HeroTile key={i} letter={l} delay={lastBase + i * 0.09} animate={tilesIn} size="lg" />
                ))}
              </div>

              {/* Tagline */}
              <p
                className="text-xs sm:text-sm tracking-[.22em] uppercase mb-6 sm:mb-8 transition-all duration-700"
                style={{ color: "var(--gold)", opacity: statsIn ? 1 : 0, transform: statsIn ? "none" : "translateY(12px)" }}
              >
                {PLAYER.tagline}
              </p>

              {/* Stats row */}
              <div
                className="flex flex-wrap gap-3 mb-6 sm:mb-8 transition-all duration-700"
                style={{ opacity: statsIn ? 1 : 0, transform: statsIn ? "none" : "translateY(16px)", transitionDelay: ".1s" }}
              >
                {[
                  { label: "WESPA Rating",    value: rating },
                  { label: "Tournament Wins", value: PLAYER.tournamentWins },
                  { label: "Years Active",    value: PLAYER.yearsPlaying },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="px-3 py-2 sm:px-4 sm:py-3"
                    style={{ border: "1px solid var(--border)", background: "rgba(212,160,23,.05)", borderRadius: "var(--radius)" }}
                  >
                    <div className="text-xl sm:text-2xl font-black" style={{ fontFamily: "var(--font-display)", color: "var(--gold-lt)" }}>
                      {s.value}
                    </div>
                    <div className="text-xs tracking-wider uppercase mt-0.5" style={{ color: "var(--muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-3 sm:gap-4 transition-all duration-700"
                style={{ opacity: ctaIn ? 1 : 0, transform: ctaIn ? "none" : "translateY(16px)" }}
              >
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 sm:px-8 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                  style={{ background: "var(--gold)", color: "#141210", borderRadius: "var(--radius)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-lt)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
                >
                  Explore Profile
                </button>
                <a
                  href={PLAYER.social.wespa}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 sm:px-8 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
                  style={{ border: "1px solid var(--border)", color: "var(--cream)", borderRadius: "var(--radius)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  View Rating
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </a>
              </div>
            </div>

            {/* ── RIGHT: photo + WESPA card ── */}
            <div
              className="flex flex-col items-center lg:items-end gap-4 transition-all duration-1000"
              style={{ opacity: photoIn ? 1 : 0, transform: photoIn ? "none" : "translateX(40px)" }}
            >
              {/* Photo */}
              <div className="relative w-56 h-72 sm:w-68 sm:h-88 md:w-72 md:h-96 flex-shrink-0">
                <div
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-full h-full"
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ border: "1px solid rgba(212,160,23,.5)", borderRadius: "var(--radius)" }}
                >
                  <img
                    src={PLAYER.heroPhoto}
                    alt="Jimoh Abdulmumin in intense concentration during a Scrabble tournament"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(20,18,16,.55) 0%, transparent 50%)" }}
                  />
                </div>
                {/* WESPA badge */}
                <div
                  className="absolute -bottom-4 -left-4 px-3 py-1.5 sm:px-4 sm:py-2 z-10"
                  style={{ background: "var(--gold)", borderRadius: "var(--radius)", animation: photoIn ? "pulseGold 3s ease-in-out infinite" : "none" }}
                >
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "#141210" }}>
                    WESPA Int. Master
                  </div>
                </div>
              </div>

              {/* WESPA live rating card */}
              <div className="w-56 sm:w-64 md:w-72">
                <WespaRating />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative z-10 flex flex-col items-center pb-6 gap-2 transition-opacity duration-1000"
        style={{ opacity: ctaIn ? 1 : 0 }}
      >
        <span className="text-xs tracking-[.2em] uppercase" style={{ color: "var(--muted)" }}>Scroll</span>
        <div className="w-px h-8 sm:h-10" style={{ background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
      </div>
    </section>
  );
}
