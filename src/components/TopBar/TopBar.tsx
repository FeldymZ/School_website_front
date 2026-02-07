import { Mail, Phone } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full bg-secondary text-white font-semibold">
      <div className="flex items-center justify-between px-4 py-4">
        {/* LEFT */}
        <span className="text-sm sm:text-base tracking-wide">
          Site officiel de l’ESIITech
        </span>

        {/* RIGHT */}
        <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>contact@esiitech-gabon.com</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+241 76 23 76 38</span>
          </div>
        </div>
      </div>
    </div>
  );
}
