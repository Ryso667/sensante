'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NouveauPatient() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    sexe: 'M',
    telephone: '',
    adresse: '',
    region: ''
  })

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      router.push('/patients')
    } else {
      alert('Erreur lors de la création du patient')
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nouveau patient</h1>

      <div className="flex flex-col gap-4">
        <input
          placeholder="Nom *"
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, nom: e.target.value})}
        />
        <input
          placeholder="Prénom *"
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, prenom: e.target.value})}
        />
        <input
          type="date"
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, date_naissance: e.target.value})}
        />
        <select
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, sexe: e.target.value})}>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
        <input
          placeholder="Téléphone"
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, telephone: e.target.value})}
        />
        <input
          placeholder="Adresse"
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, adresse: e.target.value})}
        />
        <input
          placeholder="Région"
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, region: e.target.value})}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Enregistrement...' : 'Enregistrer le patient'}
        </button>
      </div>
    </div>
  )
}