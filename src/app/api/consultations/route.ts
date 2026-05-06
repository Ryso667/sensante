import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/consultations
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const consultations = await prisma.consultation.findMany({
      include: {
        patient: true,
        user: {
          select: {
            nom: true,
            prenom: true,
            role: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Erreur récupération consultations:", error);
    return NextResponse.json(
      {
        error: "Erreur serveur",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/consultations
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    console.log("Body reçu:", body);

    // Validation patientId
    if (!body.patientId) {
      return NextResponse.json(
        { error: "patientId est requis" },
        { status: 400 }
      );
    }

    // Validation symptomes
    if (!body.symptomes || body.symptomes.length === 0) {
      return NextResponse.json(
        { error: "Au moins un symptôme est requis" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    console.log("User trouvé:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        patientId: body.patientId,
        userId: user.id,
        symptomes: Array.isArray(body.symptomes)
          ? body.symptomes.join(", ")
          : body.symptomes,
        notes: body.notes || null,
        statut: "en_attente",
      },
      include: { patient: true },
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error("Erreur création consultation:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la création",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}