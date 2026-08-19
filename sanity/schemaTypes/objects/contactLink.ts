// sanity/schemaTypes/objects/contactLink.ts
//
// One contact method on a listing. A listing can have several of these
// (WhatsApp, phone, email, Facebook post link, whatever) since listings
// may eventually come from different sellers, not just TradeSqr.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactLink',
  title: 'Contact Link',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Phone', value: 'phone' },
          { title: 'Email', value: 'email' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Custom Link', value: 'custom' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description:
        'Optional. Shown on the button instead of the default, e.g. "Chat with Bola" or "Call the Office".',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description:
        'WhatsApp: full number with country code, e.g. 2348012345678. Phone: number. Email: address. Facebook/Custom: full URL.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { type: 'type', label: 'label', value: 'value' },
    prepare({ type, label, value }) {
      return {
        title: label || type,
        subtitle: value,
      }
    },
  },
})
