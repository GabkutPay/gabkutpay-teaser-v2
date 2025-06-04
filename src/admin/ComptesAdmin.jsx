import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const ComptesAdmin = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get("/api/account-types")
      .then((res) => setTypes(res.data))
      .catch((err) => console.error("Erreur chargement comptes", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Types de Comptes Gabkut</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type) => (
          <Card key={type._id} className="p-4 rounded-2xl shadow">
            <CardContent>
              <h2 className="text-lg font-semibold">{type.nom}</h2>
              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
              <ul className="list-disc pl-4 text-sm text-gray-800">
                {type.avantages?.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
              <div className="mt-3 text-xs text-gray-500">
                <p>Frais mensuels : <strong>{type.fraisMensuels.toFixed(2)} USD</strong></p>
                <p>Assistance : {type.assistance}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComptesAdmin;
