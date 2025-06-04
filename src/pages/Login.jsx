import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirigerSelonType = (typeCompte) => {
    switch (typeCompte) {
      case "standard":
        return "/dashboard";
      case "professionnel":
        return "/dashboard-pro";
      case "institutionnel":
        return "/dashboard-institution";
      case "VIP":
        return "/dashboard-vip";
      case "diaspora":
        return "/dashboard-diaspora";
      case "étudiant":
        return "/dashboard-etudiant";
      case "élève":
        return "/dashboard-eleve";
      case "avenir":
        return "/dashboard-avenir";
      case "partagé":
        return "/dashboard-partage";
      default:
        return "/dashboard";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErreur("");

    try {
      const res = await axios.post("/api/auth/login", { email, motDePasse });
      if (res.data.token && res.data.utilisateur) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("utilisateur", JSON.stringify(res.data.utilisateur));

        const chemin = redirigerSelonType(res.data.utilisateur.typeCompte);
        navigate(chemin);
      } else {
        setErreur("Connexion échouée.");
      }
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-800 to-blue-900 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-900">Connexion Gabkut Pay</h2>

        {erreur && <p className="text-red-600 mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded font-semibold hover:bg-sky-900 transition"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
