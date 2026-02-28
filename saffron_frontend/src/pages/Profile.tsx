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
import { motion, easeInOut } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeInOut },
  },
};

const Profile = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  const totalOrders = orders?.length || 0;
  const completedOrders =
    orders?.filter((o) => o.status === "delivered").length || 0;
  const pendingOrders = totalOrders - completedOrders;

  return (
    <ProfileLayout
      title={`Welcome, ${user?.fullName || "User"}`}
      description="From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >

        {/* ================= QUICK STATS ================= */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[{
            title: "Total Orders",
            value: totalOrders,
            icon: Package,
            color: "text-royal-purple",
          },
          {
            title: "Pending",
            value: pendingOrders,
            icon: Clock,
            color: "text-amber-600",
          },
          {
            title: "Completed",
            value: completedOrders,
            icon: CreditCard,
            color: "text-emerald-600",
          }].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group bg-white/60 backdrop-blur-md border border-royal-purple/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle style={{ letterSpacing: "0.20em" }} className="text-sm  text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition`} />
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`text-4xl font-bold ${stat.color}`}
                  >
                    {stat.value}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= ACCOUNT INFO ================= */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-10"
        >

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="group p-8 rounded-2xl border border-royal-purple/10 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <h3 style={{ letterSpacing: "0.20em" }} className="text-lg font-rr tracking-wide text-royal-purple mb-6">
              Contact Information
            </h3>

            <div className="space-y-2 text-sm">
              <p className="font-medium text-royal-purple">
                {user?.fullName || "No Name Set"}
              </p>
              <p className="text-muted-foreground">
                {user?.email}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Link to="/profile/edit">
                <Button variant="section">
                  Edit Profile
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Address */}
          <motion.div
            variants={itemVariants}
            className="group p-8 rounded-2xl border border-royal-purple/10 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <h3 style={{ letterSpacing: "0.20em" }} className="text-lg font-rr tracking-wide letterSpacing text-royal-purple mb-6">
              Address Book
            </h3>

            <p className="text-sm text-muted-foreground mb-6">
              Manage your shipping and billing addresses.
            </p><br/><br/>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/profile/address">
                <Button variant="section">
                  Manage Addresses
                </Button>
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </ProfileLayout>
  );
};

export default Profile;
