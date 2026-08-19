import { PageWrapper } from '@/components/layout'
import { ServicesStrip } from '@/components/sections'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Specialized consulting, property inspection, and direct advisory solutions from TradeSqr.',
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            End-to-end asset verification, consulting, and advisory services.
          </p>
        </div>

        <ServicesStrip />
      </div>
    </PageWrapper>
  )
}
