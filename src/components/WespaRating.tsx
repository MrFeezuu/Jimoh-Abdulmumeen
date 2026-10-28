import { PLAYER } from "../data/player";
import { useWespaRating } from "./WespaRatingContext";

export default function WespaRating({ compact = false }: { compact?: boolean }) {
  const { rating, rank, fetchedAt, live } = useWespaRating();
  const checked = fetchedAt
    ? new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit" }).format(new Date(fetchedAt))
    : "connecting";

  if (compact) {
    return (
      <a
        href={PLAYER.social.wespa}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-300"
        style={{
          border: "1px solid var(--border)",
          color: "var(--gold)",
          borderRadius: "var(--radius)",
          background: "var(--gold-dim)",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(212,160,23,.25)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-dim)"; }}
        title="View on WESPA rankings"
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: live ? "#4ade80" : "var(--gold)", animation: "pulseGold 2s ease-in-out infinite" }}
        />
        <span>WESPA</span>
        <span className="font-black" style={{ color: "var(--cream)" }}>{rating}</span>
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </a>
    );
  }

  return (
    <a
      href={PLAYER.social.wespa}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-2 p-5 transition-all duration-300"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        background: "var(--surface)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,160,23,.5)";
        el.style.background = "var(--surface2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.background = "var(--surface)";
      }}
      title="View full WESPA profile"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: live ? "#4ade80" : "var(--gold)", animation: "pulseGold 2s ease-in-out infinite" }}
          />
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            {live ? "WESPA Live Rating" : "WESPA Rating"}
          </span>
        </div>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M2 10L10 2M10 2H5M10 2V7" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Rating */}
      <div
        className="text-5xl font-black leading-none gold-shimmer"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {rating}
      </div>

      {/* Subtext */}
      <div className="text-xs" style={{ color: "var(--muted)" }}>
        {rank ? `World No. ${rank}` : PLAYER.ranking} · Nigeria
      </div>

      {/* Last checked */}
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-1 h-1 rounded-full" style={{ background: "var(--muted)" }} />
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {live ? `Synced ${checked}` : "Live sync reconnecting · verified fallback"}
        </span>
      </div>

      <div
        className="text-xs font-semibold tracking-widest uppercase mt-1 flex items-center gap-1"
        style={{ color: "var(--gold)" }}
      >
        View full profile
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </a>
  );
}
