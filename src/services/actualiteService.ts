import type {
  Actualite,
  ActualiteDetails,
} from "@/types/actualite";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ========================================================= */
/* ======================= LISTE =========================== */
/* ========================================================= */

export async function fetchActualites(): Promise<Actualite[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/actualites`
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des actualités");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/* ========================================================= */
/* ======================= DÉTAIL ========================== */
/* ========================================================= */

export async function fetchActualiteBySlug(
  slug: string
): Promise<ActualiteDetails> {
  if (!slug) {
    throw new Error("Slug manquant");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/public/actualites/slug/${slug}`
  );

  if (!response.ok) {
    throw new Error("Actualité introuvable");
  }

  return response.json();
}

/* ========================================================= */
/* ============ RESOLUTION ID → SLUG (LEGACY) =============== */
/* ========================================================= */

/**
 * 🔁 Résout un slug à partir d’un id (URLs legacy)
 * Utilisé uniquement pour redirection React
 */
export async function resolveActualiteSlugFromId(
  id: number
): Promise<string> {
  if (!id) {
    throw new Error("ID invalide");
  }

  const response = await fetch(
    `${API_BASE_URL}/api/public/actualites/${id}`
  );

  if (!response.ok) {
    throw new Error("Actualité introuvable");
  }

  const data = await response.json();

  if (!data.slug) {
    throw new Error("Slug introuvable pour cette actualité");
  }

  return data.slug;
}
