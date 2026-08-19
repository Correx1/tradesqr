'use client'

import React from 'react'
import { CATEGORIES, type CategoryValue } from '@/lib/categoryFields'
import { cn } from '@/lib/utils'

export type FilterCategory = CategoryValue | 'all'

export interface FilterPillsProps {
  selectedCategory?: FilterCategory
  onSelectCategory?: (category: FilterCategory) => void
  className?: string
}

export function FilterPills({
  selectedCategory = 'all',
  onSelectCategory,
  className,
}: FilterPillsProps) {
  const options: { value: FilterCategory; label: string }[] = [
    { value: 'all', label: 'All Listings' },
    ...CATEGORIES.map((c) => ({ value: c.value, label: c.title })),
  ]

  return (
    <div
      role="tablist"
      aria-label="Filter listings by category"
      className={cn('flex flex-wrap items-center gap-2', className)}
    >
      {options.map((option) => {
        const isSelected = selectedCategory === option.value

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory?.(option.value)}
            className={cn(
              'inline-flex items-center justify-center rounded-[7px] border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
              isSelected
                ? 'border-primary bg-primary text-white shadow-xs'
                : 'border-border bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
