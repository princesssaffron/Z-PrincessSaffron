import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useLikedProducts } from "@/hooks/useLikedProducts";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { getProductById } from "@/data/products";

const Wishlist = () => {
  const { user } = useAuth();
  const { likedProducts, toggleLike } = useLikedProducts();
  const { addToCart } = useCart();

  const likedProductsWithDetails = likedProducts.map((item) => ({
    ...item,
    product: getProductById(item.product_id),
  })).filter((item) => item.product);

  if (!user) {
    return (
      <Layout>
        <section className="pt-32 pb-20 bg-ivory min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <Heart className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl text-royal-purple mb-4">Your Wishlist</h1>
            <p className="text-muted-foreground mb-8">Please sign in to view your wishlist</p>
            <Link
              to="/auth"
              className="inline-block px-8 py-4 bg-royal-purple text-ivory font-semibold text-sm uppercase tracking-widest hover:bg-royal-purple-light transition-colors rounded-full"
            >
              Sign In
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  if (likedProductsWithDetails.length === 0) {
    return (
      <Layout>
        <section className="pt-32 pb-20 bg-ivory min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <Heart className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl text-royal-purple mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">Save products you love for later</p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-royal-purple text-ivory font-semibold text-sm uppercase tracking-widest hover:bg-royal-purple-light transition-colors rounded-full"
            >
              Explore Products
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-20 bg-ivory min-h-screen">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-royal-purple mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-4xl text-royal-purple mb-10">My Wishlist</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedProductsWithDetails.map(({ product_id, product }) => (
              <div
                key={product_id}
                className="group bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-500 hover:shadow-elegant hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product!.image}
                    alt={product!.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product!.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gold text-royal-purple-dark text-xs font-semibold uppercase">
                      {product!.tag}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-royal-purple mb-2 line-clamp-1">
                    {product!.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product!.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-sans text-xl font-bold text-gold">
                      ₹{product!.price.toLocaleString()}
                    </span>
                    {product!.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product!.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product_id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-royal-purple text-ivory text-sm font-medium uppercase tracking-wide hover:bg-royal-purple-light transition-colors rounded-full"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleLike(product_id)}
                      className="w-12 flex items-center justify-center border border-border hover:border-red-500 hover:bg-red-50 transition-colors rounded-full"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Wishlist;
