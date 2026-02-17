import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import productJar from "@/assets/product-saffron-jar.jpg";
import giftBox from "@/assets/product-gift-box.jpg";

const products = [
  {
    id: 1,
    name: "Royal Saffron Threads",
    price: "₹4,999",
    image: productJar,
    tag: "Best Seller",
    description:
      "Hand-harvested from the pristine valleys of Kashmir, delivering deep aroma, rich crimson color, and unmatched purity in every strand.",
  },
  {
    id: 2,
    name: "Premium Gift Collection",
    price: "₹12,999",
    image: giftBox,
    tag: "Gift Set",
    description:
      "An exquisite presentation of our finest saffron, thoughtfully curated for luxurious gifting and unforgettable impressions.",
  },
];

const ProductShowcase = () => {
  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Curated Excellence
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6">
            Discover Our Products
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            Each strand of saffron is a symbol of luxury, purity, and authenticity—sourced directly from the highlands of Kashmir.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-9xl mx-auto mb-20">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative overflow-hidden bg-card rounded-2xl shadow-card transition-all duration-700 hover:shadow-elegant hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-1.5 bg-gold text-royal-purple-dark text-xs font-semibold tracking-wider uppercase rounded-full">
                  {product.tag}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-[420px] md:h-[800px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <h3 className="font-serif text-2xl md:text-3xl text-royal-purple mb-2 group-hover:text-gold transition-colors">
                  {product.name}
                </h3>

                <p className="font-sans text-xl md:text-2xl font-semibold text-gold mb-4">
                  {product.price}
                </p>

                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                  {product.description}
                </p>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

       {/* View All Button */}
<div className="text-center">
  <Link
    to="/products"
    className="group relative inline-flex items-center gap-2 px-6 py-2.5 border border-royal-purple/40 bg-transparent text-royal-purple font-sans text-sm tracking-[0.18em] uppercase overflow-hidden transition-all duration-500 rounded-full hover:shadow-gold-glow"
  >
    <span className="relative z-10 transition-colors duration-500 group-hover:text-royal-purple-dark">
      View All Products
    </span>

    <ArrowRight className="relative z-10 w-4 h-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-royal-purple-dark" />

    {/* Gold Fill Animation */}
    <div className="absolute inset-0 bg-[#E6C76A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </Link>
</div>

      </div>
    </section>
  );
};

export default ProductShowcase;
