const fetchMessages = async () => {
  if (!userId) return; // Ne rien faire si userId absent ou vide

  try {
    // Récupérer les messages liés à l'utilisateur
    const res = await axios.get(`/api/messages/user/${userId}`);
    setMessages(res.data);

    // ✅ Marquer les messages reçus comme lus côté admin (messages envoyés par l'utilisateur)
    await axios.put("/api/messages/mark-read", {
      userId,
      viewer: "admin" // Ici, "admin" est celui qui consulte les messages
    });
  } catch (err) {
    console.error("Erreur récupération messages :", err);
    // Optionnel : afficher un message d'erreur à l'utilisateur ou gérer un état d'erreur
  }
};
