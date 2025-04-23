import React, { useState } from 'react';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

const LuxBotCard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { role: 'user', content: input }]);
      // Here you would typically send the message to your chatbot API
      // For this example, we'll simulate a response
      setTimeout(() => {
        setMessages([
          ...messages,
          { role: 'user', content: input },
          { role: 'bot', content: 'This is a simulated response from LuxBot.' },
        ]);
      }, 1000); // Simulate 1-second delay
      setInput('');
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-75 z-0"></div>

      {/* Card Content */}
      <div className="relative z-10 p-6 text-white">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">LuxBot</h2>

        {/* Features List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside">
            <li className="mb-1">Financial Advice</li>
            <li className="mb-1">Market Analysis</li>
            <li className="mb-1">Portfolio Insights</li>
            <li className="mb-1">Investment Tracking</li>
            <li className="mb-1">Personalized Suggestions</li>
          </ul>
        </div>

        {/* Chat Area */}
        <div className="h-64 overflow-y-auto mb-4 p-2 border border-gray-700 rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-700' : 'bg-gray-800'
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask LuxBot..."
            className="flex-grow bg-gray-800 text-white rounded-l-md p-2 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md p-2 px-4 focus:outline-none"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuxBotCard;