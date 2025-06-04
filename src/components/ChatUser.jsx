const fetchMessages = async () => {
  try {
    // Récupérer les messages de l'utilisateur
    const res = await axios.get(`/api/messages/user/${userId}`);
    setMessages(res.data);

    // ✅ Marquer les messages reçus comme lus (ceux envoyés par l'autre partie)
    await axios.put("/api/messages/mark-read", {
      userId,
      viewer: "user" // Ici, "user" est celui qui consulte les messages
    });
  } catch (err) {
    console.error("Erreur récupération messages :", err);
    // Vous pouvez aussi gérer une UI d'erreur ici si besoin
  }
};
