import type { KeyFigure } from "@/types/keyFigure";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export async function fetchKeyFigures(
  options?: { signal?: AbortSignal }
): Promise<KeyFigure[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/key-figures`,
    {
      signal: options?.signal,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des chiffres clés");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
}
