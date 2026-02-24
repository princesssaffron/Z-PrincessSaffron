import { useState, useEffect, useRef } from "react";

const sections = [
  { title: "Who We Are",          number: "01", accent: "#C9A84C", desc: "Fruit of passion, tradition, and technological excellence. Launched by HeyRam Infrastructure to bridge the digital future with age-old agricultural heritage." },
  { title: "Our Essence",         number: "02", accent: "#D4AF37", desc: "Curators of a living legacy. From high Himalayan valleys to sun-kissed Spanish fields, we preserve a piece of heritage in every harvest." },
  { title: "Origin Sourcing",     number: "03", accent: "#B8960C", desc: "Traceability is a responsibility. Direct partnerships with farms in Kashmir, Iran, and Spain to ensure peak bloom potency." },
  { title: "Laboratory Tested",   number: "04", accent: "#C9A84C", desc: "Verified for purity, aroma profile, and color strength. Authenticity must be proven, not promised." },
  { title: "Crafted Experiences", number: "05", accent: "#D4AF37", desc: "Wellness. Celebration. Healing. Royalty. From sacred rituals to Michelin-starred kitchens, elevating moments that matter." },
  { title: "A Culture of Saffron",number: "06", accent: "#B8960C", desc: "Make luxury ethical. Make authenticity accessible. Redefining saffron from a commodity to a cherished craft." },
];

// 6-sided regular prism (hexagonal drum)
// Each panel is rotated by 60deg around Y axis, pushed out by the apothem
const COUNT = 6;
const PANEL_W = 320;
const PANEL_H = 320;
const ANGLE_STEP = 360 / COUNT; // 60deg per face

// apothem = radius of inscribed circle for regular hexagon with side = PANEL_W
// apothem = PANEL_W / (2 * tan(π/6)) = PANEL_W / (2 * 0.5774) ≈ PANEL_W * 0.866
const APOTHEM = Math.round(PANEL_W / (2 * Math.tan(Math.PI / COUNT)));
// APOTHEM ≈ 277px for PANEL_W=320

const AUTO_MS = 3800;

export default function SensoryExperience() {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Total accumulated Y rotation (never resets — smooth continuous spin)
  const [totalY, setTotalY] = useState(0);

  const goTo = (n: number) => {
    if (busy) return;
    setBusy(true);
    // Spin forward to target
    const diff = ((n - step) % COUNT + COUNT) % COUNT;
    setTotalY((prev) => prev - diff * ANGLE_STEP);
    setStep(n);
    setTimeout(() => setBusy(false), 950);
  };

  const advance = () => {
    const next = (step + 1) % COUNT;
    goTo(next);
  };

  useEffect(() => {
    timerRef.current = setInterval(advance, AUTO_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, busy]);

  const current = sections[step];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; border: none; background: none; padding: 0; }

        .drum-scene {
          width: ${PANEL_W}px;
          height: ${PANEL_H}px;
          perspective: 1000px;
          perspective-origin: 50% 50%;
        }
        .drum {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.92s cubic-bezier(0.77, 0, 0.18, 1);
        }
        .panel {
          position: absolute;
          width: ${PANEL_W}px;
          height: ${PANEL_H}px;
          overflow: hidden;
          /* No backface-visibility: hidden needed — all panels rotate on Y only,
             so they always face correct direction relative to viewer */
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .drum-shadow {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%) scaleY(0.3);
          width: ${PANEL_W * 0.75}px;
          height: ${PANEL_W * 0.75}px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 68%);
          filter: blur(8px);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <section style={{
        background: "#FAF6EF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px 64px",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 65% 50% at 50% 55%, ${current.accent}14 0%, transparent 68%)`,
          transition: "background 0.9s ease",
        }} />

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{
            fontFamily: "font-serif",
            fontSize: "30px",
            color: "#2C1B4E",  marginBottom: "14px"
          }}>
            Where Ancient Heritage Meets{" "}<br/>
            <span style={{ color: "#C9A84C" }}>Modern Purity</span>
          </h2>
          <div style={{
            width: "72px", height: "1px", margin: "0 auto",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
          }} />
        </div>
        <br/>
        <br/>

        {/* DRUM STAGE */}
        <div style={{ position: "relative" }}>

          {/* Back glow */}
          <div style={{
            position: "absolute", inset: -40, pointerEvents: "none", zIndex: 0,
            background: `radial-gradient(ellipse at center, ${current.accent}18 0%, transparent 65%)`,
            filter: "blur(24px)",
            transition: "background 0.9s ease",
            borderRadius: "8px",
          }} />



          <div className="drum-scene" style={{ position: "relative", zIndex: 1 }}>
            <div
              className="drum"
              style={{ transform: `rotateY(${totalY}deg)` }}
            >
              {sections.map((section, i) => {
                const panelAngle = i * ANGLE_STEP;
                return (
                  <div
                    key={i}
                    className="panel"
                    style={{
                      transform: `rotateY(${panelAngle}deg) translateZ(${APOTHEM}px)`,
                      background: "linear-gradient(145deg, #3D2B5F 0%, #2C1B4E 50%, #1F1438 100%)",
                      border: `1px solid ${section.accent}25`,
                    }}
                  >
                    <PanelContent section={section} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="drum-shadow" />
        </div>

        {/* DOTS */}
        <div style={{ display: "flex", gap: "10px", marginTop: "18px", alignItems: "center" }}>
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                goTo(i);
                timerRef.current = setInterval(advance, AUTO_MS);
              }}
              style={{
                width: i === step ? "28px" : "7px",
                height: "7px", borderRadius: "4px",
                background: i === step ? current.accent : "rgba(44,27,78,0.18)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
        <br/>
        <br/>

        {/* QUOTE */}
        <div style={{ textAlign: "center", marginTop: "48px", maxWidth: "600px" }}>
          <p className="space-y-10 md:space-y-14 text-base md:text-xl leading-[1.9] text-royal-purple/80 font-rr" >
            "Every thread must whisper{" "}
            <em style={{ color: "#C9A84C", fontStyle: "normal" }}>luxury</em>,{" "}
            <em style={{ color: "#D4AF37", fontStyle: "normal" }}>heritage</em>, and{" "}
            <em style={{ color: "#B8960C", fontStyle: "normal" }}>healing</em>"
          </p>
        </div>
      </section>
    </>
  );
}

function PanelContent({ section }: { section: typeof sections[0] }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      justifyContent: "space-between",
      padding: "32px",
    }}>
      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${section.accent}80, ${section.accent}, ${section.accent}80, transparent)`,
      }} />
      {/* Left shimmer */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "1px",
        background: `linear-gradient(180deg, ${section.accent}55, transparent 65%)`,
      }} />
      {/* Bottom shimmer */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${section.accent}30, transparent)`,
      }} />

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 14, left: 14, width: 16, height: 16, borderTop: `1px solid ${section.accent}45`, borderLeft: `1px solid ${section.accent}45` }} />
      <div style={{ position: "absolute", bottom: 14, right: 14, width: 16, height: 16, borderBottom: `1px solid ${section.accent}45`, borderRight: `1px solid ${section.accent}45` }} />

      {/* Number row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
          letterSpacing: "0.45em", textTransform: "uppercase",
          color: `${section.accent}95`,
        }}>
          {section.number}
        </span>
        <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${section.accent}28, transparent)` }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: `${section.accent}30`,
        }}>Legacy</span>
      </div>

      {/* Middle */}
      <div>
        <h3 style={{
          fontFamily: "font-rr",
          fontSize: "24px", fontWeight: 10, color: "#F5F0E8",
          lineHeight: 1.12, letterSpacing: "-0.01em", marginBottom: "14px",
        }}>
          {section.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div style={{ width: "22px", height: "1px", background: section.accent }} />
          <div style={{ width: "5px", height: "5px", transform: "rotate(45deg)", background: section.accent,  flexShrink: 0 }} />
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${section.accent}28, transparent)` }} />
        </div>
        <p style={{
          fontFamily: "font-rr",
          fontSize: "14px", 
          lineHeight: 1.85, color: "rgba(245,240,232,0.65)",
          letterSpacing: "0.01em",
        }}>
          {section.desc}
        </p>
      </div>

      {/* Bottom tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "16px", height: "1px", background: section.accent }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
          letterSpacing: "0.4em", textTransform: "uppercase",
          color: `${section.accent}40`,
        }}>
          
        </span>
      </div>
    </div>
  );
}