const express = require('express');
const router = express.Router();
const { effectuerRechargeMobile } = require('../controllers/rechargeMobileController');
const { verifyToken } = require('../middlewares/authMiddleware');

// 📱 Recharge crédit téléphonique (classique)
router.post('/', verifyToken, effectuerRechargeMobile);

module.exports = router;
