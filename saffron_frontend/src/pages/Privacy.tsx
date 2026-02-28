import Layout from "@/components/layout/Layout";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

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
    transition: { duration: 0.8, ease: "easeInOut" as const },
  },
};

/* ================= COMPONENT ================= */

const Privacy = () => {
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
                <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
              </motion.div>

              <h1 className="font-cinzel text-4xl md:text-5xl mb-6 tracking-wide">
                Privacy Policy
              </h1>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

              <p className="text-ivory/70">
                Last updated: January 2025
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
              className="max-w-4xl mx-auto space-y-16"
            >

              {/* Introduction */}
              <motion.div variants={fadeUp}>
                <p className="text-charcoal/80 leading-relaxed text-lg text-center">
                  At Z Princess Saffron, we are committed to protecting your
                  privacy and ensuring the security of your personal
                  information. This policy explains how we collect, use,
                  and safeguard your data.
                </p>
              </motion.div>

              {/* Policy Sections */}
              <PolicySection
                icon={<Database className="w-6 h-6" />}
                title="Information We Collect"
                content={[
                  "Personal details including name, email, phone number, and address.",
                  "Account information such as login credentials and preferences.",
                  "Transaction data including order history and payment details.",
                  "Usage analytics including browser type and website interactions.",
                  "Customer support communication records.",
                ]}
              />

              <PolicySection
                icon={<Eye className="w-6 h-6" />}
                title="How We Use Your Information"
                content={[
                  "To process and deliver your orders.",
                  "To provide updates and tracking notifications.",
                  "To improve our website and customer experience.",
                  "To send promotional offers with your consent.",
                  "To prevent fraud and ensure transaction security.",
                ]}
              />

              <PolicySection
                icon={<Lock className="w-6 h-6" />}
                title="Data Security"
                content={[
                  "SSL encryption for secure data transmission.",
                  "PCI-compliant secure payment processing.",
                  "Restricted access to authorized personnel only.",
                  "Regular security audits and monitoring.",
                  "No storage of full credit card details on our servers.",
                ]}
              />

              <PolicySection
                icon={<Mail className="w-6 h-6" />}
                title="Information Sharing"
                content={[
                  "We do not sell or rent personal data.",
                  "Data may be shared with trusted shipping and payment partners.",
                  "Disclosure may occur if legally required.",
                  "Data transfer in case of merger with safeguards.",
                ]}
              />

              <PolicySection
                icon={<Clock className="w-6 h-6" />}
                title="Data Retention"
                content={[
                  "Information retained only as necessary.",
                  "Order data stored for accounting and compliance.",
                  "Users may request account deletion.",
                  "Anonymous data may be retained for analytics.",
                ]}
              />

              {/* Your Rights */}
              <motion.div
                variants={fadeUp}
                className="bg-cream rounded-3xl p-10 relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-gold blur-3xl"
                />

                <div className="relative z-10">
                  <h2 className="font-serif text-2xl text-charcoal mb-6 text-center">
                    Your Rights
                  </h2>

                  <ul className="space-y-4 text-charcoal/80 max-w-2xl mx-auto">
                    {[
                      "Access your personal data.",
                      "Correct inaccurate information.",
                      "Request deletion of your data.",
                      "Opt-out of marketing communications.",
                      "File complaints with authorities.",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-2 h-2 bg-gold rounded-full mt-2.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                variants={fadeUp}
                className="text-center py-12 border-t border-charcoal/10"
              >
                <h2 className="font-serif text-2xl text-charcoal mb-4">
                  Questions About Privacy?
                </h2>

                <p className="text-charcoal/70 mb-6">
                  Contact our Data Protection Officer:
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="mailto:zprincessaffron07@gmail.com"
                  className="text-royal-purple hover:text-gold transition-colors font-medium text-lg"
                >
                  zprincessaffron07@gmail.com
                </motion.a>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

/* ================= POLICY SECTION ================= */

const PolicySection = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string[];
}) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-3xl p-8 border border-royal-purple/5 shadow-sm hover:shadow-xl transition-all duration-500"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
        {icon}
      </div>
      <h2 className="font-serif text-2xl text-charcoal tracking-wide">
        {title}
      </h2>
    </div>

    <ul className="space-y-4 text-charcoal/80">
      {content.map((item, index) => (
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

export default Privacy;
