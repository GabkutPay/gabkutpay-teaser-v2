import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

const HistoriqueRechargesMobile = () => {
  const { user } = useUser();
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecharges = async () => {
      try {
        const res = await axios.get(`/api/recharges/mobile/user/${user._id}`);
        setRecharges(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchRecharges();
    }
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📱 Historique des Recharges Mobile</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Numéro</th>
              <th className="p-2 border">Montant</th>
              <th className="p-2 border">Opérateur</th>
            </tr>
          </thead>
          <tbody>
            {recharges.map((item, i) => (
              <tr key={i} className="text-center">
                <td className="border p-2">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="border p-2">{item.numero}</td>
                <td className="border p-2">{item.montant} $</td>
                <td className="border p-2 capitalize">{item.operateur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueRechargesMobile;
