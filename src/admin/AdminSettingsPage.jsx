import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // ✅ Charger les paramètres initiaux
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/admin/settings');
        setSettings(data);
      } catch (error) {
        console.error('Erreur chargement paramètres', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Mise à jour du champ
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // ✅ Envoi des modifications
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const { data } = await axios.put('/api/admin/settings', settings);
      setMessage(data.message || 'Mise à jour réussie.');
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la mise à jour.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Paramètres administrateur</h2>

      {loading ? (
        <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
      ) : (
        <Card className="w-full max-w-2xl">
          <CardContent className="space-y-4 mt-4">

            {/* Exemple de champ paramétrable */}
            <div>
              <label className="block text-sm font-medium mb-1">Nom de l'organisation</label>
              <Input
                name="organisationName"
                value={settings.organisationName || ''}
                onChange={handleChange}
                placeholder="Gabkut Inc."
              />
            </div>

            {/* Ajoute ici autant de champs que nécessaire */}

            <Button onClick={handleUpdate} disabled={updating}>
              {updating ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>

            {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSettingsPage;
