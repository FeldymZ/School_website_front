import type {
  FormationContinue,
} from "@/types/formation-continue"
import type { CreateDemandeDevisGlobal } from "@/types/formation-continue"
import type { PageResponse } from "@/types/pagination"
import { DemandeDevisFormationContinue } from "@/types/demandeDevisFormationContinue"

const API_BASE_URL = "https://api-test.esiitech-gabon.com"

/* ================= LISTE ================= */

export async function fetchPublicFormationsContinues(
  page = 0,
  size = 10,
  categorieId?: number,
  sousCategorieId?: number
): Promise<PageResponse<FormationContinue>> {

  let url = `${API_BASE_URL}/api/public/formations?page=${page}&size=${size}`

  if (categorieId) url += `&categorieId=${categorieId}`
  if (sousCategorieId) url += `&sousCategorieId=${sousCategorieId}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Erreur chargement formations continues")
  }

  return res.json()
}

/* ================= DETAIL ================= */

export async function fetchPublicFormationContinueBySlug(
  slug: string
): Promise<FormationContinue> {

  const res = await fetch(
    `${API_BASE_URL}/api/public/formations/slug/${slug}`
  )

  if (!res.ok) {
    throw new Error("Formation introuvable")
  }

  return res.json()
}

/* ================= DEVIS ================= */

export async function sendDemandeDevisFormationContinue(
  data: DemandeDevisFormationContinue
): Promise<void> {

  const res = await fetch(
    `${API_BASE_URL}/api/public/demandes-devis`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  )

  if (!res.ok) {
    throw new Error("Erreur envoi demande devis")
  }
}

export async function sendDemandeDevisGlobal(
  data: CreateDemandeDevisGlobal
): Promise<void> {

  const res = await fetch(
    `${API_BASE_URL}/api/public/demandes-devis/global`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )

  if (!res.ok) {
    let message = "Erreur envoi demande globale"
    try {
      const err = await res.json()
      message = err?.message || err?.error || message
    } catch {}
    throw new Error(message)
  }
}