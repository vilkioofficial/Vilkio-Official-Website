import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IntroVideo from "@/components/IntroVideo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotificationPanel from "@/components/NotificationPanel";
import ChatWidget from "@/components/ChatWidget";
import HomePage from "@/pages/home";
import HelpPage from "@/pages/help";
import HelpTopicPage from "@/pages/help-topic";
import BasicsPage from "@/pages/basics";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import WebsitesPage from "@/pages/websites";
import AdminControlPage from "@/pages/admin-control";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/help/:id" component={HelpTopicPage} />
      <Route path="/basics" component={BasicsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/websites" component={WebsitesPage} />
      <Route path="/control" component={AdminControlPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [location] = useLocation();

  const shouldShowIntro = location === "/" && !sessionStorage.getItem("vilkio_intro_seen");

  const mockNotifications = [
    {
      id: '1',
      message: 'New help topic added: Getting Started with Vilkio',
      isRead: false,
      createdAt: '2 hours ago',
    },
    {
      id: '2',
      message: 'Website portfolio updated with new projects',
      isRead: false,
      createdAt: '1 day ago',
    },
    {
      id: '3',
      message: 'Privacy policy has been updated',
      isRead: true,
      createdAt: '3 days ago',
    },
  ];

  const mockChatMessages = [
    {
      id: '1',
      senderId: 'admin',
      message: 'Welcome to the staff chat!',
      createdAt: '10:00 AM',
      isMine: false,
    },
    {
      id: '2',
      senderId: 'me',
      message: 'Thanks! Everything looks great.',
      createdAt: '10:05 AM',
      isMine: true,
    },
  ];

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    console.log('Mark notification as read:', id);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {shouldShowIntro && !introComplete && (
          <IntroVideo onComplete={() => setIntroComplete(true)} />
        )}
        
        <div className="min-h-screen flex flex-col">
          <Header
            unreadCount={unreadCount}
            onNotificationClick={() => setShowNotifications(!showNotifications)}
          />
          
          <main className="flex-1">
            <Router />
          </main>
          
          <Footer />
        </div>

        {showNotifications && (
          <NotificationPanel
            notifications={mockNotifications}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={handleMarkAsRead}
          />
        )}

        <ChatWidget messages={mockChatMessages} />
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
