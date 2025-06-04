// src/users/components/HistoriqueCartesBox.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getStyleByCompte } from "../../utils/getStyleByCompte";

const HistoriqueCartesBox = () => {
  const [cartes, setCartes] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [typeCompte, setTypeCompte] = useState("");

  useEffect(() => {
    const fetchCartes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/cartes/historique", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartes(res.data);

        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.typeCompte) {
          setTypeCompte(userData.typeCompte);
        }
      } catch (err) {
        console.error("Erreur chargement cartes :", err);
      }
    };
    fetchCartes();
  }, []);

  const cartesFiltrees = cartes.filter(
    (c) =>
      c.nom.toLowerCase().includes(filtre.toLowerCase()) ||
      c.dateAchat.toLowerCase().includes(filtre.toLowerCase())
  );

  const exporterPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des Cartes Gabkut", 14, 15);
    autoTable(doc, {
      head: [["Nom", "Type", "Plafond", "Date"]],
      body: cartesFiltrees.map((c) => [
        c.nom,
        c.type,
        `$${c.plafond}`,
        new Date(c.dateAchat).toLocaleDateString(),
      ]),
    });
    doc.save("historique_cartes.pdf");
  };

  const exporterExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      cartesFiltrees.map((c) => ({
        Nom: c.nom,
        Type: c.type,
        Plafond: `$${c.plafond}`,
        Date: new Date(c.dateAchat).toLocaleDateString(),
      }))
    );
    XLSX.utils.book_append_sheet(wb, ws, "Cartes");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "historique_cartes.xlsx");
  };

  return (
    <div className={`${getStyleByCompte(typeCompte).background} rounded-2xl shadow p-4`}>
      <p className="text-right font-bold italic mb-2">
        Type de compte :{" "}
        <span className={`px-3 py-1 rounded-full text-sm ${getStyleByCompte(typeCompte).badge}`}>
          {typeCompte || "Standard"}
        </span>
      </p>

      <div className="flex flex-wrap gap-2 justify-between mb-4">
        <input
          type="text"
          placeholder="🔍 Filtrer par nom ou date..."
          className="flex-grow px-4 py-2 border rounded-xl"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
        <button
          onClick={exporterPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
        >
          📄 Export PDF
        </button>
        <button
          onClick={exporterExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          📊 Export Excel
        </button>
      </div>

      {cartesFiltrees.length === 0 ? (
        <p className="text-center text-gray-300">Aucune carte trouvée.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nom</th>
                <th className="p-2">Type</th>
                <th className="p-2">Plafond</th>
                <th className="p-2">Date d'achat</th>
              </tr>
            </thead>
            <tbody>
              {cartesFiltrees.map((carte, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="p-2 font-medium">{carte.nom}</td>
                  <td className="p-2">{carte.type}</td>
                  <td className="p-2">${carte.plafond}</td>
                  <td className="p-2">{new Date(carte.dateAchat).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoriqueCartesBox;
