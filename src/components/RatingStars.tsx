
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RatingStarsProps {
  initialRating?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
  materialId?: string;
}

const RatingStars = ({ 
  initialRating = 0, 
  readOnly = false, 
  size = "md",
  onChange,
  materialId
}: RatingStarsProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-4 w-4";
      case "lg": return "h-7 w-7";
      default: return "h-5 w-5";
    }
  };

  const handleRatingClick = async (selectedRating: number) => {
    if (readOnly) return;
    
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRating(selectedRating);
      onChange?.(selectedRating);
      
      toast({
        title: "Rating Submitted",
        description: `Thank you for rating this material with ${selectedRating} stars!`,
      });
    } catch (error) {
      toast({
        title: "Failed to Submit Rating",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly || isSubmitting}
          className={`${readOnly ? "cursor-default" : "cursor-pointer"} focus:outline-none transition-colors duration-200`}
          onMouseEnter={() => !readOnly && setHoveredRating(star)}
          onMouseLeave={() => !readOnly && setHoveredRating(0)}
          onClick={() => handleRatingClick(star)}
        >
          <Star
            className={`${getSizeClass()} ${
              star <= (hoveredRating || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${!readOnly && "hover:scale-110 transition-transform duration-200"}`}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
