// lib/categoryFields.ts

export const CATEGORIES = [
  { value: 'all', title: 'All Categories' },
  { value: 'cars', title: 'Cars' },
  { value: 'realEstate', title: 'Real Estate' },
  { value: 'land', title: 'Land' },
] as const

export const CAR_CONDITIONS = [
  { value: '', label: 'All Conditions' },
  { value: 'Foreign Used', label: 'Foreign Used' },
  { value: 'Locally Used', label: 'Locally Used' },
  { value: 'Brand New', label: 'Brand New' },
] as const

export const CAR_TRANSMISSIONS = [
  { value: '', label: 'All Transmissions' },
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
] as const

export const CAR_FUEL_TYPES = [
  { value: '', label: 'All Fuel Types' },
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Electric', label: 'Electric' },
] as const

export const RE_BEDROOMS = [
  { value: '', label: 'Any Bedrooms' },
  { value: '1', label: '1 Bedroom' },
  { value: '2', label: '2 Bedrooms' },
  { value: '3', label: '3 Bedrooms' },
  { value: '4', label: '4 Bedrooms' },
  { value: '5+', label: '5+ Bedrooms' },
] as const

export const RE_PURPOSES = [
  { value: '', label: 'All Purposes' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'lease', label: 'For Lease' },
] as const

export const LAND_PURPOSES = [
  { value: '', label: 'All Purposes' },
  { value: 'sale', label: 'For Sale' },
  { value: 'lease', label: 'For Lease' },
] as const

export type CategoryValue = (typeof CATEGORIES)[number]['value']

export function getCategoryTitle(category?: string): string {
  if (!category) return 'Listing'
  const match = CATEGORIES.find((c) => c.value === category)
  if (match) return match.title
  if (category === 'realEstate') return 'Real Estate'
  return category.charAt(0).toUpperCase() + category.slice(1)
}

