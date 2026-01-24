import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Newspaper,
  Calendar,
  Filter,
  Search,
  X,
  ArrowUpDown,
} from "lucide-react";

import { fetchActualites } from "@/services/actualiteService";
import type { Actualite } from "@/types/actualite";
import { resolveMediaUrl } from "@/utils/media";

/* ========================================================= */
/* ==================== PAGE ACTUALITÉS ==================== */
/* ========================================================= */

type DateFilter =
  | "all"
  | "last_7_days"
  | "this_week"
  | "this_month"
  | "by_month";

type SortOrder = "desc" | "asc";

export default function Actualites() {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);

  /* Filtres */
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  /* ================= FETCH UNIQUE ================= */
  useEffect(() => {
    let cancelled = false;

    async function loadActualites() {
      try {
        const data = await fetchActualites();
        if (!cancelled) {
          setActualites(data);
        }
      } catch (error) {
        console.error("Erreur chargement actualités :", error);
        if (!cancelled) {
          setActualites([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadActualites();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ================= FILTRE + TRI + RECHERCHE ================= */
  const displayedActualites = useMemo(() => {
    const now = new Date();

    // Filtrage par date
    let filtered = actualites.filter((actu) => {
      const publishedDate = new Date(actu.publishedAt);

      switch (dateFilter) {
        case "last_7_days": {
          const limit = new Date();
          limit.setDate(now.getDate() - 7);
          return publishedDate >= limit;
        }

        case "this_week": {
          const firstDayOfWeek = new Date(now);
          firstDayOfWeek.setDate(now.getDate() - now.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);
          return publishedDate >= firstDayOfWeek;
        }

        case "this_month": {
          return (
            publishedDate.getMonth() === now.getMonth() &&
            publishedDate.getFullYear() === now.getFullYear()
          );
        }

        case "by_month": {
          return (
            publishedDate.getMonth() === selectedMonth &&
            publishedDate.getFullYear() === selectedYear
          );
        }

        case "all":
        default:
          return true;
      }
    });

    // Filtrage par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((actu) =>
        actu.title.toLowerCase().includes(query)
      );
    }

    // Tri par date
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [actualites, dateFilter, selectedMonth, selectedYear, searchQuery, sortOrder]);

  /* ================= RESET FILTRES ================= */
  const hasActiveFilters = dateFilter !== "all" || searchQuery.trim() !== "";

  const resetFilters = () => {
    setDateFilter("all");
    setSearchQuery("");
    setSelectedMonth(new Date().getMonth());
    setSelectedYear(new Date().getFullYear());
  };

  return (
    <section className="w-full bg-gray-50 pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TITRE ================= */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary">
            <Newspaper size={22} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1b5e7a]">
            Toute l'actualité de l'ESIITech
          </h1>
        </div>

        {/* ================= BARRE DE RECHERCHE ================= */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Rechercher une actualité..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-10 pr-10 py-3
                bg-white border border-gray-200 rounded-lg
                text-sm text-gray-700 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#1b5e7a]/20
                focus:border-[#1b5e7a]
                transition-all
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Effacer la recherche"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* ================= FILTRES & COMPTEUR ================= */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* FILTRES */}
          <div className="flex flex-wrap items-center gap-3">
            <Filter size={18} className="text-gray-500" />

            {/* FILTRE PRINCIPAL */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="
                px-4 py-2 bg-white border border-gray-200 rounded-lg
                text-sm font-medium text-gray-700
                hover:border-[#1b5e7a]
                focus:outline-none focus:ring-2
                focus:ring-[#1b5e7a]/20 focus:border-[#1b5e7a]
                transition-all cursor-pointer
              "
            >
              <option value="all">Toutes les périodes</option>
              <option value="last_7_days">7 derniers jours</option>
              <option value="this_week">Cette semaine</option>
              <option value="this_month">Ce mois-ci</option>
              <option value="by_month">Mois spécifique</option>
            </select>

            {/* MOIS & ANNÉE */}
            {dateFilter === "by_month" && (
              <>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#1b5e7a] focus:outline-none focus:ring-2 focus:ring-[#1b5e7a]/20 transition-all cursor-pointer"
                >
                  {Array.from({ length: 12 }).map((_, index) => (
                    <option key={index} value={index}>
                      {new Date(0, index).toLocaleString("fr-FR", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-[#1b5e7a] focus:outline-none focus:ring-2 focus:ring-[#1b5e7a]/20 transition-all cursor-pointer"
                >
                  {Array.from({ length: 5 }).map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </>
            )}

            {/* TRI */}
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="
                flex items-center gap-2 px-4 py-2
                bg-white border border-gray-200 rounded-lg
                text-sm font-medium text-gray-700
                hover:border-[#1b5e7a] hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[#1b5e7a]/20
                transition-all
              "
              title={sortOrder === "desc" ? "Plus récent d'abord" : "Plus ancien d'abord"}
            >
              <ArrowUpDown size={16} />
              <span className="hidden sm:inline">
                {sortOrder === "desc" ? "Récent → Ancien" : "Ancien → Récent"}
              </span>
            </button>

            {/* RESET */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="
                  flex items-center gap-2 px-4 py-2
                  bg-red-50 border border-red-200 rounded-lg
                  text-sm font-medium text-red-600
                  hover:bg-red-100 hover:border-red-300
                  focus:outline-none focus:ring-2 focus:ring-red-500/20
                  transition-all
                "
              >
                <X size={16} />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>

          {/* COMPTEUR */}
          {!loading && (
            <div className="text-sm text-gray-600 font-medium">
              {displayedActualites.length} actualité{displayedActualites.length > 1 ? "s" : ""}
              {hasActiveFilters && ` trouvée${displayedActualites.length > 1 ? "s" : ""}`}
            </div>
          )}
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
        ) : displayedActualites.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium mb-2">
              {searchQuery
                ? "Aucun résultat pour cette recherche"
                : "Aucune actualité pour cette période"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-4 text-sm text-[#1b5e7a] hover:underline font-medium"
              >
                Afficher toutes les actualités
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedActualites.map((actu) => (
              <Link
                key={actu.id}
                to={`/actualites/${actu.id}`}
                className="
                  group bg-white rounded-2xl overflow-hidden
                  shadow-md hover:shadow-2xl
                  transition-all duration-300 hover:-translate-y-1
                "
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={resolveMediaUrl(actu.coverImageUrl)}
                    alt={actu.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={14} className="text-[#1b5e7a]" />
                      <span className="font-semibold text-gray-700">
                        {new Date(actu.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

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
