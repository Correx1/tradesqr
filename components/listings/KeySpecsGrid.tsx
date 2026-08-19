'use client'

import React from 'react'
import {
  Car, Bed, Maximize2, Layers, Fuel, Settings2,
  Calendar, Gauge, ShieldCheck, Home, Hash, MapPin,
} from 'lucide-react'
import { type Listing } from '@/types/listing'
import { cn } from '@/lib/utils'

export interface KeySpecsGridProps {
  listing: Listing
  className?: string
}

type SpecItem = {
  label: string
  value: string
  icon: React.ReactNode
}

function buildCarSpecs(listing: Listing): SpecItem[] {
  const specs: SpecItem[] = []
  if (listing.make && listing.model)
    specs.push({ label: 'Make / Model', value: `${listing.make} ${listing.model}`, icon: <Car className="h-4 w-4" /> })
  if (listing.year)
    specs.push({ label: 'Year', value: String(listing.year), icon: <Calendar className="h-4 w-4" /> })
  if (listing.condition)
    specs.push({ label: 'Condition', value: listing.condition as string, icon: <ShieldCheck className="h-4 w-4" /> })
  if (listing.transmission)
    specs.push({ label: 'Transmission', value: listing.transmission as string, icon: <Settings2 className="h-4 w-4" /> })
  if (listing.fuelType)
    specs.push({ label: 'Fuel Type', value: listing.fuelType as string, icon: <Fuel className="h-4 w-4" /> })
  if (listing.mileage !== undefined && listing.mileage !== null)
    specs.push({ label: 'Mileage', value: `${new Intl.NumberFormat('en-NG').format(listing.mileage as number)} km`, icon: <Gauge className="h-4 w-4" /> })
  if (listing.color)
    specs.push({ label: 'Color', value: listing.color as string, icon: <Car className="h-4 w-4" /> })
  return specs
}

function buildRealEstateSpecs(listing: Listing): SpecItem[] {
  const specs: SpecItem[] = []
  if (listing.propertyType)
    specs.push({ label: 'Property Type', value: listing.propertyType as string, icon: <Home className="h-4 w-4" /> })
  if (listing.bedrooms !== undefined && listing.bedrooms !== null)
    specs.push({ label: 'Bedrooms', value: String(listing.bedrooms), icon: <Bed className="h-4 w-4" /> })
  if (listing.sizeSqm !== undefined && listing.sizeSqm !== null)
    specs.push({ label: 'Floor Area', value: `${new Intl.NumberFormat('en-NG').format(listing.sizeSqm as number)} sqm`, icon: <Maximize2 className="h-4 w-4" /> })
  if (listing.listingPurpose)
    specs.push({ label: 'Purpose', value: listing.listingPurpose === 'sale' ? 'For Sale' : listing.listingPurpose === 'rent' ? 'For Rent' : 'For Lease', icon: <MapPin className="h-4 w-4" /> })
  return specs
}

function buildLandSpecs(listing: Listing): SpecItem[] {
  const specs: SpecItem[] = []
  if (listing.plots !== undefined && listing.plots !== null)
    specs.push({ label: 'Plots', value: String(listing.plots), icon: <Layers className="h-4 w-4" /> })
  if (listing.landSizeSqm !== undefined && listing.landSizeSqm !== null)
    specs.push({ label: 'Area', value: `${new Intl.NumberFormat('en-NG').format(listing.landSizeSqm as number)} sqm`, icon: <Maximize2 className="h-4 w-4" /> })
  if (listing.landPurpose)
    specs.push({ label: 'Purpose', value: listing.landPurpose === 'sale' ? 'For Sale' : 'For Lease', icon: <MapPin className="h-4 w-4" /> })
  return specs
}

function buildGenericSpecs(listing: Listing): SpecItem[] {
  const attrs = (listing.attributes || []) as Array<{ label: string; value: string }>
  return attrs.map((a) => ({
    label: a.label,
    value: a.value,
    icon: <Hash className="h-4 w-4" />,
  }))
}

export function KeySpecsGrid({ listing, className }: KeySpecsGridProps) {
  let specs: SpecItem[] = []

  switch (listing.category) {
    case 'cars':       specs = buildCarSpecs(listing); break
    case 'realEstate': specs = buildRealEstateSpecs(listing); break
    case 'land':       specs = buildLandSpecs(listing); break
    default:           specs = buildGenericSpecs(listing); break
  }

  if (specs.length === 0) return null

  return (
    <div className={cn('rounded-[7px] border border-border bg-white', className)}>
      <div className="border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
          Specifications &amp; Details
        </h3>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2">
        {specs.map((spec, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center justify-between px-4 py-3 sm:px-6 text-sm border-border',
              idx > 0 && 'border-t'
            )}
          >
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="text-primary/60">{spec.icon}</span>
              {spec.label}
            </dt>
            <dd className="font-heading font-semibold text-foreground text-right">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
