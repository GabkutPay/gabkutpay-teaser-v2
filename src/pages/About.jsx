import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">🧾 À propos de Gabkut Pay</h1>
        <p className="text-gray-700 mb-4">
          Gabkut Pay est une solution de portefeuille électronique conçue pour les utilisateurs africains, avec une portée internationale.
        </p>
        <p className="text-gray-700 mb-4">
          Nous offrons des services financiers rapides, accessibles et sécurisés à travers :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          <li>💸 Envoi et réception d'argent local et international</li>
          <li>💳 Cartes Visa virtuelles et paiements en ligne</li>
          <li>📄 Relevés PDF, KYC, change de devise, QR code</li>
          <li>🛠️ Gestion manuelle ou API automatique pour les professionnels</li>
        </ul>
        <p className="mt-6 text-sm text-gray-500">
          Gabkut Pay est une plateforme développée par Gaël Kutalakudima +243822783500, +18195740506 🇨🇩 — portée par la vision d’une finance simplifiée et fiable et accessible à tous, pour ne plus se déplacer inutilement.
        </p>
      </div>
    </div>
  );
}
