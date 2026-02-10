import { useEffect, useState } from "react";
import { X, Info, Code } from "lucide-react";

import { fetchActiveBannerMessage } from "@/services/bannerMessage.service";
import type { BannerMessagePublic } from "@/types/bannerMessage";

/* ================= TYPES ================= */
type BannerState = "open" | "collapsed";

/* ================= COMPONENT ================= */
export default function DidYouKnowBanner() {
  const [state, setState] = useState<BannerState>("open");
  const [banner, setBanner] = useState<BannerMessagePublic | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchActiveBannerMessage();
        setBanner(data);
      } catch (e) {
        console.error("Erreur BannerMessage :", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* Aucun message → rien à afficher */
  if (loading || !banner) return null;

  /* ================= MODE COLLAPSÉ ================= */
  if (state === "collapsed") {
    return (
      <button
        onClick={() => setState("open")}
        className="
          fixed bottom-6 right-6 z-[9999]
          px-4 py-3
          rounded-2xl
          bg-[#c10101]
          shadow-2xl shadow-black/40
          flex items-center justify-center
          hover:scale-110 active:scale-95
          transition-all duration-300
        "
        aria-label="Afficher le message"
      >
        <Code size={22} className="text-white" />
      </button>
    );
  }

  /* ================= MODE OUVERT ================= */
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[96%] max-w-5xl">
      <div
        className="
          relative overflow-hidden
          rounded-3xl
          shadow-2xl shadow-black/40
          border border-white/20
          bg-[#c10101]
        "
      >
        {/* Bouton réduire */}
        <button
          onClick={() => setState("collapsed")}
          className="
            absolute top-4 right-4 z-10
            p-2 rounded-full
            bg-white/20 hover:bg-white/30
            transition
          "
          aria-label="Réduire"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Contenu */}
        <div className="flex items-center gap-6 px-10 py-3 text-white">
          {/* Titre */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Info size={22} />
            </div>

            <span className="text-lg md:text-xl font-bold whitespace-nowrap">
              {banner.title ?? "Le saviez-vous ?"}
            </span>
          </div>

          <div className="hidden md:block w-px h-10 bg-white/30" />

          {/* Texte défilant */}
          <div className="relative flex-1 overflow-hidden">
            <div className="banner-marquee font-semibold text-base md:text-lg tracking-wide">
              <span>{banner.content}</span>
              <span className="mx-10">•</span>
              <span>{banner.content}</span>
              <span className="mx-10">•</span>
              <span>{banner.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
