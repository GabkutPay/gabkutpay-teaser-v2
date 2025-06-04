import React from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import TypeComptePage from "../pages/TypeComptePage";
import FormulaireInscription from "../pages/FormulaireInscription";

const AppPublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/type-compte" element={<TypeComptePage />} />
      {/* 🔁 Nouvelle route dynamique : /inscription/:typeCompte */}
      <Route
        path="/inscription/:typeCompte"
        element={
          <RouteWrapper />
        }
      />
    </Routes>
  );
};

// ✅ RouteWrapper pour transmettre le paramètre à FormulaireInscription
const RouteWrapper = () => {
  const { typeCompte } = useParams();
  return <FormulaireInscription typeComptePrérempli={typeCompte} />;
};

export default AppPublicRoutes;
