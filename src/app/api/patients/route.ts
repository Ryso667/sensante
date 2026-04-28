import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GET : Lister les patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des patients" },
      { status: 500 }
    );
  }
}

// ✅ POST : Créer un patient
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const patient = await prisma.patient.create({
      data: {
        nom: body.nom,
        prenom: body.prenom,
        dateNaissance: new Date(body.dateNaissance),
        sexe: body.sexe,
        telephone: body.telephone || null,
        adresse: body.adresse || null,
        region: body.region,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du patient" },
      { status: 500 }
    );
  }
}