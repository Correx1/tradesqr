'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FadeInSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export function FadeInSection({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className,
  ...props
}: FadeInSectionProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 24, opacity: 0 }
      case 'down':
        return { y: -24, opacity: 0 }
      case 'left':
        return { x: 24, opacity: 0 }
      case 'right':
        return { x: -24, opacity: 0 }
      case 'none':
      default:
        return { opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialOffset()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
