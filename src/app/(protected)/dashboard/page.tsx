"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

interface Stats {
  kpi: {
    totalPatients: number;
    totalConsultations: number;
    consultationsTerminees: number;
    alertesUrgentes: number;
  };
  confianceMoyenne: number;
  diagnosticsCeMois: number;
  parUrgence: { urgence: string | null; total: number }[];
  parRegion: { region: string; total: number }[];
  parMois: { mois: string; total: number }[];
  dernieresAlertes: {
    id: string;
    patient: string;
    region: string;
    diagnostic: string | null;
    confiance: number | null;
    date: string;
  }[];
}

const COULEURS_PIE = [
  "#0088FE", "#00C49F", "#FFBB28",
  "#FF8042", "#8884D8", "#82CA9D",
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "ADMIN") {
      router.replace("/patients");
      return;
    }

    fetch("/api/stats")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger les statistiques.");
        }
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch(() => {
        setError("Erreur lors du chargement du dashboard.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, session, status]);

  if (status === "loading" || loading) {
    return <p className="text-gray-500">Chargement du dashboard...</p>;
  }
  if (!session || session.user.role !== "ADMIN") {
    return (
      <p className="text-red-600">
        Accès refusé: ce tableau de bord est réservé aux administrateurs.
      </p>
    );
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  if (!stats) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Tableau de bord
      </h1>

      {/* Zone 1 : KPI principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard titre="Patients"
          valeur={stats.kpi.totalPatients}
          unite="enregistrés"
          couleur="border-teal-500" />
        <StatCard titre="Consultations"
          valeur={stats.kpi.totalConsultations}
          unite="au total"
          couleur="border-orange-500" />
        <StatCard titre="Diagnostics IA"
          valeur={stats.kpi.consultationsTerminees}
          unite="terminés"
          couleur="border-purple-500" />
        <StatCard titre="Alertes"
          valeur={stats.kpi.alertesUrgentes}
          unite="urgentes"
          couleur="border-red-500" />
      </div>

      {/* Zone 2 : Métriques IA */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Métriques IA
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          titre="Confiance moyenne"
          valeur={stats.confianceMoyenne}
          unite="% de confiance"
          couleur="border-blue-500"
        />
        <StatCard
          titre="Diagnostics ce mois"
          valeur={stats.diagnosticsCeMois}
          unite="ce mois-ci"
          couleur="border-indigo-500"
        />
        <div className="bg-white rounded-lg shadow-md p-4 border-t-4 border-gray-300">
          <p className="text-sm text-gray-500 mb-2">Taux d&apos;urgence</p>
          <div className="flex justify-around">
            {["faible", "moyen", "urgent"].map((niveau) => {
              const found = stats.parUrgence.find(
                (u) => u.urgence === niveau
              );
              return (
                <div key={niveau} className="text-center">
                  <p className={`text-2xl font-bold ${
                    niveau === "urgent" ? "text-red-600" :
                    niveau === "moyen" ? "text-orange-500" :
                    "text-green-600"
                  }`}>
                    {found ? found.total : 0}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{niveau}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Zone 3 : Graphique barres */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Consultations par mois
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.parMois}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#E65100" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Zone 4 : Pie chart régions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Patients par région
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stats.parRegion}
                dataKey="total"
                nameKey="region"
                cx="50%" cy="50%"
                outerRadius={90}
                label>
                {stats.parRegion.map((_, i) => (
                  <Cell key={i}
                    fill={COULEURS_PIE[i % COULEURS_PIE.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone 5 : Derniers diagnostics IA */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Derniers diagnostics IA
        </h2>
        <div className="space-y-3">
          {stats.dernieresAlertes.length === 0 ? (
            <p className="text-gray-400 italic">
              Aucun diagnostic IA pour le moment.
            </p>
          ) : (
            stats.dernieresAlertes.map((a) => (
              <div key={a.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800">{a.patient}</p>
                  <p className="text-sm text-gray-500">
                    {a.region} —{" "}
                    {new Date(a.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-700">
                    {a.diagnostic
                      ? a.diagnostic.substring(0, 50) + "..."
                      : "—"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Confiance : {a.confiance ?? "—"}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}