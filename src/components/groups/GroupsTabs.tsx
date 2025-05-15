
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, MessageCircle, Calendar, Plus, Mail, Phone, UserPlus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EventCard from "../events/EventCard";

// Type definitions
interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface GroupEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: User[];
  type: "social" | "networking";
  groupId: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  events: GroupEvent[];
  createdAt: string;
}

// Sample data
const currentUser: User = {
  id: "current-user",
  name: "You",
  email: "you@example.com"
};

const sampleGroups: Group[] = [];

const GroupCard = ({ group, onSelect }: { group: Group; onSelect: (group: Group) => void }) => {
  return (
    <Card className="ios-card hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => onSelect(group)}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-medium">{group.name}</CardTitle>
            <CardDescription className="text-xs">{group.members.length} members</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{group.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground">{group.events.length} events</p>
      </CardFooter>
    </Card>
  );
};

const EmptyGroupState = () => (
  <div className="text-center py-10">
    <div className="mb-3 bg-muted rounded-full h-12 w-12 flex items-center justify-center mx-auto">
      <Users className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="font-medium mb-1">No groups yet</h3>
    <p className="text-sm text-muted-foreground mb-4">
      Create a group or join existing ones
    </p>
    
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ios-button">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CreateGroupContent />
      </DialogContent>
    </Dialog>
  </div>
);

const CreateGroupContent = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleCreateGroup = (onClose: () => void) => {
    if (!groupName.trim()) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new group
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: groupName.trim(),
      description: description.trim(),
      members: [currentUser],
      events: [],
      createdAt: new Date().toISOString()
    };
    
    // Add group to global state
    window.setTimeout(() => {
      // We use the CustomEvent to share data between components
      const event = new CustomEvent('group:create', { 
        detail: { group: newGroup }
      });
      window.dispatchEvent(event);
      
      toast({
        title: "Success",
        description: "Group created successfully"
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Group</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Group Name <span className="text-ios-red">*</span>
          </label>
          <Input 
            className="ios-input" 
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Description <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <Textarea 
            className="ios-input" 
            placeholder="Describe your group"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="ios-secondary-button">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button 
            onClick={(e) => {
              e.preventDefault();
              const closeBtn = e.currentTarget.closest("div").querySelector("[data-state]");
              handleCreateGroup(() => {
                if (closeBtn instanceof HTMLElement) {
                  closeBtn.click();
                }
              });
            }} 
            disabled={isSubmitting}
            className="ios-button"
          >
            {isSubmitting ? "Creating..." : "Create Group"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

const InviteFriendContent = ({ groupId }: { groupId?: string }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSendInvitation = (onClose: () => void) => {
    if (!email && !phone) {
      toast({
        title: "Error",
        description: "Email or phone number is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    window.setTimeout(() => {
      const newMember: User = {
        id: `user-${Date.now()}`,
        name: name || (email ? email.split('@')[0] : 'Friend'),
        email: email || undefined
      };
      
      // We use the CustomEvent to share data between components
      const event = new CustomEvent('group:invite', { 
        detail: { 
          groupId,
          member: newMember
        }
      });
      window.dispatchEvent(event);
      
      toast({
        title: "Success",
        description: "Invitation sent successfully"
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite a Friend</DialogTitle>
        {groupId && <DialogDescription>Invite a friend to your group</DialogDescription>}
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email Address
          </label>
          <Input 
            className="ios-input" 
            placeholder="friend@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Phone Number
          </label>
          <Input 
            className="ios-input" 
            placeholder="(555) 123-4567"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Friend's Name <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <Input 
            className="ios-input" 
            placeholder="Friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="ios-secondary-button">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button 
            onClick={(e) => {
              e.preventDefault();
              const closeBtn = e.currentTarget.closest("div").querySelector("[data-state]");
              handleSendInvitation(() => {
                if (closeBtn instanceof HTMLElement) {
                  closeBtn.click();
                }
              });
            }} 
            disabled={isSubmitting}
            className="ios-button"
          >
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

const CreateGroupEventContent = ({ group, onEventCreate }: { group: Group, onEventCreate: (event: GroupEvent) => void }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleCreateEvent = (onClose: () => void) => {
    if (!title.trim() || !date || !time || !location.trim()) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const newEvent: GroupEvent = {
      id: `event-${Date.now()}`,
      title: title.trim(),
      date,
      time,
      location: location.trim(),
      description: description.trim(),
      attendees: [currentUser],
      type: "social",
      groupId: group.id
    };
    
    window.setTimeout(() => {
      onEventCreate(newEvent);
      
      toast({
        title: "Success",
        description: "Event created successfully"
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Group Event</DialogTitle>
        <DialogDescription>Create an event for {group.name}</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Event Title <span className="text-ios-red">*</span>
          </label>
          <Input 
            className="ios-input" 
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Date <span className="text-ios-red">*</span>
            </label>
            <Input 
              className="ios-input" 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Time <span className="text-ios-red">*</span>
            </label>
            <Input 
              className="ios-input" 
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Location <span className="text-ios-red">*</span>
          </label>
          <Input 
            className="ios-input" 
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Description <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <Textarea 
            className="ios-input" 
            placeholder="Describe your event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" className="ios-secondary-button">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button 
            onClick={(e) => {
              e.preventDefault();
              const closeBtn = e.currentTarget.closest("div").querySelector("[data-state]");
              handleCreateEvent(() => {
                if (closeBtn instanceof HTMLElement) {
                  closeBtn.click();
                }
              });
            }} 
            disabled={isSubmitting}
            className="ios-button"
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

const GroupDetail = ({ group, onBack }: { group: Group, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<GroupEvent[]>(group.events);
  const { toast } = useToast();
  
  const handleAddEvent = (event: GroupEvent) => {
    setEvents(prev => [...prev, event]);
    
    // We use the CustomEvent to update the global group state
    const updateEvent = new CustomEvent('group:addEvent', { 
      detail: { 
        groupId: group.id,
        event
      }
    });
    window.dispatchEvent(updateEvent);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 p-2" 
          onClick={onBack}
        >
          <span className="sr-only">Back</span>
          &larr;
        </Button>
        <h2 className="text-xl font-semibold">{group.name}</h2>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
        </p>
        
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ios-secondary-button">
                <UserPlus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <InviteFriendContent groupId={group.id} />
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="ios-button">
                <Plus className="h-4 w-4 mr-1" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateGroupEventContent group={group} onEventCreate={handleAddEvent} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="events">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            Members
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map(event => (
                <EventCard 
                  key={event.id}
                  {...event}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No events in this group yet</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="ios-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CreateGroupEventContent group={group} onEventCreate={handleAddEvent} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="members">
          <div className="space-y-3">
            {group.members.map(member => (
              <div key={member.id} className="flex items-center p-3 rounded-md border">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  {member.email && <p className="text-xs text-muted-foreground">{member.email}</p>}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="chat">
          <div className="text-center py-10">
            <p className="text-muted-foreground">Chat functionality coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const GroupsTabs = () => {
  const [groups, setGroups] = useState<Group[]>(sampleGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { toast } = useToast();

  // Listen for group creation and updates
  useEffect(() => {
    const handleGroupCreate = (e: CustomEvent<{ group: Group }>) => {
      setGroups(prev => [...prev, e.detail.group]);
    };
    
    const handleGroupInvite = (e: CustomEvent<{ groupId?: string, member: User }>) => {
      if (e.detail.groupId) {
        setGroups(prev => prev.map(group => {
          if (group.id === e.detail.groupId) {
            return {
              ...group,
              members: [...group.members, e.detail.member]
            };
          }
          return group;
        }));
      }
    };
    
    const handleAddEvent = (e: CustomEvent<{ groupId: string, event: GroupEvent }>) => {
      setGroups(prev => prev.map(group => {
        if (group.id === e.detail.groupId) {
          return {
            ...group,
            events: [...group.events, e.detail.event]
          };
        }
        return group;
      }));
    };
    
    window.addEventListener('group:create', handleGroupCreate as EventListener);
    window.addEventListener('group:invite', handleGroupInvite as EventListener);
    window.addEventListener('group:addEvent', handleAddEvent as EventListener);
    
    return () => {
      window.removeEventListener('group:create', handleGroupCreate as EventListener);
      window.removeEventListener('group:invite', handleGroupInvite as EventListener);
      window.removeEventListener('group:addEvent', handleAddEvent as EventListener);
    };
  }, []);
  
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
  };
  
  if (selectedGroup) {
    return <GroupDetail group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Groups</h1>
        
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ios-secondary-button">
                <UserPlus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <InviteFriendContent />
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="ios-button">
                <Plus className="h-4 w-4 mr-1" />
                New Group
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateGroupContent />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Search groups..." 
          className="ios-input pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="my-groups">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="my-groups">
            <Users className="h-4 w-4 mr-2" />
            My Groups
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="availability">
            <Calendar className="h-4 w-4 mr-2" />
            Availability
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-groups">
          {filteredGroups.length > 0 ? (
            <div className="space-y-4">
              {filteredGroups.map(group => (
                <GroupCard 
                  key={group.id} 
                  group={group} 
                  onSelect={handleSelectGroup}
                />
              ))}
            </div>
          ) : (
            <EmptyGroupState />
          )}
        </TabsContent>
        
        <TabsContent value="chat">
          <div className="text-center py-10">
            <p className="text-muted-foreground">Join a group to start chatting</p>
          </div>
        </TabsContent>
        
        <TabsContent value="availability">
          <div className="text-center py-10">
            <p className="text-muted-foreground">No availability data yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupsTabs;
