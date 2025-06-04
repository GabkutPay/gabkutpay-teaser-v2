import React, { useEffect, useRef, useState } from 'react';

const Dashboard = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(30); // 30s pour répondre
  const timeoutRef = useRef(null);
  const warningTimerRef = useRef(null);
  const soundRef = useRef(null);

  // 🔄 Réinitialiser le timer sur action utilisateur
  const resetTimer = () => {
    clearTimeout(timeoutRef.current);
    clearTimeout(warningTimerRef.current);
    setShowWarning(false);
    setCountdown(30);
    startTimer();
  };

  // ⏳ Démarrage du timer principal
  const startTimer = () => {
    timeoutRef.current = setTimeout(() => {
      // 🔔 Affiche l'avertissement
      setShowWarning(true);
      playSound();
      startWarningCountdown();
    }, 60000); // 60 secondes d'inactivité
  };

  // ⏰ Compte à rebours avant déconnexion
  const startWarningCountdown = () => {
    let remaining = 30;
    warningTimerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        logout();
      }
    }, 1000);
  };

  // 🔊 Lecture du son d'alerte
  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play().catch(() => {});
    }
  };

  // 🚪 Déconnexion automatique
  const logout = () => {
    clearInterval(warningTimerRef.current);
    alert('Déconnecté pour cause d’inactivité.');
    window.location.href = '/login'; // ou utilise ton système de déconnexion
  };

  // ✅ Rester en ligne
  const stayOnline = () => {
    resetTimer();
  };

  // 🧠 Surveillance des événements utilisateur
  useEffect(() => {
    startTimer();
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
      clearInterval(warningTimerRef.current);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Bienvenue sur le Dashboard Gabkut Pay</h1>

      {/* ⚠️ Message d’avertissement */}
      {showWarning && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg text-center max-w-sm">
            <h2 className="text-lg font-semibold mb-2">⏰ Inactivité détectée</h2>
            <p className="mb-4">Voulez-vous rester en ligne ?</p>
            <p className="text-red-600 font-bold text-xl mb-4">{countdown} secondes</p>
            <button
              onClick={stayOnline}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-xl"
            >
              Oui, je suis là !
            </button>
          </div>
        </div>
      )}

      {/* 🔊 Son d’alerte */}
      <audio ref={soundRef} src="/alert-sound.mp3" preload="auto" />
    </div>
  );
};

export default Dashboard;
