import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Pencil, Trash2, Upload, X,
  LayoutDashboard, Boxes, LogOut, Store, Loader2,
  Users, ShoppingBag, IndianRupee, AlertTriangle, TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = `${BASE_URL}/products`;

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  _id: string;
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  tag?: string;
  description: string;
  stock: number;
  rating?: number;
  reviews?: number;
}

type Tab = "dashboard" | "add" | "update" | "delete" | "stock";

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockCount: number;
  lowStockProducts: any[];
}

interface SalesData {
  daily: { date: string; revenue: number; orders: number }[];
  monthly: { month: string; revenue: number; orders: number }[];
}

// ─── Small helpers ────────────────────────────────────────────────────────────
const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold tracking-[0.2em] uppercase text-royal-purple/60">{label}</label>
    {children}
  </div>
);

const inputCls = "border-gold/20 focus:ring-gold text-royal-purple bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

// ─── Empty product form state ─────────────────────────────────────────────────
const emptyForm = () => ({
  id: Date.now(),
  name: "",
  price: "" as string | number,
  originalPrice: "" as string | number,
  category: "threads",
  image: "",
  tag: "",
  description: "",
  stock: 0,
});

// ─── Main component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("dashboard");

  // ── Add product state ────────────────────────────────────────────────────────
  const [addData, setAddData] = useState(emptyForm());
  const [addImagePreview, setAddImagePreview] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);

  // ── Update product state ─────────────────────────────────────────────────────
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // ── Products list (for delete + stock) ───────────────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [stockSaving, setStockSaving] = useState(false);

  // ── Dashboard state ──────────────────────────────────────────────────────────
  const [stats, setStats] = useState<Stats | null>(null);
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [salesPeriod, setSalesPeriod] = useState<"daily" | "monthly">("daily");
  const [stockMap, setStockMap] = useState<Record<string, number>>({});

  // ── Fetch all products ────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch(API);
      const data: Product[] = await res.json();
      setProducts(data);
      const sm: Record<string, number> = {};
      data.forEach((p) => { sm[p._id] = p.stock ?? 0; });
      setStockMap(sm);
    } catch {
      toast({ title: "Error", description: "Could not load products", variant: "destructive" });
    } finally {
      setListLoading(false);
    }
  }, [toast]);

  const fetchStats = useCallback(async () => {
    if (!user?.token) {
      console.log("No user token, skipping stats fetch");
      return;
    }
    setStatsLoading(true);
    try {
      console.log("Fetching admin stats from:", `${BASE_URL}/admin/stats`);
      const res = await fetch(`${BASE_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error(`Stats fetch failed: ${res.status}`);
      const data = await res.json();
      console.log("Stats data received:", data);
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      toast({ title: "Error", description: "Could not load stats", variant: "destructive" });
    } finally {
      setStatsLoading(false);
    }
  }, [toast, user]);

  const fetchSales = useCallback(async () => {
    if (!user?.token) return;
    setSalesLoading(true);
    try {
      console.log("Fetching sales report from:", `${BASE_URL}/admin/sales-report`);
      const res = await fetch(`${BASE_URL}/admin/sales-report`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error(`Sales report fetch failed: ${res.status}`);
      const data = await res.json();
      console.log("Sales data received:", data);
      setSalesData(data);
    } catch (err) {
      console.error("Error fetching sales:", err);
      toast({ title: "Error", description: "Could not load sales report", variant: "destructive" });
    } finally {
      setSalesLoading(false);
    }
  }, [toast, user]);

  useEffect(() => {
    if (tab === "dashboard") {
      fetchStats();
      fetchSales();
    }
    if (tab === "delete" || tab === "stock" || tab === "update") fetchProducts();
  }, [tab, fetchProducts, fetchStats, fetchSales]);

  // ─── Access guard ─────────────────────────────────────────────────────────────
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

  // ─── Image helpers ────────────────────────────────────────────────────────────
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
    preview: (v: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 2 MB", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setter(b64);
      preview(b64);
    };
    reader.readAsDataURL(file);
  };

  // ─── ADD PRODUCT ──────────────────────────────────────────────────────────────
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          ...addData,
          id: Number(addData.id),
          price: Number(addData.price),
          originalPrice: addData.originalPrice ? Number(addData.originalPrice) : undefined,
          stock: Number(addData.stock),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");
      toast({ title: "✅ Product Added", description: `${addData.name} saved successfully.` });
      setAddData(emptyForm());
      setAddImagePreview(null);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setAddLoading(false);
    }
  };


  // ─── UPDATE PRODUCT ───────────────────────────────────────────────────────────
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setUpdateLoading(true);
    try {
      const res = await fetch(`${API}/${editProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          ...editProduct,
          price: Number(editProduct.price),
          originalPrice: editProduct.originalPrice ? Number(editProduct.originalPrice) : undefined,
          stock: Number(editProduct.stock),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update");
      toast({ title: "✅ Product Updated", description: `${editProduct.name} updated.` });
      setEditProduct(data);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUpdateLoading(false);
    }
  };

  // ─── DELETE PRODUCT ───────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");
      toast({ title: "🗑️ Product Deleted", description: data.message });
      setDeleteId(null);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // ─── SAVE STOCK ───────────────────────────────────────────────────────────────
  const handleSaveStock = async () => {
    setStockSaving(true);
    try {
      await Promise.all(
        products.map((p) =>
          fetch(`${API}/${p._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`
            },
            body: JSON.stringify({ stock: stockMap[p._id] ?? 0 }),
          })
        )
      );
      toast({ title: "✅ Stock Updated", description: "All stock levels saved." });
    } catch {
      toast({ title: "Error", description: "Some stock updates failed.", variant: "destructive" });
    } finally {
      setStockSaving(false);
    }
  };

  // ─── Sidebar nav ─────────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "add", label: "Add Product", icon: <Plus className="w-4 h-4" /> },
    { id: "update", label: "Update Product", icon: <Pencil className="w-4 h-4" /> },
    { id: "delete", label: "Delete Product", icon: <Trash2 className="w-4 h-4" /> },
    { id: "stock", label: "Manage Stock", icon: <Boxes className="w-4 h-4" /> },
  ];

  // ─── Reusable image uploader ──────────────────────────────────────────────────
  const ImageUploader = ({
    preview, onFile, onRemove, required = false,
  }: {
    preview: string | null;
    onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    required?: boolean;
  }) => (
    <div className="border-2 border-dashed border-gold/20 rounded-xl p-8 text-center bg-gold/[0.02]">
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} className="h-40 w-40 object-cover rounded-lg border border-gold/20 shadow" />
          <button type="button" onClick={onRemove} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <>
          <Upload className="mx-auto w-8 h-8 text-royal-purple/30 mb-3" />
          <p className="text-xs text-royal-purple/40 mb-3">PNG, JPG up to 2 MB</p>
          <input type="file" accept="image/*" onChange={onFile} required={required} className="text-sm text-royal-purple/60" />
        </>
      )}
    </div>
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-ivory flex flex-col">

      {/* HEADER */}
      <header className="border-b border-gold/20 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="font-serif text-lg tracking-[0.2em] uppercase text-royal-purple">Princess Saffron</h1>
              <p className="text-[10px] tracking-[0.3em] uppercase text-royal-purple/40">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="section" onClick={() => navigate("/")} className="gap-2 text-xs tracking-widest uppercase">
              <Store className="w-4 h-4" /> Storefront
            </Button>
            <Button variant="royal" onClick={() => { signOut(); navigate("/auth"); }} className="gap-2 text-xs tracking-widest uppercase">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full px-4 py-10 gap-8">

        {/* SIDEBAR */}
        <aside className="w-56 shrink-0">
          <nav className="bg-white border border-gold/15 rounded-2xl p-3 shadow-sm space-y-1 sticky top-24">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm tracking-wider transition-all duration-200 text-left ${tab === t.id
                  ? "bg-gold text-white font-semibold shadow"
                  : "text-royal-purple/70 hover:bg-gold/10 hover:text-royal-purple"
                  }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* ── DASHBOARD OVERVIEW ─────────────────────────────────── */}
              {tab === "dashboard" && (
                <div className="space-y-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: "Total Users", value: stats?.totalUsers ?? 0, icon: <Users className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
                      { label: "Total Orders", value: stats?.totalOrders ?? 0, icon: <ShoppingBag className="w-5 h-5" />, color: "bg-green-50 text-green-600" },
                      { label: "Total Revenue", value: `₹${(stats?.totalRevenue ?? 0).toLocaleString()}`, icon: <IndianRupee className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
                      { label: "Low Stock Items", value: stats?.lowStockCount ?? 0, icon: <AlertTriangle className="w-5 h-5" />, color: "bg-red-50 text-red-600", alert: (stats?.lowStockCount ?? 0) > 0 },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-gold/15 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                            {stat.icon}
                          </div>
                          {stat.alert && (
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs font-semibold tracking-[0.1em] uppercase text-royal-purple/40">{stat.label}</p>
                        <h3 className="text-2xl font-semibold text-royal-purple mt-1">{statsLoading ? "..." : stat.value}</h3>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sales Report */}
                    <div className="lg:col-span-2 bg-white border border-gold/15 rounded-2xl p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-gold" />
                          </div>
                          <h2 className="font-serif text-xl tracking-[0.1em] uppercase text-royal-purple">Sales Performance</h2>
                        </div>
                        <div className="flex bg-ivory p-1 rounded-lg">
                          <button onClick={() => setSalesPeriod("daily")} className={`px-4 py-1.5 text-[10px] tracking-widest uppercase rounded-md transition-all ${salesPeriod === "daily" ? "bg-white text-gold shadow-sm font-bold" : "text-royal-purple/40"}`}>Daily</button>
                          <button onClick={() => setSalesPeriod("monthly")} className={`px-4 py-1.5 text-[10px] tracking-widest uppercase rounded-md transition-all ${salesPeriod === "monthly" ? "bg-white text-gold shadow-sm font-bold" : "text-royal-purple/40"}`}>Monthly</button>
                        </div>
                      </div>

                      <div className="h-[300px] flex flex-col justify-end gap-1">
                        {salesLoading ? (
                          <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>
                        ) : !salesData || (salesPeriod === "daily" ? !salesData.daily?.length : !salesData.monthly?.length) ? (
                          <div className="h-full flex items-center justify-center text-royal-purple/30 text-sm">No sales data yet</div>
                        ) : (
                          <div className="flex items-end justify-between h-48 px-4 gap-2">
                            {(salesPeriod === "daily" ? salesData.daily : salesData.monthly).slice(-15).map((d: any, i) => {
                              const maxRevenue = Math.max(...(salesPeriod === "daily" ? salesData.daily : salesData.monthly).map(x => x.revenue), 1);
                              const height = (d.revenue / maxRevenue) * 100;
                              return (
                                <div key={i} className="flex-1 flex flex-col items-center group relative">
                                  <div className="absolute -top-8 bg-royal-purple text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {salesPeriod === "daily" ? d.date : d.month}: ₹{d.revenue.toLocaleString()}
                                  </div>
                                  <div className="w-full bg-gold/20 rounded-t-sm group-hover:bg-gold transition-colors" style={{ height: `${height}%` }} />
                                  <span className="text-[8px] text-royal-purple/30 mt-2 rotate-45 origin-left whitespace-nowrap">
                                    {salesPeriod === "daily" ? d.date.split('-').slice(2).join('') : d.month.split('-').slice(1).join('')}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Low Stock List */}
                    <div className="bg-white border border-gold/15 rounded-2xl p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="font-serif text-xl tracking-[0.1em] uppercase text-royal-purple">Low Stock</h2>
                      </div>

                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {statsLoading ? (
                          <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-gold" /></div>
                        ) : !stats?.lowStockProducts?.length ? (
                          <div className="py-10 text-center text-royal-purple/30 text-xs">All products well stocked</div>
                        ) : (
                          (stats?.lowStockProducts || []).map((p: any) => (
                            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-red-50">
                              <img src={p.image} className="w-10 h-10 object-cover rounded-lg shrink-0 border border-gold/10" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/40x40/fee2e2/ef4444?text=!"; }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-royal-purple truncate">{p.name}</p>
                                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-0.5">Stock: {p.stock}</p>
                              </div>
                              <Button size="sm" variant="section" onClick={() => { setTab("stock"); }} className="h-7 w-7 p-0 rounded-full">
                                <Pencil className="w-3 h-3" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ADD PRODUCT ────────────────────────────────────────── */}
              {tab === "add" && (
                <div className="bg-white border border-gold/15 rounded-2xl p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-gold" />
                    </div>
                    <h2 className="font-serif text-2xl tracking-[0.15em] uppercase text-royal-purple">Add New Product</h2>
                  </div>
                  <form onSubmit={handleAdd} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormField label="Product Name">
                        <Input value={addData.name} onChange={(e) => setAddData((p) => ({ ...p, name: e.target.value }))} required className={inputCls} />
                      </FormField>
                      <FormField label="Category">
                        <select value={addData.category} onChange={(e) => setAddData((p) => ({ ...p, category: e.target.value }))}
                          className="w-full h-10 border border-gold/20 rounded-md px-3 bg-white text-royal-purple text-sm focus:ring-1 focus:ring-gold">
                          <option value="threads">Threads</option>
                          <option value="powder">Powder</option>
                          <option value="gift">Gift</option>
                        </select>
                      </FormField>
                      <FormField label="Price (₹)">
                        <Input type="number" value={addData.price === 0 ? "" : addData.price} onChange={(e) => setAddData((p) => ({ ...p, price: e.target.value === "" ? 0 : Number(e.target.value) }))} required className={inputCls} />
                      </FormField>
                      <FormField label="Original Price (₹)">
                        <Input type="number" value={addData.originalPrice} onChange={(e) => setAddData((p) => ({ ...p, originalPrice: e.target.value }))} className={inputCls} />
                      </FormField>
                      <FormField label="Tag">
                        <Input value={addData.tag} onChange={(e) => setAddData((p) => ({ ...p, tag: e.target.value }))} className={inputCls} placeholder="e.g. Best Seller" />
                      </FormField>
                      <FormField label="Stock">
                        <Input type="number" value={addData.stock === 0 ? "" : addData.stock} onChange={(e) => setAddData((p) => ({ ...p, stock: e.target.value === "" ? 0 : Number(e.target.value) }))} className={inputCls} min={0} />
                      </FormField>
                    </div>
                    <FormField label="Product Image">
                      <ImageUploader
                        preview={addImagePreview}
                        onFile={(e) => handleImageChange(e, (v) => setAddData((p) => ({ ...p, image: v })), setAddImagePreview)}
                        onRemove={() => { setAddData((p) => ({ ...p, image: "" })); setAddImagePreview(null); }}
                        required
                      />
                    </FormField>
                    <FormField label="Description">
                      <Textarea value={addData.description} onChange={(e) => setAddData((p) => ({ ...p, description: e.target.value }))} required className={`min-h-[120px] ${inputCls}`} />
                    </FormField>
                    <div className="flex justify-end">
                      <Button variant="royal" type="submit" disabled={addLoading} className="px-10 tracking-widest uppercase text-xs">
                        {addLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</> : "Save Product"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── UPDATE PRODUCT ─────────────────────────────────────── */}
              {tab === "update" && (
                <div className="bg-white border border-gold/15 rounded-2xl p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Pencil className="w-5 h-5 text-gold" />
                      </div>
                      <h2 className="font-serif text-2xl tracking-[0.15em] uppercase text-royal-purple">
                        {editProduct ? "Edit Product" : "Update Product"}
                      </h2>
                    </div>
                    {editProduct && (
                      <Button variant="section" onClick={() => { setEditProduct(null); setEditImagePreview(null); }}
                        className="gap-2 text-xs tracking-widest uppercase">
                        <X className="w-4 h-4" /> Back to List
                      </Button>
                    )}
                  </div>

                  {/* Product list */}
                  {!editProduct && (
                    <>
                      {listLoading ? (
                        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>
                      ) : products.length === 0 ? (
                        <p className="text-center text-royal-purple/40 py-20">No products found.</p>
                      ) : (
                        <div className="space-y-3">
                          {products.map((p) => (
                            <div key={p._id} className="flex items-center gap-4 p-4 border border-gold/10 rounded-xl hover:border-gold/30 transition-colors">
                              <img
                                src={p.image}
                                className="w-14 h-14 object-cover rounded-lg border border-gold/10 shrink-0"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/56x56/f5f0e8/C6A85A?text=IMG"; }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-royal-purple truncate">{p.name}</p>
                                <p className="text-xs text-royal-purple/40 mt-0.5">₹{p.price.toLocaleString()} · {p.category} · Stock: {p.stock ?? 0}</p>
                              </div>
                              <Button size="sm" variant="section"
                                onClick={() => { setEditProduct(p); setEditImagePreview(p.image?.startsWith("data:") ? p.image : null); }}
                                className="shrink-0 gap-1.5 text-xs tracking-widest uppercase">
                                <Pencil className="w-3.5 h-3.5" /> Edit
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {editProduct && (
                    <form onSubmit={handleUpdate} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <FormField label="Product Name">
                          <Input value={editProduct.name} onChange={(e) => setEditProduct((p) => p && { ...p, name: e.target.value })} required className={inputCls} />
                        </FormField>
                        <FormField label="Category">
                          <select value={editProduct.category} onChange={(e) => setEditProduct((p) => p && { ...p, category: e.target.value })}
                            className="w-full h-10 border border-gold/20 rounded-md px-3 bg-white text-royal-purple text-sm focus:ring-1 focus:ring-gold">
                            <option value="threads">Threads</option>
                            <option value="powder">Powder</option>
                            <option value="gift">Gift</option>
                          </select>
                        </FormField>
                        <FormField label="Price (₹)">
                          <Input type="number" value={editProduct.price === 0 ? "" : editProduct.price} onChange={(e) => setEditProduct((p) => p && { ...p, price: e.target.value === "" ? 0 : Number(e.target.value) })} required className={inputCls} />
                        </FormField>
                        <FormField label="Original Price (₹)">
                          <Input type="number" value={editProduct.originalPrice ?? ""} onChange={(e) => setEditProduct((p) => p && { ...p, originalPrice: Number(e.target.value) })} className={inputCls} />
                        </FormField>
                        <FormField label="Tag">
                          <Input value={editProduct.tag ?? ""} onChange={(e) => setEditProduct((p) => p && { ...p, tag: e.target.value })} className={inputCls} />
                        </FormField>
                        <FormField label="Stock">
                          <Input type="number" value={editProduct.stock === 0 ? "" : editProduct.stock} onChange={(e) => setEditProduct((p) => p && { ...p, stock: e.target.value === "" ? 0 : Number(e.target.value) })} className={inputCls} min={0} />
                        </FormField>
                      </div>
                      <FormField label="Product Image">
                        <ImageUploader
                          preview={editImagePreview}
                          onFile={(e) => handleImageChange(
                            e,
                            (v) => setEditProduct((p) => p && { ...p, image: v }),
                            setEditImagePreview
                          )}
                          onRemove={() => { setEditProduct((p) => p && { ...p, image: "" }); setEditImagePreview(null); }}
                        />
                        {editProduct.image && !editImagePreview && (
                          <div className="mt-3 flex items-center gap-3">
                            <img src={editProduct.image} className="w-16 h-16 object-cover rounded-lg border border-gold/20" />
                            <p className="text-xs text-royal-purple/50">Current image (upload above to replace)</p>
                          </div>
                        )}
                      </FormField>
                      <FormField label="Description">
                        <Textarea value={editProduct.description} onChange={(e) => setEditProduct((p) => p && { ...p, description: e.target.value })} required className={`min-h-[120px] ${inputCls}`} />
                      </FormField>
                      <div className="flex justify-end">
                        <Button variant="royal" type="submit" disabled={updateLoading} className="px-10 tracking-widest uppercase text-xs">
                          {updateLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</> : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* ── DELETE PRODUCT ─────────────────────────────────────── */}
              {tab === "delete" && (
                <div className="bg-white border border-gold/15 rounded-2xl p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </div>
                      <h2 className="font-serif text-2xl tracking-[0.15em] uppercase text-royal-purple">Delete Product</h2>
                    </div>
                    <Button variant="section" onClick={fetchProducts} disabled={listLoading} className="text-xs tracking-widest uppercase">
                      {listLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
                    </Button>
                  </div>

                  {listLoading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>
                  ) : products.length === 0 ? (
                    <p className="text-center text-royal-purple/40 py-20">No products found.</p>
                  ) : (
                    <div className="space-y-3">
                      {products.map((p) => (
                        <div key={p._id} className="flex items-center gap-4 p-4 border border-gold/10 rounded-xl hover:border-gold/30 transition-colors">
                          <img
                            src={p.image}
                            className="w-14 h-14 object-cover rounded-lg border border-gold/10 shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/56x56/f5f0e8/C6A85A?text=IMG"; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-royal-purple truncate">{p.name}</p>
                            <p className="text-xs text-royal-purple/40">ID: {p.id} · ₹{p.price.toLocaleString()} · Stock: {p.stock ?? 0}</p>
                          </div>
                          {deleteId === p._id ? (
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs text-red-500 font-medium">Confirm?</span>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)} className="text-xs h-8">Yes, Delete</Button>
                              <Button size="sm" variant="outline" onClick={() => setDeleteId(null)} className="text-xs h-8">Cancel</Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => setDeleteId(p._id)}
                              className="shrink-0 border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 gap-1.5 text-xs">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── MANAGE STOCK ───────────────────────────────────────── */}
              {tab === "stock" && (
                <div className="bg-white border border-gold/15 rounded-2xl p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Boxes className="w-5 h-5 text-gold" />
                      </div>
                      <h2 className="font-serif text-2xl tracking-[0.15em] uppercase text-royal-purple">Manage Stock</h2>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="section" onClick={fetchProducts} disabled={listLoading} className="text-xs tracking-widest uppercase">
                        {listLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh"}
                      </Button>
                      <Button variant="royal" onClick={handleSaveStock} disabled={stockSaving || listLoading} className="text-xs tracking-widest uppercase px-8">
                        {stockSaving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</> : "Save Stock"}
                      </Button>
                    </div>
                  </div>

                  {listLoading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>
                  ) : products.length === 0 ? (
                    <p className="text-center text-royal-purple/40 py-20">No products found.</p>
                  ) : (
                    <div className="space-y-3">
                      {products.map((p) => (
                        <div key={p._id} className="flex items-center gap-4 p-4 border border-gold/10 rounded-xl hover:border-gold/30 transition-colors">
                          <img
                            src={p.image}
                            className="w-14 h-14 object-cover rounded-lg border border-gold/10 shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/56x56/f5f0e8/C6A85A?text=IMG"; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-royal-purple truncate">{p.name}</p>
                            <p className="text-xs text-royal-purple/40 mt-0.5">₹{p.price.toLocaleString()} · {p.category}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <label className="text-xs text-royal-purple/50 uppercase tracking-wider">Stock</label>
                            <Input
                              type="number"
                              min={0}
                              value={(stockMap[p._id] ?? p.stock) === 0 ? "" : (stockMap[p._id] ?? p.stock)}
                              onChange={(e) => setStockMap((m) => ({ ...m, [p._id]: e.target.value === "" ? 0 : Number(e.target.value) }))}
                              className={`w-24 text-center ${inputCls}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {products.length > 0 && !listLoading && (
                    <div className="flex justify-end mt-6">
                      <Button variant="royal" onClick={handleSaveStock} disabled={stockSaving} className="text-xs tracking-widest uppercase px-10">
                        {stockSaving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</> : "Save All Stock"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;