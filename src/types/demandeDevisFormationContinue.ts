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


export interface DemandeDevisFormationContinue {
  nomClient: string
  email: string
  telephone: string
  entreprise: boolean
  nomStructure?: string
  nombreParticipants: number
  slug: string
}