'use client'

import React from 'react'
import {
  Waves, Camera, Film, Cpu, Building2, UtensilsCrossed, Car,
  Zap, Shield, Wind, Droplets, Hammer, Eye, SquareDashedBottom,
  Leaf, Route, Layout, Anchor, Building, Wifi, Dumbbell,
  MoveVertical, Thermometer, Sun, Music, Gauge, Users,
  Monitor, Lightbulb, Settings, Smartphone, MapPin, type LucideIcon,
} from 'lucide-react'
import { type ListingFeature } from '@/types/listing'
import { cn } from '@/lib/utils'

// ── Icon registry ──────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  // Properties
  pool:           Waves,
  cctv:           Camera,
  cinema:         Film,
  'smart-home':   Cpu,
  rooftop:        Building2,
  kitchen:        UtensilsCrossed,
  parking:        Car,
  generator:      Zap,
  security:       Shield,
  balcony:        Wind,
  ensuite:        Droplets,
  woodwork:       Hammer,
  bathroom:       Droplets,
  view:           Eye,
  gym:            Dumbbell,
  elevator:       MoveVertical,
  ac:             Thermometer,
  wifi:           Wifi,
  waterfront:     Anchor,
  infrastructure: Building,
  // Land
  fence:          SquareDashedBottom,
  'dry-land':     Leaf,
  road:           Route,
  corner:         Layout,
  electricity:    Zap,
  landmark:       MapPin,
  // Cars
  sunroof:        Sun,
  cameras:        Camera,
  audio:          Music,
  cruise:         Gauge,
  seats:          Users,
  hud:            Monitor,
  ambient:        Lightbulb,
  suspension:     Settings,
  'android-auto': Smartphone,
}

export interface AmenitiesGridProps {
  features: ListingFeature[]
  className?: string
}

export function AmenitiesGrid({ features, className }: AmenitiesGridProps) {
  if (!features || features.length === 0) return null

  return (
    <div className={cn('rounded-[2px] border border-border bg-white', className)}>
      <div className="border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
          Features &amp; Amenities
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = ICON_MAP[feature.icon] ?? Shield
            return (
              <div
                key={feature._key ?? idx}
                className="flex items-center gap-2.5 rounded-[2px] border border-border bg-muted/30 px-3 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="leading-tight">{feature.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
