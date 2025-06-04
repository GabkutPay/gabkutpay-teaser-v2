import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GabkutCoachBox = ({ user }) => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chargerQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/coach/quiz-du-jour', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(res.data);
      } catch (err) {
        console.error("Erreur chargement quiz coach IA :", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      chargerQuiz();
    }
  }, [user]);

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">🧠 Mon Coach Gabkut (IA)</h2>

      {loading ? (
        <p className="text-gray-600">Chargement en cours...</p>
      ) : quiz.length === 0 ? (
        <p className="text-gray-600">Aucun quiz pour aujourd'hui. Revenez plus tard !</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {quiz.map((q) => (
            <li key={q._id} className="py-3">
              <strong className="block text-gray-800">{q.question}</strong>
              <ul className="mt-1 list-disc list-inside text-gray-700 text-sm">
                {q.choix.map((choix, idx) => (
                  <li key={idx}>{choix}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GabkutCoachBox;
