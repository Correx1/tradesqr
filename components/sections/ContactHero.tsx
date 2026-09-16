'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ContactHeroProps {
  title?: string
  subtitle?: string
  bgImage?: string
  className?: string
}

export function ContactHero({
  title = 'Get in touch with TradeSqr',
  subtitle = 'Direct consultation for verified real estate, automotive acquisitions, registered land plots, and trade desk inquiries.',
  bgImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  className,
}: ContactHeroProps) {
  return (
    <section
      data-section="contact-hero"
      className={cn(
        'relative w-full overflow-hidden text-[#FAFAF8] pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-border',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={bgImage}
          alt="Contact TradeSqr"
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
            Direct communication
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
