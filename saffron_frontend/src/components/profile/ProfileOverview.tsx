import { useState, useRef } from "react";
import { User, Camera, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Profile, ProfileUpdate } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileOverviewProps {
  profile: Profile | null;
  userEmail: string | undefined;
  userId: string | undefined;
  onUpdate: (updates: ProfileUpdate) => Promise<boolean>;
}

const ProfileOverview = ({ profile, userEmail, userId, onUpdate }: ProfileOverviewProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    phone: profile?.phone || "",
    alternate_phone: profile?.alternate_phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onUpdate(formData);
    if (success) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile?.fullName || "",
      phone: profile?.phone || "",
      alternate_phone: profile?.alternate_phone || "",
    });
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/avatar.${fileExt}`;

      // Delete old avatar if exists
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split("/avatars/")[1];
        if (oldPath) {
          await supabase.storage.from("avatars").remove([oldPath]);
        }
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const success = await onUpdate({ avatar_url: `${publicUrl}?t=${Date.now()}` });

      if (success) {
        toast({
          title: "Avatar updated",
          description: "Your profile photo has been updated",
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-royal-purple">Profile Overview</h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-gold border-gold hover:bg-gold/10"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-royal-purple/10 flex items-center justify-center overflow-hidden">
              {isUploadingAvatar ? (
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
              ) : profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-royal-purple/50" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-50"
              title="Upload photo"
            >
              <Camera className="w-4 h-4 text-royal-purple-dark" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isUploadingAvatar ? "Uploading..." : "Click to upload"}
          </p>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-foreground py-2">{profile?.fullName || "Not set"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              <p className="text-foreground py-2">{userEmail || profile?.email || "Not set"}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Primary Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-foreground py-2">{profile?.phone || "Not set"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="alternate_phone">Alternate Phone (Optional)</Label>
              {isEditing ? (
                <Input
                  id="alternate_phone"
                  name="alternate_phone"
                  value={formData.alternate_phone}
                  onChange={handleInputChange}
                  placeholder="Enter alternate phone"
                />
              ) : (
                <p className="text-foreground py-2">{profile?.alternate_phone || "Not set"}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gold text-royal-purple-dark hover:bg-gold-light"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
