import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

import {
  fetchActualiteBySlug,
  resolveActualiteSlugFromId,
} from "@/services/actualiteService";
import type { ActualiteDetails } from "@/types/actualite";
import { resolveMediaUrl } from "@/utils/media";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/* ================= HTML DISPLAY FIX ================= */
function formatActualiteHtmlForDisplay(html: string): string {
  if (!html) return "";

  return html.replace(
    /<p>\s*((?:•.*?<br>\s*)+)<\/p>/gs,
    (_: string, list: string) => {
      const items = list
        .split("<br>")
        .map((line) => line.replace("•", "").trim())
        .filter(Boolean);

      return `
        <ul>
          ${items.map((i) => `<li>${i}</li>`).join("")}
        </ul>
      `;
    }
  );
}

export default function ActualiteDetailsPage() {
  const { param } = useParams<{ param: string }>();
  const navigate = useNavigate();

  const [actualite, setActualite] =
    useState<ActualiteDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!param) return;

    // 🔁 CAS 1 : URL LEGACY /actualites/3
    if (/^\d+$/.test(param)) {
      resolveActualiteSlugFromId(Number(param))
        .then((slug) => {
          navigate(`/actualites/${slug}`, { replace: true });
        })
        .catch(() => {
          navigate("/actualites", { replace: true });
        });
      return;
    }

    // ✅ CAS 2 : URL MODERNE /actualites/{slug}
    fetchActualiteBySlug(param)
      .then(setActualite)
      .catch(() => navigate("/actualites", { replace: true }))
      .finally(() => setLoading(false));
  }, [param, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement…
      </div>
    );
  }

  if (!actualite) return null;

  const publishedDate = new Date(actualite.publishedAt);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          to="/actualites"
          className="mb-4 inline-flex items-center gap-2 text-sm text-secondary"
        >
          <ArrowLeft size={16} />
          Retour aux actualités
        </Link>

        <div className="rounded-2xl bg-white shadow-md overflow-hidden">
          {/* ================= IMAGE COVER ================= */}
          <div className="relative w-full h-[240px] md:h-[360px] lg:h-[480px]">
            <img
              src={resolveMediaUrl(actualite.coverImageUrl)}
              alt={actualite.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* ================= CONTENU ================= */}
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} />
              {publishedDate.toLocaleDateString("fr-FR")}
            </div>

            <h1 className="text-2xl font-extrabold">
              {actualite.title}
            </h1>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: formatActualiteHtmlForDisplay(
                  actualite.content
                ),
              }}
            />
          </div>

          {/* ================= GALLERY (NO CROP) ================= */}
          {actualite.galleryImages?.length > 0 && (
            <div className="px-6 pb-8">
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop
                spaceBetween={16}
              >
                {actualite.galleryImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="h-[260px] w-full rounded-xl bg-gray-100 flex items-center justify-center">
                      <img
                        src={resolveMediaUrl(img)}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
