import React from "react";
import EnvoiArgent from "../components/transactions/EnvoiArgent";
import { motion } from "framer-motion";

const OperationEnvoi = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-blue-800 text-center mb-8"
      >
        💸 Effectuer un envoi d’argent sécurisé
      </motion.h1>

      <EnvoiArgent />
    </main>
  );
};

export default OperationEnvoi;
