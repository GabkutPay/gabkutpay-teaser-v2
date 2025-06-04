import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AudioPlayerIA from "../components/AudioPlayerIA";

const ChatInscriptionBot = () => {
  const [visible, setVisible] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [vocal, setVocal] = useState("");
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const message =
      "👋 Bonjour, je suis Gaël, ton agent virtuel Gabkut Pay. Je vais t’aider pendant ton inscription. Si une case te semble floue, pose-moi ta question ici.";
    setMessages([{ role: "ia", texte: message }]);
    setVocal(message);
  }, []);

  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const envoyer = async () => {
    if (!question.trim()) return;
    const msg = question.trim();
    setMessages((prev) => [...prev, { role: "user", texte: msg }]);
    setQuestion("");
    inputRef.current?.focus();

    try {
      const { data } = await axios.post("/api/ia-visiteur", { message: msg });
      setMessages((prev) => [...prev, { role: "ia", texte: data.reponse }]);
      setVocal(data.reponse);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ia", texte: "❌ Erreur lors de la réponse." },
      ]);
      setVocal("");
    }
  };

  const activerMicro = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("🎙️ Micro non supporté par ce navigateur.");

    // Arrêter si déjà actif
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr"; // Français par défaut
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const resultat = event.results[0][0].transcript;
      setQuestion(resultat);
    };

    recognition.onerror = (e) => {
      console.error("Erreur micro :", e.error);
      alert(`Erreur micro : ${e.error}`);
      recognition.stop();
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 w-[320px] bg-white shadow-xl rounded-lg border z-50 flex flex-col"
      role="region"
      aria-label="Assistant virtuel d'inscription Gabkut Pay"
    >
      <div className="bg-blue-600 text-white flex justify-between items-center p-2">
        <span className="font-bold">🤖 Gaël - Assistant Inscription</span>
        <button
          onClick={() => setVisible(false)}
          className="text-white"
          aria-label="Fermer l’assistant"
        >
          ✖
        </button>
      </div>

      <div
        className="px-2 py-1 overflow-y-auto h-64 space-y-2 text-sm"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
            }`}
          >
            {msg.texte}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-2 border-t gap-2">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border rounded px-2 text-sm"
          placeholder="Pose ta question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && envoyer()}
          aria-label="Saisir votre question"
          autoFocus
        />
        <button
          onClick={activerMicro}
          className="text-xl text-gray-600"
          title="Microphone"
          aria-pressed={!!recognitionRef.current}
          aria-label="Activer ou désactiver le microphone"
        >
          🎤
        </button>
        <button
          onClick={envoyer}
          className="bg-blue-600 text-white px-3 rounded text-sm"
          aria-label="Envoyer la question"
        >
          Envoyer
        </button>
      </div>

      {vocal && <AudioPlayerIA texte={vocal} />}
    </div>
  );
};

export default ChatInscriptionBot;
