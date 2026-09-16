'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AboutStoryProps {
  eyebrow?: string
  heading?: string
  description?: string
  imageSrc?: string
  statNumber?: string
  statLabel?: string
  ctaText?: string
  ctaHref?: string
  className?: string
}

export function AboutStory({
  eyebrow = 'Our story & mission',
  heading = 'Built on integrity: your direct partner for verified Nigerian assets',
  description = 'TradeSqr is Nigeria’s dedicated bridge connecting verified real estate, foreign-used automotive inventory, and registered land plots directly to high-intent buyers — eliminating middleman inflation and opacity.',
  imageSrc = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  statNumber = '500+',
  statLabel = 'Verified transactions facilitated',
  ctaText = 'Explore all listings',
  ctaHref = '/listings',
  className,
}: AboutStoryProps) {
  return (
    <section className={cn('py-20 sm:py-28 bg-background text-foreground overflow-hidden border-b border-border', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Floating Stat Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative aspect-4/3 sm:aspect-5/4 w-full overflow-hidden rounded-xs border border-border bg-muted shadow-lg">
                <Image
                  src={imageSrc}
                  alt="TradeSqr verification"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Overlapping Floating Stat Badge Card */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 rounded-xs border border-border bg-card p-5 sm:p-6 shadow-xl z-10 flex flex-col justify-center min-w-[170px] sm:min-w-[220px]">
                <div className="flex items-center gap-1.5 text-primary mb-1">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs font-medium text-muted-foreground">Direct trust</span>
                </div>
                <span className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {statNumber}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {statLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & CTA */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <span className="text-xs font-semibold text-primary">
              {eyebrow}
            </span>

            {/* Heading */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.18]">
              {heading}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-xs transition-all active:scale-98"
              >
                <span>{ctaText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
