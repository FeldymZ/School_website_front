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
  const response = await fetch(
    `${API_BASE_URL}/api/public/formations/initiale/level/${level}`,
    {
      signal: options?.signal,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des formations");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

/* ================= DÉTAILS ================= */
export async function fetchFormationDetails(
  id: number,
  options?: { signal?: AbortSignal }
): Promise<FormationDetails> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/formations/initiale/${id}`,
    {
      signal: options?.signal,
    }
  );

  if (!response.ok) {
    throw new Error("Formation introuvable");
  }

  return response.json();
}
