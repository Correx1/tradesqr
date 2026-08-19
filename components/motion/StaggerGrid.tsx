'use client'

import React from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface StaggerGridProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerGrid({
  children,
  staggerDelay = 0.08,
  className,
  ...props
}: StaggerGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}
