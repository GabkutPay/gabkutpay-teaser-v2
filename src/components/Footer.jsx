import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-sm py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <div>
          <p className="font-semibold text-lg text-blue-200">
            Gabkut Pay — Plateforme conçue et développée par
          </p>
          <p className="text-xl font-bold text-white">Gaël KUTALAKUDIMA</p>
          <p className="text-gray-300">Fondateur & développeur de la plateforme</p>
        </div>

        <div className="text-gray-400">
          <p>📞 📱+243 822 783 500</p>
          <p>📞 📱+243 837 391 770</p>
          <p>📱 WhatsApp : +243 822 783 500 | +1 819 574-0506</p>
          <p>📧 Email : support@gabkutpay.com</p>
        </div>

        <div className="pt-4 border-t border-gray-700 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Gabkut Pay. Tous droits réservés.</p>
          <p className="text-xs mt-1">
            Les contenus, visuels et technologies de cette plateforme sont protégés.
          </p>
        </div>
      </div><div className="mt-6 text-xs text-gray-400 flex justify-center gap-4 underline">
  <a href="/mentions-legales" className="hover:text-white">Mentions légales</a>
  <a href="/cgu" className="hover:text-white">CGU</a>
  <a href="/confidentialite" className="hover:text-white">Confidentialité</a>
</div>
    </footer>
  );
};

export default Footer;
