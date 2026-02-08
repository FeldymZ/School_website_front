import {
  ArrowLeft,
  Image as ImageIcon,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchPublicActiviteBySlug } from "@/services/activitePublicService";
import type { ActivitePublic } from "@/types/activitePublic";
import { resolveMediaUrl } from "@/utils/media";

export default function ActivitePublicDetail() {
  /* ================= PARAMS ================= */
  const { slug } = useParams<{ slug: string }>();

  /* ================= STATE ================= */
  const [activite, setActivite] = useState<ActivitePublic | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!slug) return;

    fetchPublicActiviteBySlug(slug)
      .then(setActivite)
      .catch(() => setActivite(null));
  }, [slug]);

  /* ================= MEDIAS ================= */
  const images = activite?.medias.filter((m) => m.type === "IMAGE") || [];
  const video = activite?.medias.find((m) => m.type === "VIDEO");

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  /* ================= NAVIGATION SLIDER ================= */
  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  /* ================= LOADING ================= */
  if (!activite) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 py-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00A4E0] to-[#0077A8] rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 border-4 border-[#00A4E0] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-xl font-bold text-gray-700">
            Chargement de l'activité...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 py-10">
      <div className="mx-auto max-w-5xl px-4">
        {/* ================= RETOUR ================= */}
        <Link
          to="/activites"
          className="mb-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl
                     bg-white shadow-lg hover:shadow-xl border-2 border-gray-100
                     text-gray-700 font-semibold hover:border-[#00A4E0]
                     hover:scale-105 transition-all duration-300 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Retour aux activités</span>
        </Link>

        <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border-2 border-gray-100">
          {/* ================= SLIDER IMAGES ================= */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden group">
            {images.length > 0 ? (
              <>
                {/* Images */}
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={resolveMediaUrl(img.url)}
                      alt={`${activite.titre} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                ))}

                {/* Boutons de navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                                 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30
                                 backdrop-blur-sm flex items-center justify-center
                                 text-white hover:scale-110 transition-all duration-300"
                    >
                      <ChevronLeft size={28} />
                    </button>

                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                                 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30
                                 backdrop-blur-sm flex items-center justify-center
                                 text-white hover:scale-110 transition-all duration-300"
                    >
                      <ChevronRight size={28} />
                    </button>

                    {/* Indicateurs */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-white w-8"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={80} />
              </div>
            )}

            {/* Titre en overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-2xl">
                {activite.titre}
              </h1>
            </div>
          </div>

          {/* ================= CONTENU ================= */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Bouton vidéo */}
            {video && (
              <div className="flex justify-center">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                             bg-gradient-to-r from-[#00A4E0] to-[#0077A8] text-white font-bold text-lg
                             hover:shadow-2xl hover:shadow-blue-500/50
                             hover:scale-105 active:scale-95 transition-all duration-300
                             relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <Video size={22} className="relative z-10" />
                  <span className="relative z-10">Voir la vidéo</span>
                </button>
              </div>
            )}

            {/* Description */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: activite.contenu }}
            />
          </div>
        </div>
      </div>

      {/* ================= POPUP VIDÉO (CÔTÉ DROIT) ================= */}
      {isVideoOpen && video && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          onClick={() => setIsVideoOpen(false)}
        >
          {/* Panel vidéo qui slide depuis la droite */}
          <div
            className="absolute right-0 top-0 h-full w-full max-w-3xl bg-gray-900 shadow-2xl
                       animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Video size={24} className="text-[#00A4E0]" />
                Vidéo de l'activité
              </h2>

              <button
                onClick={() => setIsVideoOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                           flex items-center justify-center text-white
                           hover:scale-110 active:scale-95 transition-all duration-300 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* ================= VIDEO ================= */}
            <div className="p-6 h-[calc(100%-80px)] flex items-center justify-center">
              <div className="w-full h-full max-h-[80vh] rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <video
                  controls
                  autoPlay
                  src={resolveMediaUrl(video.url)}
                  className="w-full h-full bg-black"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
