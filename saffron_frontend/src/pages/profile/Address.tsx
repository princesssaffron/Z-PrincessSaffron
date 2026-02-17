import ProfileLayout from "./ProfileLayout";
import { useProfile } from "@/hooks/useProfile";
import ShippingAddress from "@/components/profile/ShippingAddress";
import { Loader2 } from "lucide-react";

const Address = () => {
    const { profile, isLoading, updateProfile } = useProfile();

    if (isLoading) {
        return (
            <ProfileLayout title="Shipping Address">
                <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
            </ProfileLayout>
        )
    }

    return (
        <ProfileLayout
            title="Shipping Address"
            description="Manage your delivery address for faster checkout."
        >
            <div className="max-w-xl">
                <ShippingAddress profile={profile} onUpdate={updateProfile} />
            </div>
        </ProfileLayout>
    );
};

export default Address;
