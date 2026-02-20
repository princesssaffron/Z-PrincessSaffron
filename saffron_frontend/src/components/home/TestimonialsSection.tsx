import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import WriteReviewModal from "./WriteReviewModal";
import { Button } from "@/components/ui/button"; // ✅ Global Button

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    comment:
      "The most authentic Kashmiri saffron I have ever tasted. The aroma is divine!",
    avatar: "PS",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    comment:
      "Perfect for biryani and desserts. My family loved it. Will definitely order again.",
    avatar: "RK",
  },
  {
    name: "Fatima Hassan",
    location: "Dubai, UAE",
    rating: 5,
    comment:
      "Exceptional quality! The packaging was beautiful and delivery was fast.",
    avatar: "FH",
  },
  {
    name: "Sarah Chen",
    location: "Singapore",
    rating: 5,
    comment:
      "I use it in my morning saffron milk. The color and flavor are unmatched.",
    avatar: "SC",
  },
  {
    name: "Ahmed Ali",
    location: "Riyadh, KSA",
    rating: 5,
    comment:
      "Gift packaging was stunning. My wife loved it as an anniversary present.",
    avatar: "AA",
  },
  {
    name: "Maria Garcia",
    location: "Barcelona, Spain",
    rating: 5,
    comment:
      "Makes my paella truly authentic. Best saffron I have found outside of Spain.",
    avatar: "MG",
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <>
      <section ref={ref} className="relative pt-24 pb-36 bg-ivory overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}
            className="text-center mb-20"
          >
            <p className="font-sans text-gold text-sm tracking-[0.35em] uppercase mb-4">
              Customer Love
            </p>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-royal-purple leading-tight">
              What Our Customers Say
            </h2>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </motion.div>
        </div>

        {/* ⭐ AUTO SCROLL TRACK */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 w-max px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {loopTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="
                  min-w-[320px] md:min-w-[360px] lg:min-w-[420px]
                  bg-card p-6 md:p-8 rounded-xl
                  shadow-card transition-all duration-500
                  hover:shadow-elegant hover:-translate-y-1
                "
              >
                <Quote className="w-10 h-10 text-gold/30 mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="font-serif text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
                  “{testimonial.comment}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-royal flex items-center justify-center">
                    <span className="font-serif text-sm text-ivory">
                      {testimonial.avatar}
                    </span>
                  </div>

                  <div>
                    <p className="font-serif text-sm md:text-base text-royal-purple">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ✅ GLOBAL BUTTON CTA */}
<div className="text-center mt-24">
  <Button
    variant="section"   
    onClick={() => setOpenReviewModal(true)}
    className="min-w-[220px]"
  >
    Add a Review
  </Button>
</div>

      </section>

      <WriteReviewModal
        open={openReviewModal}
        onOpenChange={setOpenReviewModal}
        onReviewSubmitted={() => setOpenReviewModal(false)}
      />
    </>
  );
};

export default TestimonialsSection;
