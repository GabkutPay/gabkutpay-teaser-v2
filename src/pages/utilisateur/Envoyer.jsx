import React, { useState } from 'react';
import axios from 'axios';

export default function Envoyer() {
  const [mode, setMode] = useState('');
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEnvoiInterne = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:8080/api/user/envoyer', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setForm({});
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur lors de l'envoi.";
      setError(msg);
    }
  };

  const handleMobileMoney = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:8080/api/user/mobile-money', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setForm({});
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur Mobile Money.";
      setError(msg);
    }
  };

  const handleBanque = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:8080/api/user/vers-banque', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setForm({});
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur bancaire.";
      setError(msg);
    }
  };

  const handleExterne = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:8080/api/user/envoi-externe', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setForm({});
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur d’envoi externe.";
      setError(msg);
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'utilisateur':
        return (
          <form onSubmit={handleEnvoiInterne} className="mt-6 space-y-4 max-w-md">
            <div>
              <label className="block text-sm">Identifiant GKP ou Téléphone</label>
              <input type="text" name="destinataire" value={form.destinataire || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Montant (USD)</label>
              <input type="number" name="montant" value={form.montant || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded">Envoyer</button>
            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        );

      case 'mobile':
        return (
          <form onSubmit={handleMobileMoney} className="mt-6 space-y-4 max-w-md">
            <div>
              <label className="block text-sm">Réseau</label>
              <select name="reseau" value={form.reseau || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">-- Sélectionner --</option>
                <option value="vodacom">Vodacom</option>
                <option value="airtel">Airtel</option>
                <option value="orange">Orange</option>
                <option value="africell">Africell</option>
              </select>
            </div>
            <div>
              <label className="block text-sm">Numéro bénéficiaire</label>
              <input type="text" name="numero" value={form.numero || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Montant (USD)</label>
              <input type="number" name="montant" value={form.montant || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded">Envoyer</button>
            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        );

      case 'banque':
        return (
          <form onSubmit={handleBanque} className="mt-6 space-y-4 max-w-md">
            <div>
              <label className="block text-sm">Banque</label>
              <select name="banque" value={form.banque || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">-- Sélectionner --</option>
                <option value="TMB">TMB</option>
                <option value="Rawbank">Rawbank</option>
                <option value="Equity">Equity</option>
                <option value="Access Bank">Access Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm">Numéro de compte</label>
              <input type="text" name="numeroCompte" value={form.numeroCompte || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Nom du bénéficiaire</label>
              <input type="text" name="nom" value={form.nom || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Montant (USD)</label>
              <input type="number" name="montant" value={form.montant || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded">Envoyer</button>
            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        );

      case 'externe':
        return (
          <form onSubmit={handleExterne} className="mt-6 space-y-4 max-w-md">
            <div>
              <label className="block text-sm">Nom complet du destinataire</label>
              <input type="text" name="nom" value={form.nom || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Téléphone</label>
              <input type="text" name="telephone" value={form.telephone || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input type="email" name="email" value={form.email || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm">Montant (USD)</label>
              <input type="number" name="montant" value={form.montant || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded">Envoyer</button>
            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        );

      default:
        return <p className="mt-4 text-gray-500">Choisissez un type d’envoi ci-dessus.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ml-64 p-8">
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">📤 Envoyer de l’argent</h1>
        <p className="text-gray-700 mb-6">Choisissez le type de destinataire :</p>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => setMode('utilisateur')} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">👤 À un utilisateur Gabkut</button>
          <button onClick={() => setMode('mobile')} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">📱 Vers Mobile Money</button>
          <button onClick={() => setMode('banque')} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">🏦 Vers Banque</button>
          <button onClick={() => setMode('externe')} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">👤 À une personne non-inscrite</button>
        </div>

        {renderForm()}
      </div>
    </div>
  );
}
