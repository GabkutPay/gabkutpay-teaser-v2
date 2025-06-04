import React from 'react';
import { motion } from 'framer-motion';

const temoignages = [
  {
    nom: "Esther N.",
    texte: "Avant Gabkut Pay, je faisais des heures de queue à la banque. Aujourd'hui je gère tout depuis chez moi. Une vraie liberté financière.",
    ville: "Kinshasa"
  },
  {
    nom: "Mohamed T.",
    texte: "Le compte diaspora m’a permis de transférer rapidement à mes parents sans frais cachés. Merci Gabkut pour cette révolution.",
    ville: "Dubaï"
  },
  {
    nom: "Josué M.",
    texte: "J'ai testé leur carte virtuelle : elle se déconnecte dès que tu changes ton CVV. Jamais vu un tel niveau de sécurité.",
    ville: "Lubumbashi"
  }
];

const TeaserTemoignages = () => {
  return (
    <section className="bg-gray-50 text-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl font-bold mb-10"
        >
          💬 Ils témoignent
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {temoignages.map((temoin, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="bg-white border rounded-xl shadow p-6"
            >
              <p className="text-gray-700 italic">“{temoin.texte}”</p>
              <p className="mt-4 font-semibold text-blue-900">{temoin.nom}</p>
              <p className="text-sm text-gray-500">{temoin.ville}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeaserTemoignages;
