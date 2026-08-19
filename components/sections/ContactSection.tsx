'use client'

import React, { useState } from 'react'
import { MessageSquare, Phone, Mail, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react'
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
    <section className="py-16 sm:py-24 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Communication Channels & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                Direct Channels
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Connect Directly with Our Operations Desk
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you are seeking custom real estate deals, verified foreign-used vehicles, or direct trade mentorship, our desk responds promptly.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Phone / Hotline</div>
                  <a href="tel:+2348012345678" className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors">
                    +234 801 234 5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Desk Email</div>
                  <a href="mailto:support@tradesqr.ng" className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors">
                    support@tradesqr.ng
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Desk Hours</div>
                  <div className="text-sm font-semibold text-slate-900">
                    Monday – Saturday: 8:00 AM – 7:00 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Connect on Socials
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-slate-100 text-slate-700 hover:bg-emerald-500 hover:text-white border border-slate-200 transition-all duration-200"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://t.me/tradesqr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-slate-100 text-slate-700 hover:bg-sky-500 hover:text-white border border-slate-200 transition-all duration-200"
                >
                  <Send className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://facebook.com/tradesqr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white border border-slate-200 transition-all duration-200"
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
            <div className="rounded-[7px] border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="pb-5 border-b border-slate-100 mb-6">
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Send a Direct Message
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Fill out the details below and an asset manager will reach out immediately.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-[7px] border border-emerald-200 bg-emerald-50 p-8 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <h4 className="font-heading text-base font-bold text-emerald-950">Inquiry Sent Successfully</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-sm mx-auto">
                    Thank you! Your inquiry has been routed to our active desk. We will respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="ts-btn-primary mt-3 px-4 py-2 text-xs font-semibold rounded-[7px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full rounded-[7px] border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-hidden transition-colors"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full rounded-[7px] border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-hidden transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className="w-full rounded-[7px] border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-hidden transition-colors"
                      />
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      I am Interested in:
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full rounded-[7px] border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-primary focus:outline-hidden transition-colors cursor-pointer"
                    >
                      <option value="properties">Real Estate & Property Acquisition</option>
                      <option value="cars">Foreign-Used Vehicles</option>
                      <option value="land">Registered Land Plots</option>
                      <option value="ai-solutions">AI Business Automation Solutions</option>
                      <option value="digital-finance">Digital Finance & Trading Academy</option>
                      <option value="general">General Partnership & Inquiry</option>
                    </select>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Message / Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify your budget, target asset location, or consultation requirements..."
                      className="w-full rounded-[7px] border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-hidden transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="ts-btn-primary w-full inline-flex items-center justify-center gap-2 py-3 rounded-[7px] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Inquiry</span>
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
