import React from 'react';

// 📦 Composants dans components/
import TeaserHero from './TeaserHero';
import TeaserLandingPage from './TeaserLandingPage';
import TeaserServices from './TeaserServices';
import TeaserAvantages from './TeaserAvantages';
import TeaserCartesPrecommande from './TeaserCartesPrecommande';
import TeaserPDGMessage from './TeaserPDGMessage';
import TeaserCommentaires from './TeaserCommentaires';
import TeaserFAQ from './TeaserFAQ';
import TeaserPartenairesInvestisseurs from './TeaserPartenairesInvestisseurs';
import TeaserFooterLanding from './TeaserFooterLanding';

const LandingTeaserPage = () => {
  return (
    <div className="font-sans bg-white text-gray-900">
      {/* ✅ Bannière “site en préparation” */}
      <div className="bg-yellow-300 text-center py-2 font-semibold">
        🚧 Le site complet Gabkut Pay est en préparation…
      </div>

      {/* 🎬 Sections teaser */}
      <TeaserHero />
      <TeaserLandingPage />
      <TeaserServices />
      <TeaserAvantages />
      <TeaserCartesPrecommande />
      <TeaserPDGMessage />
      <TeaserCommentaires />
      <TeaserFAQ />
      <TeaserPartenairesInvestisseurs />
      <TeaserFooterLanding />
    </div>
  );
};

export default LandingTeaserPage;
