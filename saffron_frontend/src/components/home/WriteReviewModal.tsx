import { useState } from "react";
import { Star } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  reviewText: z.string().trim().min(10, "Review must be at least 10 characters").max(500, "Review must be less than 500 characters"),
  reviewerName: z.string().trim().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  location: z.string().trim().max(50, "Location must be less than 50 characters").optional(),
});

interface WriteReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewSubmitted: () => void;
}

const WriteReviewModal = ({ open, onOpenChange, onReviewSubmitted }: WriteReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setReviewText("");
    setReviewerName("");
    setLocation("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse({
      rating,
      reviewText,
      reviewerName,
      location: location || undefined,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        rating: result.data.rating,
        review_text: result.data.reviewText,
        reviewer_name: result.data.reviewerName,
        location: result.data.location || null,
      });

      if (error) throw error;

      toast({
        title: "Review Submitted",
        description: "Thank you for sharing your experience with us!",
      });

      resetForm();
      onOpenChange(false);
      onReviewSubmitted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-ivory border-gold/20">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-royal-purple text-center">
            Share Your Experience
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Help others discover the magic of pure Kashmiri saffron
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Star Rating */}
          <div className="text-center">
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Your Rating
            </Label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-gold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-destructive text-sm mt-2">{errors.rating}</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <Label htmlFor="reviewText" className="text-sm font-medium text-foreground">
              Your Review
            </Label>
            <Textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience with our saffron..."
              className="mt-2 min-h-[120px] border-gold/20 focus:border-gold bg-background"
            />
            {errors.reviewText && (
              <p className="text-destructive text-sm mt-1">{errors.reviewText}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="reviewerName" className="text-sm font-medium text-foreground">
              Your Name
            </Label>
            <Input
              id="reviewerName"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 border-gold/20 focus:border-gold bg-background"
            />
            {errors.reviewerName && (
              <p className="text-destructive text-sm mt-1">{errors.reviewerName}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-foreground">
              City (Optional)
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Mumbai, Delhi"
              className="mt-2 border-gold/20 focus:border-gold bg-background"
            />
            {errors.location && (
              <p className="text-destructive text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
  <Button
    type="submit"
    disabled={isSubmitting}
    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E6C76A] text-royal-purple-dark font-medium text-sm tracking-wide rounded-full transition-all duration-300 hover:shadow-gold-glow hover:scale-105 disabled:opacity-60"
  >
    {isSubmitting ? (
      <>
        <span className="w-4 h-4 border-2 border-royal-purple-dark/30 border-t-royal-purple-dark rounded-full animate-spin" />
        Submitting...
      </>
    ) : (
      "Submit Review"
    )}
  </Button>
</div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewModal;
