'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Calendar,
  ShieldCheck,
  Sliders,
  Bed,
  Maximize2,
  Layers,
  Clock,
  MapPin,
  FileCheck,
  CheckCircle2,
} from 'lucide-react'
import { type Listing } from '@/types/listing'
import { CATEGORIES } from '@/lib/categoryFields'
import { formatPrice, cn } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity/image'

export interface ListingCardProps {
  listing: Listing
  priority?: boolean
  className?: string
}

export function ListingCard({ listing, priority = false, className }: ListingCardProps) {
  const categoryTitle =
    CATEGORIES.find((c) => c.value === listing.category)?.title || listing.category

  const formattedPrice = formatPrice({
    price: listing.price,
    priceOnRequest: listing.priceOnRequest,
  })

  const imageUrl = listing.coverImage
    ? urlForImage(listing.coverImage)?.width(800).height(1000).url()
    : undefined

  // Dynamically render high-value, relevant attributes (no generic km)
  const renderKeySpecs = () => {
    switch (listing.category) {
      case 'cars': {
        return (
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-white/90">
            {listing.condition && (
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-blue-300" />
                <span className="truncate">{String(listing.condition)}</span>
              </div>
            )}
            {listing.year !== undefined && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{String(listing.year)}</span>
              </div>
            )}
            {listing.transmission && (
              <div className="flex items-center gap-1.5 col-span-2">
                <Sliders className="h-4 w-4 shrink-0 text-blue-300" />
                <span className="truncate">{String(listing.transmission)}{listing.fuelType ? ` · ${listing.fuelType}` : ''}</span>
              </div>
            )}
          </div>
        )
      }

      case 'realEstate':
      case 'houses': {
        return (
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-white/90">
            {listing.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{String(listing.bedrooms)} Bedrooms</span>
              </div>
            )}
            {listing.sizeSqm !== undefined && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{new Intl.NumberFormat('en-NG').format(listing.sizeSqm as number)} sqm</span>
              </div>
            )}
            {listing.titleDocument && (
              <div className="flex items-center gap-1.5 col-span-2">
                <FileCheck className="h-4 w-4 shrink-0 text-blue-300" />
                <span className="truncate">Title: {String(listing.titleDocument)}</span>
              </div>
            )}
          </div>
        )
      }

      case 'land': {
        const landArea = listing.landSizeSqm ?? listing.sizeSqm
        const titleDoc = listing.landTitleDocument ?? listing.titleDocument
        return (
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-white/90">
            {landArea !== undefined && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{new Intl.NumberFormat('en-NG').format(landArea as number)} sqm</span>
              </div>
            )}
            {listing.plots !== undefined && (
              <div className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 shrink-0 text-blue-300" />
                <span>{String(listing.plots)} {Number(listing.plots) === 1 ? 'Plot' : 'Plots'}</span>
              </div>
            )}
            {titleDoc && (
              <div className="flex items-center gap-1.5 col-span-2">
                <FileCheck className="h-4 w-4 shrink-0 text-blue-300" />
                <span className="truncate">Title: {String(titleDoc)}</span>
              </div>
            )}
          </div>
        )
      }

      case 'services': {
        const sType = listing.serviceType ? String(listing.serviceType) : null
        const tTime = listing.turnaroundTime ? String(listing.turnaroundTime) : null
        if (!sType && !tTime) return null
        return (
          <div className="flex flex-col gap-1.5 text-xs text-white/90">
            {sType && (
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-300" />
                <span className="truncate">{sType}</span>
              </div>
            )}
            {tTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0 text-blue-300" />
                <span>Turnaround: {tTime}</span>
              </div>
            )}
          </div>
        )
      }

      default:
        return null
    }
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[3px] border border-border/80 bg-slate-900 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/50',
        className
      )}
    >
      <Link
        href={`/listings/${listing.slug.current}`}
        className="relative flex aspect-3/4 sm:aspect-4/5 w-full flex-col justify-between overflow-hidden focus:outline-hidden"
      >
        {/* Full Card Background Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}

        {/* Multi-layered dark gradient overlay for crystal clear contrast */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-slate-950 via-slate-950/65 to-black/30 transition-opacity duration-300 group-hover:via-slate-950/75" />

        {/* Top Badges Strip */}
        <div className="relative z-20 flex items-center justify-between p-4">
          {/* Price Pill Tag */}
          <div className="inline-flex items-center rounded-[3px] bg-white px-3 py-1 shadow-md">
            <span className="font-heading text-xs font-bold tracking-tight text-primary">
              {formattedPrice}
            </span>
          </div>

          {/* Category Tag */}
          <span className="inline-flex items-center rounded-[3px] bg-black/50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md border border-white/15">
            {categoryTitle}
          </span>
        </div>

        {/* Bottom Information Content */}
        <div className="relative z-20 flex flex-col justify-end p-5 pt-0 space-y-3">
          {/* Title & Location */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-blue-200 transition-colors">
              {listing.title}
            </h3>
            {listing.location?.city && (
              <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-300" />
                <span className="truncate">{listing.location.city}{listing.location.state ? `, ${listing.location.state}` : ''}</span>
              </div>
            )}
          </div>

          {/* High-Value Specs Strip */}
          <div className="pt-2 border-t border-white/15">
            {renderKeySpecs()}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
