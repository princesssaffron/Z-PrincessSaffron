import Layout from "@/components/layout/Layout";
import { FileText, ShoppingBag, CreditCard, Truck, AlertCircle, Scale } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory">
        {/* Hero Section */}
        <section className="bg-royal-purple-dark text-ivory py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <FileText className="w-16 h-16 text-gold mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Terms & Conditions</h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
              <p className="text-ivory/70">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none">
                <p className="text-charcoal/80 leading-relaxed">
                  Welcome to Z Princess Saffron. By accessing our website and placing orders, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.
                </p>
                <div className="bg-cream rounded-xl p-6 mt-6">
                  <p className="text-sm text-charcoal/70">
                    <strong>Company Details:</strong> Z Princess Saffron is a project of HeyRam Infrastructure<br />
                    FSSAI License: 12423008002367 | GSTIN: 33ABFA6551N1ZZ | MSME UAN: TN-02-0006511
                  </p>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-10">
                <TermsSection
                  icon={<ShoppingBag className="w-6 h-6" />}
                  title="Orders & Products"
                  items={[
                    {
                      subtitle: "Product Information",
                      content: "We strive to display accurate product descriptions, images, and prices. However, we reserve the right to correct any errors and update information without prior notice."
                    },
                    {
                      subtitle: "Order Acceptance",
                      content: "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for reasons including suspected fraud, unauthorized transactions, or product unavailability."
                    },
                    {
                      subtitle: "Product Authenticity",
                      content: "All our saffron products are 100% authentic Kashmiri saffron. We guarantee the purity and quality of our products as certified by FSSAI."
                    },
                    {
                      subtitle: "Pricing",
                      content: "All prices are in Indian Rupees (INR) and include applicable taxes unless otherwise stated. We reserve the right to modify prices without prior notice."
                    }
                  ]}
                />

                <TermsSection
                  icon={<CreditCard className="w-6 h-6" />}
                  title="Payment Terms"
                  items={[
                    {
                      subtitle: "Payment Methods",
                      content: "We accept payments via Credit/Debit Cards (Visa, Mastercard), UPI, Net Banking, and Cash on Delivery (COD) for eligible orders."
                    },
                    {
                      subtitle: "Payment Security",
                      content: "All online payments are processed through secure, encrypted payment gateways. We do not store your complete card details on our servers."
                    },
                    {
                      subtitle: "COD Orders",
                      content: "Cash on Delivery is available for orders within India. COD orders may have additional verification requirements."
                    }
                  ]}
                />

                <TermsSection
                  icon={<Truck className="w-6 h-6" />}
                  title="Shipping & Delivery"
                  items={[
                    {
                      subtitle: "Delivery Timeline",
                      content: "Standard delivery takes 5-7 business days within India. Express shipping options may be available for select locations."
                    },
                    {
                      subtitle: "Shipping Charges",
                      content: "Free shipping on orders above ₹999. Standard shipping charges apply for orders below this threshold."
                    },
                    {
                      subtitle: "Delivery Responsibility",
                      content: "Risk of loss and title for products pass to you upon delivery. Please inspect packages upon receipt and report any damage immediately."
                    }
                  ]}
                />

                <TermsSection
                  icon={<AlertCircle className="w-6 h-6" />}
                  title="User Responsibilities"
                  items={[
                    {
                      subtitle: "Account Security",
                      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account."
                    },
                    {
                      subtitle: "Accurate Information",
                      content: "You agree to provide accurate, current, and complete information during registration and checkout processes."
                    },
                    {
                      subtitle: "Prohibited Activities",
                      content: "You may not use our website for any unlawful purpose, to solicit illegal activities, or to violate any regulations or laws."
                    }
                  ]}
                />

                <TermsSection
                  icon={<Scale className="w-6 h-6" />}
                  title="Legal & Liability"
                  items={[
                    {
                      subtitle: "Limitation of Liability",
                      content: "Z Princess Saffron shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services."
                    },
                    {
                      subtitle: "Intellectual Property",
                      content: "All content on this website including logos, images, and text is the property of Z Princess Saffron and is protected by copyright laws."
                    },
                    {
                      subtitle: "Governing Law",
                      content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Chennai, Tamil Nadu."
                    },
                    {
                      subtitle: "Modifications",
                      content: "We reserve the right to modify these terms at any time. Continued use of our website after changes constitutes acceptance of the new terms."
                    }
                  ]}
                />
              </div>

              {/* Contact */}
              <div className="text-center py-8 border-t border-charcoal/10">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Questions?</h2>
                <p className="text-charcoal/70 mb-4">
                  For any questions regarding these terms, please contact us:
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

const TermsSection = ({ 
  icon, 
  title, 
  items 
}: { 
  icon: React.ReactNode; 
  title: string; 
  items: { subtitle: string; content: string }[];
}) => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
        {icon}
      </div>
      <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
    </div>
    <div className="space-y-6 pl-15">
      {items.map((item, index) => (
        <div key={index}>
          <h3 className="font-medium text-charcoal mb-2">{item.subtitle}</h3>
          <p className="text-charcoal/70">{item.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Terms;
