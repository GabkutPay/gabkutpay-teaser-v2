import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriqueTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('/api/user/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error("Erreur chargement historique :", err);
      }
    };

    fetchTransactions();
  }, []);

  const transactionsFiltres = transactions.filter(txn =>
    txn.description?.toLowerCase().includes(filtre.toLowerCase()) ||
    txn.type?.toLowerCase().includes(filtre.toLowerCase()) ||
    txn.promoCode?.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📄 Historique de mes transactions</h2>

      <input
        type="text"
        placeholder="🔍 Filtrer par type, description ou code promo"
        className="mb-4 w-full p-3 rounded-lg text-black"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full table-auto text-sm text-black">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">📅 Date</th>
              <th className="p-3">🔁 Type</th>
              <th className="p-3">📝 Description</th>
              <th className="p-3">💰 Montant</th>
              <th className="p-3">💸 Frais</th>
              <th className="p-3">✅ Statut</th>
              <th className="p-3">🎁 Promo</th>
            </tr>
          </thead>
          <tbody>
            {transactionsFiltres.map((txn, index) => (
              <tr key={txn._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3">{new Date(txn.timestamp).toLocaleString()}</td>
                <td className="p-3">{txn.type}</td>
                <td className="p-3">{txn.description}</td>
                <td className="p-3 text-green-600 font-bold">{txn.amount} GKT</td>
                <td className="p-3 text-red-600">-{txn.fees || 0} GKT</td>
                <td className="p-3">{txn.status}</td>
                <td className="p-3">
                  {txn.promoCode ? (
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-lg font-semibold">
                      🎁 {txn.promoCode}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">—</span>
                  )}
                </td>
              </tr>
            ))}
            {transactionsFiltres.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">Aucune transaction trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoriqueTransactions;
