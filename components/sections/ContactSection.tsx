'use client'

import React, { useState } from 'react'
import { MessageSquare, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'properties',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open direct WhatsApp or acknowledge submit
    const text = encodeURIComponent(
      `Hello TradeSqr Desk, My name is ${formData.name}. I am interested in: ${formData.interest}.\nMessage: ${formData.message}\nEmail: ${formData.email} | Phone: ${formData.phone}`
    )
    window.open(`https://wa.me/2348012345678?text=${text}`, '_blank')
    setSubmitted(true)
  }

  return (
    <section className="py-16 sm:py-24 bg-background text-foreground border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Communication Channels & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-primary">
                Direct desk channels
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Connect directly with our operations desk
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether you are seeking custom real estate deals, verified foreign-used vehicles, or registered land plots, our desk responds promptly.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs bg-primary/10 text-primary border border-primary/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">Direct phone &amp; WhatsApp</div>
                  <a href="tel:+2348012345678" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    +234 801 234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs bg-primary/10 text-primary border border-primary/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">Official desk email</div>
                  <a href="mailto:support@tradesqr.ng" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                    support@tradesqr.ng
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs bg-primary/10 text-primary border border-primary/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">Desk hours</div>
                  <div className="text-sm font-semibold text-foreground">
                    Monday – Saturday: 8:00 AM – 7:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-6 border-t border-border space-y-3">
              <div className="text-xs font-medium text-muted-foreground">
                Connect on social channels
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground border border-border shadow-xs transition-colors"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://t.me/tradesqr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground border border-border shadow-xs transition-colors"
                >
                  <Send className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://facebook.com/tradesqr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground hover:bg-primary hover:text-primary-foreground border border-border shadow-xs transition-colors"
                >
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-xs border border-border bg-card p-6 sm:p-8 shadow-xs">
              <div className="pb-5 border-b border-border mb-6">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                  Send a direct message
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Fill out the details below and an asset specialist will reach out immediately.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-xs border border-emerald-500/20 bg-emerald-500/10 p-8 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="font-heading text-base font-bold text-foreground">Inquiry sent successfully</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                    Thank you! Your inquiry has been routed to our desk. We will respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-xs mt-3"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full rounded-xs border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden transition-colors"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-muted-foreground">
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-xs border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-muted-foreground">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className="w-full rounded-xs border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden transition-colors"
                      />
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">
                      Asset interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full rounded-xs border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-primary focus:outline-hidden transition-colors cursor-pointer"
                    >
                      <option value="cars">Foreign-used &amp; verified vehicles</option>
                      <option value="properties">Real estate &amp; homes</option>
                      <option value="land">Registered land plots</option>
                      <option value="general">General partnership &amp; inquiry</option>
                    </select>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">
                      Message &amp; specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify your budget, target asset location, or specific requirements..."
                      className="w-full rounded-xs border border-border bg-background p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-xs transition-all active:scale-98"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
