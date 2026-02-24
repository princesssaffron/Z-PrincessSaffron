import ProfileLayout from "./ProfileLayout";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { Loader2 } from "lucide-react";

const EditProfile = () => {
    const { user } = useAuth();
    const { profile, isLoading, updateProfile } = useProfile();

    if (isLoading) {
        return (
            <ProfileLayout title="Edit Profile">
                <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
            </ProfileLayout>
        )
    }

    return (
        <ProfileLayout
            title="Edit Profile"
            description="Update your personal information and contact details."
        >
            <div className="max-w-4xl mx-auto w-full">

                <ProfileOverview
                    profile={profile}
                    userEmail={user?.email}
                    userId={user?._id}
                    onUpdate={updateProfile}
                />
            </div>
        </ProfileLayout>
    );
};

export default EditProfile;
