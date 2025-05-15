
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Moon, Sun, Laptop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const { toast } = useToast();
  
  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
    
    // Apply theme
    const root = window.document.documentElement;
    
    if (value === "dark") {
      root.classList.add("dark");
    } else if (value === "light") {
      root.classList.remove("dark");
    } else if (value === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    
    localStorage.setItem("theme", value);
    
    toast({
      title: "Theme Updated",
      description: `${value.charAt(0).toUpperCase() + value.slice(1)} theme applied`,
    });
  };
  
  return (
    <div className="ios-section">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Theme</h2>
        
        <RadioGroup value={theme} onValueChange={handleThemeChange as (value: string) => void} className="space-y-4">
          <div className="ios-card flex items-center space-x-3 cursor-pointer hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="light" id="light" className="mr-2" />
            <Sun className="h-5 w-5" />
            <Label htmlFor="light" className="flex-1 cursor-pointer">Light</Label>
          </div>
          
          <div className="ios-card flex items-center space-x-3 cursor-pointer hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="dark" id="dark" className="mr-2" />
            <Moon className="h-5 w-5" />
            <Label htmlFor="dark" className="flex-1 cursor-pointer">Dark</Label>
          </div>
          
          <div className="ios-card flex items-center space-x-3 cursor-pointer hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="system" id="system" className="mr-2" />
            <Laptop className="h-5 w-5" />
            <Label htmlFor="system" className="flex-1 cursor-pointer">System</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AppearanceSettings;
