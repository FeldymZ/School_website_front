/* ===== LISTE ===== */
export interface Actualite {
  id: number;              // encore utile (key React, admin, etc.)
  title: string;
  slug: string;            // ⚠️ OBLIGATOIRE
  coverImageUrl: string;
  publishedAt: string;
}

/* ===== DÉTAIL ===== */
export interface ActualiteDetails {
  id: number;
  title: string;
  slug: string;            // ⚠️ OBLIGATOIRE
  content: string;
  coverImageUrl: string;
  galleryImages: string[];
  publishedAt: string;
}
