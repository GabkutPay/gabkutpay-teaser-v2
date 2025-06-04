// routes/visualEditorRoutes.js
const express = require('express');
const router = express.Router();
const VisualContent = require('../models/VisualContent');
const { protectAdmin } = require('../middlewares/authMiddleware');

// 📄 GET : Charger contenu par page
router.get('/:page', protectAdmin, async (req, res) => {
  try {
    const page = req.params.page.toLowerCase().trim();
    const content = await VisualContent.findOne({ page });
    res.json(content || { content: {} });
  } catch (error) {
    res.status(500).json({ message: 'Erreur chargement visuel' });
  }
});

// 💾 POST : Enregistrer les modifications
router.post('/save', protectAdmin, async (req, res) => {
  const { page, content } = req.body;
  try {
    const existing = await VisualContent.findOne({ page });
    if (existing) {
      existing.content = content;
      existing.updatedBy = req.admin._id;
      await existing.save();
    } else {
      await VisualContent.create({
        page,
        content,
        updatedBy: req.admin._id,
      });
    }
    res.json({ message: '✅ Contenu visuel enregistré' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur sauvegarde' });
  }
});

// 🤖 POST : Analyse IA (mock temporaire)
router.post('/analyse', protectAdmin, async (req, res) => {
  const { content } = req.body;
  const suggestions = [];

  if (content.text?.length < 50) {
    suggestions.push("🔍 Le texte est trop court pour capter l'attention.");
  }

  if (!content.text?.includes("Gabkut")) {
    suggestions.push("📌 Pensez à mentionner le nom de la plateforme pour plus de branding.");
  }

  suggestions.push("🎨 Une illustration ou animation serait bienvenue ici.");
  suggestions.push("✅ Ajoutez un bouton d'action (Call to Action) visible et attractif.");

  res.json({ suggestions });
});

module.exports = router;
