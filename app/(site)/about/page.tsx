import { AboutHero, AboutStory, ServicesStrip, WhyChooseUs,FAQ } from '@/components/sections'
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
     <FAQ/>
    </main>
  )
}
