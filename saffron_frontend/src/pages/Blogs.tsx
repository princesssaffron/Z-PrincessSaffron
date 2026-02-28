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
// Saffron Benefits
// ─────────────────────────────────────────────────────────────────────────────
const saffronBenefits = [
  {
    id: 'health', title: 'Health Benefits', subtitle: "Nature's Golden Medicine",
    image: saffronHealth, icon: Heart,
    benefits: ['Powerful antioxidant properties that fight free radicals', 'May help improve mood and treat depression symptoms', 'Supports heart health and blood circulation', 'Anti-inflammatory properties for pain relief', 'May enhance memory and cognitive function'],
    gradient: 'from-royal-purple/80 to-charcoal/90'
  },
  {
    id: 'beauty', title: 'Beauty & Skincare', subtitle: 'Radiance from Within',
    image: saffronBeauty, icon: Sparkles,
    benefits: ['Natural skin brightening and glow enhancement', 'Reduces dark spots and hyperpigmentation', 'Anti-aging properties for youthful skin', 'Soothes skin irritation and inflammation', 'Promotes even skin tone and complexion'],
    gradient: 'from-gold/70 to-charcoal/90'
  },
  {
    id: 'culinary', title: 'Culinary Uses', subtitle: 'Aromatic Excellence',
    image: saffronCulinary, icon: ChefHat,
    benefits: ['Biryani & Rice dishes for rich golden color', 'Paella and Mediterranean cuisines', 'Desserts like Kheer, Ice cream & Pastries', 'Saffron milk and traditional beverages', 'Marinades and gourmet sauces'],
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

  const [formData, setFormData] = useState({ title: '', content: '', author_name: '', author_email: '' });

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
      const res = await fetch(`${API_URL}/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: newsletterEmail }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Subscription failed');
      toast({ title: 'Subscribed!', description: data.message || "You're now subscribed." });
      setNewsletterEmail('');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to subscribe.', variant: 'destructive' });
    } finally { setIsSubscribing(false); }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast({ title: 'Error', description: 'Image must be < 5MB', variant: 'destructive' }); return; }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => { setImageFile(null); setImagePreview(null); };
  const uploadImage = async (): Promise<string | null> => null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    let imageUrl: string | null = null;
    if (imageFile) imageUrl = await uploadImage();
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title, content: formData.content, author_name: formData.author_name, author_email: formData.author_email || null, image_url: imageUrl, published: true })
      });
      if (!res.ok) throw new Error('Failed to publish');
      toast({ title: 'Success!', description: 'Your article has been published successfully.' });
      setFormData({ title: '', content: '', author_name: '', author_email: '' });
      removeImage(); setShowForm(false); fetchBlogs();
    } catch {
      toast({ title: 'Error', description: 'Failed to publish. Please try again.', variant: 'destructive' });
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
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-3xl mx-auto text-center">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="mt-10 text-gold/60 text-sm tracking-[0.4em] uppercase">
                ✦ Royal Knowledge ✦
              </motion.div>
              <br /><br />
              <motion.h1
                className="font-cinzel text-4xl md:text-5xl mb-6 tracking-[0.3em] uppercase cursor-default font-medium"
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {'Saffron Insights'.split('').map((char, idx) => (
                  <motion.span key={idx}
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    whileHover={{ color: '#D4AF37', textShadow: '0 0 8px rgba(212,175,55,0.7)' }}
                    className="inline-block"
                  >{char === ' ' ? '\u00A0' : char}</motion.span>
                ))}
              </motion.h1>
              <motion.div initial={{ width: 0 }} animate={{ width: '120px' }} transition={{ duration: 1, delay: 0.6 }}
                className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
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
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
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
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="max-w-2xl mx-auto mb-16 overflow-hidden">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-charcoal/10">
                    <h3 className="font-sans text-center text-2xl font-light text-purple mb-6">Share Your Knowledge</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Your Name *</label>
                        <input type="text" required value={formData.author_name}
                          onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                          className="w-full bg-cream border border-charcoal/20 rounded-full px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors"
                          placeholder="Enter your name" maxLength={100} />
                      </div>
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Email (optional)</label>
                        <input type="email" value={formData.author_email}
                          onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                          className="w-full bg-cream border border-charcoal/20 rounded-full px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors"
                          placeholder="Enter your email" maxLength={255} />
                      </div>
                      <div>
                        <label className="block text-charcoal/70 text-sm mb-2">Article Title *</label>
                        <input type="text" required value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          className="w-full bg-cream border border-charcoal/20 rounded-2xl px-4 py-3 text-charcoal focus:border-royal-purple focus:outline-none transition-colors resize-none"
                          placeholder="Write your article about saffron benefits, uses, recipes..." maxLength={10000} />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <Button variant="white" type="button" onClick={() => { setShowForm(false); removeImage(); }} className="flex-1 min-w-0">CANCEL</Button>
                        <Button variant="royal" type="submit" disabled={submitting || uploading} className="flex-1 min-w-0">
                          <span className="flex items-center gap-2">
                            {(submitting || uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
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
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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