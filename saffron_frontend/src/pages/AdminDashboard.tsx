import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus,   Upload, X } from "lucide-react";
import { motion } from "framer-motion";

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium tracking-wider uppercase text-royal-purple/70">{label}</label>
    {children}
  </div>
);

const AdminDashboard = () => {
    const { user, signOut } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        id: Date.now(),
        name: "",
        price: "",
        originalPrice: "",
        category: "threads",
        image: "",
        tag: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (optional, e.g., 2MB limit for base64)
            if (file.size > 2 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select an image smaller than 2MB",
                    variant: "destructive"
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProductData(prev => ({ ...prev, image: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProductData(prev => ({ ...prev, image: "" }));
        setImagePreview(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add auth token if needed: "Authorization": `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    ...productData,
                    id: Number(productData.id),
                    price: Number(productData.price),
                    originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add product");
            }

            toast({
                title: "Product Added",
                description: `${productData.name} has been successfully added to the database.`,
            });

            setProductData({
                id: Date.now(),
                name: "",
                price: "",
                originalPrice: "",
                category: "threads",
                image: "",
                tag: "",
                description: "",
            });
            setImagePreview(null);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        signOut();
        navigate("/auth");
    };

    if (!user || user.email !== "princesssaffron519@gmail.com") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a0a2a] text-white p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-light tracking-widest uppercase text-[#C6A85A]">Access Denied</h1>
                    <p className="text-white/60">You do not have permission to access this area.</p>
                    <Button variant="outline" onClick={() => navigate("/")} className="border-[#C6A85A] text-[#C6A85A] hover:bg-[#C6A85A] hover:text-black">
                        Go Home
                    </Button>
                </div>
            </div>
        );
    }

   return (
  <div className="min-h-screen bg-ivory text-royal-purple font-rr">

    {/* HEADER */}
    <header className="border-b border-gold/20 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Package className="w-7 h-7 text-gold" />
          <div>
            <h1 className="font-serif text-xl tracking-[0.25em] uppercase text-royal-purple">
              Princess Saffron
            </h1>
            <p className="text-xs tracking-[0.3em] uppercase text-royal-purple/50">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="section"
            onClick={() => navigate("/")}
            className="uppercase tracking-[0.3em] font-rr"
          >
            Storefront
          </Button>

          <Button
            variant="royal"
            onClick={handleLogout}
            className="uppercase tracking-[0.3em] font-rr"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>

    {/* MAIN */}
    <main className="max-w-4xl mx-auto px-6 py-20">

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gold/20 rounded-2xl p-12 shadow-card"
      >

        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-gold" />
          </div>

          <h2 className="font-serif text-2xl tracking-[0.2em] uppercase text-royal-purple">
            Add New Product
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 font-rr">

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-10">

            <FormField label="Product Name">
              <Input
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
                className="font-rr border-gold/20 focus:ring-gold"
              />
            </FormField>

            <FormField label="Category">
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full h-11 border border-gold/20 rounded-md px-3 bg-white font-rr focus:ring-1 focus:ring-gold"
              >
                <option value="threads">Threads</option>
                <option value="powder">Powder</option>
                <option value="gift">Gift</option>
              </select>
            </FormField>

            <FormField label="Price">
              <Input
                name="price"
                type="number"
                value={productData.price}
                onChange={handleInputChange}
                required
                className="font-rr border-gold/20 focus:ring-gold"
              />
            </FormField>

            <FormField label="Original Price">
              <Input
                name="originalPrice"
                type="number"
                value={productData.originalPrice}
                onChange={handleInputChange}
                className="font-rr border-gold/20 focus:ring-gold"
              />
            </FormField>

          </div>

          {/* IMAGE */}
          <FormField label="Product Image">
            <div className="border-2 border-dashed border-gold/20 rounded-xl p-8 text-center">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    className="h-40 w-40 object-cover rounded-lg border border-gold/20"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto w-8 h-8 text-royalpurple/40 mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="font-rr"
                  />
                </>
              )}
            </div>
          </FormField>

          {/* TAG */}
          <FormField label="Tag">
            <Input
              name="tag"
              value={productData.tag}
              onChange={handleInputChange}
              className="font-rr border-gold/20 focus:ring-gold"
            />
          </FormField>

          {/* DESCRIPTION */}
          <FormField label="Description">
            <Textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              required
              className="min-h-[140px] font-rr border-gold/20 focus:ring-gold"
            />
          </FormField>

          {/* SUBMIT */}
          <div className="flex justify-center mt-10">
            <Button
              variant="royal"
              type="submit"
              size="sm"
              disabled={isLoading}
              className="
                px-8
                py-4
                text-[11px]
                tracking-[0.4em]
                rounded-full
                h-auto
                font-rr
              "
            >
              {isLoading ? "SAVING..." : "SAVE PRODUCT"}
            </Button>
          </div>

        </form>
      </motion.div>

    </main>
  </div>
);
};

export default AdminDashboard;