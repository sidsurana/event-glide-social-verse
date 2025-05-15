
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface FriendAvailability {
  id: string;
  name: string;
  avatar?: string;
  availableUntil: string;
  lastActive: string;
}

const sampleAvailableFriends: FriendAvailability[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    availableUntil: "6:30 PM",
    lastActive: "Just now",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "u2",
    name: "Maria Garcia",
    availableUntil: "7:00 PM",
    lastActive: "5 min ago",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "u3",
    name: "John Smith",
    availableUntil: "8:00 PM",
    lastActive: "20 min ago",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

const sampleUpcomingFriends: FriendAvailability[] = [
  {
    id: "u5",
    name: "James Brown",
    availableUntil: "9:00 PM",
    lastActive: "1 hour ago",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: "u8",
    name: "Olivia Martin",
    availableUntil: "10:00 PM",
    lastActive: "30 min ago",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

const FriendAvailabilityCard = ({ friend }: { friend: FriendAvailability }) => {
  const { toast } = useToast();
  
  const handleInvite = () => {
    toast({
      title: "Invite Sent",
      description: `Invitation sent to ${friend.name}`,
    });
  };
  
  return (
    <Card className="ios-card mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={friend.avatar || `https://i.pravatar.cc/150?u=${friend.id}`} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium">{friend.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Available until {friend.availableUntil}</span>
              </div>
            </div>
          </div>
          
          <div>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
              Available
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Active {friend.lastActive}
          </span>
          
          <Button size="sm" onClick={handleInvite}>
            Invite
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ type }: { type: "now" | "upcoming" }) => (
  <div className="text-center py-10">
    <div className="mb-3 bg-muted rounded-full h-12 w-12 flex items-center justify-center mx-auto">
      {type === "now" ? (
        <Clock className="h-6 w-6 text-muted-foreground" />
      ) : (
        <Calendar className="h-6 w-6 text-muted-foreground" />
      )}
    </div>
    <h3 className="font-medium mb-1">
      {type === "now" ? "No one available right now" : "No upcoming availability"}
    </h3>
    <p className="text-sm text-muted-foreground">
      {type === "now" 
        ? "Check back later or view upcoming availability"
        : "Your friends haven't set their upcoming availability yet"
      }
    </p>
  </div>
);

const AvailableNow = () => {
  const [nowFriends, setNowFriends] = useState<FriendAvailability[]>(sampleAvailableFriends);
  const [upcomingFriends, setUpcomingFriends] = useState<FriendAvailability[]>(sampleUpcomingFriends);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available</h1>
      
      <Tabs defaultValue="now">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="now">Available Now</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="now" className="space-y-4">
          {nowFriends.length > 0 ? (
            nowFriends.map(friend => (
              <FriendAvailabilityCard key={friend.id} friend={friend} />
            ))
          ) : (
            <EmptyState type="now" />
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingFriends.length > 0 ? (
            upcomingFriends.map(friend => (
              <FriendAvailabilityCard key={friend.id} friend={friend} />
            ))
          ) : (
            <EmptyState type="upcoming" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvailableNow;
