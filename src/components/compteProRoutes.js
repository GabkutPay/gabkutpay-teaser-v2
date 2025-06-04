// Route publique pour création ouverte de compte professionnel
router.post("/creer", async (req, res) => {
  const {
    userId,
    nomEtablissement,
    identifiantPro,
    typeEtablissement = "autre",
    pays,
    ville,
    adresse,
    telephone,
    emailPro
  } = req.body;

  // Vérification des champs obligatoires
  if (!userId || !nomEtablissement || !identifiantPro) {
    return res.status(400).json({ message: "Champs obligatoires manquants : userId, nomEtablissement, identifiantPro." });
  }

  try {
    // Vérifier si l'identifiantPro est déjà utilisé
    const existe = await ComptePro.findOne({ identifiantPro });
    if (existe) {
      return res.status(409).json({ message: "Identifiant professionnel déjà utilisé." });
    }

    // Création du compte professionnel
    const compte = new ComptePro({
      userId,
      nomEtablissement,
      identifiantPro,
      typeEtablissement,
      pays,
      ville,
      adresse,
      telephone,
      emailPro,
      statut: "en_attente" // statut initial
    });

    await compte.save();

    res.status(201).json({ message: "Compte professionnel soumis avec succès.", compte });
  } catch (err) {
    console.error("Erreur compte pro :", err);
    res.status(500).json({ message: "Erreur lors de la soumission du compte professionnel." });
  }
});
