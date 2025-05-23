
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import SwipeableEventCard from "./SwipeableEventCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data
const sampleSocialEvents = [
  {
    id: "1",
    title: "Beach Volleyball Tournament",
    date: "May 20, 2025",
    time: "3:00 PM",
    location: "Santa Monica Beach",
    description: "Join us for a fun beach volleyball tournament! All skill levels welcome.",
    attendees: [
      { id: "u1", name: "Alex Johnson" },
      { id: "u2", name: "Maria Garcia" },
      { id: "u3", name: "John Smith" },
      { id: "u4", name: "Emma Wilson" },
      { id: "u5", name: "James Brown" },
      { id: "u6", name: "Sophia Lee" },
      { id: "u7", name: "Robert Davis" },
    ],
    type: "social" as const
  },
  {
    id: "2",
    title: "Movie Night: Classic Films",
    date: "May 22, 2025",
    time: "7:30 PM",
    location: "Central Park",
    description: "Outdoor movie night featuring classic films. Bring blankets and snacks!",
    attendees: [
      { id: "u1", name: "Alex Johnson" },
      { id: "u8", name: "Olivia Martin" },
      { id: "u9", name: "Daniel Taylor" },
    ],
    type: "social" as const
  },
  {
    id: "3",
    title: "Hiking Adventure",
    date: "May 25, 2025",
    time: "9:00 AM",
    location: "Runyon Canyon",
    description: "Moderate hiking trail with beautiful views. Dogs welcome!",
    attendees: [
      { id: "u2", name: "Maria Garcia" },
      { id: "u5", name: "James Brown" },
      { id: "u10", name: "Isabella Lopez" },
      { id: "u11", name: "Michael Wilson" },
    ],
    type: "social" as const
  }
];

const sampleNetworkingEvents = [
  {
    id: "4",
    title: "Tech Startup Mixer",
    date: "May 21, 2025",
    time: "6:00 PM",
    location: "The Innovation Hub",
    description: "Connect with founders, investors, and tech enthusiasts in this casual mixer.",
    attendees: [
      { id: "u12", name: "David Chen" },
      { id: "u13", name: "Sarah Johnson" },
      { id: "u14", name: "Raj Patel" },
      { id: "u15", name: "Lisa Wong" },
    ],
    maxAttendees: 30,
    type: "networking" as const
  },
  {
    id: "5",
    title: "Creative Industries Networking",
    date: "May 23, 2025",
    time: "7:00 PM",
    location: "Design District Gallery",
    description: "For photographers, designers, artists and other creative professionals to connect and collaborate.",
    attendees: [
      { id: "u16", name: "Thomas Clark" },
      { id: "u17", name: "Natalie Kim" },
      { id: "u18", name: "Carlos Rodriguez" },
      { id: "u19", name: "Emma Thompson" },
      { id: "u20", name: "Justin Park" },
    ],
    maxAttendees: 25,
    type: "networking" as const
  },
  {
    id: "6",
    title: "Women in Business Brunch",
    date: "May 26, 2025",
    time: "10:00 AM",
    location: "Skyline Restaurant",
    description: "Professional networking event celebrating women entrepreneurs and leaders.",
    attendees: [
      { id: "u2", name: "Maria Garcia" },
      { id: "u8", name: "Olivia Martin" },
      { id: "u17", name: "Natalie Kim" },
      { id: "u21", name: "Sophia Chen" },
      { id: "u22", name: "Amanda Wallace" },
      { id: "u23", name: "Nicole Patel" },
    ],
    maxAttendees: 40,
    type: "networking" as const
  }
];

const EventExplorer = () => {
  const [socialEvents, setSocialEvents] = useState(sampleSocialEvents);
  const [networkingEvents, setNetworkingEvents] = useState(sampleNetworkingEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("social");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredSocialEvents = socialEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredNetworkingEvents = networkingEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleRemoveSocialEvent = (id: string) => {
    setSocialEvents(prev => prev.filter(event => event.id !== id));
  };
  
  const handleRemoveNetworkingEvent = (id: string) => {
    setNetworkingEvents(prev => prev.filter(event => event.id !== id));
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const currentSocialEvent = filteredSocialEvents[0];
  const currentNetworkingEvent = filteredNetworkingEvents[0];

  return (
    <div>
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Search events..." 
          className="ios-input pl-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="social" className="min-h-[300px] flex flex-col items-center justify-center">
          {filteredSocialEvents.length > 0 ? (
            <div className="w-full max-w-md mx-auto">
              <SwipeableEventCard 
                key={currentSocialEvent.id}
                {...currentSocialEvent}
                onSwipeLeft={() => handleRemoveSocialEvent(currentSocialEvent.id)}
                onSwipeRight={() => handleRemoveSocialEvent(currentSocialEvent.id)}
              />
              <div className="text-center text-sm text-muted-foreground mt-4">
                {filteredSocialEvents.length} events remaining
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No more social events</p>
              <Button 
                onClick={() => setSocialEvents(sampleSocialEvents)} 
                className="ios-button"
              >
                Refresh Events
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="networking" className="min-h-[300px] flex flex-col items-center justify-center">
          {filteredNetworkingEvents.length > 0 ? (
            <div className="w-full max-w-md mx-auto">
              <SwipeableEventCard 
                key={currentNetworkingEvent.id}
                {...currentNetworkingEvent}
                onSwipeLeft={() => handleRemoveNetworkingEvent(currentNetworkingEvent.id)}
                onSwipeRight={() => handleRemoveNetworkingEvent(currentNetworkingEvent.id)}
              />
              <div className="text-center text-sm text-muted-foreground mt-4">
                {filteredNetworkingEvents.length} events remaining
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No more networking events</p>
              <Button 
                onClick={() => setNetworkingEvents(sampleNetworkingEvents)} 
                className="ios-button"
              >
                Refresh Events
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventExplorer;
