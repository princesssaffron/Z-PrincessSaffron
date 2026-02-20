import { motion } from "framer-motion";
import { useState } from "react";

const sections = [
  {
    title: "Who We Are",
    desc: "Fruit of passion, tradition, and technological excellence. Launched by HeyRam Infrastructure to bridge the digital future with age-old agricultural heritage.",
  },
  {
    title: "Our Essence",
    desc: "Curators of a living legacy. From high Himalayan valleys to sun-kissed Spanish fields, we preserve a piece of heritage in every harvest.",
  },
  {
    title: "Origin Sourcing",
    desc: "Traceability is a responsibility. Direct partnerships with farms in Kashmir, Iran, and Spain to ensure peak bloom potency.",
  },
  {
    title: "Laboratory Tested",
    desc: "Verified for purity, aroma profile, and color strength. Authenticity must be proven, not promised.",
  },
  {
    title: "Crafted Experiences",
    desc: "Wellness. Celebration. Healing. Royalty. From sacred rituals to Michelin-starred kitchens, elevating moments that matter.",
  },
  {
    title: "A Culture of Saffron",
    desc: "Make luxury ethical. Make authenticity accessible. Redefining saffron from a commodity to a cherished craft.",
  },
];

const SensoryExperience = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-royal-purple-dark text-ivory overflow-hidden relative">

      {/* Soft luxury glow background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* ================= INTRO ================= */}
        <div className="max-w-4xl mx-auto text-center mb-20">

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="font-sans text-gold text-sm tracking-[0.35em] uppercase mb-6"
          >
            Heritage & Modernity
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-ivory leading-tight mb-8"
          >
            Where ancient heritage meets modern purity.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.4 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            viewport={{ once: true }}
            className="text-xl text-ivory/80 font-serif italic"
          >
            "Z PRINCESS SAFFRON embodies the golden promise of authenticity.
            Each strand we offer is a quiet testament to patience, provenance,
            and purpose."
          </motion.p>

        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">

          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{
                y: -10,
                rotateX: 3,
                rotateY: -3,
                scale: 1.02,
              }}
              className="group relative h-64 overflow-hidden border border-ivory/10 hover:border-gold/40 transition-all duration-500 flex flex-col justify-center p-8 text-center bg-royal-purple-dark/60 backdrop-blur-sm"
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              {/* breathing glow */}
              <motion.div
                animate={{
                  opacity: hovered === index ? 0.9 : 0.2,
                  scale: hovered === index ? 1.15 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-gold/5"
              />

              {/* shimmer sweep */}
              <motion.div
                initial={{ x: "-120%" }}
                animate={hovered === index ? { x: "120%" } : {}}
                transition={{ duration: 1.2 }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />

              {/* content */}
              <div className="relative z-10">

                <motion.h3
                  animate={{ y: hovered === index ? -6 : 0 }}
                  className="font-serif text-2xl text-gold mb-4"
                >
                  {section.title}
                </motion.h3>

                <motion.div
                  animate={{ width: hovered === index ? 96 : 48 }}
                  transition={{ duration: 0.4 }}
                  className="h-px bg-ivory/20 mx-auto mb-4"
                />

                <motion.p
                  animate={{ opacity: hovered === index ? 1 : 0.85 }}
                  className="text-ivory/80 text-sm leading-relaxed font-serif tracking-wide"
                >
                  {section.desc}
                </motion.p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* ================= CINEMATIC QUOTE ================= */}
        <div className="text-center max-w-2xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative py-12"
          >

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              className="text-gold text-9xl font-serif absolute top-0 left-0 -translate-x-12 -translate-y-4"
            >
              “
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="font-serif text-3xl md:text-4xl text-ivory leading-relaxed"
            >
              Every thread must whisper{" "}
              <span className="text-gold">luxury</span>,{" "}
              <span className="text-gold">heritage</span>, and{" "}
              <span className="text-gold">healing</span>.
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.2 }}
              transition={{ delay: 0.3 }}
              className="text-gold text-9xl font-serif absolute bottom-0 right-0 translate-x-12 translate-y-8"
            >
              ”
            </motion.span>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SensoryExperience;
