import React, { useEffect, useState } from "react";
import axios from "axios";

const UtilisateursASurveiller = () => {
  const [users, setUsers] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/admin/utilisateurs-a-surveiller");
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
        setError("Erreur lors du chargement des utilisateurs à surveiller.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const usersFiltres = users.filter((user) =>
    user.email?.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛡️ Utilisateurs à surveiller</h2>

      <input
        type="text"
        placeholder="Rechercher par email"
        className="border p-2 rounded mb-4 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        aria-label="Filtrer par adresse email"
      />

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : usersFiltres.length === 0 ? (
        <p className="text-center text-gray-500">Aucun utilisateur à surveiller trouvé.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Tentatives</th>
                <th className="p-3 text-left">IP</th>
                <th className="p-3 text-left">Date dernière tentative</th>
              </tr>
            </thead>
            <tbody>
              {usersFiltres.map((user, index) => (
                <tr
                  key={user._id || index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 break-words max-w-xs">{user.email}</td>
                  <td className="p-3">{user.nbTentatives}</td>
                  <td className="p-3">{user.ip}</td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(user.dateDerniereTentative).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UtilisateursASurveiller;
