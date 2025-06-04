import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPreinscriptionsDashboard = () => {
  const [liste, setListe] = useState([]);
  const [filtre, setFiltre] = useState('');
  const [loading, setLoading] = useState(false);

  const charger = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/preinscription');
      setListe(res.data.data || res.data); // selon structure renvoyée
    } catch (err) {
      console.error("❌ Erreur chargement :", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    charger();
  }, []);

  const preinscriptionsFiltrees = filtre
    ? liste.filter(p => p.typeCompte === filtre)
    : liste;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🗂️ Préinscriptions Gabkut Pay</h2>

      <div className="mb-4">
        <label className="font-semibold">Filtrer par type :</label>
        <select
          className="ml-2 border rounded p-1"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Standard">Standard</option>
          <option value="Professionnel">Professionnel</option>
          <option value="VIP">VIP</option>
          <option value="Diaspora">Diaspora</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Téléphone</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {preinscriptionsFiltrees.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2 border">{p.nom}</td>
                <td className="p-2 border">{p.email}</td>
                <td className="p-2 border">{p.telephone}</td>
                <td className="p-2 border">{p.typeCompte}</td>
                <td className="p-2 border">{p.message || '—'}</td>
                <td className="p-2 border">{new Date(p.dateSoumission).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPreinscriptionsDashboard;
