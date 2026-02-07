import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Mail,
  Sparkles,
} from "lucide-react";

import MegaMenu from "../MegaMenu/MegaMenu";
import MegaMenuFormations from "../MegaMenu/MegaMenuFormations";

import {
  esiitechMenu,
  vieEtudianteMenu,
} from "@/data/menus";

import type { MegaMenuData } from "@/types/menu";

/* ================= TYPES ================= */
type MenuKey = "esiitech" | "formations" | "vie";

/* ================= CONSTANTES ================= */
const MENU_WIDTHS: Record<MenuKey, number> = {
  esiitech: 480,
  formations: 560,
  vie: 480,
};

/* ================= COMPONENT ================= */
export default function MainNavbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [anchorLeft, setAnchorLeft] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const staticMenus: Record<
    Exclude<MenuKey, "formations">,
    MegaMenuData
  > = {
    esiitech: esiitechMenu,
    vie: vieEtudianteMenu,
  };

  /* ================= NAVIGATION ================= */

  const goToHomeTop = () => {
    setIsMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToActualitesAgenda = () => {
    setIsMobileOpen(false);
    navigate("/?scroll=actualites-agenda");
  };

  const goToContact = () => {
    setIsMobileOpen(false);
    navigate("/?scroll=contact");
  };

  const goToPartenaires = () => {
    setIsMobileOpen(false);
    navigate("/?scroll=partenaires");
  };

  /* ================= MEGA MENU POSITION ================= */

  const openMenu = (key: MenuKey, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const nav = el.closest("nav");
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const menuWidth = MENU_WIDTHS[key];

    const center = rect.left - navRect.left + rect.width / 2;
    let left = center - menuWidth / 2;

    const MARGIN = 12;
    left = Math.max(
      MARGIN,
      Math.min(left, navRect.width - menuWidth - MARGIN)
    );

    setAnchorLeft(left);
    setActiveMenu(key);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b-2 border-gray-100 shadow-lg"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex items-center justify-between px-8 py-5">
        {/* LOGO */}
        <button onClick={goToHomeTop}>
          <img
            src="/logo.png"
            alt="ESIITECH"
            className="h-14 lg:h-16"
          />
        </button>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="hidden lg:flex items-center gap-6 font-bold text-gray-800">

          {[
            ["esiitech", "ESIITECH"],
            ["formations", "Formations"],
            ["vie", "Vie étudiante"],
          ].map(([key, label]) => (
            <li
              key={key}
              onMouseEnter={(e) =>
                openMenu(key as MenuKey, e.currentTarget)
              }
              className="group relative flex items-center gap-2 cursor-pointer py-2"
            >
              <span className="relative group-hover:text-[#00A4E0] transition-colors duration-300 text-base">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] group-hover:w-full transition-all duration-300" />
              </span>
              <ChevronDown
                size={16}
                className="group-hover:text-[#00A4E0] group-hover:translate-y-0.5 transition-all duration-300"
              />
            </li>
          ))}

          {/* ✅ PARTENARIATS (AJOUT MINIMAL) */}
          <li className="relative group">
            <button
              onClick={goToPartenaires}
              className="relative py-2 text-base hover:text-[#00A4E0] transition-colors duration-300"
            >
              Partenariats
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] group-hover:w-full transition-all duration-300" />
            </button>
          </li>

          <li className="relative group">
            <button
              onClick={goToActualitesAgenda}
              className="relative py-2 text-base hover:text-[#00A4E0] transition-colors duration-300"
            >
              Actualités & Agenda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] group-hover:w-full transition-all duration-300" />
            </button>
          </li>

          <li className="relative group">
            <button
              onClick={goToContact}
              className="relative py-2 text-base hover:text-[#00A4E0] transition-colors duration-300"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] group-hover:w-full transition-all duration-300" />
            </button>
          </li>
        </ul>

        {/* ================= ACTIONS ================= */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://sauce.o2switch.net:2096/webmaillogout.cgi"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative overflow-hidden
              flex items-center gap-3
              px-5 py-3 rounded-xl
              text-sm font-bold
              text-gray-700
              bg-gradient-to-br from-gray-50 to-gray-100
              border-2 border-gray-200
              hover:border-gray-300 hover:shadow-lg
              hover:scale-105 active:scale-95
              transition-all duration-300
            "
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
              <Mail size={16} className="text-gray-600" />
            </div>
            <span>Webmail</span>
          </a>

          <a
            href="https://foad.esiitech-gabon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative overflow-hidden
              flex items-center gap-3
              px-6 py-3 rounded-xl
              text-sm font-bold
              text-white
              bg-gradient-to-r from-[#00A4E0] to-[#0077A8]
              hover:from-[#0088CC] hover:to-[#006699]
              shadow-xl shadow-[#00A4E0]/40
              hover:shadow-2xl hover:shadow-[#00A4E0]/60
              hover:scale-105 active:scale-95
              transition-all duration-300
            "
          >
            <div className="relative w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight size={16} className="text-white" />
            </div>
            <span className="relative flex items-center gap-2">
              Accéder au FOAD
              <Sparkles size={14} className="animate-pulse" />
            </span>
          </a>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 border-2 border-transparent hover:border-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsMobileOpen((v) => !v)}
        >
          {isMobileOpen ? (
            <X size={28} className="text-gray-700" />
          ) : (
            <Menu size={28} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full w-full bg-white/95 backdrop-blur-xl border-t-2 shadow-2xl">
          <ul className="flex flex-col divide-y-2 divide-gray-100 font-bold">
            <li>
              <button
                onClick={goToHomeTop}
                className="w-full px-8 py-5 text-left text-gray-800 hover:text-[#00A4E0] transition-all"
              >
                Accueil
              </button>
            </li>

            <li>
              <Link
                to="/formationsList"
                onClick={() => setIsMobileOpen(false)}
                className="block px-8 py-5 text-gray-800 hover:text-[#00A4E0] transition-all"
              >
                Formations
              </Link>
            </li>

            <li>
              <button
                onClick={goToPartenaires}
                className="w-full px-8 py-5 text-left text-gray-800 hover:text-[#00A4E0] transition-all"
              >
                Partenariats
              </button>
            </li>

            <li>
              <button
                onClick={goToActualitesAgenda}
                className="w-full px-8 py-5 text-left text-gray-800 hover:text-[#00A4E0] transition-all"
              >
                Actualités & Agenda
              </button>
            </li>

            <li>
              <button
                onClick={goToContact}
                className="w-full px-8 py-5 text-left text-gray-800 hover:text-[#00A4E0] transition-all"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* ================= MEGA MENUS ================= */}
      {activeMenu === "formations" && (
        <MegaMenuFormations anchorLeft={anchorLeft} />
      )}

      {activeMenu && activeMenu !== "formations" && (
        <MegaMenu
          columns={staticMenus[activeMenu]}
          anchorLeft={anchorLeft}
        />
      )}
    </nav>
  );
}
