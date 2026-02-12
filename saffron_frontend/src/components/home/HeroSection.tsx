import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import heroImage from "@/assets/hero-saffron.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark/70 via-royal-purple/50 to-royal-purple-dark/85" />
      </div>

      {/* Floating Saffron Particles Effect */}
      {/*<div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-gold to-gold/0 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>*/}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Subtitle */}
          <p
            className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Premium Kashmiri Saffron
          </p>

          {/* Main Heading */}
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Main Heading */}
              <h1
                className="font-cinzel text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 sm:mb-6 animate-fade-in px-2"
                style={{ letterSpacing: "0.15em" }}
              >
                Z PRINCESS SAFFRON
              </h1>
            </motion.h1>

            <span className="block text-2xl sm:text-3xl md:text-4xl text-gold-gradient mt-2 font-light tracking-wide">Now Yours</span>
          </h1>

          {/* Description */}
          <p
  className="font-cursiveLuxury text-ivory/90 text-2xl md:text-3xl max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide animate-fade-in"
  style={{ animationDelay: "0.6s" }}
>
  World's Finest Saffron
</p>



          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              to="/products"
              className="group relative overflow-hidden px-10 py-4 bg-[#E6C76A] text-royal-purple-dark font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-gold-glow flex items-center gap-3 rounded-full"
            >
              <span className="relative z-10">Discover Collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />

              <div className="
  absolute inset-0
  bg-gradient-to-r 
  from-[#F1DE9A] 
  via-[#E6C76A] 
  to-[#F1DE9A]
  bg-[length:200%_100%]
  animate-shimmer
  opacity-0 
  group-hover:opacity-100 
  transition-opacity 
  duration-500
" />
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 border-2 border-ivory/30 text-ivory font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5 rounded-full"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 cursor-pointer transition-transform duration-1000 ease-in-out hover:translate-y-4"
      >
        <span className="font-serif text-xs tracking-[0.15em] text-gold/90 uppercase">
          Unveil the essence below
        </span>
        <div className="animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold/80" />
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-gold/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-gold/20" />
    </section >
  );
};

export default HeroSection;
