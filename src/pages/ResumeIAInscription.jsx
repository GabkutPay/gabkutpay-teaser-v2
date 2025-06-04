import React from "react";
import AudioPlayerIA from "../components/AudioPlayerIA";

const ResumeIAInscription = ({ donnees, langue = "fr", onCorriger, onValider }) => {
  if (!donnees) return null;

  const { nom, prenom, email, telephone, pays, motDePasse } = donnees;

  // Construction du texte IA
  const resumeTexte = [
    "Résumé de ton inscription :",
    `Nom : ${nom || "non renseigné"}`,
    `Prénom : ${prenom || "non renseigné"}`,
    `Email : ${email || "non renseigné"}`,
    `Téléphone : ${telephone || "non renseigné"}`,
    `Pays : ${pays || "non précisé"}`,
    `Mot de passe : ${motDePasse ? "défini" : "non défini"}`,
  ].join(". ");

  const resumeAffichage = resumeTexte.replace(/\. /g, ".\n");

  // Fonction d’export PDF
  const exporterPDF = async () => {
    try {
      const response = await fetch("/api/export/resume-ia-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
      });

      if (!response.ok) throw new Error("Erreur téléchargement");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-inscription-${Date.now()}.pdf`;
      document.body.appendChild(a); // Nécessaire pour Firefox
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erreur lors de la génération du PDF.");
      console.error(err);
    }
  };

  return (
    <section
      className="p-4 bg-white rounded shadow space-y-4"
      aria-label="Résumé de l'inscription"
    >
      <h2 className="text-xl font-bold text-blue-800">🤖 Résumé IA</h2>

      {/* 📋 Résumé affiché */}
      <pre className="bg-gray-100 p-3 rounded border text-sm leading-relaxed whitespace-pre-wrap">
        {resumeAffichage}
      </pre>

      {/* 🔊 Lecture vocale */}
      <AudioPlayerIA texte={resumeTexte} langue={langue} />

      {/* ✅ Actions */}
      <div className="flex gap-4 mt-4 flex-wrap">
        <button
          onClick={onCorriger}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Corriger les informations"
        >
          🔁 Corriger
        </button>

        <button
          onClick={onValider}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Valider les informations"
        >
          ✅ Valider
        </button>

        <button
          onClick={exporterPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Exporter le résumé en PDF"
        >
          📄 Exporter en PDF
        </button>
      </div>
    </section>
  );
};

export default ResumeIAInscription;
