'use client'

import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, RotateCcw, Filter, ChevronDown } from 'lucide-react'
import { type Listing } from '@/types/listing'
import { ListingCard } from './ListingCard'
import { cn } from '@/lib/utils'

export interface ListingsCatalogProps {
  initialListings: Listing[]
}

const MIN_PRICES = [
  { label: 'Min Price', value: '' },
  { label: '₦5,000,000', value: '5000000' },
  { label: '₦10,000,000', value: '10000000' },
  { label: '₦25,000,000', value: '25000000' },
  { label: '₦50,000,000', value: '50000000' },
  { label: '₦100,000,000', value: '100000000' },
]

const MAX_PRICES = [
  { label: 'Max Price', value: '' },
  { label: '₦20,000,000', value: '20000000' },
  { label: '₦50,000,000', value: '50000000' },
  { label: '₦100,000,000', value: '100000000' },
  { label: '₦250,000,000', value: '250000000' },
  { label: '₦500,000,000+', value: '500000000' },
]

export function ListingsCatalog({ initialListings = [] }: ListingsCatalogProps) {
  // Inputs state
  const [keywordInput, setKeywordInput] = useState<string>('')
  const [categoryInput, setCategoryInput] = useState<string>('all')
  const [minPriceInput, setMinPriceInput] = useState<string>('')
  const [maxPriceInput, setMaxPriceInput] = useState<string>('')

  // Applied filters state
  const [appliedFilters, setAppliedFilters] = useState({
    keyword: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
  })

  const handleApplyFilters = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setAppliedFilters({
      keyword: keywordInput,
      category: categoryInput,
      minPrice: minPriceInput,
      maxPrice: maxPriceInput,
    })
  }

  const handleReset = () => {
    setKeywordInput('')
    setCategoryInput('all')
    setMinPriceInput('')
    setMaxPriceInput('')
    setAppliedFilters({
      keyword: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
    })
  }

  // Filter Logic
  const filteredListings = useMemo(() => {
    return initialListings.filter((item) => {
      // 1. Category Filter
      if (appliedFilters.category === 'cars' && item.category !== 'cars') {
        return false
      }
      if (
        appliedFilters.category === 'building' &&
        item.category !== 'realEstate' &&
        item.category !== 'houses' &&
        item.category !== 'land'
      ) {
        return false
      }

      // 2. Keyword Match
      if (appliedFilters.keyword.trim()) {
        const q = appliedFilters.keyword.toLowerCase().trim()
        const loc = item.location as { city?: string; state?: string } | string | undefined
        const locString =
          typeof loc === 'object' && loc !== null
            ? `${loc.city || ''} ${loc.state || ''}`.toLowerCase()
            : typeof loc === 'string'
            ? String(loc).toLowerCase()
            : ''
        const matchesTitle = item.title?.toLowerCase().includes(q)
        const matchesDesc = item.description?.toLowerCase().includes(q)
        const matchesLoc = locString.includes(q)
        if (!matchesTitle && !matchesDesc && !matchesLoc) {
          return false
        }
      }

      // 3. Min Price
      if (appliedFilters.minPrice) {
        const min = Number(appliedFilters.minPrice)
        if (item.price && item.price < min) return false
      }

      // 4. Max Price
      if (appliedFilters.maxPrice) {
        const max = Number(appliedFilters.maxPrice)
        if (item.price && item.price > max) return false
      }

      return true
    })
  }, [initialListings, appliedFilters])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Col 4 (Left Column): Clean Tailored Filter Card */}
      <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
        <div className="rounded-[7px] border border-border bg-card p-6 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>Filter Listings</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleApplyFilters} className="mt-5 space-y-4">
            {/* KEYWORD SEARCH */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Keyword Search
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Keywords, model, title..."
                  className="w-full rounded-[7px] border border-input bg-background px-3.5 pr-9 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden transition-colors shadow-2xs"
                />
                <Search className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* CATEGORY */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Category
              </label>
              <div className="relative">
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="w-full appearance-none rounded-[7px] border border-input bg-background px-3.5 pr-9 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden transition-colors shadow-2xs cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="cars">Cars</option>
                  <option value="building">Building</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* PRICE RANGE (NGN) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Price Range (NGN)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {/* Min Price */}
                <div className="relative">
                  <select
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="w-full appearance-none rounded-[7px] border border-input bg-background px-3 pr-8 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden transition-colors shadow-2xs cursor-pointer"
                  >
                    {MIN_PRICES.map((p) => (
                      <option key={p.label} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>

                {/* Max Price */}
                <div className="relative">
                  <select
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="w-full appearance-none rounded-[7px] border border-input bg-background px-3 pr-8 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden transition-colors shadow-2xs cursor-pointer"
                  >
                    {MAX_PRICES.map((p) => (
                      <option key={p.label} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="ts-btn-primary w-full inline-flex items-center justify-center gap-2 py-3 rounded-[7px] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-98"
              >
                <Filter className="h-4 w-4" />
                <span>Apply Filters</span>
              </button>
            </div>
          </form>
        </div>
      </aside>

      {/* Col 8 (Right Column): 2-Grid Listing Cards */}
      <main className="lg:col-span-8">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredListings.map((item, idx) => (
              <ListingCard key={item._id} listing={item} priority={idx < 4} />
            ))}
          </div>
        ) : (
          <div className="rounded-[7px] border border-dashed border-border bg-card p-12 text-center">
            <h3 className="font-heading text-base font-bold text-foreground">No listings found</h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any listings matching your current filter criteria.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="ts-btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-[7px] text-xs font-semibold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
