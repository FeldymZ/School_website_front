type SharePayload = {
  title: string;
  text?: string;
  url?: string;
};

export function useShare() {
  const share = async ({ title, text, url }: SharePayload) => {
    const shareUrl = url ?? window.location.href;

    // API Web Share (mobile / navigateurs compatibles)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text ?? title,
          url: shareUrl,
        });
        return;
      } catch {
        // Annulation utilisateur → on ne fait rien
        return;
      }
    }

    // Fallback desktop : copier le lien
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Lien copié dans le presse-papier !");
    } catch {
      alert("Impossible de partager le lien.");
    }
  };

  return { share };
}
