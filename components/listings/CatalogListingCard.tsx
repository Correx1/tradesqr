'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Bed,
  Bath,
  Maximize2,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { type Listing } from '@/types/listing'
import { CATEGORIES } from '@/lib/categoryFields'
import { formatPrice, cn } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity/image'

export interface CatalogListingCardProps {
  listing: Listing
  priority?: boolean
  className?: string
}

export function CatalogListingCard({ listing, priority = false, className }: CatalogListingCardProps) {
  // Safe case-insensitive field extractions
  const categoryRaw = listing.category || (listing as any).Category || ''
  const category = categoryRaw.toLowerCase()

  const categoryTitle =
    CATEGORIES.find((c) => c.value.toLowerCase() === category)?.title || categoryRaw

  const formattedPrice = formatPrice({
    price: listing.price,
    priceOnRequest: listing.priceOnRequest,
  })

  const coverImage = listing.coverImage || (listing as any).coverimage || (listing as any).CoverImage

  const imageUrl =
    (coverImage && urlForImage(coverImage)?.width(800).height(600).url()) ||
    (coverImage && (coverImage as any).url) ||
    (typeof coverImage === 'string' ? coverImage : undefined) ||
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'

  const whatsappMessage = encodeURIComponent(
    `Hello TradeSqr, I am interested in this listing: ${listing.title}`
  )
  const whatsappUrl = `https://wa.me/2348012345678?text=${whatsappMessage}`

  const locationString =
    typeof listing.location === 'object' && listing.location !== null
      ? [listing.location.city, listing.location.state].filter(Boolean).join(', ')
      : typeof listing.location === 'string'
      ? listing.location
      : ''

  return (
    <div
      className={cn(
        'group flex flex-col rounded-lg border border-border bg-card overflow-hidden shadow-xs transition-all duration-300 hover:shadow-md hover:border-border/80',
        className
      )}
    >
      {/* Top Image Container */}
      <Link
        href={`/listings/${listing.slug.current}`}
        className="relative block aspect-16/11 w-full overflow-hidden bg-muted"
      >
        <Image
          src={imageUrl}
          alt={listing.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-background/85 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wide text-foreground border border-border shadow-xs">
            {categoryTitle}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>Verified</span>
          </span>
        </div>
      </Link>

      {/* Card Content Details */}
      <div className="flex flex-1 flex-col p-5">
        {/* Price */}
        <div className="mb-1.5">
          <span className="font-heading text-lg sm:text-xl font-bold text-foreground tracking-tight">
            {formattedPrice}
          </span>
        </div>

        {/* Title */}
        <Link href={`/listings/${listing.slug.current}`} className="group/title">
          <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2 leading-snug group-hover/title:text-primary transition-colors">
            {listing.title}
          </h3>
        </Link>

        {/* Location if present */}
        {locationString && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{locationString}</span>
          </div>
        )}

        {/* Key Specification Chips */}
        <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {listing.category === 'cars' && (
            <>
              {listing.year && (
                <div className="flex items-center gap-1 rounded-xs bg-muted/40 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span>{listing.year}</span>
                </div>
              )}
              {listing.condition && (
                <div className="flex items-center gap-1 rounded-xs bg-muted/40 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  <span>{listing.condition}</span>
                </div>
              )}
            </>
          )}

          {(listing.category === 'realEstate' || listing.category === 'houses' || listing.category === 'land') && (
            <>
              {listing.bedrooms && (
                <div className="flex items-center gap-1 rounded-xs bg-muted/40 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <Bed className="h-3 w-3 text-muted-foreground" />
                  <span>{listing.bedrooms} Beds</span>
                </div>
              )}
              {listing.bathrooms && (
                <div className="flex items-center gap-1 rounded-xs bg-muted/40 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <Bath className="h-3 w-3 text-muted-foreground" />
                  <span>{listing.bathrooms} Baths</span>
                </div>
              )}
              {(listing.landSizeSqm || listing.sizeSqm) && (
                <div className="flex items-center gap-1 rounded-xs bg-muted/40 border border-border px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <Maximize2 className="h-3 w-3 text-muted-foreground" />
                  <span>{listing.landSizeSqm || listing.sizeSqm} sqm</span>
                </div>
              )}
            </>
          )}

          {listing.category === 'services' && (
            <div className="flex items-center gap-1 rounded-xs bg-primary/10 border border-primary/20 px-2.5 py-1 text-[11px] font-medium text-primary">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Direct Booking</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3.5 border-t border-border flex items-center gap-2.5">
          <Link
            href={`/listings/${listing.slug.current}`}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-98"
          >
            <span>View details</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Inquire on WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-foreground hover:bg-muted border border-border transition-all active:scale-95 shrink-0 shadow-xs"
          >
            <MessageSquare className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
