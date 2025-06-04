import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationsBox = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const chargerNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Erreur chargement notifications :", err);
      }
    };

    if (user?._id) {
      chargerNotifications();
    }
  }, [user]);

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">🔔 Mes notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-600">Aucune notification pour l’instant.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map((notif) => (
            <li key={notif._id} className="py-3">
              <span className="text-gray-800">{notif.message}</span>
              <div className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsBox;
