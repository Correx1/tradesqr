import React from 'react'
import { cn } from '@/lib/utils'

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

export function PageWrapper({
  children,
  className,
  containerClassName,
}: PageWrapperProps) {
  return (
    <main className={cn('flex-1 w-full', className)}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16', containerClassName)}>
        {children}
      </div>
    </main>
  )
}
