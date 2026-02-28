import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import productJar from "@/assets/product-saffron-jar.jpg";
import giftBox from "@/assets/product-gift-box.jpg";
import { useEffect, useState } from "react";
import { resolveProductImage } from "@/utils/imageUtils";

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
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* SIMPLE SCROLL FLOAT (always works) */
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        // Show only the first 2 products as per original design
        setApiProducts(data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * 0.12);   // adjust float strength here
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayProducts = apiProducts.length > 0 ? apiProducts : products;

  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-6">

        {/* ⭐ FLOATING HEADER */}
        <div
          style={{
            transform: `translateY(${-offset}px)`,
            transition: "transform 0.1s linear"
          }}
          className="text-center max-w-2xl mx-auto mb-16"
        ><br />
          <br />
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Curated Excellence
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6 font-medium">
            Experience Luxury
          </h2>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />

          <p className="text-muted-foreground leading-relaxed font-sans text-[19px]">
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
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-gold text-royal-purple-dark text-xs font-semibold tracking-wider uppercase rounded-full">
                    {product.tag}
                  </span>
                </div>

                <div className="relative h-[420px] md:h-[800px] overflow-hidden">
                  <img
                    src={product.id < 3 ? product.image : resolveProductImage(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-8 md:p-10">
                  <h3 className="font-sans capitalize text-[25px] tracking-[0.06em] font-light text-royal-purple mb-3 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="font-Outfit text-xl md:text-2xl font-semibold text-gold mb-4">
                    {typeof product.price === 'number' ? `₹${product.price.toLocaleString()}` : product.price}
                  </p>

                  <p className="font-sans  text-[18px] text-royal-purple/70 leading-[1.6] tracking-[0.02em] line-clamp-2 mb-4 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                    {product.description}
                  </p>
                </div>

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
