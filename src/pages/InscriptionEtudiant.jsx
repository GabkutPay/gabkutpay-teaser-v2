import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InscriptionEtudiant = () => {
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
        typeCompte: "étudiant"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-700 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl text-gray-800">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-sky-900">
          Inscription Étudiant – Gabkut Pay
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Nom complet</label>
            <input
              type="text"
              {...register("nom", { required: "Ce champ est requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. Kambale Jules"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email universitaire</label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="exemple@univ.edu"
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
            <label className="block mb-1 font-semibold">Nom de l’université ou institut</label>
            <input
              type="text"
              {...register("universite", { required: "Nom requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Université de Kinshasa, ISTA, etc."
            />
            {errors.universite && <p className="text-red-600 text-sm">{errors.universite.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Programme d’études</label>
            <input
              type="text"
              {...register("programme", { required: "Champ requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Informatique, Médecine, Sciences Politiques..."
            />
            {errors.programme && <p className="text-red-600 text-sm">{errors.programme.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Niveau d’étude actuel</label>
            <select
              {...register("niveau", { required: "Sélection requise" })}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="L1">Licence 1 / Bac+1</option>
              <option value="L2">Licence 2 / Bac+2</option>
              <option value="L3">Licence 3 / Bac+3</option>
              <option value="M1">Master 1 / Bac+4</option>
              <option value="M2">Master 2 / Bac+5</option>
              <option value="PhD">Doctorat / Recherche</option>
            </select>
            {errors.niveau && <p className="text-red-600 text-sm">{errors.niveau.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-800 text-white py-3 rounded-lg text-lg font-bold hover:bg-sky-950 transition"
          >
            {loading ? "Inscription..." : "Créer mon compte étudiant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionEtudiant;
