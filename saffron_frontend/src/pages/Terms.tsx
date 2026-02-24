import Layout from "@/components/layout/Layout";
import {
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  AlertCircle,
  Scale,
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

const Terms = () => {
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
                <FileText className="w-16 h-16 text-gold mx-auto mb-6" />
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl mb-6 tracking-wide">
                Terms & Conditions
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
              className="max-w-5xl mx-auto space-y-16"
            >

              {/* Introduction */}
              <motion.div variants={fadeUp}>
                <p className="text-charcoal/80 leading-relaxed text-lg">
                  Welcome to Z Princess Saffron. By accessing our website and placing orders,
                  you agree to be bound by these Terms and Conditions.
                </p>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-cream rounded-2xl p-8 mt-8 shadow-sm hover:shadow-lg transition-all duration-500"
                >
                  <p className="text-sm text-charcoal/70">
                    <strong>Company Details:</strong><br />
                    Z Princess Saffron – A project of HeyRam Infrastructure<br />
                    FSSAI: 12423008002367 | GSTIN: 33ABFA6551N1ZZ
                  </p>
                </motion.div>
              </motion.div>

              {/* Sections */}
              <TermsSection
                icon={<ShoppingBag className="w-6 h-6" />}
                title="Orders & Products"
                items={[
                  {
                    subtitle: "Product Information",
                    content:
                      "We strive to display accurate product descriptions and prices. We reserve the right to correct errors without prior notice.",
                  },
                  {
                    subtitle: "Order Acceptance",
                    content:
                      "All orders are subject to availability and approval. We may cancel orders in case of fraud or stock issues.",
                  },
                  {
                    subtitle: "Authenticity",
                    content:
                      "All saffron products are 100% authentic Kashmiri saffron certified by FSSAI.",
                  },
                ]}
              />

              <TermsSection
                icon={<CreditCard className="w-6 h-6" />}
                title="Payment Terms"
                items={[
                  {
                    subtitle: "Accepted Payments",
                    content:
                      "We accept Credit/Debit Cards, UPI, Net Banking, and COD for eligible orders.",
                  },
                  {
                    subtitle: "Security",
                    content:
                      "All payments are processed through encrypted gateways. We do not store card details.",
                  },
                ]}
              />

              <TermsSection
                icon={<Truck className="w-6 h-6" />}
                title="Shipping & Delivery"
                items={[
                  {
                    subtitle: "Delivery Timeline",
                    content:
                      "Standard delivery takes 5–7 business days within India.",
                  },
                  {
                    subtitle: "Shipping Charges",
                    content:
                      "Free shipping on orders above ₹999.",
                  },
                ]}
              />

              <TermsSection
                icon={<AlertCircle className="w-6 h-6" />}
                title="User Responsibilities"
                items={[
                  {
                    subtitle: "Account Security",
                    content:
                      "You are responsible for maintaining confidentiality of your login details.",
                  },
                  {
                    subtitle: "Accurate Information",
                    content:
                      "You agree to provide correct and updated information.",
                  },
                ]}
              />

              <TermsSection
                icon={<Scale className="w-6 h-6" />}
                title="Legal & Liability"
                items={[
                  {
                    subtitle: "Limitation of Liability",
                    content:
                      "We are not liable for indirect or consequential damages.",
                  },
                  {
                    subtitle: "Governing Law",
                    content:
                      "These terms are governed by Indian law under Chennai jurisdiction.",
                  },
                ]}
              />

              {/* Contact */}
              <motion.div
                variants={fadeUp}
                className="text-center py-12 border-t border-charcoal/10"
              >
                <h2 className="font-serif text-2xl text-charcoal mb-4">
                  Questions?
                </h2>

                <p className="text-charcoal/70 mb-6">
                  For any clarification regarding these terms:
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

/* ================= TERMS SECTION COMPONENT ================= */

const TermsSection = ({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { subtitle: string; content: string }[];
}) => (
  <motion.div variants={fadeUp}>
    <div className="flex items-center gap-3 mb-8 justify-center">
      <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
        {icon}
      </div>
      <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
    </div>

    <div className="space-y-8 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500"
        >
          <h3 className="font-medium text-charcoal mb-2">
            {item.subtitle}
          </h3>
          <p className="text-charcoal/70">
            {item.content}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Terms;
