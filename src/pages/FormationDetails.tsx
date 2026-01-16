import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveMediaUrl } from "@/utils/media";
import { fetchFormationDetails } from "@/services/formationService";
import type { FormationDetails } from "@/types/formation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Download } from "lucide-react";

import "swiper/css";

export default function FormationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [formation, setFormation] = useState<FormationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchFormationDetails(Number(id))
      .then(setFormation)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!formation || !formation.galleryImages?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl font-normal">
          Formation introuvable
        </p>
      </div>
    );
  }

  const heroImage = formation.galleryImages[0];
  const sliderImages = formation.galleryImages.slice(1);

  /* ================= PARSE DESCRIPTION ================= */
  const parseDescription = () => {
    const text = formation.description;
    const sections: Array<{
      type: "paragraph" | "title" | "list";
      content: string | string[];
    }> = [];

    const parts = text.split(
      /(?=[A-ZÀÉÈÊ][\wàâäéèêëïîôùûüÿç\s'-]*\?)/
    );

    parts.forEach((part) => {
      const lines = part.trim().split(/(?:👉|•)/);

      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.includes("?")) {
          sections.push({ type: "title", content: trimmed });
        } else if (idx > 0 && lines.length > 1) {
          const clean = trimmed.replace(/^[•]\s*/, "");
          const last = sections[sections.length - 1];

          if (last?.type === "list" && Array.isArray(last.content)) {
            last.content.push(clean);
          } else {
            sections.push({ type: "list", content: [clean] });
          }
        } else {
          sections.push({ type: "paragraph", content: trimmed });
        }
      });
    });

    return sections;
  };

  const sections = parseDescription();

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <div className="relative h-[22rem] md:h-[26rem] lg:h-[30rem] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${resolveMediaUrl(heroImage)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-16">
          <h1 className="text-white font-normal leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl">
            {formation.title.split(" ").slice(0, 1).join(" ")} <br />
            {formation.title.split(" ").slice(1).join(" ")}
          </h1>
        </div>
      </div>

      {/* ================= CONTENU ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ===== TEXTE GAUCHE ===== */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8 md:p-10 space-y-6">
            {sections.map((section, idx) => {
              if (section.type === "title") {
                return (
                  <h2
                    key={idx}
                    className="font-normal text-xl text-gray-900 mt-8 first:mt-0"
                  >
                    {section.content as string}
                  </h2>
                );
              }

              if (section.type === "paragraph") {
                return (
                  <p
                    key={idx}
                    className="text-gray-700 text-base md:text-lg leading-relaxed font-bold"
                  >
                    {section.content as string}
                  </p>
                );
              }

              if (section.type === "list") {
                return (
                  <ul key={idx} className="space-y-3">
                    {(section.content as string[]).map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-yellow-500 font-normal">●</span>
                        <span className="text-gray-700 text-base md:text-lg font-bold">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>

          {/* ===== COLONNE DROITE ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* ===== SLIDER IMAGE GRAND ===== */}
            {sliderImages.length > 0 && (
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  loop
                  className="w-full h-[360px] md:h-[420px] lg:h-[460px]"
                >
                  {sliderImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={resolveMediaUrl(img)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* ===== CTA SOUS LES IMAGES ===== */}
            {formation.pdfUrl && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-5">
                <h3 className="text-2xl font-normal text-gray-900">
                  Et maintenant ?
                </h3>

                <p className="text-gray-600 text-base leading-relaxed font-bold">
                  Téléchargez la maquette pour découvrir le programme complet
                  ainsi que le coût de la scolarité.
                </p>

                <a
                  href={resolveMediaUrl(formation.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-3
                    w-full px-8 py-4 rounded-xl
                    font-normal text-base text-white
                    shadow-lg
                    hover:shadow-2xl
                    hover:scale-[1.03]
                    transition-all duration-300
                  "
                  style={{
                    backgroundColor: '#00A4E0',

                  }}
                >
                  <Download size={22} />
                  Télécharger la maquette
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
