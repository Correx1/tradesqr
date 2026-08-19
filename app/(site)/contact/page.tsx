import { ContactHero, ContactSection, FAQ } from '@/components/sections'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the TradeSqr team for inquiries, asset inspections, or advisory.',
}

export default function ContactPage() {
  return (
    <main className="w-full flex-1">
      {/* 1. End-to-End Contact Hero */}
      <ContactHero />

      {/* 2. Interactive Contact & Direct Channels Section */}
      <ContactSection />

      {/* 3. Common Questions Section */}
      <div className="border-t border-slate-100">
        <FAQ />
      </div>
    </main>
  )
}
