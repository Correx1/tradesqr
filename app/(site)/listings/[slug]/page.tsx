import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { MapPin, Tag, ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react'

import { PageWrapper } from '@/components/layout'
import {
  GalleryLightbox,
  KeySpecsGrid,
  AmenitiesGrid,
  DocumentsChecklist,
  ContactLinks,
  ListingCard,
} from '@/components/listings'
import { client } from '@/lib/sanity/client'
import { listingBySlugQuery, listingSlugsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { getCategoryTitle } from '@/lib/categoryFields'
import { formatPrice, cn } from '@/lib/utils'
import { DUMMY_LISTINGS } from '@/lib/mockData'
import { type Listing } from '@/types/listing'

interface ListingDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60

// 1. Generate Static Params
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(listingSlugsQuery)
    const dummySlugs = DUMMY_LISTINGS.map((l) => l.slug.current)
    const combinedSlugs = Array.from(new Set([...(slugs || []), ...dummySlugs]))
    return combinedSlugs.map((slug) => ({ slug }))
  } catch {
    return DUMMY_LISTINGS.map((l) => ({ slug: l.slug.current }))
  }
}

// 2. Generate Dynamic Metadata (OG tags for WhatsApp / Facebook / Socials)
export async function generateMetadata({
  params,
}: ListingDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  let listing: Listing | null = null

  try {
    listing = await client.fetch(listingBySlugQuery, { slug })
  } catch {
    listing = null
  }

  if (!listing) {
    listing = DUMMY_LISTINGS.find((l) => l.slug.current === slug) || null
  }

  if (!listing) {
    return {
      title: 'Listing Not Found | TradeSqr',
      description: 'The requested listing could not be found on TradeSqr.',
    }
  }

  const categoryTitle = getCategoryTitle(listing.category)

  const formattedPrice = formatPrice({
    price: listing.price,
    priceOnRequest: listing.priceOnRequest,
  })

  const title = `${listing.title} (${formattedPrice}) | TradeSqr`
  const description =
    listing.description?.slice(0, 160) ||
    `Explore ${listing.title} in ${listing.location?.city || 'Nigeria'}. Verified ${categoryTitle} on TradeSqr.`

  const ogImageUrl = listing.coverImage
    ? urlForImage(listing.coverImage)?.width(1200).height(630).fit('crop').url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: listing.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  }
}

const relatedListingsQuery = groq`
  *[_type == "listing" && category == $category && slug.current != $slug] | order(_createdAt desc)[0...3] {
    _id,
    _type,
    _createdAt,
    title,
    slug,
    category,
    coverImage,
    price,
    priceOnRequest,
    location,
    status
  }
`

// 3. Detail Page Component
export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { slug } = await params

  let listing: Listing | null = null
  let relatedListings: Listing[] = []

  try {
    listing = await client.fetch(listingBySlugQuery, { slug })
    if (listing) {
      relatedListings = await client.fetch(relatedListingsQuery, {
        category: listing.category,
        slug: listing.slug.current,
      })
    }
  } catch {
    listing = null
  }

  // Fallback to dummy data
  if (!listing) {
    listing = DUMMY_LISTINGS.find((l) => l.slug.current === slug) || null
    if (listing) {
      relatedListings = DUMMY_LISTINGS.filter(
        (l) => l.category === listing!.category && l.slug.current !== slug
      ).slice(0, 3)
    }
  }

  if (!listing) {
    notFound()
  }

  const categoryTitle = getCategoryTitle(listing.category)

  const formattedPrice = formatPrice({
    price: listing.price,
    priceOnRequest: listing.priceOnRequest,
  })

  const locationString = [listing.location?.city, listing.location?.state]
    .filter(Boolean)
    .join(', ')

  return (
    <PageWrapper containerClassName="pt-4 pb-20 sm:pb-24">
      {/* Breadcrumbs / Back navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to all listings</span>
        </Link>
        <span className="inline-flex items-center rounded-[2px] bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {categoryTitle}
        </span>
      </div>

      {/* Main Grid: Gallery & Details (Left) + Sticky Action Sidebar (Right) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols): Media & Information */}
        <div className="space-y-8 lg:col-span-8">
          {/* Lightbox & Gallery */}
          <GalleryLightbox
            title={listing.title}
            coverImage={listing.coverImage}
            gallery={listing.gallery}
          />

          {/* Core Title & Specs Header */}
          <div className="space-y-4 rounded-[2px] border border-border bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-[2px] bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Tag className="h-3 w-3" />
                {categoryTitle}
              </span>
              {listing.status && (
                <span
                  className={cn(
                    'inline-flex items-center rounded-[2px] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
                    listing.status === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : listing.status === 'sold'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  )}
                >
                  {listing.status}
                </span>
              )}
            </div>

            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {listing.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/80">
              {locationString && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{locationString}</span>
                </div>
              )}
              <div className="text-right">
                <span className="block text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Price
                </span>
                <span className="font-heading text-2xl font-bold text-primary">
                  {formattedPrice}
                </span>
              </div>
            </div>
          </div>

          {/* 1. Core Specifications Grid */}
          <KeySpecsGrid listing={listing} />

          {/* 2. Dynamic Features & Amenities Grid */}
          {listing.features && listing.features.length > 0 && (
            <AmenitiesGrid features={listing.features} />
          )}

          {/* 3. Title Documents Checklist */}
          {listing.documents && listing.documents.length > 0 && (
            <DocumentsChecklist documents={listing.documents} />
          )}

          {/* 4. Description Section */}
          {listing.description && (
            <div className="rounded-[2px] border border-border bg-white p-6 space-y-3">
              <h2 className="font-heading text-base font-semibold text-foreground">
                Overview & Description
              </h2>
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {listing.description}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Sticky Contact Card on Desktop */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            <div className="rounded-[2px] border border-border bg-white p-6 shadow-xs space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Listing Valuation
                </span>
                <div className="font-heading text-2xl font-bold text-primary mt-0.5">
                  {formattedPrice}
                </div>
              </div>

              <div className="border-t border-border/80 pt-4">
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">
                  Direct Inquiries & Contact
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Connect immediately with the seller or representative via direct channels. No intermediary fees.
                </p>

                {/* Contact Action Buttons */}
                <ContactLinks
                  links={listing.contactLinks || []}
                  listingTitle={listing.title}
                  layout="vertical"
                />
              </div>

              <div className="flex items-start gap-2.5 rounded-[2px] bg-muted/50 p-3 text-xs text-muted-foreground border border-border/60">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  TradeSqr verifies listing specifications. We advise conducting physical inspection prior to fund transfer.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Contact Bar (Fixed at bottom on small screens) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-md lg:hidden shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Price
            </span>
            <span className="font-heading text-sm font-bold text-primary truncate block">
              {formattedPrice}
            </span>
          </div>
          <div className="flex-1">
            <ContactLinks
              links={(listing.contactLinks || []).slice(0, 1)}
              listingTitle={listing.title}
              layout="horizontal"
              className="w-full justify-end *:w-full *:py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Related Listings Section */}
      {relatedListings.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Similar {categoryTitle} Listings
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Other available options in this category.
              </p>
            </div>
            <Link
              href="/listings"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedListings.map((relListing) => (
              <ListingCard key={relListing._id} listing={relListing} />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
