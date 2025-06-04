import React from "react";
import { Lock, Smartphone, Wifi, ShieldAlert } from "lucide-react";

const ServicesMobiles = () => {
  const connectDisponible = false; // ❌ On bloque seulement les unités + forfaits

  return (
    <div className="p-4 rounded-xl bg-white shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">📱 Achat Forfaits Mobiles & Crédits</h2>

      {connectDisponible === false && (
        <div className="bg-red-100 border border-red-300 rounded-md p-4 mb-5 flex items-start gap-3">
          <ShieldAlert className="text-red-500 mt-1" size={24} />
          <div>
            <p className="font-semibold text-red-700 flex items-center gap-2">
              🔒 Services temporairement verrouillés
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Les modules <strong>“Achat de crédits téléphoniques”</strong> et <strong>“Forfaits mobiles”</strong> sont momentanément indisponibles.
              Gabkut Pay attend l’intégration du système <strong>Connect Sentinel</strong> qui exécutera automatiquement les USSD via des <strong>SIM AGENT légales</strong>, 
              comme dans les cabines téléphoniques. Ces services ne sont pas ceux des opérateurs, mais un relai Gabkut autorisé.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🔒 Achat crédit téléphonique */}
        <div className="border p-4 rounded-xl bg-gray-50 shadow-inner flex items-center gap-4">
          <Smartphone className="text-gray-400" size={36} />
          <div>
            <p className="text-lg font-semibold">Achat de crédit</p>
            <p className="text-sm text-gray-500">
              {connectDisponible ? "Achetez du crédit pour tous les réseaux." : "Service verrouillé temporairement."}
            </p>
          </div>
          {!connectDisponible && <Lock className="ml-auto text-red-400" />}
        </div>

        {/* 🔒 Achat de forfaits mobiles */}
        <div className="border p-4 rounded-xl bg-gray-50 shadow-inner flex items-center gap-4">
          <Wifi className="text-gray-400" size={36} />
          <div>
            <p className="text-lg font-semibold">Achat de forfaits</p>
            <p className="text-sm text-gray-500">
              {connectDisponible ? "Internet, Appels, Mixtes..." : "Service verrouillé temporairement."}
            </p>
          </div>
          {!connectDisponible && <Lock className="ml-auto text-red-400" />}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6 text-center">
        ✅ Les services comme <strong>retraits</strong>, <strong>recharges</strong> et <strong>transferts</strong> restent entièrement fonctionnels.
      </div>
    </div>
  );
};

export default ServicesMobiles;
