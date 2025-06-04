import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ModifierPdf = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    gkpId: "",
    type: "relevé",
  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Chargement ciblé du PDF par ID
        const res = await axios.get(`/api/pdfs/${id}`);
        if (!res.data) {
          setError("PDF introuvable");
          return;
        }
        setForm({
          nom: res.data.nom || "",
          prenom: res.data.prenom || "",
          gkpId: res.data.gkpId || "",
          type: res.data.type || "relevé",
        });
        setPdfUrl(res.data.fichierUrl || null);
      } catch (err) {
        console.error(err);
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!form.nom.trim() || !form.prenom.trim() || !form.gkpId.trim()) {
      setError("Les champs Nom, Prénom et ID GKP sont obligatoires.");
      return;
    }

    try {
      const res = await axios.put(`/api/pdfs/${id}`, form);
      setPdfUrl(res.data.fichierUrl);
      setMessage("PDF mis à jour avec succès !");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour.");
      setMessage(null);
    }
  };

  if (loading) return <div className="p-6 text-center">Chargement...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  // Construction simple de l'URL PDF (adapter selon backend)
  const pdfLink = pdfUrl ? (pdfUrl.startsWith("http") ? pdfUrl : `http://localhost:8080${pdfUrl}`) : null;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🖊️ Modifier un PDF</h2>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="nom" className="block mb-1 font-medium">Nom</label>
          <input
            id="nom"
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="prenom" className="block mb-1 font-medium">Prénom</label>
          <input
            id="prenom"
            type="text"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="gkpId" className="block mb-1 font-medium">ID GKP</label>
          <input
            id="gkpId"
            type="text"
            name="gkpId"
            value={form.gkpId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 font-medium">Type</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="relevé">Relevé</option>
            <option value="facture">Facture</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Enregistrer les modifications
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      {pdfLink && (
        <a
          href={pdfLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 underline"
        >
          📄 Voir PDF après mise à jour
        </a>
      )}
    </div>
  );
};

export default ModifierPdf;
