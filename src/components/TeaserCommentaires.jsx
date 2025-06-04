import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TeaserCommentaires = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
    setNom('');
    setEmail('');
    setMessage('');
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gray-50 py-16 px-6 text-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          💬 Laissez un avis ou posez une question
        </h2>
        <p className="text-center mb-4 text-gray-700">
          Votre voix compte. Partagez une suggestion, un encouragement, une remarque ou posez une question.
          Ce teaser est le vôtre.
        </p>

        {envoye ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-green-600 text-center font-semibold mt-6"
          >
            ✅ Merci ! Votre message a bien été envoyé.
          </motion.p>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            onSubmit={handleSubmit}
            className="space-y-4 mt-8"
          >
            <input
              type="text"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              placeholder="Votre e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
            <textarea
              placeholder="Votre message (avis, question, remarque...)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
              className="w-full p-3 border rounded"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-2 rounded hover:bg-blue-800 transition"
            >
              Envoyer mon message
            </button>
          </motion.form>
        )}
      </motion.div>
    </motion.section>
  );
};

export default TeaserCommentaires;
