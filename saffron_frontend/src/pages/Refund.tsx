import Layout from "@/components/layout/Layout";
import {
  RotateCcw,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { motion, easeInOut } from "framer-motion";

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
    transition: { duration: 0.8, ease: easeInOut },
  },
};

const Refund = () => {
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
                <RotateCcw className="w-16 h-16 text-gold mx-auto mb-6" />
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl mb-6 tracking-wide">
                Refund Policy
              </h1>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

              <p className="text-ivory/70">
                Your satisfaction is our priority
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

              {/* Commitment */}
              <motion.div
                variants={fadeUp}
                className="bg-gradient-to-r from-royal-purple/5 to-gold/5 rounded-3xl p-10 relative overflow-hidden"
              >
                <motion.div
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-0 bg-gold blur-3xl"
                />
                <div className="relative z-10">
                  <h2 className="font-serif text-2xl text-charcoal mb-4 text-center">
                    Our Commitment
                  </h2>
                  <p className="text-charcoal/80 leading-relaxed text-center max-w-3xl mx-auto">
                    We take immense pride in our premium saffron quality.
                    If you’re not satisfied for any valid reason,
                    we are here to make it right.
                  </p>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-2xl text-charcoal mb-10 text-center">
                  Refund Process Timeline
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { day: "Day 1-2", title: "Request Received" },
                    { day: "Day 3-5", title: "Review" },
                    { day: "Day 6-7", title: "Processing" },
                    { day: "Day 8-14", title: "Credited" },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="text-gold font-medium text-sm mb-2">
                        {step.day}
                      </div>
                      <h3 className="font-serif text-lg text-charcoal">
                        {step.title}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Eligible / Not Eligible */}
              <motion.div
                variants={fadeUp}
                className="grid md:grid-cols-2 gap-10"
              >
                <PolicyCard
                  title="Eligible for Refund"
                  icon={<CheckCircle className="w-7 h-7 text-green-600" />}
                  items={[
                    "Damaged product on delivery",
                    "Wrong item delivered",
                    "Quality issues",
                    "Missing items",
                  ]}
                />

                <PolicyCard
                  title="Not Eligible"
                  icon={<XCircle className="w-7 h-7 text-red-500" />}
                  items={[
                    "Opened or used products",
                    "Requests after 7 days",
                    "Change of mind",
                    "Improper storage damage",
                  ]}
                />
              </motion.div>

              {/* Return Steps */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <Package className="w-8 h-8 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">
                    How to Request a Return
                  </h2>
                </div>

                <div className="space-y-8 max-w-3xl mx-auto">
                  {[
                    "Contact us within 7 days with order details.",
                    "Provide clear photo/video proof.",
                    "Ship product securely after approval.",
                    "Refund processed after inspection.",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex gap-5"
                    >
                      <div className="w-10 h-10 bg-royal-purple text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="text-charcoal/80">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Refund Methods */}
              <motion.div
                variants={fadeUp}
                className="bg-cream rounded-3xl p-10"
              >
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <Clock className="w-7 h-7 text-gold" />
                  <h2 className="font-serif text-xl text-charcoal">
                    Refund Timelines
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-charcoal/80">
                  <div>Credit/Debit Card — 5-7 business days</div>
                  <div>UPI — 3-5 business days</div>
                  <div>Net Banking — 5-7 business days</div>
                  <div>COD — 7-10 business days (Bank Transfer)</div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <HelpCircle className="w-8 h-8 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">
                    Common Questions
                  </h2>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                  {[
                    "Yes, exchanges are available based on stock.",
                    "Return shipping covered if product error is ours.",
                    "Contact us if refund seems delayed.",
                  ].map((answer, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <p className="text-charcoal/80">{answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                variants={fadeUp}
                className="text-center py-12 border-t border-charcoal/10"
              >
                <h2 className="font-serif text-2xl text-charcoal mb-4">
                  Need Help with a Refund?
                </h2>

                <p className="text-charcoal/70 mb-6">
                  Our support team is ready to assist you.
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

/* ================= POLICY CARD ================= */

const PolicyCard = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
  >
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="font-serif text-xl text-charcoal">{title}</h2>
    </div>

    <ul className="space-y-3 text-charcoal/80">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3"
        >
          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 flex-shrink-0" />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default Refund;
