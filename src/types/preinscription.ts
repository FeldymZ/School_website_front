/* =========================
   SESSION PUBLIQUE
========================= */
export interface SessionPublique {
  ouverte: boolean;
  anneeUniversitaire: string | null;
  dateDebut: string | null;
  dateFin: string | null;
}

/* =========================
   ENUMS BACKEND
========================= */
export type Civilite =
  | "M"
  | "MME"
  | "MLLE";

export type NiveauSouhaite =
  | "PREMIERE_ANNEE"
  | "DEUXIEME_ANNEE"
  | "TROISIEME_ANNEE";

export type StatutDiplome =
  | "OBTENU"
  | "EN_COURS";

/* =========================
   REQUEST BACKEND
========================= */
export type PreinscriptionRequest = {

  civilite: Civilite;

  nom: string;
  prenom: string;

  dateNaissance: string;
  lieuNaissance: string;

  nationalite: string;

  email: string;

  telephone: string;

  whatsapp?: string;

  niveauSouhaite: NiveauSouhaite;

  formationId: number;

  /* ================= DIPLOME ================= */

  diplomePresente: string;

  statutDiplome: StatutDiplome;

  anneeObtention?: number;

  etablissementProvenance: string;
};

/* =========================
   RESPONSE BACKEND
========================= */
export interface PreinscriptionDemande {

  id: number;

  civilite: string;

  nom: string;
  prenom: string;

  email: string;

  telephone: string;

  whatsapp?: string;

  niveau: string;

  formation: string;

  nationalite: string;

  diplomePresente: string;

  statutDiplome: string;

  anneeObtention?: number;

  etablissementProvenance: string;

  statut:
    | "EN_ATTENTE"
    | "VALIDEE"
    | "REJETEE";

  createdAt?: string;

  validatedAt?: string;

  pdfUrl?: string;
}