export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-white">
      <div className="text-center p-8 border border-teal-100 rounded-2xl bg-white shadow-sm">
        {/* Titre principal */}
        <h1 className="text-6xl font-extrabold text-teal-700 mb-4 tracking-tight">
          SénSanté
        </h1>
        
        {/* Slogan du projet */}
        <p className="text-2xl text-gray-600 mb-10 font-medium">
          Assistant de santé communautaire avec IA
        </p>
        
        {/* Boutons d'action rapides (Bonus pour le Médecin) */}
        <div className="flex gap-4 justify-center mb-12">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all">
            Nouvelle Consultation
          </button>
          <button className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-all">
            Liste des Patients
          </button>
        </div>

        {/* Disclaimer Médical Obligatoire */}
        <div className="max-w-md mx-auto p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="text-sm text-amber-800 italic leading-relaxed">
            <strong>Avertissement :</strong> Ceci n'est pas un outil de diagnostic médical officiel. 
            Veuillez toujours consulter un professionnel de santé qualifié pour tout avis médical.
          </p>
        </div>
      </div>
      
      {/* Footer simple */}
      <footer className="absolute bottom-8 text-gray-400 text-sm">
        &copy; 2026 SénSanté - ESP/UCAD - Licence 3 GLSI
      </footer>
    </main>
  );
}
