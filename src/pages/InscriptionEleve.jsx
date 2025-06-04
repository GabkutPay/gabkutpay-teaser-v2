import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InscriptionEleve = () => {
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
        typeCompte: "élève"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-sky-700 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-xl text-gray-800">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-900">
          Inscription Élève – Gabkut Pay
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-semibold">Nom complet</label>
            <input
              {...register("nom", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Nom de l'élève"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Âge de l’élève</label>
            <input
              type="number"
              {...register("age", { required: "Âge requis", min: 5 })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. 12"
            />
            {errors.age && <p className="text-red-600 text-sm">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Classe actuelle</label>
            <input
              {...register("classe", { required: "Classe requise" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. 6ème année primaire"
            />
            {errors.classe && <p className="text-red-600 text-sm">{errors.classe.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Établissement scolaire</label>
            <input
              {...register("etablissement", { required: "Nom requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Nom de l’école"
            />
            {errors.etablissement && <p className="text-red-600 text-sm">{errors.etablissement.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Nom du parent ou tuteur</label>
            <input
              {...register("nomTuteur", { required: "Champ obligatoire" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Nom complet du parent"
            />
            {errors.nomTuteur && <p className="text-red-600 text-sm">{errors.nomTuteur.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Téléphone du parent</label>
            <input
              type="tel"
              {...register("telTuteur", {
                required: "Téléphone requis",
                minLength: 8
              })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="+243..."
            />
            {errors.telTuteur && <p className="text-red-600 text-sm">{errors.telTuteur.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-800 text-white py-3 rounded-lg text-lg font-bold hover:bg-sky-950 transition"
          >
            {loading ? "Création en cours..." : "Créer mon compte élève"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionEleve;
