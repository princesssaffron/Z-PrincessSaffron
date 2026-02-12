import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000/api";

export interface Profile {
  _id: string;
  fullName: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  alternate_phone: string | null;
  shipping_address: string | null;
  shipping_area: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  shipping_country: string | null;
}

export interface ProfileUpdate {
  fullName?: string;
  avatar_url?: string;
  phone?: string;
  alternate_phone?: string;
  shipping_address?: string;
  shipping_area?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_pincode?: string;
  shipping_country?: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user || !user.token) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    setIsLoading(false);
  }, [user]);

  const updateProfile = async (updates: ProfileUpdate): Promise<boolean> => {
    if (!user || !user.token) return false;

    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      await fetchProfile();
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return false;
    }
  };

  const hasCompleteAddress = (): boolean => {
    if (!profile) return false;
    return !!(
      profile.fullName &&
      profile.phone &&
      profile.shipping_address &&
      profile.shipping_city &&
      profile.shipping_state &&
      profile.shipping_pincode
    );
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    fetchProfile,
    updateProfile,
    hasCompleteAddress,
  };
};
