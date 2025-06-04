import React, { useState, useEffect } from 'react';
import { FaPaintBrush, FaMagic, FaRobot, FaSave } from 'react-icons/fa';
import './GabkutVisualEditorAI.css';

const GabkutVisualEditorAI = ({ currentPage }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [editableContent, setEditableContent] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔐 Sécurité : Vérifier si l’utilisateur est super-admin
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isSuperAdmin =
    userInfo && (userInfo.role === 'adminPrincipal' || userInfo.role === 'superadmin');

  // Ne rien afficher si non super-admin
  if (!isSuperAdmin) return null;

  useEffect(() => {
    fetch(`/api/visual-editor/${currentPage}`)
      .then((res) => res.json())
      .then((data) => setEditableContent(data))
      .catch((err) => console.error('Erreur chargement contenu IA:', err));
  }, [currentPage]);

  const handleAISuggestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/visual-editor/analyse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editableContent }),
      });
      const data = await res.json();
      setAiSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Erreur IA:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/visual-editor/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: currentPage, content: editableContent }),
      });
      alert('✅ Modifications enregistrées');
    } catch (error) {
      alert('❌ Échec sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-800"
        onClick={() => setShowPanel(!showPanel)}
      >
        <FaPaintBrush /> Visuel AI
      </button>

      {showPanel && (
        <div className="gabkut-editor-panel">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FaMagic /> Éditeur Visuel IA</h2>

          <textarea
            className="w-full p-2 border rounded mb-3 text-sm"
            rows={5}
            value={editableContent.text || ''}
            onChange={(e) =>
              setEditableContent({ ...editableContent, text: e.target.value })
            }
          />

          <button
            className="bg-purple-600 text-white px-3 py-1 rounded mb-2 flex items-center gap-1"
            onClick={handleAISuggestions}
            disabled={loading}
          >
            <FaRobot /> {loading ? 'Analyse...' : 'Suggestion IA'}
          </button>

          {aiSuggestions.length > 0 && (
            <ul className="bg-white border p-2 rounded mb-3 text-sm">
              {aiSuggestions.map((s, i) => (
                <li key={i} className="mb-1">👉 {s}</li>
              ))}
            </ul>
          )}

          <button
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={handleSave}
            disabled={loading}
          >
            <FaSave /> {loading ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GabkutVisualEditorAI;
