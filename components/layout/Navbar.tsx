/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Listings', href: '/listings' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 w-full transition-all duration-300',
          scrolled || mobileOpen
            ? 'bg-[#030712]/92 backdrop-blur-xl border-b border-white/10 text-white shadow-lg'
            : 'bg-transparent text-white border-b border-transparent'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
          {/* Left: Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/image.png"
                alt="TradeSqr Logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white transition-colors">
              TradeSqr
            </span>
          </Link>

          {/* Right-Aligned Cluster: Links + Contact Desk CTA */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 ml-auto">
            <nav className="flex items-center gap-7 lg:gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative py-1.5 text-sm font-medium tracking-wide transition-colors duration-200',
                      isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Subtle Vertical Divider */}
            <div className="h-5 w-[1px] bg-white/15" />

            {/* Contact Desk CTA Button */}
            <Link
              href="/contact"
              className="ts-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-md transition-all duration-200 hover:bg-blue-700 active:scale-95 group"
            >
              <span>Contact</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="relative flex h-10 w-10 md:hidden items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white backdrop-blur-md focus:outline-hidden ml-auto"
          >
            <div className="relative flex h-4 w-5 flex-col items-center justify-between">
              <span
                className={cn(
                  'h-0.5 w-full bg-white transition-all duration-300 ease-out origin-top-left',
                  mobileOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-full bg-white transition-all duration-200',
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-full bg-white transition-all duration-300 ease-out origin-bottom-left',
                  mobileOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-[#030712]/98 pt-24 px-6 flex flex-col justify-between pb-12"
          >
            <div className="space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block text-2xl font-semibold transition-colors',
                      isActive ? 'text-white border-l-2 border-primary pl-3' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link
                href="/contact"
                className="ts-btn-primary w-full justify-center text-center py-3.5 rounded-lg text-sm font-semibold"
              >
                <span>Contact</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
