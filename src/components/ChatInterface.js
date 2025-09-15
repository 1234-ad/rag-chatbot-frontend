import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { getSessionHistory, clearSession } from '../services/api';
import '../styles/ChatInterface.scss';

const ChatInterface = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      initializeChat();
      setupSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [sessionId]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      const history = await getSessionHistory(sessionId);
      
      // Convert history to message format
      const formattedMessages = history.map((item, index) => [
        {
          id: `${item.id || index}-user`,
          text: item.user,
          sender: 'user',
          timestamp: item.timestamp
        },
        {
          id: `${item.id || index}-bot`,
          text: item.bot,
          sender: 'bot',
          timestamp: item.timestamp
        }
      ]).flat();

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupSocket = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
    socketRef.current = io(serverUrl);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      socketRef.current.emit('join-session', sessionId);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('message-response', (data) => {
      const userMessage = {
        id: `${Date.now()}-user`,
        text: data.user,
        sender: 'user',
        timestamp: data.timestamp
      };

      const botMessage = {
        id: `${Date.now()}-bot`,
        text: data.bot,
        sender: 'bot',
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, userMessage, botMessage]);
      setIsTyping(false);
    });

    socketRef.current.on('typing', (typing) => {
      setIsTyping(typing);
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket error:', error);
      setIsTyping(false);
    });
  };

  const handleSendMessage = (message) => {
    if (!socketRef.current || !isConnected) {
      console.error('Socket not connected');
      return;
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    socketRef.current.emit('send-message', {
      message,
      sessionId
    });
  };

  const handleClearSession = async () => {
    try {
      await clearSession(sessionId);
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  if (loading) {
    return (
      <div className="chat-interface">
        <div className="chat-loading">
          <div className="loading-spinner"></div>
          <p>Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢' : '🔴'}
          </span>
          <span className="status-text">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <button 
          onClick={handleClearSession}
          className="clear-button"
          title="Clear conversation"
        >
          🗑️ Clear
        </button>
      </div>

      <div className="chat-container">
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator />}
      </div>

      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={!isConnected}
      />
    </div>
  );
};

export default ChatInterface;