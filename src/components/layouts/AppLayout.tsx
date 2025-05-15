
import { useState, ReactNode } from "react";
import TopBar from "@/components/navigation/TopBar";
import BottomTabs from "@/components/navigation/BottomTabs";

interface AppLayoutProps {
  children: ReactNode;
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}

const AppLayout = ({ children, initialTab = "explore", onTabChange }: AppLayoutProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar activeTab={activeTab} />
      <main className="flex-1 container mx-auto px-4 pb-24 pt-4">
        {children}
      </main>
      <BottomTabs activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default AppLayout;
