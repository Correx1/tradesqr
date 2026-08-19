'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface AboutHeroProps {
  title?: string
  subtitle?: string
  bgImage?: string
  className?: string
}

export function AboutHero({
  title = 'About TradeSqr',
  subtitle = 'Nigeria’s premier ecosystem connecting verified real estate, foreign-used vehicles, and digital finance capabilities through direct verification.',
  bgImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  className,
}: AboutHeroProps) {
  return (
    <section
      data-section="about-hero"
      className={cn(
        'relative w-full overflow-hidden text-white pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-slate-800 shadow-2xl',
        className
      )}
    >
      {/* End-to-End Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={bgImage}
          alt="About TradeSqr"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark Gradient Overlay seamlessly blending into the transparent top navbar */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/95" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-left">
          {/* Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            {title}
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-sm sm:text-base font-normal text-slate-300 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
