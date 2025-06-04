import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { email, motDePasse });
      localStorage.setItem('gabkut_admin_token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setErreur('❌ Identifiants invalides ou accès refusé.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleConnexion} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Connexion Admin Gabkut</h2>

        {erreur && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{erreur}</div>}

        <label className="block text-gray-700">Adresse e-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          required
        />

        <label className="block text-gray-700">Mot de passe</label>
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-900"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
