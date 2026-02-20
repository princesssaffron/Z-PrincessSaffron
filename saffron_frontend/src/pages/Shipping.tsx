import Layout from "@/components/layout/Layout";
import {
  Truck,
  MapPin,
  Clock,
  Package,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const Shipping = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="bg-royal-purple-dark text-ivory py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-6"
          >
            <div className="max-w-3xl mx-auto text-center">

              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Truck className="w-16 h-16 text-gold mx-auto mb-6" />
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl mb-6 tracking-wide">
                Shipping Policy
              </h1>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

              <p className="text-ivory/70">
                Fast, secure delivery of premium saffron to your doorstep
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-5xl mx-auto space-y-16"
            >

              {/* Free Shipping Banner */}
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-r from-gold/20 to-gold/5 rounded-3xl p-10 text-center shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <IndianRupee className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="font-serif text-2xl text-charcoal mb-3">
                  Free Shipping on Orders Above ₹999
                </h2>
                <p className="text-charcoal/70">
                  Enjoy complimentary shipping on all orders above ₹999 within India
                </p>
              </motion.div>

              {/* Shipping Rates */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <Package className="w-7 h-7 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">
                    Shipping Rates
                  </h2>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <table className="w-full text-sm">
                    <thead className="bg-royal-purple/5 text-charcoal">
                      <tr>
                        <th className="text-left py-4 px-6">Order Value</th>
                        <th className="text-left py-4 px-6">Standard</th>
                        <th className="text-left py-4 px-6">Express</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal/70">
                      <tr className="border-t border-charcoal/5">
                        <td className="py-4 px-6">Below ₹499</td>
                        <td className="py-4 px-6">₹79</td>
                        <td className="py-4 px-6">₹149</td>
                      </tr>
                      <tr className="border-t border-charcoal/5">
                        <td className="py-4 px-6">₹499 - ₹999</td>
                        <td className="py-4 px-6">₹49</td>
                        <td className="py-4 px-6">₹99</td>
                      </tr>
                      <tr className="border-t border-charcoal/5 font-medium text-charcoal">
                        <td className="py-4 px-6">Above ₹999</td>
                        <td className="py-4 px-6 text-green-600">FREE</td>
                        <td className="py-4 px-6">₹49</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>

              {/* Delivery Timeline */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <Clock className="w-7 h-7 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">
                    Delivery Timeline
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Standard Delivery",
                      points: [
                        "Metro Cities: 3-5 business days",
                        "Tier 2 Cities: 5-7 business days",
                        "Other Areas: 7-10 business days",
                      ],
                    },
                    {
                      title: "Express Delivery",
                      points: [
                        "Metro Cities: 1-2 business days",
                        "Tier 2 Cities: 2-3 business days",
                        "Other Areas: 3-5 business days",
                      ],
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <h3 className="font-serif text-lg text-charcoal mb-6">
                        {card.title}
                      </h3>

                      <ul className="space-y-4 text-charcoal/70">
                        {card.points.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Delivery Locations */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <MapPin className="w-7 h-7 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">
                    Delivery Locations
                  </h2>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-cream rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-charcoal/70">
                    {[
                      "Tamil Nadu",
                      "Karnataka",
                      "Kerala",
                      "Maharashtra",
                      "Delhi NCR",
                      "Punjab",
                      "Rajasthan",
                      "And more...",
                    ].map((location, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                        {location}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact */}
              <motion.div
                variants={fadeUp}
                className="text-center py-12 border-t border-charcoal/10"
              >
                <h2 className="font-serif text-2xl text-charcoal mb-4">
                  Questions About Shipping?
                </h2>

                <p className="text-charcoal/70 mb-6">
                  Contact our support team for any shipping-related queries.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 text-royal-purple font-medium">
                  <a
                    href="mailto:zprincessaffron07@gmail.com"
                    className="hover:text-gold transition-colors"
                  >
                    zprincessaffron07@gmail.com
                  </a>

                  <a
                    href="tel:+917200150588"
                    className="hover:text-gold transition-colors"
                  >
                    +91 72001 50588
                  </a>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Shipping;
