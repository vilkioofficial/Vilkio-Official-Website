import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
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
import type { Notification, ChatMessage } from "@shared/schema";

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

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [location] = useLocation();

  const shouldShowIntro = location === "/" && !sessionStorage.getItem("vilkio_intro_seen");

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const { data: chatMessages = [] } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat-messages"],
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
  });

  // WebSocket connection for real-time updates
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "notification") {
        queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
      } else if (data.type === "chat") {
        queryClient.invalidateQueries({ queryKey: ["/api/chat-messages"] });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const formattedNotifications = notifications.map(n => ({
    ...n,
    createdAt: new Date(n.createdAt!).toLocaleString(),
  }));

  const formattedChatMessages = chatMessages.map(msg => ({
    ...msg,
    createdAt: new Date(msg.createdAt!).toLocaleTimeString(),
    isMine: msg.senderId === 'me',
  }));

  return (
    <>
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
          notifications={formattedNotifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={handleMarkAsRead}
        />
      )}

      <ChatWidget messages={formattedChatMessages} />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
