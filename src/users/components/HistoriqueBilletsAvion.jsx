import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriqueBilletsAvion = () => {
  const [billets, setBillets] = useState([]);
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    fetchBillets();
  }, []);

  const fetchBillets = async () => {
    try {
      const res = await axios.get('/api/flight/orders');
      setBillets(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des billets :', err);
    }
  };

  const handleExportPDF = () => {
    window.open('/api/export-billets/export/pdf', '_blank');
  };

  const handleExportExcel = () => {
    window.open('/api/export-billets/export/excel', '_blank');
  };

  const billetsFiltres = billets.filter((b) =>
    b.destination?.toLowerCase().includes(filtre.toLowerCase()) ||
    b.depart?.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🛫 Historique de mes billets d’avion</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="🔎 Filtrer par destination ou départ"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <div className="flex gap-3">
          <button onClick={handleExportExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            📊 Export Excel
          </button>
          <button onClick={handleExportPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            📄 Export PDF
          </button>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">N°</th>
            <th className="p-2">Compagnie</th>
            <th className="p-2">Départ</th>
            <th className="p-2">Destination</th>
            <th className="p-2">Date</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Statut</th>
            <th className="p-2">📁 PDF</th>
          </tr>
        </thead>
        <tbody>
          {billetsFiltres.map((b, i) => (
            <React.Fragment key={b._id}>
              <tr className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{b.compagnie}</td>
                <td className="p-2">{b.depart}</td>
                <td className="p-2">{b.destination}</td>
                <td className="p-2">{new Date(b.dateDepart).toLocaleDateString()}</td>
                <td className="p-2 font-semibold">{b.prix} $</td>
                <td className="p-2">{b.statut}</td>
                <td className="p-2 text-center">
                  {b.billetPdfPath ? (
                    <a
                      href={`/uploads/${b.billetPdfPath.split('uploads/')[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Voir PDF
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>

              {b.statut === 'billet_reçu' && b.billetPdfPath && (
                <tr>
                  <td colSpan="8" className="bg-green-50 p-2 text-green-700 text-sm">
                    📩 Votre billet est prêt. Cliquez sur "Voir PDF" pour le consulter.
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueBilletsAvion;
