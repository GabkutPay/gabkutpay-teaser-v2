import React from "react";
import { motion } from "framer-motion";
import PartenaireForm from "../components/PartenaireForm";
import ActionnaireForm from "../components/ActionnaireForm";
import SuggestionForm from "../components/SuggestionForm";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Formulaires = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12 px-4">
      {/* En-tête générale */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-3">
          📄 Formulaires publics
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Rejoignez l’univers Gabkut Pay : partenariats, actionnariat ou suggestions ouvertes.
        </p>
      </section>

      {/* Partenaire */}
      <motion.section
        id="partenaire"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-white rounded-2xl shadow-lg p-8 mb-16"
      >
        <img src="/images/partenaire.svg" alt="Illustration partenaire" className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-blue-700 mb-2">🤝 Devenir partenaire</h2>
        <p className="text-gray-600 mb-6">
          Remplissez ce formulaire pour soumettre une demande de partenariat avec Gabkut Pay.
        </p>
        <PartenaireForm />
      </motion.section>

      {/* Actionnaire */}
      <motion.section
        id="actionnaire"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-white rounded-2xl shadow-lg p-8 mb-16"
      >
        <img src="/images/actionnaire.svg" alt="Illustration actionnaire" className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-green-700 mb-2">💼 Devenir actionnaire</h2>
        <p className="text-gray-600 mb-6">
          Rejoignez notre vision en tant qu’actionnaire. Expliquez-nous vos motivations.
        </p>
        <ActionnaireForm />
      </motion.section>

      {/* Suggestion */}
      <motion.section
        id="suggestion"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <img src="/images/suggestion.svg" alt="Illustration suggestion" className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-purple-700 mb-2">💡 Boîte à suggestions</h2>
        <p className="text-gray-600 mb-6">
          Aidez-nous à améliorer Gabkut Pay en partageant vos idées.
        </p>
        <SuggestionForm />
      </motion.section>
    </main>
  );
};

export default Formulaires;
