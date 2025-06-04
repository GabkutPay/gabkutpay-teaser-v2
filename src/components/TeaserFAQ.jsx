import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: '🔒 Gabkut Pay est-il sécurisé ?',
    reponse: 'Oui, nous utilisons une sécurité redoutable, resistible, autonome,... Bref, une sécurité Poutine. un cryptage avancé, des alertes temps réel, des CVV dynamiques, et un mode "blocage automatique en cas d’anomalie et à réparer seul sans avoir besoin.',
  },
  {
    question: '💳 Qui peut commander une carte virtuelle Gabkut ?',
    reponse: 'Tout utilisateur inscrit et vérifié peut commander une carte virtuelle via son dashboard ou lors de la précommande.',
  },
  {
    question: '🌍 Gabkut Pay fonctionne-t-il à l’international ?',
    reponse: 'Oui. Nos cartes sont compatibles Visa et peuvent être utilisées en ligne et dans les tous pays, tous les sites.',
  },
  {
    question: '🤝 Peut-on parrainer des amis et gagner de l’argent ?',
    reponse: 'Oui ! Gabkut Pay propose un système de parrainage à plusieurs niveaux avec des récompenses automatiques.',
  },
  {
    question: '📱 Peut-on gérer son compte depuis un smartphone ?',
    reponse: 'Absolument. Gabkut Pay fonctionne sur mobile, desktop, et tablette. L’application mobile arrive bientôt.',
  },
];

const TeaserFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-50 text-gray-900 py-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
          ❓ Foire aux questions (FAQ)
        </h2>

        <div className="space-y-6">
          {questions.map((item, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded-xl p-5 bg-white shadow"
              onClick={() => toggleIndex(index)}
            >
              <h3 className="font-semibold text-lg cursor-pointer text-blue-800">
                {item.question}
              </h3>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-800 mt-3"
                  >
                    {item.reponse}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeaserFAQ;
