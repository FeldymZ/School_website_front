const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export function resolveMediaUrl(mediaUrl?: unknown): string {
  if (typeof mediaUrl !== "string" || !mediaUrl.trim()) {
    return "/placeholder.jpg";
  }

  // URL absolue
  if (mediaUrl.startsWith("http")) {
    return mediaUrl;
  }

  // 🔥 NORMALISATION ICI
  const normalized =
    mediaUrl.startsWith("/") ? mediaUrl : `/${mediaUrl}`;

  return `${API_BASE_URL}${normalized}`;
}
