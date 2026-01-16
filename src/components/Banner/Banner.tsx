import { useEffect, useState } from "react";
import { Banner as BannerType } from "@/types/banner";
import { fetchBanners } from "@/services/bannerService";
import { resolveMediaUrl } from "@/utils/media";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Banner() {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoErrorIndex, setVideoErrorIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchBanners()
      .then(setBanners)
      .finally(() => setLoading(false));
  }, []);

  if (loading || banners.length === 0) return null;

  return (
    <section
      className="
        h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[75vh]

      "
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {banners.map((banner, index) => {
          const mediaSrc = resolveMediaUrl(banner.mediaUrl);
          const isVideo = banner.mediaType === "VIDEO";
          const videoFailed = videoErrorIndex === index;

          return (
            <SwiperSlide key={banner.id}>
              {/* ================= MEDIA ================= */}
              {isVideo && !videoFailed ? (
                <video
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    object-top
                  "
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onError={() => setVideoErrorIndex(index)}
                >
                  <source src={mediaSrc} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={mediaSrc}
                  alt={banner.title}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    object-top
                  "
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* ================= CONTENT ================= */}
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <div className="relative w-full h-full px-6 md:px-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={banner.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="
                        h-full
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        text-white
                      "
                    >
                      {/* TITLE */}
                      <h1 className="
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        lg:text-4xl
                        font-bold
                        leading-tight
                      ">
                        {banner.title}
                      </h1>

                      {/* SUBTITLE */}
                      {banner.subtitle && (
                        <p className="
                          mt-4
                          text-3xl
                          sm:text-4xl
                          md:text-5xl
                          lg:text-6xl
                          font-extrabold
                        ">
                          {banner.subtitle}
                        </p>
                      )}

                      {/* SUBTITLE ALT */}
                      {banner.subtitleAlt && (
                        <p className="
                          mt-4
                          text-sm
                          sm:text-base
                          md:text-lg
                          text-gray-300
                        ">
                          {banner.subtitleAlt}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* ================= BUTTON ================= */}
                  {banner.buttonLabel && banner.buttonUrl && (
                    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
                      <a
                        href={banner.buttonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-block
                          px-8
                          py-4
                          rounded-xl
                          bg-primary
                          text-base
                          md:text-lg
                          font-bold
                          text-white
                          shadow-lg
                          transition
                          hover:bg-primary/90
                          focus:outline-none
                          focus:ring-2
                          focus:ring-primary/50
                        "
                      >
                        {banner.buttonLabel}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
