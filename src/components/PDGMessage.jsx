import React from 'react';
import { motion } from 'framer-motion';

const PDGMessage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="py-12 px-6 bg-white text-gray-900 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold mb-6"
      >
        📣 Message du PDG
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <img
          src="/assets/pdg-gael.jpg"
          alt="PDG Gaël KUTALAKUDIMA"
          className="w-36 h-36 rounded-full border-4 border-yellow-500 shadow-lg object-cover"
        />
        <h3 className="text-lg font-semibold text-blue-900">
          Gaël KUTALAKUDIMA – PDG Gabkut Pay
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 max-w-3xl mx-auto space-y-6 text-justify leading-relaxed"
      >
        {/* 🇫🇷 Français */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-bold text-blue-800 mb-2">🇫🇷 Français</h4>
          <p>
            Gabkut Pay a été conçu comme une réponse totale et stratégique aux souffrances que notre peuple subit depuis des décennies pour accéder à son propre argent.
            Nous voulons en finir avec les longues files d'attente, les agences fermées, les cartes bloquées, les procédures lentes.
            Notre rêve est simple : permettre à chaque utilisateur, où qu’il soit, de contrôler son argent en toute autonomie. Sans déplacement. Sans stress. Sans limites.
          </p>
        </motion.div>

        {/* 🇬🇧 English */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h4 className="font-bold text-blue-800 mb-2">🇬🇧 English</h4>
          <p>
            Gabkut Pay was created as a smart and complete answer to the many financial difficulties people face every day.
            Our mission is to end queues, delays, blocked cards, and painful money access. We want every user to control their money anytime, anywhere — with no stress, no limits, and no agents.
          </p>
        </motion.div>

        {/* 🇸🇦 العربية */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h4 className="font-bold text-blue-800 mb-2 text-right">🇸🇦 العربية</h4>
          <p className="text-right">
            تم إنشاء Gabkut Pay كحل ذكي وكامل لمعاناة الناس اليومية في الوصول إلى أموالهم.
            هدفنا هو إنهاء الطوابير الطويلة والتأخيرات والبطاقات المحظورة وكل أشكال المعاناة المالية.
            نريد أن يتمكن كل مستخدم من التحكم الكامل في أمواله، في أي وقت ومن أي مكان، بدون ضغط وبدون حدود.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default PDGMessage;
