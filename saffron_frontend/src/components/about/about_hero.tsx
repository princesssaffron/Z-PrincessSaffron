import heroVideo from "@/assets/about-hero-video.mp4";

const HeroVideo = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      
      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark/60 via-royal-purple-dark/40 to-royal-purple-dark/80" />

      {/* GOLD CINEMATIC SHIMMER */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-gold/10 opacity-60" />

    </div>
  );
};

export default HeroVideo;
