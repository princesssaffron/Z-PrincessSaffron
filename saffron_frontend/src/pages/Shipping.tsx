import Layout from "@/components/layout/Layout";
import { Truck, MapPin, Clock, Package, CheckCircle, IndianRupee } from "lucide-react";

const Shipping = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory">
        {/* Hero Section */}
        <section className="bg-royal-purple-dark text-ivory py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Truck className="w-16 h-16 text-gold mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Shipping Policy</h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
              <p className="text-ivory/70">
                Fast, secure delivery of premium saffron to your doorstep
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Free Shipping Banner */}
              <div className="bg-gradient-to-r from-gold/20 to-gold/5 rounded-2xl p-8 text-center">
                <IndianRupee className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="font-serif text-2xl text-charcoal mb-2">Free Shipping on Orders Above ₹999</h2>
                <p className="text-charcoal/70">
                  Enjoy complimentary shipping on all orders above ₹999 within India
                </p>
              </div>

              {/* Shipping Rates */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
                    <Package className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl text-charcoal">Shipping Rates</h2>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead className="bg-royal-purple/5">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-charcoal">Order Value</th>
                        <th className="text-left py-4 px-6 font-medium text-charcoal">Standard Shipping</th>
                        <th className="text-left py-4 px-6 font-medium text-charcoal">Express Shipping</th>
                      </tr>
                    </thead>
                    <tbody className="text-charcoal/70">
                      <tr className="border-b border-charcoal/5">
                        <td className="py-4 px-6">Below ₹499</td>
                        <td className="py-4 px-6">₹79</td>
                        <td className="py-4 px-6">₹149</td>
                      </tr>
                      <tr className="border-b border-charcoal/5">
                        <td className="py-4 px-6">₹499 - ₹999</td>
                        <td className="py-4 px-6">₹49</td>
                        <td className="py-4 px-6">₹99</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 font-medium text-charcoal">Above ₹999</td>
                        <td className="py-4 px-6 text-green-600 font-medium">FREE</td>
                        <td className="py-4 px-6">₹49</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl text-charcoal">Delivery Timeline</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-serif text-lg text-charcoal mb-4">Standard Delivery</h3>
                    <ul className="space-y-3 text-charcoal/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span><strong>Metro Cities:</strong> 3-5 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span><strong>Tier 2 Cities:</strong> 5-7 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span><strong>Other Areas:</strong> 7-10 business days</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-serif text-lg text-charcoal mb-4">Express Delivery</h3>
                    <ul className="space-y-3 text-charcoal/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                        <span><strong>Metro Cities:</strong> 1-2 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                        <span><strong>Tier 2 Cities:</strong> 2-3 business days</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                        <span><strong>Other Areas:</strong> 3-5 business days</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-sm text-charcoal/60 mt-4">
                  * Business days exclude Sundays and public holidays. Delivery times are estimates and may vary due to unforeseen circumstances.
                </p>
              </div>

              {/* Delivery Locations */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl text-charcoal">Delivery Locations</h2>
                </div>
                
                <div className="bg-cream rounded-2xl p-8">
                  <h3 className="font-medium text-charcoal mb-4">We Currently Ship To:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "All Metro Cities",
                      "Tamil Nadu",
                      "Karnataka",
                      "Kerala",
                      "Andhra Pradesh",
                      "Telangana",
                      "Maharashtra",
                      "Gujarat",
                      "Delhi NCR",
                      "Punjab",
                      "Rajasthan",
                      "West Bengal",
                      "Uttar Pradesh",
                      "Madhya Pradesh",
                      "Bihar",
                      "And more..."
                    ].map((location, index) => (
                      <div key={index} className="flex items-center gap-2 text-charcoal/70">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <span className="text-sm">{location}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-charcoal/60 mt-6">
                    We deliver to most PIN codes in India. Enter your PIN code at checkout to verify serviceability.
                  </p>
                </div>
              </div>

              {/* Order Processing */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-6">Order Processing</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Order Confirmation",
                      desc: "You'll receive an email and SMS confirmation immediately after placing your order."
                    },
                    {
                      title: "Processing Time",
                      desc: "Orders are processed within 24-48 hours (excluding Sundays and holidays). Orders placed after 2 PM may be processed the next business day."
                    },
                    {
                      title: "Dispatch Notification",
                      desc: "Once shipped, you'll receive tracking details via email and SMS to monitor your delivery."
                    },
                    {
                      title: "Delivery Attempt",
                      desc: "Our courier partners will make up to 3 delivery attempts. Please ensure someone is available to receive the package."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="font-medium text-charcoal mb-2">{item.title}</h3>
                      <p className="text-charcoal/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-royal-purple/5 rounded-2xl p-8">
                <h2 className="font-serif text-xl text-charcoal mb-4">Important Notes</h2>
                <ul className="space-y-3 text-charcoal/70">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-royal-purple rounded-full mt-2" />
                    <span>Deliveries to remote/inaccessible areas may take additional time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-royal-purple rounded-full mt-2" />
                    <span>For Cash on Delivery orders, please keep the exact amount ready.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-royal-purple rounded-full mt-2" />
                    <span>Check the package for any damage before accepting delivery.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-royal-purple rounded-full mt-2" />
                    <span>International shipping is not available at this time.</span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="text-center py-8 border-t border-charcoal/10">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Questions About Shipping?</h2>
                <p className="text-charcoal/70 mb-4">
                  Contact our customer support team for any shipping-related queries.
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

export default Shipping;
