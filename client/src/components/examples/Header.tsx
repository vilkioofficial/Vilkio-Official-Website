import Header from '../Header';

export default function HeaderExample() {
  return <Header unreadCount={3} onNotificationClick={() => console.log('Notifications clicked')} />;
}
