import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ConnexionPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const res = await axios.post('/api/auth/connexion', {
        email,
        motDePasse
      });

      const user = res.data.user;
      setUser(user);

      // 🔁 Redirection vers /dashboard → route privée automatique
      navigate('/dashboard');

    } catch (err) {
      setErreur('Identifiants incorrects ou erreur de serveur.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>

      {erreur && <p className="text-red-600 text-sm mb-4">{erreur}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default ConnexionPage;
