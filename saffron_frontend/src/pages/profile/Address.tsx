import ProfileLayout from "./ProfileLayout";
import { useProfile } from "@/hooks/useProfile";
import ShippingAddress from "@/components/profile/ShippingAddress";
import { Loader2 } from "lucide-react";

const Address = () => {
  const { profile, isLoading, updateProfile } = useProfile();

  if (isLoading) {
    return (
      <ProfileLayout title="Shipping Address">
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout
      title="Shipping Address"
      description="Manage your delivery address for faster checkout."
    >
      {/* CENTER ALIGN WRAPPER */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <ShippingAddress
            profile={profile}
            onUpdate={updateProfile}
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Address;
