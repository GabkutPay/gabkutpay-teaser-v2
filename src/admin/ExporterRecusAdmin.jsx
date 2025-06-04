// src/admin/ExporterRecusAdmin.jsx
import React from "react";
import { Download } from "lucide-react";

const ExporterRecusAdmin = () => {
  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/exports/recus-pdf");
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recus-transactions-gabkut.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Erreur lors de l’export des reçus.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">📄 Export des reçus de transactions</h3>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        <Download size={18} />
        Exporter PDF
      </button>
    </div>
  );
};

export default ExporterRecusAdmin;
