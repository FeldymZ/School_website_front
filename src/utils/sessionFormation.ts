/* 🖼️ Image d'arrière-plan de l'en-tête des pages « Session de formation » :
   mettez votre image dans le dossier public/images/ du site
   (ex. public/images/sessions-formation.jpg) ou une adresse https://… */
export const IMAGE_FOND_SESSIONS = "/images/sessions-formation.jpg"

/** "2026-11-09" → Date locale (sans décalage de fuseau) */
export const versDate = (iso: string) => {
  const [a, m, j] = iso.split("-").map(Number)
  return new Date(a, m - 1, j)
}

export const dateLongue = (iso: string) =>
  versDate(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

/** "Du 9 au 13 novembre 2026" */
export const periode = (debut: string, fin: string) => {
  if (debut === fin) return `Le ${dateLongue(debut)}`
  const d = versDate(debut)
  const f = versDate(fin)
  if (d.getFullYear() === f.getFullYear() && d.getMonth() === f.getMonth()) {
    return `Du ${d.getDate()} au ${dateLongue(fin)}`
  }
  return `Du ${dateLongue(debut)} au ${dateLongue(fin)}`
}

export const nbJours = (debut: string, fin: string) =>
  Math.round((versDate(fin).getTime() - versDate(debut).getTime()) / 86400000) + 1

export const jourMois = (iso: string) => {
  const d = versDate(iso)
  return {
    jour: d.getDate(),
    mois: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""),
  }
}

export const formatPrix = (n?: number | null) =>
  `${Math.round(n ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} FCFA`

export const formatDuree = (duree?: number | null, unite?: string | null) =>
  duree ? `${duree} ${(unite ?? "").toLowerCase().replace(/_/g, " ")}` : null