import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id }
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const patient = await prisma.patient.update({
      where: { id: params.id },
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
    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la modification du patient' },
      { status: 500 }
    )
  }
}