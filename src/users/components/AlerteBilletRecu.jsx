import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const AlerteBilletRecu = ({ reference, pdfUrl }) => (
  <Alert variant="success" className="mt-4 rounded-2xl shadow-md">
    <CheckCircle className="h-6 w-6 text-green-600" />
    <AlertTitle className="text-lg font-semibold">
      Billet d’avion reçu !
    </AlertTitle>
    <AlertDescription className="text-sm text-gray-700">
      Votre billet pour la commande <strong>{reference}</strong> a été traité avec succès.<br />
      📩 Une copie a été envoyée à votre adresse e-mail.
      <br />
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-sm font-medium text-blue-700 underline"
      >
        🔗 Ouvrir le billet PDF
      </a>
    </AlertDescription>
  </Alert>
);

export default AlerteBilletRecu;
