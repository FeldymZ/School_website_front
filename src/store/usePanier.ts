import { create } from "zustand"

/* ================= TYPES ================= */

export interface PanierItem {
  formationId: number
  titre: string

  prix?: number
  afficherPrix?: boolean

  participants: number
  slug: string
  coverUrl?: string
}

export interface ClientInfo {
  nomClient: string
  email: string
  telephone: string
  entreprise: boolean
  nomStructure: string
}

interface PanierState {
  items: PanierItem[]
  client: ClientInfo

  isOpen: boolean
  open: () => void
  close: () => void

  add: (item: PanierItem) => void
  remove: (formationId: number) => void
  updateParticipants: (formationId: number, qty: number) => void

  setClient: (client: Partial<ClientInfo>) => void
  clear: () => void
}

/* ================= STORE ================= */

export const usePanier = create<PanierState>((set) => ({

  items: [],

  client: {
    nomClient: "",
    email: "",
    telephone: "",
    entreprise: false,
    nomStructure: "",
  },

  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  /* ================= ADD ================= */
  add: (item) =>
    set((state) => {

      const normalized: PanierItem = {
        formationId: item.formationId,
        titre: item.titre,
        prix: item.prix,
        afficherPrix: item.afficherPrix ?? true,
        participants: Math.max(1, item.participants),
        slug: item.slug,
        coverUrl: item.coverUrl ?? undefined,
      }

      const exists = state.items.find(
        (i) => i.formationId === normalized.formationId
      )

      if (exists) {
        return {
          items: state.items.map((i) =>
            i.formationId === normalized.formationId
              ? {
                  ...i,
                  participants: i.participants + normalized.participants,
                }
              : i
          ),
        }
      }

      return { items: [...state.items, normalized] }
    }),

  /* ================= REMOVE ================= */
  remove: (formationId) =>
    set((state) => ({
      items: state.items.filter((i) => i.formationId !== formationId),
    })),

  /* ================= UPDATE ================= */
  updateParticipants: (formationId, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.formationId === formationId
          ? { ...i, participants: Math.max(1, qty) }
          : i
      ),
    })),

  /* ================= CLIENT ================= */
  setClient: (client) =>
    set((state) => ({
      client: { ...state.client, ...client },
    })),

  /* ================= CLEAR ================= */
  clear: () =>
    set({
      items: [],
      client: {
        nomClient: "",
        email: "",
        telephone: "",
        entreprise: false,
        nomStructure: "",
      },
      isOpen: false,
    }),

}))