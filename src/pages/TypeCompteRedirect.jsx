import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const TypeCompteRedirect = ({ type }) => {
  const navigate = useNavigate();

  useEffect(() => {
    switch (type) {
      case 'professionnel':
        navigate('/inscription/professionnel');
        break;
      case 'institutionnel':
        navigate('/inscription/institutionnel');
        break;
      case 'VIP':
        navigate('/inscription/vip');
        break;
      case 'diaspora':
        navigate('/inscription/diaspora');
        break;
      case 'étudiant':
        navigate('/inscription/etudiant');
        break;
      case 'élève':
        navigate('/inscription/eleve');
        break;
      case 'avenir':
        navigate('/inscription/avenir');
        break;
      case 'partagé':
        navigate('/inscription/partage');
        break;
      default:
        navigate('/inscription/standard');
    }
  }, [type, navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-gray-700">
      Redirection vers le formulaire {type} en cours...
    </div>
  );
};

export default TypeCompteRedirect;
