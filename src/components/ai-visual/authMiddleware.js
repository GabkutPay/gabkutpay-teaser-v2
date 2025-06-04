// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Token manquant ou invalide.' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || (admin.role !== 'adminPrincipal' && admin.role !== 'superadmin')) {
      return res.status(403).json({ message: 'Accès réservé au super administrateur.' });
    }

    req.admin = admin; // Ajout de l'admin dans la requête
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Échec d’authentification admin.' });
  }
};
