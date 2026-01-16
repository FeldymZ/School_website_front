import { Mail, Phone } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full bg-[#0b3a53] text-white text-xs sm:text-sm font-semibold">
      <div className="flex items-center justify-between px-4 py-4">
        {/* LEFT */}
        <span>
          Site officiel de l’ESIITech
        </span>

        {/* RIGHT */}
        <div className="hidden sm:flex items-center gap-4 font-semibold">
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>contact@esiitech-gabon.com</span>
          </div>

          <div className="flex items-center gap-1 font-semibold">
            <Phone size={14} />
            <span>+241 76 23 76 38</span>
          </div>
        </div>
      </div>
    </div>
  );
}
