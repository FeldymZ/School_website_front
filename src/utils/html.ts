/**
 * Nettoie le HTML généré par TipTap avant stockage
 * - Supprime les paragraphes vides
 * - Supprime <p><br></p>, <p>&nbsp;</p>
 * - Supprime les retours à la ligne inutiles
 * - Préserve le HTML sémantique
 */
export function normalizeHtml(html: string): string {
  if (!html) return "";

  return html
    // <p><br></p>
    .replace(/<p><br\s*\/?><\/p>/gi, "")
    // <p>&nbsp;</p>
    .replace(/<p>(&nbsp;|\s)*<\/p>/gi, "")
    // retours ligne
    .replace(/\n/g, "")
    .trim();
}
