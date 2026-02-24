import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, LogOut, ArrowLeft, Upload, X } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="min-h-screen bg-[#1a0a2a] text-white font-sans selection:bg-[#C6A85A]/30">
            {/* Header */}
            <header className="border-b border-white/5 bg-[#28123c]/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Package className="w-8 h-8 text-[#C6A85A]" />
                        <div>
                            <h1 className="text-lg font-light tracking-[0.2em] uppercase">Saffron Admin</h1>
                            <p className="text-[10px] text-white/40 tracking-widest uppercase">Product Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate("/")} className="text-white/60 hover:text-[#C6A85A] transition-all flex items-center gap-2 text-sm uppercase tracking-widest group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Storefront
                        </button>
                        <button onClick={handleLogout} className="text-[#C6A85A] hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#2d1b4d]/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C6A85A]/50 to-transparent" />
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#C6A85A]/10 flex items-center justify-center border border-[#C6A85A]/20">
                            <Plus className="w-5 h-5 text-[#C6A85A]" />
                        </div>
                        <h2 className="text-xl font-light tracking-widest uppercase">Add New Product</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Product Name</label>
                                <Input
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Royal Saffron Threads"
                                    className="bg-black/20 border-white/5 focus:border-[#C6A85A] transition-all hover:border-white/10 h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Category</label>
                                <select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleInputChange}
                                    className="w-full flex h-11 rounded-md border border-white/5 bg-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C6A85A] transition-all hover:border-white/10"
                                >
                                    <option value="threads">Threads</option>
                                    <option value="powder">Powder</option>
                                    <option value="gift">Gift</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Price (INR)</label>
                                <Input
                                    name="price"
                                    type="number"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="1499"
                                    className="bg-black/20 border-white/5 focus:border-[#C6A85A] transition-all hover:border-white/10 h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Original Price (optional)</label>
                                <Input
                                    name="originalPrice"
                                    type="number"
                                    value={productData.originalPrice}
                                    onChange={handleInputChange}
                                    placeholder="1999"
                                    className="bg-black/20 border-white/5 focus:border-[#C6A85A] transition-all hover:border-white/10 h-11"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Product Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/5 border-dashed rounded-2xl hover:border-[#C6A85A]/40 transition-all bg-black/20 group cursor-pointer relative overflow-hidden">
                                    <div className="space-y-1 text-center">
                                        {imagePreview ? (
                                            <div className="relative inline-block">
                                                <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md border border-white/20" />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="mx-auto h-10 w-10 text-white/20 group-hover:text-[#C6A85A]/40 transition-colors" />
                                                <div className="flex text-sm text-gray-400">
                                                    <label className="relative cursor-pointer rounded-md font-medium text-[#C6A85A] hover:text-[#D4B86A] focus-within:outline-none">
                                                        <span>Upload a file</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            required
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-white/40">PNG, JPG, GIF up to 2MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Tag (Best Seller, etc.)</label>
                                <Input
                                    name="tag"
                                    value={productData.tag}
                                    onChange={handleInputChange}
                                    placeholder="Popular"
                                    className="bg-black/20 border-white/5 focus:border-[#C6A85A] transition-all hover:border-white/10 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#C6A85A]/70 font-medium">Description</label>
                            <Textarea
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Describe your product..."
                                className="bg-black/20 border-white/5 focus:border-[#C6A85A] transition-all hover:border-white/10 min-h-[120px]"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-[#C6A85A] hover:bg-[#D4B86A] text-[#1a0a2a] uppercase tracking-[0.25em] font-semibold transition-all rounded-xl shadow-[0_10px_30px_-10px_rgba(198,168,90,0.5)] active:scale-[0.98]"
                        >
                            {isLoading ? "Saving..." : "Save Product"}
                        </Button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default AdminDashboard;
