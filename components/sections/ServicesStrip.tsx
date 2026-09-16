import React from 'react'
import Link from 'next/link'
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
  eyebrow = 'Core capabilities',
  heading = 'Specialized Solutions & Direct Advisory',
  subheading = 'Beyond direct marketplace listings, TradeSqr provides professional physical inspection, legal title documentation, and digital advisory services.',
  buttonText = 'Contact Us',
  buttonHref = '/contact',
  services,
  className,
}: ServicesStripProps) {
  const defaultServices: ServiceItem[] = [
    {
      id: 'properties-listing',
      categoryTag: 'Listings & reach',
      title: 'Properties Listing & Showcase',
      description:
        'Strategic placement and verified promotion of premium real estate, land plots, and automotive assets to high-intent buyers nationwide.',
      href: '/contact?service=properties-listing',
    },
    {
      id: 'real-estate',
      categoryTag: 'Real estate',
      title: 'Real Estate Transactions & Advisory',
      description:
        'End-to-end guidance for purchasing, leasing, and investing in inspected residential homes, commercial properties, and registered plots.',
      href: '/contact?service=real-estate',
    },
    {
      id: 'ai-solutions',
      categoryTag: 'AI & technology',
      title: 'AI Business Solutions',
      description:
        'Intelligent workflow automation and bespoke AI integrations engineered to streamline operations and enhance productivity.',
      href: '/contact?service=ai-solutions',
    },
    {
      id: 'finance-trade',
      categoryTag: 'Digital finance',
      title: 'Digital Finance Education & Trade',
      description:
        'Practical market insights, digital asset training, and structured mentorship in modern financial markets and portfolio strategies.',
      href: '/contact?service=finance-education',
    },
  ]

  const items = services || defaultServices

  return (
    <section
      data-section="services-strip"
      className={cn(
        'relative overflow-hidden bg-[#121214] text-[#FAFAF8] py-20 sm:py-28 border-b border-border/60',
        className
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Heading, Subheading & Contact CTA Button */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Eyebrow Label */}
              <span className="text-xs font-medium text-primary tracking-wide">
                {eyebrow}
              </span>

              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#FAFAF8] leading-[1.15]">
                {heading}
              </h2>

              {/* Subheading */}
              <p className="text-sm sm:text-base font-normal text-[#E4E1D9]/80 leading-relaxed max-w-md">
                {subheading}
              </p>
            </div>

            {/* Action CTA Button */}
            <div className="mt-8 sm:mt-10">
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-semibold rounded-full shadow-xs transition-all active:scale-95"
              >
                {buttonText}
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {items.map((item) => (
              <div key={item.id} className="group flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  {/* Category Tag */}
                  {item.categoryTag && (
                    <span className="text-[11px] font-medium text-primary/90 tracking-wide">
                      {item.categoryTag}
                    </span>
                  )}

                  {/* Service Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-medium text-[#FAFAF8] group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-normal text-[#E4E1D9]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2">
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-xs font-medium text-primary hover:underline underline-offset-4 transition-all"
                  >
                    Contact Us
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

export default ServicesStrip

