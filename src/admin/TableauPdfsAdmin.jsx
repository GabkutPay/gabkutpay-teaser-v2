import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const TableauPdfsAdmin = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [selectedMois, setSelectedMois] = useState("");
  const [selectedAnnee, setSelectedAnnee] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selection, setSelection] = useState([]);
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const navigate = useNavigate();

  const API_TOKEN = process.env.REACT_APP_API_TOKEN || "gabkut_super_admin_2025";

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await axios.get("/api/pdfs");
        setPdfs(res.data);
      } catch (err) {
        console.error("Erreur chargement PDFs", err);
      }
    };
    fetchPdfs();
  }, []);

  const supprimerPdf = async (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      try {
        await axios.delete(`/api/pdfs/${id}`);
        setPdfs((prev) => prev.filter((pdf) => pdf._id !== id));
        setSelection((prev) => prev.filter((item) => item !== id));
      } catch (err) {
        alert("Erreur suppression.");
      }
    }
  };

  const toggleSelection = (id) => {
    setSelection((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const exportZip = async () => {
    if (selection.length === 0) {
      alert("Veuillez sélectionner au moins un PDF.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/zip/export",
        { ids: selection },
        { responseType: "blob" }
      );
      saveAs(res.data, "gabkut_pdfs_selection.zip");
    } catch (err) {
      alert("Erreur lors de l’export ZIP.");
    }
  };

  const telechargerPdf = async (pdf) => {
    if (!pdf.fichierUrl) return alert("Aucun fichier PDF associé.");
    const filename = pdf.fichierUrl.split("/").pop();

    try {
      const res = await axios.get(`/pdfs/${filename}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        responseType: "blob",
      });

      saveAs(res.data, filename);
    } catch (err) {
      alert("Erreur lors du téléchargement sécurisé.");
    }
  };

  const filtreMin = filtre.toLowerCase();

  // Filtrage
  const filteredPdfs = pdfs.filter((pdf) => {
    const matchGkp = pdf.gkpId?.toLowerCase().includes(filtreMin);
    const matchNom = pdf.nom?.toLowerCase().includes(filtreMin);
    const matchPrenom = pdf.prenom?.toLowerCase().includes(filtreMin);
    const matchType = selectedType ? pdf.type === selectedType : true;
    const matchAnnee = selectedAnnee
      ? new Date(pdf.dateCreation).getFullYear().toString() === selectedAnnee
      : true;
    const matchMois = selectedMois
      ? new Date(pdf.dateCreation).getMonth() + 1 === parseInt(selectedMois)
      : true;
    return (matchGkp || matchNom || matchPrenom) && matchType && matchAnnee && matchMois;
  });

  // Tri
  const sortedPdfs = React.useMemo(() => {
    if (!sortConfig.key) return filteredPdfs;

    const sorted = [...filteredPdfs].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Pour la date, on convertit en timestamp
      if (sortConfig.key === "dateCreation") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        // Comparaison insensible à la casse pour les chaînes
        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredPdfs, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedPdfs.length / ITEMS_PER_PAGE);
  const paginatedPdfs = sortedPdfs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Gestion du clic sur l'entête pour trier
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Indicateur visuel du tri
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📄 Table des PDFs générés</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Recherche GKP, nom, prénom"
          className="border p-2 rounded w-full md:w-1/3"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="border p-2 rounded">
          <option value="">Type</option>
          <option value="relevé">Relevé</option>
          <option value="facture">Facture</option>
        </select>
        <select value={selectedMois} onChange={(e) => setSelectedMois(e.target.value)} className="border p-2 rounded">
          <option value="">Mois</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select value={selectedAnnee} onChange={(e) => setSelectedAnnee(e.target.value)} className="border p-2 rounded">
          <option value="">Année</option>
          {[2023, 2024, 2025].map((annee) => (
            <option key={annee} value={annee}>
              {annee}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={exportZip}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        📦 Export ZIP des PDFs sélectionnés
      </button>

      {paginatedPdfs.length === 0 ? (
        <p className="text-center text-gray-500">Aucun PDF trouvé.</p>
      ) : (
        <>
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 cursor-pointer select-none">
                <th className="p-2" onClick={() => requestSort("nom")}>
                  Nom complet {getSortIndicator("nom")}
                </th>
                <th className="p-2" onClick={() => requestSort("type")}>
                  Type {getSortIndicator("type")}
                </th>
                <th className="p-2" onClick={() => requestSort("dateCreation")}>
                  Date {getSortIndicator("dateCreation")}
                </th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPdfs.map((pdf) => (
                <tr key={pdf._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{pdf.nom} {pdf.prenom}</td>
                  <td className="p-2">{pdf.type}</td>
                  <td className="p-2">{new Date(pdf.dateCreation).toLocaleDateString()}</td>
                  <td className="p-2 flex gap-2 flex-wrap">
                    <input
                      type="checkbox"
                      checked={selection.includes(pdf._id)}
                      onChange={() => toggleSelection(pdf._id)}
                      className="self-center"
                      aria-label={`Sélectionner le PDF de ${pdf.nom} ${pdf.prenom}`}
                    />
                    <button className="text-blue-600 hover:underline" onClick={() => navigate(`/admin/modifier-pdf/${pdf._id}`)}>
                      Modifier
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => supprimerPdf(pdf._id)}>
                      Supprimer
                    </button>
                    <button className="text-green-600 hover:underline" onClick={() => telechargerPdf(pdf)}>
                      Télécharger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-3 py-1 rounded border ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
              ← Précédent
            </button>
            <span className="self-center">Page {page} / {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-3 py-1 rounded border ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
            >
              Suivant →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TableauPdfsAdmin;
