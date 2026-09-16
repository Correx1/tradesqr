'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/effect-fade'

export interface HeroSlide {
  image: string
  alt: string
}

export interface HeroProps {
  headingLine1?: string
  headingLine2?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  slides?: HeroSlide[]
  className?: string
}

const defaultSlides: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1764605206511-7a649d9df63b?w=1920&q=80',
    alt: 'Verified luxury automotive listing on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    alt: 'Premium verified residential property in Nigeria',
  },
  {
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=80',
    alt: 'Verified real estate development on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80',
    alt: 'Verified titled land plots across Nigeria',
  },
  {
    image: 'https://images.unsplash.com/photo-1660869312082-4e6e7aedc980?w=1920&q=80',
    alt: 'Direct foreign-used vehicle listings on TradeSqr',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Listings' },
  { id: 'cars', label: 'Cars' },
  { id: 'realEstate', label: 'Real Estate' },
  { id: 'land', label: 'Land' },
] as const

export function Hero({
  headingLine1 = 'Direct, Verified Trade.',
  headingLine2 = 'No Middlemen. No Agent Markups.',
  subtitle = 'Buy and sell inspected cars, premium properties, and titled land directly with verified owners across Nigeria.',
  ctaText = 'Browse Verified Listings',
  ctaHref = '/listings',
  slides = defaultSlides,
  className,
}: HeroProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory)
    }
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    }
    const queryString = params.toString()
    router.push(`/listings${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <section
      data-section="hero"
      className={cn(
        'relative isolate min-h-[640px] lg:min-h-[720px] w-full overflow-hidden flex items-center pt-24 pb-16 lg:py-28',
        className
      )}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1200}
          allowTouchMove={false}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.image}>
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Ink-derived (#121214) Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,18,20,0.85) 0%, rgba(18,18,20,0.60) 40%, rgba(18,18,20,0.84) 75%, rgba(18,18,20,0.96) 100%)',
          backgroundColor: 'rgba(18, 18, 20, 0.42)',
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#121214]/90 via-[#121214]/65 to-transparent" />

      {/* Single Orchestrated Content Block */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6 sm:space-y-8 text-left"
        >
          {/* Main Headline in Fraunces */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAFAF8] leading-[1.12]">
              <span className="block">{headingLine1}</span>
              <span className="block text-white/95 font-normal">
                {headingLine2}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="max-w-2xl text-sm sm:text-base lg:text-lg text-[#E4E1D9]/90 font-normal leading-relaxed">
            {subtitle}
          </p>

          {/* Quick Search Marketplace Bar */}
          <div className="pt-1">
            <form
              onSubmit={handleSearch}
              className="bg-[#121214]/85 backdrop-blur-md border border-[#E4E1D9]/20 rounded-xs p-2 sm:p-2.5 shadow-2xl space-y-2 sm:space-y-0"
            >
              {/* Category Segmented Toggle */}
              <div className="flex items-center gap-1 border-b border-[#E4E1D9]/15 pb-2 sm:border-b-0 sm:pb-0 sm:hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      'flex-1 py-1.5 px-2 text-xs font-medium rounded-full transition-all text-center',
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                        : 'text-[#E4E1D9]/70 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Desktop and Tablet Search Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* Desktop Category Toggle */}
                <div className="hidden sm:flex items-center gap-1 pr-2 border-r border-[#E4E1D9]/15 shrink-0">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        'py-1.5 px-3 text-xs font-medium rounded-full transition-all whitespace-nowrap',
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                          : 'text-[#E4E1D9]/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Keyword / Location Input */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#DAD6CC]/60 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by model, location, or title (e.g. Lekki, Lexus, Epe)..."
                    className="w-full bg-transparent pl-9 pr-3 py-2 text-sm text-[#FAFAF8] placeholder:text-[#DAD6CC]/50 border-0 focus:outline-none focus:ring-0 rounded-xs"
                  />
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full shadow-xs transition-all active:scale-[0.98] shrink-0"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Primary Action Button */}
          <div className="pt-1 flex items-center gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 text-sm font-semibold rounded-full shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              {ctaText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero