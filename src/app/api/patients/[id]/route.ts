import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/patients/[id] → détail d'un patient
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const patient = await prisma.patient.findUnique({
      where: { id }
    })
    if (!patient) {
      return NextResponse.json(
        { error: 'Patient non trouvé' },
        { status: 404 }
      )
    }
    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du patient' },
      { status: 500 }
    )
  }
}

// PUT /api/patients/[id] → modifier un patient
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const patient = await prisma.patient.update({
      where: { id },
      data: {
        nom: body.nom,
        prenom: body.prenom,
        dateNaissance: new Date(
          body.dateNaissance ?? body.date_naissance
        ),
        sexe: body.sexe,
        telephone: body.telephone,
        adresse: body.adresse,
        region: body.region,
      }
    })
    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la modification du patient' },
      { status: 500 }
    )
  }
}