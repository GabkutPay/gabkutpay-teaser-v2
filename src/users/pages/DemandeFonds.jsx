import React, { useState } from 'react';
import axios from 'axios';

const DemandeFonds = () => {
  const [email, setEmail] = useState('');
  const [montant, setMontant] = useState('');
  const [devise, setDevise] = useState('USD');
  const [note, setNote] = useState('');
  const [code2FA, setCode2FA] = useState('');
  const [message, setMessage] = useState('');
  const [chargement, setChargement] = useState(false);

  const handleDemande = async (e) => {
    e.preventDefault();
    setMessage('');
    setChargement(true);

    try {
      const res = await axios.post('/api/fonds/demander', {
        destinataire: email,
        montant: parseFloat(montant),
        devise,
        note,
        code2FA
      });

      setMessage(res.data.message || 'Demande envoyée avec succès.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la demande.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
        🧾 Demander des fonds
      </h2>

      <form onSubmit={handleDemande} className="space-y-4">
        <input
          type="email"
          placeholder="Email du destinataire"
          className="w-full border px-4 py-2 rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Montant demandé"
          className="w-full border px-4 py-2 rounded-xl"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />

        <select
          value={devise}
          onChange={(e) => setDevise(e.target.value)}
          className="w-full border px-4 py-2 rounded-xl"
        >
          <option value="USD">USD</option>
          <option value="CDF">CDF</option>
        </select>

        <textarea
          placeholder="Note facultative"
          className="w-full border px-4 py-2 rounded-xl"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          type="text"
          placeholder="Code 2FA"
          className="w-full border px-4 py-2 rounded-xl"
          value={code2FA}
          onChange={(e) => setCode2FA(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={chargement}
          className="w-full bg-yellow-600 text-white py-2 rounded-xl hover:bg-yellow-700"
        >
          {chargement ? 'Envoi en cours…' : 'Envoyer la demande'}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-sm text-yellow-700 font-medium">{message}</div>
      )}
    </div>
  );
};

export default DemandeFonds;
