import type { BannerMessagePublic } from "@/types/bannerMessage";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ===== MESSAGE DE BANNIÈRE ACTIF ===== */
export async function fetchActiveBannerMessage(): Promise<BannerMessagePublic | null> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/banner-message`
  );

  /* Aucun message actif */
  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Erreur chargement BannerMessage");
  }

  const data = await res.json();
  return data ?? null;
}
