import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InscriptionAvenir = () => {
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
        typeCompte: "avenir"
      });

      if (res.data.success) {
        navigate("/verification-otp");
      } else {
        setErreur(res.data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-900">
          Créer un Compte Avenir – Gabkut Pay
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-semibold">Nom complet de l’enfant</label>
            <input
              {...register("nom", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Nom de l’enfant"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Âge de l’enfant</label>
            <input
              type="number"
              {...register("age", { required: "Âge requis", min: 1, max: 17 })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. 8"
            />
            {errors.age && <p className="text-red-600 text-sm">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Nom du parent ou tuteur</label>
            <input
              {...register("nomTuteur", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Nom complet du responsable"
            />
            {errors.nomTuteur && <p className="text-red-600 text-sm">{errors.nomTuteur.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Email du parent</label>
            <input
              type="email"
              {...register("emailTuteur", {
                required: "Email requis",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email invalide"
                }
              })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="email@exemple.com"
            />
            {errors.emailTuteur && <p className="text-red-600 text-sm">{errors.emailTuteur.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Téléphone du parent</label>
            <input
              type="tel"
              {...register("telTuteur", { required: "Téléphone requis", minLength: 8 })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="+243..."
            />
            {errors.telTuteur && <p className="text-red-600 text-sm">{errors.telTuteur.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg text-lg font-bold hover:bg-sky-900 transition"
          >
            {loading ? "Création en cours..." : "Créer un compte avenir"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionAvenir;
