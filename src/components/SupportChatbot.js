import React, { useState } from 'react';

const SupportChatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: 'Thanks for reaching out! We will get back to you shortly.' }]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '20px auto', border: '1px solid #ccc', borderRadius: 8, padding: 10, backgroundColor: '#f9f9f9' }}>
      <h3>🗨️ Support Chatbot</h3>
      <div style={{ height: 250, overflowY: 'auto', padding: '5px', border: '1px solid #ddd', borderRadius: 4, backgroundColor: 'white' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === 'bot' ? 'left' : 'right', margin: '5px 0' }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 16,
              backgroundColor: msg.from === 'bot' ? '#e0e0e0' : '#4caf50',
              color: msg.from === 'bot' ? 'black' : 'white',
              maxWidth: '80%',
              wordWrap: 'break-word'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: 'calc(100% - 70px)', padding: '8px', marginRight: '10px', borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px', borderRadius: 4, backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Send
      </button>
    </div>
  );
};

export default SupportChatbot;
