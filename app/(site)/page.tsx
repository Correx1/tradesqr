import React from 'react'
import {
  Hero,
  ServicesStrip,
  FeaturedListings,
  RealEstateShowcase,
  DigitalCommunityBanner,
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
  let featuredListings: Listing[] = []
  let realEstateListings: Listing[] = []

  try {
    const [cars, recentRE, showcaseRE] = await Promise.all([
      client.fetch(recentCarsQuery),
      client.fetch(recentRealEstateQuery),
      client.fetch(realEstateShowcaseQuery),
    ])

    // Combine: 4 cars + 2 real estate for the carousel
    const combined = [
      ...(cars?.length ? cars : []),
      ...(recentRE?.length ? recentRE : []),
    ]
    featuredListings = combined.length > 0
      ? combined
      : DUMMY_LISTINGS.slice(0, 6)

    realEstateListings = showcaseRE?.length
      ? showcaseRE
      : DUMMY_LISTINGS.filter((l) => l.category === 'houses' || l.category === 'land')
  } catch {
    featuredListings = DUMMY_LISTINGS.slice(0, 6)
    realEstateListings = DUMMY_LISTINGS.filter(
      (l) => l.category === 'houses' || l.category === 'land'
    )
  }

  return (
    <main className="flex-1 w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Recent Listings Carousel (4 Cars + 2 Real Estate) */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <FeaturedListings listings={featuredListings} />
      </FadeInSection>

      {/* 3. Core Services Strip */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <ServicesStrip />
      </FadeInSection>

      {/* 4. Real Estate Spotlight Showcase */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <RealEstateShowcase listings={realEstateListings} />
      </FadeInSection>

      {/* 5. Digital Services & Community Short Banner */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <DigitalCommunityBanner />
      </FadeInSection>

      {/* 6. Frequently Asked Questions */}
      <FadeInSection direction="up" duration={0.5} delay={0.05}>
        <FAQ />
      </FadeInSection>
    </main>
  )
}
