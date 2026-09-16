'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface CategoryTileItem {
  id: string
  title: string
  description: string
  href: string
  image: string
  countLabel?: string
  actionLabel?: string
}

const DEFAULT_TILES: CategoryTileItem[] = [
  {
    id: 'cars',
    title: 'Cars',
    description: 'Foreign-used and brand-new vehicles inspected with verified ownership history.',
    href: '/listings?category=cars',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
    countLabel: 'Verified vehicles',
    actionLabel: 'Browse vehicles',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Luxury residences, serviced apartments, and commercial buildings directly from vetted owners.',
    href: '/listings?category=realEstate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    countLabel: 'Residential & commercial',
    actionLabel: 'Browse properties',
  },
  {
    id: 'land',
    title: 'Land',
    description: 'Titled, registered plots and estate expanse with verified legal documentation across prime locations.',
    href: '/listings?category=land',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    countLabel: 'Titled plots',
    actionLabel: 'Browse land plots',
  },
]

export interface CategoryTilesProps {
  tiles?: CategoryTileItem[]
  className?: string
}

export function CategoryTiles({ tiles = DEFAULT_TILES, className }: CategoryTilesProps) {
  return (
    <section
      data-section="category-tiles"
      className={cn('w-full py-12 sm:py-16 bg-background border-b border-border', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="group relative flex flex-col overflow-hidden rounded-xs border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40"
            >
              <Link href={tile.href} className="flex flex-col h-full focus:outline-hidden">
                {/* Visual Image Banner */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md border border-border shadow-xs">
                      {tile.countLabel}
                    </span>
                  </div>
                </div>

                {/* Always-Visible Crisp Card Content */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {tile.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary underline underline-offset-4">
                      {tile.actionLabel || `Browse ${tile.title.toLowerCase()}`}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryTiles
