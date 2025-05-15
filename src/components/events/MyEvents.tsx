
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventCard, { EventCardProps } from "./EventCard";
import { Calendar, Clock } from "lucide-react";

const sampleMyEvents = [
  {
    id: "7",
    title: "Weekly Book Club",
    date: "May 19, 2025",
    time: "7:00 PM",
    location: "City Library",
    description: "This week we're discussing 'The Midnight Library' by Matt Haig.",
    attendees: [
      { id: "u1", name: "Alex Johnson" },
      { id: "u3", name: "John Smith" },
      { id: "u5", name: "James Brown" },
    ],
    type: "social" as const
  }
];

const sampleJoinedEvents: EventCardProps[] = [
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
  }
];

const EmptyState = ({ type }: { type: string }) => (
  <div className="text-center py-10">
    <div className="mb-3 bg-muted rounded-full h-12 w-12 flex items-center justify-center mx-auto">
      {type === "created" ? (
        <Calendar className="h-6 w-6 text-muted-foreground" />
      ) : (
        <Clock className="h-6 w-6 text-muted-foreground" />
      )}
    </div>
    <h3 className="font-medium mb-1">No events {type === "created" ? "created" : "joined"} yet</h3>
    <p className="text-sm text-muted-foreground mb-4">
      {type === "created" 
        ? "Create your first event to get started"
        : "Join events to see them here"
      }
    </p>
  </div>
);

const MyEvents = () => {
  const [createdEvents, setCreatedEvents] = useState<EventCardProps[]>(sampleMyEvents);
  const [joinedEvents, setJoinedEvents] = useState<EventCardProps[]>(sampleJoinedEvents);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      
      <Tabs defaultValue="created">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="joined">Joined</TabsTrigger>
        </TabsList>
        
        <TabsContent value="created" className="space-y-4">
          {createdEvents.length > 0 ? (
            createdEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))
          ) : (
            <EmptyState type="created" />
          )}
        </TabsContent>
        
        <TabsContent value="joined" className="space-y-4">
          {joinedEvents.length > 0 ? (
            joinedEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))
          ) : (
            <EmptyState type="joined" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEvents;
