import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardUtilisateur() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/user/transactions?limit=10', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des transactions", err);
      }
    };

    fetchTransactions();
  }, []);

  const handleDownload = (id) => {
    const url = `http://localhost:8080/reçus/recu_GKP_${id}.pdf`;
    window.open(url, '_blank');
  };

  return (
    <div className="ml-64 p-8 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">📊 Mes Activités</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Montant</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">PDF</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Aucune transaction récente</td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(tx.date).toLocaleString()}</td>
                    <td className="px-4 py-2 capitalize">{tx.type}</td>
                    <td className="px-4 py-2">{tx.montant} USD</td>
                    <td className="px-4 py-2">{tx.statut}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDownload(tx._id)}
                        className="text-blue-900 hover:underline"
                      >
                        📥 Reçu
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
