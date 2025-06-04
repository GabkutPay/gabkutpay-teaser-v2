const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const AccountType = require('../models/accountType'); // 🧠 Assure-toi que le modèle existe

const seedData = [
  {
    nom: 'Standard',
    description: 'Compte personnel sécurisé, adapté au quotidien',
    fraisMensuel: 2.7,
    cartesIncluses: ['Carte Visa Gabkut'],
    servicesInclus: ['Transactions courantes', 'IA assistant 24/7']
  },
  {
    nom: 'Standard (sans carte)',
    description: 'Version sans carte Visa, même services mais plus de liberté.',
    fraisMensuel: 5,
    cartesIncluses: [],
    servicesInclus: ['Transactions courantes', 'IA assistant']
  },
  {
    nom: 'Professionnel',
    description: 'Pour entrepreneurs, marchands, indépendants',
    fraisMensuel: 12,
    cartesIncluses: ['Carte Pro Gabkut'],
    servicesInclus: ['Paiement client', 'Rapports', 'Suivi fiscal']
  },
  {
    nom: 'Institutionnel',
    description: 'Pour gouvernements, ONG, grandes entités',
    fraisMensuel: 25,
    cartesIncluses: ['Carte Institutionnelle'],
    servicesInclus: ['Suivi hiérarchisé', 'Comptes multi-agents']
  },
  {
    nom: 'VIP',
    description: 'Service Premium avec assistance personnalisée',
    fraisMensuel: 50,
    cartesIncluses: ['Carte Black VIP'],
    servicesInclus: ['Accès prioritaire', 'Cashback', 'Support IA renforcé']
  },
  {
    nom: 'Diaspora',
    description: 'Pour Congolais vivant à l’étranger',
    fraisMensuel: 15,
    cartesIncluses: ['Carte Diaspora'],
    servicesInclus: ['Transfert pays', 'Taux préférentiel', 'Multi-devises']
  },
  {
    nom: 'Élève',
    description: 'Compte éducatif pour jeunes élèves',
    fraisMensuel: 2,
    cartesIncluses: ['Carte Avenir'],
    servicesInclus: ['Épargne contrôlée', 'Tutos IA']
  },
  {
    nom: 'Étudiant',
    description: 'Pour étudiants en université ou école',
    fraisMensuel: 3,
    cartesIncluses: ['Carte Étudiant'],
    servicesInclus: ['Support éducation', 'Réductions spécifiques']
  },
  {
    nom: 'Avenir',
    description: 'Compte enfant 100% sous contrôle parental',
    fraisMensuel: 1.5,
    cartesIncluses: ['Mini carte digitale'],
    servicesInclus: ['Épargne surveillée', 'Sécurité renforcée']
  },
  {
    nom: 'Partagé',
    description: 'Pour familles ou projets communs',
    fraisMensuel: 10,
    cartesIncluses: ['Carte famille'],
    servicesInclus: ['Multi-utilisateurs', 'Limites personnalisées']
  },
  {
    nom: 'Voyage',
    description: 'Spécial pour voyageurs (billets, hôtels, visas)',
    fraisMensuel: 6.5,
    cartesIncluses: ['Carte Proxy IA'],
    servicesInclus: ['Réservations auto', 'Assurance intégrée']
  },
];

const seedAccountTypes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await AccountType.deleteMany({});
    await AccountType.insertMany(seedData);
    console.log('✅ Types de comptes Gabkut insérés avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur lors de l’injection :', err);
    process.exit(1);
  }
};

seedAccountTypes();
