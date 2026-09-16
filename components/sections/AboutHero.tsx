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
  subtitle = 'Nigeria’s direct marketplace connecting verified real estate, foreign-used vehicles, and registered land plots without middleman markups.',
  bgImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  className,
}: AboutHeroProps) {
  return (
    <section
      data-section="about-hero"
      className={cn(
        'relative w-full overflow-hidden text-[#FAFAF8] pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border',
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

      {/* Ink Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#121214]/90 via-[#121214]/75 to-[#121214]/95" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#121214]/95 via-[#121214]/70 to-transparent" />

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl text-left space-y-3">
          <span className="text-xs font-medium text-primary">
            Direct &amp; verified marketplace
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#FAFAF8] leading-[1.15]">
            {title}
          </h1>
          <p className="text-sm sm:text-base font-normal text-[#DAD6CC]/85 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
