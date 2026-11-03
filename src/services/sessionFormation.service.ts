import type { FormationAvecSessions, InscriptionSessionPayload, PageSessionsFormation } from "@/types/sessionFormation"
/* =============================
   ⚠️ Adresse de l'API : mettez la même que dans vos autres services du site
   (ex. import.meta.env.VITE_API_URL ou "https://api-test.esiitech-gabon.com")
============================= */
export const API_URL: string =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_API_URL ??
  "https://api-test.esiitech-gabon.com"

const BASE = `${API_URL}/api/public/sessions-formation`

/* Transforme une erreur du serveur en message lisible */
async function lire<T>(res: Response, defaut: string): Promise<T> {
  const texte = await res.text()
  let data: unknown = undefined
  try {
    data = texte ? JSON.parse(texte) : undefined
  } catch {
    data = undefined
  }
  if (!res.ok) {
    const d = data as { message?: string; error?: string } | undefined
    throw new Error(d?.message ?? d?.error ?? defaut)
  }
  return data as T
}

export const SessionFormationPublicService = {

  /** Image et textes de l'en-tête (modifiables dans le back office) */
  async page(): Promise<PageSessionsFormation> {
    const res = await fetch(`${API_URL}/api/public/sessions-formation-page`)
    return lire(res, "Impossible de charger la page")
  },

  /** Formations qui ont au moins une session ouverte */
  async formations(): Promise<FormationAvecSessions[]> {
    const res = await fetch(BASE)
    return lire(res, "Impossible de charger les sessions de formation")
  },

  /** Une formation + ses sessions ouvertes */
  async formation(slug: string): Promise<FormationAvecSessions> {
    const res = await fetch(`${BASE}/${encodeURIComponent(slug)}`)
    return lire(res, "Aucune session ouverte pour cette formation")
  },

  /** Inscription à une session */
  async inscrire(sessionId: number, payload: InscriptionSessionPayload): Promise<{ message: string }> {
    const res = await fetch(`${BASE}/${sessionId}/inscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return lire(res, "L'inscription n'a pas pu être envoyée")
  },
}

/** URL complète d'une image renvoyée par l'API (chemin relatif ou absolu) */
export const imageUrl = (url?: string | null) => {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`
}

/**
 * Image d'une formation : le nom du champ dépend de votre FormationDTO
 * (logo, cover, coverUrl, image…). On essaie les noms courants.
 */
export const imageFormation = (f: object): string | null => {
  const o = f as Record<string, unknown>
  for (const champ of ["logo", "logoUrl", "cover", "coverUrl", "image", "imageUrl", "photo", "photoUrl"]) {
    const v = o[champ]
    if (typeof v === "string" && v.trim() !== "") return imageUrl(v.trim())
  }
  return null
}