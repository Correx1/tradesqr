'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { type Swiper as SwiperType } from 'swiper'
import { type Listing } from '@/types/listing'
import { ListingCard } from '@/components/listings/ListingCard'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

export interface FeaturedListingsProps {
  heading?: string
  subheading?: string
  listings: Listing[]
  viewAllHref?: string
  className?: string
}

export function FeaturedListings({
  heading = 'Featured listings',
  subheading = 'Handpicked opportunities across foreign-used vehicles, premium real estate, and verified land plots.',
  listings = [],
  viewAllHref = '/listings',
  className,
}: FeaturedListingsProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section
      data-section="featured-listings"
      className={cn('py-16 sm:py-24 bg-background text-foreground border-b border-border overflow-hidden', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="max-w-2xl space-y-1.5">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              {subheading}
            </p>
          </div>

          {/* Action Links & Desktop Navigation Arrows */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href={viewAllHref}
              className="text-xs font-semibold text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
            >
              View all listings
            </Link>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous listing"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 focus:outline-hidden cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next listing"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-95 focus:outline-hidden cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider with Auto-sliding Cards */}
        {listings.length === 0 ? (
          <div className="rounded-xs border border-border bg-card p-12 text-center text-muted-foreground text-sm">
            No featured listings available at the moment.
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={750}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="!py-2"
            >
              {listings.map((listing, idx) => (
                <SwiperSlide key={`${listing._id}-${idx}`} className="h-auto">
                  <ListingCard listing={listing} priority={idx < 3} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile Navigation Arrows (under carousel) */}
            <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous listing"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next listing"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-xs hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
