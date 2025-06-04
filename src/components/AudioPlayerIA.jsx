import React, { useEffect } from "react";

const AudioPlayerIA = ({ texte = "", langue = "fr" }) => {
  useEffect(() => {
    if (!texte || typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    if (!synth) return;

    // Arrêter toute lecture précédente
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(texte);

    // 🗣️ Affectation de la langue correcte (avec fallback)
    const voixParLangue = {
      fr: "fr-FR",
      en: "en-US",
      ar: "ar-SA",
      sw: "sw-KE",
      pt: "pt-PT",
      es: "es-ES",
      it: "it-IT",
      ln: "fr-FR",
      kg: "fr-FR",
      tsh: "fr-FR"
    };

    utterance.lang = voixParLangue[langue] || "fr-FR";

    // Optionnel : config voix personnalisée (si dispo)
    const voixDispo = synth.getVoices();
    const voixCible = voixDispo.find(v => v.lang === utterance.lang);
    if (voixCible) {
      utterance.voice = voixCible;
    }

    // Config vitesse/ton
    utterance.rate = 1;
    utterance.pitch = 1;

    // Lecture automatique
    synth.speak(utterance);

    // Nettoyage
    return () => synth.cancel();
  }, [texte, langue]);

  return null; // Pas d’interface visuelle nécessaire
};

export default AudioPlayerIA;
