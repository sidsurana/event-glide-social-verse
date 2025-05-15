
import { useState } from "react";
import { Search, Bell, Settings, ChevronDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface TopBarProps {
  activeTab?: string;
}

const TopBar = ({ activeTab }: TopBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    const event = new CustomEvent('app:navigate', { detail: { tab: 'notifications' } });
    window.dispatchEvent(event);
  };
  
  const handleSettingsClick = () => {
    const event = new CustomEvent('app:navigate', { detail: { tab: 'settings' } });
    window.dispatchEvent(event);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {isSearching ? (
          <div className="flex-1 flex items-center">
            <Input 
              className="ios-input" 
              placeholder="Search events, groups..." 
              autoFocus
              onBlur={() => setIsSearching(false)}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearching(true)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <ThemeToggle />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleNotificationClick}
                className="p-2 rounded-full hover:bg-secondary transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-ios-red rounded-full" />
              </button>
              
              <button 
                onClick={handleSettingsClick}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/300" alt="User Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-ios-red">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
