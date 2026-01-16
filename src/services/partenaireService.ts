const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export type Partenaire = {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
};

export async function fetchPartenaires(
  options?: { signal?: AbortSignal }
): Promise<Partenaire[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/public/partenaires`,
    {
      signal: options?.signal,
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des partenaires");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
