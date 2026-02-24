import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

import healthImage from "@/assets/moments-health.jpg";
import beautyImage from "@/assets/moments-beauty.png";
import culinaryImage from "@/assets/moments-culinary.jpg";

const chapters = [
  {
    id: "health",
    image: healthImage,
    text: "Nurturing life, naturally",
  },
  {
    id: "beauty",
    image: beautyImage,
    text: "Radiance in Every Strand",
  },
  {
    id: "culinary",
    image: culinaryImage,
    text: "Flavor that becomes memory",
  },
];

const Panel = ({ chapter }: any) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Continuous slow zoom
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Smooth fade in & fade out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Subtle brightness shift (instead of dark overlay)
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.85, 1, 0.85]
  );

  // Text floating continuity
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <div ref={ref} className="relative h-[200vh]">
      <motion.section
        style={{ opacity }}
        className="h-screen sticky top-0 overflow-hidden"
      >
        {/* IMAGE */}
        <motion.img
          src={chapter.image}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            scale,
            filter,
          }}
        />

        {/* TEXT */}
        <motion.div
          style={{ y: textY }}
          className="relative h-full flex items-center justify-center text-center px-6"
        >
          <h3
            className="text-white font-serif text-3xl md:text-5xl lg:text-6xl leading-tight"
            style={{
              textShadow: "0 8px 40px rgba(0,0,0,0.35)",
            }}
          >
            {chapter.text}
          </h3>
        </motion.div>
      </motion.section>
    </div>
  );
};

const SaffronMomentsSection = () => {
  return (
    <section className="bg-white">
      {chapters.map((chapter, index) => (
        <Panel key={chapter.id} chapter={chapter} index={index} />
      ))}
    </section>
  );
};

export default SaffronMomentsSection;
