'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQProps {
  heading?: string
  subheading?: string
  items?: FAQItem[]
  className?: string
}

export function FAQ({
  heading = 'Frequently Asked Questions',
  subheading = 'Clear answers regarding TradeSqr verified listings, direct seller contact, independent inspections, and digital services.',
  items,
  className,
}: FAQProps) {
  const defaultItems: FAQItem[] = [
    {
      question: 'How do I purchase or inquire about a listing on TradeSqr?',
      answer:
        'TradeSqr is a direct-connect platform with zero middleman fees or on-site checkout. On any listing page, click the WhatsApp, Phone, or Email button to communicate directly with the verified seller or our executive team.',
    },
    {
      question: 'Are payments handled on TradeSqr?',
      answer:
        'No payments are processed on this website. All financial negotiations and transactions occur directly between you and the verified listing owner. We recommend commissioning our physical inspection or title verification service prior to releasing funds.',
    },
    {
      question: 'What does "Price on Request" mean?',
      answer:
        'High-value assets, prime waterfront land, and custom commercial contracts often require personalized terms. Tapping the contact link connects you immediately with the broker for current quotes and payment arrangements.',
    },
    {
      question: 'Can I request an independent vehicle or property inspection?',
      answer:
        'Yes. Through our Services division, you can book an exhaustive 150-point automotive diagnostics scan or a comprehensive title document search at the land registry before completing your transaction.',
    },
    {
      question: 'What is included in the TradeSqr Digital Community?',
      answer:
        'Our private community provides members with daily financial market insights, actionable digital asset education, AI business integration guides, and first-access alerts on below-market real estate and automotive deals.',
    },
    {
      question: 'How are listings verified before being published?',
      answer:
        'Every vehicle and property listing undergoes strict document review, customs clearance validation, and owner verification before being featured on TradeSqr to ensure authentic representations.',
    },
  ]

  const faqList = items || defaultItems
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      data-section="faq"
      className={cn('py-20 sm:py-28 bg-slate-50/60 border-b border-border/80', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Support Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Help & Guidelines</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {heading}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {subheading}
            </p>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqList.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className={cn(
                    'rounded-xl border bg-white transition-all duration-200 shadow-2xs',
                    isOpen ? 'border-primary/40 shadow-xs' : 'border-border hover:border-border/80'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-heading text-sm sm:text-base font-semibold text-foreground focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className={cn('pr-4 transition-colors', isOpen ? 'text-primary' : 'text-foreground')}>
                      {item.question}
                    </span>
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                        isOpen ? 'bg-primary/10 text-primary rotate-180' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed border-t border-border/40 mt-1 pt-3">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
