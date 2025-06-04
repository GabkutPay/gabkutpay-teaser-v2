import React, { useState } from 'react';
import axios from 'axios';

const EnvoyerArgent = () => {
  const [email, setEmail] = useState('');
  const [montant, setMontant] = useState('');
  const [devise, setDevise] = useState('USD');
  const [code2FA, setCode2FA] = useState('');
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState('');

  const envoyer = async (e) => {
    e.preventDefault();
    setChargement(true);
    setMessage('');

    try {
      const res = await axios.post('/api/transaction/envoyer', {
        destinataire: email,
        montant: parseFloat(montant),
        devise,
        code2FA
      });

      setMessage(res.data.message || 'Opération réussie.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Échec de l’envoi.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        💸 Envoyer de l’argent
      </h2>

      <form onSubmit={envoyer} className="space-y-4">
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
          placeholder="Montant"
          className="w-full border px-4 py-2 rounded-xl"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />

        <select
          className="w-full border px-4 py-2 rounded-xl"
          value={devise}
          onChange={(e) => setDevise(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="CDF">CDF</option>
        </select>

        <input
          type="text"
          placeholder="Code 2FA (reçu par e-mail)"
          className="w-full border px-4 py-2 rounded-xl"
          value={code2FA}
          onChange={(e) => setCode2FA(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={chargement}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {chargement ? 'Traitement…' : 'Envoyer maintenant'}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-sm text-blue-700 font-medium">{message}</div>
      )}
    </div>
  );
};

export default EnvoyerArgent;
