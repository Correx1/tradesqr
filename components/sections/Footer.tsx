import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare, Send, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020612] text-slate-400 border-t border-slate-800/80">
      {/* 1. Giant Background Watermark Text "TRADESQR" */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden z-0">
        <span className="font-heading font-black text-[15vw] sm:text-[18vw] tracking-tighter text-white/[0.03] uppercase leading-none transform translate-y-4">
          TRADESQR
        </span>
      </div>

      {/* 2. Dark Shining Radial & Linear Lighting Overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.18),rgba(0,0,0,0))]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-blue-600/10 blur-[120px] z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#020612]/70 via-transparent to-[#020612]/90" />

      {/* 3. Foreground Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
          {/* Brand Logo & Concise Tagline */}
          <div className="space-y-2.5 max-w-md">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[7px] transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/image.png"
                  alt="TradeSqr Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight uppercase leading-none text-white">
                  TradeSqr
                </span>
                <span className="text-[8.5px] italic font-medium tracking-wider mt-0.5 leading-none text-slate-400">
                  Direct & Verified
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Verified hub for direct property listings, automotive assets, and digital services.
            </p>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/listings" className="hover:text-white transition-colors">
              Listings
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Quick Direct Social Channels */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-white/5 text-emerald-400 border border-white/10 hover:bg-emerald-500 hover:text-white transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href="https://t.me/tradesqr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-white/5 text-sky-400 border border-white/10 hover:bg-sky-500 hover:text-white transition-all duration-200"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href="tel:+2348012345678"
              aria-label="Phone"
              className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-white/5 text-slate-300 border border-white/10 hover:bg-white/15 hover:text-white transition-all duration-200"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:contact@tradesqr.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-white/5 text-slate-300 border border-white/10 hover:bg-white/15 hover:text-white transition-all duration-200"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} TradeSqr. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">Verified Marketplace & Direct Connection Hub</p>
        </div>
      </div>
    </footer>
  )
}
