import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead?: (id: string) => void;
}

export default function NotificationPanel({ notifications, onClose, onMarkAsRead }: NotificationPanelProps) {
  return (
    <div className="fixed top-20 right-4 w-96 bg-popover border rounded-lg shadow-xl z-50" data-testid="panel-notifications">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <Button size="icon" variant="ghost" onClick={onClose} data-testid="button-close-notifications">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground" data-testid="text-no-notifications">
              No notifications
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={`p-3 rounded-md hover-elevate active-elevate-2 cursor-pointer ${
                    !notification.isRead ? "bg-accent" : ""
                  }`}
                  onClick={() => onMarkAsRead?.(notification.id)}
                  data-testid={`notification-item-${notification.id}`}
                >
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.createdAt}</p>
                </div>
                {index < notifications.length - 1 && <Separator className="my-1" />}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
