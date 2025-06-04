import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/user/2fa/verify', { code });
      if (res.data.success) {
        // ✅ Accès autorisé → Redirection vers le dashboard
        navigate('/dashboard');
      } else {
        setError('Code incorrect. Veuillez réessayer.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la vérification.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          🔐 Vérification 2FA
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Entrez le code envoyé sur votre e-mail ou votre application 2FA.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Code à 6 chiffres"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
          />

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Vérification...' : 'Valider'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
