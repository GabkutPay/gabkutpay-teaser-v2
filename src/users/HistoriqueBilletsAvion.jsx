import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const HistoriqueBilletsAvion = () => {
  const [billets, setBillets] = useState([]);
  const [filtre, setFiltre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chargerHistorique = async () => {
      try {
        const { data } = await axios.get('/api/vols/historique');
        setBillets(data);
      } catch (err) {
        console.error('Erreur chargement billets :', err);
      } finally {
        setLoading(false);
      }
    };
    chargerHistorique();
  }, []);

  const filtrerBillets = billets.filter(b =>
    b.arrivee.toLowerCase().includes(filtre.toLowerCase()) ||
    b.depart.toLowerCase().includes(filtre.toLowerCase()) ||
    b.numeroCommande.toLowerCase().includes(filtre.toLowerCase())
  );

  const exporterExcel = () => {
    window.open('/api/vols/historique/export/excel', '_blank');
  };

  const exporterPDF = () => {
    window.open('/api/vols/historique/export/pdf', '_blank');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🎟️ Historique des billets d'avion</h2>

      <input
        type="text"
        placeholder="🔍 Filtrer par ville ou numéro..."
        value={filtre}
        onChange={e => setFiltre(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="flex gap-4 mb-4">
        <Button onClick={exporterPDF}>📄 Export PDF</Button>
        <Button onClick={exporterExcel}>📊 Export Excel</Button>
      </div>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">N° Commande</th>
              <th className="p-2 border">Départ</th>
              <th className="p-2 border">Arrivée</th>
              <th className="p-2 border">Prix</th>
              <th className="p-2 border">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtrerBillets.map((b, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2 border">{new Date(b.date).toLocaleString()}</td>
                <td className="p-2 border">{b.numeroCommande}</td>
                <td className="p-2 border">{b.depart}</td>
                <td className="p-2 border">{b.arrivee}</td>
                <td className="p-2 border">{b.prix} USD</td>
                <td className="p-2 border">{b.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueBilletsAvion;
