import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import productJar from "@/assets/product-saffron-jar.jpg";
import giftBox from "@/assets/product-gift-box.jpg";
import { useEffect, useState } from "react";
import { resolveProductImage } from "@/utils/imageUtils";
import { Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Royal Saffron Threads",
    price: "₹4,999",
    image: productJar,
    tag: "Best Seller",
    rating: 4.8,
    reviews: 124,
    description:
      "Hand-harvested from the pristine valleys of Kashmir, delivering deep aroma, rich crimson color, and unmatched purity in every strand.",
  },
  {
    id: 2,
    name: "Premium Gift Collection",
    price: "₹12,999",
    image: giftBox,
    tag: "Gift Set",
    rating: 4.9,
    reviews: 89,
    description:
      "An exquisite presentation of our finest saffron, thoughtfully curated for luxurious gifting and unforgettable impressions.",
  },
];

const ProductShowcase = () => {
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        setApiProducts(data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    const handleScroll = () => {
      setOffset(window.scrollY * 0.12);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayProducts = apiProducts.length > 0 ? apiProducts : products;

  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-6">

        {/* FLOATING HEADER */}
        <div
          style={{
            transform: `translateY(${-offset}px)`,
            transition: "transform 0.1s linear",
          }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <br />
          <br />

          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Curated Excellence
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6 font-medium">
            Experience Luxury
          </h2>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

          <p className="text-muted-foreground leading-relaxed font-rr text-[19px]">
            Each strand of saffron is a symbol of luxury, purity, and authenticity—sourced directly from the highlands of Kashmir.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="grid md:grid-cols-2 gap-12 max-w-9xl mx-auto mb-20">
          {isLoading ? (
            [...Array(2)].map((_, i) => (
              <div key={i} className="h-[400px] bg-gray-100 animate-pulse" />
            ))
          ) : (
            displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative overflow-hidden bg-card shadow-card transition-all duration-700 hover:shadow-elegant hover:-translate-y-2"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* TAG */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-gold text-royal-purple-dark text-xs font-semibold tracking-wider uppercase rounded-full">
                    {product.tag}
                  </span>
                </div>

                {/* IMAGE */}
                <div className="relative h-[420px] md:h-[800px] overflow-hidden">
                  <img
                    src={resolveProductImage(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* CONTENT */}
                <div className="p-8 md:p-10">

                  {/* TITLE */}
                  <h3 className="font-cinzel capitalize text-[25px]  tracking-[0.05em] font-medium text-royal-purple mb-3 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-gold text-gold"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                   
                  </div>

                  

                  {/* DESCRIPTION */}
                  <p className="font-rr text-[18px] text-royal-purple/80 leading-[1.7] tracking-[0.05em] line-clamp-2 mb-6 opacity-100 group-hover:opacity-100 transition-all duration-500">
                    {product.description}
                  </p>

                  
                </div>

                {/* GOLD LINE */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))
          )}
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <Link to="/products">
            <Button variant="section" className="min-w-[240px]">
              View All Products
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;