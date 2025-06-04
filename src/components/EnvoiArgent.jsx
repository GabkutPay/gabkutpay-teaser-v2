import React, { useState } from "react";
import ValidationSecurisee from "../ValidationSecurisee";

const EnvoiArgent = () => {
  const [formData, setFormData] = useState({
    montant: "",
    numero: "",
  });

  const [showValidation, setShowValidation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalEnvoi = (password, otp) => {
    // Simulation d’envoi sécurisé
    console.log("✅ ENVOI EFFECTUÉ", {
      ...formData,
      password,
      otp,
    });

    alert(`✅ Envoi de ${formData.montant} USD au ${formData.numero} validé.`);
    setFormData({ montant: "", numero: "" });
    setShowValidation(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-12 space-y-6">
      <h2 className="text-xl font-bold text-blue-700">💸 Envoi d’argent</h2>

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
            type="tel"
            name="numero"
            placeholder="Numéro du destinataire"
            value={formData.numero}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          <button
            onClick={() => setShowValidation(true)}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
          >
            Continuer
          </button>
        </>
      ) : (
        <ValidationSecurisee
          operationDetails={{
            action: "envoyer",
            montant: `${formData.montant} USD`,
            destinataire: formData.numero,
          }}
          onValider={({ password, otp }) => handleFinalEnvoi(password, otp)}
        />
      )}
    </div>
  );
};

export default EnvoiArgent;
