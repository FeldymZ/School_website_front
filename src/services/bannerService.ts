import { Banner } from "@/types/banner";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export async function fetchBanners(): Promise<Banner[]> {
  const response = await fetch(`${API_BASE_URL}/api/public/banners`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des bannières");
  }

  const data: Banner[] = await response.json();

  return data
    .filter(banner => banner.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
