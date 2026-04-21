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

  // 🔥 IMPORTANT
  reference?: number

  libelle: string
  description: string
  slug: string

  coverUrl: string | null
  pdfUrl: string | null

  objectifs?: string
  competences?: string

  prix?: number

  // ✅ AJOUT CRITIQUE
  afficherPrix?: boolean

  duree?: number

  // ✅ AJOUT SEMAINE
  uniteDuree?: "JOURS" | "SEMAINES" | "MOIS" | "ANNEES"

  // 🔥 recommandé
  enabled?: boolean

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