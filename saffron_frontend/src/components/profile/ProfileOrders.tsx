import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Order, OrderStatus } from "@/hooks/useOrders";

interface ProfileOrdersProps {
  orders: Order[];
  isLoading: boolean;
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  out_for_delivery: "bg-cyan-100 text-cyan-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const ProfileOrders = ({ orders, isLoading }: ProfileOrdersProps) => {
  const [activeTab, setActiveTab] = useState("current");

  const currentOrders = orders.filter((order) =>
    ["pending", "confirmed", "processing", "shipped", "out_for_delivery"].includes(order.status)
  );

  const orderHistory = orders.filter((order) =>
    ["delivered", "cancelled"].includes(order.status)
  );

  const renderOrderCard = (order: Order) => (
    <Link
      key={order.orderId}
      to={`/order/${order.orderId}`}
      className="block bg-ivory p-4 rounded-2xl border border-border hover:border-gold transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-mono text-sm text-royal-purple">
              #{order.orderId.slice(0, 8).toUpperCase()}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wide ${statusColors[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="text-gold font-medium">₹{order.total.toLocaleString()}</span>
          </div>
        </div>
        <div className="hidden sm:block">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );

  const renderEmptyState = (message: string) => (
    <div className="text-center py-12">
      <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
      <p className="text-muted-foreground">{message}</p>
      <Link
        to="/products"
        className="inline-block mt-4 text-gold hover:text-gold-light transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-card p-6 rounded-2xl shadow-card">
        <h2 className="font-serif text-xl text-royal-purple flex items-center gap-2 mb-6">
          <Package className="w-5 h-5" />
          My Orders
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-2xl shadow-card">
      <h2 className="font-serif text-xl text-royal-purple flex items-center gap-2 mb-6">
        <Package className="w-5 h-5" />
        My Orders
      </h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="current" className="data-[state=active]:bg-gold data-[state=active]:text-royal-purple-dark">
            Current Orders ({currentOrders.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-royal-purple-dark">
            Order History ({orderHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-3">
          {currentOrders.length > 0
            ? currentOrders.map(renderOrderCard)
            : renderEmptyState("No current orders")}
        </TabsContent>

        <TabsContent value="history" className="space-y-3">
          {orderHistory.length > 0
            ? orderHistory.map(renderOrderCard)
            : renderEmptyState("No order history yet")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileOrders;
