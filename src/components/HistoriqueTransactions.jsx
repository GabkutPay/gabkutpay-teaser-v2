import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

const HistoriqueTransactions = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [filtre, setFiltre] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`/api/transactions/user/${user._id}`);
        setTransactions(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des transactions', err);
      }
    };

    if (user?._id) {
      fetchTransactions();
    }
  }, [user]);

  const transactionsFiltrees = transactions.filter((t) =>
    t.description.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Historique des Transactions</h2>
      <input
        type="text"
        placeholder="🔍 Filtrer par description..."
        className="w-full p-2 border rounded mb-4"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Montant</th>
              <th className="p-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactionsFiltrees.map((tx, index) => (
              <tr key={tx._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2">{moment(tx.date).format('LLL')}</td>
                <td className="p-2">{tx.description}</td>
                <td className="p-2">{tx.montant} {tx.devise}</td>
                <td className="p-2">{tx.type}</td>
              </tr>
            ))}
            {transactionsFiltrees.length === 0 && (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">Aucune transaction trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoriqueTransactions;
