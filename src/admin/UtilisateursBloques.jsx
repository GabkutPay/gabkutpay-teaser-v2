import React, { useEffect, useState } from "react";
import axios from "axios";

const UtilisateursBloques = () => {
  const [users, setUsers] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/admin/utilisateurs-bloques");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des utilisateurs bloqués.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const utilisateursFiltres = users.filter((user) =>
    user.email?.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛡️ Utilisateurs Bloqués</h2>

      <div className="flex gap-4 mb-4">
        <a
          href="/api/admin/export-bloques/excel"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          📥 Export Excel
        </a>
        <a
          href="/api/admin/export-bloques/pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          📄 Export PDF
        </a>
      </div>

      <input
        type="text"
        placeholder="Rechercher par email"
        className="border p-2 rounded mb-4 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        aria-label="Filtrer par adresse email"
      />

      {loading ? (
        <p className="text-center text-gray-500">Chargement des utilisateurs bloqués...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : utilisateursFiltres.length === 0 ? (
        <p className="text-center text-gray-500">Aucun utilisateur bloqué trouvé.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Prénom</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Téléphone</th>
                <th className="p-3 text-left">Bloqué jusqu’au</th>
                <th className="p-3 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {utilisateursFiltres.map((user, index) => {
                const estToujoursBloque = new Date(user.lockedUntil) > new Date();
                return (
                  <tr
                    key={user._id || index}
                    className={
                      estToujoursBloque
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    <td className="p-3">{user.nom}</td>
                    <td className="p-3">{user.prenom}</td>
                    <td className="p-3 break-words max-w-xs">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3 whitespace-nowrap">
                      {new Date(user.lockedUntil).toLocaleString()}
                    </td>
                    <td className="p-3 font-semibold">
                      {estToujoursBloque ? "🔒 Bloqué" : "✔️ Débloqué (auto)"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UtilisateursBloques;
