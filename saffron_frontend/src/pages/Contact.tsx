import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";


const contactInfo = [
  {
    icon: MapPin,
    label: "Our Office",
    value: "Chennai, India",
    subtext: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 72001 50588",
    subtext: null,
    link: "tel:+917200150588",
  },
  {
    icon: Mail,
    label: "Email",
    value: "zprincessaffron07@gmail.com",
    subtext: null,
    link: "mailto:zprincessaffron07@gmail.com",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday to Saturday",
    subtext: "9 AM to 6 PM",
  },
];

const topics = [
  "General Inquiry",
  "Bulk Orders",
  "Become a Retailer",
  "Product Quality",
  "Shipping & Delivery",
  "Other",
];

const contactMethods = [
  "Email",
  "Phone Call",
  "WhatsApp",
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    contactMethod: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      topic: "",
      contactMethod: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-royal-purple-dark to-royal-purple">
        <div className="container mx-auto px-6 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in font-medium" style={{ animationDelay: "0.1s" }}>
            Get In Touch
          </p>
          <h1 className="font-serif text-4xl md:text-4xl lg:text-6xl text-ivory mb-6 animate-fade-in font-medium" style={{ animationDelay: "0.2s" }}>
            Contact Us
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-ivory/80 max-w-2xl mx-auto text-lg leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Whether you're interested in bulk orders, becoming a retailer, or simply have questions about our saffron, we're here to help.
          </p>
        </div>
      </section>



      {/* Contact Cards */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-10">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="bg-card p-8  shadow-elegant text-center transition-all duration-500 hover:-translate-y-2"
              >
                <div className="inline-flex p-4  bg-gold/10 text-gold mb-4">
                  <info.icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {info.label}
                </p>
                {info.link ? (
                  <a
                    href={info.link}
                    className="font-serif text-lg text-royal-purple font-medium hover:text-gold transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="font-serif text-lg text-royal-purple font-medium">
                    {info.value}
                  </p>
                )}
                {info.subtext && (
                  <p className="text-sm text-muted-foreground mt-1">{info.subtext}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Form */}
      <section className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-4">
                Send a Message
              </h2>
              <div className="w-16 h-px bg-gold mx-auto" />
            </div>

            <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12 rounded-2xl shadow-elegant">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-border rounded-full focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-border rounded-full focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-border rounded-full focus:outline-none focus:border-gold transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What's on your mind?
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-border rounded-full focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  How should we get back to you?
                </label>
                <div className="flex flex-wrap gap-3">
                  {contactMethods.map((method) => (
                    <Button variant="royal"
  key={method}
  type="button"
  onClick={() => setFormData({ ...formData, contactMethod: method })}
  className={`min-w-[10] h-10 ${
    formData.contactMethod === method
      ? "bg-royal-purple text-ivory"
      : ""
  }`}
>
  {method}
</Button>

                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-ivory border border-border rounded-2xl focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
 {/* Submit Button */}
<div className="flex justify-center mt-6">
  <Button variant="royal"
  type="submit"
  disabled={isSubmitting}
  className="min-w-[220px]"
>
  <span className="flex items-center gap-3">
    {isSubmitting ? (
      <>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Sending...
      </>
    ) : (
      <>
        <Send className="w-4 h-4" />
        Send Message
      </>
    )}
  </span>
</Button>

</div>

</div>

            </form>

            {/* WhatsApp CTA */}
<div className="mt-8 flex flex-col items-center text-center">
  <p className="text-muted-foreground mb-4">
    Prefer instant messaging?
  </p>

  <a
  href="https://wa.me/917200150588"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="white" className="min-w-[220px]">
    <span className="flex items-center gap-3">
      <MessageCircle className="w-4 h-4" />
      Chat on WhatsApp
    </span>
  </Button>
</a>

</div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
