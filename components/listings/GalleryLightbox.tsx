'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { type SanityImage } from '@/types/listing'
import { urlForImage } from '@/lib/sanity/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export interface GalleryLightboxProps {
  coverImage: SanityImage
  gallery?: SanityImage[]
  title: string
  className?: string
}

export function GalleryLightbox({
  coverImage,
  gallery = [],
  title,
  className,
}: GalleryLightboxProps) {
  // Combine cover image and gallery images into single list
  const allImages = [coverImage, ...gallery].filter(Boolean)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setIsOpen(true)
  }

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % allImages.length)
  }, [allImages.length])

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  // Handle keyboard navigation when dialog is open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, nextImage, prevImage])

  if (allImages.length === 0) {
    return null
  }

  const activeImageUrl = urlForImage(allImages[activeIndex])?.width(1600).url()
  const mainImageUrl = urlForImage(allImages[0])?.width(1200).height(800).url()

  return (
    <div className={cn('space-y-3', className)}>
      {/* Main Showcase Image */}
      <div
        onClick={() => openLightbox(0)}
        className="group relative aspect-16/10 w-full cursor-pointer overflow-hidden rounded-[7px] border border-border bg-muted"
      >
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={`${title} - Photo 1`}
            fill
            priority
            className="object-cover transition-transform duration-300 group-hover:scale-103"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        <button
          type="button"
          className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-[7px] bg-black/75 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-xs transition-opacity hover:bg-black"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span>View all ({allImages.length})</span>
        </button>
      </div>

      {/* Thumbnail Strip (if multiple images exist) */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {allImages.slice(0, 6).map((img, idx) => {
            const thumbUrl = urlForImage(img)?.width(240).height(160).url()
            const isLastOfPreview = idx === 5 && allImages.length > 6
            const remainingCount = allImages.length - 6

            return (
              <button
                key={img?.asset?._ref || idx}
                type="button"
                onClick={() => openLightbox(idx)}
                className="group relative aspect-16/10 w-full overflow-hidden rounded-[7px] border border-border bg-muted focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={`${title} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover transition-opacity group-hover:opacity-90"
                    sizes="120px"
                  />
                )}
                {isLastOfPreview && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 font-heading text-xs font-bold text-white">
                    +{remainingCount} more
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Lightbox Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl border-border bg-black/95 p-2 sm:p-4 text-white sm:max-w-5xl rounded-[7px]">
          <DialogTitle className="sr-only">{title} Gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Image {activeIndex + 1} of {allImages.length}
          </DialogDescription>

          <div className="relative flex flex-col items-center justify-center">
            {/* Active Full Image Container */}
            <div className="relative aspect-16/10 w-full max-h-[75vh] overflow-hidden rounded-[7px] bg-black">
              {activeImageUrl && (
                <Image
                  src={activeImageUrl}
                  alt={`${title} - Photo ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>

            {/* Navigation Overlay Controls */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-[7px] bg-black/60 text-white transition-colors hover:bg-primary focus:outline-hidden"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-[7px] bg-black/60 text-white transition-colors hover:bg-primary focus:outline-hidden"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Footer Status Bar */}
            <div className="mt-3 flex w-full items-center justify-between px-2 text-xs text-muted-foreground">
              <span className="truncate max-w-[70%] text-neutral-300">{title}</span>
              <span className="font-medium text-white">
                {activeIndex + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
