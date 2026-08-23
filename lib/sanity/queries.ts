import { groq } from 'next-sanity'

// 1. All listings for /listings page
export const listingsQuery = groq`
  *[_type == "listing"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    category,
    listingType,
    coverImage,
    price,
    priceOnRequest,
    location,
    status
  }
`

// 2. Homepage: 4 most recent Cars + 2 most recent Real Estate
export const recentCarsQuery = groq`
  *[_type == "listing" && category == "cars"] | order(_createdAt desc)[0...4] {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    category,
    listingType,
    coverImage,
    price,
    priceOnRequest,
    location,
    status,
    make,
    model,
    year,
    condition,
    transmission,
    fuelType
  }
`

export const recentRealEstateQuery = groq`
  *[_type == "listing" && (category == "realEstate" || category == "realestate")] | order(_createdAt desc)[0...2] {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    category,
    listingType,
    coverImage,
    price,
    priceOnRequest,
    location,
    status,
    propertyType,
    bedrooms,
    bathrooms,
    sizeSqm,
    titleDocument,
    listingPurpose
  }
`

// 3. Real Estate Showcase — most recent real estate listings (up to 6)
export const realEstateShowcaseQuery = groq`
  *[_type == "listing" && (category == "realEstate" || category == "realestate")] | order(_createdAt desc)[0...6] {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    category,
    listingType,
    coverImage,
    price,
    priceOnRequest,
    location,
    status,
    propertyType,
    bedrooms,
    bathrooms,
    sizeSqm,
    titleDocument,
    listingPurpose
  }
`

// 4. Single listing by slug — full detail
export const listingBySlugQuery = groq`
  *[_type == "listing" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    category,
    coverImage,
    gallery,
    description,
    price,
    priceOnRequest,
    location,
    status,
    contactLinks,
    features,
    documents,
    // Cars
    make,
    model,
    year,
    mileage,
    transmission,
    fuelType,
    condition,
    color,
    // Real Estate
    propertyType,
    bedrooms,
    sizeSqm,
    listingPurpose,
    // Land
    plots,
    landSizeSqm,
    landPurpose,
    // Generic
    attributes
  }
`

// 5. Slugs for static params / sitemap
export const listingSlugsQuery = groq`
  *[_type == "listing" && defined(slug.current)][].slug.current
`
