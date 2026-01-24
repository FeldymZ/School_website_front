import { useEffect, useState } from "react";
import { GraduationCap, Filter, ArrowRight } from "lucide-react";
import { Formation, FormationLevel } from "@/types/formation";
import { fetchFormationsByLevel } from "@/services/formationService";
import { resolveMediaUrl } from "@/utils/media";
import { Link } from "react-router-dom";

export default function FormationsList() {
  const [level, setLevel] = useState<FormationLevel | "ALL">("ALL");
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        if (level === "ALL") {
          const [licences, masters] = await Promise.all([
            fetchFormationsByLevel("LICENCE"),
            fetchFormationsByLevel("MASTER"),
          ]);
          if (mounted) setFormations([...licences, ...masters]);
        } else {
          const data = await fetchFormationsByLevel(level);
          if (mounted) setFormations(data);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [level]);

  return (
    <section className="w-full pt-5 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER + FILTRE ================= */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* TITRE */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary">
                <GraduationCap size={22} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1b5e7a]">
                Toutes nos formations
              </h1>
            </div>
          </div>

          {/* FILTRE */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-200 w-fit">
            <div className="bg-[#00a8e8] p-2 rounded-xl">
              <Filter size={18} className="text-white" />
            </div>

            <FilterButton active={level === "ALL"} onClick={() => setLevel("ALL")}>
              Toutes
            </FilterButton>

            <FilterButton
              active={level === "LICENCE"}
              onClick={() => setLevel("LICENCE")}
            >
              Licences
            </FilterButton>

            <FilterButton
              active={level === "MASTER"}
              onClick={() => setLevel("MASTER")}
            >
              Masters
            </FilterButton>
          </div>
        </div>

        {/* ================= COMPTEUR ================= */}
        {!loading && (
          <div className="mb-4">
            <p className="text-gray-500 font-medium">
              {formations.length} formation
              {formations.length > 1 ? "s" : ""} disponible
              {formations.length > 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* ================= LISTE ================= */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[380px] bg-white rounded-2xl shadow-md animate-pulse border border-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {formations.map((f) => (
              <FormationItem key={f.id} formation={f} />
            ))}
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && formations.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={40} className="text-gray-500" />
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Aucune formation disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ========================================================= */
/* =================== FORMATION ITEM ====================== */
/* ========================================================= */

function FormationItem({ formation }: { formation: Formation }) {
  return (
    <Link
      to={`/formations/${formation.id}`}
      className="
        group relative bg-white rounded-2xl overflow-hidden
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-2
        border border-gray-200
      "
    >
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`
            px-4 py-2 rounded-xl font-bold text-xs uppercase shadow-lg
            ${
              formation.level === "LICENCE"
                ? "bg-[#00a8e8] text-white"
                : "bg-[#003d5c] text-white"
            }
          `}
        >
          {formation.level}
        </span>
      </div>

      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={resolveMediaUrl(formation.coverImageUrl)}
          alt={formation.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-lg text-[#003d5c] line-clamp-2 min-h-[3.5rem] group-hover:text-[#00a8e8] transition-colors duration-300">
          {formation.title}
        </h3>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <span className="text-sm font-semibold text-gray-600">
            En savoir plus
          </span>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#00a8e8] transition-all duration-300">
            <ArrowRight
              size={16}
              className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ========================================================= */
/* =================== FILTRE BUTTON ======================= */
/* ========================================================= */

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-bold transition-all duration-300
        ${
          active
            ? "bg-[#00a8e8] text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
    >
      {children}
    </button>
  );
}
