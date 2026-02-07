import type { ActivitePublic } from "@/types/activitePublic";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export async function fetchPublicActivites(): Promise<ActivitePublic[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/activites`
  );

  if (!res.ok) {
    throw new Error("Erreur chargement activités");
  }

  return res.json();
}

export async function fetchPublicActiviteBySlug(
  slug: string
): Promise<ActivitePublic> {

  const res = await fetch(
    `${API_BASE_URL}/api/public/activites/slug/${slug}`
  );

  if (!res.ok) {
    throw new Error("Activité introuvable");
  }

  return res.json();
}
