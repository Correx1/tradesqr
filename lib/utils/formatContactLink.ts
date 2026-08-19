import { type ContactLink, type ContactLinkType } from '@/types/listing'

export interface FormattedContactLink {
  href: string
  label: string
  type: ContactLinkType
  isExternal: boolean
}

/**
 * Returns clean href and display label for each contact link type.
 */
export function formatContactLink(
  link: ContactLink,
  listingTitle?: string
): FormattedContactLink {
  const { type, value, label } = link
  const cleanVal = value.trim()

  switch (type) {
    case 'whatsapp': {
      // Strip any non-digits from the phone number
      const phoneDigits = cleanVal.replace(/\D/g, '')
      const message = listingTitle
        ? `Hello, I am interested in "${listingTitle}" on TradeSqr.`
        : 'Hello, I am interested in your listing on TradeSqr.'
      const encodedMsg = encodeURIComponent(message)
      return {
        href: `https://wa.me/${phoneDigits}?text=${encodedMsg}`,
        label: label || 'Chat on WhatsApp',
        type,
        isExternal: true,
      }
    }

    case 'phone': {
      const phoneDigits = cleanVal.replace(/[^\d+]/g, '')
      return {
        href: `tel:${phoneDigits}`,
        label: label || `Call ${cleanVal}`,
        type,
        isExternal: false,
      }
    }

    case 'email': {
      const subject = listingTitle
        ? `Inquiry: ${listingTitle}`
        : 'TradeSqr Listing Inquiry'
      return {
        href: `mailto:${cleanVal}?subject=${encodeURIComponent(subject)}`,
        label: label || 'Send Email',
        type,
        isExternal: false,
      }
    }

    case 'facebook': {
      const href = cleanVal.startsWith('http') ? cleanVal : `https://${cleanVal}`
      return {
        href,
        label: label || 'View on Facebook',
        type,
        isExternal: true,
      }
    }

    case 'custom':
    default: {
      const href = cleanVal.startsWith('http') ? cleanVal : `https://${cleanVal}`
      return {
        href,
        label: label || 'Visit Link',
        type: 'custom',
        isExternal: true,
      }
    }
  }
}
