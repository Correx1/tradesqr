/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavSubItem {
  label: string
  href: string
}

export interface NavCategory {
  label: string
  href: string
  subItems?: NavSubItem[]
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Cars',
    href: '/listings?category=cars',
    subItems: [
      { label: 'Foreign Used', href: '/listings?category=cars&condition=Foreign+Used' },
      { label: 'Locally Used', href: '/listings?category=cars&condition=Locally+Used' },
      { label: 'Brand New', href: '/listings?category=cars&condition=Brand+New' },
      { label: 'View all Cars', href: '/listings?category=cars' },
    ],
  },
  {
    label: 'Real Estate',
    href: '/listings?category=realEstate',
    subItems: [
      { label: 'For Sale', href: '/listings?category=realEstate&purpose=For+Sale' },
      { label: 'For Rent', href: '/listings?category=realEstate&purpose=For+Rent' },
      { label: 'For Lease', href: '/listings?category=realEstate&purpose=For+Lease' },
      { label: 'View all Real Estate', href: '/listings?category=realEstate' },
    ],
  },
  {
    label: 'Land',
    href: '/listings?category=land',
    subItems: [
      { label: 'For Sale', href: '/listings?category=land&purpose=For+Sale' },
      { label: 'For Lease', href: '/listings?category=land&purpose=For+Lease' },
      { label: 'View all Land', href: '/listings?category=land' },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
]

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = NAV_CATEGORIES.map((c) => ({
  label: c.label,
  href: c.href,
}))

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLElement>(null)

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
    setActiveDropdown(null)
    setSearchOpen(false)
  }, [pathname])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  // Handle escape key to close dropdowns and search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const q = encodeURIComponent(searchQuery.trim())
    router.push(`/listings?q=${q}&search=${q}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const toggleMobileCategory = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const isScrolled = scrolled || mobileOpen

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 inset-x-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border text-foreground shadow-xs'
            : 'bg-transparent text-white border-b border-transparent'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Left: Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-hidden shrink-0"
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
            <span
              className={cn(
                'font-heading text-xl font-bold tracking-tight transition-colors',
                isScrolled ? 'text-foreground' : 'text-white'
              )}
            >
              TradeSqr
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto mr-6">
            {NAV_CATEGORIES.map((category) => {
              const hasDropdown = Boolean(category.subItems && category.subItems.length > 0)
              const isActive =
                pathname === category.href ||
                (category.subItems && category.subItems.some((s) => pathname === s.href))
              const isOpen = activeDropdown === category.label

              return (
                <div
                  key={category.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(category.label)}
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : category.label)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={cn(
                        'inline-flex items-center gap-1.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 focus:outline-hidden',
                        isScrolled
                          ? isActive
                            ? 'text-foreground font-semibold'
                            : 'text-muted-foreground hover:text-foreground'
                          : isActive
                          ? 'text-white font-semibold'
                          : 'text-white/80 hover:text-white'
                      )}
                    >
                      <span>{category.label}</span>
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200 opacity-70',
                          isOpen && 'rotate-180 opacity-100'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={category.href}
                      className={cn(
                        'relative inline-flex items-center py-2 text-sm font-medium tracking-wide transition-colors duration-200',
                        isScrolled
                          ? isActive
                            ? 'text-foreground font-semibold'
                            : 'text-muted-foreground hover:text-foreground'
                          : isActive
                          ? 'text-white font-semibold'
                          : 'text-white/80 hover:text-white'
                      )}
                    >
                      <span>{category.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          className="absolute -bottom-0.5 inset-x-0 h-[2px] bg-primary rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute left-0 top-full pt-2 z-50 min-w-[210px]"
                        >
                          <div className="rounded-xs border border-border bg-card p-1.5 shadow-xl text-card-foreground">
                            {category.subItems?.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block rounded-xs px-3.5 py-2 text-xs font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-foreground"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Header Actions: Inline Search + Divider + Contact CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Expandable Inline Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSearchSubmit}
                    className="flex items-center overflow-hidden rounded-full border border-border bg-card pl-3 pr-1 py-1 shadow-xs"
                  >
                    <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search listings..."
                      className="w-full bg-transparent px-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-1 text-muted-foreground hover:text-foreground rounded-full"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search listings"
                    className={cn(
                      'p-2 rounded-full transition-colors focus:outline-hidden',
                      isScrolled
                        ? 'text-foreground/80 hover:text-foreground hover:bg-muted'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Search className="h-4 w-4" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle Divider */}
            <div
              className={cn(
                'h-5 w-[1px] transition-colors',
                isScrolled ? 'bg-border' : 'bg-white/20'
              )}
            />

            {/* Contact CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 text-xs font-semibold rounded-full shadow-xs transition-all duration-200 active:scale-95"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Right Icons (Search & Toggle) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(true)
                setSearchOpen(true)
              }}
              aria-label="Search"
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xs border transition-colors',
                isScrolled
                  ? 'border-border bg-card text-foreground'
                  : 'border-white/20 bg-white/10 text-white backdrop-blur-md'
              )}
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-xs border transition-colors focus:outline-hidden',
                isScrolled
                  ? 'border-border bg-card text-foreground'
                  : 'border-white/20 bg-white/10 text-white backdrop-blur-md'
              )}
            >
              <div className="relative flex h-4 w-5 flex-col items-center justify-between">
                <span
                  className={cn(
                    'h-0.5 w-full transition-all duration-300 ease-out origin-top-left',
                    isScrolled ? 'bg-foreground' : 'bg-white',
                    mobileOpen ? 'rotate-45 translate-x-0.5 -translate-y-0.5' : ''
                  )}
                />
                <span
                  className={cn(
                    'h-0.5 w-full transition-all duration-200',
                    isScrolled ? 'bg-foreground' : 'bg-white',
                    mobileOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'h-0.5 w-full transition-all duration-300 ease-out origin-bottom-left',
                    isScrolled ? 'bg-foreground' : 'bg-white',
                    mobileOpen ? '-rotate-45 translate-x-0.5 translate-y-0.5' : ''
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Accordions */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-background text-foreground pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6">
              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search model, location, title..."
                  className="w-full rounded-xs border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </form>

              {/* Mobile Vertical Accordion */}
              <div className="space-y-2 border-t border-border/60 pt-4">
                {NAV_CATEGORIES.map((category) => {
                  const hasDropdown = Boolean(category.subItems && category.subItems.length > 0)
                  const isExpanded = Boolean(mobileExpanded[category.label])
                  const isActive = pathname === category.href

                  if (!hasDropdown) {
                    return (
                      <Link
                        key={category.label}
                        href={category.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'block py-2.5 text-lg font-medium transition-colors',
                          isActive ? 'text-primary font-semibold' : 'text-foreground/90'
                        )}
                      >
                        {category.label}
                      </Link>
                    )
                  }

                  return (
                    <div key={category.label} className="border-b border-border/40 pb-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileCategory(category.label)}
                        className="flex w-full items-center justify-between py-2.5 text-lg font-medium text-foreground"
                      >
                        <span>{category.label}</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200 text-muted-foreground',
                            isExpanded && 'rotate-180 text-primary'
                          )}
                        />
                      </button>

                      {isExpanded && (
                        <div className="space-y-2 pl-4 pt-1 pb-2">
                          {category.subItems?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1.5 text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile Contact Bottom Action */}
            <div className="pt-6 border-t border-border mt-8">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-full text-sm font-semibold shadow-xs"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

