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
  Heart,
  Share2,
  ArrowUpRight,
  ShieldCheck,
  Layers,
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
  heading = 'Prime Real Estate & Land Deals',
  subheading = 'Explore verified luxury residential homes, contemporary duplexes, and prime commercial plots across Nigeria.',
  listings = [],
  viewAllHref = '/listings?category=houses',
  className,
}: RealEstateShowcaseProps) {
  // Filter for real estate (houses + land)
  const realEstateListings = listings.filter(
    (l) => l.category === 'houses' || l.category === 'land'
  )

  const spotlightItem = realEstateListings[0]
  const gridItems = realEstateListings.slice(1, 5)

  if (!spotlightItem) return null

  const spotlightImg = spotlightItem.coverImage
    ? urlForImage(spotlightItem.coverImage)?.width(1000).height(1000).url()
    : undefined

  const spotlightPrice = formatPrice({
    price: spotlightItem.price,
    priceOnRequest: spotlightItem.priceOnRequest,
  })

  return (
    <section
      data-section="real-estate-showcase"
      className={cn('py-16 sm:py-24 bg-slate-50/70 border-b border-border/80', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Properties</span>
            </div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {subheading}
            </p>
          </div>

          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            <span>Explore All Real Estate</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento / Asymmetric Spotlight Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Left Column: Big Spotlight Card */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40"
            >
              <Link
                href={`/listings/${spotlightItem.slug.current}`}
                className="relative flex h-full min-h-[460px] flex-col justify-between overflow-hidden focus:outline-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden bg-slate-100">
                  {spotlightImg ? (
                    <Image
                      src={spotlightImg}
                      alt={spotlightItem.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200" />
                  )}

                  {/* Top Left Status Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur-md shadow-xs">
                      {spotlightItem.status === 'available' ? 'AVAILABLE' : spotlightItem.status}
                    </span>
                  </div>

                  {/* Top Right Action Icons */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur-md shadow-xs transition-colors hover:text-red-500">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur-md shadow-xs transition-colors hover:text-primary">
                      <Share2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {spotlightItem.title}
                    </h3>

                    {/* Price and Badge */}
                    <div className="mt-2.5 flex items-center gap-3">
                      <span className="font-heading text-2xl font-extrabold text-foreground">
                        {spotlightPrice}
                      </span>
                      {spotlightItem.titleDocument && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                          {spotlightItem.titleDocument}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Specs & Location */}
                  <div className="mt-6 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-4">
                      {spotlightItem.bedrooms !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span>{String(spotlightItem.bedrooms)} Beds</span>
                        </div>
                      )}
                      {spotlightItem.bathrooms !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                          <Bath className="h-4 w-4 text-muted-foreground" />
                          <span>{String(spotlightItem.bathrooms)} Baths</span>
                        </div>
                      )}
                      {spotlightItem.sizeSqm !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                          <Maximize2 className="h-4 w-4 text-muted-foreground" />
                          <span>{new Intl.NumberFormat('en-NG').format(spotlightItem.sizeSqm as number)} sqm</span>
                        </div>
                      )}
                      {spotlightItem.plots !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                          <Layers className="h-4 w-4 text-muted-foreground" />
                          <span>{String(spotlightItem.plots)} {Number(spotlightItem.plots) === 1 ? 'Plot' : 'Plots'}</span>
                        </div>
                      )}
                    </div>

                    {spotlightItem.location?.city && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{spotlightItem.location.city}{spotlightItem.location.state ? `, ${spotlightItem.location.state}` : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 2x2 Grid of 4 Properties */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gridItems.map((item) => {
              const itemImg = item.coverImage
                ? urlForImage(item.coverImage)?.width(600).height(400).url()
                : undefined

              const itemPrice = formatPrice({
                price: item.price,
                priceOnRequest: item.priceOnRequest,
              })

              return (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/40"
                >
                  <Link
                    href={`/listings/${item.slug.current}`}
                    className="flex h-full flex-col justify-between focus:outline-hidden"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                      {itemImg ? (
                        <Image
                          src={itemImg}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200" />
                      )}

                      {/* Top Left Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="inline-flex items-center rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-foreground backdrop-blur-md shadow-2xs">
                          {item.status === 'available' ? 'AVAILABLE' : item.status}
                        </span>
                      </div>

                      {/* Top Right Heart Icon */}
                      <div className="absolute top-2.5 right-2.5 z-10">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur-md shadow-2xs hover:text-red-500">
                          <Heart className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h4 className="font-heading text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="font-heading text-base font-extrabold text-foreground">
                            {itemPrice}
                          </span>
                          {item.priceOnRequest ? null : (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                              Negotiable
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Location */}
                      {item.location?.city && (
                        <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                          <span className="truncate">{item.location.city}{item.location.state ? `, ${item.location.state}` : ''}</span>
                        </div>
                      )}
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
