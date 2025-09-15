import React from 'react';
import '../styles/Header.scss';

const Header = ({ onNewSession }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            <span className="header-icon">🤖</span>
            News Chatbot
          </h1>
          <p className="header-subtitle">
            Ask me anything about the latest news
          </p>
        </div>
        <div className="header-right">
          <button 
            onClick={onNewSession}
            className="new-session-button"
            title="Start new conversation"
          >
            <span className="button-icon">🔄</span>
            New Chat
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;