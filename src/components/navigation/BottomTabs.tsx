
import { Compass, Clock, Plus, Calendar, Users } from "lucide-react";

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, isActive, onClick }: TabButtonProps) => (
  <button 
    className={`bottom-tab ${isActive ? "bottom-tab-active" : "bottom-tab-inactive"}`}
    onClick={onClick}
  >
    <div className="mb-0.5">{icon}</div>
    <span className="text-xs">{label}</span>
  </button>
);

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
      <div className="container grid grid-cols-5 h-16">
        <TabButton 
          icon={<Compass size={22} />} 
          label="Explore" 
          isActive={activeTab === "explore"} 
          onClick={() => handleTabChange("explore")} 
        />
        <TabButton 
          icon={<Clock size={22} />} 
          label="Available" 
          isActive={activeTab === "available"} 
          onClick={() => handleTabChange("available")} 
        />
        <TabButton 
          icon={<Plus size={22} className="text-white" />} 
          label="Create" 
          isActive={activeTab === "create"} 
          onClick={() => handleTabChange("create")} 
        />
        <TabButton 
          icon={<Calendar size={22} />} 
          label="My Events" 
          isActive={activeTab === "myEvents"} 
          onClick={() => handleTabChange("myEvents")} 
        />
        <TabButton 
          icon={<Users size={22} />} 
          label="Groups" 
          isActive={activeTab === "groups"} 
          onClick={() => handleTabChange("groups")} 
        />
      </div>
      
      {/* Create button floating circle */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <button 
          className="w-14 h-14 rounded-full bg-ios-blue flex items-center justify-center shadow-lg"
          onClick={() => handleTabChange("create")}
        >
          <Plus size={26} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default BottomTabs;
