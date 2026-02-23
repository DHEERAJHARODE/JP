import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa';
import './AIAssistant.css';

// API Key setup
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I am your AI Assistant. I can help you navigate pages or answer questions about ShipEase. How can I help you today?", 
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    // User ka message add karein
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    // Basic Navigation Logic (Custom commands)
    const lowerInput = userText.toLowerCase();
    if (lowerInput.includes('book') || lowerInput.includes('create booking')) {
       setMessages(prev => [...prev, { text: "Sure! Redirecting you to the Create Booking page...", sender: 'bot' }]);
       setTimeout(() => { navigate('/booking/create'); setIsOpen(false); }, 1500);
       setIsLoading(false);
       return;
    } 
    if (lowerInput.includes('dashboard')) {
       setMessages(prev => [...prev, { text: "Taking you to your Dashboard...", sender: 'bot' }]);
       setTimeout(() => { navigate('/dashboard'); setIsOpen(false); }, 1500);
       setIsLoading(false);
       return;
    }

    // AI API Call (Gemini)
    try {
      if (!genAI) throw new Error("API key missing!");
      
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Latest model
      
      const prompt = `You are a helpful customer support AI for a logistics company named "ShipEase". Keep answers short, friendly, and helpful. User asked: ${userText}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { text: text, sender: 'bot' }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { text: "Sorry, I am having trouble connecting to my brain right now. Please try again later.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-widget-container">
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header styling ab CSS me hai */}
          <div className="ai-chat-header">
            <span className="ai-header-title">
              <FaRobot size={22} /> ShipEase AI
            </span>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="ai-chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`ai-message-wrapper ${msg.sender}`}>
                <div className={`ai-message ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-message-wrapper bot">
                <div className="ai-typing">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
          </div>

          <div className="ai-chat-footer">
            <input 
              type="text" 
              className="ai-chat-input" 
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button 
              className="ai-send-btn" 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="ai-chat-button" onClick={() => setIsOpen(true)}>
          <FaCommentDots />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;