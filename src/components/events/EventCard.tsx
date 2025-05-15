
import { useState } from "react";
import { Calendar, MapPin, Users, ChevronRight, Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  maxAttendees?: number;
  type: "social" | "networking";
}

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  description,
  attendees,
  maxAttendees,
  type
}: EventCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const displayedAttendees = attendees.slice(0, 5);
  const remainingCount = attendees.length > 5 ? attendees.length - 5 : 0;
  
  return (
    <div className="ios-card mb-4 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={toggleFavorite}>
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-ios-red text-ios-red" : ""}`} />
        </button>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Calendar className="h-4 w-4 mr-1.5" />
        <span>{date} • {time}</span>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <MapPin className="h-4 w-4 mr-1.5" />
        <span>{location}</span>
      </div>
      
      <p className="text-sm mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-2">
            <TooltipProvider delayDuration={300}>
              {displayedAttendees.map((attendee) => (
                <Tooltip key={attendee.id}>
                  <TooltipTrigger asChild>
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={attendee.avatar || `https://i.pravatar.cc/100?u=${attendee.id}`} />
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">{attendee.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              
              {remainingCount > 0 && (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +{remainingCount}
                </div>
              )}
            </TooltipProvider>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {maxAttendees ? `${attendees.length}/${maxAttendees}` : `${attendees.length} attending`}
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="text-xs flex items-center">
          {type === "networking" ? "Apply" : "Join"}
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
