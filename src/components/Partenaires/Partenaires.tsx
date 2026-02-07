import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { fetchPartenaires } from "@/services/partenaireService";
import { resolveMediaUrl } from "@/utils/media";

/* ========================================================= */
/* ======================= TYPES ============================ */
/* ========================================================= */

export interface Partenaire {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

/* ========================================================= */
/* ====================== CONFIG ============================ */
/* ========================================================= */

const SPEED_PX_PER_SEC = 40;

/* ========================================================= */
/* ===================== COMPONENT ========================== */
/* ========================================================= */

export default function PartnersSection() {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchPartenaires().then(setPartenaires);
  }, []);

  /* ================= SLIDER AUTO INFINI ================= */

  useEffect(() => {
    if (!trackRef.current || partenaires.length === 0) return;

    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      offsetRef.current += (SPEED_PX_PER_SEC * delta) / 1000;

      if (offsetRef.current >= halfWidth) {
        offsetRef.current = 0;
      }

      track.style.transform = `translateX(-${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [partenaires]);

  if (partenaires.length === 0) return null;

  const duplicated = [...partenaires, ...partenaires];

  return (
    <section
      id="partenaires"
      className="w-full bg-[#eaf7fc] py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TITRE ================= */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-3 h-3 rounded-full bg-[#6fd3ff] animate-pulse" />

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Notre réseau <span className="font-bold"> d'Entreprises Partenaires</span>
            </h2>

            <span className="w-3 h-3 rounded-full bg-[#6fd3ff] animate-pulse" />
          </div>

          <div className="w-48 h-[2px] bg-[#bfe9fb]" />
        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 will-change-transform"
          >
            {duplicated.map((p, i) => (
              <PartnerCard key={`${p.id}-${i}`} partenaire={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================= */
/* =================== PARTNER CARD ========================= */
/* ========================================================= */

function PartnerCard({ partenaire }: { partenaire: Partenaire }) {
  return (
    <a
      href={partenaire.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={partenaire.name}
      className="
        group relative flex items-center justify-center
        w-[220px] h-[120px]
        bg-white rounded-2xl
        border border-gray-100
        grayscale opacity-80
        hover:grayscale-0 hover:opacity-100
        hover:shadow-xl hover:border-[#6fd3ff]/40
        transition-all duration-300
        shrink-0
      "
    >
      <img
        src={resolveMediaUrl(partenaire.logoUrl)}
        alt={partenaire.name}
        className="max-h-16 max-w-[160px] object-contain"
        loading="lazy"
      />

      <ExternalLink
        size={14}
        className="
          absolute top-3 right-3
          text-[#6fd3ff]
          opacity-0 group-hover:opacity-100
          transition-opacity
        "
      />
    </a>
  );
}
