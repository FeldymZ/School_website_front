import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

/* ========================================================= */
/* ========================= FOOTER ======================== */
/* ========================================================= */

export default function Footer() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-300 overflow-hidden">
      {/* Décoration de fond améliorée */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
      <div className="absolute top-0 right-1/4 w-[32rem] h-[32rem] bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 bg-purple-600/5 rounded-full blur-3xl" />

      {/* Pattern grid subtil */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* ================= CONTENU ================= */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-2 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* ===== COLONNE 1 : LOGO & INFO ===== */}
          <div className="space-y-8">
            <div>
              <Link to="/" className="inline-block group relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/logo.png"
                  alt="ESIITECH"
                  className="relative h-16 transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-light">
              - École Supérieure d&apos;Ingénierie et d&apos;Innovations Technologiques -
            </p>

            <div className="space-y-4">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                    <MapPin size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Localisation</p>
                    <span className="font-medium">Libreville, Gabon</span>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                    <Phone size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Téléphone</p>
                    <a
                      href="tel:+24176237638"
                      className="font-medium hover:text-cyan-400 transition-colors"
                    >
                      +241 76 23 76 38
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                    <Mail size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <a
                      href="mailto:contact@esiitech-gabon.com"
                      className="font-medium hover:text-cyan-400 transition-colors"
                    >
                      contact@esiitech-gabon.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== COLONNE 2 : RESSOURCES ===== */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 rounded-full" />
              <h3 className="text-white font-black text-xl">Ressources</h3>
            </div>

            <ul className="space-y-5">
              <li>
                <a
                  href="https://foad.esiitech-gabon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-2 h-2 bg-blue-500 rounded-full group-hover:bg-cyan-400 transition-all duration-300 group-hover:scale-150" />
                  <span className="relative flex-1 group-hover:translate-x-2 transition-transform duration-300">
                    Plateforme E-learning (FOAD)
                  </span>
                  <ArrowUpRight size={16} className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400" />
                </a>
              </li>

              {/* <li>
                <Link
                  to="#"
                  className="group relative flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-2 h-2 bg-blue-500 rounded-full group-hover:bg-cyan-400 transition-all duration-300 group-hover:scale-150" />
                  <span className="relative flex-1 group-hover:translate-x-2 transition-transform duration-300">
                    Trombinoscope
                  </span>
                </Link>
              </li> */}

              <li>
                <a
                  href="https://sauce.o2switch.net:2096/webmaillogout.cgi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-2 h-2 bg-blue-500 rounded-full group-hover:bg-cyan-400 transition-all duration-300 group-hover:scale-150" />
                  <span className="relative flex-1 group-hover:translate-x-2 transition-transform duration-300">
                    Messagerie Électronique
                  </span>
                  <ArrowUpRight size={16} className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400" />
                </a>
              </li>

              {/* <li>
                <Link
                  to="#"
                  className="group relative flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-2 h-2 bg-blue-500 rounded-full group-hover:bg-cyan-400 transition-all duration-300 group-hover:scale-150" />
                  <span className="relative flex-1 group-hover:translate-x-2 transition-transform duration-300">
                    Authentifier un diplôme
                  </span>
                </Link>
              </li> */}

              {/* <li>
                <Link
                  to="/contact"
                  className="group relative flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-2 h-2 bg-blue-500 rounded-full group-hover:bg-cyan-400 transition-all duration-300 group-hover:scale-150" />
                  <span className="relative flex-1 group-hover:translate-x-2 transition-transform duration-300">
                    Nous contacter
                  </span>
                </Link>
              </li> */}
            </ul>
          </div>

          {/* ===== COLONNE 3 : RESEAUX SOCIAUX ===== */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 rounded-full" />
              <h3 className="text-white font-black text-xl">Suivez-nous</h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Rejoignez notre communauté et restez connecté !
            </p>

            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://www.facebook.com/share/1Gh1TbLS9C/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500">
                  <Facebook size={24} className="mb-2" />
                  <p className="text-xs font-bold">Facebook</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/esiitech-gabon-602879222"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-500 hover:to-blue-600 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-400">
                  <Linkedin size={24} className="mb-2" />
                  <p className="text-xs font-bold">LinkedIn</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/esiitechgabon"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-pink-500 hover:to-purple-600 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-pink-400">
                  <Instagram size={24} className="mb-2" />
                  <p className="text-xs font-bold">Instagram</p>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@esiitechgabon.off"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 hover:from-cyan-400 hover:to-blue-500 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-cyan-400">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mb-2"
                  >
                    <path d="M16.5 3c.93.67 2.03 1.1 3.25 1.25v3.1c-1.2-.04-2.36-.36-3.25-.92v7.38a5.73 5.73 0 11-5.73-5.73c.3 0 .6.03.9.08v3.2a2.63 2.63 0 10 1.83 2.51V3h2.99z" />
                  </svg>
                  <p className="text-xs font-bold">TikTok</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="relative border-t border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row texte-left gap-6">
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <span>© ESIITECH 2026 — Tous droits réservés</span>
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Site réalisé par ESIITECH
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
