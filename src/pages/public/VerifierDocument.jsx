New-Item -Name "VerifierDocument.jsx" -ItemType File

import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifierDocument = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`/api/documents/verifier/${id}`);
        setDocument(res.data);
      } catch (err) {
        setErreur('❌ Ce document est introuvable ou invalide.');
      }
    };
    fetchDocument();
  }, [id]);

  // 📌 Présentation visible par tous en mode public (sans ID)
  if (!id) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold text-blue-800 mb-4">🔒 Vérification officielle des documents Gabkut Pay</h1>
        <p className="text-gray-700 text-justify leading-relaxed">
          Cette page est exclusivement réservée à la <strong>vérification des documents officiels émis par Gabkut Pay</strong>.
          Chaque document contient un <strong>QR Code unique</strong> permettant un accès sécurisé à sa version authentique. 
        </p>
        <p className="text-gray-700 text-justify mt-4">
          Si vous possédez un document contenant un QR Code Gabkut Pay, scannez-le ou cliquez sur le lien intégré pour vérifier sa validité.
        </p>
        <ul className="list-disc mt-4 pl-5 text-gray-600">
          <li>📌 Un document non reconnu ici n’a pas été généré par Gabkut Pay.</li>
          <li>🚫 Toute tentative de falsification est illégale et expose à des poursuites judiciaires.</li>
          <li>📄 Chaque document est strictement individuel et lié à son QR Code exclusif.</li>
          <li>🔒 Aucun document ne peut être vérifié sans lien ou QR authentique.</li>
        </ul>
        <p className="mt-4 text-sm italic text-gray-500">
          Ce système reflète notre engagement en matière de <strong>sécurité, transparence et intégrité numérique</strong>.
        </p>
      </div>
    );
  }

  // 📄 Affichage du document vérifié avec ID fourni
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold text-green-700 mb-4">✅ Document certifié par Gabkut Pay</h2>
      {erreur ? (
        <div className="bg-red-100 text-red-700 p-3 rounded">{erreur}</div>
      ) : document ? (
        <div>
          <embed
            src={`/pdfs/GKP_${id}.pdf`}
            type="application/pdf"
            width="100%"
            height="600px"
            className="rounded border"
          />
          <div className="mt-4 text-sm text-gray-600">
            Ce document a été généré et signé numériquement par Gabkut Pay. Référence : <strong>{id}</strong>.
            <br />
            <a
              href={`/pdfs/GKP_${id}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              📄 Télécharger à nouveau ce document
            </a>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 italic">Chargement du document en cours…</p>
      )}
    </div>
  );
};

export default VerifierDocument;
