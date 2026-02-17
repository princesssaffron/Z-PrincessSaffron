import Layout from "@/components/layout/Layout";
import { Shield, Lock, Eye, Database, Mail, Clock } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-ivory">
        {/* Hero Section */}
        <section className="bg-royal-purple-dark text-ivory py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
              <h1 className="font-serif text-4xl md:text-5xl mb-4">Privacy Policy</h1>
              
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
                  At Z Princess Saffron, a project of HeyRam Infrastructure, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-10">
                <PolicySection
                  icon={<Database className="w-6 h-6" />}
                  title="Information We Collect"
                  content={[
                    "Personal Information: Name, email address, phone number, shipping address, and billing information when you make a purchase.",
                    "Account Information: Login credentials and profile details when you create an account.",
                    "Transaction Data: Order history, payment details (processed securely through our payment partners), and delivery preferences.",
                    "Usage Data: Browser type, IP address, pages visited, and interaction with our website for analytics purposes.",
                    "Communication Data: Messages, feedback, and correspondence you send to us."
                  ]}
                />

                <PolicySection
                  icon={<Eye className="w-6 h-6" />}
                  title="How We Use Your Information"
                  content={[
                    "Process and fulfill your orders, including shipping and delivery.",
                    "Send order confirmations, updates, and tracking information.",
                    "Respond to your inquiries and provide customer support.",
                    "Improve our website, products, and services based on your feedback.",
                    "Send promotional communications (with your consent) about new products and offers.",
                    "Prevent fraud and ensure the security of transactions."
                  ]}
                />

                <PolicySection
                  icon={<Lock className="w-6 h-6" />}
                  title="Data Security"
                  content={[
                    "We implement industry-standard security measures including SSL encryption for all data transmission.",
                    "Payment information is processed through secure, PCI-compliant payment gateways.",
                    "Access to personal data is restricted to authorized personnel only.",
                    "We regularly review and update our security practices to protect against unauthorized access.",
                    "We do not store complete credit card information on our servers."
                  ]}
                />

                <PolicySection
                  icon={<Mail className="w-6 h-6" />}
                  title="Information Sharing"
                  content={[
                    "We do not sell, trade, or rent your personal information to third parties.",
                    "We may share data with trusted service providers (shipping partners, payment processors) to fulfill orders.",
                    "We may disclose information if required by law or to protect our legal rights.",
                    "In case of a business merger or acquisition, customer data may be transferred with appropriate safeguards."
                  ]}
                />

                <PolicySection
                  icon={<Clock className="w-6 h-6" />}
                  title="Data Retention"
                  content={[
                    "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy.",
                    "Order records are kept for accounting and legal compliance purposes.",
                    "You may request deletion of your account and associated data at any time.",
                    "Some information may be retained in anonymized form for analytics purposes."
                  ]}
                />
              </div>

              {/* Your Rights */}
              <div className="bg-cream rounded-2xl p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Your Rights</h2>
                <ul className="space-y-3 text-charcoal/80">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <span>Access and receive a copy of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <span>Correct any inaccurate information we hold about you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <span>Request deletion of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <span>Opt-out of marketing communications at any time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2" />
                    <span>Lodge a complaint with relevant data protection authorities</span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="text-center py-8 border-t border-charcoal/10">
                <h2 className="font-serif text-2xl text-charcoal mb-4">Questions About Privacy?</h2>
                <p className="text-charcoal/70 mb-4">
                  Contact our Data Protection Officer at:
                </p>
                <a 
                  href="mailto:zprincessaffron07@gmail.com" 
                  className="text-royal-purple hover:text-gold transition-colors font-medium"
                >
                  zprincessaffron07@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const PolicySection = ({ 
  icon, 
  title, 
  content 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string[];
}) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple">
        {icon}
      </div>
      <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
    </div>
    <ul className="space-y-3 text-charcoal/80 pl-15">
      {content.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2.5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Privacy;
