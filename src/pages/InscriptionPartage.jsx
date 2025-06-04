import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InscriptionPartage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      membres: [{ email: "", niveauAcces: "lecture" }]
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "membres" });
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErreur("");

    try {
      const res = await axios.post("/api/auth/register", {
        ...data,
        typeCompte: "partagé",
        comptePartage: {
          estPartage: true,
          membres: data.membres
        }
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
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-900">
          Créer un Compte Partagé – Gabkut Pay
        </h2>

        {erreur && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{erreur}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block font-semibold">Nom du compte partagé</label>
            <input
              {...register("nom", { required: "Nom requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ex. Famille KABAMBA ou Groupe Épargne"
            />
            {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Email du créateur du compte</label>
            <input
              type="email"
              {...register("email", { required: "Email requis" })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Votre email personnel"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-semibold">Mot de passe</label>
            <input
              type="password"
              {...register("motDePasse", { required: "Mot de passe requis", minLength: 6 })}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Créer un mot de passe"
            />
            {errors.motDePasse && <p className="text-red-600 text-sm">{errors.motDePasse.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-2">Ajouter des membres</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center mb-3">
                <input
                  {...register(`membres.${index}.email`, { required: "Email requis" })}
                  className="w-2/3 p-2 border border-gray-300 rounded"
                  placeholder="Email membre"
                />
                <select
                  {...register(`membres.${index}.niveauAcces`)}
                  className="w-1/3 p-2 border border-gray-300 rounded"
                >
                  <option value="lecture">Lecture</option>
                  <option value="écriture">Écriture</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ email: "", niveauAcces: "lecture" })}
              className="text-sm text-blue-700 hover:underline"
            >
              + Ajouter un membre
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg text-lg font-bold hover:bg-sky-900 transition"
          >
            {loading ? "Création en cours..." : "Créer ce compte partagé"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionPartage;
