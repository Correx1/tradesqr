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
    { value: 'all', label: 'All listings' },
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
              'inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                : 'border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
