import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFingerprintCapture = () => {
    const simulated = `FP-${Date.now()}`;
    setFingerprint(simulated);
    alert("✅ Empreinte digitale simulée capturée !");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fingerprint) {
      alert("Veuillez capturer votre empreinte digitale avant de soumettre.");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/api/auth/register', {
        email,
        nom,
        password,
        fingerprint
      });
      setMessage({ text: "✅ Inscription réussie !", success: true });
    } catch (err) {
      console.error(err);
      setMessage({ text: "❌ Échec de l'inscription.", success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Créer un compte Gabkut</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="nom">Nom complet</label>
          <input
            id="nom"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleFingerprintCapture}
            className="bg-yellow-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            📲 Capturer Empreinte Digitale
          </button>
        </div>

        {fingerprint && (
          <div className="text-sm text-gray-600 mt-2">
            Empreinte capturée : <span className="font-mono">{fingerprint}</span>
          </div>
        )}

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || !fingerprint}
        >
          {loading ? 'Création en cours...' : 'Créer mon compte'}
        </button>

        {message && (
          <p className={`text-center mt-4 font-semibold text-sm ${message.success ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
