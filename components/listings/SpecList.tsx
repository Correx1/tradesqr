import React from 'react'
import { type Listing } from '@/types/listing'
import { KeySpecsGrid } from './KeySpecsGrid'

export interface SpecListProps {
  category?: string
  listing: Listing | Record<string, unknown>
  className?: string
}

export function SpecList({ listing, className }: SpecListProps) {
  return <KeySpecsGrid listing={listing as Listing} className={className} />
}
