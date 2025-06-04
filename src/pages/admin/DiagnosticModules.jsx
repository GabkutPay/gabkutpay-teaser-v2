import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiagnosticModules = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      try {
        const res = await axios.get('/api/diagnostic');
        setModules(res.data);
      } catch (err) {
        console.error('Erreur lors du diagnostic', err);
      }
    };

    fetchDiagnostics();
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔎 Diagnostic Technique des Modules</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">🧩 Module</th>
            <th className="text-left p-2 border">État</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{mod.nom}</td>
              <td className="p-2 border text-xl">
                {mod.etat === '✅' ? '✅ Activé' : '🕗 En attente'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiagnosticModules;
