
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import EventCard, { EventCardProps } from "./EventCard";
import { X, Check } from "lucide-react";

interface SwipeableEventCardProps extends EventCardProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SwipeableEventCard = (props: SwipeableEventCardProps) => {
  const { onSwipeLeft, onSwipeRight } = props;
  const [startX, setStartX] = useState<number | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setCurrentOffset(diff);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX === null || !isSwiping) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setCurrentOffset(diff);
  };

  const handleTouchEnd = () => {
    completeSwipe();
  };

  const handleMouseUp = () => {
    completeSwipe();
  };

  const handleMouseLeave = () => {
    if (isSwiping) {
      completeSwipe();
    }
  };

  const completeSwipe = () => {
    const threshold = 100; // Minimum distance for a swipe to register
    
    if (currentOffset > threshold) {
      // Swiped right
      toast({
        title: "Interested",
        description: "You're interested in this event",
      });
      if (onSwipeRight) onSwipeRight();
    } else if (currentOffset < -threshold) {
      // Swiped left
      toast({
        title: "Skipped",
        description: "You've skipped this event",
      });
      if (onSwipeLeft) onSwipeLeft();
    }
    
    // Reset swipe state
    setStartX(null);
    setCurrentOffset(0);
    setIsSwiping(false);
  };

  const swipeStyles = {
    transform: `translateX(${currentOffset}px) rotate(${currentOffset * 0.05}deg)`,
    transition: isSwiping ? 'none' : 'transform 0.3s ease',
    zIndex: isSwiping ? 10 : 1
  };

  const getOpacity = () => {
    if (currentOffset === 0) return 0;
    return Math.min(Math.abs(currentOffset) / 100, 1) * 0.8;
  };

  const leftIndicatorStyle = {
    opacity: currentOffset < 0 ? getOpacity() : 0,
  };

  const rightIndicatorStyle = {
    opacity: currentOffset > 0 ? getOpacity() : 0,
  };

  return (
    <div 
      ref={cardRef}
      className="relative touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={swipeStyles}
    >
      {/* Left indicator (swipe left = no) */}
      <div 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-ios-red text-white rounded-full p-2"
        style={leftIndicatorStyle}
      >
        <X className="h-6 w-6" />
      </div>
      
      {/* Right indicator (swipe right = yes) */}
      <div 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-ios-green text-white rounded-full p-2"
        style={rightIndicatorStyle}
      >
        <Check className="h-6 w-6" />
      </div>
      
      <EventCard {...props} />
    </div>
  );
};

export default SwipeableEventCard;
