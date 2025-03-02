export interface Gin {
    id: string
    name: string
    description?: string | null
    abv?: number | null
    priceRange?: string | null
    imageUrl?: string | null
    officialSiteUrl?: string | null
    amazonUrl?: string | null
    distilleryId: string
    countryId: string
    createdAt: Date
    updatedAt: Date
    distillery: Distillery
    country: Country
    botanicals: GinBotanical[]
  }
  
  export interface Distillery {
    id: string
    name: string
    description?: string | null
    location?: string | null
    website?: string | null
    foundedYear?: number | null
    countryId: string
    country?: Country
  }
  
  export interface Country {
    id: string
    name: string
    region?: string | null
  }
  
  export interface Botanical {
    id: string
    name: string
    description?: string | null
  }
  
  export interface GinBotanical {
    ginId: string
    botanicalId: string
    isPrimary: boolean
    botanical: Botanical
  }
  
  export interface SearchFilters {
    query?: string
    countryId?: string
    distilleryId?: string
  }