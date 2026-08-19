import { ListingsCatalog } from '@/components/listings'
import { ListingsHero } from '@/components/sections/ListingsHero'
import { client } from '@/lib/sanity/client'
import { listingsQuery } from '@/lib/sanity/queries'
import { DUMMY_LISTINGS } from '@/lib/mockData'
import { type Listing } from '@/types/listing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Listings',
  description: 'Browse through foreign used cars, luxury houses, verified land plots, and direct assets.',
}

export const revalidate = 60

export default async function ListingsPage() {
  let listings: Listing[] = []

  try {
    const fetched = await client.fetch(listingsQuery)
    if (fetched && fetched.length > 0) {
      listings = fetched
    } else {
      listings = DUMMY_LISTINGS
    }
  } catch {
    listings = DUMMY_LISTINGS
  }

  return (
    <main className="w-full flex-1">
      {/* 1. Full-Width End-to-End Listings Hero */}
      <ListingsHero />

      {/* 2. Listings Catalog Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ListingsCatalog initialListings={listings} />
      </div>
    </main>
  )
}
