import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import AudioPlayerIA from "../components/AudioPlayerIA";

const ChatIAFlottantUser = () => {
  const [ouvert, setOuvert] = useState(true);
  const [question, setQuestion] = useState("");
  const [historique, setHistorique] = useState([]);
  const [enCours, setEnCours] = useState(false);
  const [reponseVocale, setReponseVocale] = useState("");
  const [langue, setLangue] = useState("fr");
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  const languesDisponibles = [
    { code: "fr", label: "🇫🇷 Français" },
    { code: "en", label: "🇬🇧 English" },
    { code: "ar", label: "🇸🇦 العربية" },
    { code: "ln", label: "🇨🇩 Lingala" },
    { code: "kg", label: "🇨🇩 Kikongo" },
    { code: "sw", label: "🇨🇩 Swahili" },
    { code: "ts", label: "🇨🇩 Tshiluba" },
    { code: "pt", label: "🇵🇹 Português" },
    { code: "es", label: "🇪🇸 Español" },
    { code: "it", label: "🇮🇹 Italiano" },
  ];

  const envoyer = async () => {
    if (!question.trim()) return;
    const message = question.trim();
    setHistorique((prev) => [...prev, { role: "user", texte: message }]);
    setQuestion("");
    setEnCours(true);

    try {
      const { data } = await axios.post("/api/ia-user", {
        message,
        langue,
      });
      setHistorique((prev) => [...prev, { role: "ia", texte: data.reponse }]);
      setReponseVocale(data.reponse);
    } catch (err) {
      setHistorique((prev) => [
        ...prev,
        { role: "ia", texte: "❌ Erreur de réponse." },
      ]);
      setReponseVocale("");
    } finally {
      setEnCours(false);
      inputRef.current?.focus();
    }
  };

  const activerMicro = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return alert("🎙️ Micro non supporté par ce navigateur.");
    }

    // Si un enregistrement est déjà en cours, on l’arrête
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = langue;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎙️ Reconnaissance vocale démarrée");
    };

    recognition.onresult = (event) => {
      const resultat = event.results[0][0].transcript;
      setQuestion(resultat);
      // Optionnel : lancer automatiquement l’envoi après reconnaissance
      // envoyer();
    };

    recognition.onerror = (e) => {
      console.error("Erreur micro :", e.error);
      alert(`Erreur micro : ${e.error}`);
      recognition.stop();
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      console.log("🎙️ Reconnaissance vocale terminée");
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  if (!ouvert) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[320px] bg-white shadow-lg border rounded-lg z-50 flex flex-col overflow-hidden" role="region" aria-label="Assistant vocal Gabkut">
      <div className="bg-blue-600 text-white flex justify-between items-center p-2">
        <span className="font-bold">🤖 Assistant Gabkut</span>
        <button onClick={() => setOuvert(false)} className="text-white" aria-label="Fermer l’assistant">✖</button>
      </div>

      <div className="p-2">
        <select
          value={langue}
          onChange={(e) => setLangue(e.target.value)}
          className="w-full p-1 border rounded text-sm"
          aria-label="Choisir la langue"
        >
          {languesDisponibles.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="px-2 flex-1 overflow-y-auto h-64 space-y-2 text-sm" aria-live="polite" aria-relevant="additions">
        {historique.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"}`}
          >
            {msg.texte}
          </div>
        ))}
        {enCours && <div className="italic text-gray-400">L’IA écrit...</div>}
      </div>

      <div className="flex p-2 gap-2 border-t">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 border rounded px-2 text-sm"
          placeholder="Pose ta question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && envoyer()}
          aria-label="Saisir votre question"
          disabled={enCours}
          autoFocus
        />
        <button
          onClick={activerMicro}
          className={`text-xl ${recognitionRef.current ? "text-red-600" : "text-gray-600"}`}
          title={recognitionRef.current ? "Arrêter le micro" : "Parler"}
          aria-pressed={!!recognitionRef.current}
          aria-label="Activer ou désactiver le micro"
          disabled={enCours}
        >
          🎤
        </button>
        <button
          onClick={envoyer}
          disabled={enCours}
          className="bg-blue-600 text-white text-sm px-3 rounded disabled:opacity-50"
          aria-label="Envoyer la question"
        >
          Envoyer
        </button>
      </div>

      {reponseVocale && <AudioPlayerIA texte={reponseVocale} />}
    </div>
  );
};

export default ChatIAFlottantUser;
