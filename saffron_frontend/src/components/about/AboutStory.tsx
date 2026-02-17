import { motion } from "framer-motion";
import { useRef } from "react";

const AboutStory = () => {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="py-32 bg-ivory text-royal-purple relative overflow-hidden">
            {/* Background Parallax Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4"
                        >
                            Our Origin
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight"
                        >
                            A Tale of <span className="italic text-gold">Two Worlds</span>
                        </motion.h2>
                    </div>

                    {/* Narrative Paragraphs */}
                    <div className="space-y-8 md:space-y-12 text-base md:text-xl leading-relaxed text-royal-purple/80 font-serif">
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ margin: "-50px" }}
                        >
                            <span className="text-3xl md:text-4xl float-left mr-2 mt-[-4px] text-gold">I</span>t begins in the violet fields of Pampore, where the air is thin and the soil knows the secrets of centuries. Here, time moves differently. It moves at the pace of a blooming crocus, waiting for that single, perfect harvest moon.
                        </motion.p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.5 }}
                            className="w-24 h-px bg-gold/50 mx-auto"
                        />

                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ margin: "-100px" }}
                        >
                            But tradition alone cannot feed the future. Born from the vision of <strong className="text-royal-purple">HeyRam Infrastructure</strong>, Z Princess Saffron bridges the gap between ancient earth and modern excellence. We don't just harvest spice; we curate a legacy.
                        </motion.p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.5 }}
                            className="w-24 h-px bg-gold/50 mx-auto"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ margin: "-100px" }}
                            className="text-center font-sans text-sm uppercase tracking-widest text-gold"
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
