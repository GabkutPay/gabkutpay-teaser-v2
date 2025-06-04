import React, { useState } from "react";
import AlertMessage from "../components/AlertMessage";
import axios from "axios";

const audio = new Audio("/sounds/success.mp3");

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [alert, setAlert] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");

    try {
      const response = await axios.post("/api/public/contact", formData);
      if (response.data.success) {
        audio.play();
        setAlert("Message envoyé avec succès !");
        setFormData({ nom: "", email: "", message: "" });
      } else {
        setAlert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      setAlert("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">📬 Contactez-nous</h1>
        <p className="text-center text-gray-600 mb-8">
          Une question, une suggestion ou besoin d’assistance ? Écrivez-nous via ce formulaire.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            required
          />
          <textarea
            name="message"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
            required
          />

          {alert && (
            <AlertMessage
              type={alert.includes("succès") ? "success" : "error"}
              message={alert}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 active:scale-95 text-white py-3 rounded-lg transition-all duration-300 shadow"
          >
            Envoyer le message
          </button>
        </form>

        {/* Coordonnées (facultatif) */}
        <div className="mt-10 text-center text-sm text-gray-500">
          Vous pouvez aussi nous écrire à :{" "}
          <span className="text-blue-700 font-medium">support@gabkutpay.com</span>
        </div>
      </section>
    </main>
  );
};
<div className="mt-10 text-center text-sm text-gray-600">
  <p className="mb-1">📞 Téléphones officiels Gabkut Pay :</p>
  <p className="font-medium text-blue-800">+1 819 574 0506</p>
  <p className="font-medium text-blue-800">+243 822 783 500</p>
  <p className="font-medium text-blue-800">+243 837 391 770</p>

  <p className="mt-4">📧 Email : <span className="text-blue-700 font-medium">support@gabkutpay.com</span></p>
</div>

export default Contact;
