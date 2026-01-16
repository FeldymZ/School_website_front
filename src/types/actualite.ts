/* ===== LISTE ===== */
export interface Actualite {
  id: number;
  title: string;
  coverImageUrl: string;
  publishedAt: string;
}

/* ===== DÉTAIL ===== */
export interface ActualiteDetails {
  id: number;
  title: string;
  content: string;
  coverImageUrl: string;
  galleryImages: string[];
  publishedAt: string;
}
