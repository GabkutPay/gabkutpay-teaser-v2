import React from 'react';
import { motion } from 'framer-motion';

const avantages = [
  {
    titre: 'Sécurité Bancaire Maximale',
    description: 'Vos données et fonds sont protégés par plusieurs niveaux de chiffrement, de contrôle IA, de validation humaine et de double authentification.',
    icone: '🔒'
  },
  {
    titre: 'Super App Tout-en-un',
    description: 'Envoyer, recevoir, épargner, acheter des billets, recharger, gérer une carte virtuelle ou commander un service : tout est possible.',
    icone: '📱'
  },
  {
    titre: 'Contrôle Absolu de Vos Finances',
    description: 'Décidez à tout moment des limites, des destinataires, des devises, ou désactivez temporairement votre carte ou compte.',
    icone: '🎛️'
  },
  {
    titre: 'Support Personnalisé 24h/24',
    description: 'Nos équipes sont disponibles à tout moment, avec chatbot IA, support humain, email prioritaire et ligne VIP.',
    icone: '🤝'
  },
  {
    titre: 'Tarifs Optimisés & Transparence Totale',
    description: 'Aucun frais caché. Tout est visible avant chaque opération. Simulateurs et relevés PDF disponibles.',
    icone: '💸'
  },
  {
    titre: 'Accès Universel & Multilingue',
    description: 'Disponible en 🇫🇷 🇬🇧 🇸🇦 avec accessibilité depuis tous les appareils, même hors ligne grâce au mode intelligent.',
    icone: '🌍'
  },
];

const TeaserAvantages = () => {
  return (
    <section className="bg-blue-50 py-16 px-6 text-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-12"
      >
        🎯 Pourquoi choisir Gabkut Pay ?
      </motion.h2>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {avantages.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-900"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {item.icone} {item.titre}
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeaserAvantages;
