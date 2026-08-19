'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AboutStoryProps {
  eyebrow?: string
  heading?: string
  highlightedWord?: string
  description?: string
  imageSrc?: string
  statNumber?: string
  statLabel?: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function AboutStory({
  eyebrow = 'About Us',
  heading = 'Built on Integrity: Your Trusted Partner for Verified',
  highlightedWord = 'Assets',
  description = 'TradeSqr is Nigeria’s dedicated bridge connecting verified real estate, foreign-used automotive inventory, registered land plots, and digital intelligence directly to high-intent buyers—eliminating middleman inflation and opacity.',
  imageSrc = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  statNumber = '500+',
  statLabel = 'Verified Deals Closed',
  ctaText = 'Explore Listings',
  ctaHref = '/listings',
  className,
}: AboutStoryProps) {
  return (
    <section className={cn('py-20 sm:py-28 bg-white text-slate-900 overflow-hidden', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Floating Stat Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden rounded-[3px] border border-slate-200 bg-slate-100 shadow-lg">
                <Image
                  src={imageSrc}
                  alt="TradeSqr Verification"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Overlapping Floating Stat Badge Card */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 rounded-[3px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xl z-10 flex flex-col justify-center min-w-[170px] sm:min-w-[200px]">
                <div className="flex items-center gap-1.5 text-primary mb-1">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Trust</span>
                </div>
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                  {statNumber}
                </span>
                <span className="mt-0.5 text-xs font-semibold text-slate-600">
                  {statLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
              {eyebrow}
            </span>

            {/* Heading with highlighted text */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
              {heading}{' '}
              <span className="relative inline-block text-primary">
                {highlightedWord}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-primary"
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
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              {description}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={ctaHref}
                className="ts-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-[3px] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
