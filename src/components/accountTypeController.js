const AccountType = require('../models/AccountType');

// ➕ Créer un type de compte
exports.createAccountType = async (req, res) => {
  try {
    // Validation simple : vous pouvez ajouter Joi ou autre pour validation plus poussée
    if (!req.body.nom || !req.body.description || req.body.fraisMensuel === undefined) {
      return res.status(400).json({ message: 'Champs obligatoires manquants.' });
    }

    const nouveauType = new AccountType(req.body);
    await nouveauType.save();
    res.status(201).json(nouveauType);
  } catch (err) {
    console.error('Erreur création type compte :', err);
    // Gestion spécifique des erreurs de doublon (unique)
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Nom de type déjà utilisé.' });
    }
    res.status(500).json({ message: err.message });
  }
};

// 📄 Voir tous les types de comptes
exports.getAllAccountTypes = async (req, res) => {
  try {
    const types = await AccountType.find().sort({ dateAjout: -1 });
    res.status(200).json(types);
  } catch (err) {
    console.error('Erreur récupération types comptes :', err);
    res.status(500).json({ message: err.message });
  }
};

// 🛠️ Modifier un type
exports.updateAccountType = async (req, res) => {
  try {
    const updated = await AccountType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true // Assure que les validations du schéma sont appliquées
    });

    if (!updated) {
      return res.status(404).json({ message: 'Type de compte non trouvé.' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error('Erreur mise à jour type compte :', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalide.' });
    }
    res.status(500).json({ message: err.message });
  }
};

// ❌ Supprimer un type
exports.deleteAccountType = async (req, res) => {
  try {
    const deleted = await AccountType.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Type de compte non trouvé.' });
    }

    res.status(200).json({ message: 'Type supprimé.' });
  } catch (err) {
    console.error('Erreur suppression type compte :', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'ID invalide.' });
    }
    res.status(500).json({ message: err.message });
  }
};
