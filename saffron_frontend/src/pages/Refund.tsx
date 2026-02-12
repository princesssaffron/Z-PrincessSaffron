import Layout from "@/components/layout/Layout";
import { RotateCcw, Package, Clock, CheckCircle, XCircle, HelpCircle } from "lucide-react";

const Refund = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory">
        {/* Hero Section */}
        <section className="bg-royal-purple-dark text-ivory py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <RotateCcw className="w-16 h-16 text-gold mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Refund Policy</h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
              <p className="text-ivory/70">
                Your satisfaction is our priority
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Overview */}
              <div className="bg-gradient-to-r from-royal-purple/5 to-gold/5 rounded-2xl p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Our Commitment</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  At Z Princess Saffron, we take immense pride in the quality of our products. We understand that purchasing premium saffron is an investment, and we want you to be completely satisfied with your purchase. If for any reason you're not happy, we're here to help.
                </p>
              </div>

              {/* Refund Timeline */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-6 text-center">Refund Process Timeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { day: "Day 1-2", title: "Request Received", desc: "We acknowledge your refund request" },
                    { day: "Day 3-5", title: "Review", desc: "Our team reviews your case" },
                    { day: "Day 6-7", title: "Processing", desc: "Refund is processed" },
                    { day: "Day 8-14", title: "Credited", desc: "Amount reflects in your account" }
                  ].map((step, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                      <div className="text-gold font-medium text-sm mb-2">{step.day}</div>
                      <h3 className="font-serif text-lg text-charcoal mb-1">{step.title}</h3>
                      <p className="text-charcoal/60 text-sm">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligible & Non-Eligible */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <h2 className="font-serif text-xl text-charcoal">Eligible for Refund</h2>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Damaged or broken seal upon delivery",
                      "Wrong product delivered",
                      "Quality issues with the saffron",
                      "Missing items from your order",
                      "Expired products (check expiry date)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-charcoal/80">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <XCircle className="w-8 h-8 text-red-500" />
                    <h2 className="font-serif text-xl text-charcoal">Not Eligible for Refund</h2>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Products opened or used after delivery",
                      "Requests made after 7 days of delivery",
                      "Change of mind after purchase",
                      "Products damaged due to improper storage",
                      "Promotional or heavily discounted items"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-charcoal/80">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Return Process */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-8 h-8 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">How to Request a Return</h2>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Contact Us",
                      content: "Email us at zprincessaffron07@gmail.com or call +91 72001 50588 within 7 days of delivery with your order number and reason for return."
                    },
                    {
                      step: "2",
                      title: "Provide Evidence",
                      content: "Share clear photos or videos showing the issue with the product. This helps us process your request faster."
                    },
                    {
                      step: "3",
                      title: "Ship the Product",
                      content: "Once approved, we'll provide return shipping instructions. Pack the product securely in its original packaging if possible."
                    },
                    {
                      step: "4",
                      title: "Receive Refund",
                      content: "After inspection, your refund will be processed to the original payment method within 7-14 business days."
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 bg-royal-purple text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-medium text-charcoal mb-1">{item.title}</h3>
                        <p className="text-charcoal/70">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refund Methods */}
              <div className="bg-cream rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-gold" />
                  <h2 className="font-serif text-xl text-charcoal">Refund Methods & Timeline</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-charcoal/10">
                        <th className="text-left py-3 font-medium text-charcoal">Payment Method</th>
                        <th className="text-left py-3 font-medium text-charcoal">Refund Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal/70">
                      <tr className="border-b border-charcoal/5">
                        <td className="py-3">Credit/Debit Card</td>
                        <td className="py-3">5-7 business days</td>
                      </tr>
                      <tr className="border-b border-charcoal/5">
                        <td className="py-3">UPI</td>
                        <td className="py-3">3-5 business days</td>
                      </tr>
                      <tr className="border-b border-charcoal/5">
                        <td className="py-3">Net Banking</td>
                        <td className="py-3">5-7 business days</td>
                      </tr>
                      <tr>
                        <td className="py-3">Cash on Delivery</td>
                        <td className="py-3">Bank transfer within 7-10 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-8 h-8 text-royal-purple" />
                  <h2 className="font-serif text-2xl text-charcoal">Common Questions</h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      q: "Can I exchange my product instead of a refund?",
                      a: "Yes! We offer exchanges for the same or different products based on availability."
                    },
                    {
                      q: "Who pays for return shipping?",
                      a: "If the return is due to our error (wrong/damaged product), we cover return shipping. For other reasons, shipping is at customer's expense."
                    },
                    {
                      q: "What if my refund is delayed?",
                      a: "Contact us with your order details. Delays may occur due to bank processing times, but we'll help track your refund."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="font-medium text-charcoal mb-2">{faq.q}</h3>
                      <p className="text-charcoal/70">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="text-center py-8 border-t border-charcoal/10">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Need Help with a Refund?</h2>
                <p className="text-charcoal/70 mb-4">
                  Our customer support team is here to assist you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="mailto:zprincessaffron07@gmail.com" 
                    className="text-royal-purple hover:text-gold transition-colors font-medium"
                  >
                    zprincessaffron07@gmail.com
                  </a>
                  <span className="hidden sm:block text-charcoal/30">|</span>
                  <a 
                    href="tel:+917200150588" 
                    className="text-royal-purple hover:text-gold transition-colors font-medium"
                  >
                    +91 72001 50588
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

export default Refund;
