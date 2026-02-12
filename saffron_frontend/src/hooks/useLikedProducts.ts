import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000/api";

export interface LikedProduct {
  product_id: number;
}

export const useLikedProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikedProducts = useCallback(async () => {
    if (!user || !user.token) {
      setLikedProducts([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/liked`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLikedProducts(data || []);
      }
    } catch (error) {
      console.error("Error fetching liked products:", error);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchLikedProducts();
  }, [fetchLikedProducts]);

  const toggleLike = async (productId: number) => {
    if (!user || !user.token) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to save products",
        variant: "destructive",
      });
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/users/liked`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle like");
      }

      toast({
        title: data.liked ? "Added to wishlist" : "Removed",
        description: data.message,
      });

      await fetchLikedProducts();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const isProductLiked = (productId: number) => {
    return likedProducts.some((item) => item.product_id === productId);
  };

  const likedCount = likedProducts.length;

  return {
    likedProducts,
    isLoading,
    toggleLike,
    isProductLiked,
    likedCount,
    refetch: fetchLikedProducts,
  };
};
