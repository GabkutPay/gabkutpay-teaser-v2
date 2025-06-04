import React, { useState } from "react";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const PartenaireForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    entreprise: "",
    email: "",
    secteur: "",
    message: "",
    hcaptchaToken: "",
  });

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleVerify = (token) =>
    setFormData((prev) => ({ ...prev, hcaptchaToken: token }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hcaptchaToken) {
      setError("Veuillez compléter le hCaptcha.");
      return;
    }

    try {
      await axios.post("/api/public/partenaire", formData);
      setSent(true);
      setError("");
    } catch (err) {
      setError("Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Devenir Partenaire</h2>
      {sent ? (
        <div className="text-green-600">Votre demande a été envoyée.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nom"
            placeholder="Nom complet"
            className="w-full p-2 border rounded"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <input
            name="entreprise"
            placeholder="Entreprise"
            className="w-full p-2 border rounded"
            value={formData.entreprise}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="secteur"
            placeholder="Secteur d'activité"
            className="w-full p-2 border rounded"
            value={formData.secteur}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Pourquoi voulez-vous devenir partenaire ?"
            className="w-full p-2 border rounded"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <HCaptcha
            sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
            onVerify={handleVerify}
          />
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Soumettre
          </button>
        </form>
      )}
    </div>
  );
};

export default PartenaireForm;
