const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export function resolveMediaUrl(mediaUrl?: string | null): string {

  if (!mediaUrl || !mediaUrl.trim()) {
    return "/placeholder.jpg";
  }

  // URL absolue (http / https)
  if (/^https?:\/\//i.test(mediaUrl)) {
    return mediaUrl;
  }

  // Normalisation du chemin
  const normalized =
    mediaUrl.startsWith("/") ? mediaUrl : `/${mediaUrl}`;

  // 🔥 évite double slash
  return `${API_BASE_URL.replace(/\/$/, "")}${normalized}`;
}