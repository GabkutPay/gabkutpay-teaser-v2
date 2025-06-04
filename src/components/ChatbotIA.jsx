import React, { useState } from 'react';
import axios from 'axios';

const ChatbotIA = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput };
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        messages: updatedHistory
      });

      const aiReply = response.data.reply;
      setChatHistory([...updatedHistory, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: "❌ Erreur de communication avec le bot." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl w-80 z-50 border border-gray-200">
      <div className="bg-blue-700 text-white font-semibold text-center py-2 rounded-t-xl">
        🤖 Chatbot Gabkut IA
      </div>

      <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.role === 'user'
                ? 'bg-blue-100 text-right'
                : 'bg-gray-100 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 italic text-xs">L'IA réfléchit...</div>
        )}
      </div>

      <div className="flex border-t p-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Pose ta question..."
          className="flex-grow px-2 py-1 border rounded-l-md text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded-r-md text-sm"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatbotIA;
