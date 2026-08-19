'use client'

import React from 'react'
import Image from 'next/image'
import { ShieldCheck, Banknote, Lock, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface WhyChooseFeature {
  icon: React.ReactNode
  title: string
  description: string
}

export interface WhyChooseUsProps {
  eyebrow?: string
  heading?: string
  highlightedWord?: string
  imageSrc?: string
  features?: WhyChooseFeature[]
  className?: string
}

const DEFAULT_FEATURES: WhyChooseFeature[] = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: 'Verified Asset Inspection',
    description: 'Every vehicle, residential house, and registered land plot undergoes physical verification and documentation checks.',
  },
  {
    icon: <Banknote className="h-5 w-5 text-primary" />,
    title: 'Direct Owner Pricing',
    description: 'Connect directly with vetted owners and verified sellers with 100% pricing transparency and no phantom middleman markups.',
  },
  {
    icon: <Lock className="h-5 w-5 text-primary" />,
    title: 'Secure Settlement Support',
    description: 'Structured escrow coordination and verified legal paperwork assistance for smooth, dispute-free asset transfers.',
  },
  {
    icon: <Headphones className="h-5 w-5 text-primary" />,
    title: 'Dedicated Deal Desk',
    description: 'Hands-on operational support from initial inspection booking to final contract signing and handover.',
  },
]

export function WhyChooseUs({
  eyebrow = 'Why Choose Us',
  heading = 'Why Choose',
  highlightedWord = 'TradeSqr',
  imageSrc = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
  features = DEFAULT_FEATURES,
  className,
}: WhyChooseUsProps) {
  return (
    <section className={cn('relative w-full overflow-hidden bg-white text-slate-900', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left Column: Full-Height Image */}
        <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
          <Image
            src={imageSrc}
            alt="Why Choose TradeSqr"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
          {/* Subtle gradient blend to the right */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-white opacity-80 lg:opacity-100" />
        </div>

        {/* Right Column: Light Content Container with 2x2 Feature Grid */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 space-y-10">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
              {eyebrow}
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
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
          </div>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {features.map((feature, idx) => (
              <div key={idx} className="space-y-3 group">
                {/* Circular Icon Badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary transition-transform duration-200 group-hover:scale-105">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
