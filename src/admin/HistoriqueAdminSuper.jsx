import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HistoriqueAdminSuper = () => {
  const [messages, setMessages] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/conversation?with=superadmin`);
        setMessages(res.data.messages || []);
        setAdminId(res.data.currentAdminId);
      } catch (err) {
        console.error("Erreur lors du chargement de l'historique :", err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-6 bg-white h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🕓 Historique avec le Super Admin</h2>
        <Link to="/admin/conversation-super" className="text-blue-600 hover:underline">↩️ Retour au chat</Link>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500">Aucun message échangé pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`p-3 rounded shadow-md ${msg.senderId === adminId ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <div className="text-sm text-gray-700 mb-1">
                {msg.senderId === adminId ? '🧑‍💼 Vous' : '👑 Super Admin'} — {new Date(msg.timestamp).toLocaleString()}
              </div>
              <div className="text-base">{msg.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoriqueAdminSuper;
