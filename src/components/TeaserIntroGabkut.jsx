import React from 'react';
import { motion } from 'framer-motion';

const TeaserIntroGabkut = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="w-full bg-white text-gray-900 px-6 py-16 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold mb-6"
      >
        🌍 Gabkut Pay : une cité financière numérique autonome
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-3xl mx-auto text-lg leading-relaxed mb-8"
      >
        Gabkut Pay n'est pas une simple application de transfert ou de paiement.
        C’est une <strong>infrastructure digitale complète</strong>, une <strong>cité souveraine financière</strong>, conçue
        pour regrouper <strong>tous les besoins financiers, administratifs, sociaux et commerciaux</strong>
        d’un individu, d’une entreprise, d’une diaspora ou d’un gouvernement — dans un seul espace sécurisé.
        Du jamais eu dans le monde des finances en Afrique. Nous pensons dans le cadre de souverainiser l'Afrique, le peuple noir et les terres noires. 
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          {
            title: '🔐 Sécurité bancaire IA',
            desc: "Chaque compte est protégé par une IA bancaire qui surveille, bloque, alerte et corrige automatiquement.",
          },
          {
            title: '🌍 Intégration universelle',
            desc: "Mobile Money, banques locales, cartes Visa, agences de transfert (Western Union, MoneyGram, RIA, Flash,…), guichets automatiques, entreprises publiques, diaspora, ONG, consommateurs… Tout est relié.",
          },
          {
            title: '🧠 Assistance 24h/24 sans humain',
            desc: "Une IA intelligente vous accompagne à chaque étape. Zéro file. Zéro attente. Zéro frustration et surtout zéro erreur.",
          },
          {
            title: '🏢 Écosystème modulaire',
            desc: "Gabkut n’est pas une simple app. C’est une cité autonome où chaque module (carte, billet, reçu, assistance, etc.) est une institution à part entière.",
          },
          {
            title: '⚙️ Fonctionne même hors-ligne',
            desc: "Le mode hors-ligne intelligent permet à l’utilisateur de préparer ses opérations sans connexion.",
          },
          {
            title: '📊 Comptes personnalisés',
            desc: "Chaque utilisateur a un compte adapté à son profil : élève, diaspora, entreprise, institution, VIP, partagé, etc.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.2, duration: 0.6 }}
            className="bg-blue-50 p-6 rounded-xl shadow"
          >
            <h3 className="font-bold text-blue-800 mb-2">{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-gray-600 mt-12 max-w-4xl mx-auto text-sm"
      >
        Gabkut Pay est né d’une révolte contre les systèmes lents, fermés, coloniaux.  
        Il est conçu pour rendre <strong>l’argent intelligent, fluide, local et accessible</strong> — sans souffrance, sans papiers, sans aller-retour.
        Ce n’est pas un système bancaire. C’est <strong>un peuple numérique qui se lève</strong>. Le panafricanisme dans toutes les dimensions. 
      </motion.p>
    </motion.section>
  );
};

export default TeaserIntroGabkut;
