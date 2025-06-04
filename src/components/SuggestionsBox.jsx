import React, { useState } from 'react';
import axios from 'axios';

const SuggestionsBox = ({ user }) => {
  const [suggestion, setSuggestion] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const envoyerSuggestion = async () => {
    try {
      await axios.post('/api/suggestions', {
        userId: user._id,
        message: suggestion,
      });
      setConfirmation('Merci pour votre suggestion !');
      setSuggestion('');
    } catch (err) {
      setConfirmation("Une erreur s'est produite.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">💡 Vos Suggestions</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        placeholder="Exprimez vos idées ou suggestions pour améliorer Gabkut Pay..."
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
        rows={4}
      />
      <button
        onClick={envoyerSuggestion}
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!suggestion.trim()}
      >
        Envoyer
      </button>
      {confirmation && <p className="mt-3 text-green-600">{confirmation}</p>}
    </div>
  );
};

export default SuggestionsBox;
