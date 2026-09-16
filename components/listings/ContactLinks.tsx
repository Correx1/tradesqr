import React from 'react'
import { MessageSquare, Phone, Mail, Share2, ExternalLink } from 'lucide-react'
import { type ContactLink, type ContactLinkType } from '@/types/listing'
import { formatContactLink, cn } from '@/lib/utils'

export interface ContactLinksProps {
  links: ContactLink[]
  listingTitle?: string
  layout?: 'horizontal' | 'vertical' | 'sticky-bar'
  className?: string
}

function getIconForType(type: ContactLinkType) {
  switch (type) {
    case 'whatsapp':
      return <MessageSquare className="h-4 w-4 shrink-0" />
    case 'phone':
      return <Phone className="h-4 w-4 shrink-0" />
    case 'email':
      return <Mail className="h-4 w-4 shrink-0" />
    case 'facebook':
      return <Share2 className="h-4 w-4 shrink-0" />
    case 'custom':
    default:
      return <ExternalLink className="h-4 w-4 shrink-0" />
  }
}

export function ContactLinks({
  links = [],
  listingTitle,
  layout = 'vertical',
  className,
}: ContactLinksProps) {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'flex gap-2.5',
        layout === 'vertical' && 'flex-col w-full',
        layout === 'horizontal' && 'flex-wrap items-center',
        layout === 'sticky-bar' && 'flex-row items-center w-full',
        className
      )}
    >
      {links.map((link, index) => {
        const isPrimary = index === 0
        const formatted = formatContactLink(link, listingTitle)
        const Icon = getIconForType(link.type)

        return (
          <a
            key={link._key || `${link.type}-${index}`}
            href={formatted.href}
            target={formatted.isExternal ? '_blank' : undefined}
            rel={formatted.isExternal ? 'noopener noreferrer' : undefined}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary w-full text-center',
              isPrimary
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs'
                : 'border border-border bg-card text-foreground hover:bg-muted'
            )}
          >
            {Icon}
            <span>{formatted.label}</span>
          </a>
        )
      })}
    </div>
  )
}

export default ContactLinks
