// lib/categoryFields.ts

export const CATEGORIES = [
  { value: 'cars', title: 'Cars' },
  { value: 'realEstate', title: 'Real Estate' },
  { value: 'land', title: 'Land' },
  { value: 'generic', title: 'General' },
  { value: 'houses', title: 'Houses' },
  { value: 'services', title: 'Services' },
] as const

export type CategoryValue = (typeof CATEGORIES)[number]['value']

export function getCategoryTitle(category?: string): string {
  if (!category) return 'Listing'
  const match = CATEGORIES.find((c) => c.value === category)
  if (match) return match.title
  if (category === 'realEstate') return 'Real Estate'
  return category.charAt(0).toUpperCase() + category.slice(1)
}
