import Layout from "@/components/layout/Layout";
import { Award, Target,  FileCheck } from "lucide-react";
import "@/styles/about-hero-3d.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import corporateLogo from "@/assets/heyramlogo.png";
<<<<<<< HEAD
import kolam from "@/assets/kolam.png";
=======
>>>>>>> bf7891647c5961d25726370e2def7c16046dfb73

//import CursorParticles from "@/components/about/CursorParticles";
import AboutStory from "@/components/about/AboutStory";
import SensoryExperience from "@/components/about/SensoryExperience";
import HeroVideo from "@/components/about/about_hero";

const corporateDetails = [
  { label: "FSSAI License No", value: "12423008002367", icon: FileCheck },
  { label: "GSTIN", value: "33ABFA6551N1ZZ", icon: Award },
  { label: "MSME UAN", value: "TN-02-0006511", icon: Target },
  { label: "Launched By", value: "HeyRam Infrastructure" },
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

    {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            />
<br/>
<br/>
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
      className="font-cinzel text-4xl md:text-4xl lg:text-6xl text-ivory mb-8 leading-tight font-medium"
    >
      Tradition in every
      <br/><span className="text-gold">thread</span> 
      
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



      {/* Remaining sections unchanged */}
      <AboutStory />
      <SensoryExperience />

      {/* =========================
         CORPORATE SECTION
      ========================= */}
<<<<<<< HEAD
      <section id="corporate" className="relative py-24 bg-ivory-dark overflow-hidden">
        {/* Decorative Kolam Motifs */}

{/* ===== KOLAM DECORATIVE BACKGROUND ===== */}

<div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-end overflow-hidden">
  <img
    src={kolam}
    alt=""
    className="
      w-[520px]
      opacity-10
      mix-blend-multiply
      translate-y-1/2
      select-none
    "
  />

</div>
{/* ===== SIDE KOLAMS (LEFT + RIGHT) ===== */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

  {/* LEFT KOLAM */}
  <img
    src={kolam}
    alt=""
    className="
      absolute
      bottom-0
      left-[-120px]
      w-[500px]
      opacity-5
      mix-blend-multiply
      select-none
    "
  />

  {/* RIGHT KOLAM (mirrored) */}
  <img
    src={kolam}
    alt=""
    className="
      absolute
      bottom-0
      right-[-120px]
      w-[500px]
      opacity-5
      mix-blend-multiply
      scale-x-[-1]
      select-none
    "
  />

</div>
=======
      <section id="corporate" className="py-24 bg-ivory-dark">
>>>>>>> bf7891647c5961d25726370e2def7c16046dfb73
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

                {item.icon ? (
  <div className="inline-flex p-3 bg-royal-purple/5 text-royal-purple mb-4 group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300">
    <item.icon className="w-6 h-6" />
  </div>
) : (
  <div className="mb-4">
    <img
      src={corporateLogo}
      alt="HeyRam Infrastructure"
<<<<<<< HEAD
      className="h-5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
=======
      className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
>>>>>>> bf7891647c5961d25726370e2def7c16046dfb73
    />
  </div>
)}

                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-sans">
                  {item.label}
                </p>

                <div
                  className="relative cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(item.value)}
                >
                  <p className="
  font-rr
  text-[14px]
  md:text-[15px]
  font-light
  tracking-[0.10em]
  uppercase
  text-royal-purple
  group-hover:text-gold
  transition-colors
  break-words
">
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
