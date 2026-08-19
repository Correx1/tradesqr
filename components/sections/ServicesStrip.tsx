import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ServiceItem {
  id: string
  categoryTag?: string
  title: string
  description: string
  href: string
}

export interface ServicesStripProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  buttonText?: string
  buttonHref?: string
  services?: ServiceItem[]
  className?: string
}

export function ServicesStrip({
  eyebrow = 'CORE CAPABILITIES',
  heading = 'Core Solutions & Capabilities',
  subheading = 'Beyond marketplace listings, TradeSqr offers dedicated operational support, asset verification, and consultation services.',
  buttonText = 'Contact Us',
  buttonHref = '/contact',
  services,
  className,
}: ServicesStripProps) {
  const defaultServices: ServiceItem[] = [
    {
      id: 'properties-listing',
      categoryTag: 'LISTINGS & REACH',
      title: 'Properties Listing',
      description:
        'Strategic showcase and verified promotion of premium real estate, land plots, and automotive assets to high-intent buyers nationwide.',
      href: '/contact?service=properties-listing',
    },
    {
      id: 'real-estate',
      categoryTag: 'REAL ESTATE',
      title: 'Real Estate Properties Deal',
      description:
        'End-to-end guidance and brokerage for purchasing, renting, and investing in verified residential homes, commercial spaces, and registered land.',
      href: '/contact?service=real-estate',
    },
    {
      id: 'ai-solutions',
      categoryTag: 'AI & TECHNOLOGY',
      title: 'AI Business Solutions',
      description:
        'Intelligent automation, smart workflows, and tailored AI integrations engineered to optimize operations and accelerate business growth.',
      href: '/contact?service=ai-solutions',
    },
    {
      id: 'finance-trade',
      categoryTag: 'DIGITAL FINANCE',
      title: 'Digital Finance Education & Trade',
      description:
        'Practical training, market insights, and structured mentorship in digital assets, financial markets, and modern trading strategies.',
      href: '/contact?service=finance-education',
    },
  ]

  const items = services || defaultServices

  return (
    <section
      data-section="services-strip"
      className={cn(
        'relative overflow-hidden text-white py-20 sm:py-28 border-b border-slate-800/80',
        className
      )}
    >
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-0 bg-[#050811] z-0" />

      {/* Sleek, premium light beam striking from top-left to bottom-right (Dimmed) */}
      <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
        {/* Ambient top-left lighting (Dimmed) */}
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[120px]" />
        
        {/* Ambient bottom-right helper glow (Dimmed) */}
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />

        {/* Sharp center laser glow core line (Dimmed) */}
        <div 
          className="absolute opacity-20 blur-xs"
          style={{
            top: '-10%',
            left: '-10%',
            width: '150%',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(96,165,250,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(56,189,248,0.6) 70%, rgba(30,58,138,0) 100%)',
            transform: 'rotate(26deg)',
            transformOrigin: 'top left',
          }}
        />

        {/* Medium supporting glow (Dimmed) */}
        <div 
          className="absolute opacity-12 blur-md"
          style={{
            top: '-15%',
            left: '-15%',
            width: '155%',
            height: '12px',
            background: 'linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(56,189,248,0.4) 45%, rgba(96,165,250,0.4) 55%, rgba(37,99,235,0) 100%)',
            transform: 'rotate(26deg)',
            transformOrigin: 'top left',
          }}
        />

        {/* Wide soft atmospheric light leak (Dimmed) */}
        <div 
          className="absolute opacity-8 blur-3xl"
          style={{
            top: '-25%',
            left: '-20%',
            width: '160%',
            height: '220px',
            background: 'linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.3) 40%, rgba(56,189,248,0.2) 60%, rgba(37,99,235,0) 100%)',
            transform: 'rotate(26deg)',
            transformOrigin: 'top left',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Heading, Subheading & Contact CTA Button */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Label */}
              <div className="mb-4 inline-block">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {eyebrow}
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                {heading}
              </h2>

              {/* Subheading */}
              <p className="mt-5 text-sm sm:text-base font-normal text-slate-400 leading-relaxed max-w-md">
                {subheading}
              </p>
            </div>

            {/* Action CTA Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                href={buttonHref}
                className="ts-btn-primary group inline-flex items-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-white px-5 py-2.5 text-sm font-medium shadow-md transition-all active:scale-98"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4 stroke-[1.75] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {items.map((item) => (
              <div key={item.id} className="group flex flex-col justify-between space-y-3">
                <div>
                  {/* Category Tag */}
                  {item.categoryTag && (
                    <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      {item.categoryTag}
                    </span>
                  )}

                  {/* Service Title */}
                  <h3 className="mt-1.5 font-heading text-lg sm:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm font-normal text-slate-300/85 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-blue-400 group-hover:gap-2 transition-all"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[1.75]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
