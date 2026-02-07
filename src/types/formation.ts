export type FormationLevel = "LICENCE" | "MASTER";

/* =========================
   LISTE (PUBLIC)
   ========================= */
export interface Formation {
  slug: string;               // ✅ SLUG PUBLIC
  title: string;
  coverImageUrl: string;
  level: FormationLevel;
}

/* =========================
   DÉTAILS (PUBLIC)
   ========================= */
export interface FormationDetails {
  slug: string;               // ✅ SLUG PUBLIC

  title: string;
  description: string;
  coverImageUrl?: string;
  galleryImages: string[];
  pdfUrl?: string | null;
  level: FormationLevel;
}

// types/publicFormation.ts
export interface PublicFormationDetails {
  galleryImages: string[];
}


