  import { useEffect, useState, useRef } from "react";
  import { TrendingUp, Users, Award, BookOpen, Building } from "lucide-react";
  import type { LucideIcon } from "lucide-react";
  import { fetchKeyFigures } from "@/services/keyFigureService";
  import type { KeyFigure } from "@/types/keyFigure";

  /* ========================================================= */
  /* ======================= ICONES ========================== */
  /* ========================================================= */

  const ICONS_MAP: Record<string, LucideIcon> = {
    etudiants: Users,
    formations: BookOpen,
    partenaires: Building,
    taux: TrendingUp,
    default: Award,
  };

  function getIcon(label: string): LucideIcon {
    const labelLower = label.toLowerCase();

    if (labelLower.includes("étudiant") || labelLower.includes("student")) {
      return ICONS_MAP.etudiants;
    } else if (labelLower.includes("formation") || labelLower.includes("program")) {
      return ICONS_MAP.formations;
    } else if (labelLower.includes("partenaire") || labelLower.includes("partner")) {
      return ICONS_MAP.partenaires;
    } else if (labelLower.includes("taux") || labelLower.includes("rate") || labelLower.includes("%")) {
      return ICONS_MAP.taux;
    }

    return ICONS_MAP.default;
  }

  /* ========================================================= */
  /* ======================= SECTION ========================= */
  /* ========================================================= */

  export default function KeyFigures() {
    const [figures, setFigures] = useState<KeyFigure[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    /* ===== FETCH API ===== */
    useEffect(() => {
      let mounted = true;

      fetchKeyFigures()
        .then((data) => {
          if (!mounted) return;

          const filtered = data
            .filter((f) => f.enabled)
            .sort((a, b) => a.displayOrder - b.displayOrder);

          setFigures(filtered);
        })
        .finally(() => mounted && setLoading(false));

      return () => {
        mounted = false;
      };
    }, []);

    /* ===== INTERSECTION OBSERVER ===== */
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    if (loading || figures.length === 0) return null;

    return (
      <section ref={sectionRef} className="relative w-full overflow-hidden">
        {/* 🌊 VAGUE HAUT */}
        <Wave position="top" />

        {/* 🌊 CONTENU */}
        <div className="relative bg-wave-gradient py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* TITRE */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp size={24} className="text-secondary animate-pulse" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Chiffres clés
                </h2>
                <TrendingUp size={24} className="text-secondary animate-pulse" />
              </div>
              <div className="h-[2px] w-32 bg-secondary mx-auto" />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {figures.map((figure, index) => {
                const IconComponent = getIcon(figure.label);

                return (
                  <div
                    key={figure.id}
                    className="group relative text-center"
                    style={{
                      animation: isVisible
                        ? `slideUp 0.6s ease-out ${index * 150}ms both`
                        : "none",
                    }}
                  >
                    {/* CARTE */}
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#1b5e7a]/10 overflow-hidden">

                      {/* CERCLE DÉCORATIF */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#1b5e7a]/10 to-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                      {/* ICÔNE */}
                      <div className="relative mb-4 flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1b5e7a] to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                          <IconComponent size={28} className="text-white" />
                        </div>
                      </div>

                      {/* VALEUR */}
                      <div className="relative text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-[#1b5e7a] to-secondary bg-clip-text text-transparent leading-none mb-3">
                        {figure.value}
                      </div>

                      {/* LABEL */}
                      <p className="relative text-sm md:text-base text-gray-700 font-semibold px-2">
                        {figure.label}
                      </p>

                      {/* BARRE DÉCORATIVE */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1b5e7a] via-secondary to-[#1b5e7a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🌊 VAGUE BAS */}
        <Wave position="bottom" />

        {/* ANIMATIONS */}
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    );
  }

  /* ========================================================= */
  /* ======================= WAVES =========================== */
  /* ========================================================= */

  function Wave({ position }: { position: "top" | "bottom" }) {
    const isTop = position === "top";

    return (
      <div
        className={`absolute ${
          isTop ? "top-0 -translate-y-full" : "bottom-0 translate-y-full"
        } left-0 w-full`}
      >
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path"
            fill="#eef9ff"
            d={
              isTop
                ? "M0,50 C440,10 580,50 820,30 C1060,10 1300,50 1540,30 L1540,0 L0,0 Z"
                : "M0,50 C440,50 580,10 820,30 C1060,50 1300,10 1540,30 L1540,60 L0,60 Z"
            }
          />
        </svg>
      </div>
    );
  }
