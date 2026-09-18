import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";

import MegaMenu from "../MegaMenu/MegaMenu";
import MegaMenuFormations from "../MegaMenu/MegaMenuFormations";
import MegaMenuFormationContinue from "../MegaMenu/MegaMenuFormationContinue";

import { esiitechMenu, vieEtudianteMenu } from "@/data/menus";
import type { MegaMenuData } from "@/types/menu";

/* ================= TYPES ================= */

type MenuKey =
  | "esiitech"
  | "vie"
  | "formations"
  | "formationsContinue";

/* ================= CONSTANTES ================= */

const MENU_WIDTHS: Record<MenuKey, number> = {
  esiitech: 480,
  vie: 480,
  formations: 560,
  formationsContinue: 420,
};

/* ================= COMPONENT ================= */

export default function MainNavbar() {

  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [anchorLeft, setAnchorLeft] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<MenuKey | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const staticMenus: Record<Exclude<MenuKey, "formations" | "formationsContinue">, MegaMenuData> = {
    esiitech: esiitechMenu,
    vie: vieEtudianteMenu,
  };

  /* ================= NAVIGATION ================= */

  const closeMobile = () => {
    setIsMobileOpen(false);
    setMobileOpenMenu(null);
  };

  const goToHomeTop = () => {
    closeMobile();
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToContact = () => {
    closeMobile();
    navigate("/?scroll=contact");
  };

  const goToPartenaires = () => {
    closeMobile();
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
    left = Math.max(MARGIN, Math.min(left, navRect.width - menuWidth - MARGIN));
    setAnchorLeft(left);
    setActiveMenu(key);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-md"
      onMouseLeave={() => setActiveMenu(null)}
    >

      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">

        {/* ================= LOGO ================= */}

        <button onClick={goToHomeTop} className="flex-shrink-0">
          <img src="/logo.png" alt="ESIITECH" className="h-10 sm:h-12 lg:h-16" />
        </button>

        {/* ================= DESKTOP MENU ================= */}

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-gray-800 text-[13px] xl:text-sm">

          {[
            ["esiitech", "ESIITECH"],
            ["formations", "FORMATIONS INITIALES"],
            ["formationsContinue", "FORMATIONS CONTINUES"],
            ["vie", "VIE ÉTUDIANTE"],
          ].map(([key, label]) => (
            <li
              key={key}
              onMouseEnter={(e) => openMenu(key as MenuKey, e.currentTarget)}
              className="group relative flex items-center gap-1 cursor-pointer py-2"
            >
              <span className="relative transition-colors duration-300 group-hover:text-[#00A4E0]">
                {label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8] transition-all duration-300 group-hover:w-full" />
              </span>
              <ChevronDown
                size={15}
                className="transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#00A4E0] flex-shrink-0"
              />
            </li>
          ))}

          <li className="group relative flex items-center cursor-pointer py-2">
            <button
              onClick={goToContact}
              className="relative transition-colors duration-300 group-hover:text-[#00A4E0]"
            >
              CONTACT
            </button>
          </li>

        </ul>

        {/* ================= ACTION DESKTOP ================= */}

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://foad.esiitech-gabon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white
                       bg-gradient-to-r from-[#00A4E0] to-[#0077A8]
                       shadow-lg shadow-[#00A4E0]/30
                       hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Accéder au FOAD
            <Sparkles size={13} className="animate-pulse" />
          </a>
        </div>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
          onClick={() => {
            setIsMobileOpen((v) => !v);
            setMobileOpenMenu(null);
          }}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl animate-in slide-in-from-top-2 duration-200">

          <ul className="flex flex-col font-bold divide-y divide-gray-100">

            <li>
              <button
                onClick={goToHomeTop}
                className="w-full px-6 py-4 text-left text-sm text-gray-800 hover:bg-gray-50 hover:text-[#00A4E0] transition-colors"
              >
                ACCUEIL
              </button>
            </li>

            <li>
              <Link
                to="/formations"
                onClick={closeMobile}
                className="block px-6 py-4 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#00A4E0] transition-colors"
              >
                FORMATIONS INITIALES
              </Link>
            </li>

            <li>
              <Link
                to="/formations-continues"
                onClick={closeMobile}
                className="block px-6 py-4 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#00A4E0] transition-colors"
              >
                FORMATIONS CONTINUES
              </Link>
            </li>

            <li>
              <Link
                to="/activites"
                onClick={closeMobile}
                className="block px-6 py-4 text-sm text-gray-800 hover:bg-gray-50 hover:text-[#00A4E0] transition-colors"
              >
                ACTIVITÉS
              </Link>
            </li>

            <li>
              <button
                onClick={goToContact}
                className="w-full px-6 py-4 text-left text-sm text-gray-800 hover:bg-gray-50 hover:text-[#00A4E0] transition-colors"
              >
                CONTACT
              </button>
            </li>

          </ul>

          {/* ✅ FOAD button in mobile — prominent */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 border-t border-gray-100">
            <a
              href="https://foad.esiitech-gabon.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="group relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl
                         font-bold text-white text-sm overflow-hidden
                         hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                         shadow-lg shadow-[#00A4E0]/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A4E0] to-[#0077A8]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0077A8] to-[#00A4E0] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Accéder au FOAD
                <Sparkles size={13} className="animate-pulse" />
              </span>
            </a>
          </div>

        </div>
      )}

      {/* ================= DESKTOP MEGA MENUS ================= */}

      {activeMenu === "formations" && (
        <MegaMenuFormations anchorLeft={anchorLeft} />
      )}

      {activeMenu === "formationsContinue" && (
        <MegaMenuFormationContinue anchorLeft={anchorLeft} />
      )}

      {activeMenu && activeMenu !== "formations" && activeMenu !== "formationsContinue" && (
        <MegaMenu
          columns={staticMenus[activeMenu]}
          anchorLeft={anchorLeft}
        />
      )}

    </nav>
  );
}