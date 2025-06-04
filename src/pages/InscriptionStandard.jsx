import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InscriptionStandard = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setChargement(true);
    setErreur("");

    try {
      const res = await axios.post("/api/auth/register", {
        ...data,
        typeCompte: "standard"
      });

      if (res.data.success) {
        navigate("/verification-otp");
      } else {
        setErreur(res.data.message || "Une erreur s’est produite.");
      }
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur serveur.");
    }

    setChargement(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Création de Compte Standard
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nom complet</label>
            <input
              type="text"
              {...register("nom", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Jean Mbuta"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="exemple@domain.com"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              {...register("motDePasse", { required: "Ce champ est requis", minLength: { value: 6, message: "6 caractères min." } })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="********"
            />
            {errors.motDePasse && <p className="text-red-600 text-sm">{errors.motDePasse.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Pays</label>
            <input
              type="text"
              {...register("pays", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Congo RDC"
            />
            {errors.pays && <p className="text-red-600 text-sm">{errors.pays.message}</p>}
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-800 transition"
          >
            {chargement ? "Traitement..." : "Créer le compte"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionStandard;
