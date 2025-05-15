
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AccountSettings from "./sections/AccountSettings";
import AppearanceSettings from "./sections/AppearanceSettings";
import AvailabilitySettings from "./sections/AvailabilitySettings";

const SettingsTabs = () => {
  const [activeSection, setActiveSection] = useState("account");
  
  const handleSectionChange = (value: string) => {
    setActiveSection(value);
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs 
        defaultValue="account" 
        value={activeSection}
        onValueChange={handleSectionChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="availability">
          <AvailabilitySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;
