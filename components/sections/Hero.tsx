'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
    alt: 'Curated asset showcased on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1660869312082-4e6e7aedc980?w=1920&q=80',
    alt: 'Verified asset showcased on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=80',
    alt: 'Premium space showcased on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1750778176714-b1a2e6a8815c?w=1920&q=80',
    alt: 'Quality verified listing on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1758448756207-54505680d130?w=1920&q=80',
    alt: 'Exclusive space showcased on TradeSqr',
  },
]

export function Hero({
  headingLine1 = 'Where Verified Assets',
  headingLine2 = 'Meet Direct Trade.',
  subtitle = 'Discover verified properties and direct automotive opportunities across Nigeria with seamless, direct connections.',
  ctaText = 'Explore TradeSqr',
  ctaHref = '/listings',
  slides = defaultSlides,
  className,
}: HeroProps) {
  return (
    <section
      data-section="hero"
      className={cn(
        'relative isolate h-[95vh] min-h-[600px] w-full overflow-hidden flex items-center',
        className
      )}
    >
      {/* Original Background Slideshow */}
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

      {/* Dark Overlay for Readability */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.92) 100%)',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      {/* Left-Aligned Text Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-6 sm:space-y-8 text-left"
        >
          {/* Main Headline */}
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05]">
            <span className="block">Where Verified Assets</span>
            <span className="block">
              Meet{' '}
              <span className="relative inline-block text-primary pb-1.5 sm:pb-2">
                Direct Trade
                <svg
                  className="absolute left-0 -bottom-3 sm:-bottom-4 w-full text-primary pointer-events-none"
                  viewBox="0 0 100 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C25 2 75 2 99 5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-base sm:text-lg text-white/85 font-normal leading-relaxed">
            {subtitle}
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href={ctaHref}
              className="ts-btn-primary inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-white px-7 py-3.5 text-sm font-semibold shadow-md transition-all duration-200 active:scale-95 group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}