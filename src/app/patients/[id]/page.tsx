'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Patient {
  id: string
  nom: string
  prenom: string
  date_naissance: string
  sexe: string
  telephone?: string
  adresse?: string
  region?: string
}

export default function PatientDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then(r => r.json())
      .then(data => {
        setPatient(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="p-6">Chargement...</div>
  if (!patient) return <div className="p-6">Patient non trouvé.</div>

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {patient.prenom} {patient.nom}
        </h1>
        <Link href={`/patients/${id}/modifier`}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          Modifier
        </Link>
      </div>

      <div className="border rounded-lg p-6 flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Sexe</span>
          <span>{patient.sexe === 'M' ? 'Masculin' : 'Féminin'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date de naissance</span>
          <span>{new Date(patient.date_naissance).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Téléphone</span>
          <span>{patient.telephone || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Adresse</span>
          <span>{patient.adresse || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Région</span>
          <span>{patient.region || '—'}</span>
        </div>
      </div>

      <button
        onClick={() => router.push('/patients')}
        className="mt-6 text-blue-600 hover:underline">
        ← Retour à la liste
      </button>
    </div>
  )
}