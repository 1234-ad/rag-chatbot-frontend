import React from 'react';
import '../styles/TypingIndicator.scss';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="typing-content">
        <div className="typing-avatar">🤖</div>
        <div className="typing-bubble">
          <div className="typing-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;