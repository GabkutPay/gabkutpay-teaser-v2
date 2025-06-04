import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VaultBox = ({ user }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const chargerVault = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/vault', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(res.data);
      } catch (err) {
        console.error("Erreur chargement Vault :", err);
      }
    };

    if (user?._id) {
      chargerVault();
    }
  }, [user]);

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">🔐 Gabkut Vault</h2>

      {documents.length === 0 ? (
        <p className="text-gray-600">Aucun document enregistré dans votre coffre pour le moment.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <li key={doc._id} className="py-3 flex items-center justify-between">
              <span className="text-sm text-gray-800">{doc.nom}</span>
              <a
                href={doc.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                Ouvrir
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VaultBox;
