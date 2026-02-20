import Layout from "@/components/layout/Layout";
import { Award, Target, Users, FileCheck } from "lucide-react";
import "@/styles/about-hero-3d.css";
import { useEffect } from "react";
import { motion } from "framer-motion";

//import CursorParticles from "@/components/about/CursorParticles";
import AboutStory from "@/components/about/AboutStory";
import SensoryExperience from "@/components/about/SensoryExperience";
import HeroVideo from "@/components/about/about_hero";

const corporateDetails = [
  { label: "FSSAI License No", value: "12423008002367", icon: FileCheck },
  { label: "GSTIN", value: "33ABFA6551N1ZZ", icon: Award },
  { label: "MSME UAN", value: "TN-02-0006511", icon: Target },
  { label: "Launched By", value: "HeyRam Infrastructure", icon: Users },
];

const About = () => {

  useEffect(() => {
    const glitterContainer = document.getElementById("glitterContainer");
    if (!glitterContainer) return;

    function createGlitter() {
      if (!glitterContainer) return;

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

        glitterContainer.appendChild(g);
        setTimeout(() => g.remove(), 5200);
      }
    }

    createGlitter();
    const glitterInterval = setInterval(createGlitter, 3500);

    return () => {
      clearInterval(glitterInterval);
    };
  }, []);

  return (
    <Layout>

      {/* =========================
         ✅ NEW HERO VIDEO SECTION
      ========================= */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Background Video */}
        <HeroVideo />

        {/* Optional overlay content (keep or remove later) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="max-w-3xl"
  >

    {/* Top Gold Line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="w-16 h-px bg-gold mx-auto mb-8"
    />

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="font-sans text-gold/90 text-sm tracking-[0.4em] uppercase mb-6 font-medium"
    >
      Our Heritage
    </motion.p>

    {/* Main Title */}
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory mb-8 leading-tight font-"
    >
      Z Princess Saffron
      
    </motion.h1>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="font-sans text-ivory/70 text-lg md:text-xl tracking-wide mb-12"
    >
      More than a saffron brand 
      <br/> a legacy of passion,
      tradition, and excellence.
    </motion.p>

    {/* Bottom Gold Line */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
    />

  </motion.div>

</div>


      </section>


      {/* =========================
         ❗ OLD HERO KEPT COMMENTED
      ========================= */}
      {/*
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0015]">

        <div className="absolute inset-0 z-0">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
        </div>

        <div id="glitterContainer" className="glitter-container absolute inset-0 z-[5]" />

        <div className="relative z-10 text-center px-6">

          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-6">
            Our Heritage
          </p>

          <div className="stage mx-auto">
            <div className="glow-wrapper">
              <div className="glow">Z PRINCESS SAFFRON</div>
              <div className="sparkles"></div>
            </div>
          </div>

          <p className="subtitle mt-6 max-w-2xl mx-auto text-ivory/80 text-lg md:text-xl leading-relaxed">
            More than a saffron brand — a legacy of passion, tradition, and excellence
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center text-gold/60 animate-bounce">
            <span className="text-xs tracking-widest uppercase mb-2 font-sans">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
          </div>
        </div>
      </section>
      */}

      {/* Remaining sections unchanged */}
      <AboutStory />
      <SensoryExperience />

      {/* =========================
         CORPORATE SECTION
      ========================= */}
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
                className="group bg-white p-8 shadow-sm border border-gray-100 hover:border-gold/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 border border-green-100">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-green-700 uppercase font-sans">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="inline-flex p-3 bg-royal-purple/5 text-royal-purple mb-4 group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300">
                  <item.icon className="w-6 h-6" />
                </div>

                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-sans">
                  {item.label}
                </p>

                <div
                  className="relative cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(item.value)}
                >
                  <p className="font-serif text-lg text-royal-purple font-medium group-hover:text-gold transition-colors truncate">
                    {item.value}
                  </p>

                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity font-sans">
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
