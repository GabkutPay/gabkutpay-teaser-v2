let timeoutId;
let warningId;

export const setupInactivityWatcher = (onTimeout, showWarning) => {
  const resetTimer = () => {
    clearTimeout(timeoutId);
    clearTimeout(warningId);

    // ⏳ Avertissement après 50 sec
    warningId = setTimeout(() => {
      const audio = new Audio('/alert-sound.mp3');
      audio.play().catch(err => console.warn("🔇 Erreur son :", err));

      if (typeof showWarning === "function") showWarning();
    }, 50000);

    // 🔒 Déconnexion après 60 sec
    timeoutId = setTimeout(() => {
      if (typeof onTimeout === "function") onTimeout();
    }, 60000);
  };

  const events = ["mousemove", "mousedown", "keypress", "touchstart"];
  events.forEach(evt => window.addEventListener(evt, resetTimer));
  resetTimer();
};
