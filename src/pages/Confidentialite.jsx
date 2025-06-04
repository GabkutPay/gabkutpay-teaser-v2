import React from "react";

const Confidentialite = () => (
  <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto text-gray-800 space-y-6">
    <h1 className="text-3xl font-extrabold text-blue-800 mb-6">🔐 Politique de Confidentialité</h1>

    <p>
      Cette Politique de Confidentialité explique comment Gabkut Pay collecte, utilise et protège les données
      personnelles des utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD) et aux normes
      internationales.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 1 — Données collectées</h2>
    <p>
      Gabkut Pay collecte uniquement les données strictement nécessaires à l'ouverture de compte, la vérification
      d'identité (KYC), la sécurisation des transactions et l’amélioration du service.
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Nom, prénom, e-mail, numéro de téléphone</li>
      <li>Adresse IP, identifiants techniques</li>
      <li>Historique des opérations et des connexions</li>
    </ul>

    <h2 className="text-xl font-bold mt-6">Article 2 — Finalité de traitement</h2>
    <p>Les données sont utilisées exclusivement pour :</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>La création et gestion de compte utilisateur</li>
      <li>La vérification des opérations (mot de passe, OTP)</li>
      <li>Les alertes de sécurité et détection de fraude</li>
      <li>Les obligations légales et fiscales</li>
    </ul>

    <h2 className="text-xl font-bold mt-6">Article 3 — Consentement</h2>
    <p>
      L’utilisateur est informé et donne son consentement lors de chaque opération critique via une case à cocher et un
      mot de passe, complétés d’un code OTP.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 4 — Conservation</h2>
    <p>
      Les données sont conservées de manière sécurisée pendant toute la durée d’activité du compte, puis supprimées
      selon les délais légaux. Certaines informations peuvent être conservées à des fins fiscales ou juridiques.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 5 — Accès, modification et suppression</h2>
    <p>
      Conformément au RGPD, l’utilisateur peut à tout moment demander l’accès, la correction ou la suppression de ses
      données, via une simple demande écrite à l’adresse : <strong>support@gabkutpay.com</strong>
    </p>

    <h2 className="text-xl font-bold mt-6">Article 6 — Sécurité</h2>
    <p>
      Toutes les données sont chiffrées, protégées par des pare-feux, des systèmes de double vérification, et ne sont
      accessibles qu’aux administrateurs autorisés.
    </p>

    <h2 className="text-xl font-bold mt-6">Article 7 — Cookies</h2>
    <p>
      Gabkut Pay utilise uniquement des cookies techniques nécessaires au bon fonctionnement du site. Aucun cookie à but
      publicitaire n’est utilisé.
    </p>
  </div>
);

export default Confidentialite;
