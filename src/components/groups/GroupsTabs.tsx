
import { useState } from "react";
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
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const GroupCard = ({ name, memberCount, description }: { name: string; memberCount: number; description: string }) => {
  return (
    <div className="ios-card">
      <div className="flex items-center space-x-3 mb-2">
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{memberCount} members</p>
        </div>
      </div>
      <p className="text-sm line-clamp-2">{description}</p>
    </div>
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
  
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Group created successfully"
      });
      setIsSubmitting(false);
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
        <Button variant="outline" className="ios-secondary-button">
          Cancel
        </Button>
        <Button 
          onClick={handleCreateGroup} 
          disabled={isSubmitting}
          className="ios-button"
        >
          {isSubmitting ? "Creating..." : "Create Group"}
        </Button>
      </DialogFooter>
    </>
  );
};

const InviteFriendContent = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSendInvitation = () => {
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
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Invitation sent successfully"
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Invite a Friend</DialogTitle>
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
          <label className="text-sm font-medium flex items-center">
            <span className="text-muted-foreground text-xs">(optional)</span>
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
        <Button variant="outline" className="ios-secondary-button">
          Cancel
        </Button>
        <Button 
          onClick={handleSendInvitation} 
          disabled={isSubmitting}
          className="ios-button"
        >
          {isSubmitting ? "Sending..." : "Send Invitation"}
        </Button>
      </DialogFooter>
    </>
  );
};

const GroupsTabs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleCreateGroupClick = () => {
    toast({
      title: "Create Group",
      description: "Open the group creation dialog"
    });
  };
  
  const handleInviteFriend = () => {
    toast({
      title: "Invite Friend",
      description: "Open the invitation dialog"
    });
  };
  
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
          <EmptyGroupState />
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
