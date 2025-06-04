import React from 'react';

const comptes = [
  {
    nom: 'Standard',
    public: 'Particuliers',
    avantages: ['Carte Visa Gabkut', 'Wallet sécurisé', 'IA assistant 24h/24'],
    note: 'Équilibre parfait entre accessibilité et puissance.',
  },
  {
    nom: 'Professionnel',
    public: 'Entrepreneurs & commerçants',
    avantages: ['Gestion comptable', 'Paiements avancés', 'Carte pro'],
    note: 'Idéal pour ceux qui gèrent un business digitalisé.',
  },
  {
    nom: 'Institutionnel',
    public: 'Écoles, ONG, gouvernements',
    avantages: ['Accès multi-utilisateurs', 'Suivi financier', 'Contrôle hiérarchique'],
    note: 'Pour les grandes structures organisées.',
  },
  {
    nom: 'VIP',
    public: 'Clients privilégiés',
    avantages: ['Priorité IA', 'Cashback', 'Carte haut de gamme'],
    note: 'Confort ultime, service exclusif.',
  },
  {
    nom: 'Diaspora',
    public: 'Congolais de l’étranger',
    avantages: ['Envoi vers le pays', 'Taux préférentiel', 'Multi-devises'],
    note: 'La passerelle idéale pour aider la famille au pays.',
  },
  {
    nom: 'Élève',
    public: 'Enfants scolarisés',
    avantages: ['Carte Avenir', 'Dépenses limitées', 'Tutos éducatifs IA'],
    note: 'L’éducation financière dès le plus jeune âge.',
  },
  {
    nom: 'Étudiant',
    public: 'Universitaires',
    avantages: ['Carte Visa', 'Forfaits & réductions', 'Wallet éducation'],
    note: 'Pensé pour les campus connectés.',
  },
  {
    nom: 'Avenir (enfant)',
    public: 'Moins de 12 ans',
    avantages: ['Compte parent-épargne', 'Aucune transaction externe', 'Sécurité renforcée'],
    note: 'Planifier l’avenir en toute sérénité.',
  },
  {
    nom: 'Partagé',
    public: 'Familles ou amis',
    avantages: ['Accès multi-personnes', 'Niveaux de droits', 'Suivi commun'],
    note: 'Pour les comptes familiaux, projets ou tontines.',
  },
  {
    nom: 'Voyage',
    public: 'Grands voyageurs',
    avantages: ['Assurance voyage', 'Carte Proxy IA', 'Réservations automatiques'],
    note: 'Le compagnon digital de vos trajets.',
  },
];

const ComparateurComptes = () => {
  return (
    <main className="bg-gray-100 min-h-screen py-10 px-6">
      <h1
        className="text-4xl font-bold text-center text-blue-900 mb-6"
        tabIndex={0}
        aria-label="Comparatif des comptes Gabkut Pay"
      >
        🧾 Comparatif des comptes Gabkut Pay
      </h1>
      <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
        Tous les comptes Gabkut sont sans plafond. Vous choisissez selon votre{' '}
        <strong>profil</strong>, vos <strong>ambitions</strong>, vos <strong>projets</strong>. Chaque compte est une{' '}
        <strong>clé</strong> pour débloquer des services uniques dans la <strong>super-app Gabkut Pay</strong>.
      </p>

      <section
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto"
        aria-label="Liste des types de comptes Gabkut"
      >
        {comptes.map((cpt, i) => (
          <article
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-800"
            tabIndex={0}
            aria-labelledby={`compte-${i}-nom compte-${i}-public compte-${i}-note`}
          >
            <h2 id={`compte-${i}-nom`} className="text-2xl font-semibold text-blue-900 mb-2">
              {cpt.nom}
            </h2>
            <p id={`compte-${i}-public`} className="text-sm text-gray-500 mb-1">
              <strong>Pour :</strong> {cpt.public}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-2 text-sm">
              {cpt.avantages.map((a, j) => (
                <li key={j}>{a}</li>
              ))}
            </ul>
            <p id={`compte-${i}-note`} className="italic text-sm text-gray-500">
              {cpt.note}
            </p>
          </article>
        ))}
      </section>

      <footer className="mt-10 text-center">
        <p className="text-sm text-gray-600">Frais mensuels non affichés ici, variables selon profil.</p>
      </footer>
    </main>
  );
};

export default ComparateurComptes;
