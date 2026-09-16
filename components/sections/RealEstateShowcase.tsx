'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ShieldCheck,
  Layers,
  FileCheck,
} from 'lucide-react'
import { type Listing } from '@/types/listing'
import { formatPrice, cn } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity/image'

export interface RealEstateShowcaseProps {
  heading?: string
  subheading?: string
  listings?: Listing[]
  viewAllHref?: string
  className?: string
}

export function RealEstateShowcase({
  heading = 'Prime real estate & land',
  subheading = 'Explore verified residential homes, contemporary duplexes, and registered commercial plots.',
  listings = [],
  viewAllHref = '/listings?category=realEstate',
  className,
}: RealEstateShowcaseProps) {
  // Filter for real estate (realEstate, houses + land) supporting case variations
  const realEstateListings = listings.filter((l) => {
    const cat = (l.category || (l as any).Category || '').toLowerCase()
    return cat === 'realestate' || cat === 'houses' || cat === 'land'
  })

  const spotlightItem = realEstateListings[0]
  const gridItems = realEstateListings.slice(1, 5)

  if (!spotlightItem) return null

  const spotlightCoverImage = spotlightItem.coverImage || (spotlightItem as any).coverimage || (spotlightItem as any).CoverImage
  const spotlightImg = spotlightCoverImage
    ? urlForImage(spotlightCoverImage)?.width(1200).height(900).url()
    : undefined

  const spotlightPrice = formatPrice({
    price: spotlightItem.price,
    priceOnRequest: spotlightItem.priceOnRequest,
  })

  return (
    <section
      data-section="real-estate-showcase"
      className={cn('py-16 sm:py-24 bg-background text-foreground border-b border-border', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="max-w-2xl space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified property &amp; land</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              {subheading}
            </p>
          </div>

          <Link
            href={viewAllHref}
            className="text-xs font-semibold text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors shrink-0"
          >
            View all properties
          </Link>
        </div>

        {/* 2-Column Showcase: Left Spotlight + Right 4-Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Spotlight Large Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 flex flex-col"
          >
            <Link
              href={`/listings/${spotlightItem.slug.current}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-xs border border-border bg-card p-3 sm:p-4 shadow-xs transition-all duration-300 hover:shadow-md hover:border-border/80"
            >
              {/* Image & Price Overlay */}
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden rounded-xs bg-muted">
                {spotlightImg ? (
                  <Image
                    src={spotlightImg}
                    alt={spotlightItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md shadow-xs border border-border">
                    {spotlightItem.category === 'land' ? 'Land plot' : spotlightItem.propertyType || 'Real estate'}
                  </span>
                </div>

                {/* Price pill */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-background/90 text-foreground px-3.5 py-1.5 font-heading text-base sm:text-lg font-bold backdrop-blur-md shadow-xs border border-border">
                    {spotlightPrice}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="mt-4 flex flex-1 flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {spotlightItem.title}
                  </h3>

                  {spotlightItem.location && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>
                        {spotlightItem.location.city}, {spotlightItem.location.state}
                      </span>
                    </div>
                  )}
                </div>

                {/* Key Spec Row */}
                <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    {spotlightItem.bedrooms && (
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <Bed className="h-4 w-4 text-primary" />
                        <span>{spotlightItem.bedrooms} Beds</span>
                      </div>
                    )}
                    {spotlightItem.bathrooms && (
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <Bath className="h-4 w-4 text-primary" />
                        <span>{spotlightItem.bathrooms} Baths</span>
                      </div>
                    )}
                    {spotlightItem.sizeSqm && (
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <Maximize2 className="h-4 w-4 text-primary" />
                        <span>{spotlightItem.sizeSqm} sqm</span>
                      </div>
                    )}
                    {spotlightItem.plots && (
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <Layers className="h-4 w-4 text-primary" />
                        <span>{spotlightItem.plots} Plots</span>
                      </div>
                    )}
                  </div>

                  <span className="font-semibold text-primary">
                    View details
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right 4 Grid Listings (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {gridItems.map((item, index) => {
              const itemCoverImage = item.coverImage || (item as any).coverimage || (item as any).CoverImage
              const itemImg = itemCoverImage
                ? urlForImage(itemCoverImage)?.width(600).height(400).url()
                : undefined
              const itemPrice = formatPrice({
                price: item.price,
                priceOnRequest: item.priceOnRequest,
              })

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <Link
                    href={`/listings/${item.slug.current}`}
                    className="group relative flex flex-col overflow-hidden rounded-xs border border-border bg-card p-2.5 sm:p-3 shadow-xs transition-all duration-300 hover:shadow-md hover:border-border/80"
                  >
                    {/* Image */}
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-xs bg-muted">
                      {itemImg ? (
                        <Image
                          src={itemImg}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}

                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center rounded-full bg-background/85 px-2.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-md shadow-xs border border-border">
                          {item.category === 'land' ? 'Land' : item.propertyType || 'Property'}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-2">
                        <span className="inline-flex items-center rounded-full bg-background/90 text-foreground px-2.5 py-0.5 font-heading text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs border border-border">
                          {itemPrice}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-3 flex flex-1 flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-heading text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        {item.location && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0 text-primary" />
                            <span className="truncate">
                              {item.location.city}, {item.location.state}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-2.5">
                          {item.bedrooms ? (
                            <span className="font-medium text-foreground">{item.bedrooms} Bed</span>
                          ) : null}
                          {item.plots ? (
                            <span className="font-medium text-foreground">{item.plots} Plot</span>
                          ) : null}
                          {item.documents && item.documents.length > 0 ? (
                            <span className="inline-flex items-center gap-0.5 text-primary">
                              <FileCheck className="h-3 w-3" />
                              <span>Verified</span>
                            </span>
                          ) : null}
                        </div>

                        <span className="text-primary font-semibold">
                          View
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
