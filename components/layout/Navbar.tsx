'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Listings', href: '/listings' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change or when resized to desktop (>= 768px)
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent background scroll only when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Contextual theme detection
  const isDarkTopPage =
    pathname === '/' ||
    pathname === '/listings' ||
    pathname === '/about' ||
    pathname === '/contact'
  const isTransparentTop = isDarkTopPage && !scrolled && !mobileOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 w-full transition-all duration-300',
          // At top of hero: 100% transparent
          isTransparentTop
            ? 'bg-transparent text-white border-b border-transparent'
            : mobileOpen
            ? 'bg-[#030c1e]/95 backdrop-blur-2xl text-white border-b border-white/10'
            // On scroll or subpages: Translucent deep blue frosted glass
            : 'bg-[#030c1e]/85 backdrop-blur-xl border-b border-blue-900/30 text-white shadow-[0_4px_25px_-5px_rgba(2,6,23,0.5)]'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-hidden"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/image.png"
                alt="TradeSqr Logo"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight uppercase leading-none text-white transition-colors">
                TradeSqr
              </span>
              <span className="text-[8.5px] italic font-medium tracking-wider mt-0.5 leading-none text-blue-200/75 transition-colors">
                Direct & Verified
              </span>
            </div>
          </Link>

          {/* Right-Aligned Desktop Navigation Links */}
          <nav
            className={cn(
              'hidden md:flex items-center gap-1 p-1 rounded-full transition-colors ml-auto',
              isTransparentTop
                ? 'bg-white/10 border border-white/15 backdrop-blur-md'
                : 'bg-white/5 border border-white/10 backdrop-blur-md'
            )}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full',
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full -z-10 bg-white/20 border border-white/20 shadow-xs"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Morphing Mobile Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="relative flex h-10 w-10 md:hidden items-center justify-center rounded-md border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 focus:outline-hidden active:scale-95 ml-auto"
          >
            <div className="relative flex h-4 w-4.5 flex-col items-center justify-between">
              <span
                className={cn(
                  'h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out origin-top-left',
                  mobileOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-full rounded-full bg-current transition-all duration-200',
                  mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out origin-bottom-left',
                  mobileOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Glassmorphic Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Translucent Frosted Glass Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Deep Blue Frosted Glass Dropdown Panel */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative top-16 mx-auto w-full max-w-lg border-b border-white/10 bg-[#030c1e]/95 px-6 py-6 shadow-2xl backdrop-blur-3xl rounded-b-3xl text-white"
            >
              <div className="space-y-1.5">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-semibold transition-all backdrop-blur-xs',
                          isActive
                            ? 'bg-white/15 text-white font-bold border border-white/20 shadow-xs'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
