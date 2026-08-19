'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { type Swiper as SwiperType } from 'swiper'
import { type Listing } from '@/types/listing'
import { ListingCard } from '@/components/listings/ListingCard'
import { cn } from '@/lib/utils'

import 'swiper/css'

export interface FeaturedListingsProps {
  heading?: string
  subheading?: string
  listings: Listing[]
  viewAllHref?: string
  className?: string
}

export function FeaturedListings({
  heading = 'Featured Listings',
  subheading = 'Handpicked opportunities across foreign-used vehicles, premium real estate, and verified land plots.',
  listings = [],
  viewAllHref = '/listings',
  className,
}: FeaturedListingsProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section
      data-section="featured-listings"
      className={cn('py-16 sm:py-20 bg-white border-b border-border', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {subheading}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              <span>View All Listings</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous listing"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-xs transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary active:scale-95 focus:outline-hidden"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next listing"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-xs transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary active:scale-95 focus:outline-hidden"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider with 3 visible cards */}
        {listings.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8">No featured listings available at the moment.</p>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper
              }}
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
                <SwiperSlide key={listing._id} className="h-auto">
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-xs hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next listing"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-xs hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
