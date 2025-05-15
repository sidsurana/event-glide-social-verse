
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "This feature will be available soon",
    });
  };
  
  return (
    <div className="ios-section">
      <div className="flex flex-col items-center p-6 border-b border-border">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="https://i.pravatar.cc/300" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mb-1">John Doe</h2>
        <p className="text-muted-foreground mb-4">@johndoe</p>
        <Button onClick={handleEditProfile} className="flex items-center">
          <PenSquare className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
          <p className="text-lg">johndoe@example.com</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
          <p className="text-lg">(555) 123-4567</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
          <p className="text-lg">Los Angeles, CA</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
