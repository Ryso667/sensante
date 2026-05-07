import { prisma } from "@/lib/prisma";
import { analyserSymptomes } from "@/lib/groq";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé. Veuillez vous connecter." },
      { status: 401 }
    );
  }

  try {
    const { consultationId } = await request.json();

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: { patient: true },
    });

    if (!consultation) {
      return NextResponse.json(
        { error: "Consultation introuvable" },
        { status: 404 }
      );
    }

    const naissance = new Date(consultation.patient.dateNaissance);
    const age = new Date().getFullYear() - naissance.getFullYear();

    const symptomesArray = typeof consultation.symptomes === "string"
      ? consultation.symptomes.split(",").map((s) => s.trim())
      : consultation.symptomes as string[];

    const resultat = await analyserSymptomes(
      {
        nom: consultation.patient.nom,
        prenom: consultation.patient.prenom,
        age: age,
        sexe: consultation.patient.sexe,
        region: consultation.patient.region,
      },
      symptomesArray,
      consultation.notes
    );

    const updated = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        diagnosticIa: resultat.diagnostic,
        confiance: resultat.confiance,
        statut: "termine",
      },
      include: { patient: true },
    });

    return NextResponse.json({
      ...resultat,
      consultation: updated,
    });

  } catch (error) {
    console.error("Erreur API Diagnostic:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse IA" },
      { status: 500 }
    );
  }
}
