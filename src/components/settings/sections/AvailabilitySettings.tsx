
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const timezones = [
  "Pacific Time (PT)",
  "Mountain Time (MT)",
  "Central Time (CT)",
  "Eastern Time (ET)",
  "GMT",
  "Central European Time (CET)",
  "Japan Standard Time (JST)",
  "Australian Eastern Time (AET)"
];

const timeSlots = [
  { id: "early-morning", label: "Early Morning (6–9am)" },
  { id: "morning", label: "Morning (9am–12pm)" },
  { id: "early-afternoon", label: "Early Afternoon (12–3pm)" },
  { id: "late-afternoon", label: "Late Afternoon (3–6pm)" },
  { id: "evening", label: "Evening (6–9pm)" },
  { id: "night", label: "Night (9pm–12am)" }
];

const AvailabilitySettings = () => {
  const [timezone, setTimezone] = useState("Pacific Time (PT)");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleSlotToggle = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter(id => id !== slotId));
    } else {
      if (selectedSlots.length < 3) {
        setSelectedSlots([...selectedSlots, slotId]);
      } else {
        toast({
          title: "Limit Reached",
          description: "You can only select up to 3 time slots",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleSave = () => {
    toast({
      title: "Availability Saved",
      description: `Timezone: ${timezone}, Selected slots: ${selectedSlots.length}`
    });
  };
  
  return (
    <div className="ios-section">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold mb-6">Timezone</h2>
        
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger className="ios-input">
            <SelectValue placeholder="Select your timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map(tz => (
              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Availability</h2>
          <span className="text-sm text-muted-foreground">
            {selectedSlots.length}/3 selected
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Select up to 3 time slots when you're typically available
        </p>
        
        <div className="space-y-4 mb-6">
          {timeSlots.map(slot => (
            <div 
              key={slot.id}
              className="flex items-center space-x-3 ios-card hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => handleSlotToggle(slot.id)}
            >
              <Checkbox 
                id={slot.id} 
                checked={selectedSlots.includes(slot.id)}
                onCheckedChange={() => {}}
                className="mr-2"
              />
              <Label htmlFor={slot.id} className="flex-1 cursor-pointer">
                {slot.label}
              </Label>
            </div>
          ))}
        </div>
        
        <Button onClick={handleSave} className="w-full ios-button">
          Save Availability
        </Button>
      </div>
    </div>
  );
};

export default AvailabilitySettings;
