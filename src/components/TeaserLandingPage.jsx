import React from 'react';
import TeaserHero from '../components/TeaserHero';
import TeaserVision from '../components/TeaserVision';
import TeaserServices from '../components/TeaserServices';
import TeaserComptesGabkut from '../components/TeaserComptesGabkut';
import TeaserCartesPrecommande from '../components/TeaserCartesPrecommande';
import TeaserPartenairesInvestisseurs from '../components/TeaserPartenairesInvestisseurs';
import PDGMessage from '../components/PDGMessage';
import TeaserFAQ from '../components/TeaserFAQ';
import TeaserCommentaires from '../components/TeaserCommentaires';

const TeaserLandingPage = () => {
  return (
    <main className="bg-white text-gray-900">
      <TeaserHero />                         {/* 🎬 Animation Intro */}
      <TeaserVision />                       {/* 🌍 Vision stratégique */}
      <TeaserServices />                     {/* 🛠️ Services disponibles */}
      <TeaserComptesGabkut />               {/* 🧾 Types de comptes */}
      <TeaserCartesPrecommande />           {/* 💳 Cartes virtuelles IA */}
      <TeaserPartenairesInvestisseurs />    {/* 🤝 Appel aux partenaires */}
      <PDGMessage />                         {/* 📣 Message du PDG multilingue */}
      <TeaserFAQ />                          {/* ❓ Questions fréquentes */}
      <TeaserCommentaires />                 {/* 💬 Commentaires et suggestions */}
    </main>
  );
};

export default TeaserLandingPage;
