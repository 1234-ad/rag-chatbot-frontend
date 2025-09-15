import React, { useState, useRef } from 'react';
import '../styles/MessageInput.scss';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled || isSending) {
      return;
    }

    const messageToSend = message.trim();
    setMessage('');
    setIsSending(true);

    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Restore message on error
      setMessage(messageToSend);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedQueries = [
    "What's the latest technology news?",
    "Tell me about recent business developments",
    "What's happening in the world today?",
    "Any updates on climate change?",
    "Recent sports news?"
  ];

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="message-input-container">
      {message === '' && (
        <div className="suggestions">
          <p className="suggestions-title">Try asking:</p>
          <div className="suggestions-list">
            {suggestedQueries.map((query, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => handleSuggestionClick(query)}
                disabled={disabled}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Connecting..." : "Ask me about the news..."}
            disabled={disabled || isSending}
            className="message-input"
            rows="1"
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled || isSending}
            className="send-button"
            title="Send message"
          >
            {isSending ? (
              <div className="sending-spinner"></div>
            ) : (
              <span className="send-icon">➤</span>
            )}
          </button>
        </div>
        <div className="input-footer">
          <span className="character-count">
            {message.length}/1000
          </span>
          <span className="input-hint">
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;