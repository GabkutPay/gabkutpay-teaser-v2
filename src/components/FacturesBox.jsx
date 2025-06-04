import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

const FacturesBox = ({ user }) => {
  const [factures, setFactures] = useState([]);

  useEffect(() => {
    const chargerFactures = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/mes-factures', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFactures(res.data);
      } catch (err) {
        console.error('Erreur chargement des factures', err);
      }
    };

    if (user?._id) {
      chargerFactures();
    }
  }, [user]);

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">🧾 Mes factures PDF</h2>

      {factures.length === 0 ? (
        <p className="text-gray-600">Aucune facture disponible pour le moment.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {factures.map((facture) => (
            <li key={facture._id} className="py-3 flex items-center justify-between">
              <span className="text-sm text-gray-800">
                📅 {moment(facture.periode).format('MMMM YYYY')} – {facture.description}
              </span>
              <a
                href={facture.lienPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                Télécharger
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FacturesBox;
