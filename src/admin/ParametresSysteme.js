// models/ParametresSysteme.js
const mongoose = require('mongoose');

const ParametresSystemeSchema = new mongoose.Schema(
  {
    // 🧮 Frais financiers
    fraisEnvoi: { type: Number, default: 2.25 },     // %
    fraisRetrait: { type: Number, default: 1.5 },    // %
    fraisCarte: { type: Number, default: 5.0 },      // $ USD
    fraisPDF: { type: Number, default: 0.5 },        // Relevé PDF
    fraisVIPMensuel: { type: Number, default: 10.0 },// Abonnement VIP ($/mois)

    // 💱 Taux & conversions
    tauxConversion: { type: Number, default: 1.75 }, // %
    tauxChangeUSD_CDF: { type: Number, default: 2850 },

    // ⚠️ IA & sécurité
    seuilAlerteIA: { type: Number, default: 80 },    // Score mini pour alerte
    delaiChoixDeviseHeures: { type: Number, default: 72 },

    // 💰 Limites & conditions
    minEnvoi: { type: Number, default: 1.0 },        // USD
    plafondCarteClassic: { type: Number, default: 5000 },
    plafondCarteUltra: { type: Number, default: 999999 }, // Illimité

    // 🧾 Branding
    nomPlateforme: { type: String, default: "Gabkut Pay" },
    versionSysteme: { type: String, default: "1.0.0" },

    // 🔐 Audit
    modifiePar: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ParametresSysteme', ParametresSystemeSchema);
