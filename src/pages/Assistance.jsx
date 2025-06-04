import React from 'react';

export default function Assistance() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">💬 Assistance Gabkut Pay</h1>
        <p className="text-gray-700 mb-6">
          Notre équipe est disponible pour répondre à vos préoccupations. Choisissez le canal qui vous convient :
        </p>

        <ul className="space-y-4 text-gray-800">
          <li>📲 <strong>WhatsApp :</strong> <a href="https://wa.me/gabkutagencylmk" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">wa.me/gabkutagencylmk</a></li>
          <li>📧 <strong>Email :</strong> <a href="mailto:contact@gabkutpay.com" className="text-blue-800 underline">contact@gabkutpay.com</a></li>
          <li>💬 <strong>Chat intégré :</strong> Disponible bientôt dans l’espace utilisateur.</li>
        </ul>

        <p className="mt-6 text-sm text-gray-500">
          Temps de réponse moyen : 1 à 6 heures. Merci pour votre confiance.
        </p>
      </div>
    </div>
  );
}
