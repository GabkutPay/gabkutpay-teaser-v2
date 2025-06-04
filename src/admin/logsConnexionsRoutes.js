const express = require('express');
const router = express.Router();
const AdminLog = require('../models/AdminLog');

// Middleware d’authentification/admin (à implémenter selon votre système)
// Exemple simple :
// const authenticateAdmin = (req, res, next) => {
//   if (req.user && ['admin', 'superadmin'].includes(req.user.role)) {
//     return next();
//   }
//   return res.status(403).json({ message: 'Accès interdit' });
// };

// router.use(authenticateAdmin);

router.get('/logs-connexions', async (req, res) => {
  try {
    // Option pagination (exemple) :
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 100;
    // const skip = (page - 1) * limit;

    // Remplacez 'date' par 'timestamp' si votre schéma utilise ce champ
    const logs = await AdminLog.find()
      .sort({ date: -1 }) // tri décroissant par date
      // .skip(skip)
      // .limit(limit)
      .limit(500); // limite max 500 logs

    res.json(logs);
  } catch (err) {
    console.error("Erreur récupération logs connexions :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
