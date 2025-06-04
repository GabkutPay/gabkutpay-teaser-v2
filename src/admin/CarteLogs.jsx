import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const CarteLogs = () => {
  const [logs, setLogs] = useState([]);
  const [admin, setAdmin] = useState("");
  const [action, setAction] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/logs-cartes");
      setLogs(res.data);
    } catch (err) {
      alert("Erreur lors du chargement des logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchAdmin = admin ? log.admin?.toLowerCase().includes(admin.toLowerCase()) : true;
    const matchAction = action ? log.action?.toLowerCase().includes(action.toLowerCase()) : true;
    const matchDebut = debut ? new Date(log.date) >= new Date(debut) : true;
    const matchFin = fin ? new Date(log.date) <= new Date(fin) : true;
    return matchAdmin && matchAction && matchDebut && matchFin;
  });

  const exportData = async (type) => {
    try {
      const res = await axios.post(`/api/logs-cartes/export/${type}`, {
        debut,
        fin,
        admin,
        action,
      }, { responseType: "blob" });

      const filename = `logs_cartes.${type === "excel" ? "xlsx" : "pdf"}`;
      saveAs(res.data, filename);
    } catch (err) {
      alert("Erreur export");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">💳 Logs des cartes</h2>

      <div className="flex gap-4 flex-wrap mb-4">
        <input type="text" placeholder="Admin" value={admin} onChange={(e) => setAdmin(e.target.value)} className="border p-2 rounded" />
        <input type="text" placeholder="Action" value={action} onChange={(e) => setAction(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={debut} onChange={(e) => setDebut(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={fin} onChange={(e) => setFin(e.target.value)} className="border p-2 rounded" />
        <button onClick={() => exportData("excel")} className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
          ⬇️ Export Excel
        </button>
        <button onClick={() => exportData("pdf")} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
          🧾 Export PDF
        </button>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : filteredLogs.length === 0 ? (
        <p className="text-gray-500">Aucun log trouvé.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Admin</th>
              <th className="p-2">Action</th>
              <th className="p-2">Carte ID</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{log.admin}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.cardId}</td>
                <td className="p-2">{new Date(log.date).toLocaleString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
<div className="mt-6 flex flex-wrap gap-3">
  <button
    onClick={async () => {
      try {
        const res = await axios.post(
          "/api/logs-cartes/export/pdf",
          { debut: dateDebut, fin: dateFin, admin: filtreAdmin, action: filtreAction },
          { responseType: "blob" }
        );
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (err) {
        alert("Erreur export PDF");
      }
    }}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    📄 Export PDF
  </button>

  <button
    onClick={async () => {
      try {
        const res = await axios.post(
          "/api/logs-cartes/export/excel",
          { debut: dateDebut, fin: dateFin, admin: filtreAdmin, action: filtreAction },
          { responseType: "blob" }
        );
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "logs_cartes.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        alert("Erreur export Excel");
      }
    }}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    📊 Export Excel
  </button>
</div>

export default CarteLogs;
