'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Patient {
  id: string
  nom: string
  prenom: string
  sexe: string
  telephone?: string
  region?: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/patients')
      .then(r => r.json())
      .then(data => {
        setPatients(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6">Chargement...</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Link href="/patients/nouveau"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nouveau patient
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-500">Aucun patient enregistré.</p>
      ) : (
        <div className="grid gap-4">
          {patients.map((p) => (
            <Link key={p.id} href={`/patients/${p.id}`}
              className="border rounded-lg p-4 hover:bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-medium">{p.prenom} {p.nom}</p>
                <p className="text-sm text-gray-500">{p.sexe === 'M' ? 'Masculin' : 'Féminin'}</p>
              </div>
              <span className="text-gray-400">{p.region}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}