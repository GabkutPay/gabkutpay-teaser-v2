import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriquePromoCodes = ({ userId }) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`/api/user/promo-codes/${userId}`)
      .then((res) => setCodes(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🎁 Historique des Codes Promo</h2>
      {codes.length === 0 ? (
        <p>Aucun code promo trouvé.</p>
      ) : (
        <table className="w-full table-auto border-collapse text-left bg-white text-black rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Code</th>
              <th className="p-2">Origine</th>
              <th className="p-2">Statut</th>
              <th className="p-2">Créé le</th>
              <th className="p-2">Utilisé le</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr
                key={code._id}
                className={code.used ? 'bg-gray-100' : 'bg-white font-semibold'}
              >
                <td className="p-2">{code.code}</td>
                <td className="p-2 capitalize">{code.source || 'inconnu'}</td>
                <td className="p-2">
                  {code.used ? (
                    <span className="text-red-600 font-semibold">Utilisé</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Actif</span>
                  )}
                </td>
                <td className="p-2">
                  {new Date(code.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {code.usedAt
                    ? new Date(code.usedAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriquePromoCodes;
