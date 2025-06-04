import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ValidationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filtreAdmin, setFiltreAdmin] = useState('');
  const [filtreType, setFiltreType] = useState('');
  const [filtreDateDebut, setFiltreDateDebut] = useState('');
  const [filtreDateFin, setFiltreDateFin] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/logs/validations');
        setLogs(res.data);
        setFilteredLogs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement des logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    let filtered = [...logs];

    if (filtreAdmin.trim()) {
      filtered = filtered.filter(log =>
        log.adminNom.toLowerCase().includes(filtreAdmin.toLowerCase())
      );
    }
    if (filtreType) {
      filtered = filtered.filter(log => log.type === filtreType);
    }
    if (filtreDateDebut) {
      const start = new Date(filtreDateDebut);
      filtered = filtered.filter(log => new Date(log.dateAction) >= start);
    }
    if (filtreDateFin) {
      const end = new Date(filtreDateFin);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => new Date(log.dateAction) <= end);
    }

    setFilteredLogs(filtered);
  }, [filtreAdmin, filtreType, filtreDateDebut, filtreDateFin, logs]);

  const handleExportStats = async (format) => {
    try {
      const totalValidations = filteredLogs.filter(l => l.type === 'validation').length;
      const totalRejets = filteredLogs.filter(l => l.type === 'rejet').length;
      const montantTotal = filteredLogs
        .filter(l => l.type === 'validation' && l.operationId?.montant)
        .reduce((total, l) => total + l.operationId.montant, 0);
      const adminsActifs = [...new Set(filteredLogs.map(l => l.adminNom))].length;
      const filtre = filtreDateDebut || filtreDateFin
        ? `${filtreDateDebut || '...'} ➜ ${filtreDateFin || '...'}`
        : 'Tous les enregistrements';

      const endpoint = format === 'pdf' ? '/api/export/stats/pdf' : '/api/export/stats/excel';

      const res = await axios.post(endpoint, {
        totalValidations,
        totalRejets,
        montantTotal,
        adminsActifs,
        filtre
      }, { responseType: 'blob' });

      const blob = new Blob([res.data], {
        type: format === 'pdf'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = format === 'pdf' ? 'stats-validation.pdf' : 'stats-validation.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Erreur export stats :', err);
      alert('Erreur lors de l’export des statistiques');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🕵️ Journal des validations et rejets</h2>

      {/* Filtres */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filtrer par admin"
          value={filtreAdmin}
          onChange={e => setFiltreAdmin(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={filtreType}
          onChange={e => setFiltreType(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Tous types</option>
          <option value="validation">Validation</option>
          <option value="rejet">Rejet</option>
        </select>
        <input
          type="date"
          value={filtreDateDebut}
          onChange={e => setFiltreDateDebut(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={filtreDateFin}
          onChange={e => setFiltreDateFin(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Statistiques */}
      <div className="mb-4 bg-gray-100 p-4 rounded shadow text-sm">
        <h3 className="text-lg font-semibold mb-2">📊 Statistiques sur les résultats filtrés</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-2 bg-white rounded shadow">
            <span className="block text-gray-600">✔️ Validations</span>
            <span className="text-green-700 font-bold text-xl">
              {filteredLogs.filter(l => l.type === 'validation').length}
            </span>
          </div>
          <div className="p-2 bg-white rounded shadow">
            <span className="block text-gray-600">❌ Rejets</span>
            <span className="text-red-600 font-bold text-xl">
              {filteredLogs.filter(l => l.type === 'rejet').length}
            </span>
          </div>
          <div className="p-2 bg-white rounded shadow">
            <span className="block text-gray-600">💰 Montant validé</span>
            <span className="text-blue-700 font-bold text-xl">
              {filteredLogs
                .filter(l => l.type === 'validation' && l.operationId?.montant)
                .reduce((total, l) => total + l.operationId.montant, 0)
                .toLocaleString()} $
            </span>
          </div>
          <div className="p-2 bg-white rounded shadow">
            <span className="block text-gray-600">🧑‍💼 Admins actifs</span>
            <span className="text-purple-700 font-bold text-xl">
              {[...new Set(filteredLogs.map(l => l.adminNom))].length}
            </span>
          </div>
        </div>
      </div>

      {/* Boutons d’export */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => handleExportStats('pdf')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          📄 Export PDF (stats)
        </button>
        <button
          onClick={() => handleExportStats('excel')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          📊 Export Excel (stats)
        </button>
      </div>
      {/* Tableau filtré */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <p>Chargement...</p>
      ) : filteredLogs.length === 0 ? (
        <p>Aucun log ne correspond aux critères.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Admin</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Opération</th>
              <th className="p-2 text-left">Commentaire</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="p-2">{new Date(log.dateAction).toLocaleString()}</td>
                <td className="p-2">{log.adminNom}</td>
                <td className={`p-2 ${log.type === 'rejet' ? 'text-red-600' : 'text-green-600'}`}>
                  {log.type.toUpperCase()}
                </td>
                <td className="p-2">
                  {log.operationId?.type
                    ? `${log.operationId.type} - ${log.operationId.montant} ${log.operationId.devise}`
                    : log.operationId || '-'}
                </td>
                <td className="p-2">{log.commentaire || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ValidationLogs;
