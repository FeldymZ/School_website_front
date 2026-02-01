import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, Calendar, Eye } from "lucide-react";

import { fetchActualites } from "@/services/actualiteService";
import type { Actualite } from "@/types/actualite";
import { resolveMediaUrl } from "@/utils/media";

type ActualiteWithContent = Actualite & {
  content?: string;
};

/* ================= TEXT EXCERPT FIX ================= */
function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "") // supprime balises
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(html?: string, length = 210): string {
  const text = stripHtml(html);
  return text.length > length
    ? text.slice(0, length).trim() + "…"
    : text;
}

export default function ActualitesList() {
  const [actualites, setActualites] = useState<ActualiteWithContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const list = await fetchActualites();
        const top3 = list.slice(0, 3);

        const detailed = await Promise.all(
          top3.map(async (item) => {
            const res = await fetch(
              `https://api-test.esiitech-gabon.com/api/public/actualites/${item.id}`
            );
            const data = await res.json();
            return { ...item, content: data.content };
          })
        );

        if (mounted) setActualites(detailed);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      {/* TITRE */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#00a8e8] p-3 rounded-xl">
            <Newspaper size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#00a8e8]">
            Actualités
          </h2>
        </div>
        <div className="h-[3px] w-32 bg-secondary" />
      </div>

      {loading ? (
        <p className="text-gray-500">Chargement…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualites.map((actu) => (
              <Link
                key={actu.id}
                to={`/actualites/${actu.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={resolveMediaUrl(actu.coverImageUrl)}
                    alt={actu.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 rounded-lg px-3 py-2 shadow">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={14} />
                      <span className="font-semibold">
                        {new Date(actu.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {actu.title}
                  </h3>

                  {/* TEXTE NETTOYÉ (PAS DE HTML) */}
                  <p className="text-sm text-gray-600">
                    {excerpt(actu.content)}
                  </p>

                  <div className="flex items-center gap-2 text-[#1b5e7a] font-semibold text-sm">
                    Lire la suite <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Link
              to="/actualites"
              className="flex items-center gap-2 px-4 py-3 border-2 border-[#1b5e7a] rounded-xl font-bold hover:bg-[#1b5e7a] hover:text-white transition"
            >
              <Eye size={15} />
              Voir toutes les actualités
              <ArrowRight size={15} />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
