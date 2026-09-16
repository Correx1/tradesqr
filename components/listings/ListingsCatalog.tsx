'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  X,
  Filter,
} from 'lucide-react'
import { type Listing } from '@/types/listing'
import { ListingCard } from './ListingCard'
import {
  CATEGORIES,
  CAR_CONDITIONS,
  CAR_TRANSMISSIONS,
  CAR_FUEL_TYPES,
  RE_BEDROOMS,
  RE_PURPOSES,
  LAND_PURPOSES,
} from '@/lib/categoryFields'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
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

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
] as const

export function ListingsCatalog({ initialListings = [] }: ListingsCatalogProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Read initial filter values from URL search params
  const categoryParam = searchParams?.get('category') || 'all'
  const keywordParam = searchParams?.get('search') || searchParams?.get('q') || ''
  const conditionParam = searchParams?.get('condition') || ''
  const transmissionParam = searchParams?.get('transmission') || ''
  const fuelTypeParam = searchParams?.get('fuelType') || ''
  const bedroomsParam = searchParams?.get('bedrooms') || ''
  const purposeParam = searchParams?.get('purpose') || ''
  const minPriceParam = searchParams?.get('minPrice') || ''
  const maxPriceParam = searchParams?.get('maxPrice') || ''
  const sortParam = searchParams?.get('sort') || 'newest'

  // Local state initialized with query params
  const [category, setCategory] = useState<string>(categoryParam)
  const [keyword, setKeyword] = useState<string>(keywordParam)
  const [condition, setCondition] = useState<string>(conditionParam)
  const [transmission, setTransmission] = useState<string>(transmissionParam)
  const [fuelType, setFuelType] = useState<string>(fuelTypeParam)
  const [bedrooms, setBedrooms] = useState<string>(bedroomsParam)
  const [purpose, setPurpose] = useState<string>(purposeParam)
  const [minPrice, setMinPrice] = useState<string>(minPriceParam)
  const [maxPrice, setMaxPrice] = useState<string>(maxPriceParam)
  const [sort, setSort] = useState<string>(sortParam)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Sync state when URL search params change externally (e.g. Navbar click)
  useEffect(() => {
    setCategory(searchParams?.get('category') || 'all')
    setKeyword(searchParams?.get('search') || searchParams?.get('q') || '')
    setCondition(searchParams?.get('condition') || '')
    setTransmission(searchParams?.get('transmission') || '')
    setFuelType(searchParams?.get('fuelType') || '')
    setBedrooms(searchParams?.get('bedrooms') || '')
    setPurpose(searchParams?.get('purpose') || '')
    setMinPrice(searchParams?.get('minPrice') || '')
    setMaxPrice(searchParams?.get('maxPrice') || '')
    setSort(searchParams?.get('sort') || 'newest')
  }, [searchParams])

  // Update URL shallowly when filters change
  const updateUrlParams = useCallback(
    (newFilters: Record<string, string>) => {
      const params = new URLSearchParams()

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== 'newest') {
          params.set(key, value)
        }
      })

      const qs = params.toString()
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
    },
    [router, pathname]
  )

  const handleFilterChange = (key: string, value: string) => {
    const currentFilters: Record<string, string> = {
      category,
      q: keyword,
      condition,
      transmission,
      fuelType,
      bedrooms,
      purpose,
      minPrice,
      maxPrice,
      sort,
      [key]: value,
    }

    // Reset sub-category filters if category changes
    if (key === 'category') {
      currentFilters.condition = ''
      currentFilters.transmission = ''
      currentFilters.fuelType = ''
      currentFilters.bedrooms = ''
      currentFilters.purpose = ''
      setCondition('')
      setTransmission('')
      setFuelType('')
      setBedrooms('')
      setPurpose('')
    }

    if (key === 'category') setCategory(value)
    if (key === 'q') setKeyword(value)
    if (key === 'condition') setCondition(value)
    if (key === 'transmission') setTransmission(value)
    if (key === 'fuelType') setFuelType(value)
    if (key === 'bedrooms') setBedrooms(value)
    if (key === 'purpose') setPurpose(value)
    if (key === 'minPrice') setMinPrice(value)
    if (key === 'maxPrice') setMaxPrice(value)
    if (key === 'sort') setSort(value)

    updateUrlParams(currentFilters)
  }

  const handleResetFilters = () => {
    setCategory('all')
    setKeyword('')
    setCondition('')
    setTransmission('')
    setFuelType('')
    setBedrooms('')
    setPurpose('')
    setMinPrice('')
    setMaxPrice('')
    setSort('newest')
    router.replace(pathname, { scroll: false })
    setMobileFilterOpen(false)
  }

  // Active filters count badge
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (category !== 'all') count++
    if (keyword.trim()) count++
    if (condition) count++
    if (transmission) count++
    if (fuelType) count++
    if (bedrooms) count++
    if (purpose) count++
    if (minPrice) count++
    if (maxPrice) count++
    return count
  }, [category, keyword, condition, transmission, fuelType, bedrooms, purpose, minPrice, maxPrice])

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    const result = initialListings.filter((item) => {
      const itemCat = (item.category || '').toLowerCase()

      // 1. Category Filter
      if (category === 'cars' && itemCat !== 'cars') return false
      if (
        category === 'realEstate' &&
        itemCat !== 'realestate' &&
        itemCat !== 'houses'
      )
        return false
      if (category === 'land' && itemCat !== 'land') return false

      // 2. Keyword Match (title, description, make, model, city, state)
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim()
        const loc = item.location as { city?: string; state?: string } | string | undefined
        const locString =
          typeof loc === 'object' && loc !== null
            ? `${loc.city || ''} ${loc.state || ''}`.toLowerCase()
            : typeof loc === 'string'
            ? String(loc).toLowerCase()
            : ''
        const titleMatch = item.title?.toLowerCase().includes(q)
        const descMatch = item.description?.toLowerCase().includes(q)
        const makeMatch = item.make?.toLowerCase().includes(q)
        const modelMatch = item.model?.toLowerCase().includes(q)
        const locMatch = locString.includes(q)

        if (!titleMatch && !descMatch && !makeMatch && !modelMatch && !locMatch) {
          return false
        }
      }

      // 3. Car Condition
      if (condition && category === 'cars') {
        if (
          !item.condition ||
          item.condition.toLowerCase() !== condition.toLowerCase()
        ) {
          return false
        }
      }

      // 4. Car Transmission
      if (transmission && category === 'cars') {
        if (
          !item.transmission ||
          item.transmission.toLowerCase() !== transmission.toLowerCase()
        ) {
          return false
        }
      }

      // 5. Car Fuel Type
      if (fuelType && category === 'cars') {
        if (
          !item.fuelType ||
          item.fuelType.toLowerCase() !== fuelType.toLowerCase()
        ) {
          return false
        }
      }

      // 6. Real Estate Bedrooms
      if (bedrooms && (category === 'realEstate' || category === 'all')) {
        if (bedrooms === '5+') {
          if (!item.bedrooms || item.bedrooms < 5) return false
        } else {
          if (item.bedrooms !== Number(bedrooms)) return false
        }
      }

      // 7. Purpose (Real Estate or Land)
      if (purpose) {
        const itemPurpose = (
          item.listingPurpose ||
          item.landPurpose ||
          ''
        ).toLowerCase()
        const target = purpose.toLowerCase()
        const matchesPurpose =
          itemPurpose.includes(target) ||
          (target === 'sale' && itemPurpose.includes('sale')) ||
          (target === 'rent' && itemPurpose.includes('rent')) ||
          (target === 'lease' && itemPurpose.includes('lease'))
        if (!matchesPurpose) return false
      }

      // 8. Min Price
      if (minPrice) {
        const min = Number(minPrice)
        if (item.price !== undefined && item.price < min) return false
      }

      // 9. Max Price
      if (maxPrice) {
        const max = Number(maxPrice)
        if (item.price !== undefined && item.price > max) return false
      }

      return true
    })

    // Sorting
    return result.sort((a, b) => {
      if (sort === 'price-asc') {
        if (a.priceOnRequest) return 1
        if (b.priceOnRequest) return -1
        return (a.price || 0) - (b.price || 0)
      }
      if (sort === 'price-desc') {
        if (a.priceOnRequest) return 1
        if (b.priceOnRequest) return -1
        return (b.price || 0) - (a.price || 0)
      }
      // default: newest
      return new Date(b._createdAt || 0).getTime() - new Date(a._createdAt || 0).getTime()
    })
  }, [
    initialListings,
    category,
    keyword,
    condition,
    transmission,
    fuelType,
    bedrooms,
    purpose,
    minPrice,
    maxPrice,
    sort,
  ])

  // Render Sidebar Filter Form Content
  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground">
          Category
        </label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-muted rounded-xs border border-border">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleFilterChange('category', cat.value)}
              className={cn(
                'py-1.5 px-2.5 text-xs font-medium rounded-xs transition-all text-center focus:outline-none',
                category === cat.value
                  ? 'bg-card text-foreground font-semibold shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword Search */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground">
          Keyword Search
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => handleFilterChange('q', e.target.value)}
            placeholder="Model, landmark, title..."
            className="w-full rounded-xs border border-input bg-background px-3.5 pr-9 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none shadow-2xs"
          />
          {keyword ? (
            <button
              type="button"
              onClick={() => handleFilterChange('q', '')}
              className="absolute right-2.5 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <Search className="absolute right-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          )}
        </div>
      </div>

      {/* Category-Specific Filters */}
      {/* Cars Filters */}
      {category === 'cars' && (
        <div className="space-y-4 pt-2 border-t border-border">
          <span className="text-[11px] font-medium text-primary tracking-wide block">
            Vehicle specifications
          </span>

          {/* Condition */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Condition
            </label>
            <div className="relative">
              <select
                value={condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full appearance-none rounded-xs border border-input bg-background px-3 pr-8 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
              >
                {CAR_CONDITIONS.map((c) => (
                  <option key={c.label} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Transmission
            </label>
            <div className="relative">
              <select
                value={transmission}
                onChange={(e) => handleFilterChange('transmission', e.target.value)}
                className="w-full appearance-none rounded-xs border border-input bg-background px-3 pr-8 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
              >
                {CAR_TRANSMISSIONS.map((t) => (
                  <option key={t.label} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Fuel Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Fuel Type
            </label>
            <div className="relative">
              <select
                value={fuelType}
                onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                className="w-full appearance-none rounded-xs border border-input bg-background px-3 pr-8 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
              >
                {CAR_FUEL_TYPES.map((f) => (
                  <option key={f.label} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Real Estate Filters */}
      {category === 'realEstate' && (
        <div className="space-y-4 pt-2 border-t border-border">
          <span className="text-[11px] font-medium text-primary tracking-wide block">
            Property specifications
          </span>

          {/* Bedrooms */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Bedrooms
            </label>
            <div className="relative">
              <select
                value={bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className="w-full appearance-none rounded-xs border border-input bg-background px-3 pr-8 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
              >
                {RE_BEDROOMS.map((b) => (
                  <option key={b.label} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Listing Purpose
            </label>
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => handleFilterChange('purpose', e.target.value)}
                className="w-full appearance-none rounded-xs border border-input bg-background px-3 pr-8 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
              >
                {RE_PURPOSES.map((p) => (
                  <option key={p.label} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Land Filters */}
      {category === 'land' && (
        <div className="space-y-4 pt-2 border-t border-border">
          <span className="text-[11px] font-medium text-primary tracking-wide block">
            Land specifications
          </span>

          {/* Purpose */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Listing Purpose
            </label>
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => handleFilterChange('purpose', e.target.value)}
                className="w-full appearance-none rounded-xs border border-input bg-background px-3 pr-8 py-2 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
              >
                {LAND_PURPOSES.map((p) => (
                  <option key={p.label} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-2 pt-2 border-t border-border">
        <label className="block text-xs font-semibold text-foreground">
          Price Range (NGN)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {/* Min Price */}
          <div className="relative">
            <select
              value={minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full appearance-none rounded-xs border border-input bg-background px-2.5 pr-7 py-2 text-xs text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
            >
              {MIN_PRICES.map((p) => (
                <option key={p.label} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
          </div>

          {/* Max Price */}
          <div className="relative">
            <select
              value={maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full appearance-none rounded-xs border border-input bg-background px-2.5 pr-7 py-2 text-xs text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer"
            >
              {MAX_PRICES.map((p) => (
                <option key={p.label} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reset Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleResetFilters}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset all filters</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Desktop Left Sidebar: 3-4 Columns */}
      <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
        <div className="rounded-xs border border-border bg-card p-5 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>Filters</span>
            </div>

            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
                {activeFiltersCount} active
              </span>
            )}
          </div>

          {/* Filter Form Controls */}
          <div className="mt-5">{renderFilterControls()}</div>
        </div>
      </aside>

      {/* Main Content Area: 8-9 Columns */}
      <main className="lg:col-span-8 xl:col-span-9 min-w-0 space-y-6">
        {/* Top Controls Bar: Results Count + Sort + Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 rounded-xs border border-border bg-card shadow-xs">
          {/* Result Count */}
          <div className="text-xs sm:text-sm text-muted-foreground font-normal">
            Showing{' '}
            <span className="font-semibold text-foreground">
              {filteredListings.length}
            </span>{' '}
            verified {filteredListings.length === 1 ? 'listing' : 'listings'}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Sheet Filter Trigger */}
            <div className="block lg:hidden">
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger
                  render={
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background hover:bg-muted px-4 py-2 text-xs font-semibold text-foreground transition-colors shadow-2xs"
                    />
                  }
                >
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto p-6 bg-card">
                  <SheetHeader className="pb-4 border-b border-border">
                    <SheetTitle className="flex items-center justify-between">
                      <span className="font-heading text-base font-semibold">Filter Listings</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-4">{renderFilterControls()}</div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:inline-block">
                Sort by:
              </span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="appearance-none rounded-xs border border-input bg-background pl-3 pr-8 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none shadow-2xs cursor-pointer font-medium"
                >
                  {SORT_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid: 1 col mobile, 2 col tablet/laptop, 3 col wide desktop */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredListings.map((item, idx) => (
              <ListingCard key={item._id || idx} listing={item} priority={idx < 4} />
            ))}
          </div>
        ) : (
          /* Token-Styled Empty State */
          <div className="rounded-xs border border-dashed border-border bg-card p-12 sm:p-16 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary mx-auto">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">
                No matching listings found
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find any verified listings matching your active filters. Try broadening your search or resetting specific criteria.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs font-semibold rounded-full shadow-xs transition-all active:scale-95"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ListingsCatalog
