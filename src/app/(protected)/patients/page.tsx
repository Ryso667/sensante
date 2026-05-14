"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PatientForm from "@/components/PatientForm";

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  region: string;
}

function PatientsContent() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function chargerPatients() {
    try {
      setLoading(true);
      const res = await fetch("/api/patients");
      
      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setPatients(data);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des patients:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerPatients();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {error === "admin_only" && (
        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-800 rounded-r-lg shadow-sm flex items-center animate-in fade-in slide-in-from-top-2 duration-300">
          <svg className="h-5 w-5 mr-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-medium">
            Accès refusé : Seul l&apos;administrateur peut accéder au Tableau de bord.
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>

      <PatientForm onSuccess={chargerPatients} />

      <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
        Liste des patients ({patients.length})
      </h2>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">Aucun patient enregistré.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((p) => (
            <div key={p.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <p className="font-bold text-gray-800">{p.prenom} {p.nom}</p>
              <p className="text-sm text-gray-500">{p.region}</p>
              <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full mt-2 inline-block">
                {p.sexe === "F" ? "Femme" : "Homme"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PatientsPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <PatientsContent />
    </Suspense>
  );
}