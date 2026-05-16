// Structural data only — all translatable text lives in messages/{locale}.json

// ── Project Role System ──────────────────────────────────────────────────────
// projectRole drives badge styling; the display text lives in messages/{locale}.json
// To override a label/description, update the project entry here + matching locale files.

export type ProjectRole =
  | 'Main Contractor'
  | 'Subcontractor'
  | 'Lead Designer'
  | 'Consultant'
  | 'Development Partner'

// ── Categories ───────────────────────────────────────────────────────────────
export const categories = [
  {
    id: 'civil',
    coverImage: '/projects/civil/img1.jpg',
    images: [
      '/projects/civil/img1.jpg',
      '/projects/civil/img2.jpg',
      '/projects/civil/img3.jpg',
    ],
  },
  {
    id: 'infrastructure',
    coverImage: '/projects/infrastructure/img1.jpg',
    images: [
      '/projects/infrastructure/img1.jpg',
      '/projects/infrastructure/img2.jpg',
    ],
  },
  {
    id: 'finishing',
    coverImage: '/projects/finishing/neom.jpg',
    images: ['/projects/finishing/neom.jpg'],
  },
  {
    id: 'steel',
    coverImage: '/projects/steel/img1.jpg',
    images: [
      '/projects/steel/img1.jpg',
      '/projects/steel/img2.jpg',
      '/projects/steel/img3.jpg',
    ],
  },
  {
    id: 'roads',
    coverImage: '/projects/roads/img1.jpg',
    images: [
      '/projects/roads/img1.jpg',
      '/projects/roads/img2.jpg',
    ],
  },
  {
    id: 'mosque',
    coverImage: '/projects/mosque/img1.png',
    images: [
      '/projects/mosque/img1.png',
      '/projects/mosque/img2.png',
      '/projects/mosque/img3.png',
      '/projects/mosque/img4.png',
      '/projects/mosque/img5.png',
      '/projects/mosque/img6.png',
    ],
  },
  {
    id: 'landscape',
    coverImage: '/projects/landscape/img1.jpg',
    images: [
      '/projects/landscape/img1.jpg',
      '/projects/landscape/img2.jpg',
      '/projects/landscape/img3.jpg',
      '/projects/landscape/img4.jpg',
      '/projects/landscape/img5.jpg',
      '/projects/landscape/img6.jpg',
      '/projects/landscape/img7.jpg',
      '/projects/landscape/img8.jpg',
    ],
  },
] as const

export type CategoryId = typeof categories[number]['id']

export const projects = [
  {
    id: 'neom',
    categoryId: 'finishing' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 41_000_000,
    year: 2023,
    featured: true,
    coverImage: '/projects/finishing/neom.jpg',
    images: ['/projects/finishing/neom.jpg', '/projects/civil/img2.jpg'],
  },
  {
    id: 'ksu',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 40_000_000,
    year: 2022,
    featured: true,
    coverImage: '/projects/civil/img1.jpg',
    images: ['/projects/civil/img1.jpg', '/projects/civil/img2.jpg', '/projects/civil/img3.jpg'],
  },
  {
    id: 'aramco',
    categoryId: 'infrastructure' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 40_000_000,
    year: 2022,
    featured: true,
    coverImage: '/projects/infrastructure/img1.jpg',
    images: ['/projects/infrastructure/img1.jpg', '/projects/infrastructure/img2.jpg'],
  },
  {
    id: 'sipchem',
    categoryId: 'steel' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 34_000_000,
    year: 2021,
    featured: true,
    coverImage: '/projects/steel/img1.jpg',
    images: ['/projects/steel/img1.jpg', '/projects/steel/img2.jpg', '/projects/steel/img3.jpg'],
  },
  {
    id: 'amwaj',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 30_000_000,
    year: 2021,
    featured: true,
    coverImage: '/projects/landscape/img3.jpg',
    images: [
      '/projects/landscape/img3.jpg',
      '/projects/landscape/img1.jpg',
      '/projects/landscape/img2.jpg',
      '/projects/landscape/img4.jpg',
      '/projects/landscape/img5.jpg',
      '/projects/landscape/img6.jpg',
      '/projects/landscape/img7.jpg',
      '/projects/landscape/img8.jpg',
    ],
  },
  {
    id: 'roads-network',
    categoryId: 'roads' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 25_000_000,
    year: 2022,
    featured: false,
    coverImage: '/projects/roads/img1.jpg',
    images: ['/projects/roads/img1.jpg', '/projects/roads/img2.jpg'],
  },
  {
    id: 'mosque-complex',
    categoryId: 'mosque' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 20_000_000,
    year: 2023,
    featured: false,
    coverImage: '/projects/mosque/img1.png',
    images: [
      '/projects/mosque/img1.png',
      '/projects/mosque/img2.png',
      '/projects/mosque/img3.png',
      '/projects/mosque/img4.png',
      '/projects/mosque/img5.png',
      '/projects/mosque/img6.png',
    ],
  },
] as const

export const clientIds = ['neom', 'arabian', 'kinan', 'alfanar', 'riyadhcables', 'sipchem', 'hassan', 'herfy'] as const

export const statsValues = [
  { value: 80,  suffix: '+' },
  { value: 338, suffix: '' },
  { value: 12,  suffix: '+' },
  { value: 500, suffix: 'M+' },
] as const

export const companyInfo = {
  nameEn:        'Midan Alemar Contracting Co.',
  founded:       2013,
  duns:          '67-269-8009',
  phone:         '0559007725',
  phoneLandline: '0114337732',
  phoneDisplay:  '055 900 7725',
  phoneLandlineDisplay: '011 433 7732',
  phoneTel:      '+966559007725',
  phoneLandlineTel: '+966114337732',
  email:         'projects@midangrup.com',
  addressEn:     'Eastern Ring Rd, Al Ezdihar Dist., Riyadh — KSA',
  mapsUrl:       'https://maps.google.com/?q=Al+Ezdihar+Dist.,+Eastern+Ring+Road,+Riyadh,+Saudi+Arabia',
  whatsapp:      'https://wa.me/966559007725',
}

export const certifications = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'ISO 45001:2018',
  'D-U-N-S Registered',
] as const

export const manpower = [
  { roleIndex: 0, count: 45,  percentage: 13 },
  { roleIndex: 1, count: 180, percentage: 53 },
  { roleIndex: 2, count: 60,  percentage: 18 },
  { roleIndex: 3, count: 35,  percentage: 10 },
  { roleIndex: 4, count: 18,  percentage:  6 },
] as const

export const equipment = [
  { categoryIndex: 0, items: [
    { nameIndex: 0,  brand: 'Komatsu',     quantity: 4,  model: 'PC350' },
    { nameIndex: 1,  brand: 'Caterpillar', quantity: 6,  model: 'CAT 320' },
    { nameIndex: 2,  brand: 'Komatsu',     quantity: 3,  model: 'D85' },
    { nameIndex: 3,  brand: 'Caterpillar', quantity: 2,  model: 'CAT 140' },
    { nameIndex: 4,  brand: 'Komatsu',     quantity: 5,  model: 'WA380' },
  ]},
  { categoryIndex: 1, items: [
    { nameIndex: 5,  brand: 'Liebherr',    quantity: 3,  model: '280 EC-H' },
    { nameIndex: 6,  brand: 'Grove',       quantity: 4,  model: 'GMK4100L' },
    { nameIndex: 7,  brand: 'Mercedes',    quantity: 20, model: 'Arocs' },
    { nameIndex: 8,  brand: 'SANY',        quantity: 12, model: 'SY306C' },
    { nameIndex: 9,  brand: 'Volvo',       quantity: 6,  model: 'FH16' },
  ]},
  { categoryIndex: 2, items: [
    { nameIndex: 10, brand: 'Putzmeister', quantity: 5,  model: 'BSF 52-5.16H' },
    { nameIndex: 11, brand: 'SANY',        quantity: 4,  model: 'HBT80C' },
    { nameIndex: 12, brand: '',            quantity: 30, model: '—' },
    { nameIndex: 13, brand: '',            quantity: 15, model: '—' },
  ]},
  { categoryIndex: 3, items: [
    { nameIndex: 14, brand: 'Dynapac',     quantity: 4,  model: 'CA2500' },
    { nameIndex: 15, brand: 'Vogele',      quantity: 2,  model: 'Super 1900-3' },
    { nameIndex: 16, brand: 'Hamm',        quantity: 3,  model: 'H7i' },
  ]},
  { categoryIndex: 4, items: [
    { nameIndex: 17, brand: 'Caterpillar', quantity: 10, model: '—' },
    { nameIndex: 18, brand: 'Grundfos',    quantity: 20, model: '—' },
    { nameIndex: 19, brand: 'Atlas Copco', quantity: 8,  model: '—' },
  ]},
] as const
