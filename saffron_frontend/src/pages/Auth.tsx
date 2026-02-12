import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");

const Auth = () => {
  const { toast } = useToast();
  const {
    user,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    isLoading: authLoading,
  } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};

    try {
      emailSchema.parse(formData.email);
    } catch (e: any) {
      newErrors.email = e.errors?.[0]?.message ?? "Invalid email";
    }

    try {
      passwordSchema.parse(formData.password);
    } catch (e: any) {
      newErrors.password = e.errors?.[0]?.message ?? "Invalid password";
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({
          title: "Sign in failed",
          description:
            error.message === "Invalid login credentials"
              ? "Invalid email or password. Please try again."
              : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      }
    } else {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.name
      );
      if (error) {
        let errorMessage = error.message;
        if (error.message.includes("already registered")) {
          errorMessage =
            "This email is already registered. Please sign in instead.";
        }
        toast({
          title: "Sign up failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "You are now signed in.",
        });
      }
    }

    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const { error } = await signInWithGoogle(credentialResponse.credential);
      if (error) {
        toast({
          title: "Google sign-in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in with Google.",
        });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden font-sans">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover blur-sm brightness-50 scale-105"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>

        <div className="w-full max-w-md text-center relative z-10 animate-[fadeInUp_0.6s_ease-out] float-animation p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-400/20 backdrop-blur-md mb-4 flex items-center justify-center overflow-hidden border border-white/20">
              <User className="w-12 h-12 text-white/80" />
            </div>
            <h2 className="font-serif text-2xl text-white tracking-widest uppercase">
              Welcome User
            </h2>
          </div>

          <div className="p-8">
            <p className="text-white/80 mb-8">
              You are signed in as{" "}
              <span className="font-medium text-white">
                {user.email}
              </span>
            </p>
            <div className="space-y-4">
              <Link
                to="/"
                className="block w-full py-3 bg-white/90 text-black font-medium text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-full"
              >
                Go to Home
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 w-full py-3 border border-white/30 text-white font-medium text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 rounded-full"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === AUTH FORM VIEW ===
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover blur-sm brightness-50 scale-105"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium tracking-wide uppercase text-sm hidden sm:inline-block">Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl float-animation"
          >
            <div className="flex flex-col items-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gray-400 mb-6 flex items-center justify-center overflow-hidden shadow-lg border-2 border-white/10"
              >
                <User className="w-12 h-12 text-gray-600" />
              </motion.div>
              <h1 className="font-serif text-2xl text-white tracking-[0.15em] uppercase font-light text-center">
                {isLogin ? "Customer Login" : "Customer Register"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field (Sign Up Only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User className="absolute left-0 top-3 w-4 h-4 text-white/70" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/30 pl-8 pr-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter Name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </motion.div>
              )}

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-0 top-3 w-4 h-4 text-white/70" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/30 pl-8 pr-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  placeholder={isLogin ? "Enter Email" : "Enter Email"}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-0 top-3 w-4 h-4 text-white/70" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/30 pl-8 pr-10 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full mt-8 py-3 bg-white/90 text-black font-medium text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
              >
                {isLoading ? "Processing..." : (isLogin ? "Login" : "Register")}
              </motion.button>
            </form>

            {/* Toggle Login/Register */}
            <div className="mt-8 text-center space-y-4">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-white/70 hover:text-white text-sm transition-colors border-b border-transparent hover:border-white/50 pb-0.5"
              >
                {isLogin ? "New User? Create Account" : "Existing User? Continue Login"}
              </button>

              {isLogin && (
                <div className="pt-4 flex flex-col items-center space-y-4 w-full">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-black/30 backdrop-blur-xl px-2 text-white/50">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      toast({
                        title: "Google sign-in failed",
                        description: "Could not authenticate with Google. Please try again.",
                        variant: "destructive",
                      });
                    }}
                    shape="pill"
                    width="100%"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;