import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = ({ user }) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const envoyerMessage = async () => {
    try {
      await axios.post('/api/chat/user-message', {
        userId: user._id,
        contenu: message,
      });
      setStatus('Message envoyé avec succès.');
      setMessage('');
    } catch (error) {
      setStatus('Erreur lors de l’envoi.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">📨 Contacter le support</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="3"
        placeholder="Envoyez votre question ou message à l’équipe Gabkut Pay"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={envoyerMessage}
        className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={!message.trim()}
      >
        Envoyer au support
      </button>
      {status && <p className="mt-2 text-blue-700">{status}</p>}
    </div>
  );
};

export default ChatBox;
