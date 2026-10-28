import { useEffect, useRef, useState } from "react";
import { PLAYER } from "../data/player";

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

function StatBlock({ target, suffix, label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const val = useCounter(target, 1400, active);
  return (
    <div className="text-center">
      <div
        className="text-4xl font-black"
        style={{ fontFamily: "var(--font-display)", color: "var(--gold-lt)" }}
      >
        {val}{suffix}
      </div>
      <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { ref: statsRef, inView: statsVisible } = useInView(0.3);
  const { ref: leftRef, inView: leftVisible } = useInView(0.2);
  const { ref: rightRef, inView: rightVisible } = useInView(0.2);

  return (
    <section id="about" style={{ background: "var(--surface)" }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs tracking-[.3em] uppercase" style={{ color: "var(--gold)" }}>
            About
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        {/* Split screen */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Photo */}
          <div
            ref={leftRef}
            className="reveal-left relative"
            style={{ opacity: leftVisible ? 1 : 0, transform: leftVisible ? "none" : "translateX(-40px)", transition: "all .8s ease" }}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
            >
              <img
                src={PLAYER.profilePhoto}
                alt="Jimoh Abdulmumin holding his Lagos Unified Scrabble Meet trophy"
                className="w-full object-cover"
                style={{ maxHeight: "520px", objectPosition: "center top" }}
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(20,18,16,.5) 0%, transparent 60%)" }}
              />
            </div>
            {/* Board lines decoration */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
                borderRadius: "var(--radius)",
              }}
            />
          </div>

          {/* Text */}
          <div
            ref={rightRef}
            style={{ opacity: rightVisible ? 1 : 0, transform: rightVisible ? "none" : "translateX(40px)", transition: "all .8s ease .1s" }}
          >
            <p className="text-xs tracking-[.3em] uppercase mb-3" style={{ color: "var(--gold)" }}>
              The Player
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
            >
              MORE THAN<br />A PLAYER.
            </h2>

            <div className="space-y-4" style={{ color: "var(--muted)", lineHeight: 1.85 }}>
              {PLAYER.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "WESPA International Master",
                "PANASA Scrabble Expert",
                "NSF Gold Medallist",
                "MSPL Champion",
              ].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1.5 text-xs tracking-wider uppercase"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--cream)",
                    borderRadius: "var(--radius)",
                    background: "var(--gold-dim)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Animated stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "3rem",
          }}
        >
          <StatBlock target={15}  suffix="+"  label="Years Playing"       active={statsVisible} />
          <StatBlock target={41}  suffix="+"  label="Tournaments"         active={statsVisible} />
          <StatBlock target={16}  suffix="+"  label="Championships Won"   active={statsVisible} />
          <StatBlock target={3}   suffix=""   label="National Gold Medals" active={statsVisible} />
        </div>
      </div>
    </section>
  );
}
