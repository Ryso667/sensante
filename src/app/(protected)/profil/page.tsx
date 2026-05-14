"use client";

import { useSession } from "next-auth/react";

export default function ProfilPage() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Mon Profil
        </h1>
        <p className="text-gray-500 mt-2">
          Gérez vos informations personnelles et vos préférences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card Gauche: Avatar & Stats */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <div className="inline-block p-1 rounded-full bg-white shadow-lg">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-teal-600">
                    {session.user?.name?.[0] || "U"}
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{session.user?.name}</h2>
              <p className="text-sm font-medium text-teal-600 uppercase tracking-wider">
                {session.user?.role || "Utilisateur"}
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {session.user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Droite: Détails */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Informations détaillées</h3>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Prénom & Nom
                  </label>
                  <p className="text-gray-900 font-medium">{session.user?.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Adresse Email
                  </label>
                  <p className="text-gray-900 font-medium">{session.user?.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Rôle Système
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                    {session.user?.role}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Statut du compte
                  </label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Actif
                  </span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
