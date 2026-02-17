import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Leaf, FlaskConical } from "lucide-react";

const badges = [
  { icon: Shield, label: "ISO 22000", desc: "Certified" },
  { icon: Award, label: "FSSAI", desc: "Approved" },
  { icon: Leaf, label: "Organic", desc: "100% Pure" },
  { icon: FlaskConical, label: "Lab Tested", desc: "Quality" },
];

const features = [
  {
    title: "Hand-Picked at Dawn",
    description:
      "Our saffron is harvested during the early morning hours when the flowers are still closed, preserving maximum potency and aroma.",
  },
  {
    title: "Grade A+ Quality",
    description:
      "Only the finest crimson stigmas are selected, ensuring the highest crocin and safranal content for superior flavor and color.",
  },
  {
    title: "Direct from Kashmir",
    description:
      "Sourced directly from the pristine valleys of Pampore, Kashmir — the saffron capital of India with centuries of heritage.",
  },
  {
    title: "Rigorous Testing",
    description:
      "Every batch undergoes comprehensive laboratory testing for purity, potency, and authenticity before reaching you.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-ivory overflow-hidden"
    >
      {/* Subtle Luxury Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235C0011' fill-opacity='1'%3E%3Ccircle cx='40' cy='40' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-gold/70">
            The Z Princess Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-royal-purple mt-4 mb-6 px-4">
            Why Choose Our Saffron
          </h2>
          <div className="w-20 inline-block h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        {/* Certification Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 mb-16 md:mb-24 px-4"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.12,
                ease: "easeOut",
              }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-royal-purple-dark via-royal-purple to-royal-purple-dark flex items-center justify-center shadow-royal transform transition-transform hover:scale-110">
                <badge.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gold" />
              </div>
              <span className="mt-4 font-serif text-xs sm:text-sm text-royal-purple font-semibold tracking-wide">
                {badge.label}
              </span>
              <span className="font-sans text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                {badge.desc}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.4 + index * 0.18,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="relative bg-card p-8 sm:p-10 md:p-12 rounded-2xl shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
            >
              {/* Gold Accent Line */}
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-gold to-gold/40 rounded-l-2xl" />

              <h3 className="font-serif text-xl sm:text-2xl text-royal-purple mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
