import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TeaserCartesPrecommande = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    carte: '',
  });

  const cartes = [
    {
      nom: 'Gabkut Classic',
      plafond: '5 000 $',
      prix: '5 $',
      frais: '2 %',
      mensuel: '2 $'
    },
    {
      nom: 'Gabkut Gold',
      plafond: '15 000 $',
      prix: '9,99 $',
      frais: '1,75 %',
      mensuel: '3,5 $'
    },
    {
      nom: 'Gabkut Infinite',
      plafond: '27 000 $',
      prix: '20 $',
      frais: '1,5 %',
      mensuel: '4 $'
    },
    {
      nom: 'Gabkut Infinite Prime',
      plafond: '49 000 $',
      prix: '35 $',
      frais: '1,4 %',
      mensuel: '5 $'
    },
    {
      nom: 'Gabkut Ultra (Super VIP)',
      plafond: 'Illimité',
      prix: 'Sur demande',
      frais: '1,25 %',
      mensuel: 'Sur mesure'
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Précommande envoyée (simulation). Backend à venir.');
  };

  return (
    <motion.section
      id="precommande"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-white text-gray-900 py-12 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-6"
        >
          💳 Précommandez votre carte Gabkut IA
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-10"
        >
          Choisissez la carte qui correspond à votre style de vie. Chaque carte est dotée d’une IA intégrée, 
          d’un CVV dynamique (c'est-à-dire que dès que vous décidez de changer votre CVV, votre carte se déconnecte de partout où elle était connectée) 
          et d’un système de sécurité invisible.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cartes.map((carte, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="border rounded-xl shadow p-4 bg-blue-50"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{carte.nom}</h3>
              <ul className="text-sm text-gray-700 mb-2">
                <li>🛡️ Plafond : {carte.plafond}</li>
                <li>💰 Prix : {carte.prix}</li>
                <li>💸 Frais : {carte.frais} par opération</li>
                <li>📆 Mensuel : {carte.mensuel}</li>
              </ul>
              <button
                onClick={() => setFormData({ ...formData, carte: carte.nom })}
                className="bg-blue-900 text-white rounded px-4 py-2 text-sm hover:bg-blue-800 transition"
              >
                Choisir cette carte
              </button>
            </motion.div>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="max-w-xl mx-auto space-y-4"
        >
          <input
            type="text"
            name="nom"
            placeholder="Nom complet"
            value={formData.nom}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="telephone"
            placeholder="Téléphone WhatsApp"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            name="carte"
            placeholder="Carte choisie"
            value={formData.carte}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-gray-100"
            readOnly
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-900 text-white font-bold py-2 rounded hover:bg-blue-800 transition"
          >
            Réserver cette carte
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default TeaserCartesPrecommande;
