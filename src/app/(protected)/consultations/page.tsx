"use client";
import { useEffect, useState } from "react";
import ConsultationCard from "@/components/ConsultationCard";
import DiagnosticIA from "@/components/DiagnosticIA";

interface Consultation {
  id: number;
  date: string;
  symptomes: string;
  notes: string | null;
  statut: "en_attente" | "termine";
  diagnosticIa: string | null;
  confiance: number | null;
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
    if (res.ok && Array.isArray(data)) {
      setConsultations(data);
    } else {
      setConsultations([]);
      console.error("Erreur API:", data);
    }
    setLoading(false);
  }

  useEffect(() => {
    charger();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Consultations</h1>
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : consultations.length === 0 ? (
        <p className="text-gray-500">Aucune consultation enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <div key={c.id}>
              <ConsultationCard
                patient={`${c.patient.prenom} ${c.patient.nom}`}
                date={`${c.patient.region} — ${new Date(c.date).toLocaleDateString("fr-FR")}`}
                symptomes={c.symptomes}
                statut={c.statut}
              />
              <DiagnosticIA
                consultationId={c.id}
                diagnosticExistant={c.diagnosticIa}
                confianceExistante={c.confiance}
                onDiagnostic={charger}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
