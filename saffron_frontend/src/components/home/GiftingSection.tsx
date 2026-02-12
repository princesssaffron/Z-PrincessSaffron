import { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import giftBox from "@/assets/product-gift-box.jpg";

const GiftingSection = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = "ROYAL25";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-ivory relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-purple rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={giftBox}
                alt="Premium Gift Collection"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border-2 border-gold/20" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-gold rounded-full flex flex-col items-center justify-center shadow-gold-glow animate-pulse-gold z-10 border-4 border-ivory">
              <span className="text-royal-purple-dark text-xs font-bold uppercase tracking-wider">Save</span>
              <span className="text-royal-purple-dark text-3xl font-serif font-bold">25%</span>
            </div>
          </div>

          {/* Content */}
          <div className="pl-0 lg:pl-10">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-gold" />
              <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase">
                Premium Gifting
              </p>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6 leading-tight">
              Gift the Legacy of
              <span className="text-gold-gradient block">Kashmiri Gold</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Our luxury gift boxes are perfect for weddings, festivals, and special occasions. Each set comes in elegant packaging with a certificate of authenticity.
            </p>

            {/* Coupon Code */}
            <div className="bg-card p-6 rounded-2xl shadow-card mb-8">
              <p className="text-sm text-muted-foreground mb-3">Use code for exclusive discount:</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 px-6 py-3 bg-ivory-dark border-2 border-dashed border-gold rounded-2xl">
                  <span className="font-mono text-xl font-bold text-royal-purple tracking-widest">
                    {couponCode}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-4 py-3 bg-gold text-royal-purple-dark font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-gold flex items-center gap-2 rounded-full"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {["Free Gift Wrapping", "Certificate of Authenticity", "Express Delivery"].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-royal-purple/10 text-royal-purple text-sm font-medium rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftingSection;
