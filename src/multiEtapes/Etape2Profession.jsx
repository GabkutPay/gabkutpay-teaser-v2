import React from "react";

const Etape2Profession = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showInfosEmployeur = () => {
    return (
      formData.profession !== "Sans emploi" &&
      formData.profession !== "" &&
      formData.profession !== undefined
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-blue-800 text-center">💼 Étape 2 : Profession</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Profession</label>
        <select
          name="profession"
          value={formData.profession || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Sélectionnez votre profession --</option>
          <option value="Sans emploi">Sans emploi</option>
          <option value="Employé public">Employé du secteur public</option>
          <option value="Employé privé">Employé du secteur privé</option>
          <option value="Indépendant">Travailleur indépendant</option>
        </select>
      </div>

      {showInfosEmployeur() && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom de l’employeur</label>
            <input
              type="text"
              name="nomEmployeur"
              value={formData.nomEmployeur || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse de l’employeur</label>
            <input
              type="text"
              name="adresseEmployeur"
              value={formData.adresseEmployeur || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Poste occupé</label>
            <input
              type="text"
              name="poste"
              value={formData.poste || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ancienneté (en années)</label>
            <input
              type="number"
              name="anciennete"
              value={formData.anciennete || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        </>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Retour
        </button>
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

export default Etape2Profession;
