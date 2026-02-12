import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// Import cinematic images
import healthImage from "@/assets/moments-health.jpg";
import beautyImage from "@/assets/moments-beauty.png";
import culinaryImage from "@/assets/moments-culinary.jpg";

interface Chapter {
  id: string;
  image: string;
  text: string;
  alt: string;
}

const chapters: Chapter[] = [
  {
    id: "health",
    image: healthImage,
    text: "Nurturing life, naturally.",
    alt: "Pregnant mother in warm natural light",
  },
  {
    id: "beauty",
    image: beautyImage,
    text: "Radiance passed through generations.",
    alt: "Bride with radiant glowing skin",
  },
  {
    id: "culinary",
    image: culinaryImage,
    text: "Flavor that becomes memory.",
    alt: "Steaming biryani with saffron",
  },
];

// Floating saffron thread component
const SaffronThread = ({ delay, startX }: { delay: number; startX: number }) => {
  return (
    <motion.div
      className="absolute w-[2px] h-8 md:h-12 bg-gradient-to-b from-gold via-gold/80 to-transparent rounded-full"
      style={{ left: `${startX}%` }}
      initial={{ opacity: 0, y: -50, rotate: -15 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0],
        y: ["0%", "100vh"],
        rotate: [-15, 15, -10, 20],
        x: [0, 20, -10, 30],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Film grain overlay
const FilmGrain = () => (
  <div
    className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Vignette overlay
const Vignette = () => (
  <div
    className="absolute inset-0 pointer-events-none z-40"
    style={{
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
    }}
  />
);

const SaffronMomentsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Scroll progress for the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to chapter index
  const chapterProgress = useTransform(scrollYProgress, [0, 1], [0, chapters.length]);

  // Update active chapter based on scroll
  useEffect(() => {
    const unsubscribe = chapterProgress.on("change", (value) => {
      const newChapter = Math.min(Math.floor(value), chapters.length - 1);
      if (newChapter !== activeChapter && newChapter >= 0) {
        setActiveChapter(newChapter);
      }
    });
    return () => unsubscribe();
  }, [chapterProgress, activeChapter]);

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 20);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Calculate opacity for each chapter based on scroll progress
  const getChapterOpacity = (index: number) => {
    return useTransform(
      scrollYProgress,
      [
        index / chapters.length,
        (index + 0.3) / chapters.length,
        (index + 0.7) / chapters.length,
        (index + 1) / chapters.length,
      ],
      [0, 1, 1, index === chapters.length - 1 ? 1 : 0]
    );
  };

  // Calculate scale for depth effect
  const getChapterScale = (index: number) => {
    return useTransform(
      scrollYProgress,
      [
        index / chapters.length,
        (index + 0.5) / chapters.length,
        (index + 1) / chapters.length,
      ],
      [1.1, 1, 0.95]
    );
  };

  // Final text opacity - appears at the very end
  const finalTextOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [0, 1]
  );

  // Saffron threads for floating effect
  const saffronThreads = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 1.5,
    startX: 10 + (i * 10) + Math.random() * 5,
  }));

  return (
    <section
      ref={containerRef}
      className="relative bg-royal-purple-dark"
      style={{ height: "400vh" }} // 4x viewport for scroll-lock effect
    >
      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section title - appears at start */}
        <motion.div
          className="absolute top-8 left-0 right-0 z-30 text-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]) }}
        >
          <p className="font-sans text-gold/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-2">
            Woven Into Life
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-ivory">
            Saffron in Life's Most Precious Moments
          </h2>
        </motion.div>

        {/* Floating saffron threads */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-40">
          {saffronThreads.map((thread, i) => (
            <SaffronThread key={i} delay={thread.delay} startX={thread.startX} />
          ))}
        </div>

        {/* Chapter backgrounds with crossfade */}
        {chapters.map((chapter, index) => {
          const opacity = getChapterOpacity(index);
          const scale = getChapterScale(index);

          return (
            <motion.div
              key={chapter.id}
              className="absolute inset-0 z-0"
              style={{ opacity, scale }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  x: smoothMouseX,
                  y: smoothMouseY,
                }}
              >
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
              </motion.div>

              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/90 via-royal-purple-dark/40 to-royal-purple-dark/60" />

              {/* Warm color grading overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-royal-purple/10" />
            </motion.div>
          );
        })}

        {/* Chapter text overlays */}
        {chapters.map((chapter, index) => {
          const opacity = getChapterOpacity(index);

          return (
            <motion.div
              key={`text-${chapter.id}`}
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ opacity }}
            >
              <motion.p
                className="font-serif text-2xl md:text-4xl lg:text-5xl text-ivory text-center px-8 max-w-4xl leading-relaxed"
                initial={{ y: 30 }}
                style={{
                  textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                }}
              >
                "{chapter.text}"
              </motion.p>
            </motion.div>
          );
        })}

        {/* Final composition text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ opacity: finalTextOpacity }}
        >
          <div className="text-center px-8">
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              style={{ scaleX: finalTextOpacity }}
            />
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-ivory mb-4">
              <span className="text-gold">Z Princess Saffron</span>
            </h3>
            <p className="font-serif text-xl md:text-2xl text-ivory/90 italic">
              — woven into life itself.
            </p>
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"
              initial={{ scaleX: 0 }}
              style={{ scaleX: finalTextOpacity }}
            />
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {chapters.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-ivory/30"
              animate={{
                backgroundColor: activeChapter >= index ? "hsl(43, 74%, 49%)" : "rgba(255,255,255,0.3)",
                scale: activeChapter === index ? 1.3 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        {/* Scroll hint - only at start */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="text-ivory/50 text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            className="w-5 h-8 border border-ivory/30 rounded-full flex items-start justify-center p-1"
            initial={{ opacity: 0.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-gold rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Film grain overlay */}
        <FilmGrain />

        {/* Vignette effect */}
        <Vignette />
      </div>
    </section>
  );
};

export default SaffronMomentsSection;
