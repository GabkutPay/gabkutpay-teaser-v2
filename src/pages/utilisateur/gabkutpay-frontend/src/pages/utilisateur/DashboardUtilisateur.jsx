import React, { useEffect, useState } from 'react';
import SidebarUtilisateur from '../../components/SidebarUtilisateur';
import axios from 'axios';

export default function DashboardUtilisateur() {
  const [data, setData] = useState({
    solde: 0,
    fullName: '',
    gkpId: '',
    stats: {},
    transactions: []
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get('http://localhost:8080/api/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error("Erreur dashboard", err);
      }
    };
    fetchDashboard();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarUtilisateur />
      <main className="ml-64 p-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-900">
            {getGreeting()} {data.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-gray-600">ID utilisateur : {data.gkpId}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-sm text-gray-500">Solde actuel</h2>
            <p className="text-2xl font-bold text-green-600">{data.solde.toFixed(2)} USD</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-sm text-gray-500">Total envoyés</h2>
            <p className="text-xl font-bold text-blue-800">{data.stats.envois || 0} opérations</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-sm text-gray-500">Total reçus</h2>
            <p className="text-xl font-bold text-blue-800">{data.stats.receptions || 0} opérations</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">📄 Dernières transactions</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.length > 0 ? (
                data.transactions.map((tx, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-1">{new Date(tx.date).toLocaleString()}</td>
                    <td>{tx.type}</td>
                    <td>{tx.montant} USD</td>
                    <td>{tx.statut}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3 text-gray-500">Aucune transaction récente</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
