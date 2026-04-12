import { NextResponse } from 'next/server'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient()

// GET /api/patients → liste tous les patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(patients)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des patients' },
      { status: 500 }
    )
  }
}

// POST /api/patients → créer un nouveau patient
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const patient = await prisma.patient.create({
      data: {
        nom: body.nom,
        prenom: body.prenom,
        date_naissance: new Date(body.date_naissance),
        sexe: body.sexe,
        telephone: body.telephone,
        adresse: body.adresse,
        region: body.region,
      }
    })
    return NextResponse.json(patient, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création du patient' },
      { status: 500 }
    )
  }
}