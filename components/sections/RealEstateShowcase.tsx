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
  ArrowUpRight,
  ShieldCheck,
  Layers,
  FileCheck,
  ArrowRight,
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
  subheading = 'Explore verified luxury residential homes, contemporary duplexes, and prime commercial plots.',
  listings = [],
  viewAllHref = '/listings?category=realEstate',
  className,
}: RealEstateShowcaseProps) {
  // Filter for real estate (realEstate, houses + land)
  const realEstateListings = listings.filter(
    (l) => l.category === 'realEstate' || l.category === 'houses' || l.category === 'land'
  )

  const spotlightItem = realEstateListings[0]
  const gridItems = realEstateListings.slice(1, 5)

  if (!spotlightItem) return null

  const spotlightImg = spotlightItem.coverImage
    ? urlForImage(spotlightItem.coverImage)?.width(1200).height(900).url()
    : undefined

  const spotlightPrice = formatPrice({
    price: spotlightItem.price,
    priceOnRequest: spotlightItem.priceOnRequest,
  })

  return (
    <section
      data-section="real-estate-showcase"
      className={cn('py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Properties</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {subheading}
            </p>
          </div>

          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline transition-colors shrink-0"
          >
            <span>Explore All Real Estate</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento / Asymmetric Spotlight Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Left Column: Flagship Spotlight Card */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3 sm:p-3.5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40"
            >
              <Link
                href={`/listings/${spotlightItem.slug.current}`}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg sm:rounded-xl focus:outline-hidden"
              >
                {/* Media Window */}
                <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-100">
                  {spotlightImg ? (
                    <Image
                      src={spotlightImg}
                      alt={spotlightItem.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200" />
                  )}

                  {/* Top Left Status Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 backdrop-blur-md shadow-sm">
                      {spotlightItem.status === 'available' ? 'VERIFIED AVAILABLE' : spotlightItem.status}
                    </span>
                  </div>

                  {/* Bottom Image Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Price Overlay on Image */}
                  <div className="absolute bottom-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center rounded-full bg-slate-900/90 text-white px-4 py-1.5 font-heading text-lg sm:text-xl font-bold backdrop-blur-md shadow-md">
                      {spotlightPrice}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4 pt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                        {spotlightItem.title}
                      </h3>
                      {spotlightItem.titleDocument && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary border border-blue-200/60 shrink-0">
                          <FileCheck className="h-3 w-3" />
                          <span>{spotlightItem.titleDocument}</span>
                        </span>
                      )}
                    </div>

                    {spotlightItem.location?.city && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{spotlightItem.location.city}{spotlightItem.location.state ? `, ${spotlightItem.location.state}` : ''}</span>
                      </div>
                    )}
                  </div>

                  {/* Specs Strip */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex flex-wrap items-center gap-3.5">
                      {spotlightItem.bedrooms !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Bed className="h-4 w-4 text-slate-400" />
                          <span>{String(spotlightItem.bedrooms)} Beds</span>
                        </div>
                      )}
                      {spotlightItem.bathrooms !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Bath className="h-4 w-4 text-slate-400" />
                          <span>{String(spotlightItem.bathrooms)} Baths</span>
                        </div>
                      )}
                      {spotlightItem.sizeSqm !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Maximize2 className="h-4 w-4 text-slate-400" />
                          <span>{new Intl.NumberFormat('en-NG').format(spotlightItem.sizeSqm as number)} sqm</span>
                        </div>
                      )}
                      {spotlightItem.plots !== undefined && (
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Layers className="h-4 w-4 text-slate-400" />
                          <span>{String(spotlightItem.plots)} {Number(spotlightItem.plots) === 1 ? 'Plot' : 'Plots'}</span>
                        </div>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 2x2 Grid of 4 Properties */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gridItems.map((item) => {
              const itemImg = item.coverImage
                ? urlForImage(item.coverImage)?.width(600).height(450).url()
                : undefined

              const itemPrice = formatPrice({
                price: item.price,
                priceOnRequest: item.priceOnRequest,
              })

              return (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40"
                >
                  <Link
                    href={`/listings/${item.slug.current}`}
                    className="flex h-full flex-col justify-between overflow-hidden rounded-lg sm:rounded-xl focus:outline-hidden"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-100">
                      {itemImg ? (
                        <Image
                          src={itemImg}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200" />
                      )}

                      {/* Top Left Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-900 backdrop-blur-md shadow-xs">
                          {item.status === 'available' ? 'AVAILABLE' : item.status}
                        </span>
                      </div>

                      {/* Price Badge on Bottom Left of Image */}
                      <div className="absolute bottom-2.5 left-2.5 z-10">
                        <span className="inline-flex items-center rounded-full bg-slate-900/90 text-white px-3 py-1 font-heading text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs">
                          {itemPrice}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col justify-between p-2.5 pt-3 space-y-2">
                      <div>
                        <h4 className="font-heading text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>

                        {item.location?.city && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                            <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                            <span className="truncate">{item.location.city}{item.location.state ? `, ${item.location.state}` : ''}</span>
                          </div>
                        )}
                      </div>

                      {/* Specs Mini Strip */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                        <div className="flex items-center gap-2">
                          {item.bedrooms !== undefined && (
                            <span>{String(item.bedrooms)} Beds</span>
                          )}
                          {item.sizeSqm !== undefined && (
                            <span>· {new Intl.NumberFormat('en-NG').format(item.sizeSqm as number)} sqm</span>
                          )}
                          {item.plots !== undefined && (
                            <span>· {String(item.plots)} Plot</span>
                          )}
                        </div>

                        <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
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
