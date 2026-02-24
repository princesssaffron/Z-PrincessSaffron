import { useState, useMemo, useEffect } from "react";
import { Heart, ShoppingCart, Share2, Star, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useLikedProducts } from "@/hooks/useLikedProducts";
import heroVideo from "@/assets/products-hero-video.mp4";
import productJar from "@/assets/product-saffron-jar.jpg";
import giftBox from "@/assets/product-gift-box.jpg";
import { Button } from "@/components/ui/button";


const offers = [
  "🎁 Use code ROYAL25 for 25% off on all gift boxes!",
  "✨ Free shipping on orders above ₹2000",
  "💫 Buy 2 Get 1 Free on all 1g packs",
];

const priceRanges = [
  { key: "all", label: "All Prices", min: 0, max: Infinity },
  { key: "under-2000", label: "Under ₹2,000", min: 0, max: 2000 },
  { key: "2000-5000", label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
  { key: "5000-10000", label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { key: "above-10000", label: "Above ₹10,000", min: 10000, max: Infinity },
];

const ratingOptions = [
  { key: "all", label: "All Ratings", min: 0 },
  { key: "4.5+", label: "4.5★ & above", min: 4.5 },
  { key: "4+", label: "4★ & above", min: 4 },
];

const saffronTypes = [
  { key: "all", label: "All Types" },
  { key: "threads", label: "Strands" },
  { key: "powder", label: "Powder" },
];

const Products = () => {
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [showHeroText, setShowHeroText] = useState(false);
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const { toggleLike, isProductLiked } = useLikedProducts();

  useEffect(() => {
    const timer = setTimeout(() => setShowHeroText(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by price range
    const priceRange = priceRanges.find((p) => p.key === priceFilter);
    if (priceRange && priceFilter !== "all") {
      result = result.filter(
        (p) => p.price >= priceRange.min && p.price < priceRange.max
      );
    }

    // Filter by rating
    const ratingOption = ratingOptions.find((r) => r.key === ratingFilter);
    if (ratingOption && ratingFilter !== "all") {
      result = result.filter((p) => p.rating >= ratingOption.min);
    }

    // Filter by type
    if (typeFilter !== "all") {
      result = result.filter((p) => p.category.toLowerCase() === typeFilter.toLowerCase());
    }
    // If "all" is selected, we don't apply an additional filter, showing everything from MongoDB.

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [priceFilter, ratingFilter, typeFilter, sortBy, products]);

  const activeFiltersCount = [priceFilter, ratingFilter, typeFilter].filter(
    (f) => f !== "all"
  ).length;

  const clearFilters = () => {
    setPriceFilter("all");
    setRatingFilter("all");
    setTypeFilter("all");
  };

  return (
    <Layout>
      {/* Cinematic Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Custom 10px blur for that perfect middle ground */}
        <div className="absolute inset-0 bg-royal-purple-dark/30 backdrop-blur-[5px]" />

        {/* Gold Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-gold/10 opacity-60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showHeroText ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl"
          >

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showHeroText ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            />
            <br />
            <br />


            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showHeroText ? 1 : 0, y: showHeroText ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-sans text-gold/90 text-sm tracking-[0.4em] uppercase mb-6"
            >
              The Royal Collection
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: showHeroText ? 1 : 0, y: showHeroText ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-serif text-4xl md:text-4xl lg:text-6xl text-ivory mb-8 leading-tight"
            >
              Each product begins
              <br />
              <span className="text-gold">as a flower</span>
            </motion.h1>

            {/* Secondary Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showHeroText ? 1 : 0, y: showHeroText ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-sans text-ivory/70 text-lg md:text-xl tracking-wide mb-12"
            >
              Choose your chapter of luxury.
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: showHeroText ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToProducts}
            initial={{ opacity: 0 }}
            animate={{ opacity: showHeroText ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/60 hover:text-gold transition-colors cursor-pointer group"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 group-hover:text-gold transition-colors" />
            </motion.div>
          </motion.button>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory/10 via-ivory/10 to-transparent" />

      </section>

      {/* Animated Offers Banner */}
      <div id="products-section" className="bg-royal-purple-dark scroll-mt-0">
        <div className="relative overflow-hidden py-3 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20">

          <div className="flex whitespace-nowrap animate-marquee gap-16">
            {[...offers, ...offers, ...offers].map((offer, index) => (
              <span
                key={index}
                className="text-ivory font-sans text-sm tracking-wide"
              >
                {offer}
              </span>
            ))}
          </div>

        </div>

        {/* Marquee Animation */}
        <style>
          {`
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }

      .animate-marquee {
        animation: marquee 25s linear infinite;
      }
    `}
        </style>
      </div>



      {/* Page Header */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}   // triggers when 60% visible
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-sans text-gold text-sm tracking-[0.35em] uppercase mb-4"
            >
              Our Collection
            </motion.p>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-4xl md:text-5xl text-royal-purple mb-6"
            >
              Elite Saffron
            </motion.h2>

            {/* Gold Divider Animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ amount: 0.6 }}
              transition={{
                duration: 1.1,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto origin-center"
            />

          </div>


          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-royal-purple text-ivory text-sm font-medium rounded-full"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 w-5 h-5 bg-gold text-royal-purple-dark rounded-full text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop Filters */}
            <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap items-center gap-4 w-full md:w-auto`}>
              {/* Price Range */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground font-medium">Price Range</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-4 py-2 bg-ivory-dark border border-border text-sm focus:outline-none focus:border-gold min-w-[150px] rounded-full"
                >
                  {priceRanges.map((range) => (
                    <option key={range.key} value={range.key}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground font-medium">Rating</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-4 py-2 bg-ivory-dark border border-border text-sm focus:outline-none focus:border-gold min-w-[130px] rounded-full"
                >
                  {ratingOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Saffron Type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground font-medium">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-ivory-dark border border-border text-sm focus:outline-none focus:border-gold min-w-[120px] rounded-full"
                >
                  {saffronTypes.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-royal-purple hover:text-gold transition-colors mt-5"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-ivory-dark border border-border text-sm focus:outline-none focus:border-gold rounded-full"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-royal-purple/60 uppercase tracking-widest text-sm">Loading Collection...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-700 hover:shadow-elegant hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 bg-gold text-royal-purple-dark text-xs font-semibold tracking-wider uppercase rounded-full">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <button
                      onClick={() => toggleLike(product.id)}
                      className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${isProductLiked(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-ivory/90 text-royal-purple hover:bg-gold hover:text-royal-purple-dark"
                        }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isProductLiked(product.id) ? "fill-current" : ""}`} />
                    </button>
                    <button
                      className="w-10 h-10 bg-ivory/90 backdrop-blur-sm rounded-full flex items-center justify-center text-royal-purple hover:bg-gold hover:text-royal-purple-dark transition-colors"
                      aria-label="Share product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quick Add Button */}
                    <div
                      className="
    absolute bottom-4 left-1/2 -translate-x-1/2
    opacity-0 translate-y-4
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
                    >
                      <Button variant="white"
                        onClick={() => addToCart(product.id)}
                        className="min-w-[240px] h-[42px]"
                      >
                        <span className="flex items-center gap-3">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </span>
                      </Button>
                    </div>


                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                              ? "fill-gold text-gold"
                              : "fill-muted text-muted"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-sans text-[17px] tracking-[0.06em] font-medium text-royal-purple mb-3 leading-[1.4] group-hover:text-gold transition-colors duration-300 ">
                      {product.name}
                    </h3>

                    {/* Description on Hover */}
                    <p className="font-sans text-[14px] font-medium text-royal-purple/70 leading-[1.6] tracking-[0.02em] line-clamp-2 mb-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xl font-bold text-gold">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>

  );
};



export default Products;
