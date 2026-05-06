import ConsultationCard from "@/components/ConsultationCard";
import DiagnosticIA from "@/components/DiagnosticIA";

export default function ConsultationsPage() {
  const charger = () => {
    console.log("Rafraîchissement des données...");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Consultations
      </h1>

      <div className="space-y-4">
        {/* Première Consultation */}
        <div className="space-y-2">
          <ConsultationCard
            patient="Aminata Sow"
            date="18 mars 2025"
            symptomes="Fièvre, toux, fatigue"
            statut="termine"
          />
          <DiagnosticIA
            consultationId={1}
            diagnosticExistant={null}
            confianceExistante={null}
            onDiagnostic={charger}
          />
        </div>

        {/* Deuxième Consultation */}
        <div className="space-y-2">
          <ConsultationCard
            patient="Ibrahima Ba"
            date="19 mars 2025"
            symptomes="Maux de tête, vertiges"
            statut="en_attente"
          />
          <DiagnosticIA
            consultationId={2}
            diagnosticExistant={null}
            confianceExistante={null}
            onDiagnostic={charger}
          />
        </div>
      </div>
    </div>
  );
}
