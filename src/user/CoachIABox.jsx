import React, { useEffect, useState } from "react";
import axios from "axios";

const CoachIABox = ({ userId, niveau = "débutant" }) => {
  const [questionData, setQuestionData] = useState(null);
  const [reponseDonnee, setReponseDonnee] = useState("");
  const [feedback, setFeedback] = useState("");
  const [explicationIA, setExplicationIA] = useState("");
  const [niveauInfo, setNiveauInfo] = useState("");
  const [etat, setEtat] = useState("en_attente"); // "en_attente" | "répondu"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const chargerQuestion = async () => {
      setLoading(true);
      setError("");
      setFeedback("");
      setExplicationIA("");
      setNiveauInfo("");
      setEtat("en_attente");
      setReponseDonnee("");
      try {
        const res = await axios.get(`/api/user/coach/lecon/${userId}?niveau=${niveau}`);
        setQuestionData(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de la question.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      chargerQuestion();
    }
  }, [userId, niveau]);

  const validerReponse = async () => {
    if (!reponseDonnee) {
      setFeedback("❗ Veuillez sélectionner une réponse.");
      return;
    }

    const estCorrect = reponseDonnee === questionData.bonneReponse;
    setFeedback(estCorrect ? "✅ Bonne réponse !" : "❌ Mauvaise réponse.");

    try {
      await axios.post("/api/user/coach/repondre", {
        userId,
        type: questionData.type,
        question: questionData.question,
        options: questionData.options,
        bonneReponse: questionData.bonneReponse,
        reponseDonnee,
        estCorrect,
        niveau: questionData.niveau,
        scoreObtenu: estCorrect ? questionData.scoreObtenu : 0,
      });

      if (!estCorrect) {
        const explication = await axios.post("/api/user/coach/explication", {
          question: questionData.question,
          bonneReponse: questionData.bonneReponse,
        });
        setExplicationIA(explication.data.explication);
      }

      // Analyse automatique du niveau après réponse
      const analyse = await axios.get(`/api/user/coach/analyser-niveau/${userId}`);
      if (analyse.data.niveauActuel !== analyse.data.ancienNiveau) {
        setNiveauInfo(`🎉 Bravo ! Tu es passé au niveau ${analyse.data.niveauActuel.toUpperCase()}`);
      }

      setEtat("répondu");
    } catch (err) {
      console.error(err);
      setFeedback("Erreur lors de l’enregistrement de la réponse.");
    }
  };

  if (loading) return <p>Chargement du coach IA...</p>;
  if (error) return <p className="text-red-600 font-semibold">{error}</p>;
  if (!questionData) return null;

  return (
    <div
      className="bg-white shadow-lg p-6 rounded-xl max-w-xl mx-auto mt-10"
      role="region"
      aria-live="polite"
      aria-label="Section du coach IA"
    >
      <h2 className="text-xl font-bold text-blue-800 mb-4">🧠 Mon Coach Gabkut</h2>

      <p className="font-semibold mb-3">{questionData.question}</p>

      <form>
        <div className="space-y-2 mb-4">
          {questionData.options.map((opt, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="reponse"
                value={opt}
                disabled={etat === "répondu"}
                checked={reponseDonnee === opt}
                onChange={(e) => setReponseDonnee(e.target.value)}
                aria-checked={reponseDonnee === opt}
              />
              {opt}
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={validerReponse}
          disabled={etat === "répondu"}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          aria-disabled={etat === "répondu"}
        >
          Valider
        </button>
      </form>

      {feedback && (
        <p
          className={`mt-4 font-bold ${
            feedback.includes("❌") ? "text-red-600" : "text-green-600"
          }`}
          role="alert"
        >
          {feedback}
        </p>
      )}

      {explicationIA && (
        <section
          className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg"
          aria-label="Explication de l'intelligence artificielle"
        >
          <p className="font-semibold text-yellow-800 mb-2">📘 Explication IA :</p>
          <p className="text-sm text-gray-900 whitespace-pre-line">{explicationIA}</p>
        </section>
      )}

      {niveauInfo && (
        <div
          className="mt-6 bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg"
          role="alert"
        >
          {niveauInfo}
        </div>
      )}
    </div>
  );
};

export default CoachIABox;
