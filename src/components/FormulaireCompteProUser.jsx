import React, { useState } from "react";
import axios from "axios";

const FormulaireCompteProUser = ({ userId }) => {
  const [form, setForm] = useState({
    nomEtablissement: "",
    identifiantPro: "",
    typeEtablissement: "école",
    pays: "RDC",
    ville: "",
    adresse: "",
    telephone: "",
    emailPro: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation simple côté client (vous pouvez renforcer avec une lib comme yup)
    if (!form.nomEtablissement.trim() || !form.identifiantPro.trim()) {
      setMessage("❗ Veuillez remplir les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/pro/creer", { userId, ...form });
      setMessage("✅ Compte professionnel soumis avec succès. Il sera validé après vérification.");
      setForm({
        nomEtablissement: "",
        identifiantPro: "",
        typeEtablissement: "école",
        pays: "RDC",
        ville: "",
        adresse: "",
        telephone: "",
        emailPro: ""
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`❌ Erreur : ${err.response.data.message}`);
      } else {
        setMessage("❌ Une erreur est survenue. Veuillez vérifier les champs ou réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2">📥 Ouvrir un Compte Professionnel Gabkut</h2>
      <p className="text-sm mb-6">
        Ce formulaire est destiné aux écoles, commerçants, ONG et institutions souhaitant utiliser Gabkut Pay de manière professionnelle.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white" noValidate>
        <div>
          <label htmlFor="nomEtablissement" className="block font-semibold">Nom de l’établissement <span className="text-red-500">*</span></label>
          <input
            id="nomEtablissement"
            name="nomEtablissement"
            value={form.nomEtablissement}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded text-black"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="identifiantPro" className="block font-semibold">Identifiant Pro (RCCM ou unique) <span className="text-red-500">*</span></label>
          <input
            id="identifiantPro"
            name="identifiantPro"
            value={form.identifiantPro}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 rounded text-black"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="typeEtablissement" className="block font-semibold">Type d’établissement <span className="text-red-500">*</span></label>
          <select
            id="typeEtablissement"
            name="typeEtablissement"
            value={form.typeEtablissement}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded text-black"
            aria-required="true"
          >
            <option value="école">École</option>
            <option value="commerçant">Commerçant</option>
            <option value="institution">Institution</option>
            <option value="ONG">ONG</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="pays" className="block font-semibold">Pays</label>
            <input
              id="pays"
              name="pays"
              value={form.pays}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded text-black"
            />
          </div>
          <div>
            <label htmlFor="ville" className="block font-semibold">Ville</label>
            <input
              id="ville"
              name="ville"
              value={form.ville}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded text-black"
            />
          </div>
        </div>

        <div>
          <label htmlFor="adresse" className="block font-semibold">Adresse complète</label>
          <input
            id="adresse"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded text-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="telephone" className="block font-semibold">Téléphone</label>
            <input
              id="telephone"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded text-black"
              type="tel"
              placeholder="+243 123 456 789"
            />
          </div>
          <div>
            <label htmlFor="emailPro" className="block font-semibold">Email professionnel</label>
            <input
              id="emailPro"
              name="emailPro"
              value={form.emailPro}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded text-black"
              type="email"
              placeholder="contact@exemple.com"
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-white text-blue-900 font-bold px-4 py-2 rounded mt-4 hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Envoi en cours..." : "Soumettre ma demande"}
        </button>

        {message && (
          <div
            className={`mt-4 text-sm p-3 rounded shadow ${
              message.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormulaireCompteProUser;
