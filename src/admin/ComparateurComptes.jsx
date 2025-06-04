import React, { useEffect, useState } from "react";
import axios from "axios";

const ComparateurComptes = () => {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const res = await axios.get("/api/account-types");
        setComptes(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des comptes :", error);
        setError("Impossible de charger les comptes pour le moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchComptes();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Chargement des comptes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (comptes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        Aucun compte disponible pour le moment.
      </div>
    );
  }

  return (
    <main className="p-6 bg-white text-gray-900 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8" tabIndex={0}>
        🧮 Comparateur de Comptes Gabkut
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Liste des types de comptes">
        {comptes.map((compte) => (
          <article
            key={compte._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300"
            tabIndex={0}
            aria-labelledby={`compte-${compte._id}-nom`}
          >
            <h2 id={`compte-${compte._id}-nom`} className="text-xl font-semibold mb-2">
              {compte.nom}
            </h2>
            <p className="text-sm mb-2 text-gray-600">{compte.description}</p>
            {compte.avantages && compte.avantages.length > 0 ? (
              <ul className="list-disc pl-5 text-sm mb-4">
                {compte.avantages.map((avantage, i) => (
                  <li key={i}>{avantage}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-gray-500 mb-4">Aucun avantage listé.</p>
            )}
            <div className="text-right">
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                onClick={() => alert(`Création du compte : ${compte.nom}`)}
                aria-label={`Créer le compte ${compte.nom}`}
              >
                Créer ce compte
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ComparateurComptes;
