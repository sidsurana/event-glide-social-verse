
import { useState, ReactNode } from "react";
import TopBar from "@/components/navigation/TopBar";
import BottomTabs from "@/components/navigation/BottomTabs";

interface AppLayoutProps {
  children: ReactNode;
  initialTab?: string;
}

const AppLayout = ({ children, initialTab = "explore" }: AppLayoutProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 container mx-auto px-4 pb-24 pt-4">
        {children}
      </main>
      <BottomTabs onTabChange={handleTabChange} />
    </div>
  );
};

export default AppLayout;
