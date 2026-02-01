export interface FormationPreinscriptionRequest {
  nom: string;
  prenom: string;
  dateNaissance: string; // ISO yyyy-mm-dd
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
  typeEtablissement: "PUBLIC" | "PRIVE";
  serieBaccalaureat: "A" | "B" | "C" | "D" | "E" | "F" | "MI";
  anneeObtention: number;

  formationId: number;
  niveau: "LICENCE" | "MASTER";
  niveauEtude: number;

  statutEtudiant: "BOURSIER" | "NON_BOURSIER";
  modeFinancement: "ANBG" | "PARENTS" | "AUTRE";
  autreFinancement?: string;

  profession: string;
}
