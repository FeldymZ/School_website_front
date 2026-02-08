import type { MegaMenuData } from "@/types/menu";

/* ================= ESIITECH ================= */
export const esiitechMenu: MegaMenuData = [
  {
    title: "L'ÉCOLE",
    items: [
      { label: "ESIITECH", path: "/a-propos" }, // ✅ CHANGÉ vers la page À propos
      { label: "MOT DU DG", path: "/mot-du-dg" },
    ],
  },
];

/* ================= VIE ÉTUDIANTE ================= */
export const vieEtudianteMenu: MegaMenuData = [
  {
    title: "VIE ÉTUDIANTE",
    items: [
      {
        label: "ACTIVITES",
        path: "/activites", // ✅ LISTING PUBLIC
      },
      {
        label: "LA MUTUELLE",
        path: "/vie-etudiante/mutuelle",
      },
    ],
  },
];
