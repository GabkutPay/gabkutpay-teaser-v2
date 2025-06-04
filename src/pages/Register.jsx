import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        fullName: formData.fullName,
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      });

      navigate('/login');
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez les informations.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">📝 Créer un compte</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Nom complet</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Email ou Téléphone</label>
          <input type="text" name="emailOrPhone" value={formData.emailOrPhone} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Confirmer le mot de passe</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800">
          Créer mon compte
        </button>
      </form>
    </div>
  );
}
