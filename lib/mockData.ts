import { type Listing } from '@/types/listing'

export const DUMMY_LISTINGS: Listing[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // CARS
  // ─────────────────────────────────────────────────────────────────────────
  {
    _id: 'car-1',
    _type: 'listing',
    _createdAt: '2026-08-15T10:00:00Z',
    title: '2021 Lexus RX 350 F-Sport (Foreign Used)',
    slug: { current: '2021-lexus-rx-350-f-sport' },
    category: 'cars',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-car-1', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [
      { _type: 'image', asset: { _ref: 'img-c1-1', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80' } as any,
      { _type: 'image', asset: { _ref: 'img-c1-2', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80' } as any,
      { _type: 'image', asset: { _ref: 'img-c1-3', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' } as any,
    ],
    description: `Immaculate 2021 Lexus RX 350 F-Sport in Atomic Silver exterior with Rioja Red leather interior.

Direct foreign used from the United States with clean title and zero duty issues. This particular unit comes with the full executive package — Mark Levinson 15-speaker premium audio, 360-degree surround camera system, panoramic power moonroof, adaptive cruise control, and driver attention monitor. Comprehensive pre-shipment inspection report available. All papers intact.`,
    price: 48500000,
    priceOnRequest: false,
    location: { city: 'Victoria Island', state: 'Lagos' },
    status: 'available',
    make: 'Lexus',
    model: 'RX 350 F-Sport',
    year: 2021,
    mileage: 38400,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    condition: 'Foreign Used',
    color: 'Atomic Silver',
    features: [
      { label: 'Panoramic Moonroof', icon: 'sunroof' },
      { label: '360° Surround Camera', icon: 'cameras' },
      { label: 'Mark Levinson Audio', icon: 'audio' },
      { label: 'Adaptive Cruise Control', icon: 'cruise' },
      { label: 'Ventilated Front Seats', icon: 'seats' },
      { label: 'Head-Up Display', icon: 'hud' },
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Chat on WhatsApp', value: '2348012345678' },
      { type: 'phone', label: 'Call Direct', value: '+2348012345678' },
      { type: 'email', label: 'Send Email Inquiry', value: 'sales@tradesqr.com' },
    ],
  },

  {
    _id: 'car-2',
    _type: 'listing',
    _createdAt: '2026-08-14T14:30:00Z',
    title: '2022 Mercedes-Benz GLE 450 4MATIC AMG Line',
    slug: { current: '2022-mercedes-benz-gle-450' },
    category: 'cars',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-car-2', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [
      { _type: 'image', asset: { _ref: 'img-c2-1', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80' } as any,
      { _type: 'image', asset: { _ref: 'img-c2-2', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80' } as any,
    ],
    description: `Foreign used 2022 Mercedes-Benz GLE 450 with 3.0L Turbo Inline-6 EQ Boost mild-hybrid powertrain delivering 362hp.

AMG Line exterior/interior package, Burmester 3D surround audio (13 speakers), 64-color ambient lighting, MBUX head-up display, dual 12.3-inch infotainment cluster, airmatic air suspension (5 ride modes), Distronic Plus radar cruise control, 360° camera system, and heated/cooled front seats. All customs documents fully verified. Duty paid.`,
    price: 82000000,
    priceOnRequest: false,
    location: { city: 'Maitama', state: 'Abuja' },
    status: 'available',
    make: 'Mercedes-Benz',
    model: 'GLE 450 AMG Line',
    year: 2022,
    mileage: 24500,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    condition: 'Foreign Used',
    color: 'Obsidian Black Metallic',
    features: [
      { label: 'Burmester 3D Surround Audio', icon: 'audio' },
      { label: '64-Color Ambient Lighting', icon: 'ambient' },
      { label: 'Head-Up Display (HUD)', icon: 'hud' },
      { label: 'Airmatic Air Suspension', icon: 'suspension' },
      { label: 'Panoramic Sliding Roof', icon: 'sunroof' },
      { label: 'Android Auto / Apple CarPlay', icon: 'android-auto' },
      { label: '360° Camera System', icon: 'cameras' },
      { label: 'Distronic Radar Cruise', icon: 'cruise' },
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Chat on WhatsApp', value: '2348098765432' },
      { type: 'phone', label: 'Call Broker', value: '+2348098765432' },
    ],
  },

  {
    _id: 'car-3',
    _type: 'listing',
    _createdAt: '2026-08-13T09:00:00Z',
    title: '2020 Toyota Land Cruiser V8 (GXR, Locally Used)',
    slug: { current: '2020-toyota-land-cruiser-v8-gxr' },
    category: 'cars',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-car-3', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [
      { _type: 'image', asset: { _ref: 'img-c3-1', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80' } as any,
    ],
    description: `2020 Toyota Land Cruiser V8 GXR in perfect condition. Single owner from new — bought by a returning expat and maintained by Toyota Ghana. Now available due to relocation.

Comes with original manuals, service history booklet (14 stamps), and all FRSC/LSLGA papers complete. This is the real deal — no accident history.`,
    price: 95000000,
    priceOnRequest: false,
    location: { city: 'Ikoyi', state: 'Lagos' },
    status: 'available',
    make: 'Toyota',
    model: 'Land Cruiser V8 GXR',
    year: 2020,
    mileage: 52000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    condition: 'Locally Used',
    color: 'Pearl White',
    features: [
      { label: 'Multi-Terrain Select', icon: 'suspension' },
      { label: 'Crawl Control (CRAWL)', icon: 'cruise' },
      { label: 'JBL Premium Audio', icon: 'audio' },
      { label: 'Power Rear Sunshade', icon: 'sunroof' },
      { label: 'Rear-View Camera', icon: 'cameras' },
      { label: 'Heated & Ventilated Seats', icon: 'seats' },
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Chat on WhatsApp', value: '2348055667788' },
      { type: 'phone', label: 'Call Direct', value: '+2348055667788' },
    ],
  },

  {
    _id: 'car-4',
    _type: 'listing',
    _createdAt: '2026-08-12T07:00:00Z',
    title: '2023 BMW X5 xDrive40i M-Sport Package',
    slug: { current: '2023-bmw-x5-xdrive40i-msport' },
    category: 'cars',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-car-4', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [],
    description: `Brand new 2023 BMW X5 xDrive40i with full M-Sport package — direct order from Germany. First to view will buy.

Includes BMW Live Cockpit Professional, Harman Kardon sound, Panoramic glass roof, laser headlights, and M-Sport braking system. Arrives with full factory warranty and BMW Nigeria PDI.`,
    price: 0,
    priceOnRequest: true,
    location: { city: 'Lekki', state: 'Lagos' },
    status: 'available',
    make: 'BMW',
    model: 'X5 xDrive40i M-Sport',
    year: 2023,
    mileage: 0,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    condition: 'Brand New',
    color: 'Phytonic Blue',
    features: [
      { label: 'Harman Kardon Sound System', icon: 'audio' },
      { label: 'Panoramic Glass Roof', icon: 'sunroof' },
      { label: 'BMW Laser Headlights', icon: 'hud' },
      { label: 'Android Auto / Apple CarPlay', icon: 'android-auto' },
      { label: 'Adaptive Cruise Control', icon: 'cruise' },
      { label: 'Ambient Interior Lighting', icon: 'ambient' },
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Request Price on WhatsApp', value: '2348044556677' },
      { type: 'phone', label: 'Call Dealer', value: '+2348044556677' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // REAL ESTATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    _id: 'house-1',
    _type: 'listing',
    _createdAt: '2026-08-13T09:15:00Z',
    title: 'Luxury 5-Bedroom Fully Detached Duplex + BQ & Swimming Pool',
    slug: { current: 'luxury-5-bedroom-detached-duplex-lekki' },
    category: 'realEstate',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-house-1', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [
      { _type: 'image', asset: { _ref: 'img-h1-1', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' } as any,
      { _type: 'image', asset: { _ref: 'img-h1-2', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80' } as any,
      { _type: 'image', asset: { _ref: 'img-h1-3', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' } as any,
    ],
    description: `Newly built contemporary 5-bedroom detached mansion situated within a secure, gated estate in Lekki Phase 1.

Each bedroom is fully en-suite with Italian Porcelain tiles, Italian chef kitchen with island, private cinema room, rooftop lounge with city views, infinity swimming pool, stamped concrete compound with parking for up to 6 vehicles, and an integrated Crestron home automation system.

Title is Governor's Consent — fully perfected and ready for immediate transfer. This is a serious investment-grade property.`,
    price: 380000000,
    priceOnRequest: false,
    location: { city: 'Lekki Phase 1', state: 'Lagos' },
    status: 'available',
    propertyType: 'Detached',
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 650,
    furnishingStatus: 'Unfurnished',
    listingPurpose: 'sale',
    features: [
      { label: 'Infinity Swimming Pool', icon: 'pool' },
      { label: 'Private Cinema Room', icon: 'cinema' },
      { label: 'Smart Home (Crestron)', icon: 'smart-home' },
      { label: 'Rooftop Lounge', icon: 'rooftop' },
      { label: 'Italian Chef Kitchen', icon: 'kitchen' },
      { label: 'CCTV Surveillance', icon: 'cctv' },
      { label: 'Parking for 6 Vehicles', icon: 'parking' },
      { label: '24hr Power Supply', icon: 'generator' },
      { label: 'BQ (Boys Quarters)', icon: 'ensuite' },
      { label: 'Security Post', icon: 'security' },
    ],
    documents: [
      "Governor's Consent",
      'Survey Plan',
      'Building Approval',
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Chat with Agent', value: '2348011223344' },
      { type: 'phone', label: 'Direct Office Line', value: '+2348011223344' },
      { type: 'email', label: 'Request Brochure', value: 'properties@tradesqr.com' },
    ],
  },

  {
    _id: 'house-2',
    _type: 'listing',
    _createdAt: '2026-08-12T16:45:00Z',
    title: '4-Bedroom Contemporary Terrace Duplex, Old Ikoyi',
    slug: { current: '4-bedroom-contemporary-terrace-ikoyi' },
    category: 'realEstate',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-house-2', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [
      { _type: 'image', asset: { _ref: 'img-h2-1', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80' } as any,
    ],
    description: `Prestigious 4-bedroom terrace duplex in Old Ikoyi with 24/7 dedicated power generation and manned security post. 

Features custom woodwork throughout, all-ensuite rooms with imported fixtures, balcony with panoramic greenery views, and high rental yield potential — ideal for discerning investors seeking a premium Ikoyi address. C of O on ground.`,
    price: 0,
    priceOnRequest: true,
    location: { city: 'Old Ikoyi', state: 'Lagos' },
    status: 'available',
    propertyType: 'Terrace',
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 380,
    furnishingStatus: 'Semi-Furnished',
    listingPurpose: 'sale',
    features: [
      { label: '24/7 Power Generation', icon: 'generator' },
      { label: 'Manned Security Post', icon: 'security' },
      { label: 'Balcony with Panoramic Views', icon: 'balcony' },
      { label: 'Custom Woodwork', icon: 'woodwork' },
      { label: 'All Ensuite Rooms', icon: 'ensuite' },
      { label: 'CCTV Surveillance', icon: 'cctv' },
    ],
    documents: [
      'C of O',
      'Survey Plan',
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Inquire on WhatsApp', value: '2348022334455' },
      { type: 'phone', label: 'Call Direct', value: '+2348022334455' },
    ],
  },

  {
    _id: 'house-3',
    _type: 'listing',
    _createdAt: '2026-08-11T14:00:00Z',
    title: '4-Bedroom Semi-Detached Duplex with Smart Home, Guzape Abuja',
    slug: { current: '4-bedroom-semi-detached-guzape-abuja' },
    category: 'realEstate',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-house-3', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [],
    description: `Modern 4-bedroom duplex with picturesque hilltop views in Guzape District, Abuja. This is the only unit available in the close — a rare find.

Fitted with a smart home automation panel controlling lights, gate, and AC, imported sanitary ware, CCTV surveillance across all perimeter points, and spacious private parking with interlock tiles. R of O available.`,
    price: 210000000,
    priceOnRequest: false,
    location: { city: 'Guzape', state: 'Abuja' },
    status: 'available',
    propertyType: 'Semi-Detached',
    bedrooms: 4,
    sizeSqm: 420,
    listingPurpose: 'sale',
    features: [
      { label: 'Smart Home Automation', icon: 'smart-home' },
      { label: 'CCTV Surveillance', icon: 'cctv' },
      { label: 'Imported Sanitary Ware', icon: 'bathroom' },
      { label: 'Interlock Private Parking', icon: 'parking' },
      { label: 'Hilltop Views', icon: 'view' },
      { label: 'Central Air Conditioning', icon: 'ac' },
    ],
    documents: [
      'R of O',
      'Survey Plan',
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Chat on WhatsApp', value: '2348099887766' },
      { type: 'phone', label: 'Call Broker', value: '+2348099887766' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LAND
  // ─────────────────────────────────────────────────────────────────────────
  {
    _id: 'land-1',
    _type: 'listing',
    _createdAt: '2026-08-11T11:20:00Z',
    title: 'Prime 2,000 sqm Commercial Plot Facing Lekki-Epe Expressway',
    slug: { current: 'prime-commercial-plot-lekki-epe' },
    category: 'land',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-land-1', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [
      { _type: 'image', asset: { _ref: 'img-l1-1', _type: 'reference' }, url: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80' } as any,
    ],
    description: `Strategic corner-piece dry commercial land directly on the Lekki-Epe Expressway corridor. Ideal for retail plaza, bank branch, corporate headquarters, hotel, or auto dealership showroom.

100% dry ground throughout the year — no flood risk. Fully perimeter-fenced with block walls, registered Certificate of Occupancy (C of O) in hand. Ready for immediate development. Purchase from owner — no agency complications.`,
    price: 450000000,
    priceOnRequest: false,
    location: { city: 'Epe Corridor', state: 'Lagos' },
    status: 'available',
    plots: 3,
    landSizeSqm: 2000,
    fenced: true,
    landPurpose: 'sale',
    landTitleDocument: 'C of O',
    features: [
      { label: 'Fully Perimeter Fenced', icon: 'fence' },
      { label: '100% Dry Land (No Flood Risk)', icon: 'dry-land' },
      { label: 'Expressway Frontage', icon: 'road' },
      { label: 'Corner Piece Plot', icon: 'corner' },
      { label: 'Electricity On Site', icon: 'generator' },
      { label: 'Close to International Airport', icon: 'landmark' },
    ],
    documents: [
      'C of O',
      'Survey Plan',
      'Deed of Assignment',
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Chat with Land Desk', value: '2348033445566' },
      { type: 'phone', label: 'Call Direct', value: '+2348033445566' },
    ],
  },

  {
    _id: 'land-2',
    _type: 'listing',
    _createdAt: '2026-08-10T08:00:00Z',
    title: '1,000 sqm Waterfront Residential Plot, Banana Island',
    slug: { current: 'waterfront-residential-plot-banana-island' },
    category: 'land',
    coverImage: {
      _type: 'image',
      asset: { _ref: 'image-land-2', _type: 'reference' },
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    } as any,
    gallery: [],
    description: `Exclusive waterfront land parcel within Banana Island's ultra-premium enclave. Direct, unhindered lagoon-facing frontage with world-class infrastructure — underground utilities, dedicated fiber optic, drainage, and cobblestone roads maintained by the estate.

Strict zoning ensures only residential developments of 3+ floors. This is legacy real estate. Federal C of O on ground. One of the last available parcels at this price on the island.`,
    price: 0,
    priceOnRequest: true,
    location: { city: 'Banana Island, Ikoyi', state: 'Lagos' },
    status: 'available',
    plots: 1.5,
    landSizeSqm: 1000,
    landPurpose: 'sale',
    features: [
      { label: 'Waterfront / Lagoon Frontage', icon: 'waterfront' },
      { label: 'Underground Utilities', icon: 'infrastructure' },
      { label: 'Dedicated Fiber Optic', icon: 'wifi' },
      { label: 'Elite Gated Estate', icon: 'security' },
      { label: 'Cobblestone Roads', icon: 'road' },
      { label: 'Panoramic Lagoon Views', icon: 'view' },
    ],
    documents: [
      'Federal C of O',
      'Survey Plan',
    ],
    contactLinks: [
      { type: 'whatsapp', label: 'Request Pricing on WhatsApp', value: '2348055667788' },
      { type: 'phone', label: 'Call Executive Desk', value: '+2348055667788' },
    ],
  },
]
