import React from "react";

const ContactButtons = () => {
  return (
    <div className="fixed bottom-20 right-5 flex flex-col space-y-3 z-50">
      {/* Bouton WhatsApp */}
      <a
        href="https://wa.me/243890000000?text=Bonjour%20Gabkut%20Pay%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm transition"
      >
        📱 WhatsApp
      </a>

      {/* Bouton Email */}
      <a
        href="mailto:gabkutpayrdc@gmail.com?subject=Demande%20d'informations%20Gabkut%20Pay"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg text-sm transition"
      >
        📧 Email
      </a>
    </div>
  );
};

export default ContactButtons;
