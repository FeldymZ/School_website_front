import type { MegaMenuData } from "@/types/menu";

/* ================= ESIITECH ================= */
export const esiitechMenu: MegaMenuData = [
  {
    title: "L'ÉCOLE",
    items: [
      { label: "ESIITech", path: "/a-propos" }, // ✅ CHANGÉ vers la page À propos
      { label: "Mot du DG", path: "/mot-du-dg" },
    ],
  },
];

/* ================= VIE ÉTUDIANTE ================= */
export const vieEtudianteMenu: MegaMenuData = [
  {
    title: "VIE ÉTUDIANTE",
    items: [
      {
        label: "Activités",
        path: "/activites", // ✅ LISTING PUBLIC
      },
      {
        label: "La mutuelle",
        path: "/vie-etudiante/mutuelle",
      },
    ],
  },
];
