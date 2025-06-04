import React, { useState } from "react";
import AlertMessage from "./AlertMessage";
import axios from "axios";

const audio = new Audio("/sounds/success.mp3");

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    suggestion: "",
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
      const response = await axios.post("/api/public/suggestion", formData);
      if (response.data.success) {
        audio.play();
        setMessage("Suggestion envoyée avec succès !");
        setFormData({ nom: "", email: "", suggestion: "" });
      } else {
        setMessage("Erreur lors de l’envoi. Veuillez réessayer.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Merci de réessayer plus tard.");
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
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
        required
      />
      <textarea
        name="suggestion"
        placeholder="Votre suggestion"
        value={formData.suggestion}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
        rows="4"
        required
      />
      {message && (
        <AlertMessage
          type={message.includes("succès") ? "success" : "error"}
          message={message}
        />
      )}
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded shadow hover:shadow-lg"
      >
        Envoyer
      </button>
    </form>
  );
};

export default SuggestionForm;
