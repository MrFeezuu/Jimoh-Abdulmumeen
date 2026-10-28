"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import ScrabbleBoard from "./ScrabbleBoard";
import Achievements from "./Achievements";
import ScrabbleProfile from "./ScrabbleProfile";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Footer from "./Footer";
import { WespaRatingProvider } from "./WespaRatingContext";

const SECTIONS = ["home", "about", "achievements", "profile", "gallery", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorBig, setCursorBig] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const isTouch = useRef(false);

  /* ── Active section on scroll ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.35) {
            setActiveSection(e.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ── Custom cursor (desktop only) ── */
  useEffect(() => {
    const onTouchStart = () => { isTouch.current = true; };
    window.addEventListener("touchstart", onTouchStart, { once: true });

    const onMove = (e: MouseEvent) => {
      if (isTouch.current) return;
      setCursor({ x: e.clientX, y: e.clientY });
    };

    const onImageEnter = () => { setCursorBig(true); setCursorText("VIEW"); };
    const onImageLeave = () => { setCursorBig(false); setCursorText(""); };
    const onBtnEnter = () => { setCursorBig(true); setCursorText(""); };
    const onBtnLeave = () => { setCursorBig(false); };

    document.addEventListener("mousemove", onMove);

    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      img.addEventListener("mouseenter", onImageEnter);
      img.addEventListener("mouseleave", onImageLeave);
    });

    const btns = document.querySelectorAll("button, a");
    btns.forEach((btn) => {
      btn.addEventListener("mouseenter", onBtnEnter);
      btn.addEventListener("mouseleave", onBtnLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      imgs.forEach((img) => {
        img.removeEventListener("mouseenter", onImageEnter);
        img.removeEventListener("mouseleave", onImageLeave);
      });
      btns.forEach((btn) => {
        btn.removeEventListener("mouseenter", onBtnEnter);
        btn.removeEventListener("mouseleave", onBtnLeave);
      });
    };
  }, []);

  return (
    <WespaRatingProvider>
      {/* Custom cursor */}
      <div
        className="cursor-dot pointer-events-none"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: cursorBig ? 56 : 10,
          height: cursorBig ? 56 : 10,
          background: cursorBig ? "rgba(212,160,23,.15)" : "var(--gold)",
          border: cursorBig ? "1.5px solid var(--gold)" : "none",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cursorText && (
          <span style={{ color: "var(--gold)", fontSize: ".55rem", letterSpacing: ".15em", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            {cursorText}
          </span>
        )}
      </div>

      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <ScrabbleBoard />
        <Achievements />
        <ScrabbleProfile />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </WespaRatingProvider>
  );
}
