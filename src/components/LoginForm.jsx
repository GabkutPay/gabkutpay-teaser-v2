import React, { useState, useEffect } from "react";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setFingerprint(result.visitorId);
      } catch (err) {
        console.error("Erreur lors de la récupération du fingerprint :", err);
        setError("Erreur : impossible de récupérer l’empreinte de l’appareil.");
      }
    };

    getFingerprint();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!email || !otp || !pin || !fingerprint) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      const res = await axios.post("/api/auth/verify-login", {
        email,
        otp,
        pin,
        fingerprint,
      });

      setMessage("✅ Bienvenue ! Connexion réussie.");
      // Redirection ou action après succès
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🔐 Connexion sécurisée</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            placeholder="Adresse e-mail"
            className="w-full border p-3 rounded focus:ring focus:ring-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Code OTP"
            className="w-full border p-3 rounded focus:ring focus:ring-blue-200"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Code PIN"
            className="w-full border p-3 rounded focus:ring focus:ring-blue-200"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || !fingerprint}
            className={`w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors duration-200 ${
              loading || !fingerprint ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Connexion..." : "Valider"}
          </button>
        </div>

        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
