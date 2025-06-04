import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const LogsCartesExport = () => {
  const [admin, setAdmin] = useState("");
  const [type, setType] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = async (format) => {
    if (!debut || !fin) {
      alert("Veuillez sélectionner une période complète.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `/api/admin/logs-cartes/${format}`,
        { admin, type, debut, fin },
        { responseType: format === "pdf" ? "blob" : "arraybuffer" }
      );

      const filename =
        format === "pdf" ? "logs_cartes.pdf" : "logs_cartes.xlsx";
      saveAs(res.data, filename);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'export.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📤 Export Logs Cartes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Nom administrateur"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Type d’action</option>
          <option value="recharge">Recharge</option>
          <option value="blocage">Blocage</option>
          <option value="déblocage">Déblocage</option>
          <option value="création">Création</option>
          <option value="suppression">Suppression</option>
        </select>
        <input
          type="date"
          value={debut}
          onChange={(e) => setDebut(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleExport("excel")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          📊 Export Excel
        </button>
        <button
          onClick={() => handleExport("pdf")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          📄 Export PDF
        </button>
      </div>

      {loading && (
        <p className="mt-4 text-center text-gray-600">Génération en cours...</p>
      )}
    </div>
  );
};

export default LogsCartesExport;
