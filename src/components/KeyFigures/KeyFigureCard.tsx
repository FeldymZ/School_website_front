import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

/* ================= COUNT UP HOOK ================= */

function useCountUp(end: number, startWhen: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, startWhen, duration]);

  return value;
}

/* ================= CARD ================= */

type Props = {
  icon: LucideIcon;
  value: number;
  label: string;
  startAnimation: boolean;
};

export default function KeyFigureCard({
  icon: Icon,
  value,
  label,
  startAnimation,
}: Props) {
  const animatedValue = useCountUp(value, startAnimation);

  return (
    <div className="group relative text-center">
      <div className="relative bg-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#1b5e7a]/10 overflow-hidden">
        {/* Décor */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1b5e7a]/10 rounded-full blur-2xl" />

        {/* Icône */}
        <div className="relative mb-4 flex justify-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1b5e7a] to-secondary flex items-center justify-center shadow-lg">
            <Icon size={28} className="text-white" />
          </div>
        </div>

        {/* Valeur animée */}
        <div className="relative text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-[#1b5e7a] to-secondary bg-clip-text text-transparent leading-none mb-3">
          {animatedValue}
        </div>

        {/* Label */}
        <p className="relative text-sm md:text-base text-gray-700 font-semibold px-2">
          {label}
        </p>
      </div>
    </div>
  );
}
