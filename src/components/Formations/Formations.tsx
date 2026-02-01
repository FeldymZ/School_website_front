import { useEffect, useState } from "react";
import { GraduationCap, ArrowUpRight, Sparkles, Eye } from "lucide-react";
import { Formation, FormationLevel } from "@/types/formation";
import { fetchFormationsByLevel } from "@/services/formationService";
import { resolveMediaUrl } from "@/utils/media";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Formations() {
  const [level, setLevel] = useState<FormationLevel>("LICENCE");
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchFormationsByLevel(level);
        if (mounted) setFormations(data);
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
    <section className="relative w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= TITRE ================= */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <GraduationCap size={28} className="text-secondary animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Nos offres de <span className="text-secondary">formation</span>
            </h2>
            <Sparkles size={24} className="text-secondary animate-pulse" />
          </div>
          <div className="h-[2px] w-32 bg-[#1b5e7a] mx-auto" />
        </div>

        {/* ================= SWITCH NIVEAU ================= */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setLevel("LICENCE")}
              className={`
                px-8 py-4 rounded-xl font-bold transition-all duration-300
                ${
                  level === "LICENCE"
                    ? "bg-gradient-to-r from-[#1b5e7a] to-secondary text-white shadow-xl scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-[#1b5e7a]"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <GraduationCap size={20} />
                Licences
              </span>
            </button>

            <button
              onClick={() => setLevel("MASTER")}
              className={`
                px-8 py-4 rounded-xl font-bold transition-all duration-300
                ${
                  level === "MASTER"
                    ? "bg-gradient-to-r from-[#1b5e7a] to-secondary text-white shadow-xl scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-[#1b5e7a]"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <GraduationCap size={20} />
                Masters
              </span>
            </button>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-[380px] bg-gray-200 rounded-3xl" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={formations.length > 4}
              spaceBetween={32}
              breakpoints={{
                0: { slidesPerView: 1.1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="!pb-8"
            >
              {formations.map((f) => (
                <SwiperSlide key={f.id} className="!overflow-visible">
                  <FormationCard formation={f} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ================= CTA : VOIR TOUTES LES FORMATIONS ================= */}
            <div className="mt-12 flex justify-center">
              <Link
                to="/formationsList"
                className="
                  group inline-flex items-center gap-3
                  px-8 py-4 rounded-2xl
                  font-bold text-white
                  bg-gradient-to-r from-[#1b5e7a] to-secondary
                  shadow-lg
                  hover:shadow-2xl
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >
                <Eye size={20} />
                Voir toutes les formations
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ========================================================= */
/* =================== FORMATION CARD ====================== */
/* ========================================================= */

function FormationCard({ formation }: { formation: Formation }) {
  return (
    <Link to={`/formations/${formation.id}`} className="relative block group">
      <div className="
        relative h-[420px] rounded-3xl overflow-hidden
        shadow-xl hover:shadow-2xl
        transition-all duration-500 hover:-translate-y-2
      ">
        {/* IMAGE */}
        <img
          src={resolveMediaUrl(formation.coverImageUrl)}
          alt={formation.title}
          className="
            absolute inset-0 w-full h-full
            object-cover object-top
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* OVERLAY */}
        <div className="
          absolute inset-0
          bg-gradient-to-t
          from-black/80 via-black/40 to-black/30
        " />

        {/* ================= CENTRE ================= */}
        <div className="
          absolute inset-0 flex flex-col
          items-center justify-center
          text-center px-6
        ">
          <h3 className="
            text-white font-bold text-xl
            leading-snug mb-3 line-clamp-2
            group-hover:text-secondary transition-colors
          ">
            {formation.title}
          </h3>

          <span className="
            px-4 py-1.5 rounded-full
            bg-white/20 backdrop-blur-sm
            text-white text-xs font-semibold
            border border-white/30
          ">
            Programme
          </span>
        </div>

        {/* ================= BAS ================= */}
        <div className="
          absolute bottom-0 left-0 w-full
          p-6 flex items-center justify-between
        ">
          {/* NIVEAU */}
          <span className="
            px-4 py-2 rounded-full
            bg-secondary text-white
            text-xs font-bold tracking-wide
          ">
            {formation.level}
          </span>

          {/* ACTION */}
          <div className="
            w-12 h-12 rounded-full
            bg-gradient-to-r from-[#1b5e7a] to-secondary
            flex items-center justify-center
            shadow-lg
            group-hover:scale-110 group-hover:rotate-12
            transition-all duration-300
          ">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>

        {/* BORDURE */}
        <div className="
          absolute inset-0 rounded-3xl
          ring-2 ring-transparent
          group-hover:ring-secondary/50
          transition-all duration-300
        " />
      </div>
    </Link>
  );
}
