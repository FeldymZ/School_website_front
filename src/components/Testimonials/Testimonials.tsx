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
      <section className="w-full py-24 bg-gradient-to-br from-[#8C8C8C] via-[#A6A6A6] to-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-6 text-center text-white animate-pulse">
          Chargement des témoignages...
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <>
      <section className="relative w-full py-24 overflow-hidden">
        {/* VAGUE HAUT */}
        <div className="absolute top-0 left-0 w-full -translate-y-full">
          <svg viewBox="0 0 1440 60" className="w-full h-[60px]" preserveAspectRatio="none">
            <path
              d="M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30 L1440,0 L0,0 Z"
              fill="url(#gradient-testimonials)"
            />
            <defs>
              <linearGradient id="gradient-testimonials" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C8C8C" />
                <stop offset="50%" stopColor="#A6A6A6" />
                <stop offset="100%" stopColor="#C0C0C0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[32px] bg-gradient-to-br from-[#8C8C8C] via-[#A6A6A6] to-[#C0C0C0] p-12 md:p-16 text-white shadow-2xl">

            {/* TITRE */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-4">
                <Quote size={24} className="opacity-60" />
                <h2 className="text-3xl md:text-4xl font-bold">Commentaires</h2>
                <Quote size={24} className="opacity-60 rotate-180" />
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
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 40 },
                }}
              >
                {items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <TestimonialCard
                      item={item}
                      onClick={() => setSelectedItem(item)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white text-gray-700 rounded-full shadow-xl flex items-center justify-center">
                <ChevronLeft />
              </button>
              <button className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white text-gray-700 rounded-full shadow-xl flex items-center justify-center">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

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
  onClick,
}: {
  item: Commentaire;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="h-full bg-white rounded-2xl p-8 shadow-xl hover:-translate-y-2 transition cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-6">
        <img
          src={resolveMediaUrl(item.authorImageUrl)}
          alt={item.authorName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-800">{item.authorName}</h4>
          <p className="text-xs text-gray-500">{item.displayDate}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 italic line-clamp-6">
        “{item.content}”
      </p>

      <div className="mt-4 text-sm text-gray-500 font-semibold">
        Lire le témoignage complet →
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function TestimonialModal({
  item,
  onClose,
}: {
  item: Commentaire;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md rounded-2xl shadow-2xl
          bg-gradient-to-br from-[#8C8C8C] via-[#A6A6A6] to-[#C0C0C0]
          text-white overflow-hidden
          max-h-[85vh] flex flex-col
        "
      >
        <div className="p-5 relative flex flex-col overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={resolveMediaUrl(item.authorImageUrl)}
              alt={item.authorName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
            />
            <div>
              <h3 className="text-lg font-bold">{item.authorName}</h3>
              <p className="text-xs text-white/80">{item.displayDate}</p>
            </div>
          </div>

          <div className="bg-white/90 rounded-xl p-4 text-gray-700 overflow-y-auto max-h-[40vh]">
            <Quote size={16} className="text-gray-400 mb-2" />
            <p className="italic leading-relaxed text-sm">{item.content}</p>
            <Quote size={16} className="text-gray-400 rotate-180 mt-2 ml-auto" />
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full py-3 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}