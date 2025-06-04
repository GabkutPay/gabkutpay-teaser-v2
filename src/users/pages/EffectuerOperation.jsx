import React, { useState } from 'react';
import axios from 'axios';

const EffectuerOperation = () => {
  const [destinataire, setDestinataire] = useState('');
  const [montant, setMontant] = useState('');
  const [devise, setDevise] = useState('USD');
  const [code2FA, setCode2FA] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('/api/transaction/envoyer', {
        destinataire,
        montant: parseFloat(montant),
        devise,
        code2FA
      });

      setMessage(res.data.message || 'Succès !');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur inconnue.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">🔐 Envoyer des fonds (2FA)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email du destinataire"
          className="w-full px-4 py-2 border rounded-xl"
          value={destinataire}
          onChange={(e) => setDestinataire(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Montant"
          className="w-full px-4 py-2 border rounded-xl"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />

        <select
          value={devise}
          onChange={(e) => setDevise(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        >
          <option value="USD">USD</option>
          <option value="CDF">CDF</option>
        </select>

        <input
          type="text"
          placeholder="Code 2FA (reçu par email)"
          className="w-full px-4 py-2 border rounded-xl"
          value={code2FA}
          onChange={(e) => setCode2FA(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Envoyer
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-sm text-blue-700 font-medium">{message}</div>
      )}
    </div>
  );
};

export default EffectuerOperation;
