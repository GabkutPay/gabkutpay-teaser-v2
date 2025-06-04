import React, { useState } from "react";

const ValidationSecurisee = ({ operationDetails, onValider }) => {
  const [accepted, setAccepted] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && accepted) {
      setStep(2);
    } else if (step === 2 && password) {
      setStep(3);
    } else if (step === 3 && otp.length === 6) {
      setStep(4);
    }
  };

  const handleConfirm = () => {
    onValider({ password, otp });
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-4">
      {step === 1 && (
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <span className="text-sm text-gray-700">
              J’ai lu et j’accepte la{" "}
              <a href="/confidentialite" target="_blank" className="text-blue-600 underline">
                politique de confidentialité
              </a>
              .
            </span>
          </label>
          <button
            onClick={handleNext}
            disabled={!accepted}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Continuer
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <label className="block text-sm text-gray-700">
            Mot de passe :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </label>
          <button
            onClick={handleNext}
            disabled={!password}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Vérifier le mot de passe
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
          <label className="block text-sm text-gray-700">
            Code OTP reçu :
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              placeholder="6 chiffres"
            />
          </label>
          <button
            onClick={handleNext}
            disabled={otp.length !== 6}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Vérifier le code OTP
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 text-gray-700">
          <p className="font-medium">
            🔁 <strong>Confirmation finale :</strong>
          </p>
          <p>
            Vous êtes sur le point de <strong>{operationDetails.action}</strong>{" "}
            un montant de <strong>{operationDetails.montant}</strong>{" "}
            à <strong>{operationDetails.destinataire}</strong>.
          </p>
          <p>Veuillez confirmer que toutes les informations sont correctes.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirmer l'opération
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationSecurisee;
