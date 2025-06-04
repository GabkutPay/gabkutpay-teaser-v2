import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriqueRapportsAdmin = () => {
  const [moisDispo, setMoisDispo] = useState([]);
  const [filtreAnnee, setFiltreAnnee] = useState('');
  const [filtreMois, setFiltreMois] = useState('');
  const [selection, setSelection] = useState([]);
  const [erreur, setErreur] = useState(null);

  const moisNoms = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];

  const currentPeriod = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('/api/reports/months');
        setMoisDispo(res.data);
      } catch (err) {
        setErreur("Erreur lors du chargement des mois.");
        console.error(err);
      }
    };
    fetchReports();
  }, []);

  // Filtrage selon année et mois
  const filtresAppliques = moisDispo.filter((m) => {
    const [an, mo] = m.split('-');
    return (!filtreAnnee || filtreAnnee === an) && (!filtreMois || filtreMois === mo);
  });

  // Gestion de la sélection/désélection d’un mois
  const toggleSelection = (mois) => {
    setSelection((prev) =>
      prev.includes(mois) ? prev.filter((m) => m !== mois) : [...prev, mois]
    );
  };

  // Export ZIP des rapports sélectionnés
  const exporterZip = () => {
    if (selection.length === 0) {
      alert("Veuillez sélectionner au moins un mois.");
      return;
    }
    const url = `/api/reports/export-zip?mois=${selection.join(',')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Liste des années disponibles pour le filtre
  const anneesDispo = [...new Set(moisDispo.map(m => m.split('-')[0]))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📁 Historique des rapports mensuels</h2>

      {/* Alerte si rapport du mois en cours absent */}
      {!moisDispo.includes(currentPeriod) && (
        <div
          className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded"
          role="alert"
          aria-live="polite"
        >
          ⚠️ Le rapport du mois en cours ({currentPeriod}) n’est pas encore disponible.
        </div>
      )}

      {/* Filtres */}
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          value={filtreAnnee}
          onChange={(e) => setFiltreAnnee(e.target.value)}
          className="border px-3 py-2 rounded"
          aria-label="Filtrer par année"
        >
          <option value="">Toutes les années</option>
          {anneesDispo.map(an => (
            <option key={an} value={an}>{an}</option>
          ))}
        </select>
        <select
          value={filtreMois}
          onChange={(e) => setFiltreMois(e.target.value)}
          className="border px-3 py-2 rounded"
          aria-label="Filtrer par mois"
        >
          <option value="">Tous les mois</option>
          {moisNoms.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button
          onClick={exporterZip}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          aria-label="Exporter les rapports sélectionnés au format ZIP"
          type="button"
        >
          📦 Export ZIP sélection
        </button>
      </div>

      {erreur ? (
        <div className="text-red-600" role="alert">{erreur}</div>
      ) : filtresAppliques.length === 0 ? (
        <p>Aucun rapport disponible pour ces filtres.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden" role="table" aria-label="Tableau des rapports mensuels">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3" scope="col">✔</th>
              <th className="p-3 text-left" scope="col">Période</th>
              <th className="p-3 text-left" scope="col">PDF</th>
              <th className="p-3 text-left" scope="col">Excel</th>
            </tr>
          </thead>
          <tbody>
            {filtresAppliques.map((mois) => (
              <tr key={mois} className="border-t">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selection.includes(mois)}
                    onChange={() => toggleSelection(mois)}
                    aria-label={`Sélectionner le rapport du mois ${mois}`}
                  />
                </td>
                <td className="p-3 font-semibold text-blue-800">{mois}</td>
                <td className="p-3">
                  <a
                    href={`/pdfs/reports/${mois}/rapport-mensuel.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    aria-label={`Télécharger le rapport PDF du mois ${mois}`}
                  >
                    📄 PDF
                  </a>
                </td>
                <td className="p-3">
                  <a
                    href={`/pdfs/reports/${mois}/rapport-mensuel.xlsx`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                    aria-label={`Télécharger le rapport Excel du mois ${mois}`}
                  >
                    📊 Excel
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueRapportsAdmin;
