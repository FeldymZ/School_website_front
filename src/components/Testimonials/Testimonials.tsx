import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { fetchCommentaires } from "@/services/commentaireService";
import type { Commentaire } from "@/types/commentaire";
import { resolveMediaUrl } from "@/utils/media";

import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const [items, setItems] = useState<Commentaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Commentaire | null>(null);

  useEffect(() => {
    fetchCommentaires()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-24 bg-gradient-to-br from-[#083a52] to-[#00a8e8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse text-center text-white">
            Chargement des témoignages...
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <>
      <section className="relative w-full py-24 overflow-hidden">
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
              fill="url(#gradient-testimonials)"
            />
            <defs>
              <linearGradient id="gradient-testimonials" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#083a52" />
                <stop offset="100%" stopColor="#00a8e8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* CONTAINER BLEU AVEC MOTIFS */}
          <div className="relative rounded-[32px] bg-man p-12 md:p-16 text-white overflow-hidden shadow-2xl">

            {/* MOTIFS DÉCORATIFS */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* TITRE */}
            <div className="relative text-center mb-14">
              <div className="inline-flex items-center justify-center gap-3 mb-4">
                <Quote size={24} className="text-white/60" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Témoignages
                </h2>
                <Quote size={24} className="text-white/60 rotate-180" />
              </div>
              <div className="h-[2px] w-32 bg-white/40 mx-auto" />
            </div>

            {/* SLIDER */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  prevEl: ".testimonial-prev",
                  nextEl: ".testimonial-next",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                }}
                className="!pb-4"
              >
                {items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <TestimonialCard item={item} onClick={() => setSelectedItem(item)} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* NAVIGATION */}
              <button
                className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full bg-white text-[#083a52] shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-14 h-14 rounded-full bg-white text-[#083a52] shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Témoignage suivant"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
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
              fill="url(#gradient-testimonials-bottom)"
            />
            <defs>
              <linearGradient id="gradient-testimonials-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#083a52" />
                <stop offset="100%" stopColor="#00a8e8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* MODAL */}
      {selectedItem && (
        <TestimonialModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

/* ================= CARD ================= */

function TestimonialCard({
  item,
  onClick
}: {
  item: Commentaire;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group h-full bg-white rounded-2xl p-8 text-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
    >

      {/* ICÔNE GUILLEMET DÉCORATIVE */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={80} className="text-[#00a8e8]" />
      </div>

      {/* HEADER */}
      <div className="relative flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={resolveMediaUrl(item.authorImageUrl)}
            alt={item.authorName}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#00a8e8]/20 group-hover:ring-[#00a8e8]/40 transition-all"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00a8e8] rounded-full flex items-center justify-center">
            <Quote size={12} className="text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-base text-[#083a52] mb-1">
            {item.authorName}
          </h4>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-[#00a8e8] rounded-full" />
            {item.displayDate}
          </p>
        </div>
      </div>

      {/* TEXTE */}
      <div className="relative">
        <p className="text-sm leading-relaxed text-gray-700 line-clamp-6 italic">
          "{item.content}"
        </p>

        {/* Badge "Lire plus" */}
        <div className="mt-4 flex items-center gap-2 text-[#00a8e8] text-xs font-semibold group-hover:gap-3 transition-all">
          <span>Lire le témoignage complet</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* BORDURE DÉCORATIVE */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#083a52] via-[#00a8e8] to-[#083a52] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

/* ================= MODAL ================= */

function TestimonialModal({
  item,
  onClose
}: {
  item: Commentaire;
  onClose: () => void;
}) {
  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Empêcher le scroll du body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER AVEC DÉGRADÉ */}
        <div className="relative bg-gradient-to-br from-[#083a52] to-[#00a8e8] p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:rotate-90"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={resolveMediaUrl(item.authorImageUrl)}
                alt={item.authorName}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white/30"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Quote size={14} className="text-[#00a8e8]" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-1">
                {item.authorName}
              </h3>
              <p className="text-sm text-white/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {item.displayDate}
              </p>
            </div>
          </div>

          {/* Quote décorative */}
          <div className="absolute top-4 left-4 opacity-20">
            <Quote size={60} />
          </div>
        </div>

        {/* CONTENU */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="relative">
            {/* Guillemets ouvrants */}
            <Quote size={32} className="text-[#00a8e8] mb-4" />

            <p className="text-gray-700 leading-relaxed text-base italic pl-4">
              {item.content}
            </p>

            {/* Guillemets fermants */}
            <Quote size={32} className="text-[#00a8e8] rotate-180 ml-auto mt-4" />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 pb-8">
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-[#083a52] to-[#00a8e8] text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Fermer
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
