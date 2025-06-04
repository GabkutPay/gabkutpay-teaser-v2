// src/admin/AdminStatsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";

const AdminStatsPage = () => {
  const [stats, setStats] = useState([]);
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerStats();
  }, []);

  const chargerStats = async () => {
    try {
      const res = await axios.get("/api/stats/transactions");
      setStats(res.data || []);
    } catch (err) {
      setErreur("❌ Erreur chargement statistiques");
    }
  };

  const statsFiltrees = stats.filter((stat) => {
    const date = new Date(stat.date);
    return (!debut || date >= new Date(debut)) && (!fin || date <= new Date(fin));
  });

  const exporter = async (format) => {
    try {
      const res = await axios.post(`/api/stats/export-${format}`, {
        debut,
        fin,
      }, { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const lien = document.createElement("a");
      lien.href = url;
      lien.setAttribute("download", `stats-${Date.now()}.${format === "pdf" ? "pdf" : "xlsx"}`);
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
    } catch {
      alert("Erreur export.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">📊 Statistiques des Activités</h2>

      <div className="flex gap-4 items-end flex-wrap">
        <div>
          <label className="block text-sm font-medium">Du :</label>
          <input
            type="date"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Au :</label>
          <input
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={() => exporter("pdf")}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <Download size={16} /> PDF
        </button>
        <button
          onClick={() => exporter("excel")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Download size={16} /> Excel
        </button>
      </div>

      {erreur && <div className="text-red-600">{erreur}</div>}

      <div className="overflow-auto max-h-[600px] border rounded">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Montant ($)</th>
              <th className="border px-3 py-2">Utilisateur</th>
              <th className="border px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {statsFiltrees.map((s, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-3 py-2">{new Date(s.date).toLocaleString()}</td>
                <td className="border px-3 py-2">{s.type}</td>
                <td className="border px-3 py-2">{s.montant}</td>
                <td className="border px-3 py-2">{s.utilisateur}</td>
                <td className="border px-3 py-2">{s.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
import { Download } from "lucide-react";

const handleExport = (type) => {
  const debut = "2025-01-01";
  const fin = new Date().toISOString().slice(0, 10);

  const url = `/api/admin/export-stats/${type}?debut=${debut}&fin=${fin}`;
  window.open(url, "_blank");
};

// Dans ton render :
<div className="flex gap-4 mt-6">
  <button
    onClick={() => handleExport("pdf")}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
  >
    <Download size={18} /> Export PDF
  </button>
  <button
    onClick={() => handleExport("excel")}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
  >
    <Download size={18} /> Export Excel
  </button>
</div>

export default AdminStatsPage;
