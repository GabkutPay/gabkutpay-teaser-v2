import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AudioPlayerIA from "../components/AudioPlayerIA";

const ChatIAAdmin = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Bonjour 👋 Je suis l’assistant IA de Gabkut Pay. Pose-moi une question." }
  ]);
  const [input, setInput] = useState("");
  const [chargement, setChargement] = useState(false);
  const navigate = useNavigate();

  const envoyerMessage = async () => {
    if (!input.trim()) return;
    const nouveauMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, nouveauMessage]);
    setInput("");
    setChargement(true);

    try {
      const { data } = await axios.post("/api/chat-ia", { message: input });

      const blocIA = {
        role: "bot",
        text: data.reponse,
        actions: data.actions || [],
        contexte: data.contexte || null
      };

      setMessages((prev) => [...prev, blocIA]);
    } catch (err) {
      console.error("Erreur Chat IA :", err);
      setMessages((prev) => [...prev, { role: "bot", text: "❌ Erreur lors de l’analyse de la requête." }]);
    } finally {
      setChargement(false);
    }
  };

  const executerAction = (route) => {
    if (route.startsWith("/admin")) {
      navigate(route);
    } else {
      window.open(route, "_blank");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🤖 Chat IA Administrateur</h2>

      <div className="bg-gray-100 rounded p-4 max-h-[60vh] overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={`p-2 rounded mb-1 ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-white text-left"}`}
            >
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
            </div>

            {/* Actions proposées */}
            {msg.actions && msg.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {msg.actions.map((a, idx) => (
                  <button
                    key={idx}
                    onClick={() => executerAction(a.route)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* Contexte technique */}
            {msg.contexte && msg.role === "bot" && (
              <div className="text-xs italic text-gray-400 mb-2">
                {msg.contexte}
              </div>
            )}
          </div>
        ))}

        {chargement && <p className="text-sm italic text-gray-500">⏳ Analyse en cours…</p>}
      </div>

      {/* Barre de saisie */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose une question ou donne un ordre…"
          className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={envoyerMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatIAAdmin;
