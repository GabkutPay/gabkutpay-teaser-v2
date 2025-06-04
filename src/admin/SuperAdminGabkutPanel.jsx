// src/admin/SuperAdminGabkutPanel.jsx
import React, { useState, useEffect } from 'react';
import { FaCogs, FaLock, FaShieldAlt, FaCodeBranch, FaSlidersH } from 'react-icons/fa';

const SuperAdminGabkutPanel = () => {
  const [adminInfo, setAdminInfo] = useState({});
  const [tarifs, setTarifs] = useState({});
  const [newFrais, setNewFrais] = useState({ envoi: '', retrait: '', carte: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user?.role !== 'adminPrincipal' && user?.role !== 'superadmin') {
      return setMessage("⛔ Accès refusé");
    }
    setAdminInfo(user);

    fetch('/api/settings/tarifs')
      .then(res => res.json())
      .then(data => setTarifs(data))
      .catch(() => setMessage("⚠️ Erreur chargement des tarifs"));
  }, []);

  const handleChange = (e) => {
    setNewFrais({ ...newFrais, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/settings/update-tarifs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminInfo.token}`,
        },
        body: JSON.stringify(newFrais),
      });
      const data = await res.json();
      setMessage(data.message || '✅ Tarifs mis à jour');
      setTarifs({ ...tarifs, ...newFrais });
    } catch {
      setMessage('❌ Échec mise à jour');
    }
  };

  if (message === "⛔ Accès refusé") return <div className="text-red-500 p-5">{message}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
        <FaCogs /> Panneau SuperAdmin Gabkut
      </h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2 flex items-center gap-2 text-gray-700"><FaSlidersH /> Modifier les tarifs</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="envoi" placeholder="Frais envoi (%)" value={newFrais.envoi} onChange={handleChange}
            className="border p-2 rounded w-full" />
          <input type="number" name="retrait" placeholder="Frais retrait (%)" value={newFrais.retrait} onChange={handleChange}
            className="border p-2 rounded w-full" />
          <input type="number" name="carte" placeholder="Frais carte ($)" value={newFrais.carte} onChange={handleChange}
            className="border p-2 rounded w-full" />
        </div>
        <button onClick={handleSave}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">💾 Sauvegarder</button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2 flex items-center gap-2"><FaShieldAlt /> Contrôle Sécurité</h2>
        <p className="text-sm text-gray-600">Toutes les actions sont tracées dans <strong>AdminLog.js</strong> avec date, type d'action et résultat. Vous pouvez y activer une surveillance IA renforcée (à venir).</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2 flex items-center gap-2"><FaCodeBranch /> Modules et IA</h2>
        <p className="text-sm">Prochaine version : activer/désactiver certains modules (chat, carte, schola, diaspora...), IA, bots, fraudes, visual editor, etc.</p>
      </div>

      {message && <div className="mt-4 text-blue-600 font-semibold">{message}</div>}
    </div>
  );
};

export default SuperAdminGabkutPanel;
