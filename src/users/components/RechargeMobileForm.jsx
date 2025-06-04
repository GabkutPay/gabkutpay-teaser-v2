import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RechargeMobileForm = () => {
  const [formData, setFormData] = useState({
    numero: '',
    montant: '',
    operateur: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/recharges/mobile', formData);
      toast.success(res.data.message || 'Recharge effectuée avec succès');
      setFormData({ numero: '', montant: '', operateur: '' });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de la recharge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Numéro de téléphone</label>
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ex: 0820000000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Montant (en USD)</label>
        <input
          type="number"
          name="montant"
          value={formData.montant}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          min={0.5}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Opérateur</label>
        <select
          name="operateur"
          value={formData.operateur}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Sélectionner --</option>
          <option value="vodacom">Vodacom</option>
          <option value="airtel">Airtel</option>
          <option value="orange">Orange</option>
          <option value="africell">Africell</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded"
      >
        {loading ? "Chargement..." : "Recharger"}
      </button>
    </form>
  );
};

export default RechargeMobileForm;
