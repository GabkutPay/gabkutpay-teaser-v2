import React, { useEffect, useState } from 'react';
import { FaChartBar, FaDownload } from 'react-icons/fa';
import axios from 'axios';

const AdminStatsPanel = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin-logs/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Erreur stats admin', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <FaChartBar /> Statistiques des administrateurs
      </h2>

      {loading ? (
        <p className="text-blue-500">Chargement des statistiques...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded shadow">
              <p className="text-gray-500 text-sm">Actions enregistrées</p>
              <h3 className="text-2xl font-bold text-blue-600">{stats.total}</h3>
            </div>

            <div className="p-4 border rounded shadow col-span-2">
              <p className="text-gray-500 text-sm mb-2">Activité par administrateur :</p>
              <ul className="list-disc list-inside text-sm">
                {Object.entries(stats.parAdmin).map(([admin, count], i) => (
                  <li key={i}><strong>{admin}</strong> : {count} actions</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded shadow col-span-3">
              <p className="text-gray-500 text-sm mb-2">Répartition des actions :</p>
              <ul className="list-disc list-inside text-sm columns-2">
                {Object.entries(stats.parAction).map(([action, count], i) => (
                  <li key={i}><strong>{action}</strong> : {count}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 border rounded shadow col-span-3">
              <p className="text-gray-500 text-sm mb-2">Activité des 7 derniers jours :</p>
              <div className="flex gap-2 text-sm">
                {stats.derniers7Jours.map((val, i) => (
                  <div key={i} className="text-center flex-1">
                    <div className="h-16 bg-blue-300 rounded" style={{ height: `${val * 6}px` }} />
                    <p className="mt-1">J-{6 - i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <a
              href="/api/admin-logs/export/excel"
              target="_blank"
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
            >
              <FaDownload /> Excel
            </a>
            <a
              href="/api/admin-logs/export/pdf"
              target="_blank"
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
            >
              <FaDownload /> PDF
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminStatsPanel;
