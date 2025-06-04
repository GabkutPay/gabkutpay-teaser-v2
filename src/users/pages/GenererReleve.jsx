// 🔵 FRONTEND – Composant GenererReleve.jsx avec présentation, IA et arrière-plan
import React, { useState } from 'react';
import axios from 'axios';

const GenererReleve = () => {
  const [debut, setDebut] = useState('');
  const [fin, setFin] = useState('');
  const [message, setMessage] = useState('');
  const [chargement, setChargement] = useState(false);

  const handleGenerer = async () => {
    if (!debut || !fin) return setMessage('Veuillez sélectionner les deux dates.');

    try {
      setChargement(true);
      setMessage('');

      const response = await axios.post('/api/releves/generer', { debut, fin });

      if (response.data.urlPDF) {
        window.open(response.data.urlPDF, '_blank');
      } else {
        setMessage(response.data.message || 'Relevé généré.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la génération.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* 🧠 Présentation en haut de la page */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-3">📊 Relevé de Compte intelligent Gabkut Pay</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Obtenez un relevé PDF complet et certifié, incluant <strong>jusqu’à la dernière opération passée à la seconde</strong> près. Sélectionnez une période et laissez notre IA vous assister. Tarif : <strong>0,5 $</strong>.
        </p>
        <div className="mt-4">
          <img src="/illustrations/releve-ia.png" alt="IA Finance" className="mx-auto w-60" />
        </div>
      </div>

      {/* 📅 Formulaire de génération */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto animate-fade-in">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium text-blue-700">📅 Date de début</label>
            <input
              type="date"
              value={debut}
              onChange={(e) => setDebut(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-700">📅 Date de fin</label>
            <input
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            onClick={handleGenerer}
            disabled={chargement}
            className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
          >
            {chargement ? 'Génération en cours...' : 'Générer mon relevé (0,5 $)'}
          </button>
          {message && <p className="text-red-600 mt-2 text-center font-semibold">{message}</p>}
        </div>
      </div>

     <div className="mt-4">
  <img
    src="/illustrations/releve-ia.png"
    alt="Illustration Relevé IA"
    className="mx-auto w-60 rounded-xl shadow-md"
  />
</div>

export default GenererReleve;
