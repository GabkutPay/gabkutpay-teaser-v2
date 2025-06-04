import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminComptesTypes = () => {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    nom: '',
    description: '',
    fraisMensuel: '',
    cartesIncluses: '',
    servicesInclus: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const chargerTypes = async () => {
    try {
      const res = await axios.get('/api/account-types');
      setTypes(res.data);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des types.');
    }
  };

  useEffect(() => {
    chargerTypes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validerFormulaire = () => {
    if (!form.nom.trim()) {
      setError('Le nom du compte est obligatoire.');
      return false;
    }
    if (!form.description.trim()) {
      setError('La description est obligatoire.');
      return false;
    }
    if (form.fraisMensuel === '' || isNaN(Number(form.fraisMensuel)) || Number(form.fraisMensuel) < 0) {
      setError('Le frais mensuel doit être un nombre positif.');
      return false;
    }
    return true;
  };

  const ajouterType = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!validerFormulaire()) return;

    setLoading(true);
    try {
      await axios.post('/api/account-types', {
        nom: form.nom.trim(),
        description: form.description.trim(),
        fraisMensuel: Number(form.fraisMensuel),
        cartesIncluses: form.cartesIncluses
          ? form.cartesIncluses.split(',').map(e => e.trim()).filter(Boolean)
          : [],
        servicesInclus: form.servicesInclus
          ? form.servicesInclus.split(',').map(e => e.trim()).filter(Boolean)
          : []
      });
      setForm({ nom: '', description: '', fraisMensuel: '', cartesIncluses: '', servicesInclus: '' });
      setSuccessMsg('Type de compte ajouté avec succès.');
      chargerTypes();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout du type.');
    } finally {
      setLoading(false);
    }
  };

  const supprimerType = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce type de compte ?')) return;

    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      await axios.delete(`/api/account-types/${id}`);
      setSuccessMsg('Type de compte supprimé avec succès.');
      chargerTypes();
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la suppression.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">🛠️ Gestion des types de comptes</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Input name="nom" placeholder="Nom du compte" value={form.nom} onChange={handleChange} disabled={loading} />
        <Input name="fraisMensuel" placeholder="Frais mensuel (USD)" value={form.fraisMensuel} onChange={handleChange} disabled={loading} />
        <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} disabled={loading} />
        <Input name="cartesIncluses" placeholder="Cartes incluses (séparées par virgule)" value={form.cartesIncluses} onChange={handleChange} disabled={loading} />
        <Input name="servicesInclus" placeholder="Services inclus (séparés par virgule)" value={form.servicesInclus} onChange={handleChange} disabled={loading} />
      </div>

      <Button onClick={ajouterType} disabled={loading}>
        {loading ? 'Traitement...' : '➕ Ajouter ce type'}
      </Button>

      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">📋 Types existants</h3>
      <div className="space-y-4">
        {types.length === 0 ? (
          <p className="text-gray-600">Aucun type de compte disponible.</p>
        ) : (
          types.map((type) => (
            <div key={type._id} className="bg-gray-50 p-4 rounded-md shadow flex justify-between items-center">
              <div>
                <p className="font-bold text-blue-800">{type.nom}</p>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
              <Button variant="destructive" onClick={() => supprimerType(type._id)} disabled={loading}>
                Supprimer
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminComptesTypes;
