import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

const FormulaireInscription = ({ typeComptePrérempli = '' }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: () => {
      const saved = localStorage.getItem('inscriptionDraft');
      return saved ? JSON.parse(saved) : {};
    }
  });

  const [compte, setCompte] = useState(typeComptePrérempli || '');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeComptePrérempli) {
      setValue('typeCompte', typeComptePrérempli);
    }
  }, [typeComptePrérempli, setValue]);

  useEffect(() => {
    localStorage.setItem('inscriptionDraft', JSON.stringify(watch()));
  }, [watch]);

  const onSubmit = async (data) => {
    if (!captchaValid) {
      setMessage("Veuillez valider le CAPTCHA.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Inscription réussie !");
        reset();
        localStorage.removeItem('inscriptionDraft');
      } else {
        setMessage(result.message || 'Erreur lors de l’inscription.');
      }
    } catch (error) {
      setMessage("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleCaptcha = (value) => {
    setCaptchaValid(!!value);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8">
      <h2 className="text-2xl font-semibold mb-4">Créer un compte Gabkut</h2>

      {message && <div className="mb-4 text-red-600">{message}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("nom", { required: true })} className="input" placeholder="Nom complet" />
        {errors.nom && <p className="text-red-500">Ce champ est requis</p>}

        <input {...register("email", { required: true })} className="input" placeholder="Adresse email" />
        {errors.email && <p className="text-red-500">Ce champ est requis</p>}

        <input type="password" {...register("motDePasse", { required: true })} className="input" placeholder="Mot de passe" />
        {errors.motDePasse && <p className="text-red-500">Mot de passe requis</p>}

        <select
          {...register('typeCompte', { required: true })}
          value={compte}
          onChange={(e) => {
            setCompte(e.target.value);
            setValue('typeCompte', e.target.value);
          }}
          className="input"
        >
          <option value="">Type de compte</option>
          <option value="standard">Standard</option>
          <option value="professionnel">Professionnel</option>
          <option value="institutionnel">Institutionnel</option>
          <option value="VIP">VIP</option>
          <option value="diaspora">Diaspora</option>
          <option value="étudiant">Étudiant</option>
          <option value="élève">Élève</option>
          <option value="avenir">Avenir (enfant)</option>
          <option value="partagé">Compte partagé</option>
        </select>

        {/* Champs supplémentaires intelligents */}
        {compte === "professionnel" && (
          <>
            <input {...register("secteur")} className="input" placeholder="Secteur d'activité" />
            <input {...register("nomEntreprise")} className="input" placeholder="Nom de l’entreprise" />
          </>
        )}

        {compte === "institutionnel" && (
          <>
            <input {...register("ministere")} className="input" placeholder="Ministère ou institution" />
            <input {...register("matriculeInstitution")} className="input" placeholder="Matricule / Référence" />
          </>
        )}

        {compte === "VIP" && (
          <>
            <input {...register("codeInvitation")} className="input" placeholder="Code d’invitation VIP" />
          </>
        )}

        {compte === "diaspora" && (
          <>
            <input {...register("paysResidence")} className="input" placeholder="Pays de résidence" />
            <input {...register("ville")} className="input" placeholder="Ville" />
          </>
        )}

        {compte === "étudiant" && (
          <>
            <input {...register("universite")} className="input" placeholder="Université" />
            <input {...register("numEtudiant")} className="input" placeholder="Numéro étudiant" />
          </>
        )}

        {compte === "élève" && (
          <>
            <input {...register("ecole")} className="input" placeholder="École actuelle" />
            <input {...register("niveau")} className="input" placeholder="Niveau / classe" />
          </>
        )}

        {compte === "avenir" && (
          <>
            <input {...register("nomParent")} className="input" placeholder="Nom du parent" />
            <input {...register("relation")} className="input" placeholder="Lien avec l’enfant (ex. père, mère)" />
          </>
        )}

        {compte === "partagé" && (
          <>
            <input {...register("nomCreateur")} className="input" placeholder="Nom du créateur du compte" />
            <input {...register("nombreMembres")} className="input" placeholder="Nombre de membres" />
          </>
        )}

        <div className="my-4">
          <ReCAPTCHA
            sitekey="VOTRE_CLE_PUBLIC_RECAPTCHA"
            onChange={handleCaptcha}
          />
        </div>

        <button type="submit" className="btn bg-blue-700 text-white rounded-xl px-6 py-2" disabled={loading}>
          {loading ? 'Envoi...' : 'Créer un compte'}
        </button>
      </form>
    </div>
  );
};

export default FormulaireInscription;
