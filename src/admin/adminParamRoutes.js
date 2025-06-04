// routes/adminParamRoutes.js
const express = require('express');
const router = express.Router();
const ParametresSysteme = require('../models/ParametresSysteme');
const { protectAdmin } = require('../middlewares/authMiddleware');

// 🔹 GET : Récupérer les paramètres actuels
router.get('/tarifs', protectAdmin, async (req, res) => {
  try {
    const params = await ParametresSysteme.findOne();
    if (!params) {
      const defaut = await ParametresSysteme.create({});
      return res.json(defaut);
    }
    res.json(params);
  } catch (error) {
    res.status(500).json({ message: 'Erreur chargement paramètres' });
  }
});

// 🔸 POST : Modifier les paramètres dynamiques
router.post('/update-tarifs', protectAdmin, async (req, res) => {
  try {
    let params = await ParametresSysteme.findOne();
    if (!params) params = new ParametresSysteme();

    const anciens = {};

    // 🔁 Mise à jour dynamique
    for (let cle in req.body) {
      if (params[cle] !== undefined) {
        anciens[cle] = params[cle];              // sauvegarde ancienne valeur
        params[cle] = req.body[cle];             // met à jour
      }
    }

    params.modifiePar = req.admin._id;
    await params.save();

    res.json({
      message: '✅ Paramètres mis à jour avec succès.',
      modifications: {
        ancien: anciens,
        nouveau: req.body
      }
    });
  } catch (error) {
    res.status(500).json({ message: '❌ Échec mise à jour.' });
  }
});

module.exports = router;
