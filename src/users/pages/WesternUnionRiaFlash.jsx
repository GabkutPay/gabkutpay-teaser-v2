import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// 🗣️ Synthèse vocale
const parler = (texte) => {
  const synth = window.speechSynthesis;
  const voix = synth.getVoices().find(v => v.lang.startsWith('fr')) || synth.getVoices()[0];
  const utterance = new SpeechSynthesisUtterance(texte);
  utterance.voice = voix;
  synth.speak(utterance);
};

const WesternUnionRiaFlash = () => {
  const [ongletActif, setOngletActif] = useState('envoyer');
  const [formData, setFormData] = useState({
    nomDestinataire: '',
    pays: '',
    montant: '',
    operateur: 'Western Union',
    type: 'envoyer',
  });

  const [resumeVisible, setResumeVisible] = useState(false);
  const [promoCodeGenere, setPromoCodeGenere] = useState(null);
  const [detailsOperation, setDetailsOperation] = useState(null);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnglet = (val) => {
    setOngletActif(val);
    setFormData({ ...formData, type: val });
    setResumeVisible(false);
  };

  const envoyerFormulaire = async () => {
    try {
      const endpoint =
        formData.type === 'envoyer'
          ? '/api/operations/envoyer-transfert-agence'
          : '/api/operations/retirer-transfert-agence';

      const { data } = await axios.post(endpoint, formData);

      let generatedCode = null;
      if (formData.type === 'retirer') {
        generatedCode = `GKP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setPromoCodeGenere(generatedCode);
      }

      setDetailsOperation({ ...formData });
      setResumeVisible(true);

      const texte = `Opération réussie. ${formData.type === 'envoyer' ? 'Envoi' : 'Retrait'} de ${formData.montant} dollars pour ${formData.nomDestinataire} vers ${formData.pays} via ${formData.operateur}. ${
        generatedCode ? `Code promotionnel généré : ${generatedCode}` : ''
      }`;

      parler(texte);
      toast.success(data.message || 'Opération enregistrée');
      setFormData({ ...formData, montant: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur, réessayez.');
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Western Union / RIA / Flash / MoneyGram</h1>

      <Tabs value={ongletActif} onValueChange={handleOnglet} className="mb-6">
        <Tab value="envoyer">📤 Envoyer de l'argent</Tab>
        <Tab value="retirer">📥 Retirer de l'argent</Tab>
      </Tabs>

      <Card className="bg-gray-800 text-white shadow-lg rounded-2xl">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          <div className="flex flex-col gap-4">
            <label className="text-sm">Nom complet du destinataire</label>
            <Input
              type="text"
              name="nomDestinataire"
              value={formData.nomDestinataire}
              onChange={handleInput}
              placeholder="ex: John Doe"
              required
            />

            <label className="text-sm">Pays de destination</label>
            <Input
              type="text"
              name="pays"
              value={formData.pays}
              onChange={handleInput}
              placeholder="ex: France, Sénégal"
              required
            />

            <label className="text-sm">Montant (USD)</label>
            <Input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleInput}
              placeholder="ex: 150"
              required
            />

            <label className="text-sm">Opérateur</label>
            <select
              name="operateur"
              value={formData.operateur}
              onChange={handleInput}
              className="bg-gray-700 text-white p-2 rounded"
            >
              <option>Western Union</option>
              <option>RIA</option>
              <option>MoneyGram</option>
              <option>Flash</option>
            </select>

            <Button onClick={envoyerFormulaire} className="mt-4 bg-blue-600 hover:bg-blue-700">
              {ongletActif === 'envoyer' ? 'Envoyer' : 'Retirer'}
            </Button>
          </div>

          <div className="hidden sm:block">
            <img
              src="/images/transfer-agence.png"
              alt="Transfert agence"
              className="rounded-xl w-full h-auto shadow"
            />
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {resumeVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-green-700 p-6 rounded-xl shadow-lg text-white"
          >
            <h2 className="text-xl font-semibold mb-4">✅ Opération réussie</h2>
            <ul className="space-y-2">
              <li><strong>Type :</strong> {detailsOperation?.type === 'envoyer' ? 'Envoi' : 'Retrait'}</li>
              <li><strong>Nom :</strong> {detailsOperation?.nomDestinataire}</li>
              <li><strong>Pays :</strong> {detailsOperation?.pays}</li>
              <li><strong>Montant :</strong> {detailsOperation?.montant} USD</li>
              <li><strong>Opérateur :</strong> {detailsOperation?.operateur}</li>
              {promoCodeGenere && (
                <li>
                  <strong>🎁 Code Promo :</strong> {promoCodeGenere} <br />
                  <span className="text-sm">Utilisable une seule fois pour un retrait Mobile Money avec -50%</span>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WesternUnionRiaFlash;
