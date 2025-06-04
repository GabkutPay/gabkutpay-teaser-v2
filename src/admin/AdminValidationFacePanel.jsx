import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminValidationFacePanel = () => {
  const [demandes, setDemandes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [message, setMessage] = useState('');

  const fetchDemandes = async () => {
    try {
      const { data } = await axios.get('/api/facial-validation/demandes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setDemandes(data);
    } catch (err) {
      setMessage('Erreur lors du chargement.');
    } finally {
      setChargement(false);
    }
  };

  const traiterDemande = async (id, action) => {
    try {
      const { data } = await axios.post(`/api/facial-validation/traiter`, {
        userId: id,
        action
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setMessage(data.message);
      fetchDemandes();
    } catch (err) {
      setMessage('Erreur lors du traitement.');
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  if (chargement) return <div className="text-center p-4">Chargement...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">✅ Validation faciale – demandes en attente</h1>
      {message && <div className="text-sm text-green-600">{message}</div>}
      {demandes.length === 0 ? (
        <p>Aucune demande à afficher.</p>
      ) : (
        demandes.map((user) => (
          <Card key={user._id} className="p-4">
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <p><strong>Nom:</strong> {user.nom} {user.prenom}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Téléphone:</strong> {user.telephone}</p>
              </div>
              <div className="flex gap-4 justify-center">
                <div>
                  <p className="text-sm text-center">📷 Selfie</p>
                  <img src={`/uploads/${user.selfiePath}`} alt="Selfie" className="w-32 h-32 object-cover rounded" />
                </div>
                <div>
                  <p className="text-sm text-center">🪪 Pièce d'identité</p>
                  <img src={`/uploads/${user.idCardPath}`} alt="ID Card" className="w-32 h-32 object-cover rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <Button onClick={() => traiterDemande(user._id, 'accepter')} className="w-full">✅ Valider</Button>
                <Button onClick={() => traiterDemande(user._id, 'refuser')} className="w-full bg-red-600 hover:bg-red-700">❌ Refuser</Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminValidationFacePanel;
