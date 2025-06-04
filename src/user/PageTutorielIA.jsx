import React from "react";
import TutorielIAUser from "./TutorielIAUser";
import HistoriqueTutorielIA from "./HistoriqueTutorielIA";

const PageTutorielIA = () => {
  // Récupération sécurisée des données utilisateur depuis localStorage
  // Vous pouvez envisager d'utiliser un contexte ou un système d'authentification plus robuste
  const userId = React.useMemo(() => {
    const id = localStorage.getItem("userId");
    return id && id.length === 24 ? id : "1234567890abcdef12345678"; // Exemple d’ID MongoDB valide par défaut
  }, []);

  const langue = React.useMemo(() => {
    const lang = localStorage.getItem("langue");
    // Liste des langues supportées
    const languesSupportees = ["fr", "en", "ar", "sw", "ln", "kg", "tsh"];
    return languesSupportees.includes(lang) ? lang : "fr";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        🎓 Apprendre à utiliser Gabkut Pay
      </h1>
      <TutorielIAUser userId={userId} langue={langue} />
      <HistoriqueTutorielIA userId={userId} />
    </div>
  );
};

export default PageTutorielIA;
