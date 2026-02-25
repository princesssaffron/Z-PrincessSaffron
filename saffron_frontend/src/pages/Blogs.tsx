import { useState, useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Calendar, User, Loader2, ImagePlus, X, Heart, Sparkles, ChefHat } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import { useToast } from '@/hooks/use-toast';
import saffronHealth from '@/assets/saffron-health.jpg';
import saffronBeauty from '@/assets/saffron-beauty.jpeg';
import saffronCulinary from '@/assets/saffron-culinary.jpeg';
import { Button } from '@/components/ui/button';

interface Blog {
  id: string;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
  image_url: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Wing path constants — open vs perspective-foreshortened close
// ─────────────────────────────────────────────────────────────────────────────

// BLUE MORPHO
const BM_UL_O = "M60 52 C42 24 8 16 4 34 C0 50 16 68 38 62 C52 58 58 54 60 52";
const BM_UL_C = "M60 52 C57 44 54 40 52 46 C50 52 53 58 57 56 C59 55 60 53 60 52";
const BM_UR_O = "M60 52 C78 24 112 16 116 34 C120 50 104 68 82 62 C68 58 62 54 60 52";
const BM_UR_C = "M60 52 C63 44 66 40 68 46 C70 52 67 58 63 56 C61 55 60 53 60 52";
const BM_LL_O = "M60 56 C46 66 24 74 14 88 C8 98 18 108 34 102 C50 96 58 78 60 56";
const BM_LL_C = "M60 56 C58 63 55 68 53 74 C51 80 54 88 57 86 C59 82 60 70 60 56";
const BM_LR_O = "M60 56 C74 66 96 74 106 88 C112 98 102 108 86 102 C70 96 62 78 60 56";
const BM_LR_C = "M60 56 C62 63 65 68 67 74 C69 80 66 88 63 86 C61 82 60 70 60 56";

// ORANGE MONARCH
const OM_UL_O = "M60 50 C42 22 6 14 2 32 C-2 50 14 70 38 63 C53 58 59 53 60 50";
const OM_UL_C = "M60 50 C57 42 53 38 51 44 C49 51 52 59 57 57 C59 55 60 52 60 50";
const OM_UR_O = "M60 50 C78 22 114 14 118 32 C122 50 106 70 82 63 C67 58 61 53 60 50";
const OM_UR_C = "M60 50 C63 42 67 38 69 44 C71 51 68 59 63 57 C61 55 60 52 60 50";
const OM_LL_O = "M60 56 C45 68 22 76 12 92 C5 104 18 112 34 106 C50 100 58 82 60 56";
const OM_LL_C = "M60 56 C58 64 55 70 53 78 C51 85 54 92 57 90 C59 86 60 73 60 56";
const OM_LR_O = "M60 56 C75 68 98 76 108 92 C115 104 102 112 86 106 C70 100 62 82 60 56";
const OM_LR_C = "M60 56 C62 64 65 70 67 78 C69 85 66 92 63 90 C61 86 60 73 60 56";

// ─────────────────────────────────────────────────────────────────────────────
// BlueMorpho SVG — wings foreshorten symmetrically on flap
// ─────────────────────────────────────────────────────────────────────────────
const BlueMorpho = ({ flapDuration = 0.52 }: { flapDuration?: number }) => {
  const wt = { duration: flapDuration, repeat: Infinity, ease: "easeInOut" as const, repeatType: "loop" as const };
  const vt = { duration: flapDuration, repeat: Infinity, ease: "easeInOut" as const };
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="bm-ul" cx="30%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#C5E8FB" /><stop offset="45%" stopColor="#29B6F6" /><stop offset="100%" stopColor="#0277BD" />
        </radialGradient>
        <radialGradient id="bm-ur" cx="70%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#C5E8FB" /><stop offset="45%" stopColor="#29B6F6" /><stop offset="100%" stopColor="#0277BD" />
        </radialGradient>
        <radialGradient id="bm-ll" cx="35%" cy="65%" r="70%">
          <stop offset="0%" stopColor="#64B5F6" /><stop offset="100%" stopColor="#01579B" />
        </radialGradient>
        <radialGradient id="bm-lr" cx="65%" cy="65%" r="70%">
          <stop offset="0%" stopColor="#64B5F6" /><stop offset="100%" stopColor="#01579B" />
        </radialGradient>
      </defs>

      {/* Lower wings (behind) */}
      <motion.path fill="url(#bm-ll)" stroke="#080808" strokeWidth="1.5"
        d={BM_LL_O} animate={{ d: [BM_LL_O, BM_LL_C, BM_LL_O] }} transition={wt} />
      <motion.path fill="url(#bm-lr)" stroke="#080808" strokeWidth="1.5"
        d={BM_LR_O} animate={{ d: [BM_LR_O, BM_LR_C, BM_LR_O] }} transition={wt} />

      {/* Upper wings (front) */}
      <motion.path fill="url(#bm-ul)" stroke="#080808" strokeWidth="1.6"
        d={BM_UL_O} animate={{ d: [BM_UL_O, BM_UL_C, BM_UL_O] }} transition={wt} />
      <motion.path fill="url(#bm-ur)" stroke="#080808" strokeWidth="1.6"
        d={BM_UR_O} animate={{ d: [BM_UR_O, BM_UR_C, BM_UR_O] }} transition={wt} />

      {/* Veins — fade as wings close */}
      <motion.g animate={{ opacity: [0.65, 0.05, 0.65] }} transition={vt}>
        <path d="M60 52 C48 42 32 34 16 32" stroke="#035480" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M60 52 C46 48 28 46 10 48"  stroke="#035480" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M60 54 C48 54 30 56 12 60"  stroke="#035480" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M60 52 C72 42 88 34 104 32" stroke="#035480" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M60 52 C74 48 92 46 110 48"  stroke="#035480" strokeWidth="0.85" strokeLinecap="round" />
        <path d="M60 54 C72 54 90 56 108 60"  stroke="#035480" strokeWidth="0.85" strokeLinecap="round" />
      </motion.g>

      {/* Black border dots — scale toward centre as wings close */}
      <motion.g animate={{ scaleX: [1, 0.1, 1] }} style={{ transformOrigin: "60px 52px" }} transition={vt}>
        <circle cx="6"   cy="36"  r="2.8" fill="#0d0d0d" /><circle cx="6"   cy="36"  r="1.1" fill="#87CEEB" />
        <circle cx="4"   cy="48"  r="2.2" fill="#0d0d0d" /><circle cx="4"   cy="48"  r="0.9" fill="#87CEEB" />
        <circle cx="8"   cy="60"  r="2.2" fill="#0d0d0d" /><circle cx="8"   cy="60"  r="0.9" fill="#87CEEB" />
        <circle cx="20"  cy="68"  r="2"   fill="#0d0d0d" />
        <circle cx="114" cy="36"  r="2.8" fill="#0d0d0d" /><circle cx="114" cy="36"  r="1.1" fill="#87CEEB" />
        <circle cx="116" cy="48"  r="2.2" fill="#0d0d0d" /><circle cx="116" cy="48"  r="0.9" fill="#87CEEB" />
        <circle cx="112" cy="60"  r="2.2" fill="#0d0d0d" /><circle cx="112" cy="60"  r="0.9" fill="#87CEEB" />
        <circle cx="100" cy="68"  r="2"   fill="#0d0d0d" />
      </motion.g>

      {/* Body */}
      <ellipse cx="60" cy="60" rx="2.8" ry="15" fill="#0d0d0d" />
      <circle  cx="60" cy="43"  r="3.8" fill="#0d0d0d" />
      <path d="M60 41 Q54 32 49 24" stroke="#0d0d0d" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M60 41 Q66 32 71 24" stroke="#0d0d0d" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <circle cx="49" cy="24" r="1.9" fill="#0d0d0d" />
      <circle cx="71" cy="24" r="1.9" fill="#0d0d0d" />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// OrangeMonarch SVG
// ─────────────────────────────────────────────────────────────────────────────
const OrangeMonarch = ({ flapDuration = 0.52 }: { flapDuration?: number }) => {
  const wt = { duration: flapDuration, repeat: Infinity, ease: "easeInOut" as const, repeatType: "loop" as const };
  const vt = { duration: flapDuration, repeat: Infinity, ease: "easeInOut" as const };
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="om-ul" cx="28%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#FFD84D" /><stop offset="42%" stopColor="#FF8C00" /><stop offset="100%" stopColor="#A84000" />
        </radialGradient>
        <radialGradient id="om-ur" cx="72%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#FFD84D" /><stop offset="42%" stopColor="#FF8C00" /><stop offset="100%" stopColor="#A84000" />
        </radialGradient>
        <radialGradient id="om-ll" cx="32%" cy="68%" r="68%">
          <stop offset="0%" stopColor="#FFBE00" /><stop offset="100%" stopColor="#B85000" />
        </radialGradient>
        <radialGradient id="om-lr" cx="68%" cy="68%" r="68%">
          <stop offset="0%" stopColor="#FFBE00" /><stop offset="100%" stopColor="#B85000" />
        </radialGradient>
      </defs>

      {/* Lower wings */}
      <motion.path fill="url(#om-ll)" stroke="#080808" strokeWidth="1.8"
        d={OM_LL_O} animate={{ d: [OM_LL_O, OM_LL_C, OM_LL_O] }} transition={wt} />
      <motion.path fill="url(#om-lr)" stroke="#080808" strokeWidth="1.8"
        d={OM_LR_O} animate={{ d: [OM_LR_O, OM_LR_C, OM_LR_O] }} transition={wt} />

      {/* Upper wings */}
      <motion.path fill="url(#om-ul)" stroke="#080808" strokeWidth="2"
        d={OM_UL_O} animate={{ d: [OM_UL_O, OM_UL_C, OM_UL_O] }} transition={wt} />
      <motion.path fill="url(#om-ur)" stroke="#080808" strokeWidth="2"
        d={OM_UR_O} animate={{ d: [OM_UR_O, OM_UR_C, OM_UR_O] }} transition={wt} />

      {/* Veins */}
      <motion.g animate={{ opacity: [0.8, 0.05, 0.8] }} transition={vt}>
        <path d="M60 50 C46 42 30 34 14 30" stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 50 C44 47 26 46 8 48"  stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 52 C46 52 28 54 10 58"  stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 50 C74 42 90 34 106 30" stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 50 C76 47 94 46 112 48"  stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 52 C74 52 92 54 110 58"  stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 58 C48 68 34 78 20 88"   stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 62 C50 74 38 84 28 96"   stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 58 C72 68 86 78 100 88"  stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
        <path d="M60 62 C70 74 82 84 92 96"   stroke="#5C2800" strokeWidth="1.0" strokeLinecap="round" />
      </motion.g>

      {/* Black border + white spots */}
      <motion.g animate={{ scaleX: [1, 0.1, 1] }} style={{ transformOrigin: "60px 50px" }} transition={vt}>
        <path d="M2 32 C-2 50 14 70 38 63" stroke="#0a0a0a" strokeWidth="7" fill="none" strokeLinecap="round" />
        <circle cx="4"   cy="34"  r="2.8" fill="white" />
        <circle cx="2"   cy="46"  r="2.2" fill="white" />
        <circle cx="5"   cy="57"  r="2.2" fill="white" />
        <circle cx="12"  cy="66"  r="2"   fill="white" />
        <circle cx="24"  cy="70"  r="1.8" fill="white" />
        <path d="M118 32 C122 50 106 70 82 63" stroke="#0a0a0a" strokeWidth="7" fill="none" strokeLinecap="round" />
        <circle cx="116" cy="34"  r="2.8" fill="white" />
        <circle cx="118" cy="46"  r="2.2" fill="white" />
        <circle cx="115" cy="57"  r="2.2" fill="white" />
        <circle cx="108" cy="66"  r="2"   fill="white" />
        <circle cx="96"  cy="70"  r="1.8" fill="white" />
      </motion.g>
      <motion.g animate={{ scaleX: [1, 0.1, 1] }} style={{ transformOrigin: "60px 56px" }} transition={vt}>
        <path d="M12 92 C5 104 18 112 34 106" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="10"  cy="96"  r="2.2" fill="white" />
        <circle cx="14"  cy="107" r="2"   fill="white" />
        <path d="M108 92 C115 104 102 112 86 106" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="110" cy="96"  r="2.2" fill="white" />
        <circle cx="106" cy="107" r="2"   fill="white" />
      </motion.g>

      {/* Body */}
      <ellipse cx="60" cy="60" rx="3.2" ry="16" fill="#0d0d0d" />
      <circle  cx="60" cy="42"  r="4.4" fill="#0d0d0d" />
      <path d="M60 40 Q53 31 48 22" stroke="#0d0d0d" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M60 40 Q67 31 72 22" stroke="#0d0d0d" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="22" r="2.3" fill="#0d0d0d" />
      <circle cx="72" cy="22" r="2.3" fill="#0d0d0d" />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NaturalButterfly — sinusoidal diagonal flight with body tilt
// ─────────────────────────────────────────────────────────────────────────────
interface ButterflyConfig {
  id: number;
  type: 'blue-morpho' | 'orange-monarch';
  size: number;
  startXPct: number;
  startYPct: number;
  delay: number;
  travelDuration: number;
  swayAmplitudePct: number; // % of viewport width
  swayLoops: number;        // how many sway cycles during full flight
  flapDuration: number;
  repeatDelay: number;
}

const NaturalButterfly = ({ cfg }: { cfg: ButterflyConfig }) => {
  const { type, size, startXPct, startYPct, delay, travelDuration, swayAmplitudePct, swayLoops, flapDuration, repeatDelay } = cfg;

  // Build keyframe arrays for sinusoidal path + tilt
  const N = 20; // segments
  const xKF: string[] = [];
  const yKF: string[] = [];
  const rotKF: number[] = [];
  const opKF: number[] = [];
  const timeKF: number[] = [];

  for (let i = 0; i <= N; i++) {
    const t = i / N;
    // lateral sway — sin wave
    const sinVal = Math.sin(t * swayLoops * Math.PI * 2);
    const x = startXPct + sinVal * swayAmplitudePct;
    // upward travel — linear, start at startYPct, end at -18%
    const y = startYPct - t * (startYPct + 20);
    // tiny vertical bob
    const bob = Math.sin(t * swayLoops * Math.PI * 4) * 0.8;

    // tilt = derivative of sin, i.e. cos; scale to ±20 deg
    const cosDeriv = Math.cos(t * swayLoops * Math.PI * 2) * swayLoops * Math.PI * 2;
    const tilt = cosDeriv * (swayAmplitudePct / 8) * 1.4;

    xKF.push(`${Math.min(102, Math.max(-2, x))}%`);
    yKF.push(`${y + bob}%`);
    rotKF.push(tilt);
    timeKF.push(t);

    // opacity: fade in, hold, fade out
    if (t < 0.04) opKF.push(0);
    else if (t < 0.10) opKF.push(1);
    else if (t > 0.90) opKF.push(0);
    else opKF.push(1);
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size }}
      initial={{ left: xKF[0], top: yKF[0], opacity: 0, rotate: 0 }}
      animate={{ left: xKF, top: yKF, rotate: rotKF, opacity: opKF }}
      transition={{
        duration: travelDuration,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: "linear",
        times: timeKF,
      }}
    >
      {type === 'blue-morpho'
        ? <BlueMorpho flapDuration={flapDuration} />
        : <OrangeMonarch flapDuration={flapDuration} />}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Butterflies container
// ─────────────────────────────────────────────────────────────────────────────
const BUTTERFLY_CONFIGS: ButterflyConfig[] = [
  { id:0, type:'orange-monarch', size:56, startXPct:6,  startYPct:118, delay:0.0, travelDuration:9.5, swayAmplitudePct:4.2, swayLoops:1.4, flapDuration:0.50, repeatDelay:1.2 },
  { id:1, type:'blue-morpho',    size:44, startXPct:20, startYPct:122, delay:2.1, travelDuration:8.8, swayAmplitudePct:3.8, swayLoops:1.2, flapDuration:0.53, repeatDelay:2.0 },
  { id:2, type:'orange-monarch', size:62, startXPct:36, startYPct:116, delay:4.0, travelDuration:10.2,swayAmplitudePct:5.0, swayLoops:1.6, flapDuration:0.48, repeatDelay:0.8 },
  { id:3, type:'blue-morpho',    size:40, startXPct:52, startYPct:120, delay:1.0, travelDuration:8.2, swayAmplitudePct:3.2, swayLoops:1.1, flapDuration:0.56, repeatDelay:2.5 },
  { id:4, type:'orange-monarch', size:50, startXPct:66, startYPct:118, delay:5.5, travelDuration:9.8, swayAmplitudePct:4.5, swayLoops:1.5, flapDuration:0.51, repeatDelay:1.5 },
  { id:5, type:'blue-morpho',    size:48, startXPct:80, startYPct:115, delay:3.2, travelDuration:9.0, swayAmplitudePct:4.0, swayLoops:1.3, flapDuration:0.54, repeatDelay:1.8 },
  { id:6, type:'orange-monarch', size:45, startXPct:90, startYPct:121, delay:0.5, travelDuration:8.6, swayAmplitudePct:3.6, swayLoops:1.2, flapDuration:0.49, repeatDelay:3.0 },
  { id:7, type:'blue-morpho',    size:58, startXPct:12, startYPct:125, delay:7.0, travelDuration:10.8,swayAmplitudePct:5.5, swayLoops:1.7, flapDuration:0.55, repeatDelay:0.5 },
  { id:8, type:'orange-monarch', size:42, startXPct:44, startYPct:119, delay:1.5, travelDuration:8.4, swayAmplitudePct:3.4, swayLoops:1.3, flapDuration:0.50, repeatDelay:2.2 },
];

const Butterflies = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    {BUTTERFLY_CONFIGS.map((cfg) => (
      <NaturalButterfly key={cfg.id} cfg={cfg} />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Saffron Benefits
// ─────────────────────────────────────────────────────────────────────────────
const saffronBenefits = [
  {
    id: 'health', title: 'Health Benefits', subtitle: "Nature's Golden Medicine",
    image: saffronHealth, icon: Heart,
    benefits: ['Powerful antioxidant properties that fight free radicals','May help improve mood and treat depression symptoms','Supports heart health and blood circulation','Anti-inflammatory properties for pain relief','May enhance memory and cognitive function'],
    gradient: 'from-royal-purple/80 to-charcoal/90'
  },
  {
    id: 'beauty', title: 'Beauty & Skincare', subtitle: 'Radiance from Within',
    image: saffronBeauty, icon: Sparkles,
    benefits: ['Natural skin brightening and glow enhancement','Reduces dark spots and hyperpigmentation','Anti-aging properties for youthful skin','Soothes skin irritation and inflammation','Promotes even skin tone and complexion'],
    gradient: 'from-gold/70 to-charcoal/90'
  },
  {
    id: 'culinary', title: 'Culinary Uses', subtitle: 'Aromatic Excellence',
    image: saffronCulinary, icon: ChefHat,
    benefits: ['Biryani & Rice dishes for rich golden color','Paella and Mediterranean cuisines','Desserts like Kheer, Ice cream & Pastries','Saffron milk and traditional beverages','Marinades and gourmet sauces'],
    gradient: 'from-amber-700/80 to-deep/90'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Main Blogs page
// ─────────────────────────────────────────────────────────────────────────────
const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({ title:'', content:'', author_name:'', author_email:'' });

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) { console.error('Failed to fetch blogs:', err); }
    finally { setLoading(false); }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    try {
      const res = await fetch(`${API_URL}/newsletter`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: newsletterEmail }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Subscription failed');
      toast({ title:'Subscribed!', description: data.message || "You're now subscribed." });
      setNewsletterEmail('');
    } catch (err: any) {
      toast({ title:'Error', description: err.message || 'Failed to subscribe.', variant:'destructive' });
    } finally { setIsSubscribing(false); }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5*1024*1024) { toast({ title:'Error', description:'Image must be < 5MB', variant:'destructive' }); return; }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => { setImageFile(null); setImagePreview(null); };
  const uploadImage = async (): Promise<string|null> => null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    let imageUrl: string|null = null;
    if (imageFile) imageUrl = await uploadImage();
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ title:formData.title, content:formData.content, author_name:formData.author_name, author_email:formData.author_email||null, image_url:imageUrl, published:true })
      });
      if (!res.ok) throw new Error('Failed to publish');
      toast({ title:'Success!', description:'Your article has been published successfully.' });
      setFormData({ title:'', content:'', author_name:'', author_email:'' });
      removeImage(); setShowForm(false); fetchBlogs();
    } catch {
      toast({ title:'Error', description:'Failed to publish. Please try again.', variant:'destructive' });
    } finally { setSubmitting(false); }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-ivory">

        {/* ── Hero ── */}
        <section className="relative bg-royal-purple-dark text-ivory py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/10 blur-[180px]" />
          </div>
          <Butterflies />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1 }} className="max-w-3xl mx-auto text-center">
              <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }} className="mt-10 text-gold/60 text-sm tracking-[0.4em] uppercase">
                ✦ Royal Knowledge ✦
              </motion.div>
              <br /><br />
              <motion.h1
                className="font-cinzel text-4xl md:text-5xl mb-6 tracking-[0.3em] uppercase cursor-default font-medium"
                initial="hidden" animate="visible"
                variants={{ visible:{ transition:{ staggerChildren:0.06 } } }}
              >
                {'Saffron Insights'.split('').map((char, idx) => (
                  <motion.span key={idx}
                    variants={{ hidden:{ opacity:0, y:40 }, visible:{ opacity:1, y:0 } }}
                    transition={{ duration:0.6, ease:'easeOut' }}
                    whileHover={{ color:'#D4AF37', textShadow:'0 0 8px rgba(212,175,55,0.7)' }}
                    className="inline-block"
                  >{char === ' ' ? '\u00A0' : char}</motion.span>
                ))}
              </motion.h1>
              <motion.div initial={{ width:0 }} animate={{ width:'120px' }} transition={{ duration:1, delay:0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.8 }}
                className="text-ivory/70 text-lg hover:text-ivory transition-colors duration-300">
                Discover the health benefits, beauty secrets, and culinary magic of the world's most precious spice
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Benefit Cards ── */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {saffronBenefits.map((benefit, index) => (
                <motion.div key={benefit.id}
                  initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.6, delay:index*0.15 }}
                  className="relative group rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
                >
                  <div className="absolute inset-0">
                    <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${benefit.gradient} transition-opacity duration-500`} />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-6 text-ivory">
                    <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <benefit.icon className="w-10 h-10 text-gold mb-3" />
                      <h3 className="font-serif text-2xl mb-1">{benefit.title}</h3>
                      <p className="text-ivory/70 text-sm">{benefit.subtitle}</p>
                    </div>
                    <div className="max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-60">
                      <ul className="space-y-2 pt-4 border-t border-ivory/20">
                        {benefit.benefits.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-ivory/80">
                            <span className="text-gold mt-0.5">✦</span><span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-gold/20 rounded-2xl pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="flex items-center justify-center gap-4 py-12 bg-ivory">
          <div className="h-px w-20 bg-gold/30" />
          <h2 className="font-serif text-2xl text-charcoal">Community Articles</h2>
          <div className="h-px w-20 bg-gold/30" />
        </div>

        {/* ── Write Article ── */}
        <section className="py-8 bg-ivory">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Button variant="section" onClick={() => setShowForm(!showForm)} className="min-w-[240px]">
                <span className="flex items-center gap-3"><PenLine className="w-4 h-4" />Write an Article</span>
              </Button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                  className="max-w-2xl mx-auto mb-16 overflow-hidden">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-charcoal/10">
                    <h3 className="font-sans text-center text-2xl font-light text-purple mb-6">Share Your Knowledge</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Your Name *</label>
                        <input type="text" required value={formData.author_name}
                          onChange={(e) => setFormData({...formData, author_name:e.target.value})}
                          className="w-full bg-cream border border-charcoal/20 rounded-full px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors"
                          placeholder="Enter your name" maxLength={100} />
                      </div>
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Email (optional)</label>
                        <input type="email" value={formData.author_email}
                          onChange={(e) => setFormData({...formData, author_email:e.target.value})}
                          className="w-full bg-cream border border-charcoal/20 rounded-full px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors"
                          placeholder="Enter your email" maxLength={255} />
                      </div>
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Article Title *</label>
                        <input type="text" required value={formData.title}
                          onChange={(e) => setFormData({...formData, title:e.target.value})}
                          className="w-full bg-cream border border-charcoal/20 rounded-full px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors"
                          placeholder="Enter article title" maxLength={200} />
                      </div>
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Cover Image (optional)</label>
                        {imagePreview ? (
                          <div className="relative rounded-2xl overflow-hidden">
                            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                            <button type="button" onClick={removeImage}
                              className="absolute top-2 right-2 bg-charcoal/70 text-ivory p-1.5 rounded-full hover:bg-charcoal transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-charcoal/20 rounded-lg cursor-pointer hover:border-royal-purple/50 transition-colors bg-cream">
                            <ImagePlus className="w-8 h-8 text-charcoal/40 mb-2" />
                            <span className="text-charcoal/50 text-sm">Click to upload image</span>
                            <span className="text-charcoal/30 text-xs mt-1">Max 5MB</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                          </label>
                        )}
                      </div>
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Content *</label>
                        <textarea required rows={6} value={formData.content}
                          onChange={(e) => setFormData({...formData, content:e.target.value})}
                          className="w-full bg-cream border border-charcoal/20 rounded-2xl px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors resize-none"
                          placeholder="Write your article about saffron benefits, uses, recipes..." maxLength={10000} />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <Button variant="white" type="button" onClick={() => { setShowForm(false); removeImage(); }} className="flex-1 min-w-0">CANCEL</Button>
                        <Button variant="royal" type="submit" disabled={submitting||uploading} className="flex-1 min-w-0">
                          <span className="flex items-center gap-2">
                            {(submitting||uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
                            {uploading ? 'Uploading...' : submitting ? 'Publishing...' : 'Publish Article'}
                          </span>
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-royal-purple animate-spin" /></div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-20"><p className="text-charcoal/60 text-lg">No articles yet. Be the first to share your knowledge!</p></div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
                {blogs.map((blog, index) => (
                  <motion.article key={blog.id}
                    initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.5, delay:index*0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                  >
                    <div className="h-48 bg-gradient-to-br from-gold/20 to-royal-purple/20 flex items-center justify-center overflow-hidden">
                      {blog.image_url
                        ? <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        : <span className="font-serif text-6xl text-gold/30">{blog.title.charAt(0)}</span>
                      }
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-royal-purple transition-colors line-clamp-2">{blog.title}</h3>
                      <p className="text-charcoal/60 text-sm mb-4 line-clamp-3">{blog.content}</p>
                      <div className="flex items-center justify-between text-xs text-charcoal/50">
                        <div className="flex items-center gap-1"><User className="w-3 h-3" /><span>{blog.author_name}</span></div>
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span>{new Date(blog.created_at).toLocaleDateString()}</span></div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl text-charcoal mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-charcoal/70 mb-8">Get the latest articles, recipes, and exclusive offers delivered to your inbox</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-full border border-charcoal/20 focus:outline-none focus:border-royal-purple" />
                <Button variant="royal" type="submit" disabled={isSubscribing} className="min-w-[180px]">
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Blogs;