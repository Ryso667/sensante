"use client";

import { useEffect, useState } from "react";
import PatientForm from "@/components/PatientForm";

interface Patient {
  id: string;        // ✅ corrigé : string (cuid) pas number
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  region: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  async function chargerPatients() {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
    setLoading(false);
  }

  useEffect(() => {
    chargerPatients();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <p className="font-bold text-gray-800">
                {p.prenom} {p.nom}
              </p>
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