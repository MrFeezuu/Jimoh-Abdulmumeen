import { useState } from "react";
import { GALLERY, type GalleryItem } from "../data/player";

const TAGS = ["All", "Tournament", "Competition", "Awards", "Travel"] as const;

export default function Gallery() {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = activeTag === "All"
    ? GALLERY
    : GALLERY.filter((g) => g.tag === activeTag);

  return (
    <section id="gallery" style={{ background: "var(--surface)" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs tracking-[.3em] uppercase" style={{ color: "var(--gold)" }}>Gallery</span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        <h2
          className="text-3xl sm:text-4xl font-black mb-10"
          style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
        >
          MOMENTS ON THE BOARD
        </h2>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                background: activeTag === tag ? "var(--gold)" : "transparent",
                color: activeTag === tag ? "#141210" : "var(--muted)",
                border: "1px solid " + (activeTag === tag ? "var(--gold)" : "var(--border)"),
                borderRadius: "var(--radius)",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {filtered.map((item, i) => (
            <button
              key={i}
              className="gallery-item relative overflow-hidden group text-left"
              style={{
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                aspectRatio: i % 5 === 0 ? "3/4" : i % 7 === 0 ? "4/3" : "1/1",
                background: "var(--surface2)",
              }}
              onClick={() => setLightbox(item)}
              aria-label={`View: ${item.caption}`}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="gallery-overlay absolute inset-0 flex flex-col justify-end p-3">
                <p className="text-xs leading-snug mb-1" style={{ color: "var(--cream)" }}>{item.caption}</p>
                <p className="text-xs" style={{ color: "var(--gold)" }}>{item.year}</p>
              </div>
              {/* tag chip */}
              <div
                className="absolute top-2 left-2 text-xs px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "var(--gold-dim)", color: "var(--gold)", borderRadius: "2px", backdropFilter: "blur(4px)" }}
              >
                {item.tag}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
          style={{ background: "rgba(20,18,16,.97)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.src}
            alt={lightbox.caption}
            className="max-w-full max-h-[80vh] object-contain"
            style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-4 text-center">
            <p className="text-sm" style={{ color: "var(--cream)" }}>{lightbox.caption}</p>
            <p className="text-xs mt-1" style={{ color: "var(--gold)" }}>{lightbox.year} · {lightbox.tag}</p>
          </div>
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
