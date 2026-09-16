import React from 'react'
import {
  Hero,
  CategoryTiles,
  ListingsShowcase,
  ServicesStrip,
  WhyChooseUs,
  FAQ,
} from '@/components/sections'
import { FadeInSection } from '@/components/motion'
import { client } from '@/lib/sanity/client'
import {
  recentCarsQuery,
  recentRealEstateQuery,
  realEstateShowcaseQuery,
} from '@/lib/sanity/queries'
import { DUMMY_LISTINGS } from '@/lib/mockData'
import { type Listing } from '@/types/listing'

export const revalidate = 60

export default async function HomePage() {
  let showcaseListings: Listing[] = []

  try {
    const [cars, recentRE, showcaseRE] = await Promise.all([
      client.fetch(recentCarsQuery),
      client.fetch(recentRealEstateQuery),
      client.fetch(realEstateShowcaseQuery),
    ])

    const combined = [
      ...(cars?.length ? cars : []),
      ...(recentRE?.length ? recentRE : []),
      ...(showcaseRE?.length ? showcaseRE : []),
    ]
    showcaseListings = combined.length > 0 ? combined : DUMMY_LISTINGS
  } catch {
    showcaseListings = DUMMY_LISTINGS
  }

  return (
    <main className="flex-1 w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Primary Visual Entry Category Tiles */}
      <CategoryTiles />

      {/* 3. Unified Listings Showcase with Category Tabs */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <ListingsShowcase listings={showcaseListings} />
      </FadeInSection>

      {/* 4. Core Solutions & Services Strip */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <ServicesStrip />
      </FadeInSection>

      {/* 5. Why Choose Us Direct Marketplace */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <WhyChooseUs />
      </FadeInSection>

      {/* 6. Frequently Asked Questions */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <FAQ />
      </FadeInSection>
    </main>
  )
}

