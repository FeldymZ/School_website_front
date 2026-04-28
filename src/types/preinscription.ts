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
   DEMANDE PREINSCRIPTION
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

/* =========================
   EMETTEUR
========================= */
export interface PreinscriptionEmetteur {
  id: number;
  nom: string;
  fonction: string;
  signatureUrl?: string;
  actif?: boolean;
}

/* =========================
   SESSION ADMIN
========================= */
export interface SessionUniversitaire {
  id: number;
  annee: string;
}

/* =========================
   PERIODE
========================= */
export interface PreinscriptionPeriode {
  id: number;

  dateDebut: string;
  dateFin: string;

  active: boolean;

  session?: SessionUniversitaire;
  emetteur?: PreinscriptionEmetteur;
}

/* =========================
   ✅ PAYLOAD FORMULAIRE (IMPORTANT)
========================= */
export interface FormationPreinscriptionRequest {
  nom: string;
  prenom: string;

  dateNaissance: string;
  lieuNaissance: string;
  sexe: "MASCULIN" | "FEMININ";

  nationalite: string;
  adresse: string;

  telephone: string;
  email: string;

  situationFamiliale:
    | "CELIBATAIRE_SANS_ENFANT"
    | "CELIBATAIRE_AVEC_ENFANT"
    | "COUPLE_SANS_ENFANT"
    | "COUPLE_AVEC_ENFANT";

  nomEtablissement: string;
  typeEtablissement: string;
  serieBaccalaureat: string;
  anneeObtention: number;

  formationId: number;

  niveau: "LICENCE" | "MASTER";
  niveauEtude: number;

  statutEtudiant: string;
  modeFinancement: string;
  autreFinancement?: string;

  profession: string;
}