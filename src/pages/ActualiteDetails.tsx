import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchActualiteDetails } from "@/services/actualiteService";
import type { ActualiteDetails } from "@/types/actualite";
import { resolveMediaUrl } from "@/utils/media";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Share2, ArrowLeft, Calendar } from "lucide-react";

import "swiper/css";

export default function ActualiteDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [actualite, setActualite] =
    useState<ActualiteDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchActualiteDetails(Number(id))
      .then(setActualite)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !actualite) {
    return null;
  }

  const publishedDate = new Date(actualite.publishedAt);

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* 🔙 RETOUR */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-secondary font-medium mb-4 hover:underline"
        >
          <ArrowLeft size={16} />
          Retour aux actualités
        </Link>

        {/* 📰 CARD */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* IMAGE PRINCIPALE */}
          <img
            src={resolveMediaUrl(actualite.coverImageUrl)}
            alt={actualite.title}
            className="w-full h-[320px] object-cover"
          />

          {/* CONTENU */}
          <div className="p-6 md:p-8 space-y-6">
            {/* META */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {publishedDate.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                à{" "}
                {publishedDate.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <button
                onClick={() =>
                  navigator.share?.({
                    title: actualite.title,
                    text: actualite.title,
                    url: window.location.href,
                  })
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/10 text-secondary hover:bg-secondary/20 transition"
              >
                <Share2 size={16} />
                Partager
              </button>
            </div>

            {/* TITRE */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {actualite.title}
            </h1>

            {/* TEXTE */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {actualite.content}
            </p>

            {/* INFO PUBLICATION */}
            <div className="bg-secondary/10 rounded-lg p-4 text-sm text-secondary">
              Publié le{" "}
              <strong>
                {publishedDate.toLocaleDateString("fr-FR")}
              </strong>
            </div>
          </div>

          {/* 🖼️ GALERIE (SI EXISTE) */}
          {actualite.galleryImages?.length > 0 && (
            <div className="px-6 pb-8">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3500 }}
                loop
                spaceBetween={16}
              >
                {actualite.galleryImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={resolveMediaUrl(img)}
                      alt=""
                      className="w-full h-[260px] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* 🔙 RETOUR ACCUEIL */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary/90 transition"
          >
            <ArrowLeft size={18} />
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
