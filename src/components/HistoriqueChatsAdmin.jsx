import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HistoriqueChatsAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/messages/all");
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur récupération messages globaux", err);
      setError("Impossible de récupérer les messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  // Filtrage des messages selon l'email utilisateur ou contenu du message
  const messagesFiltres = messages.filter((msg) => {
    const filtreLower = filtre.toLowerCase();
    return (
      msg?.userId?.email?.toLowerCase().includes(filtreLower) ||
      msg?.content?.toLowerCase().includes(filtreLower)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🗃️ Historique des Chats (Global)</h2>

      <Input
        type="text"
        placeholder="🔍 Filtrer par utilisateur, message..."
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        className="mb-4"
        aria-label="Filtrer les messages par utilisateur ou contenu"
      />

      {loading ? (
        <p className="text-center text-gray-600">Chargement des messages...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Email utilisateur</th>
                <th className="p-2">Émetteur</th>
                <th className="p-2">Message</th>
                <th className="p-2">Lu ?</th>
              </tr>
            </thead>
            <tbody>
              {messagesFiltres.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Aucun message correspondant au filtre.
                  </td>
                </tr>
              ) : (
                messagesFiltres.map((msg, i) => (
                  <tr key={msg._id || i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-2">{new Date(msg.date).toLocaleString()}</td>
                    <td className="p-2">{msg?.userId?.email || "-"}</td>
                    <td className="p-2">{msg.from === "admin" ? "🛡️ Admin" : "👤 Utilisateur"}</td>
                    <td className="p-2 break-words max-w-xs">{msg.content}</td>
                    <td className="p-2 text-center">{msg.lu ? "✅" : "❌"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={() => alert("Export PDF non implémenté")}>
          📄 Export PDF
        </Button>
        <Button variant="outline" onClick={() => alert("Export Excel non implémenté")}>
          📊 Export Excel
        </Button>
      </div>
    </div>
  );
};

export default HistoriqueChatsAdmin;
