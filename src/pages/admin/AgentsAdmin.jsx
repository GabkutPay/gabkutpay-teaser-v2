import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExportButtons from '../../components/ExportButtons';

const AgentsAdmin = () => {
  const [agents, setAgents] = useState([]);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

  const fetchAgents = async () => {
    try {
      const res = await axios.get('/api/admin/agents');
      setAgents(res.data);
    } catch (err) {
      console.error('Erreur chargement agents', err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const creerAgent = async () => {
    if (!nom || !email) return alert('Champs requis');
    try {
      await axios.post('/api/admin/agents', { nom, email });
      setNom('');
      setEmail('');
      fetchAgents();
    } catch (err) {
      alert("Erreur création agent");
    }
  };

  const toggleStatut = async (id) => {
    try {
      await axios.put(`/api/admin/agents/${id}/statut`);
      fetchAgents();
    } catch (err) {
      console.error("Erreur changement statut", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🧑‍💼 Gestion des Agents</h2>

      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Nom de l’agent"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={creerAgent} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ Ajouter
        </button>
      </div>

      <ExportButtons endpoint="agents" filename="liste_agents" />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">Nom</th>
            <th className="text-left p-2 border">Email</th>
            <th className="text-left p-2 border">Statut</th>
            <th className="text-left p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-2 border">{a.nom}</td>
              <td className="p-2 border">{a.email}</td>
              <td className="p-2 border">
                {a.actif ? <span className="text-green-600">✅ Actif</span> : <span className="text-red-600">⛔ Inactif</span>}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleStatut(a._id)}
                  className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  🔄 Changer statut
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentsAdmin;
