// src/services/commentaireService.ts
import type { Commentaire } from "@/types/commentaire";

const API_URL =
  "https://api-test.esiitech-gabon.com/api/public/commentaires";

export async function fetchCommentaires(): Promise<Commentaire[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Erreur chargement témoignages");
  }
  return res.json();
}
