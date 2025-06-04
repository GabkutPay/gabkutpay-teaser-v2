import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InscriptionVIP = () => {
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
        typeCompte: "VIP",
        isVip: true
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl text-gray-800">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-900">
          Gabkut VIP – Inscription exclusive
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Nom complet</label>
            <input
              type="text"
              {...register("nom", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. Gaël Kutalakudima"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Adresse email</label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="vip@exemple.com"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              {...register("motDePasse", {
                required: "Mot de passe requis",
                minLength: { value: 6, message: "6 caractères min." }
              })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="********"
            />
            {errors.motDePasse && <p className="text-red-600 text-sm">{errors.motDePasse.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Pays de résidence</label>
            <input
              type="text"
              {...register("pays", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. RDC, France, Belgique..."
            />
            {errors.pays && <p className="text-red-600 text-sm">{errors.pays.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Profession ou activité principale</label>
            <input
              type="text"
              {...register("proCategory", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. Entrepreneur, Ambassadeur, PDG, etc."
            />
            {errors.proCategory && <p className="text-red-600 text-sm">{errors.proCategory.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Pourquoi voulez-vous devenir VIP ?</label>
            <textarea
              {...register("motivation", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              rows="4"
              placeholder="Expliquez brièvement vos attentes..."
            ></textarea>
            {errors.motivation && <p className="text-red-600 text-sm">{errors.motivation.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-700 text-white py-3 rounded-lg text-lg font-bold hover:bg-indigo-900 transition"
          >
            {loading ? "Inscription en cours..." : "Demander un compte VIP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionVIP;
