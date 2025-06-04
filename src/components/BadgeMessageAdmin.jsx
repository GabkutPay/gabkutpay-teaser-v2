import React, { useEffect, useState } from "react";
import axios from "axios";

const BadgeMessageAdmin = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = async () => {
    try {
      const res = await axios.get(`/api/messages/unread-count`, {
        params: { userId, viewer: "admin" }
      });
      setUnreadCount(res.data.unread);
    } catch (err) {
      console.error("Erreur récupération messages non lus", err);
    }
  };

  useEffect(() => {
    if (userId) fetchUnread();
  }, [userId]);

  if (unreadCount === 0) return null;

  return (
    <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
      {unreadCount}
    </span>
  );
};

export default BadgeMessageAdmin;
