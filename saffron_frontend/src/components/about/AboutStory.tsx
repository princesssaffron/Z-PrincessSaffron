import { motion } from "framer-motion";
import { useRef } from "react";

const AboutStory = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-ivory text-royal-purple relative overflow-hidden"
    >
      {/* Soft luxury glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">

          {/* ================= HEADER ================= */}
          <div className="text-center mb-20">

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-sans text-gold font-medium text-sm tracking-[0.35em] uppercase mb-5"
            >
              Our Origin
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl text-royal-purple mb-6 tracking-[0.06em]"
            >
              A Tale of{" "}
             Two Worlds
            </motion.h2>

          </div>

          {/* ================= STORY ================= */}
          <div className="space-y-10 md:space-y-14 text-base md:text-xl leading-[1.9] text-royal-purple/80 font-rr ">

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ margin: "-50px" }}
              className="relative text-justify"
            >
              {/* Luxury drop cap */}
              

              It begins in the violet fields of Pampore, where the air is thin
              and the soil knows the secrets of centuries. Here, time moves
              differently. It moves at the pace of a blooming crocus, waiting
              for that single, perfect harvest moon.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto origin-center "
            />

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ margin: "-100px" }}
            >
              But tradition alone cannot feed the future. Born from the vision
              of{" "}
              <strong className="text-royal-purple font-rr text-justify">
                HeyRam Infrastructure
              </strong>
              , Z Princess Saffron bridges the gap between ancient earth and
              modern excellence. We don't just harvest spice — we curate a
              legacy.
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto origin-center"
            />

            {/* Closing line */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ margin: "-100px" }}
              className="text-center font-sans text-sm font-medium uppercase tracking-[0.35em] text-gold"
            >
              Restraint. Patience. Purity.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
