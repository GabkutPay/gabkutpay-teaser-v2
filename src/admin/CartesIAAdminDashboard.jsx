// src/admin/CartesIAAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CartesIAAdminDashboard = () => {
  const [cartes, setCartes] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [rechargeMontant, setRechargeMontant] = useState("");
  const [selectedCarteId, setSelectedCarteId] = useState(null);

  useEffect(() => {
    const fetchCartes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/cartes-ia", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartes(res.data);
      } catch (err) {
        console.error("Erreur chargement cartes :", err);
      }
    };
    fetchCartes();
  }, []);

  const cartesFiltrees = cartes.filter(
    (c) =>
      c.nom.toLowerCase().includes(filtre.toLowerCase()) ||
      c.type.toLowerCase().includes(filtre.toLowerCase())
  );

  const handleRecharge = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/admin/recharger-carte",
        { carteId: selectedCarteId, montant: rechargeMontant },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Recharge effectuée !");
      setRechargeMontant("");
      setSelectedCarteId(null);
      window.location.reload();
    } catch (error) {
      console.error("Erreur recharge :", error);
      alert("Erreur lors de la recharge.");
    }
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      cartesFiltrees.map((c) => ({
        Nom: c.nom,
        Type: c.type,
        Solde: `$${c.solde}`,
        Statut: c.statut,
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, "Cartes IA");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "cartesIA.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Cartes IA Gabkut Pay", 14, 15);
    autoTable(doc, {
      head: [["Nom", "Type", "Solde", "Statut"]],
      body: cartesFiltrees.map((c) => [
        c.nom,
        c.type,
        `$${c.solde}`,
        c.statut,
      ]),
    });
    doc.save("cartesIA.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧠 Cartes IA – Admin</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Filtrer par nom ou type..."
          className="flex-grow px-4 py-2 border rounded-xl"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
        <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded-xl">
          📄 Export PDF
        </button>
        <button onClick={exportExcel} className="bg-green-600 text-white px-4 py-2 rounded-xl">
          📊 Export Excel
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nom</th>
            <th className="p-2">Type</th>
            <th className="p-2">Solde</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartesFiltrees.map((carte) => (
            <tr key={carte._id} className="border-b">
              <td className="p-2 font-medium">{carte.nom}</td>
              <td className="p-2">{carte.type}</td>
              <td className="p-2">${carte.solde}</td>
              <td className="p-2">{carte.statut}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedCarteId(carte._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  💰 Recharger
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCarteId && (
        <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-md">
          <h3 className="font-semibold mb-2">💳 Recharger cette carte</h3>
          <input
            type="number"
            className="px-4 py-2 border rounded w-full mb-3"
            placeholder="Montant à ajouter"
            value={rechargeMontant}
            onChange={(e) => setRechargeMontant(e.target.value)}
          />
          <button
            onClick={handleRecharge}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            ✅ Confirmer Recharge
          </button>
          <button
            onClick={() => {
              setRechargeMontant("");
              setSelectedCarteId(null);
            }}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            ❌ Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default CartesIAAdminDashboard;
