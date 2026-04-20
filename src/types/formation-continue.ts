/* ================= CATEGORIE ================= */

export interface CategorieFormationContinue {
  id: number
  libelle: string
}

/* ================= SOUS CATEGORIE ================= */

export interface SousCategorieFormationContinue {
  id: number
  libelle: string
  categorie?: CategorieFormationContinue
}

/* ================= FORMATION ================= */

export interface FormationContinue {
  id: number
  libelle: string       // ✅ renommé depuis titre
  description: string
  slug: string

  coverUrl: string | null
  pdfUrl: string | null

  prix?: number
  duree?: number
  uniteDuree?: "JOURS" | "MOIS" | "ANNEES"

  sousCategorie?: SousCategorieFormationContinue
}

/* ================= DEMANDE DEVIS ================= */

export interface DemandeDevisItem {
  slug: string
  participants: number
}

export interface CreateDemandeDevisGlobal {
  formations: DemandeDevisItem[]

  nomClient: string
  email: string
  telephone: string

  entreprise: boolean
  nomStructure?: string
}