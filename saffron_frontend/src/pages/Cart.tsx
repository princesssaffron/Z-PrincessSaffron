import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { getProductById } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  // Store coupon in session for checkout page
  const saveCouponToSession = (code: string | null, discountPercent: number) => {
    if (code) {
      sessionStorage.setItem("appliedCoupon", code);
      sessionStorage.setItem("discountPercent", String(discountPercent));
    } else {
      sessionStorage.removeItem("appliedCoupon");
      sessionStorage.removeItem("discountPercent");
    }
  };

  const coupons: Record<string, number> = {
    ROYAL25: 25,
    SAFFRON10: 10,
    WELCOME15: 15,
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    if (coupons[code]) {
      setAppliedCoupon(code);
      setDiscount(coupons[code]);
      saveCouponToSession(code, coupons[code]);
      toast({
        title: "Coupon applied!",
        description: `${code} - ${coupons[code]}% discount`,
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "This coupon code is not valid",
        variant: "destructive",
      });
    }
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    saveCouponToSession(null, 0);
    toast({
      title: "Coupon removed",
      description: "Discount has been removed",
    });
  };

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: getProductById(item.product_id),
  })).filter((item) => item.product);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item.product!.price * item.quantity),
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  if (!user) {
    return (
      <Layout>
        <section className="pt-32 pb-20 bg-ivory min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl text-royal-purple mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Please sign in to view your cart</p>
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

  if (cartProducts.length === 0) {
    return (
      <Layout>
        <section className="pt-32 pb-20 bg-ivory min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-serif text-3xl text-royal-purple mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to get started</p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-royal-purple text-ivory font-semibold text-sm uppercase tracking-widest hover:bg-royal-purple-light transition-colors rounded-full"
            >
              Shop Now
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

          <h1 className="font-serif text-4xl text-royal-purple mb-10">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartProducts.map(({ product_id, quantity, product }) => (
                <div
                  key={product_id}
                  className="flex gap-6 bg-card p-6 rounded-2xl shadow-card"
                >
                  <img
                    src={product!.image}
                    alt={product!.name}
                    className="w-28 h-28 object-cover rounded-2xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-royal-purple mb-1">
                      {product!.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product!.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(product_id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-border rounded-full hover:border-gold transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product_id, quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-border rounded-full hover:border-gold transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-sans text-lg font-bold text-gold">
                          ₹{(product!.price * quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(product_id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-2xl shadow-card sticky top-28">
                <h2 className="font-serif text-xl text-royal-purple mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-6">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-gold/10 p-3 rounded-full px-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gold" />
                        <span className="text-sm font-medium">{appliedCoupon}</span>
                        <span className="text-sm text-muted-foreground">(-{discount}%)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 px-4 py-2 bg-ivory border border-border rounded-full focus:outline-none focus:border-gold"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-royal-purple text-ivory text-sm font-medium hover:bg-royal-purple-light transition-colors rounded-full"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders above ₹2000
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
                    <span>Total</span>
                    <span className="text-gold">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  className="w-full mt-6 px-8 py-4 bg-gold text-royal-purple-dark font-semibold text-sm uppercase tracking-widest hover:bg-gold-light transition-colors rounded-full"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by trusted payment partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
