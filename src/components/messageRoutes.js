// 🔍 Route admin : récupérer tous les messages avec utilisateur lié (email)
// GET /api/messages/all
router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ date: -1 }) // Tri par date décroissante (plus récent en premier)
      .populate('userId', 'email'); // Populate uniquement le champ email de l'utilisateur lié

    res.status(200).json(messages);
  } catch (err) {
    console.error('Erreur récupération globale des messages :', err);
    res.status(500).json({ message: "Erreur récupération globale." });
  }
});
