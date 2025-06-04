import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TypesDeComptes = () => {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const res = await axios.get('/api/account-types');
        setComptes(res.data);
      } catch (err) {
        console.error('Erreur de chargement', err);
        setError('Impossible de charger les types de comptes.');
      } finally {
        setLoading(false);
      }
    };

    fetchComptes();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Chargement des types de comptes...
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-900" tabIndex="0">
        🌐 Découvrez nos comptes Gabkut
      </h1>
      <p className="text-center mb-10 max-w-3xl mx-auto text-gray-700">
        Gabkut Pay est plus qu’un service — c’est une <strong>cité financière</strong>, un <strong>centre commercial numérique</strong> qui vous connecte à tout : Mobile Money, Banques, Western Union, MoneyGram, RIA, paiements en ligne et bien plus. Plus de déplacements, tout est automatisé, sécurisé et assisté par IA + agents 24h/24.
      </p>

      {comptes.length === 0 ? (
        <p className="text-center text-gray-600">Aucun type de compte disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comptes.map((compte) => (
            <article
              key={compte._id}
              className="bg-white rounded-2xl shadow-md p-5 hover:scale-[1.02] transition-all"
              tabIndex="0"
              aria-label={`Type de compte ${compte.nom}`}
            >
              <h2 className="text-xl font-bold text-blue-800 mb-2">{compte.nom}</h2>
              <p className="text-gray-600 mb-3">{compte.description}</p>

              <div className="mb-2">
                <p className="text-sm text-gray-700">
                  <strong>Frais mensuel :</strong> <em className="text-green-700">Non affiché publiquement</em>
                </p>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-800 font-semibold mb-1">Cartes incluses :</p>
                {compte.cartesIncluses.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {compte.cartesIncluses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Aucune carte incluse</p>
                )}
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-800 font-semibold mb-1">Services inclus :</p>
                {compte.servicesInclus.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {compte.servicesInclus.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Aucun service inclus</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypesDeComptes;
