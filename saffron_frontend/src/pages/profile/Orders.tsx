import ProfileLayout from "./ProfileLayout";
import { useOrders } from "@/hooks/useOrders";
import ProfileOrders from "@/components/profile/ProfileOrders";
import { Loader2 } from "lucide-react";

/* 
  Note: This file is located at src/pages/profile/Orders.tsx
  It replaces the purpose of the old src/pages/Orders.tsx
*/

const Orders = () => {
    const { orders, isLoading } = useOrders();

    return (
        <ProfileLayout
            title="My Orders"
            description="View and track your order history."
        >
            {/* We can reuse the ProfileOrders component, but it might need adjustment if it was designed for a small widget. 
            However, looking at the previous Profile.tsx, it seemed to be a list. 
            Let's stick with specific usage or enhance it.
            For now, we use the existing component.
        */}
            <ProfileOrders orders={orders} isLoading={isLoading} />
        </ProfileLayout>
    );
};

export default Orders;
