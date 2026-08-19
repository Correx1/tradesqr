export type ContactLinkType = 'whatsapp' | 'phone' | 'email' | 'facebook' | 'custom'

export interface ContactLink {
  _key?: string
  type: ContactLinkType
  label?: string
  value: string
}

export type ListingStatus = 'available' | 'pending' | 'sold'
export type ListingCategory = 'cars' | 'realEstate' | 'land' | 'generic' | 'houses' | 'services' | string

export interface ListingLocation {
  state?: string
  city?: string
}

export interface SanityImage {
  _type?: 'image'
  asset?: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  url?: string
}

/** A single amenity / feature badge — icon is a slug mapped to a Lucide icon on the frontend */
export interface ListingFeature {
  _key?: string
  label: string
  icon: string
}

/** A legal / title document with availability flag */
export interface ListingDocument {
  _key?: string
  name: string
  available: boolean
}

/** Generic attribute for 'other' category listings */
export interface ListingAttribute {
  _key?: string
  label: string
  value: string
}

export interface Listing {
  _id: string
  _type: 'listing'
  _createdAt: string
  title: string
  slug: { current: string }
  category: ListingCategory
  listingType?: string
  coverImage: SanityImage
  gallery?: SanityImage[]
  description?: string
  price?: number
  priceOnRequest?: boolean
  location?: ListingLocation
  status: ListingStatus
  contactLinks?: ContactLink[]

  /** Flexible amenities / features shown on the detail page */
  features?: ListingFeature[]

  /** Legal / title documents shown on the detail page */
  documents?: (string | ListingDocument)[]

  /** Free-form attributes for 'generic' category */
  attributes?: ListingAttribute[]

  // ── Cars ──────────────────────────────────────────
  make?: string
  model?: string
  year?: number
  mileage?: number
  transmission?: string
  fuelType?: string
  condition?: string
  color?: string

  // ── Real Estate ───────────────────────────────────
  propertyType?: string
  bedrooms?: number
  bathrooms?: number
  sizeSqm?: number
  titleDocument?: string
  furnishingStatus?: string
  listingPurpose?: string

  // ── Land ──────────────────────────────────────────
  plots?: number
  landSizeSqm?: number
  landTitleDocument?: string
  fenced?: boolean
  landPurpose?: string

  [key: string]: unknown
}
