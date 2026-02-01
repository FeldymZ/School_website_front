export type FormationLevel = "LICENCE" | "MASTER";

/* ===== LISTE ===== */
export interface Formation {
  id: number;
  title: string;
  coverImageUrl: string;
  level: FormationLevel;
}

/* ===== DÉTAIL ===== */
export interface FormationDetails {
  id: number;
  coverImageUrl?: string;

  title: string;
  description: string;
  galleryImages: string[];
  pdfUrl?: string | null;
  level: FormationLevel;
}
