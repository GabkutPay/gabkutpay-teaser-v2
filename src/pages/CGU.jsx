import React from "react";

const CGU = () => (
  <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto text-gray-800 space-y-6">
    <h1 className="text-3xl font-extrabold text-blue-800 mb-6">📝 Conditions Générales d’Utilisation (CGU)</h1>

    <p>
      Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet de définir les modalités d’accès et
      d’utilisation des services proposés sur la plateforme Gabkut Pay.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 1 — Acceptation des conditions</h2>
    <p>
      En accédant à Gabkut Pay, l’utilisateur accepte expressément et sans réserve l’intégralité des présentes CGU. En
      cas de refus, l’utilisation du service est interdite.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 2 — Inscription et sécurité</h2>
    <p>
      L’utilisateur doit fournir des informations exactes, personnelles et vérifiables (identité, copie de sa oièce d'identité, fournir les empreintes digitales, la photo selfie,...). Tout compte est individuel,
      protégé par mot de passe et soumis à une double authentification par OTP. Toute tentative de fraude entraîne
      l’exclusion immédiate.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 3 — Services proposés</h2>
    <p>
      Gabkut Pay permet l’envoi et la réception d’argent, les conversions de devises, la création de cartes virtuelles,
      les paiements partenaires, les recharges et retraits, paiements factures et d’autres opérations numériques internes ou externes comme paiements des agents, les diasporas,..
    </p>

    <h2 className="text-xl font-bold mt-6">Article 4 — Engagements de l'utilisateur</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>Ne pas utiliser le service à des fins illicites</li>
      <li>Ne pas usurper d’identité ou détourner les moyens techniques</li>
      <li>Respecter la confidentialité de ses accès</li>
      <li>Respecter les règles de sécurité définies dans la Politique de Confidentialité</li>
    </ul>

    <h2 className="text-xl font-bold mt-6">Article 5 — Responsabilité</h2>
    <p>
      Gabkut Pay n’est pas responsable des pertes liées à un usage imprudent ou frauduleux du compte utilisateur. Chaque
      opération est validée en 3 étapes (case d’acceptation, mot de passe, OTP).
    </p>

    <h2 className="text-xl font-bold mt-6">Article 6 — Suspension / résiliation</h2>
    <p>
      En cas de non-respect des présentes CGU, de comportement suspect ou d’activité frauduleuse, Gabkut Pay se réserve
      le droit de suspendre ou clôturer le compte, avec ou sans notification préalable.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 7 — Modification des conditions</h2>
    <p>
      Gabkut Pay se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront notifiés et
      devront les accepter à nouveau pour continuer à utiliser les services.
    </p>
  </div>
);

export default CGU;
