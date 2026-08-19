'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DigitalCommunityBannerProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  ctaText?: string
  telegramUrl?: string
  whatsappUrl?: string
  facebookUrl?: string
  bgImage?: string
  className?: string
}

export function DigitalCommunityBanner({
  eyebrow = 'DIGITAL FINANCE & COMMUNITY',
  title = 'Master Digital Finance, AI & Modern Trading',
  subtitle = 'Get daily market setups, digital asset education, and exclusive community trade signals directly from verified analysts.',
  ctaText = 'Join My Community',
  telegramUrl = 'https://t.me/tradesqr',
  whatsappUrl = 'https://wa.me/2348012345678',
  facebookUrl = 'https://facebook.com/tradesqr',
  bgImage = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80',
  className,
}: DigitalCommunityBannerProps) {
  return (
    <section
      data-section="digital-community-banner"
      className={cn('py-12 sm:py-16 bg-white', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(3, 7, 18, 0.94) 0%, rgba(3, 7, 18, 0.88) 50%, rgba(3, 7, 18, 0.7) 100%), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 p-8 sm:p-12 lg:p-14 text-white shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left Content Column */}
            <div className="max-w-2xl">
              {/* Eyebrow with blue bar */}
              <div className="mb-3.5 inline-flex items-center gap-2 rounded-sm border border-blue-500/30 bg-blue-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400 backdrop-blur-md">
                <span className="h-3.5 w-1 rounded-full bg-primary" />
                <span>{eyebrow}</span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
                {title}
              </h2>

              {/* Subtitle */}
              <p className="mt-3.5 text-sm sm:text-base font-normal text-slate-300 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>

            {/* Right Action Button & Socials */}
            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <Link
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ts-btn-primary group inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary/90 px-7 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 active:scale-98"
              >
                <Send className="h-4 w-4 fill-current" />
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4 stroke-[1.75] transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Social Icons Strip */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-normal text-slate-400 mr-1">
                  Connect:
                </span>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join TradeSqr on WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-emerald-400 backdrop-blur-md border border-white/10 transition-all duration-200 hover:bg-emerald-500 hover:text-white hover:scale-105 active:scale-95 shadow-2xs"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.838.813 2.796.813h.001c3.182 0 5.768-2.586 5.769-5.766 0-3.18-2.586-5.766-5.77-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.388-.456-4.834-1.251l-5.166 1.353 1.378-5.034c-.878-1.503-1.378-3.245-1.378-5.068 0-5.514 4.486-10 10-10s10 4.486 10 10z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join TradeSqr on Telegram"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-sky-400 backdrop-blur-md border border-white/10 transition-all duration-200 hover:bg-sky-500 hover:text-white hover:scale-105 active:scale-95 shadow-2xs"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow TradeSqr on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-blue-400 backdrop-blur-md border border-white/10 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 shadow-2xs"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
