import { motion } from "framer-motion";

const sections = [
    {
        title: "Who We Are",
        desc: "Fruit of passion, tradition, and technological excellence. Launched by HeyRam Infrastructure to bridge the digital future with age-old agricultural heritage.",
        gradient: "from-royal-purple-900 to-black"
    },
    {
        title: "Our Essence",
        desc: "Curators of a living legacy. From high Himalayan valleys to sun-kissed Spanish fields, we preserve a piece of heritage in every harvest.",
        gradient: "from-gold-900 to-amber-900"
    },
    {
        title: "Origin Sourcing",
        desc: "Traceability is a responsibility. Direct partnerships with farms in Kashmir, Iran, and Spain to ensure peak bloom potency.",
        gradient: "from-green-900 to-emerald-900"
    },
    {
        title: "Laboratory Tested",
        desc: "Verified for purity, aroma profile, and color strength. Authenticity must be proven, not promised.",
        gradient: "from-blue-900 to-indigo-900"
    },
    {
        title: "Crafted Experiences",
        desc: "Wellness. Celebration. Healing. Royalty. From sacred rituals to Michelin-starred kitchens, elevating moments that matter.",
        gradient: "from-red-900 to-rose-900"
    },
    {
        title: "A Culture of Saffron",
        desc: "Make luxury ethical. Make authenticity accessible. Redefining saffron from a commodity to a cherished craft.",
        gradient: "from-purple-900 to-fuchsia-900"
    }
];

const SensoryExperience = () => {
    return (
        <section className="py-24 bg-[#1a0524] text-ivory overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Intro Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-6">
                            Heritage & Modernity
                        </p>
                        <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-8">
                            At the crossroads of ancient heritage and modern purity
                        </h2>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
                        <p className="text-xl text-ivory/80 font-serif italic">
                            "Z PRINCESS SAFFRON embodies the golden promise of authenticity. Each strand we offer is a quiet testament to patience, provenance, and purpose."
                        </p>
                    </motion.div>
                </div>

                {/* Interactive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-64 rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-500 hover:shadow-2xl flex flex-col justify-center p-8 text-center"
                        >
                            {/* Subtle Gradient Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

                            <div className="relative z-10">
                                <h3 className="font-serif text-2xl text-gold mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                                    {section.title}
                                </h3>
                                <div className="w-12 h-px bg-white/10 mx-auto mb-4 group-hover:bg-gold/50 group-hover:w-24 transition-all duration-700" />
                                <p className="text-ivory/80 text-sm leading-relaxed font-light tracking-wide opacity-80 group-hover:opacity-100 group-hover:text-white transition-all duration-300">
                                    {section.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Signature Quote */}
                <div className="text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative py-12"
                    >
                        <span className="text-gold/20 text-9xl font-serif absolute top-0 left-0 -translate-x-12 -translate-y-4 leading-none select-none">“</span>
                        <p className="font-serif text-3xl md:text-4xl text-ivory leading-relaxed">
                            Every thread must whisper <span className="text-gold">luxury</span>, <span className="text-gold">heritage</span>, and <span className="text-gold">healing</span>.
                        </p>
                        <span className="text-gold/20 text-9xl font-serif absolute bottom-0 right-0 translate-x-12 translate-y-8 leading-none select-none">”</span>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default SensoryExperience;
