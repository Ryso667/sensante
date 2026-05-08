import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Non autorisé" },
      { status: 401 }
    );
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Accès réservé aux administrateurs" },
      { status: 403 }
    );
  }

  const totalPatients = await prisma.patient.count();
  const totalConsultations = await prisma.consultation.count();
  const consultationsTerminees = await prisma.consultation.count({
    where: { statut: "termine" },
  });
  const alertesUrgentes = await prisma.consultation.count({
    where: {
      statut: "termine",
      diagnosticIa: { not: null },
      confiance: { lt: 50 },
    },
  });

  // Confiance moyenne
  const confianceMoyenneResult = await prisma.consultation.aggregate({
    _avg: { confiance: true },
    where: { diagnosticIa: { not: null } },
  });
  const confianceMoyenne = Math.round(
    confianceMoyenneResult._avg.confiance || 0
  );

  // Répartition par niveau d'urgence déduit de la confiance IA.
  const consultationsAvecConfiance = await prisma.consultation.findMany({
    where: {
      statut: "termine",
      diagnosticIa: { not: null },
      confiance: { not: null },
    },
    select: { confiance: true },
  });
  const parUrgenceCount = consultationsAvecConfiance.reduce(
    (acc, c) => {
      const confiance = c.confiance ?? 0;
      if (confiance < 50) {
        acc.urgent += 1;
      } else if (confiance < 75) {
        acc.moyen += 1;
      } else {
        acc.faible += 1;
      }
      return acc;
    },
    { faible: 0, moyen: 0, urgent: 0 }
  );

  // Diagnostics ce mois
  const debutMois = new Date();
  debutMois.setDate(1);
  debutMois.setHours(0, 0, 0, 0);
  const diagnosticsCeMois = await prisma.consultation.count({
    where: {
      diagnosticIa: { not: null },
      createdAt: { gte: debutMois },
    },
  });

  const parRegion = await prisma.patient.groupBy({
    by: ["region"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  const sixMoisAgo = new Date();
  sixMoisAgo.setMonth(sixMoisAgo.getMonth() - 6);
  const consultationsRecentes = await prisma.consultation.findMany({
    where: { date: { gte: sixMoisAgo } },
    select: { date: true },
  });

  const parMois: Record<string, number> = {};
  const moisNoms = [
    "Jan", "Fév", "Mar", "Avr", "Mai",
    "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc",
  ];
  consultationsRecentes.forEach((c) => {
    const d = new Date(c.date);
    const key = `${moisNoms[d.getMonth()]} ${d.getFullYear()}`;
    parMois[key] = (parMois[key] || 0) + 1;
  });

  const dernieresAlertes = await prisma.consultation.findMany({
    where: {
      statut: "termine",
      diagnosticIa: { not: null },
    },
    include: { patient: true },
    orderBy: { date: "desc" },
    take: 5,
  });

  return NextResponse.json({
    kpi: {
      totalPatients,
      totalConsultations,
      consultationsTerminees,
      alertesUrgentes,
    },
    confianceMoyenne,
    diagnosticsCeMois,
    parUrgence: [
      { urgence: "faible", total: parUrgenceCount.faible },
      { urgence: "moyen", total: parUrgenceCount.moyen },
      { urgence: "urgent", total: parUrgenceCount.urgent },
    ],
    parRegion: parRegion.map((r) => ({
      region: r.region,
      total: r._count.id,
    })),
    parMois: Object.entries(parMois).map(
      ([mois, total]) => ({ mois, total })
    ),
    dernieresAlertes: dernieresAlertes.map((a) => ({
      id: a.id,
      patient: `${a.patient.prenom} ${a.patient.nom}`,
      region: a.patient.region,
      diagnostic: a.diagnosticIa,
      confiance: a.confiance,
      date: a.date,
    })),
  });
}