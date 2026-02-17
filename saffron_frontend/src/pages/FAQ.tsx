import Layout from "@/components/layout/Layout";
import { HelpCircle, Package, Truck, CreditCard, Leaf, Gift, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "About Our Saffron",
    faqs: [
      {
        question: "What makes Kashmiri saffron different from other saffron?",
        answer: "Kashmiri saffron, also known as 'Mongra' or 'Lacha' saffron, is renowned for its deep crimson color, unique aroma, and superior flavor. It's grown in the Pampore region of Kashmir at high altitudes, which contributes to its exceptional quality. Our saffron has the highest crocin content (coloring strength) and safranal (aroma) compared to other varieties."
      },
      {
        question: "How can I verify the authenticity of your saffron?",
        answer: "All our products come with FSSAI certification (License: 12423008002367) and are GI (Geographical Indication) tagged. You can perform simple tests: genuine saffron releases color slowly in water, doesn't dissolve completely, and has a distinct honey-like smell. We also provide a Certificate of Authenticity with every purchase."
      },
      {
        question: "What is the shelf life of saffron?",
        answer: "When stored properly in an airtight container away from light and moisture, our saffron can retain its quality for 2-3 years. However, for the best flavor and aroma, we recommend using it within 1 year of purchase."
      },
      {
        question: "How much saffron should I use?",
        answer: "A little goes a long way! For most recipes, 8-12 strands (about a pinch) are sufficient for 4 servings. For beverages like saffron milk, 3-5 strands per cup is ideal. Always soak saffron in warm (not boiling) water or milk for 15-20 minutes before use to release its full flavor."
      }
    ]
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: "Orders & Products",
    faqs: [
      {
        question: "What products do you offer?",
        answer: "We offer premium Kashmiri saffron in various quantities: 1g, 2g, 5g, and 10g packages. We also have special gift boxes perfect for weddings, festivals, and corporate gifting. All products are carefully packaged to preserve freshness and quality."
      },
      {
        question: "How do I place an order?",
        answer: "Simply browse our products, add items to your cart, and proceed to checkout. You can create an account for faster checkout and order tracking, or checkout as a guest. We accept multiple payment methods for your convenience."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can cancel your order within 24 hours of placing it, provided it hasn't been shipped. To modify or cancel, contact us immediately at zprincessaffron07@gmail.com or call +91 72001 50588."
      },
      {
        question: "Do you offer bulk orders for businesses?",
        answer: "Yes! We offer corporate and bulk pricing for restaurants, hotels, caterers, and businesses. Contact us at zprincessaffron07@gmail.com for custom quotes and wholesale inquiries."
      }
    ]
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Shipping & Delivery",
    faqs: [
      {
        question: "What are the shipping charges?",
        answer: "We offer FREE shipping on all orders above ₹999 within India. For orders below ₹999, a flat shipping fee of ₹49 applies. Express shipping is available at additional cost for select locations."
      },
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 5-7 business days for most locations in India. Metro cities typically receive orders within 3-5 business days. Express delivery (where available) ensures delivery within 2-3 business days."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within India only. We're working on expanding to international shipping soon. Sign up for our newsletter to be notified when international shipping becomes available."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the 'My Orders' section."
      }
    ]
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Credit Cards (Visa, Mastercard, Amex), Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for orders within India."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use industry-standard SSL encryption and partner with trusted payment gateways. We never store your complete card details on our servers. All transactions are PCI-DSS compliant."
      },
      {
        question: "Do you offer EMI options?",
        answer: "Yes, we offer EMI options for orders above ₹3,000 on select credit cards. EMI options will be displayed at checkout if your order is eligible."
      },
      {
        question: "Can I get a GST invoice?",
        answer: "Yes, we provide GST invoices for all orders. Our GSTIN is 33ABFA6551N1ZZ. Please ensure you enter your GST details during checkout if you need a GST invoice."
      }
    ]
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Gifting",
    faqs: [
      {
        question: "Do you offer gift packaging?",
        answer: "Yes! Our premium gift boxes come in elegant packaging perfect for any occasion. You can also add a personalized message card. Gift wrapping is available at an additional ₹99 for regular products."
      },
      {
        question: "Can I send gifts to someone else?",
        answer: "Absolutely! During checkout, you can enter a different shipping address. Select the 'Gift' option to ensure the package is beautifully wrapped and includes your personalized message without any pricing information."
      },
      {
        question: "Do you offer corporate gifting solutions?",
        answer: "Yes, we specialize in corporate gifting. We offer bulk discounts, custom branding options, and personalized packaging for corporate orders. Contact us for a customized quote."
      }
    ]
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Returns & Refunds",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We accept returns within 7 days of delivery for damaged, defective, or incorrect products. The product must be unused and in its original packaging. Please refer to our detailed Refund Policy for more information."
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Once we receive and inspect the returned product, refunds are processed within 3-5 business days. The amount will be credited to your original payment method within 5-10 additional business days depending on your bank."
      },
      {
        question: "What if I receive a damaged product?",
        answer: "Contact us immediately with photos of the damaged product and packaging. We'll arrange a replacement or full refund at no extra cost. Please do not dispose of the damaged items until the claim is resolved."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory">
        {/* Hero Section */}
        <section className="bg-royal-purple-dark text-ivory py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <HelpCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
              <p className="text-ivory/70">
                Everything you need to know about our products and services
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
                      {category.icon}
                    </div>
                    <h2 className="font-serif text-2xl text-charcoal">{category.title}</h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="bg-white rounded-xl px-6 border-none shadow-sm"
                      >
                        <AccordionTrigger className="text-left text-charcoal hover:text-royal-purple hover:no-underline py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-charcoal/70 pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {/* Still Have Questions */}
              <div className="bg-gradient-to-r from-royal-purple to-royal-purple-dark rounded-2xl p-8 text-center text-ivory">
                <h2 className="font-serif text-2xl mb-4">Still Have Questions?</h2>
                <p className="text-ivory/70 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="mailto:zprincessaffron07@gmail.com" 
                    className="bg-gold text-charcoal px-6 py-3 rounded-full font-medium hover:bg-gold/90 transition-colors"
                  >
                    Email Us
                  </a>
                  <a 
                    href="https://wa.me/917200150588" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 text-ivory px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;
