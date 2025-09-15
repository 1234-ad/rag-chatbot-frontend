import React, { useEffect, useRef } from 'react';
import Message from './Message';
import '../styles/MessageList.scss';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="message-list">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Welcome to News Chatbot!</h3>
          <p>Ask me anything about the latest news and current events.</p>
          <div className="example-queries">
            <p>Try asking:</p>
            <ul>
              <li>"What's the latest technology news?"</li>
              <li>"Tell me about recent business developments"</li>
              <li>"What's happening in the world today?"</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;