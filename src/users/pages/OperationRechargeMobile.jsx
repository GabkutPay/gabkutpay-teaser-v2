import React from "react";
import RechargeMobileForm from "../components/RechargeMobileForm";
import BlocageSiSuspendu from "../components/BlocageSiSuspendu";
import { useAuth } from "../context/AuthContext";

const OperationRechargeMobile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  return (
    <BlocageSiSuspendu isSuspended={user.proSubscription?.isActive === false}>
      <div className="p-6 bg-white shadow-xl max-w-3xl mx-auto mt-10 rounded-2xl">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">
          📲 Recharger un numéro mobile
        </h1>
        <RechargeMobileForm />
      </div>
    </BlocageSiSuspendu>
  );
};

export default OperationRechargeMobile;
