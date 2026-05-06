'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ModifierPatient() {
  const { id } = useParams()
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

  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          nom: data.nom,
          prenom: data.prenom,
          date_naissance: data.date_naissance.split('T')[0],
          sexe: data.sexe,
          telephone: data.telephone || '',
          adresse: data.adresse || '',
          region: data.region || ''
        })
      })
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch(`/api/patients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      router.push(`/patients/${id}`)
    } else {
      alert('Erreur lors de la modification')
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier le patient</h1>

      <div className="flex flex-col gap-4">
        <input
          placeholder="Nom *"
          value={form.nom}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, nom: e.target.value})}
        />
        <input
          placeholder="Prénom *"
          value={form.prenom}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, prenom: e.target.value})}
        />
        <input
          type="date"
          value={form.date_naissance}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, date_naissance: e.target.value})}
        />
        <select
          value={form.sexe}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, sexe: e.target.value})}>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
        <input
          placeholder="Téléphone"
          value={form.telephone}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, telephone: e.target.value})}
        />
        <input
          placeholder="Adresse"
          value={form.adresse}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, adresse: e.target.value})}
        />
        <input
          placeholder="Région"
          value={form.region}
          className="border rounded-lg p-3"
          onChange={e => setForm({...form, region: e.target.value})}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Modification...' : 'Enregistrer les modifications'}
        </button>
      </div>
    </div>
  )
}