# RAG-Powered News Chatbot Frontend

A modern React frontend for the RAG-powered news chatbot with real-time messaging, typing animations, and responsive design.

## 🚀 Features

- **Real-time Chat**: Socket.IO integration for instant messaging
- **Typing Animation**: Smooth character-by-character bot responses
- **Session Management**: Persistent chat sessions with history
- **Responsive Design**: Mobile-first approach with SCSS styling
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Markdown Support**: Rich text formatting for bot responses
- **Connection Status**: Real-time connection indicator
- **Query Suggestions**: Helpful prompts for user engagement

## 🛠 Tech Stack

- **Frontend**: React 18, SCSS
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios
- **Styling**: SCSS with CSS Variables
- **Markdown**: React Markdown
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js 16+
- Backend server running on port 5000

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/rag-chatbot-frontend.git
   cd rag-chatbot-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SERVER_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── ChatInterface.js  # Main chat container
│   ├── Header.js         # App header with branding
│   ├── Message.js        # Individual message component
│   ├── MessageInput.js   # Input field with suggestions
│   ├── MessageList.js    # Messages container
│   └── TypingIndicator.js # Bot typing animation
├── services/            # API and external services
│   └── api.js           # HTTP client and API calls
├── styles/              # SCSS stylesheets
│   ├── index.scss       # Global styles and variables
│   ├── App.scss         # App component styles
│   ├── Header.scss      # Header component styles
│   ├── ChatInterface.scss # Chat interface styles
│   ├── Message.scss     # Message component styles
│   ├── MessageInput.scss # Input component styles
│   ├── MessageList.scss # Message list styles
│   └── TypingIndicator.scss # Typing indicator styles
├── App.js               # Main app component
└── index.js             # React entry point
```

## 🎨 Design System

### Color Palette
```scss
// Primary colors
--primary-color: #3b82f6;      // Blue
--primary-hover: #2563eb;      // Darker blue
--primary-light: #dbeafe;      // Light blue

// Background colors
--bg-primary: #ffffff;         // White
--bg-secondary: #f8fafc;       // Light gray
--bg-tertiary: #f1f5f9;        // Lighter gray
--bg-chat-user: #3b82f6;       // User message background
--bg-chat-bot: #f1f5f9;        // Bot message background

// Text colors
--text-primary: #1e293b;       // Dark gray
--text-secondary: #64748b;     // Medium gray
--text-tertiary: #94a3b8;      // Light gray
--text-inverse: #ffffff;       // White text
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Sizes**: 0.75rem to 1.875rem
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing System
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

## 🔌 API Integration

### Session Management
```javascript
// Create new session
const session = await createSession();

// Get session history
const history = await getSessionHistory(sessionId);

// Clear session
await clearSession(sessionId);
```

### Real-time Communication
```javascript
// Socket.IO events
socket.emit('join-session', sessionId);
socket.emit('send-message', { message, sessionId });

socket.on('message-response', handleResponse);
socket.on('typing', setTypingState);
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Reduced padding and margins
- Smaller font sizes
- Simplified navigation
- Touch-friendly buttons
- Optimized chat interface height

## ✨ Key Features

### Real-time Chat
- Instant message delivery via Socket.IO
- Connection status indicator
- Automatic reconnection handling
- Session-based message routing

### Typing Animation
- Character-by-character bot responses
- Smooth typing cursor animation
- Configurable typing speed
- Interruptible animations

### Session Management
- Persistent sessions in localStorage
- Chat history restoration
- Session clearing functionality
- New session creation

### Message Formatting
- Markdown support for bot responses
- Syntax highlighting for code blocks
- Rich text formatting (bold, italic, lists)
- Timestamp display with relative time

### User Experience
- Query suggestions for new users
- Loading states and error handling
- Smooth animations and transitions
- Accessibility considerations

## 🎯 Component Details

### ChatInterface
Main chat container managing:
- Socket.IO connection
- Message state management
- Real-time event handling
- Session initialization

### Message
Individual message display with:
- Sender-specific styling
- Typing animation for bot messages
- Markdown rendering
- Timestamp formatting

### MessageInput
Input component featuring:
- Auto-resizing textarea
- Character count display
- Query suggestions
- Send button with loading state

### TypingIndicator
Animated typing indicator with:
- Three-dot animation
- Bot avatar display
- Smooth entrance animation

## 🚀 Performance Optimizations

### Code Splitting
- Component-level code splitting
- Lazy loading for heavy components
- Dynamic imports for utilities

### State Management
- Efficient re-rendering with React hooks
- Memoization for expensive calculations
- Optimized socket event handling

### Asset Optimization
- SCSS compilation and minification
- Image optimization
- Font loading optimization

## 🔧 Development

### Available Scripts
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from CRA
```

### Development Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- SCSS live compilation
- Hot module replacement

### Code Style
- ESLint configuration
- Prettier formatting
- Consistent naming conventions
- Component documentation

## 🌐 Deployment

### Build Process
```bash
npm run build
```

### Hosting Options
- **Netlify**: Automatic deployments from Git
- **Vercel**: Zero-config deployments
- **GitHub Pages**: Static site hosting
- **AWS S3**: Static website hosting

### Environment Variables
```env
# Production
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_SERVER_URL=https://your-api-domain.com

# Development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SERVER_URL=http://localhost:5000
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
- API integration testing
- Socket.IO connection testing
- Component interaction testing

### E2E Tests
- User flow testing
- Cross-browser compatibility
- Mobile responsiveness testing

## 🔒 Security

### Best Practices
- Input sanitization
- XSS prevention
- CSRF protection
- Secure API communication

### Environment Security
- Environment variable protection
- API key management
- HTTPS enforcement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

1. **Socket Connection Failed**
   - Check backend server is running
   - Verify CORS configuration
   - Check firewall settings

2. **Messages Not Displaying**
   - Check API endpoint configuration
   - Verify session creation
   - Check browser console for errors

3. **Styling Issues**
   - Clear browser cache
   - Check SCSS compilation
   - Verify CSS variable support

### Debug Mode
```bash
# Enable debug logging
REACT_APP_DEBUG=true npm start
```

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review browser console for errors

## 🔄 Updates

### Version History
- v1.0.0: Initial release with core features
- Future: Enhanced animations, themes, PWA support