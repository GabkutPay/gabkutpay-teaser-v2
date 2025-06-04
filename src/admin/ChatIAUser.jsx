import React, { useState, useRef, useEffect } from "react";
import AudioPlayerIA from "../components/AudioPlayerIA";
import axios from "axios";

const ChatIAUser = () => {
  const [question, setQuestion] = useState("");
  const [historique, setHistorique] = useState([]);
  const [enCours, setEnCours] = useState(false);
  const [reponseVocale, setReponseVocale] = useState("");
  const scrollRef = useRef(null);

  const envoyerMessage = async () => {
    if (!question.trim()) return;
    const message = question.trim();
    setHistorique((prev) => [...prev, { role: "user", texte: message }]);
    setEnCours(true);
    setQuestion("");

    try {
      const { data } = await axios.post("/api/ia-user", { message });
      setHistorique((prev) => [...prev, { role: "ia", texte: data.reponse }]);
      setReponseVocale(data.reponse);
    } catch (err) {
      console.error("Erreur IA :", err);
      setHistorique((prev) => [...prev, { role: "ia", texte: "❌ Erreur lors de la réponse IA." }]);
      setReponseVocale("");
    } finally {
      setEnCours(false);
    }
  };

  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [historique]);

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-screen max-h-screen">
      <h2 className="text-xl font-bold mb-4">🤖 Assistant Gabkut</h2>

      <div
        ref={scrollRef}
        className="bg-gray-100 rounded p-3 flex-grow overflow-y-auto space-y-3"
        aria-live="polite"
        aria-label="Historique des messages"
      >
        {historique.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.role === "user" ? "bg-blue-200 text-right" : "bg-white text-left"
            }`}
          >
            {msg.texte}
          </div>
        ))}
        {enCours && <div className="italic text-gray-500">L’IA écrit...</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Pose ta question (ex. : Comment recharger ?)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && envoyerMessage()}
          aria-label="Saisir votre question"
          disabled={enCours}
        />
        <button
          onClick={envoyerMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={enCours}
          aria-label="Envoyer la question"
        >
          Envoyer
        </button>
      </div>

      {reponseVocale && <AudioPlayerIA texte={reponseVocale} />}
    </div>
  );
};

export default ChatIAUser;
