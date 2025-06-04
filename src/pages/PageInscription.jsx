import React, { useState } from "react";
import ResumeIAInscription from "../visiteur/ResumeIAInscription";

const PageInscription = () => {
  const [etape, setEtape] = useState("formulaire");
  const [formulaire, setFormulaire] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    pays: "",
    motDePasse: "",
  });

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  // Validation simple avant de passer au résumé
  const validerFormulaire = () => {
    if (!formulaire.nom.trim() || !formulaire.prenom.trim() || !formulaire.email.trim() || !formulaire.motDePasse.trim()) {
      alert("Merci de remplir au minimum les champs Nom, Prénom, Email et Mot de passe.");
      return false;
    }
    // Vous pouvez ajouter ici une validation plus poussée (email, mot de passe, etc.)
    return true;
  };

  const envoyerFinalisation = () => {
    console.log("✅ Finalisation envoyée :", formulaire);
    // ➕ Ajoutez ici l’appel API d’enregistrement utilisateur
    alert("Inscription finalisée avec succès !");
    // Optionnel : réinitialiser formulaire ou rediriger
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validerFormulaire()) {
      setEtape("resume");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {etape === "formulaire" && (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            name="nom"
            placeholder="Nom *"
            value={formulaire.nom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom *"
            value={formulaire.prenom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formulaire.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            value={formulaire.telephone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="pays"
            placeholder="Pays"
            value={formulaire.pays}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="motDePasse"
            placeholder="Mot de passe *"
            value={formulaire.motDePasse}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Continuer
          </button>
        </form>
      )}

      {etape === "resume" && (
        <ResumeIAInscription
          donnees={formulaire}
          langue="fr"
          onCorriger={() => setEtape("formulaire")}
          onValider={envoyerFinalisation}
        />
      )}
    </div>
  );
};

export default PageInscription;
