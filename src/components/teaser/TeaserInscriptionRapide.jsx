// 📁 src/components/teaser/TeaserInscriptionRapide.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TeaserInscriptionRapide = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Inscription simulée. À connecter au backend.');
    setFormData({ nom: '', email: '', telephone: '' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-blue-50 text-gray-900"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">📝 Inscription rapide</h2>
        <p className="mb-6">Inscrivez-vous en moins de 30 secondes pour réserver votre compte Gabkut Pay.</p>

        <form onSubmit={handleSubmit} className="grid gap-4 text-left">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom complet"
            className="p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Adresse email"
            className="p-3 border rounded"
            required
          />
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone WhatsApp"
            className="p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition"
          >
            Créer mon compte
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default TeaserInscriptionRapide;
