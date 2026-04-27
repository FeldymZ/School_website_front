export type FormationLevel = "LICENCE" | "MASTER";

/* =========================
   LISTE (PUBLIC)
   ========================= */
export interface Formation {
  id: number; // ✅ AJOUT IMPORTANT
  slug: string;
  title: string;
  coverImageUrl: string;
  level: FormationLevel;
}

/* =========================
   DÉTAILS (PUBLIC)
   ========================= */
export interface FormationDetails {
  id: number; // 🔥 correction (au lieu de string)
  slug: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  galleryImages: string[];
  pdfUrl?: string | null;
  level: FormationLevel;
}