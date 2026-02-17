import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import logo from "@/assets/logo.png";
import razorpayLogo from "@/assets/razorpay.png";
import visaLogo from "@/assets/visa.svg";
import mastercardLogo from "@/assets/mastercard.svg";
import upiLogo from "@/assets/upi.svg";


const footerLinks = {
  shop: [
    { name: "All Products", path: "/products" },
    { name: "Gift Boxes", path: "/products?category=gift" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Refund Policy", path: "/refund" },
  ],
  support: [
    { name: "FAQ", path: "/faq" },
    { name: "Shipping Policy", path: "/shipping" },
    { name: "Corporate Essentials", path: "/about#corporate" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const paymentMethods = [

  {
    name: "RazorPay",
    logo: razorpayLogo,
  },
  {
    name: "Visa",
    logo: visaLogo,
  },
  {
    name: "Mastercard",
    logo: mastercardLogo,
  },
  {
    name: "UPI",
    logo: upiLogo,
  }
  
];

const Footer = () => {
  return (
    <footer className="bg-royal-purple-dark text-ivory">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="Z Princess Saffron"
                className="h-16 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed mb-6 max-w-xs">
              Experience the world's finest Kashmiri saffron, hand-picked from the pristine valleys of Pampore with centuries of heritage.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+917200150588"
                className="flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                +91 72001 50588
              </a>
              <a
                href="mailto:zprincessaffron07@gmail.com"
                className="flex items-center gap-3 text-ivory/70 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-gold" />
                zprincessaffron07@gmail.com
              </a>
              <div className="flex items-start gap-3 text-ivory/70 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                Chennai, India
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-ivory/50 text-xs uppercase tracking-wider">
              Secure Payments:
            </span>

            <div className="flex items-center gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="flex items-center gap-2 px-3 py-2 bg-ivory/10 rounded-md"
                >
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="h-5 w-auto object-contain"
                  />
                  <span className="text-xs text-ivory/70 font-medium">
                    {method.name}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/70 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-ivory/10 py-5">
        <div className="container mx-auto px-6">
          <p className="text-center text-ivory/50 text-xs tracking-wider">
            © 2026 Z Princess Saffron. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
