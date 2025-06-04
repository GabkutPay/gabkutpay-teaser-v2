import React, { useState } from "react";
import ValidationSecurisee from "../components/ValidationSecurisee";
import { motion } from "framer-motion";

const OperationRetrait = () => {
  const [formData, setFormData] = useState({
    montant: "",
    reseau: "Orange",
    numero: "",
  });

  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalRetrait = (password, otp) => {
    console.log("✅ RETRAIT EFFECTUÉ", {
      ...formData,
      password,
      otp,
    });

    alert(`✅ Retrait de ${formData.montant} USD vers ${formData.reseau} (${formData.numero}) validé.`);
    setFormData({ montant: "", reseau: "Orange", numero: "" });
    setShowValidation(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold text-yellow-800 text-center mb-8"
      >
        📤 Retrait vers Mobile Money
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

            <select
              name="reseau"
              value={formData.reseau}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            >
              <option>Orange</option>
              <option>Airtel</option>
              <option>Vodacom</option>
              <option>Africell</option>
            </select>

            <input
              type="tel"
              name="numero"
              placeholder="Numéro Mobile Money"
              value={formData.numero}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
              required
            />

            <button
              onClick={() => setShowValidation(true)}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded"
            >
              Continuer
            </button>
          </>
        ) : (
          <ValidationSecurisee
            operationDetails={{
              action: "retirer",
              montant: `${formData.montant} USD`,
              destinataire: `${formData.reseau} - ${formData.numero}`,
            }}
            onValider={({ password, otp }) => handleFinalRetrait(password, otp)}
          />
        )}
      </div>
    </main>
  );
};

export default OperationRetrait;
