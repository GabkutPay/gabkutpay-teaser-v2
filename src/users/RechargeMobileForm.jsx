import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RechargeMobileForm = () => {
  const [formData, setFormData] = useState({
    numero: '',
    montant: '',
    operateur: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/recharge/mobile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || 'Recharge effectuée !');
      setFormData({ numero: '', montant: '', operateur: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la recharge');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Recharge Crédit Téléphonique</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Numéro de téléphone</label>
        <input
          type="tel"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
          placeholder="+243..."
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Montant</label>
        <input
          type="number"
          name="montant"
          value={formData.montant}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ex: 1000"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Opérateur</label>
        <select
          name="operateur"
          value={formData.operateur}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">-- Sélectionner --</option>
          <option value="vodacom">Vodacom</option>
          <option value="airtel">Airtel</option>
          <option value="orange">Orange</option>
          <option value="africtel">Africell</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition w-full"
      >
        Recharger
      </button>
    </form>
  );
};

export default RechargeMobileForm;
