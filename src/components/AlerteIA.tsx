interface AlerteIAProps {
    diagnostic: string;
    confiance: number;
    niveau: "faible" | "moyen" | "urgent";
  }
  
  export default function AlerteIA({ diagnostic, confiance, niveau }: AlerteIAProps) {
    const styles = {
      faible: { borderColor: "#22c55e", backgroundColor: "#f0fdf4" },
      moyen:  { borderColor: "#f97316", backgroundColor: "#fff7ed" },
      urgent: { borderColor: "#ef4444", backgroundColor: "#fef2f2" },
    };
  
    return (
      <div style={{ ...styles[niveau], borderLeftWidth: "4px", borderLeftStyle: "solid" }}
           className="rounded-lg p-6">
        <h3 className="font-bold text-gray-800">Résultat IA</h3>
        <p className="mt-2 text-gray-700">{diagnostic}</p>
        <p className="text-sm text-gray-500 mt-1">Confiance : {confiance}%</p>
        <p className="text-xs text-gray-400 italic mt-3">
          Ceci n'est pas un diagnostic médical. Consultez un professionnel de santé.
        </p>
      </div>
    );
  }