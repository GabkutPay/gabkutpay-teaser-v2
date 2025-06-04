import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacturesPanel = () => {
  const [factures, setFactures] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    axios.get('/api/utilisateur/mes-factures', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setFactures(res.data))
    .catch(err => console.error("Erreur récupération factures", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Mes factures mensuelles</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Période</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Services</th>
              <th className="p-3">Téléchargement</th>
            </tr>
          </thead>
          <tbody>
            {factures.map(facture => (
              <tr key={facture._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{facture.periode}</td>
                <td className="p-3 text-center">{facture.montant} $</td>
                <td className="p-3">{facture.services.join(', ')}</td>
                <td className="p-3 text-center">
                  <a
                    href={facture.fichierPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    📄 Télécharger
                  </a>
                </td>
              </tr>
            ))}
            {factures.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 p-4">Aucune facture disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacturesPanel;
