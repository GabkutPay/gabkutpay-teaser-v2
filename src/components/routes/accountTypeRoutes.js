const express = require('express');
const router = express.Router();
const accountTypeController = require('../controllers/accountTypeController');
// const authMiddleware = require('../middleware/auth'); // Exemple d'authentification
// const adminMiddleware = require('../middleware/admin'); // Exemple de vérification de rôle admin

// ➕ Créer un type de compte
router.post(
  '/',
  /* authMiddleware, adminMiddleware, */ 
  accountTypeController.createAccountType
);

// 📄 Voir tous les types de comptes
router.get(
  '/',
  /* authMiddleware, adminMiddleware, */ 
  accountTypeController.getAllAccountTypes
);

// 🛠️ Modifier un type de compte
router.put(
  '/:id',
  /* authMiddleware, adminMiddleware, */ 
  accountTypeController.updateAccountType
);

// ❌ Supprimer un type de compte
router.delete(
  '/:id',
  /* authMiddleware, adminMiddleware, */ 
  accountTypeController.deleteAccountType
);

module.exports = router;
