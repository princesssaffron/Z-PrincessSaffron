import ProfileLayout from "./profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Package,
  Clock,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  const totalOrders = orders?.length || 0;
  const completedOrders = orders?.filter((o) => o.status === "delivered").length || 0;
  const pendingOrders = totalOrders - completedOrders;

  return (
    <ProfileLayout
      title={`Welcome, ${user?.fullName || "User"}`}
      description="From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details."
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/50 border-royal-purple/10 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <Package className="h-4 w-4 text-royal-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-royal-purple">{totalOrders}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-amber-500/10 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{pendingOrders}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-emerald-500/10 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{completedOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Account Information Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-royal-purple/10 bg-white/50">
            <h3 className="text-lg font-serif text-royal-purple mb-4">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{user?.fullName || "No Name Set"}</p>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="pt-4">
                <Link to="/profile/edit">
                  <Button variant="link" className="px-0 text-gold hover:text-royal-purple">Edit Profile</Button>
                </Link>
              </div>
            </div>
          </div>
          {/* We could add logic to show default address here if available in profile context */}
          <div className="p-6 rounded-lg border border-royal-purple/10 bg-white/50">
            <h3 className="text-lg font-serif text-royal-purple mb-4">Address Book</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your shipping and billing addresses.</p>
            <Link to="/profile/address">
              <Button variant="link" className="px-0 text-gold hover:text-royal-purple">Manage Addresses</Button>
            </Link>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};
export default Profile;