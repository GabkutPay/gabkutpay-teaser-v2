import React, { useState } from 'react';
import axios from 'axios';

const LoginOtpForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔐 Capture empreinte simulée
  const handleFingerprintCapture = () => {
    const fakeFingerprint = 'fp_' + Math.random().toString(36).substring(2, 15);
    setFingerprint(fakeFingerprint);
    setMessage('✅ Empreinte capturée avec succès.');
  };

  // 📩 Réenvoyer OTP
  const handleResendOtp = async () => {
    try {
      await axios.post('/api/auth/resend-otp', { email });
      setMessage('🔁 Code OTP renvoyé avec succès.');
    } catch (err) {
      setMessage('❌ Erreur lors de l’envoi du nouveau OTP.');
    }
  };

  // 🔐 Vérification OTP + empreinte
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const res = await axios.post('/api/auth/verify-login', {
        email,
        otp,
        fingerprint
      });

      setMessage(`✅ Connexion réussie. Bienvenue ${res.data.utilisateur?.nom || ''}`);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage('❌ OTP ou empreinte invalide.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🔐 Connexion avec OTP</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Code OTP reçu"
          className="w-full border rounded p-2"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={handleFingerprintCapture}
          className="w-full bg-blue-700 text-white py-2 rounded"
        >
          📲 Capturer l’empreinte digitale
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-700 text-white py-2 rounded"
        >
          ✅ Se connecter
        </button>

        <button
          type="button"
          onClick={handleResendOtp}
          className="w-full text-blue-500 underline mt-2"
        >
          🔁 Réenvoyer OTP
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default LoginOtpForm;
