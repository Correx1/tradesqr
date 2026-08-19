'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/effect-fade'

export interface HeroSlide {
  image: string
  alt: string
}

export interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  slides?: HeroSlide[]
  className?: string
}

const defaultSlides: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1764605206511-7a649d9df63b?w=1920&q=80',
    alt: 'Curated asset showcased on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1660869312082-4e6e7aedc980?w=1920&q=80',
    alt: 'Verified asset showcased on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=80',
    alt: 'Premium space showcased on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1750778176714-b1a2e6a8815c?w=1920&q=80',
    alt: 'Quality verified listing on TradeSqr',
  },
  {
    image: 'https://images.unsplash.com/photo-1758448756207-54505680d130?w=1920&q=80',
    alt: 'Exclusive space showcased on TradeSqr',
  },
]

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const textItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Hero({
  title = 'Trusted Platform for Properties Listing',
  subtitle = 'Discover verified properties and opportunities across Nigeria with seamless, direct connections.',
  ctaText = 'Explore TradeSqr',
  ctaHref = '/listings',
  slides = defaultSlides,
  className,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className={cn('w-full', className)}
      style={{
        position: 'relative',
        height: '85vh',
        minHeight: 560,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background slideshow with scroll-linked parallax */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
          y: bgY,
          scale: bgScale,
        }}
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          speed={1200}
          allowTouchMove={false}
          style={{ height: '100%', width: '100%' }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.image}>
              <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Dark overlay — strong top gradient for navbar legibility and center contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}
      />

      {/* Centered content, staggered entrance, fades out on scroll */}
      <motion.div
        variants={textContainer}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-2xl px-4 text-center"
        style={{ position: 'relative', zIndex: 10, opacity: contentOpacity }}
      >
        <motion.h1
          variants={textItem}
          className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={textItem}
          className="mx-auto mt-4 max-w-lg text-balance text-base text-white/85 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* Single clean primary CTA button styled with predefined design tokens */}
        <motion.div
          variants={textItem}
          className="mt-8 flex items-center justify-center"
        >
          <Link
            href={ctaHref}
            className="ts-btn-primary group shadow-md"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', x: '-50%', zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}