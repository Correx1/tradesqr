import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { MapPin, Tag, ShieldCheck } from 'lucide-react'

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

function formatStatus(status?: string): string {
  if (!status) return 'Available'
  switch (status.toLowerCase()) {
    case 'available':
      return 'Available'
    case 'sold':
      return 'Sold'
    case 'under-offer':
    case 'underoffer':
      return 'Under offer'
    case 'pending':
      return 'Pending'
    case 'reserved':
      return 'Reserved'
    default:
      return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }
}

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

// 2. Generate Dynamic Metadata
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
    gallery,
    price,
    priceOnRequest,
    location,
    status,
    condition,
    year,
    make,
    model,
    bedrooms,
    propertyType,
    plots,
    landSizeSqm
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

  const statusLabel = formatStatus(listing.status)

  return (
    <PageWrapper containerClassName="pt-4 pb-20 sm:pb-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap py-1">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-muted-foreground/60">/</span>
        <Link
          href={`/listings?category=${listing.category}`}
          className="hover:text-foreground transition-colors"
        >
          {categoryTitle}
        </Link>
        <span className="text-muted-foreground/60">/</span>
        <span className="text-foreground font-medium truncate max-w-[220px] sm:max-w-[400px]">
          {listing.title}
        </span>
      </nav>

      {/* Main Two-Column Layout: Left (60-65%) + Right Sticky Contact (35-40%) */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        {/* Left Column (lg:col-span-7 xl:col-span-8): Media, Details & Specs */}
        <div className="space-y-8 lg:col-span-7 xl:col-span-8 min-w-0">
          {/* Title & Metadata Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground border border-border">
                <Tag className="h-3 w-3 text-primary" />
                <span>{categoryTitle}</span>
              </span>
              {statusLabel && (
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border',
                    listing.status === 'sold'
                      ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                  )}
                >
                  {statusLabel}
                </span>
              )}
            </div>

            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {listing.title}
            </h1>

            {locationString && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{locationString}</span>
              </div>
            )}
          </div>

          {/* Lightbox & Gallery */}
          <GalleryLightbox
            title={listing.title}
            coverImage={listing.coverImage}
            gallery={listing.gallery}
          />

          {/* Mobile Only: Contact panel stacked right below gallery */}
          <div className="block lg:hidden">
            <div className="rounded-xs border border-border bg-card p-6 shadow-xs space-y-5">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs text-muted-foreground font-medium">Direct price</span>
                  <div className="font-heading text-3xl font-bold text-foreground">
                    {formattedPrice}
                  </div>
                </div>
                {statusLabel && (
                  <span className="text-xs font-medium text-muted-foreground">
                    Status: <span className="text-foreground">{statusLabel}</span>
                  </span>
                )}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <ContactLinks
                  links={listing.contactLinks || []}
                  listingTitle={listing.title}
                  layout="vertical"
                />
              </div>

              <div className="flex items-start gap-2.5 rounded-xs bg-muted/40 p-3 text-xs text-muted-foreground border border-border">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Verified listing on TradeSqr. Direct seller negotiation with zero middleman fee.
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {listing.description && (
            <div className="rounded-xs border border-border bg-card p-6 space-y-3">
              <h2 className="font-heading text-base font-semibold text-foreground">
                Overview & description
              </h2>
              <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {listing.description}
              </div>
            </div>
          )}

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
        </div>

        {/* Right Column (lg:col-span-5 xl:col-span-4): Sticky Contact Card on Desktop */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xs border border-border bg-card p-6 shadow-xs space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    Direct price
                  </span>
                  {statusLabel && (
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border',
                        listing.status === 'sold'
                          ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                      )}
                    >
                      {statusLabel}
                    </span>
                  )}
                </div>
                <div className="font-heading text-3xl xl:text-4xl font-bold text-foreground tracking-tight">
                  {formattedPrice}
                </div>
              </div>

              <div className="border-t border-border pt-5 space-y-3">
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  Direct seller contact
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Connect immediately via your preferred channel. Trade directly with no agent markup.
                </p>

                {/* Stacked Full-Width Pill Buttons */}
                <ContactLinks
                  links={listing.contactLinks || []}
                  listingTitle={listing.title}
                  layout="vertical"
                />
              </div>

              <div className="flex items-start gap-2.5 rounded-xs bg-muted/40 p-3.5 text-xs text-muted-foreground border border-border">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Verified listing on TradeSqr. We recommend physical inspection before completing any transfer.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings Section */}
      {relatedListings.length > 0 && (
        <section className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-border space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-primary">
                Explore more
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
                Similar {categoryTitle.toLowerCase()} listings
              </h2>
            </div>
            <Link
              href={`/listings?category=${listing.category}`}
              className="text-xs font-semibold text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
            >
              View all {categoryTitle.toLowerCase()}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedListings.map((relListing) => (
              <ListingCard key={relListing._id} listing={relListing} />
            ))}
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
