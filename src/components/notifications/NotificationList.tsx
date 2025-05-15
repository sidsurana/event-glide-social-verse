
import { useState } from "react";
import { X, Bell, AlertCircle, Map, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "cancelled" | "location_change" | "time_change" | "reminder";
  title: string;
  message: string;
  eventId: string;
  time: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: "n1",
    type: "cancelled",
    title: "Event Cancelled",
    message: "Beach Volleyball Tournament has been cancelled due to weather.",
    eventId: "1",
    time: "10 min ago",
    read: false
  },
  {
    id: "n2",
    type: "location_change",
    title: "Location Changed",
    message: "The location for Tech Startup Mixer has been changed to Downtown Conference Center.",
    eventId: "4",
    time: "2 hours ago",
    read: false
  },
  {
    id: "n3",
    type: "time_change",
    title: "Time Changed",
    message: "Movie Night: Classic Films will now start at 8:00 PM instead of 7:30 PM.",
    eventId: "2",
    time: "Yesterday",
    read: true
  },
  {
    id: "n4",
    type: "reminder",
    title: "Upcoming Event",
    message: "Don't forget: Hiking Adventure is tomorrow at 9:00 AM.",
    eventId: "3",
    time: "Yesterday",
    read: true
  }
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "cancelled":
      return <AlertCircle className="h-5 w-5 text-ios-red" />;
    case "location_change":
      return <Map className="h-5 w-5 text-ios-blue" />;
    case "time_change":
      return <Clock className="h-5 w-5 text-ios-orange" />;
    case "reminder":
      return <Calendar className="h-5 w-5 text-ios-green" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  
  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="ios-section rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-ios-red text-white text-xs font-medium rounded-full h-5 min-w-[20px] inline-flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>
      
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`ios-list-item ${notification.read ? "" : "bg-muted/30"}`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-background rounded-full">
                  {getNotificationIcon(notification.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{notification.title}</h3>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-ios-blue" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="text-xs">
                  View Details
                </Button>
                <button 
                  onClick={() => handleDismiss(notification.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="mb-3 bg-muted rounded-full h-12 w-12 flex items-center justify-center mx-auto">
            <Bell className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-1">No notifications</h3>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
