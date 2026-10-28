import { PLAYER } from "../data/player";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">

          {/* Name + tagline */}
          <div>
            <div className="flex gap-1.5 mb-3">
              {["J","A"].map((l) => (
                <div key={l} className="scrabble-tile w-8 h-8 flex items-center justify-center text-sm font-black">
                  {l}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--cream)" }}>{PLAYER.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Scrabble Player · Nigeria</p>
            <p className="text-xs mt-1 italic" style={{ color: "var(--muted)", fontFamily: "var(--font-display)" }}>
              Words. Strategy. Competition.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Navigate</p>
            <ul className="space-y-2">
              {["home","about","achievements","profile","gallery","contact"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-xs tracking-wider uppercase capitalize transition-colors"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Connect</p>
            <ul className="space-y-2">
              <li>
                <a href={PLAYER.social.instagram} target="_blank" rel="noreferrer"
                  className="text-xs tracking-wider uppercase transition-colors"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href={PLAYER.social.facebook} target="_blank" rel="noreferrer"
                  className="text-xs tracking-wider uppercase transition-colors"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a href={PLAYER.social.wespa} target="_blank" rel="noreferrer"
                  className="text-xs tracking-wider uppercase transition-colors"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  WESPA Rankings
                </a>
              </li>
              <li>
                <a href={PLAYER.social.whatsapp} target="_blank" rel="noreferrer"
                  className="text-xs tracking-wider uppercase transition-colors"
                  style={{ color: "var(--muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {year} Jimoh Abdulmumin · All rights reserved
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            15 years · still learning · still hungry
          </p>
        </div>
      </div>
    </footer>
  );
}
