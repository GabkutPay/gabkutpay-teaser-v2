import React from 'react';
import { motion } from 'framer-motion';

const TeaserFooterLanding = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-blue-900 text-white py-12 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* 📌 À propos */}
        <div>
          <h4 className="text-lg font-bold mb-4">🧭 À propos</h4>
          <p className="text-sm">
            Gabkut Pay est une fintech révolutionnaire née en Afrique, conçue pour libérer
            les utilisateurs de la dépendance des systèmes classiques. Notre mission : autonomie, dignité, et puissance financière.
          </p>
        </div>

        {/* 📞 Contact */}
        <div>
          <h4 className="text-lg font-bold mb-4">📞 Contact</h4>
          <ul className="text-sm space-y-1">
            <li>📧 Email : gabkutpayrdc@gmail.com</li>
            <li>📱 WhatsApp : +243822783500</li>
            <li>🌍 Site : www.gabkutpay.com</li>
          </ul>
        </div>

        {/* 🔗 Navigation */}
        <div>
          <h4 className="text-lg font-bold mb-4">🔗 Navigation</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#services" className="hover:underline">Nos services</a></li>
            <li><a href="#precommande" className="hover:underline">Précommander une carte</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
            <li><a href="#avis" className="hover:underline">Commentaires</a></li>
            <li><a href="#partenaires" className="hover:underline">Devenir partenaire</a></li>
          </ul>
        </div>

        {/* 🔒 Mentions */}
        <div>
          <h4 className="text-lg font-bold mb-4">🔒 Mentions</h4>
          <p className="text-sm">
            Tous droits réservés © Gabkut Pay 2025.<br />
            Plateforme sécurisée par IA. Certificat de conformité bancaire déposé.<br />
            Une initiative de Gaël Kutalakudima.
          </p>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-300">
        Conçu avec ❤️ à Kinshasa. Powered by Gabkut Technologies.
      </div>
    </motion.footer>
  );
};

export default TeaserFooterLanding;
