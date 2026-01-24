import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  fetchPartenaires,
  type Partenaire,
} from "@/services/partenaireService";

type Props = {
  anchorLeft: number;
};

/* ================= TYPE DÉRIVÉ POUR LE MENU ================= */

type MenuPartenaire = Pick<
  Partenaire,
  "id" | "name" | "websiteUrl"
>;

/* ================= CONFIG ================= */

const ITEMS_PER_SLIDE = 3;
const SLIDE_INTERVAL = 3000;

/* ========================================================= */
/* ==================== COMPONENT ========================== */
/* ========================================================= */

export default function MegaMenuPartenariats({ anchorLeft }: Props) {
  const [partenaires, setPartenaires] = useState<MenuPartenaire[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    fetchPartenaires().then((data) => {
      const cleaned: MenuPartenaire[] = data.map((p) => ({
        id: p.id,
        name: p.name,
        websiteUrl: p.websiteUrl,
      }));
      setPartenaires(cleaned);
    });
  }, []);

  /* ================= SLIDES ================= */
  const slides = useMemo(() => {
    const result: MenuPartenaire[][] = [];
    for (let i = 0; i < partenaires.length; i += ITEMS_PER_SLIDE) {
      result.push(partenaires.slice(i, i + ITEMS_PER_SLIDE));
    }
    return result;
  }, [partenaires]);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="
        absolute top-full z-50
        w-[520px]
        bg-white border border-gray-200
        shadow-xl rounded-2xl
        rounded-2xl
        p-5
      "
      style={{ left: anchorLeft }}
    >
      <h4 className="text-xs font-bold uppercase text-center mb-4">
        Partenariats
      </h4>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full grid grid-cols-3 gap-3"
            >
              {slide.map((p) => (
                <a
                  key={p.id}
                  href={p.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex items-center justify-between
                    px-3 py-2
                    rounded-lg
                    border border-gray-200
                    bg-white
                    text-xs font-medium
                    hover:bg-secondary/10
                    transition-all
                  "
                >
                  <span className="truncate">{p.name}</span>
                  <ExternalLink
                    size={12}
                    className="text-gray-400 group-hover:text-secondary"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
