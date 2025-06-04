import React, { useState } from "react";
import AlertMessage from "./AlertMessage";
import axios from "axios";

const audio = new Audio("/sounds/success.mp3");

const PartenaireForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/public/partenaire", formData);
      if (response.data.success) {
        audio.play();
        setMessage("Formulaire soumis avec succès !");
        setFormData({ nom: "", email: "", entreprise: "", message: "" });
      } else {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 transition-all duration-500 ease-in-out"
    >
      <input
        type="text"
        name="nom"
        placeholder="Votre nom"
        value={formData.nom}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        required
      />
      <input
        type="text"
        name="entreprise"
        placeholder="Nom de votre entreprise"
        value={formData.entreprise}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        rows="4"
      />
      {message && (
        <AlertMessage
          type={message.includes("succès") ? "success" : "error"}
          message={message}
        />
      )}
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded shadow hover:shadow-lg"
      >
        Envoyer
      </button>
    </form>
  );
};

export default PartenaireForm;
