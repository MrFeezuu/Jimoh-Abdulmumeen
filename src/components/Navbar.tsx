import { useState, useEffect } from "react";
import LiveClock from "./LiveClock";
import WespaRating from "./WespaRating";
import { PLAYER } from "../data/player";
import { useWespaRating } from "./WespaRatingContext";

const NAV_LINKS = [
  { label: "Home",         id: "home" },
  { label: "About",        id: "about" },
  { label: "Achievements", id: "achievements" },
  { label: "Profile",      id: "profile" },
  { label: "Gallery",      id: "gallery" },
  { label: "Contact",      id: "contact" },
];

const TILE_VALUES: Record<string, number> = { J: 8, A: 1 };

function LogoTile({ letter, value }: { letter: string; value: number }) {
  return (
    <div className="scrabble-tile w-8 h-8 flex items-center justify-center text-sm font-black" style={{ fontSize: "1rem" }}>
      {letter}
      <span className="tile-value">{value}</span>
    </div>
  );
}

export default function Navbar({ activeSection }: { activeSection: string }) {
  const { rating } = useWespaRating();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(20,18,16,.97)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Back to top"
          >
            <div className="flex gap-1">
              <LogoTile letter="J" value={TILE_VALUES.J} />
              <LogoTile letter="A" value={TILE_VALUES.A} />
            </div>
            <span
              className="text-xs tracking-[.18em] uppercase hidden xl:block"
              style={{ color: "var(--muted)" }}
            >
              Jimoh Abdulmumin
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  className={`nav-link ${activeSection === l.id ? "active" : ""}`}
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side: clock + rating */}
          <div className="hidden md:flex items-center gap-4">
            <LiveClock />
            <div className="w-px h-8" style={{ background: "var(--border)" }} />
            <WespaRating compact />
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: "var(--cream)",
                  transform:
                    menuOpen && i === 0 ? "translateY(9px) rotate(45deg)"
                    : menuOpen && i === 1 ? "scaleX(0)"
                    : menuOpen && i === 2 ? "translateY(-9px) rotate(-45deg)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 lg:hidden flex flex-col justify-center items-center gap-10 transition-all duration-400"
        style={{
          background: "rgba(20,18,16,.98)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        {/* Clock in mobile menu */}
        <div className="mb-4">
          <LiveClock />
        </div>

        <ul className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                className="text-2xl font-light tracking-[.18em] uppercase transition-colors"
                style={{ color: activeSection === l.id ? "var(--gold)" : "var(--cream)", fontFamily: "var(--font-display)" }}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* WESPA chip in mobile menu */}
        <a
          href={PLAYER.social.wespa}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm mt-4"
          style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--gold)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--gold)", animation: "pulseGold 2s ease-in-out infinite" }}
          />
          WESPA Rating: <span style={{ color: "var(--cream)", fontWeight: 700 }}>{rating}</span>
        </a>
      </div>
    </>
  );
}
