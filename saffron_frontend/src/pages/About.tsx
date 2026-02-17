import Layout from "@/components/layout/Layout";
import { Award, Target, Users, FileCheck } from "lucide-react";


import "@/styles/about-hero-3d.css";
import { useEffect } from "react";


import CursorParticles from "@/components/about/CursorParticles";
import AboutStory from "@/components/about/AboutStory";

import SensoryExperience from "@/components/about/SensoryExperience";


const corporateDetails = [
  {
    label: "FSSAI License No",
    value: "12423008002367",
    icon: FileCheck,
  },
  {
    label: "GSTIN",
    value: "33ABFA6551N1ZZ",
    icon: Award,
  },
  {
    label: "MSME UAN",
    value: "TN-02-0006511",
    icon: Target,
  },
  {
    label: "Launched By",
    value: "HeyRam Infrastructure",
    icon: Users,
  },
];



const About = () => {

  useEffect(() => {
    /* ===============================
       REGULAR FLOATING GLITTER
    =============================== */
    const glitterContainer = document.getElementById("glitterContainer");
    if (!glitterContainer) return;

    function createGlitter() {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      for (let i = 0; i < 18; i++) {
        const g = document.createElement("div");

        const sizeRand = Math.random();
        if (sizeRand < 0.3) g.className = "glitter small";
        else if (sizeRand > 0.7) g.className = "glitter large";
        else g.className = "glitter medium";

        if (Math.random() > 0.6) g.classList.add("saffron");

        const angle = (i / 18) * Math.PI * 2;
        const distance = 140 + Math.random() * 260;

        g.style.left = cx + "px";
        g.style.top = cy + "px";
        g.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
        g.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);

        glitterContainer?.appendChild(g);
        setTimeout(() => g.remove(), 5200);
      }
    }

    createGlitter();
    const glitterInterval = setInterval(createGlitter, 3500);

    /* ===============================
       SPLASH GLITTER (ZOOM PEAK)
    =============================== */
    function createSplashGlitter() {
      const splashContainer =
        document.getElementById("splashGlitterContainer");
      if (!splashContainer) return;

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      for (let i = 0; i < 26; i++) {
        const g = document.createElement("div");
        g.className =
          Math.random() > 0.5
            ? "splash-glitter large"
            : "splash-glitter";

        const angle = (i / 26) * Math.PI * 2;
        const distance = 120 + Math.random() * 280;

        g.style.left = cx + "px";
        g.style.top = cy + "px";
        g.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
        g.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);

        splashContainer.appendChild(g);
        setTimeout(() => g.remove(), 1800);
      }
    }

    // 🔥 Match your zoom animation (12s cycle)
    createSplashGlitter();
    const splashInterval = setInterval(createSplashGlitter, 12000);

    /* ===============================
     ORBITING GLITTER ROTATION
  =============================== */
    let rotationAngle = 0;

    function rotateGlitterOrbit() {
      const container = document.getElementById("glitterContainer");
      if (!container) return;

      rotationAngle += 0.15;

      container.style.transform = `
    rotateZ(${rotationAngle}deg)
    rotateY(${rotationAngle * 0.6}deg)
  `;
    }

    // Smooth orbital motion
    const orbitInterval = setInterval(rotateGlitterOrbit, 60);


    /* ===============================
       CLEANUP
    =============================== */
    return () => {
      clearInterval(glitterInterval);
      clearInterval(splashInterval);
      clearInterval(orbitInterval);

    };
  }, []);

  return (
    <Layout>
      <CursorParticles />

      {/* ===== CINEMATIC HERO SECTION WITH ANIMATION ===== */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0015]">

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 z-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>

        {/* Glitter Layer */}
        <div id="glitterContainer" className="glitter-container absolute inset-0 z-[5]" />
        <div
          id="splashGlitterContainer"
          className="splash-glitter-container absolute inset-0 z-[8]"
        />


        {/* HERO CONTENT */}
        <div className="relative z-10 text-center px-6">

          {/* Subtitle */}
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-6 animate-hero-content">
            Our Heritage
          </p>

          {/* ANIMATED BRAND TEXT */}
          <div className="stage mx-auto">
            <div className="glow-wrapper">
              <div
                className="glow"
                data-text="Z PRINCESS SAFFRON"
                style={{
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Z PRINCESS SAFFRON
              </div>

              <div className="sparkles"></div>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="subtitle mt-6 max-w-2xl mx-auto text-ivory/80 text-lg md:text-xl leading-relaxed animate-hero-content">
            More than a saffron brand — a legacy of passion, tradition, and excellence
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center text-gold/60 animate-bounce">
            <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
          </div>
        </div>
      </section>

      {/* NEW SECTIONS STACK */}
      <AboutStory />




      <SensoryExperience />







      {/* Corporate Essentials (Trust & Transparency) - Enhanced */}
      <section id="corporate" className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Trust & Transparency
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-6">
              Verified Excellence
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {corporateDetails.map((item) => (
              <div
                key={item.label}
                className="group bg-white p-8  shadow-sm border border-gray-100 hover:border-gold/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Verified Badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1  border border-green-100">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-green-700 uppercase">Verified</span>
                  </div>
                </div>

                <div className="inline-flex p-3  bg-royal-purple/5 text-royal-purple mb-4 group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <div className="relative group/copy cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(item.value);
                    // Ideally show a toast here, but for now we rely on the visual feedback
                  }}
                >
                  <p className="font-serif text-lg text-royal-purple font-medium group-hover/copy:text-gold transition-colors truncate">
                    {item.value}
                  </p>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1  opacity-0 group-hover/copy:opacity-100 transition-opacity">
                    Click to Copy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </Layout>
  );
};

export default About;
