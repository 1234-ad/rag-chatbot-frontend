import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { createSession } from './services/api';
import './styles/App.scss';

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if there's an existing session in localStorage
      const existingSessionId = localStorage.getItem('chatSessionId');
      
      if (existingSessionId) {
        setSessionId(existingSessionId);
      } else {
        // Create new session
        const response = await createSession();
        const newSessionId = response.sessionId;
        
        localStorage.setItem('chatSessionId', newSessionId);
        setSessionId(newSessionId);
      }
    } catch (err) {
      console.error('Failed to initialize session:', err);
      setError('Failed to initialize chat session. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSession = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Clear existing session
      localStorage.removeItem('chatSessionId');
      
      // Create new session
      const response = await createSession();
      const newSessionId = response.sessionId;
      
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    } catch (err) {
      console.error('Failed to create new session:', err);
      setError('Failed to create new session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Initializing chat session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={initializeSession} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header onNewSession={handleNewSession} />
      <main className="main-content">
        <ChatInterface sessionId={sessionId} />
      </main>
    </div>
  );
}

export default App;