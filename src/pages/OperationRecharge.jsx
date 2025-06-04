import React, { useState } from "react";
import ValidationSecurisee from "../components/ValidationSecurisee";
import { motion } from "framer-motion";

const OperationRecharge = () => {
  const [formData, setFormData] = useState({
    montant: "",
    numeroCarte: "",
  });

  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalRecharge = (password, otp) => {
    console.log("✅ RECHARGE VALIDÉE", {
      ...formData,
      password,
      otp,
    });

    alert(`✅ Recharge de ${formData.montant} USD sur carte ${formData.numeroCarte} effectuée.`);
    setFormData({ montant: "", numeroCarte: "" });
    setShowValidation(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-green-800 text-center mb-8"
      >
        💳 Recharger une carte virtuelle
      </motion.h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        {!showValidation ? (
          <>
            <input
              type="number"
              name="montant"
              placeholder="Montant en USD"
              value={formData.montant}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
            />

            <input
              type="text"
              name="numeroCarte"
              placeholder="Numéro de carte"
              value={formData.numeroCarte}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
            />

            <button
              onClick={() => setShowValidation(true)}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded"
            >
              Continuer
            </button>
          </>
        ) : (
          <ValidationSecurisee
            operationDetails={{
              action: "recharger",
              montant: `${formData.montant} USD`,
              destinataire: `Carte ${formData.numeroCarte}`,
            }}
            onValider={({ password, otp }) => handleFinalRecharge(password, otp)}
          />
        )}
      </div>
    </main>
  );
};

export default OperationRecharge;
