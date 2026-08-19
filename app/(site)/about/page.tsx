import { AboutHero, AboutStory, ServicesStrip, WhyChooseUs, DigitalCommunityBanner } from '@/components/sections'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about TradeSqr and our mission in the Nigerian asset and services landscape.',
}

export default function AboutPage() {
  return (
    <main className="w-full flex-1">
      {/* 1. End-to-End About Hero Section */}
      <AboutHero />

      {/* 2. Story Narrative Showcase Section */}
      <AboutStory />

      {/* 3. Core Solutions & Services Strip */}
      <ServicesStrip />

      {/* 4. Split Why Choose Us Feature Section */}
      <WhyChooseUs />

      {/* 5. Community / Digital Finance Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <DigitalCommunityBanner />
      </div>
    </main>
  )
}
