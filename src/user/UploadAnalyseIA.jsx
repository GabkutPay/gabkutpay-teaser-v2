import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadAnalyseIA = ({ isPremium }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultatIA, setResultatIA] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");

  // Nettoyer l'URL d'aperçu pour éviter les fuites mémoire
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Limiter la taille du fichier (ex: 5 Mo)
      if (file.size > 5 * 1024 * 1024) {
        setMessageErreur("Le fichier est trop volumineux (max 5 Mo).");
        setImage(null);
        setPreviewUrl(null);
        setResultatIA("");
        return;
      }

      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultatIA("");
      setMessageErreur("");
    }
  };

  const envoyerImage = async () => {
    if (!image) {
      setMessageErreur("Veuillez sélectionner une image à analyser.");
      return;
    }

    if (!isPremium) {
      setMessageErreur("Fonction réservée aux utilisateurs IA Premium.");
      return;
    }

    try {
      setLoading(true);
      setMessageErreur("");
      setResultatIA("");

      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post("/api/user/ia/upload-analyse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResultatIA(res.data.result);
    } catch (err) {
      console.error(err);
      setMessageErreur(
        err.response?.data?.message || "Erreur lors de l’analyse. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-10 text-center max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-blue-700 mb-4">📤 Analyse d’image IA</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block mx-auto"
        aria-label="Sélectionner une image à analyser"
      />

      {previewUrl && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Aperçu :</p>
          <img
            src={previewUrl}
            alt="Aperçu de l'image sélectionnée"
            className="mx-auto w-60 rounded-lg shadow"
          />
        </div>
      )}

      <button
        onClick={envoyerImage}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
        aria-disabled={loading}
      >
        {loading ? "Analyse en cours..." : "Lancer l'analyse IA"}
      </button>

      {messageErreur && (
        <p className="text-red-600 font-semibold mt-4" role="alert">
          {messageErreur}
        </p>
      )}

      {resultatIA && (
        <div
          className="mt-6 bg-gray-100 p-4 rounded-lg text-left"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm font-semibold text-blue-800 mb-1">🧠 Résultat IA :</p>
          <p className="text-gray-800">{resultatIA}</p>
        </div>
      )}
    </div>
  );
};

export default UploadAnalyseIA;
