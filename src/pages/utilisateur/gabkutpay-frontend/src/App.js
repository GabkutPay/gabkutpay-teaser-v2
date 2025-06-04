<Routes>
  {/* Pages publiques */}
  <Route path="/" element={...} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/services" element={<Services />} />
  <Route path="/formulaires" element={<Formulaires />} />
  <Route path="/assistance" element={<Assistance />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<About />} />

  {/* Utilisateur connecté */}
  <Route path="/dashboard" element={<DashboardUtilisateur />} />
  <Route path="/envoyer" element={<Envoyer />} />
  <Route path="/recharger" element={<Recharger />} />
  <Route path="/retirer" element={<Retirer />} />
  <Route path="/releves" element={<Releves />} />
  <Route path="/securite" element={<Securite />} />
  <Route path="/parametres" element={<Parametres />} />
</Routes>
