import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const CarteVirtuelleBox = () => {
  const [nbCartes, setNbCartes] = useState(0);

  useEffect(() => {
    const fetchCartes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/mes-cartes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNbCartes(res.data.length);
      } catch (error) {
        console.error("Erreur chargement cartes", error);
      }
    };

    fetchCartes();
  }, []);

  return (
    <Card className="shadow-md border bg-blue-700 text-white rounded-2xl">
      <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
        <div className="text-xl font-semibold">💳 Cartes virtuelles</div>
        <div className="text-3xl font-bold">{nbCartes}</div>
        <div className="text-sm">actives sur votre compte</div>
      </CardContent>
    </Card>
  );
};

export default CarteVirtuelleBox;
