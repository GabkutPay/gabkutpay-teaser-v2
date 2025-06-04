import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Accueil = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4"
        >
          Bienvenue sur Gabkut Pay 💳
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          La solution moderne, rapide et sécurisée pour toutes vos opérations financières.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-center gap-4"
        >
          <Link to="/formulaires">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow transition-all duration-300">
              Devenir partenaire
            </button>
          </Link>
          <Link to="/connexion">
            <button className="border border-blue-700 text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-lg shadow transition-all duration-300">
              Se connecter
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Avantages Gabkut */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2 text-blue-800">⚡ Rapidité</h3>
            <p>Effectuez vos transferts et paiements en quelques secondes.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2 text-blue-800">🔒 Sécurité</h3>
            <p>Des technologies de protection avancées pour vos transactions.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-2 text-blue-800">🌍 Accessibilité</h3>
            <p>Disponible partout, pour tous, même sans compte bancaire.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Accueil;
