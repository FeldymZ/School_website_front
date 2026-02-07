import {
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Grip,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchPublicActivites } from "@/services/activitePublicService";
import type { ActivitePublic } from "@/types/activitePublic";
import { resolveMediaUrl } from "@/utils/media";

export default function ActivitesPublicList() {
  const [activites, setActivites] = useState<ActivitePublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchPublicActivites()
      .then(setActivites)
      .catch(() =>
        setError("Impossible de charger les activités")
      )
      .finally(() => setLoading(false));
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 py-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 border-4 border-[#00A4E0] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-xl font-bold text-gray-700">
            Chargement des activités...
          </p>
          <p className="text-sm text-gray-500">
            Veuillez patienter
          </p>
        </div>
      </section>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 py-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="relative overflow-hidden bg-white rounded-3xl p-12 shadow-2xl border-2 border-red-100 space-y-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 opacity-50" />

            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl blur-2xl opacity-40 animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <AlertCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <div className="relative text-center space-y-3">
              <h3 className="text-3xl font-black text-gray-900">
                Oups ! Une erreur est survenue
              </h3>
              <p className="text-gray-600 text-lg">
                {error}
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white
                         rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50
                         hover:scale-105 active:scale-95 transition-all duration-300
                         flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Sparkles size={20} />
              <span className="relative">Réessayer</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ================= RENDER ================= */
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 pt-6 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✨ HEADER AVEC ICÔNE ET TEXTE BLEU */}
        <div className="mb-12 text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-2xl flex items-center justify-center shadow-lg">
              <Grip className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#00A4E0]">
              Toutes nos activités
            </h1>
          </div>
          <div className="h-[2px] w-32 bg-[#00A4E0]" />
        </div>

        {activites.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-2xl">
            <h3 className="text-3xl font-black text-gray-900">
              Aucune activité disponible
            </h3>
            <p className="text-gray-600 text-lg mt-3">
              Les activités étudiantes seront bientôt disponibles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activites.map((activite) => {
              const image = activite.medias.find(
                (m) => m.type === "IMAGE"
              );

              return (
                <div
                  key={activite.id}
                  className="group bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden flex flex-col hover:border-[#00A4E0] transition"
                >
                  <div className="h-56 overflow-hidden bg-gray-100">
                    {image ? (
                      <img
                        src={resolveMediaUrl(image.url)}
                        alt={activite.titre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <ImageIcon className="text-gray-400 w-16 h-16" />
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      {activite.titre}
                    </h2>

                    <Link
                      to={`/activites/${activite.slug}`}
                      className="mt-auto inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl
                                 text-sm font-bold text-white bg-gradient-to-r from-[#00A4E0] to-[#0077A8]"
                    >
                      En savoir plus
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
