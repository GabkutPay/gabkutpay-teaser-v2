import React from "react";

const Etape1Titulaire = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-blue-800 text-center">🧍 Étape 1 : Informations du titulaire</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          type="text"
          name="prenom"
          value={formData.prenom || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="ex. Jean-Baptiste"
          required
        />
        <p className="text-xs text-gray-500">
          Si vous avez un post-nom, combinez-le avec le prénom. Sinon, indiquez uniquement votre prénom.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          name="nom"
          value={formData.nom || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex gap-2">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Jour</label>
          <input
            type="text"
            name="jourNaissance"
            maxLength={2}
            value={formData.jourNaissance || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="jj"
            required
          />
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Mois</label>
          <input
            type="text"
            name="moisNaissance"
            maxLength={2}
            value={formData.moisNaissance || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="mm"
            required
          />
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Année</label>
          <input
            type="text"
            name="anneeNaissance"
            maxLength={4}
            value={formData.anneeNaissance || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="aaaa"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu de naissance</label>
        <input
          type="text"
          name="lieuNaissance"
          value={formData.lieuNaissance || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro de téléphone (Mobile Money)</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* ✅ Adresse complète structurée */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Adresse complète</label>

        <input
          type="text"
          name="avenue"
          placeholder="Avenue / Village"
          value={formData.avenue || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="numero"
          placeholder="Numéro"
          value={formData.numero || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="quartier"
          placeholder="Quartier / Secteur"
          value={formData.quartier || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="commune"
          placeholder="Commune / Territoire"
          value={formData.commune || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="ville"
          placeholder="Ville (ou ville la plus proche si village)"
          value={formData.ville || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={formData.province || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="pays"
          placeholder="Pays"
          value={formData.pays || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Etape1Titulaire;
