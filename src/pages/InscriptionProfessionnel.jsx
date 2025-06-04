import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InscriptionProfessionnel = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErreur("");

    try {
      const res = await axios.post("/api/auth/register", {
        ...data,
        typeCompte: "professionnel"
      });

      if (res.data.success) {
        navigate("/verification-otp");
      } else {
        setErreur(res.data.message || "Une erreur s’est produite.");
      }
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Création de Compte Professionnel
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nom du responsable</label>
            <input
              type="text"
              {...register("nom", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Jean Mulumba"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email professionnel</label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="contact@entreprise.com"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              {...register("motDePasse", { required: "Mot de passe requis", minLength: { value: 6, message: "6 caractères min." } })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="********"
            />
            {errors.motDePasse && <p className="text-red-600 text-sm">{errors.motDePasse.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nom de l’entreprise / organisation</label>
            <input
              type="text"
              {...register("proName", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Exemple SARL"
            />
            {errors.proName && <p className="text-red-600 text-sm">{errors.proName.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Secteur d’activité</label>
            <select
              {...register("secteur", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="">-- Choisir --</option>
              <option value="Finance">Finance</option>
              <option value="Éducation">Éducation</option>
              <option value="Santé">Santé</option>
              <option value="Commerce">Commerce</option>
              <option value="Transport">Transport</option>
              <option value="Informatique">Informatique</option>
            </select>
            {errors.secteur && <p className="text-red-600 text-sm">{errors.secteur.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Pays d’activité</label>
            <input
              type="text"
              {...register("pays", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Congo RDC"
            />
            {errors.pays && <p className="text-red-600 text-sm">{errors.pays.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-800 transition"
          >
            {loading ? "Enregistrement..." : "Créer le compte professionnel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionProfessionnel;
