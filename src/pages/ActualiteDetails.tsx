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
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-4">
        {/* 🔙 RETOUR */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:underline"
        >
          <ArrowLeft size={16} />
          Retour aux actualités
        </Link>

        {/* 📰 CARTE PRINCIPALE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          {/* IMAGE PRINCIPALE */}
          <img
            src={resolveMediaUrl(actualite.coverImageUrl)}
            alt={actualite.title}
            className="h-[320px] w-full object-cover"
          />

          {/* CONTENU */}
          <div className="space-y-6 p-6 md:p-8">
            {/* MÉTADONNÉES */}
            <div className="flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
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
                className="inline-flex items-center gap-2 rounded-md bg-secondary/10 px-3 py-1.5 text-secondary transition hover:bg-secondary/20"
              >
                <Share2 size={16} />
                Partager
              </button>
            </div>

            {/* TITRE */}
            <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              {actualite.title}
            </h1>

            {/* TEXTE PRINCIPAL – PARAGRAPHES OK */}
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 md:text-lg">
              {actualite.content}
            </p>

            {/* INFO PUBLICATION */}
            <div className="rounded-lg bg-secondary/10 p-4 text-sm text-secondary">
              Publié le{" "}
              <strong>
                {publishedDate.toLocaleDateString("fr-FR")}
              </strong>
            </div>
          </div>

          {/* 🖼️ GALERIE */}
          {actualite.galleryImages?.length > 0 && (
            <div className="px-6 pb-8">
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop
                spaceBetween={16}
              >
                {actualite.galleryImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={resolveMediaUrl(img)}
                      alt=""
                      className="h-[260px] w-full rounded-xl object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* 🔙 RETOUR ACCUEIL */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition hover:bg-secondary/90"
          >
            <ArrowLeft size={18} />
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
