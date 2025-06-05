import React from "react";

// 📁 Imports depuis src/components/
import TeaserHero from "./components/TeaserHero";
import TeaserIntroGabkut from "./components/TeaserIntroGabkut";
import TeaserForm from "./components/TeaserForm";
import TeaserPDGMessage from "./components/TeaserPDGMessage";
import TeaserAvantages from "./components/TeaserAvantages";
import TeaserTypesComptes from "./components/TeaserTypesComptes";
import TeaserServices from "./components/TeaserServices";
import TeaserServicesGabkut from "./components/TeaserServicesGabkut";
import TeaserPartenairesLogos from "./components/TeaserPartenairesLogos";
import TeaserFAQ from "./components/TeaserFAQ";
import TeaserCommentaires from "./components/TeaserCommentaires";
import TeaserVision from "./components/TeaserVision";

// 📁 Imports depuis src/components/teaser/
import TeaserCallToAction from "./components/teaser/TeaserCallToAction";
import TeaserFooterLanding from "./components/teaser/TeaserFooterLanding";
import TeaserInscriptionRapide from "./components/teaser/TeaserInscriptionRapide";
import TeaserTemoignages from "./components/teaser/TeaserTemoignages";

function App() {
  return (
    <div className="App">
      <TeaserHero />
      <TeaserIntroGabkut />
      <TeaserForm />
      <TeaserPDGMessage />
      <TeaserAvantages />
      <TeaserTypesComptes />
      <TeaserServices />
      <TeaserServicesGabkut />
      <TeaserPartenairesLogos />
      <TeaserFAQ />
      <TeaserCommentaires />
      <TeaserVision />
      <TeaserCallToAction />
      <TeaserInscriptionRapide />
      <TeaserTemoignages />
      <TeaserFooterLanding />
    </div>
  );
}

export default App;
    
