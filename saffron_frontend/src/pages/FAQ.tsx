import Layout from "@/components/layout/Layout";
import {
  HelpCircle,
  Package,
  Truck,
  CreditCard,
  Leaf,
  Gift,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

/* ================= FAQ DATA ================= */

const faqCategories = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "About Our Saffron",
    faqs: [
      {
        question: "What makes Kashmiri saffron different?",
        answer:
          "Kashmiri saffron is known for its deep crimson color, intense aroma, and high crocin content. It is grown in Pampore at high altitude, giving it superior quality.",
      },
      {
        question: "How can I verify authenticity?",
        answer:
          "All our products are FSSAI certified and GI tagged. Genuine saffron releases color slowly in warm water and retains its thread shape.",
      },
      {
        question: "What is the shelf life?",
        answer:
          "When stored in an airtight container away from light and moisture, saffron retains quality for 2–3 years.",
      },
    ],
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Orders & Products",
    faqs: [
      {
        question: "How do I place an order?",
        answer:
          "Browse products, add to cart, and proceed to checkout. You may create an account or checkout as guest.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be cancelled within 24 hours if not shipped. Contact us immediately for assistance.",
      },
    ],
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Shipping & Delivery",
    faqs: [
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 5–7 business days. Metro cities may receive orders within 3–5 days.",
      },
      {
        question: "How can I track my order?",
        answer:
          "You’ll receive tracking details via email/SMS after shipment. You can also track via your account dashboard.",
      },
    ],
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment",
    faqs: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes. We use SSL encryption and PCI-compliant payment gateways for secure transactions.",
      },
    ],
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Gifting",
    faqs: [
      {
        question: "Do you offer gift packaging?",
        answer:
          "Yes. We provide elegant gift boxes and personalized message options.",
      },
    ],
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "Returns are accepted within 7 days for damaged or defective products in original packaging.",
      },
    ],
  },
];

/* ================= COMPONENT ================= */

const FAQ = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory">

        {/* ================= HERO ================= */}
        <section className="bg-royal-purple-dark text-ivory py-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-6"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <HelpCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl mb-6 tracking-wide">
                Frequently Asked Questions
              </h1>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

              <p className="text-ivory/70">
                Everything you need to know about our products and services
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================= FAQ CONTENT ================= */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-4xl mx-auto space-y-16"
            >

              {faqCategories.map((category, categoryIndex) => (
                <motion.div key={categoryIndex} variants={fadeUp}>

                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8 group">
                    <div className="w-14 h-14 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple group-hover:scale-110 transition duration-500">
                      {category.icon}
                    </div>
                    <h2 className="font-serif text-2xl text-charcoal tracking-wide">
                      {category.title}
                    </h2>
                  </div>

                  {/* Accordion */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <motion.div
                        key={faqIndex}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AccordionItem
                          value={`${categoryIndex}-${faqIndex}`}
                          className="bg-white rounded-2xl px-6 border border-royal-purple/5 shadow-sm hover:shadow-lg transition-all duration-500"
                        >
                          <AccordionTrigger className="text-left text-charcoal hover:text-royal-purple hover:no-underline py-6 text-base font-medium tracking-wide transition">
                            {faq.question}
                          </AccordionTrigger>

                          <AccordionContent className="text-charcoal/70 pb-6 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>

                </motion.div>
              ))}

              {/* ================= CTA ================= */}
              <motion.div
                variants={fadeUp}
                className="bg-gradient-to-r from-royal-purple to-royal-purple-dark rounded-3xl p-10 text-center text-ivory relative overflow-hidden"
              >
                {/* Glow Animation */}
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
                  <h2 className="font-serif text-2xl mb-4 tracking-wide">
                    Still Have Questions?
                  </h2>

                  <p className="text-ivory/70 mb-8">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      href="mailto:zprincessaffron07@gmail.com"
                      className="bg-gold text-charcoal px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300"
                    >
                      Email Us
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      href="https://wa.me/917200150588"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 text-ivory px-8 py-3 rounded-full font-medium tracking-wide hover:bg-white/20 transition-all duration-300"
                    >
                      WhatsApp Chat
                    </motion.a>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default FAQ;
