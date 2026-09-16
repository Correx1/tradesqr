'use client'

import React from 'react'
import { FileCheck, ShieldCheck } from 'lucide-react'
import { type ListingDocument } from '@/types/listing'
import { cn } from '@/lib/utils'

export interface DocumentsChecklistProps {
  documents?: (string | ListingDocument)[]
  className?: string
}

export function DocumentsChecklist({ documents, className }: DocumentsChecklistProps) {
  if (!documents || !Array.isArray(documents) || documents.length === 0) return null

  // Normalize: handle both string tags ['C of O', 'Survey Plan'] and objects { name, available }
  const docNames = documents
    .map((doc) => {
      if (typeof doc === 'string') return doc.trim()
      if (typeof doc === 'object' && doc !== null) {
        if (doc.available === false) return null
        return doc.name?.trim() || null
      }
      return null
    })
    .filter((name): name is string => Boolean(name && name.length > 0))

  if (docNames.length === 0) return null

  return (
    <div className={cn('rounded-xs border border-border bg-card', className)}>
      <div className="border-b border-border bg-muted/30 px-5 py-3.5 sm:px-6">
        <h3 className="font-heading text-base font-semibold text-foreground">
          Verified title & documents
        </h3>
      </div>
      <div className="p-5 sm:p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {docNames.map((name, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between rounded-xs border border-border bg-muted/20 px-4 py-3 text-xs font-medium text-foreground"
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="h-4 w-4 shrink-0 text-primary" />
                <span className="font-medium text-foreground">{name}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
