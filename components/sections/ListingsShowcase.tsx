'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { type Listing } from '@/types/listing'
import { ListingCard } from '@/components/listings/ListingCard'
import { cn } from '@/lib/utils'

export interface ListingsShowcaseProps {
  listings: Listing[]
  heading?: string
  subheading?: string
  className?: string
}

const TABS = [
  { id: 'all', label: 'All Listings' },
  { id: 'cars', label: 'Cars' },
  { id: 'realEstate', label: 'Real Estate' },
  { id: 'land', label: 'Land' },
] as const

export function ListingsShowcase({
  listings = [],
  heading = 'Featured Verified Listings',
  subheading = 'Explore authentic cars, luxury properties, and titled land plots ready for direct acquisition.',
  className,
}: ListingsShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>('all')

  const filteredListings = useMemo(() => {
    if (activeTab === 'all') return listings.slice(0, 9)

    return listings.filter((item) => {
      const cat = (item.category || '').toLowerCase()
      if (activeTab === 'cars') {
        return cat === 'cars'
      }
      if (activeTab === 'realEstate') {
        return cat === 'realestate' || cat === 'houses'
      }
      if (activeTab === 'land') {
        return cat === 'land'
      }
      return true
    }).slice(0, 9)
  }, [listings, activeTab])

  const viewAllHref =
    activeTab === 'all'
      ? '/listings'
      : `/listings?category=${activeTab}`

  return (
    <section
      data-section="listings-showcase"
      className={cn('w-full py-16 sm:py-24 bg-background border-b border-border/80', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border">
          <div className="max-w-2xl text-left space-y-2">
            <span className="text-xs font-medium text-primary tracking-wide">
              Direct marketplace
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted rounded-full border border-border/60 shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 focus:outline-hidden',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="pt-10">
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredListings.map((listing, index) => (
                <ListingCard
                  key={listing._id || index}
                  listing={listing}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-sm">No listings found in this category.</p>
            </div>
          )}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors"
          >
            View all {activeTab === 'all' ? 'listings' : activeTab === 'cars' ? 'cars' : activeTab === 'realEstate' ? 'real estate' : 'land'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ListingsShowcase
