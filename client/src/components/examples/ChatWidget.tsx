import ChatWidget from '../ChatWidget';

export default function ChatWidgetExample() {
  const mockMessages = [
    {
      id: '1',
      senderId: 'admin',
      message: 'Hey team, how is everything going?',
      createdAt: '10:30 AM',
      isMine: false,
    },
    {
      id: '2',
      senderId: 'me',
      message: 'All good! Just updated the help section.',
      createdAt: '10:32 AM',
      isMine: true,
    },
  ];

  return (
    <ChatWidget
      messages={mockMessages}
      onSendMessage={(msg) => console.log('Send:', msg)}
    />
  );
}
