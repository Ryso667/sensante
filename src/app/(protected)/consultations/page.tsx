"use client";
import { useEffect, useState } from "react";
import DiagnosticIA from "@/components/DiagnosticIA";
import ConsultationForm from "@/components/ConsultationForm";

interface Consultation {
  id: string;
  date: string;
  symptomes: string;
  diagnosticIa: string | null;
  confiance: number | null;
  statut: string;
  notes: string | null;
  patient: {
    nom: string;
    prenom: string;
    region: string;
  };
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  async function charger() {
    const res = await fetch("/api/consultations");
    const data = await res.json();
    setConsultations(data);
    setLoading(false);
  }

  useEffect(() => {
    charger();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Consultations</h1>

      {/* Formulaire pour ajouter une nouvelle consultation */}
      <ConsultationForm onSuccess={charger} />

      <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Historique ({consultations.length})
      </h2>

      {loading ? (
        <p className="text-gray-500 italic">Chargement des données...</p>
      ) : consultations.length === 0 ? (
        <p className="text-gray-500 italic">Aucune consultation enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div 
              key={c.id} 
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {c.patient.prenom} {c.patient.nom}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {c.patient.region} — {new Date(c.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  c.statut === "termine" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {c.statut === "termine" ? "Terminé" : "En attente"}
                </span>
              </div>

              {/* Affichage des symptômes */}
              <div className="flex flex-wrap gap-2 mt-3">
                {c.symptomes.split(", ").map((s, i) => (
                  <span 
                    key={i} 
                    className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Notes du médecin */}
              {c.notes && (
                <p className="text-sm text-gray-600 mt-3 italic">"{c.notes}"</p>
              )}

              <hr className="my-4 border-gray-100" />

              {/* SECTION IA : Affiche le résultat OU le bouton d'action */}
              {c.diagnosticIa ? (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-600 font-bold text-sm">Analyse de L'Oracle</span>
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded">
                      Confiance : {c.confiance}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {c.diagnosticIa}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2 italic">
                    Note : Ce diagnostic automatique est une aide à la décision et ne remplace pas l'avis d'un médecin.
                  </p>
                </div>
              ) : (
                <div className="mt-2">
                  <DiagnosticIA 
                    consultationId={c.id}
                    diagnosticExistant={c.diagnosticIa}
                    confianceExistante={c.confiance}
                    onDiagnostic={charger}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
