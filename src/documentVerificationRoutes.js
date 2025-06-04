const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DocumentVerificationLog = require('../models/DocumentVerificationLog');

// 📥 GET /api/documents/verifier/:id
router.get('/verifier/:id', async (req, res) => {
  const { id } = req.params;

  // 📄 Chemin du fichier PDF
  const filePath = path.join(__dirname, '../pdfs', `GKP_${id}.pdf`);

  // 📌 Log automatique de la vérification
  try {
    // Vérifie si le document existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Document introuvable.' });
    }

    // Log
    const log = new DocumentVerificationLog({
      documentId: id,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    });
    await log.save();

    // Réponse simple (pour VerifierDocument.jsx)
    res.json({
      verified: true,
      id,
      lien: `/pdfs/GKP_${id}.pdf`,
    });

  } catch (err) {
    console.error('Erreur vérification document :', err);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
