
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const CreateEvent = () => {
  const [eventType, setEventType] = useState<"social" | "networking">("social");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [inviteOption, setInviteOption] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleCreateEvent = () => {
    // Validate form
    if (!title || !date || !time || !location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      setIsSubmitting(false);
      
      // Reset form
      setTitle("");
      setDate(undefined);
      setTime("");
      setLocation("");
      setDescription("");
      setInviteOption("all");
    }, 1000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>
      
      <Tabs 
        defaultValue="social" 
        className="mb-6"
        onValueChange={(value) => setEventType(value as "social" | "networking")}
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="social">Social Event</TabsTrigger>
          <TabsTrigger value="networking">Networking Event</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Event Name <span className="text-ios-red">*</span>
          </label>
          <Input 
            className="ios-input" 
            placeholder={eventType === "social" ? "Beach Volleyball" : "Tech Startup Mixer"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Date <span className="text-ios-red">*</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "ios-input w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Time <span className="text-ios-red">*</span>
            </label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="ios-input">
                <SelectValue placeholder="Select time">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  ) : (
                    <span>Select time</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
                  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
                  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Location <span className="text-ios-red">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="ios-input pl-10" 
              placeholder="Event location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Description
          </label>
          <Textarea 
            className="ios-input min-h-[100px]" 
            placeholder="Describe your event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Invite
          </label>
          <Select value={inviteOption} onValueChange={setInviteOption}>
            <SelectTrigger className="ios-input">
              <SelectValue>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {inviteOption === "all" ? "All Friends" : 
                   inviteOption === "group" ? "Specific Group" : 
                   "Select People"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Friends</SelectItem>
              <SelectItem value="group">Specific Group</SelectItem>
              <SelectItem value="select">Select People</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-3 pt-4">
          <Button variant="outline" className="flex-1 ios-secondary-button">
            Cancel
          </Button>
          <Button 
            className="flex-1 ios-button"
            onClick={handleCreateEvent}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
