import { useEffect, useRef, useState } from "react";
import { Banner as BannerType } from "@/types/banner";
import { fetchBanners } from "@/services/bannerService";
import { resolveMediaUrl } from "@/utils/media";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { motion, useScroll, useTransform } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Banner() {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoErrorIndex, setVideoErrorIndex] = useState<number | null>(null);

  /* ================= PARALLAX SCROLL (SECTION-BASED) ================= */

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Media bouge lentement
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Contenu bouge moins (profondeur)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Léger fade progressif
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* ================= DATA ================= */

  useEffect(() => {
    fetchBanners()
      .then(setBanners)
      .finally(() => setLoading(false));
  }, []);

  if (loading || banners.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        h-[55vh]
        sm:h-[60vh]
        md:h-[65vh]
        lg:h-[80vh]
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
            <SwiperSlide key={banner.id} className="relative">
              {/* ================= MEDIA (PARALLAX SCROLL) ================= */}
              <motion.div
                style={{ y: mediaY }}
                className="absolute inset-0 scale-110 will-change-transform"
              >
                {isVideo && !videoFailed ? (
                  <video
                    className="w-full h-full object-cover object-center"
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
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </motion.div>

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"
                style={{ opacity: overlayOpacity }}
              />

              {/* ================= CONTENT (PARALLAX SCROLL) ================= */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <motion.div
                  style={{ y: contentY }}
                  className="text-center text-white px-6 md:px-12"
                >
                  <h1 className="
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    lg:text-4xl
                    font-bold
                    drop-shadow-lg
                  ">
                    {banner.title}
                  </h1>

                  {banner.subtitle && (
                    <p className="
                      mt-4
                      text-3xl
                      sm:text-4xl
                      md:text-5xl
                      lg:text-6xl
                      font-extrabold
                      drop-shadow-2xl
                    ">
                      {banner.subtitle}
                    </p>
                  )}

                  {banner.subtitleAlt && (
                    <p className="
                      mt-4
                      text-sm
                      sm:text-base
                      md:text-lg
                      text-gray-200
                      drop-shadow-md
                    ">
                      {banner.subtitleAlt}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* ================= BUTTON ================= */}
              {banner.buttonLabel && banner.buttonUrl && (
                <motion.div
                  style={{ y: contentY }}
                  className="
                    absolute
                    bottom-6
                    right-6
                    md:bottom-10
                    md:right-10
                    z-20
                  "
                >
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
                      text-white
                      font-bold
                      shadow-2xl
                      hover:bg-primary/90
                      hover:scale-105
                      transition-all
                      duration-300
                    "
                  >
                    {banner.buttonLabel}
                  </a>
                </motion.div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
