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
   ENUMS FRONT (SYNC BACKEND)
========================= */
export type Civilite = "M" | "MME" | "MLLE";

export type NiveauSouhaite =
  | "PREMIERE_ANNEE"
  | "DEUXIEME_ANNEE"
  | "TROISIEME_ANNEE";

/* =========================
   REQUEST FRONT → BACK
========================= */
export interface FormationPreinscriptionRequest {
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
}

/* =========================
   DEMANDE (ADMIN)
========================= */
export interface PreinscriptionDemande {
  id: number;

  civilite: string;
  nom: string;
  prenom: string;

  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;

  email: string;
  telephone: string;
  whatsapp?: string;

  niveauSouhaite: "LICENCE" | "MASTER";

  formationId: number;

  statut?: "EN_ATTENTE" | "VALIDEE" | "REJETEE";
  createdAt?: string;
}