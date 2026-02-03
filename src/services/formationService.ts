import type {
  Formation,
  FormationDetails,
  FormationLevel,
} from "@/types/formation";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ================= LISTE ================= */
export async function fetchFormationsByLevel(
  level: FormationLevel,
  options?: { signal?: AbortSignal }
): Promise<Formation[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/formations/initiale/level/${level}`,
    { signal: options?.signal }
  );

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des formations");
  }

  return res.json();
}

/* ================= DÉTAILS PAR SLUG ================= */
export async function fetchFormationDetailsBySlug(
  slug: string,
  options?: { signal?: AbortSignal }
): Promise<FormationDetails> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/formations/initiale/slug/${slug}`,
    { signal: options?.signal }
  );

  if (!res.ok) {
    throw new Error("Formation introuvable");
  }

  return res.json();
}

/* ================= BROCHURE PAR SLUG ================= */
export async function sendFormationBrochureBySlug(
  slug: string,
  payload: { name: string; email: string }
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/formations/initiale/slug/${slug}/brochure`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de l’envoi de la brochure");
  }
}
