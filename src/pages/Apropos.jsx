import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Apropos = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 py-12 px-6">
      <section className="max-w-5xl mx-auto">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl font-extrabold text-center text-blue-800 mb-6"
        >
          À propos de Gabkut Pay
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10"
        >
          Gabkut Pay est une plateforme financière innovante née d’un rêve africain : offrir à chacun la possibilité de
          gérer son argent, envoyer, recevoir, convertir ou investir — simplement, rapidement, et en toute confiance.
        </motion.p>

        {/* Mission, Vision, Valeurs */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">🎯 Notre mission</h3>
            <p>
              Démocratiser l’accès aux services financiers numériques, sécurisés et adaptés aux réalités africaines.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-green-700 mb-2">🌍 Notre vision</h3>
            <p>
              Créer un écosystème financier solide et inclusif qui connecte les diasporas, les familles, les écoles et
              les entrepreneurs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-purple-700 mb-2">💡 Nos valeurs</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Fiabilité & sécurité</li>
              <li>Accessibilité & inclusion</li>
              <li>Innovation continue</li>
              <li>Transparence & engagement</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Apropos;
