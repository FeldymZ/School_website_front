import type {
  Actualite,
  ActualiteDetails,
} from "@/types/actualite";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ================= LISTE ================= */
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

/* ================= DÉTAIL ================= */
export async function fetchActualiteDetails(
  id: number
): Promise<ActualiteDetails> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/actualites/${id}`
  );

  if (!response.ok) {
    throw new Error("Actualité introuvable");
  }

  return response.json();
}
