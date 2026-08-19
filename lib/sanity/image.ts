import { createImageUrlBuilder } from '@sanity/image-url'
import { projectId, dataset } from './client'
import { type SanityImage } from '@/types/listing'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'tradesqr',
  dataset: dataset || 'production',
})

interface ImageUrlResult {
  url: () => string
  width: (w: number) => ImageUrlResult
  height: (h: number) => ImageUrlResult
  fit: (f: string) => ImageUrlResult
  auto: (a: string) => ImageUrlResult
}

/**
 * Builds optimized URLs for Sanity images (coverImage, gallery, etc.)
 * Supports both Sanity assets and direct URL strings (used in mock/preview modes).
 */
export function urlForImage(source: SanityImage | string | null | undefined): ImageUrlResult | undefined {
  if (!source) return undefined

  // If source is a direct string URL (e.g. Unsplash URL for mock listings)
  if (typeof source === 'string') {
    const urlStr = source
    const result: ImageUrlResult = {
      url: () => urlStr,
      width: () => result,
      height: () => result,
      fit: () => result,
      auto: () => result,
    }
    return result
  }

  // If source is an object with a custom url field (mock image object)
  if ((source as unknown as { url?: string }).url) {
    const urlStr = (source as unknown as { url: string }).url
    const result: ImageUrlResult = {
      url: () => urlStr,
      width: () => result,
      height: () => result,
      fit: () => result,
      auto: () => result,
    }
    return result
  }

  // Sanity asset image builder
  try {
    if (source.asset?._ref) {
      return imageBuilder.image(source).auto('format').fit('max') as unknown as ImageUrlResult
    }
  } catch (error) {
    console.error('Error creating image URL from Sanity asset:', error)
  }

  return undefined
}
