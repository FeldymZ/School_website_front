const API_BASE_URL = "https://api-test.esiitech-gabon.com";

export function resolveMediaUrl(mediaUrl: string): string {
  if (mediaUrl.startsWith("http")) {
    return mediaUrl;
  }
  return `${API_BASE_URL}${mediaUrl}`;
}
