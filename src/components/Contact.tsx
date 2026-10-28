import { PLAYER } from "../data/player";

const SOCIAL = [
  {
    platform: "Instagram",
    handle: "@abdulmumeen__jimoh",
    desc: "Tournament moments, training updates & behind the scenes",
    url: PLAYER.social.instagram,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    cta: "Follow",
  },
  {
    platform: "Facebook",
    handle: "Jimoh Abdulmumin",
    desc: "Scrabble journey, tournament updates & community engagement",
    url: PLAYER.social.facebook,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    cta: "Connect",
  },
  {
    platform: "WESPA Rankings",
    handle: "Official Rating",
    desc: "View official WESPA rating, game history & global ranking",
    url: PLAYER.social.wespa,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l2 2"/>
        <path d="M2 12h3M19 12h3M12 2v3M12 19v3"/>
      </svg>
    ),
    cta: "View Rating",
  },
  {
    platform: "WhatsApp",
    handle: PLAYER.contact.whatsapp,
    desc: "Direct contact for tournament enquiries, collaborations & media",
    url: PLAYER.social.whatsapp,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
    cta: "Message",
  },
];

export default function Contact() {
  return (
    <section id="contact" style={{ background: "var(--bg)" }} className="py-24 relative overflow-hidden">
      <div className="board-grid-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs tracking-[.3em] uppercase" style={{ color: "var(--gold)" }}>Contact</span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        <h2
          className="text-4xl sm:text-5xl font-black mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
        >
          FOLLOW THE JOURNEY
        </h2>
        <p className="text-sm mb-16 max-w-xl" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
          Whether you want to collaborate, discuss Scrabble strategy, or just follow the journey —
          connect with Jimoh across platforms.
        </p>

        {/* Social cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {SOCIAL.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 p-6 transition-all duration-300"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
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
            >
              <div style={{ color: "var(--gold)" }}>{s.icon}</div>
              <div>
                <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>
                  {s.platform}
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: "var(--cream)" }}>
                  {s.handle}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {s.desc}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium tracking-widest uppercase transition-colors duration-300"
                style={{ color: "var(--gold)" }}
              >
                {s.cta}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* LET'S CONNECT */}
        <div
          className="p-8 sm:p-12 text-center"
          style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--surface)" }}
        >
          <h3
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
          >
            {"LET'S CONNECT."}
          </h3>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            Available for tournament collaborations, media engagements, Scrabble coaching enquiries, and Scrabble community partnerships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={PLAYER.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
              style={{ background: "var(--gold)", color: "#141210", borderRadius: "var(--radius)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold-lt)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}
            >
              WhatsApp
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href={`mailto:${PLAYER.contact.email}?subject=Scrabble%20Portfolio%20Enquiry`}
              aria-label={`Send an email to ${PLAYER.contact.email}`}
              className="inline-flex max-w-full items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300"
              style={{ border: "1px solid var(--border)", color: "var(--cream)", borderRadius: "var(--radius)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 6.5h18v11H3zM3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="break-all">{PLAYER.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
