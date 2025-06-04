import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiValidationPanel = () => {
  const [operations, setOperations] = useState([]);
  const [commentaires, setCommentaires] = useState({});
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // id opération en cours d'action
  const [errorMessage, setErrorMessage] = useState(null);
  const adminNom = "Gaël Admin"; // À rendre dynamique plus tard

  const fetchOperations = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await axios.get('/api/manual/en-attente');
      setOperations(res.data);
    } catch (err) {
      setErrorMessage('Erreur lors de la récupération des opérations.');
      console.error('Erreur récupération opérations :', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, []);

  const handleValider = async (id) => {
    setActionLoading(id);
    setErrorMessage(null);
    try {
      await axios.put(`/api/manual/valider/${id}`, { adminNom });
      // Mise à jour locale pour éviter un nouveau fetch complet
      setOperations((prev) => prev.filter(op => op._id !== id));
      setCommentaires((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      setErrorMessage("Erreur lors de la validation.");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejeter = async (id) => {
    const commentaire = commentaires[id] || '';
    if (!commentaire.trim()) {
      return setErrorMessage("Veuillez entrer un commentaire de rejet.");
    }
    setActionLoading(id);
    setErrorMessage(null);
    try {
      await axios.put(`/api/manual/rejeter/${id}`, {
        adminNom,
        commentaire
      });
      setOperations((prev) => prev.filter(op => op._id !== id));
      setCommentaires((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      setErrorMessage("Erreur lors du rejet.");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentaires(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Opérations manuelles en attente</h2>

      {errorMessage && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{errorMessage}</div>
      )}

      {loading ? (
        <p>Chargement des opérations...</p>
      ) : operations.length === 0 ? (
        <p>Aucune opération en attente.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Utilisateur</th>
              <th className="p-2">Type</th>
              <th className="p-2">Montant</th>
              <th className="p-2">Devise</th>
              <th className="p-2">Commentaire</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr key={op._id} className="border-t">
                <td className="p-2">{op.userId?.nom} {op.userId?.prenom}</td>
                <td className="p-2 capitalize">{op.type}</td>
                <td className="p-2">{op.montant}</td>
                <td className="p-2">{op.devise}</td>
                <td className="p-2">
                  <input
                    type="text"
                    placeholder="Commentaire (si rejet)"
                    value={commentaires[op._id] || ''}
                    onChange={(e) => handleCommentChange(op._id, e.target.value)}
                    className="border rounded p-1 w-full"
                    disabled={actionLoading === op._id}
                  />
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleValider(op._id)}
                    disabled={actionLoading === op._id}
                    className={`px-3 py-1 rounded text-white ${actionLoading === op._id ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {actionLoading === op._id ? 'Validation...' : 'Valider'}
                  </button>
                  <button
                    onClick={() => handleRejeter(op._id)}
                    disabled={actionLoading === op._id}
                    className={`px-3 py-1 rounded text-white ${actionLoading === op._id ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {actionLoading === op._id ? 'Rejet...' : 'Rejeter'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApiValidationPanel;
