import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const FormulaireRetraitMobile = ({ userId }) => {
  const [form, setForm] = useState({ montant: '', numero: '', operateur: '' });
  const [promoActif, setPromoActif] = useState(null);
  const [dernierRetraitId, setDernierRetraitId] = useState(null); // Pour export PDF

  useEffect(() => {
    if (!userId) return;

    // 🔍 Chercher un code promo actif
    axios
      .get(`/api/user/promo-codes/${userId}`)
      .then((res) => {
        const codeValide = res.data.find((code) => !code.used);
        if (codeValide) setPromoActif(codeValide.code);
      })
      .catch((err) => console.error('Erreur promo:', err));
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const envoyer = async () => {
    try {
      const body = {
        ...form,
        userId,
        promoCode: promoActif || null,
      };

      const { data } = await axios.post('/api/operations/retrait-mobile-money', body);
      toast.success(data.message || 'Retrait effectué');

      if (data.transactionId) {
        setDernierRetraitId(data.transactionId); // Sauvegarde ID pour PDF
      }

      setForm({ montant: '', numero: '', operateur: '' });
      setPromoActif(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur serveur.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-4">📱 Retrait Mobile Money</h3>

      <div className="space-y-4">
        <Input
          name="numero"
          placeholder="Numéro mobile (ex: 0890000000)"
          value={form.numero}
          onChange={handleChange}
          required
        />
        <Input
          name="montant"
          type="number"
          placeholder="Montant à retirer"
          value={form.montant}
          onChange={handleChange}
          required
        />
        <select
          name="operateur"
          value={form.operateur}
          onChange={handleChange}
          className="bg-gray-700 p-2 w-full rounded text-white"
        >
          <option value="">Sélectionner l'opérateur</option>
          <option>Vodacom</option>
          <option>Airtel</option>
          <option>Orange</option>
          <option>Africell</option>
        </select>

        {promoActif && (
          <div className="bg-green-700 p-3 rounded-lg mt-2">
            🎁 <strong>Code promo appliqué :</strong> {promoActif} (frais -50%)
          </div>
        )}

        <Button onClick={envoyer} className="bg-blue-600 hover:bg-blue-700 w-full">
          Confirmer le retrait
        </Button>

        {dernierRetraitId && (
          <a
            href={`/api/retraits/pdf/${dernierRetraitId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-4 bg-gray-700 hover:bg-gray-600 p-2 rounded"
          >
            📄 Télécharger le reçu PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default FormulaireRetraitMobile;
