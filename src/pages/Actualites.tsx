import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";

import { fetchActualites } from "@/services/actualiteService";
import type { Actualite } from "@/types/actualite";
import { resolveMediaUrl } from "@/utils/media";

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchActualites()
      .then((data) => {
        if (!mounted) return;
        setActualites(data);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-gray-50 pt-6 pb-20">

      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TITRE ================= */}
        <div className="mb-10 flex items-center gap-3">
          {/* ICÔNE EXACTE */}
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary">
            <Newspaper size={22} className="text-white" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#1b5e7a]">
            Toute l'actualité de l'ESIITech
          </h1>
        </div>

        {/* ================= CONTENU ================= */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse"
              >
                <div className="h-72 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : actualites.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              Aucune actualité disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((actu) => (
              <Link
                key={actu.id}
                to={`/actualites/${actu.id}`}
                className="
                  group
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  shadow-md
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={resolveMediaUrl(actu.coverImageUrl)}
                    alt={actu.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* DATE */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={14} className="text-[#1b5e7a]" />
                      <span className="font-semibold text-gray-700">
                        {new Date(actu.publishedAt).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TEXTE */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-4 group-hover:text-[#1b5e7a] transition-colors">
                    {actu.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[#1b5e7a] font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Lire la suite</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
