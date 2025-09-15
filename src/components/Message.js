import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Message.scss';

const Message = ({ text, sender, timestamp }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (sender === 'bot') {
      // Typing animation for bot messages
      setIsTyping(true);
      setDisplayedText('');
      
      let currentIndex = 0;
      const typingSpeed = 30; // milliseconds per character
      
      const typeText = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeText, typingSpeed);
        } else {
          setIsTyping(false);
        }
      };

      // Start typing after a short delay
      const startDelay = setTimeout(typeText, 300);
      
      return () => {
        clearTimeout(startDelay);
        setDisplayedText(text);
        setIsTyping(false);
      };
    } else {
      setDisplayedText(text);
    }
  }, [text, sender]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        <div className="message-avatar">
          {sender === 'user' ? '👤' : '🤖'}
        </div>
        <div className="message-body">
          <div className="message-text">
            {sender === 'bot' ? (
              <ReactMarkdown
                components={{
                  // Custom components for better styling
                  p: ({ children }) => <p className="markdown-paragraph">{children}</p>,
                  strong: ({ children }) => <strong className="markdown-bold">{children}</strong>,
                  em: ({ children }) => <em className="markdown-italic">{children}</em>,
                  ul: ({ children }) => <ul className="markdown-list">{children}</ul>,
                  ol: ({ children }) => <ol className="markdown-list">{children}</ol>,
                  li: ({ children }) => <li className="markdown-list-item">{children}</li>,
                  code: ({ children }) => <code className="markdown-code">{children}</code>,
                  pre: ({ children }) => <pre className="markdown-pre">{children}</pre>
                }}
              >
                {displayedText}
              </ReactMarkdown>
            ) : (
              <p>{displayedText}</p>
            )}
            {isTyping && <span className="typing-cursor">|</span>}
          </div>
          <div className="message-timestamp">
            {formatTimestamp(timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;