import React from 'react';
import { motion } from 'framer-motion';

const TeaserPartenairesInvestisseurs = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-white text-gray-900 py-16 px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          🤝 Appel aux partenaires et investisseurs
        </h2>

        <p className="text-lg mb-4">
          Gabkut Pay est plus qu’une fintech. C’est une vision audacieuse pour transformer la
          finance, les habitudes sociales et le pouvoir économique de l’Afrique.
        </p>

        <p className="mb-4 font-medium">
          🎯 Nous lançons un appel de soutien aux :
          <br />
          investisseurs, partenaires techniques, juridiques, administratifs, industriels,
          institutions financières, agences de développement, incubateurs, États et
          particuliers engagés.
        </p>

        <p className="mb-4 text-left">
          Nous cherchons des alliés pour :
          <ul className="list-disc list-inside mt-2">
            <li>💸 Financer nos modules stratégiques (cartes, IA, retraits instantanés…)</li>
            <li>📊 Bénéficier d’un retour sur investissement évolutif (parts et dividendes)</li>
            <li>🔧 Participer à l’amélioration continue (soutien matériel, technique, API…)</li>
            <li>🌍 Étendre Gabkut Pay dans les 370+ pays et territoires connectés</li>
          </ul>
        </p>

        <p className="text-blue-900 font-semibold my-6">
          💼 Devenez acteur d’une transformation continentale.
          <br />
          Nous ne voulons pas de dons. Nous voulons des partenaires durables.
          Mais pour ceux (personnes physiques et morales)
          qui voudront nous faire ces dons en matériels, finances, technique, ils sont les bienvenus car la vision est très grande.
          Seuls, nous n’y arriverons peut-être pas.
        </p>

        <blockquote className="italic text-sm sm:text-base bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
          “Gabkut Pay est né pour résoudre un problème que tous les autres services financiers n’ont jamais osé
          attaquer à sa racine : donner le plein contrôle de son argent à chaque utilisateur,
          sans files d’attente, sans déplacements, sans humiliation. Notre mission est de
          servir vite, bien, et dignement.” <br />
          <span className="font-bold">– Gaël KUTALAKUDIMA GABRIEL, Fondateur et Directeur Général Gabkut Pay.</span>
        </blockquote>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:gabkutpayrdc@gmail.com"
            className="bg-blue-900 text-white px-6 py-3 rounded font-semibold hover:bg-blue-800 transition"
          >
            ✉️ Proposer un partenariat
          </a>
          <a
            href="https://wa.me/243822783500"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            📱 Discuter via WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default TeaserPartenairesInvestisseurs;
