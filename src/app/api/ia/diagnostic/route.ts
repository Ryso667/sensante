import { prisma } from "@/lib/prisma";
import { analyserSymptomes } from "@/lib/groq";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1. Vérification de la session (Sécurité - Rôle du Bouclier)
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé. Veuillez vous connecter." },
      { status: 401 }
    );
  }

  try {
    const { consultationId } = await request.json();

    // 2. Récupérer la consultation avec les infos du patient
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

    // 3. Calcul de l'âge du patient (logique métier)
    const naissance = new Date(consultation.patient.dateNaissance);
    const age = new Date().getFullYear() - naissance.getFullYear();

    // 4. Appel au service Groq (L'Oracle)
    const resultat = await analyserSymptomes(
      {
        nom: consultation.patient.nom,
        prenom: consultation.patient.prenom,
        age: age,
        sexe: consultation.patient.sexe,
        region: consultation.patient.region,
      },
      consultation.symptomes as string[],
      consultation.notes
    );

    // 5. Mise à jour de la consultation dans la BDD
    const updated = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        diagnosticla: resultat.diagnostic,
        confiance: resultat.confiance,
        statut: "termine", // On marque la consultation comme traitée
      },
      include: { patient: true },
    });

    // 6. Retourner le résultat complet au front-end
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
