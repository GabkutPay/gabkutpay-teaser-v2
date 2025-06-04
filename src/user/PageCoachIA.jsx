import React from "react";
import CoachIABox from "./CoachIABox";
import { Link } from "react-router-dom";

const PageCoachIA = ({ userId }) => {
  return (
    <main className="p-6 max-w-5xl mx-auto" aria-label="Page Mon Coach Gabkut">
      <section className="bg-blue-900 text-white p-6 rounded-xl mb-6" aria-labelledby="coach-header">
        <h1 id="coach-header" className="text-2xl font-bold mb-2">
          🎓 Bienvenue dans Mon Coach Gabkut
        </h1>
        <p className="text-sm">
          Cet espace vous permet de renforcer vos connaissances financières grâce à des quiz intelligents et des explications personnalisées par IA.
        </p>
      </section>

      <CoachIABox userId={userId} />

      <nav className="text-center mt-10" aria-label="Navigation historique coach">
        <Link to="/coach/historique" className="text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          📚 Voir mon historique d’apprentissage
        </Link>
      </nav>
    </main>
  );
};

export default PageCoachIA;
