import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Composant principal pour l'affichage et la gestion des logs CRON.
 */
const CronLogs = () => {
  // États principaux
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [total, setTotal] = useState(0);

  // Filtres (exemple de filtre par statut)
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  // Récupération des logs avec pagination et filtres
  const fetchLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page,
        limit,
        ...(filterStatus && { status: filterStatus }),
        ...(filterType && { type: filterType }),
      };
      const res = await axios.get('/api/admin/cron-logs', { params });
      if (res.data.logs) {
        setLogs(res.data.logs);
        setTotal(res.data.total);
      } else {
        setLogs(res.data);
        setTotal(res.data.length);
      }
    } catch (err) {
      setError("Erreur lors du chargement des logs.");
    } finally {
      setLoading(false);
    }
  };

  // Relance manuelle de la tâche CRON
  const relancerTache = async () => {
    setMessage('');
    try {
      await axios.post('/api/admin/cron/relancer-admin-log');
      setMessage("✅ CRON relancé avec succès !");
      fetchLogs(); // Rafraîchir les logs après relance
    } catch (err) {
      setMessage("❌ Échec de la relance CRON.");
    }
  };

  // Effet pour charger les logs à chaque changement de page ou de filtre
  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, [page, filterStatus, filterType]);

  // Gestion de la pagination
  const totalPages = Math.ceil(total / limit);

  // Gestion du changement de page
  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // Gestion du reset des filtres
  const resetFilters = () => {
    setFilterStatus('');
    setFilterType('');
    setPage(1);
  };

  // Disparition du message après 3 secondes + alerte sonore
  useEffect(() => {
    if (message) {
      const audio = document.getElementById('notif-sound');
      if (audio) audio.play().catch(() => {});

      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6" role="region" aria-label="Historique des envois automatiques CRON">
      <h2 className="text-2xl font-bold mb-6">📆 Historique des envois automatiques (CRON)</h2>

      {/* Actions principales */}
      <div className="flex flex-wrap gap-4 mb-6">
        <a
          href="/api/export/cron-logs/pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          🧾 Export PDF
        </a>
        <a
          href="/api/export/cron-logs/excel"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          📊 Export Excel
        </a>
        <button
          onClick={relancerTache}
          className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
        >
          🔁 Relancer CRON
        </button>
      </div>

      {/* Toast animé + audio pour message */}
      {message && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 text-sm font-semibold transition-all duration-500 ${
            message.startsWith('✅') ? 'bg-green-500 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {message}
        </div>
      )}
      <audio id="notif-sound" src="/alert.mp3" preload="auto" />

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <label>
          <span className="mr-2">Statut :</span>
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="border rounded px-2 py-1"
          >
            <option value="">Tous</option>
            <option value="succès">Succès</option>
            <option value="échec">Échec</option>
          </select>
        </label>
        <label>
          <span className="mr-2">Type :</span>
          <input
            type="text"
            value={filterType}
            onChange={e => { setFilterType(e.target.value); setPage(1); }}
            className="border rounded px-2 py-1"
            placeholder="admin-logs-weekly"
          />
        </label>
        <button
          onClick={resetFilters}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
        >
          Réinitialiser filtres
        </button>
      </div>

      {/* Chargement / Erreur */}
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Tableau des logs */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow rounded mt-4">
          <table className="min-w-full text-sm border" role="table" aria-label="Tableau des logs CRON">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border" scope="col">Date</th>
                <th className="px-4 py-2 border" scope="col">Type</th>
                <th className="px-4 py-2 border" scope="col">Statut</th>
                <th className="px-4 py-2 border" scope="col">Destinataire</th>
                <th className="px-4 py-2 border" scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Aucun envoi enregistré.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id || log.date + log.type} className="even:bg-white odd:bg-gray-50">
                    <td className="px-4 py-2 border">{new Date(log.date).toLocaleString()}</td>
                    <td className="px-4 py-2 border">{log.type}</td>
                    <td
                      className={`px-4 py-2 border font-bold ${
                        log.status === 'succès' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {log.status}
                    </td>
                    <td className="px-4 py-2 border">{log.destinataire}</td>
                    <td
                      className="px-4 py-2 border"
                      title={log.message && log.message.length > 50 ? log.message : undefined}
                    >
                      {log.message && log.message.length > 50 ? log.message.slice(0, 50) + '…' : log.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex gap-2 mt-4 justify-center items-center">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-2 py-1 rounded border ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default CronLogs;
