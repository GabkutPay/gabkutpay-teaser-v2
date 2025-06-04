const mongoose = require('mongoose');

const accountTypeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,    // Assure que chaque nom de type de compte est unique
    trim: true       // Supprime les espaces en début et fin de chaîne
  },
  description: {
    type: String,
    required: true   // Description obligatoire pour expliquer le type de compte
  },
  fraisMensuel: {
    type: Number,
    required: true,  // Frais mensuels obligatoires (en unité monétaire)
    min: 0           // Empêche les valeurs négatives
  },
  cartesIncluses: {
    type: [String],  // Liste des cartes incluses (ex: ["Visa", "MasterCard", "Carte IA Proxy"])
    default: []
  },
  servicesInclus: {
    type: [String],  // Liste des services inclus (ex: ["Cashback", "Support IA", "Compte multi-devise"])
    default: []
  },
  actif: {
    type: Boolean,
    default: true    // Indique si ce type de compte est actif et disponible
  },
  dateAjout: {
    type: Date,
    default: Date.now // Date d'ajout du type de compte
  }
});

// Optionnel : index pour accélérer les recherches par nom
accountTypeSchema.index({ nom: 1 });

module.exports = mongoose.model('AccountType', accountTypeSchema);
