import NotificationPanel from '../NotificationPanel';

export default function NotificationPanelExample() {
  const mockNotifications = [
    {
      id: '1',
      message: 'New help topic added: Getting Started',
      isRead: false,
      createdAt: '2 hours ago',
    },
    {
      id: '2',
      message: 'Website update: Portfolio redesigned',
      isRead: true,
      createdAt: '1 day ago',
    },
  ];

  return (
    <NotificationPanel
      notifications={mockNotifications}
      onClose={() => console.log('Close notifications')}
      onMarkAsRead={(id) => console.log('Mark as read:', id)}
    />
  );
}
