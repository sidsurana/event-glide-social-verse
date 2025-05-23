
import { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import AuthForm from "@/components/auth/AuthForm";
import EventExplorer from "@/components/events/EventExplorer";
import NotificationList from "@/components/notifications/NotificationList";
import SettingsTabs from "@/components/settings/SettingsTabs";
import MyEvents from "@/components/events/MyEvents";
import GroupsTabs from "@/components/groups/GroupsTabs";
import CreateEvent from "@/components/events/CreateEvent";
import AvailableNow from "@/components/availability/AvailableNow";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false for authentication flow
  const [activeTab, setActiveTab] = useState("explore");
  
  useEffect(() => {
    // Listen for navigation events from other components
    const handleNavigation = (event: CustomEvent<{ tab: string }>) => {
      setActiveTab(event.detail.tab);
    };
    
    window.addEventListener('app:navigate', handleNavigation as EventListener);
    
    return () => {
      window.removeEventListener('app:navigate', handleNavigation as EventListener);
    };
  }, []);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  if (!isLoggedIn) {
    return <AuthForm />;
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "explore":
        return <EventExplorer />;
      case "available":
        return <AvailableNow />;
      case "create":
        return <CreateEvent />;
      case "myEvents":
        return <MyEvents />;
      case "groups":
        return <GroupsTabs />;
      case "notifications":
        return <NotificationList />;
      case "settings":
        return <SettingsTabs />;
      default:
        return <EventExplorer />;
    }
  };
  
  return (
    <AppLayout initialTab={activeTab} onTabChange={handleTabChange}>
      {renderTabContent()}
    </AppLayout>
  );
};

export default Index;
