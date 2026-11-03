/* =========================================================
   SESSION DE FORMATION — site public
========================================================= */

/** Formation continue (mêmes champs que la page formation du site) */
export interface FormationPublic {
  id: number
  libelle: string
  slug: string
  description?: string | null
  objectifs?: string | null
  competences?: string | null
  prix?: number | null
  afficherPrix?: boolean | null
  duree?: number | null
  uniteDuree?: string | null
  lieu?: string | null
  titreDelivre?: string | null
  logo?: string | null
  cover?: string | null
}

/** Une session ouverte aux inscriptions */
export interface SessionPublic {
  id: number
  dateDebut: string            // "2026-11-09"
  dateFin: string
  lieu: string | null
  horaires: string | null
  nombrePlaces: number | null  // null = illimité
  placesRestantes: number | null
  complete: boolean
}

export interface FormationAvecSessions {
  formation: FormationPublic
  sessions: SessionPublic[]
}

/** Formulaire d'inscription */
export interface InscriptionSessionPayload {
  nom: string
  prenom: string
  sexe: "M" | "F"
  dateNaissance: string
  lieuNaissance: string
  email: string
  telephone: string
  lieuResidence: string
  enActivite: boolean
  profession: string | null
}

/** En-tête de la page (modifiable dans le back office) */
export interface PageSessionsFormation {
  badge: string | null
  titre: string
  sousTitre: string | null
  image: string | null
}