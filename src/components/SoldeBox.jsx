import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const SoldeBox = () => {
  const [solde, setSolde] = useState(null);

  useEffect(() => {
    const fetchSolde = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/mon-solde", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolde(res.data.solde);
      } catch (error) {
        console.error("Erreur chargement solde", error);
      }
    };

    fetchSolde();
  }, []);

  return (
    <Card className="shadow-md border bg-green-700 text-white rounded-2xl">
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
        <div className="text-xl font-semibold">💰 Solde disponible</div>
        <div className="text-3xl font-bold">
          {solde !== null ? `${solde.toLocaleString()} $` : "Chargement..."}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoldeBox;
