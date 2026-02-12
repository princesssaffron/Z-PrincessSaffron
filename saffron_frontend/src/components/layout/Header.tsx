import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  MapPin,
  Package,
  Edit
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useLikedProducts } from "@/hooks/useLikedProducts";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/about" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { likedCount } = useLikedProducts();

  // Check if we render the transparent header (only on home page when not scrolled)
  const isHome = location.pathname === "/";
  const showSolidHeader = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showSolidHeader
        ? "bg-ivory/95 backdrop-blur-md shadow-elegant py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Z Princess Saffron"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-sans text-sm tracking-widest uppercase transition-colors duration-300
                  ${location.pathname === link.path
                    ? "text-gold"
                    : showSolidHeader ? "text-royal-purple hover:text-gold" : "text-ivory hover:text-gold"
                  }
                  after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 
                  after:bg-gold after:origin-right after:scale-x-0 after:transition-transform 
                  after:duration-300 hover:after:origin-left hover:after:scale-x-100
                  ${location.pathname === link.path ? "after:scale-x-100 after:origin-left" : ""}
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`p-2 rounded-full transition-all duration-300 relative ${showSolidHeader
                ? "text-royal-purple hover:text-gold hover:bg-gold/10"
                : "text-ivory hover:text-gold hover:bg-ivory/10"
                }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {likedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {likedCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={`p-2 rounded-full transition-all duration-300 relative ${showSolidHeader
                ? "text-royal-purple hover:text-gold hover:bg-gold/10"
                : "text-ivory hover:text-gold hover:bg-ivory/10"
                }`}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-royal-purple-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* User Account / Profile Dropdown */}
            <div
              className="relative relative-group h-full flex items-center"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button
                className={`p-2 rounded-full transition-all duration-300 ${showSolidHeader
                  ? "text-royal-purple hover:text-gold hover:bg-gold/10"
                  : "text-ivory hover:text-gold hover:bg-ivory/10"
                  }`}
                aria-label={user ? "My Profile" : "Login or Sign Up"}
              >
                <User className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden py-2 z-50 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {user ? "My Account" : "Access Account"}
                      </p>
                    </div>

                    {user ? (
                      <>
                        <Link
                          to="/profile/edit"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gold/10 hover:text-gold transition-colors text-sm font-medium"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Edit className="w-4 h-4" />
                          Edit Profile
                        </Link>
                        <Link
                          to="/profile/address"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gold/10 hover:text-gold transition-colors text-sm font-medium"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <MapPin className="w-4 h-4" />
                          Address Book
                        </Link>
                        <Link
                          to="/profile/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gold/10 hover:text-gold transition-colors text-sm font-medium"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          My Orders
                        </Link>
                        <div className="border-t border-gray-100 my-1 mt-2"></div>
                        <button
                          onClick={() => {
                            signOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-sm text-left font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <div className="p-2 space-y-2">
                        <Link
                          to="/auth"
                          className="flex items-center justify-center w-full py-2.5 bg-royal-purple text-white text-sm font-bold uppercase tracking-wide rounded-full hover:bg-royal-purple/90 transition-colors shadow-md"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/auth?tab=signup"
                          className="flex items-center justify-center w-full py-2.5 border border-royal-purple text-royal-purple text-sm font-bold uppercase tracking-wide rounded-full hover:bg-royal-purple hover:text-white transition-all duration-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${isScrolled
                ? "text-royal-purple hover:text-gold"
                : "text-ivory hover:text-gold"
                }`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-x-0 top-0 bottom-0 bg-ivory/98 backdrop-blur-xl transition-all duration-500 z-40 ${isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
            }`}
        >
          <nav className="flex flex-col items-center justify-center min-h-screen py-24 space-y-6 overflow-y-auto">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-3xl tracking-widest uppercase transition-all duration-500 ${location.pathname === link.path
                  ? "text-gold scale-110"
                  : "text-royal-purple hover:text-gold hover:scale-105"
                  }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                {link.name}
              </Link>
            ))}

            <div className="w-12 h-px bg-royal-purple/10 my-4" />

            {user ? (
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-sm tracking-[0.2em] uppercase text-royal-purple/70 hover:text-gold transition-colors"
                style={{
                  transitionDelay: `${navLinks.length * 50}ms`,
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                My Account
              </Link>
            ) : (
              <div
                className="flex flex-col items-center gap-4 w-full px-10"
                style={{
                  transitionDelay: `${navLinks.length * 50}ms`,
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-4 bg-royal-purple text-ivory text-sm font-bold uppercase tracking-widest rounded-full shadow-royal"
                >
                  Login
                </Link>
                <Link
                  to="/auth?tab=signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-4 border-2 border-royal-purple text-royal-purple text-sm font-bold uppercase tracking-widest rounded-full"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
