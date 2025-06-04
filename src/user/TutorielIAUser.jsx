import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayerIA from "./AudioPlayerIA";

const TutorielIAUser = ({ userId, langue = "fr" }) => {
  const [tutorielId, setTutorielId] = useState(null);
  const [etape, setEtape] = useState(1);
  const [messageIA, setMessageIA] = useState("");
  const [blocage, setBlocage] = useState(false);
  const [iaPremium, setIaPremium] = useState(false);
  const [imageIA, setImageIA] = useState("");
  const [chargementImage, setChargementImage] = useState(false);
  const [erreurImage, setErreurImage] = useState(null);

  const etapesTextes = [
    "Bienvenue dans le tutoriel Gabkut Pay !",
    "Voici comment vérifier votre solde.",
    "Envoyez de l'argent à vos proches.",
    "Générez un relevé PDF filtré.",
    "Posez vos questions à l’IA.",
    "Merci d’avoir suivi ce tutoriel !",
  ];

  // Fonction pour récupérer l'image IA pour l'étape courante
  const fetchImageIA = async (id) => {
    try {
      setChargementImage(true);
      setErreurImage(null);
      const imageRes = await axios.get(`/api/user/ia/tutoriel/generate-image/${id}`);
      setImageIA(imageRes.data.imageIA);
    } catch (err) {
      console.error("Erreur chargement image IA :", err);
      setErreurImage("Impossible de charger l’image IA.");
      setImageIA("");
    } finally {
      setChargementImage(false);
    }
  };

  const demarrerTutoriel = async () => {
    try {
      const res = await axios.post("/api/user/ia/tutoriel/lancer", { userId, langue });
      setTutorielId(res.data.tutorielId);
      setEtape(res.data.etapeInitiale);
      setMessageIA(etapesTextes[0]);
      setIaPremium(res.data.iaPremium || false);
      setBlocage(false);

      if (res.data.iaPremium && res.data.tutorielId) {
        await fetchImageIA(res.data.tutorielId);
      }
    } catch (err) {
      if (err.response?.data?.blocage) {
        setBlocage(true);
        setMessageIA(err.response.data.message);
      } else {
        setMessageIA("Erreur lors du démarrage du tutoriel.");
      }
    }
  };

  const envoyerEtape = async (nouvelleEtape, terminer = false) => {
    if (!tutorielId) return;
    try {
      await axios.put(`/api/user/ia/tutoriel/etape/${tutorielId}`, {
        etape: nouvelleEtape,
        terminer,
      });
    } catch (err) {
      console.error("Erreur mise à jour :", err);
    }
  };

  const nextEtape = async () => {
    if (etape < etapesTextes.length) {
      const newEtape = etape + 1;
      setEtape(newEtape);
      setMessageIA(etapesTextes[newEtape - 1]);
      envoyerEtape(newEtape, newEtape === etapesTextes.length);

      if (iaPremium && tutorielId) {
        await fetchImageIA(tutorielId);
      }
    }
  };

  const prevEtape = () => {
    if (etape > 1) {
      const newEtape = etape - 1;
      setEtape(newEtape);
      setMessageIA(etapesTextes[newEtape - 1]);
      envoyerEtape(newEtape, false);
    }
  };

  useEffect(() => {
    demarrerTutoriel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white shadow-xl p-6 rounded-2xl max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-xl font-bold mb-4 text-blue-700" aria-live="polite" aria-atomic="true">
        📘 Tutoriel IA – Étape {etape} / {etapesTextes.length}
      </h2>

      {blocage ? (
        <p className="text-red-600 font-semibold">{messageIA}</p>
      ) : (
        <>
          {iaPremium && (
            <div className="mb-4">
              {chargementImage ? (
                <p className="text-gray-500">Chargement de l’image IA...</p>
              ) : erreurImage ? (
                <p className="text-red-600">{erreurImage}</p>
              ) : imageIA ? (
                <img
                  src={imageIA}
                  alt="Illustration IA"
                  className="w-full max-h-64 object-cover rounded-xl shadow"
                />
              ) : null}
            </div>
          )}

          <p className="text-gray-800 mb-4">{messageIA}</p>

          <AudioPlayerIA texte={messageIA} langue={langue} />

          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              onClick={prevEtape}
              disabled={etape === 1}
              aria-label="Étape précédente"
            >
              ◀ Précédent
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              onClick={nextEtape}
              disabled={etape === etapesTextes.length}
              aria-label="Étape suivante"
            >
              Suivant ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TutorielIAUser;
