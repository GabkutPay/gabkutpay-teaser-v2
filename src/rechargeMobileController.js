const RechargeMobile = require('../models/RechargeMobile');
const User = require('../models/User');

// 🔁 Recharge classique
exports.effectuerRechargeMobile = async (req, res) => {
  const { numero, operateur, montant } = req.body;
  const userId = req.user.id;

  if (!numero || !operateur || !montant) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.solde < montant) {
      return res.status(400).json({ message: 'Solde insuffisant.' });
    }

    // Déduction du solde
    user.solde -= montant;
    await user.save();

    // Création de la recharge
    const recharge = await RechargeMobile.create({
      user: userId,
      numero,
      operateur,
      montant,
      statut: 'succès', // par défaut ici, peut devenir "en attente" si API plus tard
    });

    res.status(200).json({ message: 'Recharge effectuée avec succès ✅', recharge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
