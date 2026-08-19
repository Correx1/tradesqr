/* eslint-disable @typescript-eslint/no-explicit-any */
// sanity/schemaTypes/listing.ts
//
// Single listing document.
// "category" is a string dropdown — Cars, Real Estate, Generic.
// Fields show/hide based on the selected category.

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',

  groups: [
    { name: 'main',        title: 'Main Info',           default: true },
    { name: 'carDetails',  title: 'Car Details'                        },
    { name: 'reDetails',   title: 'Real Estate Details'                },
    { name: 'landDetails', title: 'Land Details'                       },
    { name: 'generic',     title: 'Custom Attributes'                  },
    { name: 'contact',     title: 'Contact'                            },
  ],

  fields: [

    // ── Core fields ───────────────────────────────────────────────────────────

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Cars',        value: 'cars'        },
          { title: 'Real Estate', value: 'realEstate'  },
          { title: 'Land',        value: 'land'        },
          { title: 'Generic',     value: 'generic'     },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'main',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'main',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'main',
      rows: 5,
    }),

    defineField({
      name: 'price',
      title: 'Price (NGN)',
      type: 'number',
      group: 'main',
      hidden: ({ document }: { document?: any }) => Boolean(document?.priceOnRequest),
    }),

    defineField({
      name: 'priceOnRequest',
      title: 'Price on Request',
      type: 'boolean',
      group: 'main',
      initialValue: false,
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'main',
      fields: [
        defineField({ name: 'state', title: 'State',       type: 'string' }),
        defineField({ name: 'city',  title: 'City / Area', type: 'string' }),
      ],
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Pending',   value: 'pending'   },
          { title: 'Sold',      value: 'sold'       },
        ],
      },
      initialValue: 'available',
    }),

    // ── Cars ──────────────────────────────────────────────────────────────────

    defineField({
      name: 'make',
      title: 'Make (Brand)',
      type: 'string',
      group: 'carDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      group: 'carDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'carDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      group: 'carDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      group: 'carDetails',
      options: {
        list: [
          { title: 'Automatic', value: 'Automatic' },
          { title: 'Manual',    value: 'Manual'    },
        ],
      },
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      group: 'carDetails',
      options: {
        list: [
          { title: 'Petrol',   value: 'Petrol'   },
          { title: 'Diesel',   value: 'Diesel'   },
          { title: 'Hybrid',   value: 'Hybrid'   },
          { title: 'Electric', value: 'Electric' },
        ],
      },
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      group: 'carDetails',
      options: {
        list: [
          { title: 'Foreign Used', value: 'Foreign Used' },
          { title: 'Locally Used', value: 'Locally Used' },
          { title: 'Brand New',    value: 'Brand New'    },
        ],
      },
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      group: 'carDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'cars',
    }),

    // ── Real Estate ───────────────────────────────────────────────────────────

    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      group: 'reDetails',
      options: {
        list: [
          { title: 'Apartment / Flat', value: 'Apartment'     },
          { title: 'Detached House',   value: 'Detached'      },
          { title: 'Semi-Detached',    value: 'Semi-Detached' },
          { title: 'Duplex',           value: 'Duplex'        },
          { title: 'Terrace',          value: 'Terrace'       },
          { title: 'Commercial Space', value: 'Commercial'    },
        ],
      },
      hidden: ({ document }: { document?: any }) => document?.category !== 'realEstate',
    }),

    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      group: 'reDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'realEstate',
    }),

    defineField({
      name: 'sizeSqm',
      title: 'Size (sqm)',
      type: 'number',
      group: 'reDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'realEstate',
    }),

    defineField({
      name: 'listingPurpose',
      title: 'Listing Purpose',
      type: 'string',
      group: 'reDetails',
      options: {
        list: [
          { title: 'For Sale',  value: 'sale'  },
          { title: 'For Rent',  value: 'rent'  },
          { title: 'For Lease', value: 'lease' },
        ],
      },
      hidden: ({ document }: { document?: any }) => document?.category !== 'realEstate',
    }),

    // ── Land ──────────────────────────────────────────────────────────────────

    defineField({
      name: 'landSizeSqm',
      title: 'Size (sqm)',
      type: 'number',
      group: 'landDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'land',
    }),

    defineField({
      name: 'plots',
      title: 'Number of Plots',
      type: 'number',
      group: 'landDetails',
      hidden: ({ document }: { document?: any }) => document?.category !== 'land',
    }),

    defineField({
      name: 'landPurpose',
      title: 'Listing Purpose',
      type: 'string',
      group: 'landDetails',
      options: {
        list: [
          { title: 'For Sale',  value: 'sale'  },
          { title: 'For Lease', value: 'lease' },
        ],
      },
      hidden: ({ document }: { document?: any }) => document?.category !== 'land',
    }),

    // ── Generic — free-form key-value ─────────────────────────────────────────

    defineField({
      name: 'attributes',
      title: 'Custom Attributes',
      type: 'array',
      group: 'generic',
      description: 'Add any label/value pairs e.g. Size → 42, Material → Leather',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
      hidden: ({ document }: { document?: any }) => document?.category !== 'generic',
    }),

    // ── Features & Amenities — shown for cars, real estate, land ─────────────

    defineField({
      name: 'features',
      title: 'Features & Amenities',
      type: 'array',
      description: 'Pick an icon and add a label for each feature/amenity.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  // Property
                  { title: 'Swimming Pool', value: 'pool' },
                  { title: 'CCTV / Security Cameras', value: 'cctv' },
                  { title: 'Cinema Room', value: 'cinema' },
                  { title: 'Smart Home', value: 'smart-home' },
                  { title: 'Rooftop Lounge', value: 'rooftop' },
                  { title: 'Modern Kitchen', value: 'kitchen' },
                  { title: 'Parking Space', value: 'parking' },
                  { title: 'Generator / Standby Power', value: 'generator' },
                  { title: 'Security / Guard Post', value: 'security' },
                  { title: 'Balcony', value: 'balcony' },
                  { title: 'All Ensuite', value: 'ensuite' },
                  { title: 'Gym / Fitness Room', value: 'gym' },
                  { title: 'Elevator / Lift', value: 'elevator' },
                  { title: 'WiFi / Internet Ready', value: 'wifi' },
                  { title: 'Air Conditioning', value: 'ac' },
                  { title: 'Waterfront Access', value: 'waterfront' },
                  { title: 'Panoramic Views', value: 'view' },
                  { title: 'Imported Bathroom Fixtures', value: 'bathroom' },
                  { title: 'Custom Woodwork', value: 'woodwork' },
                  // Land
                  { title: 'Fully Fenced', value: 'fence' },
                  { title: 'Dry Land (No Flood Risk)', value: 'dry-land' },
                  { title: 'Road Access / Frontage', value: 'road' },
                  { title: 'Corner Piece', value: 'corner' },
                  { title: 'Electricity On Site', value: 'electricity' },
                  { title: 'Close to Landmark', value: 'landmark' },
                  { title: 'Underground Utilities', value: 'infrastructure' },
                  // Cars
                  { title: 'Panoramic / Sunroof', value: 'sunroof' },
                  { title: '360° Camera System', value: 'cameras' },
                  { title: 'Premium Audio System', value: 'audio' },
                  { title: 'Cruise Control', value: 'cruise' },
                  { title: 'Heated / Ventilated Seats', value: 'seats' },
                  { title: 'Head-Up Display (HUD)', value: 'hud' },
                  { title: 'Ambient Interior Lighting', value: 'ambient' },
                  { title: 'Air Suspension', value: 'suspension' },
                  { title: 'Android Auto / Apple CarPlay', value: 'android-auto' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'icon' },
          },
        },
      ],
      hidden: ({ document }: { document?: any }) => document?.category === 'generic',
    }),

    // ── Title Documents — for real estate and land (only add what exists) ─────

    defineField({
      name: 'documents',
      title: 'Title Documents',
      type: 'array',
      description: 'Add the available title/legal documents (e.g. C of O, Survey Plan, Governor’s Consent).',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      hidden: ({ document }: { document?: any }) =>
        document?.category !== 'realEstate' && document?.category !== 'land',
    }),

    // ── Contact ───────────────────────────────────────────────────────────────

    defineField({
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      group: 'contact',
      of: [{ type: 'contactLink' }],
      validation: (Rule) =>
        Rule.min(1).error('Add at least one contact method for this listing.'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      status: 'status',
      category: 'category',
    },
    prepare({ title, media, status, category }) {
      const labels: Record<string, string> = {
        cars: 'Cars',
        realEstate: 'Real Estate',
        land: 'Land',
        generic: 'Generic',
      }
      return {
        title,
        subtitle: `${labels[category] ?? category ?? 'No category'} · ${status ?? ''}`,
        media,
      }
    },
  },
})
