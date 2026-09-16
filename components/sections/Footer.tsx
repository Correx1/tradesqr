import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare, Phone, Mail, Send } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#121214] text-[#E4E1D9] border-t border-[#26262A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-[#26262A]">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xs transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/image.png"
                  alt="TradeSqr logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#FAFAF8] leading-none">
                  TradeSqr
                </span>
                <span className="text-[11px] font-medium mt-0.5 leading-none text-primary">
                  Direct &amp; verified
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#DAD6CC]/70 leading-relaxed max-w-sm">
              Direct, verified marketplace for premium vehicles, residential &amp; commercial real estate, and registered land plots across Nigeria. Zero middleman markups.
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1E] text-[#DAD6CC] border border-[#26262A] hover:bg-primary hover:text-[#121214] hover:border-primary transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://t.me/tradesqr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1E] text-[#DAD6CC] border border-[#26262A] hover:bg-primary hover:text-[#121214] hover:border-primary transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
              </a>
              <a
                href="tel:+2348012345678"
                aria-label="Phone"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1E] text-[#DAD6CC] border border-[#26262A] hover:bg-primary hover:text-[#121214] hover:border-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:support@tradesqr.ng"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1E] text-[#DAD6CC] border border-[#26262A] hover:bg-primary hover:text-[#121214] hover:border-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Browse */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold text-[#FAFAF8]">
              Browse assets
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DAD6CC]/75">
              <li>
                <Link href="/listings?category=cars" className="hover:text-primary transition-colors">
                  Verified vehicles
                </Link>
              </li>
              <li>
                <Link href="/listings?category=realEstate" className="hover:text-primary transition-colors">
                  Real estate &amp; homes
                </Link>
              </li>
              <li>
                <Link href="/listings?category=land" className="hover:text-primary transition-colors">
                  Registered land plots
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-primary transition-colors">
                  All listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold text-[#FAFAF8]">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DAD6CC]/75">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About TradeSqr
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact desk
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Verification standard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Partner with us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Desk */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold text-[#FAFAF8]">
              Direct desk
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DAD6CC]/75">
              <li>
                <a href="tel:+2348012345678" className="hover:text-primary transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li>
                <a href="mailto:support@tradesqr.ng" className="hover:text-primary transition-colors">
                  support@tradesqr.ng
                </a>
              </li>
              <li className="text-xs text-[#DAD6CC]/50 pt-1">
                Mon – Sat: 8:00 AM – 7:00 PM
              </li>
              <li className="text-xs text-[#DAD6CC]/50">
                Lagos &amp; Abuja, Nigeria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DAD6CC]/60">
          <p>&copy; {currentYear} TradeSqr. All rights reserved.</p>
          <p>Direct marketplace &amp; verification hub</p>
        </div>
      </div>
    </footer>
  )
}
