import ConsultationCard from "@/components/ConsultationCard";
import DiagnosticIA from "@/components/DiagnosticIA";

export default function ConsultationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Consultations
      </h1>

      <div className="space-y-4">
        <ConsultationCard
          patient="Aminata Sow"
          date="18 mars 2025"
          symptomes="Fièvre, toux, fatigue"
          statut="termine"
        />
	<DiagnosticIA
          consultationId={c.id}
          diagnosticExistant={c.diagnosticIa}
          confianceExistante={c.confiance}
          onDiagnostic={charger}
         />

        <ConsultationCard
          patient="Ibrahima Ba"
          date="19 mars 2025"
          symptomes="Maux de tête, vertiges"
          statut="en_attente"
        />
	 <DiagnosticIA
          consultationId={c.id}
          diagnosticExistant={c.diagnosticIa}
          confianceExistante={c.confiance}
          onDiagnostic={charger}
         />

      </div>
    </div>
  );
}
