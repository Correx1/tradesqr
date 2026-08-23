'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  ShieldCheck,
  Sliders,
  Bed,
  Maximize2,
  Layers,
  MapPin,
  FileCheck,
  ArrowRight,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Safe case-insensitive field extractions
  const categoryRaw = listing.category || (listing as any).Category || ''
  const category = categoryRaw.toLowerCase()

  const categoryTitle =
    CATEGORIES.find((c) => c.value.toLowerCase() === category)?.title || categoryRaw

  const formattedPrice = formatPrice({
    price: listing.price,
    priceOnRequest: listing.priceOnRequest,
  })

  // Extract all valid images (coverImage + gallery) supporting both camelCase and lowercase names
  const images: string[] = []
  const coverImage = listing.coverImage || (listing as any).coverimage || (listing as any).CoverImage
  const gallery = listing.gallery || (listing as any).gallery || (listing as any).Gallery

  if (coverImage) {
    const url = coverImage.url || urlForImage(coverImage)?.width(800).height(1000).url()
    if (url) images.push(url)
  }
  if (gallery && Array.isArray(gallery)) {
    gallery.forEach((img) => {
      const url = img.url || urlForImage(img)?.width(800).height(1000).url()
      if (url && !images.includes(url)) images.push(url)
    })
  }
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')
  }

  // Automatic image slideshow inside the card
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  // Micro Spec Pills Generator
  const renderSpecPills = () => {
    switch (category) {
      case 'cars': {
        return (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {listing.year !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <Calendar className="h-3 w-3 text-blue-400" />
                <span>{String(listing.year)}</span>
              </span>
            )}
            {listing.condition && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <ShieldCheck className="h-3 w-3 text-blue-400" />
                <span className="truncate max-w-[90px]">{String(listing.condition)}</span>
              </span>
            )}
            {listing.transmission && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <Sliders className="h-3 w-3 text-blue-400" />
                <span>{String(listing.transmission)}</span>
              </span>
            )}
          </div>
        )
      }

      case 'realestate':
      case 'realestate':
      case 'houses': {
        return (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {listing.bedrooms !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <Bed className="h-3 w-3 text-blue-400" />
                <span>{String(listing.bedrooms)} Beds</span>
              </span>
            )}
            {listing.sizeSqm !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <Maximize2 className="h-3 w-3 text-blue-400" />
                <span>{new Intl.NumberFormat('en-NG').format(listing.sizeSqm as number)} sqm</span>
              </span>
            )}
            {listing.titleDocument && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <FileCheck className="h-3 w-3 text-blue-400" />
                <span className="truncate max-w-[100px]">{String(listing.titleDocument)}</span>
              </span>
            )}
          </div>
        )
      }

      case 'land': {
        const landArea = listing.landSizeSqm ?? listing.sizeSqm
        const titleDoc = listing.landTitleDocument ?? listing.titleDocument
        return (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {landArea !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <Maximize2 className="h-3 w-3 text-blue-400" />
                <span>{new Intl.NumberFormat('en-NG').format(landArea as number)} sqm</span>
              </span>
            )}
            {listing.plots !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <Layers className="h-3 w-3 text-blue-400" />
                <span>{String(listing.plots)} {Number(listing.plots) === 1 ? 'Plot' : 'Plots'}</span>
              </span>
            )}
            {titleDoc && (
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-xs border border-white/10">
                <FileCheck className="h-3 w-3 text-blue-400" />
                <span className="truncate max-w-[100px]">{String(titleDoc)}</span>
              </span>
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
        'group relative flex flex-col overflow-hidden rounded-[32px] sm:rounded-[36px] border border-slate-200 bg-slate-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/50',
        className
      )}
    >
      <Link
        href={`/listings/${listing.slug.current}`}
        className="relative flex aspect-3/4 sm:aspect-4/5 w-full flex-col justify-between overflow-hidden rounded-[32px] sm:rounded-[36px] focus:outline-hidden"
      >
        {/* Auto-Cycling Image Slideshow */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={images[currentImageIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={images[currentImageIndex]}
                alt={listing.title}
                fill
                priority={priority}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom-Only Soft Gradient Scrim for Text Readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

        {/* Top Badges Strip + Image Progress Dots */}
        <div className="relative z-20 flex flex-col gap-2 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            {/* Bold Price Pill Badge */}
            <div className="inline-flex items-center rounded-full bg-white px-3.5 py-1 shadow-lg">
              <span className="font-heading text-xs sm:text-sm font-extrabold tracking-tight text-slate-900">
                {formattedPrice}
              </span>
            </div>

            {/* Category Chip */}
            <span className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-md border border-white/15">
              {categoryTitle}
            </span>
          </div>

          {/* Mini Image Indicators (if multiple images exist) */}
          {images.length > 1 && (
            <div className="flex items-center gap-1 pt-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-1 rounded-full transition-all duration-300',
                    idx === currentImageIndex
                      ? 'w-5 bg-white'
                      : 'w-1.5 bg-white/40'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Frosted Glass Overlay Dock */}
        <div className="relative z-20 flex flex-col justify-end p-5 sm:p-6 pt-0 space-y-2.5">
          {/* Title & Location */}
          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 transition-colors group-hover:text-blue-300">
              {listing.title}
            </h3>
            {listing.location?.city && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                <span className="truncate">
                  {listing.location.city}
                  {listing.location.state ? `, ${listing.location.state}` : ''}
                </span>
              </div>
            )}
          </div>

          {/* Micro Spec Pills */}
          {renderSpecPills()}

          {/* Bottom Action Indicator with Slide-In Arrow */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
            <span className="tracking-wide">View Details</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-400 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
