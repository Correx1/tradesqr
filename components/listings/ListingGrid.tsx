'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { type Listing } from '@/types/listing'
import { ListingCard } from './ListingCard'
import { cn } from '@/lib/utils'
import { Inbox } from 'lucide-react'

export interface ListingGridProps {
  listings: Listing[]
  emptyMessage?: string
  priorityCount?: number
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
}

export function ListingGrid({
  listings,
  emptyMessage = 'No listings found in this category.',
  priorityCount = 3,
  className,
}: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2px] border border-dashed border-border py-16 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-muted text-muted-foreground mb-3">
          <Inbox className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}
    >
      {listings.map((listing, index) => (
        <motion.div key={listing._id} variants={itemVariants}>
          <ListingCard listing={listing} priority={index < priorityCount} />
        </motion.div>
      ))}
    </motion.div>
  )
}
