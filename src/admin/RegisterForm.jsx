import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    accountType: "",
    ecole: "",
    entreprise: "",
    numero_rccm: "",
    co_users: "",
    pays_diaspora: "",
  });

  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const accountTypes = [
    { id: 1, nom: "Individuel" },
    { id: 2, nom: "Professionnel" },
    { id: 3, nom: "Institutionnel" },
    { id: 4, nom: "VIP" },
    { id: 5, nom: "Diaspora" },
    { id: 6, nom: "Élève" },
    { id: 7, nom: "Étudiant" },
    { id: 8, nom: "Avenir (enfant)" },
    { id: 9, nom: "Partagé" },
    { id: 10, nom: "Voyage" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateForm = () => {
    if (!formData.nom.trim()) return "Le nom est obligatoire.";
    if (!formData.prenom.trim()) return "Le prénom est obligatoire.";
    if (!formData.email.trim()) return "L'email est obligatoire.";
    if (!formData.password.trim()) return "Le mot de passe est obligatoire.";
    if (!formData.accountType) return "Le type de compte est obligatoire.";
    // Ajoutez d’autres validations spécifiques si besoin
    return null;
  };

  const handlePreview = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setShowSummary(true);
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await axios.post("/api/auth/register", formData);
      setSuccess("✅ Compte créé avec succès !");
      setShowSummary(false);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        accountType: "",
        ecole: "",
        entreprise: "",
        numero_rccm: "",
        co_users: "",
        pays_diaspora: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  const cancelPreview = () => {
    setShowSummary(false);
    setError(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-10">
      {!showSummary ? (
        <form onSubmit={handlePreview} noValidate>
          <h2 className="text-xl font-bold mb-6 text-center">Créer un compte Gabkut Pay</h2>

          {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
          {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}

          {/* Champs du formulaire */}
          <div className="mb-4">
            <label htmlFor="nom" className="block mb-1 font-medium">
              Nom <span className="text-red-600">*</span>
            </label>
            <input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prenom" className="block mb-1 font-medium">
              Prénom <span className="text-red-600">*</span>
            </label>
            <input
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Mot de passe <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accountType" className="block mb-1 font-medium">
              Type de compte <span className="text-red-600">*</span>
            </label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
              disabled={loading}
            >
              <option value="">-- Choisir un type de compte --</option>
              {accountTypes.map((type) => (
                <option key={type.id} value={type.nom}>
                  {type.nom}
                </option>
              ))}
            </select>
          </div>

          {formData.accountType === "Élève" && (
            <div className="mb-4">
              <label htmlFor="ecole" className="block mb-1">
                Nom de l’école
              </label>
              <input
                id="ecole"
                name="ecole"
                value={formData.ecole}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                disabled={loading}
              />
            </div>
          )}

          {formData.accountType === "Professionnel" && (
            <>
              <div className="mb-4">
                <label htmlFor="entreprise" className="block mb-1">
                  Entreprise
                </label>
                <input
                  id="entreprise"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="numero_rccm" className="block mb-1">
                  N° RCCM / IFU
                </label>
                <input
                  id="numero_rccm"
                  name="numero_rccm"
                  value={formData.numero_rccm}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={loading}
                />
              </div>
            </>
          )}

          {formData.accountType === "Diaspora" && (
            <div className="mb-4">
              <label htmlFor="pays_diaspora" className="block mb-1">
                Pays de résidence
              </label>
              <input
                id="pays_diaspora"
                name="pays_diaspora"
                value={formData.pays_diaspora}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                disabled={loading}
              />
            </div>
          )}

          {formData.accountType === "Partagé" && (
            <div className="mb-4">
              <label htmlFor="co_users" className="block mb-1">
                Nombre de co-utilisateurs
              </label>
              <input
                id="co_users"
                type="number"
                name="co_users"
                value={formData.co_users}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                disabled={loading}
                min={1}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Prévisualiser mon inscription"}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">🧾 Résumé de l'inscription</h3>

          <ul className="mb-6 text-sm space-y-1">
            <li>
              <strong>Nom :</strong> {formData.nom}
            </li>
            <li>
              <strong>Prénom :</strong> {formData.prenom}
            </li>
            <li>
              <strong>Email :</strong> {formData.email}
            </li>
            <li>
              <strong>Type de compte :</strong> {formData.accountType}
            </li>
            {formData.ecole && (
              <li>
                <strong>École :</strong> {formData.ecole}
              </li>
            )}
            {formData.entreprise && (
              <li>
                <strong>Entreprise :</strong> {formData.entreprise}
              </li>
            )}
            {formData.numero_rccm && (
              <li>
                <strong>N° RCCM / IFU :</strong> {formData.numero_rccm}
              </li>
            )}
            {formData.pays_diaspora && (
              <li>
                <strong>Pays :</strong> {formData.pays_diaspora}
              </li>
            )}
            {formData.co_users && (
              <li>
                <strong>Co-utilisateurs :</strong> {formData.co_users}
              </li>
            )}
          </ul>

          {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
          {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Création en cours..." : "✅ Confirmer"}
            </button>
            <button
              onClick={cancelPreview}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              disabled={loading}
            >
              🔄 Modifier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
