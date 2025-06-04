import React, { useState } from 'react';
import axios from 'axios';

const TeaserForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeCompte: '',
    message: ''
  });

  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setConfirmation('');

    try {
      const res = await axios.post('http://localhost:5000/api/preinscription', formData);
      setConfirmation(res.data.message);
      setFormData({ nom: '', email: '', telephone: '', typeCompte: '', message: '' });
    } catch (err) {
      setConfirmation('Erreur lors de l’envoi. Veuillez réessayer.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={formData.nom}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="tel"
        name="telephone"
        placeholder="Téléphone"
        value={formData.telephone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="typeCompte"
        value={formData.typeCompte}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Type de compte</option>
        <option value="Standard">Standard</option>
        <option value="Professionnel">Professionnel</option>
        <option value="VIP">VIP</option>
        <option value="Diaspora">Diaspora</option>
      </select>
      <textarea
        name="message"
        placeholder="Message (optionnel)"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
      {confirmation && <p className="text-green-600 mt-2">{confirmation}</p>}
    </form>
  );
};

export default TeaserForm;
