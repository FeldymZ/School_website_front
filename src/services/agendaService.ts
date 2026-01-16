import type { AgendaEvent } from "@/types/agenda";

const API_BASE_URL = "https://api-test.esiitech-gabon.com";

/* ===== ÉVÉNEMENTS À VENIR ===== */
export async function fetchUpcomingEvents(): Promise<AgendaEvent[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/agenda/upcoming`
  );

  if (!res.ok) {
    throw new Error("Erreur chargement agenda à venir");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/* ===== ÉVÉNEMENTS PASSÉS ===== */
export async function fetchPastEvents(): Promise<AgendaEvent[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/agenda/past`
  );

  if (!res.ok) {
    throw new Error("Erreur chargement agenda passé");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
