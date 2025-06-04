import React from 'react';
import { motion } from 'framer-motion';

const TeaserServicesGabkut = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="bg-white text-gray-900 px-6 py-20"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-10 text-blue-900"
      >
        🔧 Tous les services Gabkut Pay
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
        {[
          {
            title: "📤 Envoi d'argent",
            items: [
              "Vers tous les utilisateurs Gabkut",
              "Vers des non-inscrits Gabkut Pay (notification email + SMS + instructions)",
              "Vers Mobiles Money (Airtel, Vodacom, Orange, Africell)",
              "Vers banques locales & internationales",
              "Vers agences WU, MoneyGram, Ria, Flash",
              "Vers diasporas"
            ]
          },
          {
            title: "📥 Réception d'argent",
            items: [
              "Depuis une autre personne Gabkut",
              "Depuis diaspora (WU, MG, WorldRemit...)",
              "Depuis banque ou Mobile Money",
              "Depuis carte Visa ou MasterCard",
              "Depuis une recharge pro / partenaire"
            ]
          },
          {
            title: "🏧 Retraits disponibles",
            items: [
              "Retrait via compte à tout moment 24h/24",
              "Sans carte, sur distributeur (ATM code unique)",
              "Via agents certifiés (cabines, partenaires)",
              "Vers Mobile Money ou carte Visa",
              "Vers une agence de transfert (WU, MoneyGram…)"
            ]
          },
          {
            title: "➕ Recharger mon solde",
            items: [
              "Par Mobile Money (Vodacom, Orange...)",
              "Par banque (via virement ou carte)",
              "Par carte Visa ou MasterCard (surtout pour la diaspora)",
              "Depuis agence WU, RIA, MoneyGram",
              "Depuis un autre utilisateur"
            ]
          },
          {
            title: "💼 Services spéciaux",
            items: [
              "Demandes de fonds",
              "Vente de cartes virtuelles Visa et MasterCard",
              "Paiement de factures et abonnements",
              "Envoi avec message vocal ou visuel",
              "Achat de billet d'avion",
              "Gabkut Lova pour faire des chansons personnalisées",
              "Retrait et envoi via agences de transfert",
              "Paiements salaires",
              "Clé API pour paiements QR ou bouton pro",
              "Gabkut Schola pour écoles et élèves",
              "Gabkut Achats",
              "Achat d'assurances voyage ou santé",
              "Gabkut Volt, coffre fort sécurisé",
              "Rencontres professionnelles entre utilisateurs",
              "Et bien plus encore..."
            ]
          },
          {
            title: "🤖 Automatisations",
            items: [
              "Détection de fraudes en temps réel",
              "Relevés automatiques en PDF",
              "Chat IA 24h/24",
              "Conseils financiers personnalisés",
              "Historique intelligent avec IA"
            ]
          }
        ].map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.2, duration: 0.6 }}
            className="bg-blue-50 p-6 rounded-xl shadow border-l-4 border-blue-900"
          >
            <h3 className="font-bold mb-2">{service.title}</h3>
            <ul className="list-disc ml-4 space-y-1">
              {service.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="max-w-3xl mx-auto mt-14 text-center text-base text-gray-800 leading-relaxed"
      >
        Chaque service est <strong>disponible 24h/24</strong> et <strong>100% accessible depuis votre téléphone ou ordinateur</strong>.  
        Plus de queues, plus de complications, plus d’attente.  
        Vous êtes maître de vos opérations. Gabkut ne dort pas.
        Notez bien : Il y a plusieurs autres services que nous n'avons pas cités ici qui vont vous éblouir, vous stupéfier 
        et vous laisser sans voix.
        "L'innovation, l'indépendance, la souveraineté, le choix, la décision vous est maintenant rendue, restituée"
      </motion.div>
    </motion.section>
  );
};

export default TeaserServicesGabkut;
