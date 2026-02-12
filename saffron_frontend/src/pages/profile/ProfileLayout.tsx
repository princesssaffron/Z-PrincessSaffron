import { Link, useLocation, Navigate } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    MapPin,
    Package,
    LogOut,
    ChevronRight,
    Menu,
    X
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProfileLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/profile",
        icon: LayoutDashboard,
    },
    {
        title: "Edit Profile",
        href: "/profile/edit",
        icon: User,
    },
    {
        title: "Shipping Address",
        href: "/profile/address",
        icon: MapPin,
    },
    {
        title: "Orders",
        href: "/profile/orders",
        icon: Package,
    },
];

const ProfileLayout = ({ children, title, description }: ProfileLayoutProps) => {
    const { user, signOut, isLoading } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (isLoading) {
        return null; // Or a loader
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <Layout>
            <div className="bg-ivory min-h-screen pt-24 pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-muted-foreground mb-8">
                        <Link to="/" className="hover:text-royal-purple transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-royal-purple font-medium">My Account</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <aside className={`
              lg:w-64 flex-shrink-0 
              ${isSidebarOpen
                                ? 'fixed inset-0 z-50 bg-ivory/98 backdrop-blur-md p-6 overflow-y-auto lg:static lg:bg-transparent lg:p-0 lg:overflow-visible transition-all duration-300'
                                : 'hidden lg:block'
                            }
            `}>
                            <div className="flex items-center justify-between lg:hidden mb-8">
                                <span className="font-serif text-2xl text-royal-purple">Account Menu</span>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-2 rounded-full hover:bg-black/5"
                                >
                                    <X className="h-6 w-6 text-royal-purple" />
                                </button>
                            </div>

                            <div className="space-y-2 lg:space-y-1">
                                {sidebarItems.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-full transition-all duration-200",
                                                isActive
                                                    ? "bg-royal-purple text-ivory shadow-lg bg-gradient-to-r from-royal-purple to-royal-purple-light"
                                                    : "text-royal-purple hover:bg-gold/10 hover:text-royal-purple-dark"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        </aside>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 border border-royal-purple/20 rounded-full text-royal-purple"
                            >
                                <Menu className="h-4 w-4" />
                                <span>Show Menu</span>
                            </button>
                        </div>

                        {/* Main Content */}
                        <main className="flex-1">
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-6 sm:p-8 animate-fade-in-up">
                                <div className="mb-8">
                                    <h1 className="font-serif text-3xl text-royal-purple mb-2">
                                        {title}
                                    </h1>
                                    {description && (
                                        <p className="text-muted-foreground">{description}</p>
                                    )}
                                </div>
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileLayout;
