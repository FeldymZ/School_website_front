import { useEffect, useState } from "react";
import { GraduationCap, ArrowUpRight, Sparkles } from "lucide-react";
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
      {/* 🌊 VAGUE AU-DESSUS */}
      <div className="absolute top-0 left-0 w-full -translate-y-full">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path"
            d="M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TITRE ================= */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap size={28} className="text-[#1b5e7a] animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Offres de <span className="text-[#1b5e7a]">formations</span>
            </h2>
            <Sparkles size={24} className="text-secondary animate-pulse" />
          </div>

          <div className="h-[2px] w-32 bg-[#1b5e7a] mx-auto mb-6" />

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Nous proposons des formations uniques et de très haut niveau dans les
            domaines de l'informatique, la cybersécurité, le développement Web et
            Mobile, l'archivage numérique et le big data.
          </p>
        </div>

        {/* ================= SWITCH NIVEAU ================= */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setLevel("LICENCE")}
              className={`
                relative px-8 py-4 rounded-xl font-bold text-base
                transition-all duration-300
                ${
                  level === "LICENCE"
                    ? "bg-gradient-to-r from-[#1b5e7a] to-secondary text-white shadow-xl scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-[#1b5e7a]"
                }
              `}
            >
              {level === "LICENCE" && (
                <span className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
              )}
              <span className="relative flex items-center gap-2">
                <GraduationCap size={20} />
                Nos Licences
              </span>
            </button>

            <button
              onClick={() => setLevel("MASTER")}
              className={`
                relative px-8 py-4 rounded-xl font-bold text-base
                transition-all duration-300
                ${
                  level === "MASTER"
                    ? "bg-gradient-to-r from-[#1b5e7a] to-secondary text-white shadow-xl scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-[#1b5e7a]"
                }
              `}
            >
              {level === "MASTER" && (
                <span className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
              )}
              <span className="relative flex items-center gap-2">
                <GraduationCap size={20} />
                Nos Masters
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
        )}
      </div>

      {/* 🌊 VAGUE EN BAS */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path"
            d="M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

/* ========================================================= */
/* =================== FORMATION CARD ====================== */
/* ========================================================= */

function FormationCard({ formation }: { formation: Formation }) {
  return (
    <Link
      to={`/formations/${formation.id}`}
      className="relative block group"
    >
      {/* CARTE PRINCIPALE */}
      <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* IMAGE */}
        <div className="absolute inset-0">
          <img
            src={resolveMediaUrl(formation.coverImageUrl)}
            alt={formation.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

        {/* CONTENU */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* TITRE */}
          <h3 className="text-white font-bold text-lg leading-tight mb-4 line-clamp-2 group-hover:text-secondary transition-colors">
            {formation.title}
          </h3>

          {/* BADGE + BOUTON */}
          <div className="flex items-center justify-between">
            {/* Badge niveau */}
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/30">
              Formation {formation.level}
            </span>

            {/* Bouton détail */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1b5e7a] to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <ArrowUpRight size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* BORDURE ANIMÉE */}
        <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-secondary/50 transition-all duration-300" />
      </div>
    </Link>
  );
}
