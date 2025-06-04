import React, { useState } from 'react';
import axios from 'axios';

export default function ReclamationForm() {
  const [formData, setFormData] = useState({
    sujet: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post('/api/user/reclamation', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatus(res.data.message);
      setFormData({ sujet: '', message: '' });
    } catch (err) {
      setStatus("Erreur lors de l'envoi de la réclamation.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto text-gray-900">
      <h2 className="text-xl font-bold mb-4">📨 Soumettre une réclamation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sujet" className="block text-sm font-medium">Sujet</label>
          <input
            type="text"
            id="sujet"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
          Envoyer la réclamation
        </button>
        {status && <p className="text-green-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}
