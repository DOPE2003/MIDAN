// Structural data only — all translatable text lives in messages/{locale}.json

export type ProjectRole =
  | 'Main Contractor'
  | 'Subcontractor'
  | 'Lead Designer'
  | 'Consultant'
  | 'Development Partner'

// breakdown: multi-package projects where the total is made up of distinct sub-contracts.
// Labels live in messages/{locale}.json under projects.items.[id].breakdown
export type ProjectBreakdown = { value: number }[]

// ── Categories (ordered 1–7) ─────────────────────────────────────────────────
export const categories = [
  {
    id: 'civil',
    coverImage: '/projects/civil/neom-nrc26/img-01.jpg',
    images: [
      '/projects/civil/neom-nrc26/img-01.jpg',
      '/projects/civil/sipchem/img-01.jpg',
      '/projects/civil/ksu-ltc/img-01.jpg',
    ],
  },
  {
    id: 'infrastructure',
    coverImage: '/projects/infrastructure/riyadh-stormwater-37/img-01.jpg',
    images: [
      '/projects/infrastructure/riyadh-stormwater-37/img-01.jpg',
      '/projects/infrastructure/sweet-water-16/img-01.jpg',
      '/projects/infrastructure/yoowalk-mall/img-01.jpg',
    ],
  },
  {
    id: 'finishing',
    coverImage: '/projects/finishing/aramco-ajyad/img-01.jpg',
    images: [
      '/projects/finishing/aramco-ajyad/img-01.jpg',
      '/projects/finishing/amwaj/img-01.jpg',
      '/projects/finishing/neom-nrc19/img-01.jpg',
    ],
  },
  {
    id: 'steel',
    coverImage: '/projects/steel/riyadh-cables/img-01.jpg',
    images: [
      '/projects/steel/riyadh-cables/img-01.jpg',
      '/projects/steel/arasco-silos/img-01.jpg',
      '/projects/steel/neom-nc1/img-01.jpg',
    ],
  },
  {
    id: 'roads',
    coverImage: '/projects/roads/arar-airport/img-01.jpg',
    images: [
      '/projects/roads/arar-airport/img-01.jpg',
      '/projects/roads/roads-shamasia/img-01.jpg',
      '/projects/roads/road-khalidiyah/img-01.jpg',
    ],
  },
  {
    id: 'mosque',
    coverImage: '/projects/mosque/neom-nrc17-kitchen/img-01.jpg',
    images: [
      '/projects/mosque/neom-nrc17-kitchen/img-01.jpg',
      '/projects/mosque/neom-nrc17-kitchen/img-02.jpg',
      '/projects/mosque/neom-nrc19-mosque/img-01.png',
    ],
  },
  {
    id: 'landscape',
    coverImage: '/projects/landscape/hizam-park/img-01.jpg',
    images: [
      '/projects/landscape/hizam-park/img-01.jpg',
      '/projects/landscape/alwadi-park/img-01.jpg',
      '/projects/landscape/alnakhil-village/img-01.jpg',
    ],
  },
] as const

export type CategoryId = typeof categories[number]['id']

// ── Helper: build image array from project folder ────────────────────────────
function imgs(cat: string, id: string, count: number, ext = 'jpg'): string[] {
  return Array.from({ length: count }, (_, i) =>
    `/projects/${cat}/${id}/img-${String(i + 1).padStart(2, '0')}.${ext}`
  )
}

// ── Projects ─────────────────────────────────────────────────────────────────
// Ordered: 1-Civil, 2-Infrastructure, 3-Finishing, 4-Steel, 5-Roads, 6-Mosque, 7-Landscape
// Within each category: exact folder order preserved

export const projects = [

  // ── 1. CIVIL WORKS ──────────────────────────────────────────────────────
  {
    id: 'neom-nrc26',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 48_000_000,
    year: 2023,
    featured: true,
    coverImage: '/projects/civil/neom-nrc26/img-01.jpg',
    images: imgs('civil', 'neom-nrc26', 27),
    breakdown: [
      { value: 41_000_000 },
      { value: 7_000_000 },
    ] as ProjectBreakdown,
  },
  {
    id: 'neom-nrc17-civil',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 7_800_000,
    year: 2023,
    featured: false,
    coverImage: '/projects/civil/neom-nrc17-civil/img-01.jpg',
    images: imgs('civil', 'neom-nrc17-civil', 5),
  },
  {
    id: 'mithaq',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 7_000_000,
    year: 2021,
    featured: false,
    coverImage: '/projects/civil/mithaq/img-01.jpg',
    images: imgs('civil', 'mithaq', 4),
  },
  {
    id: 'zawiat-almezar',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 5_500_000,
    year: 2022,
    featured: false,
    coverImage: '/projects/civil/zawiat-almezar/img-01.jpg',
    images: imgs('civil', 'zawiat-almezar', 4),
  },
  {
    id: 'sipchem',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 56_000_000,
    year: 2013,
    featured: true,
    coverImage: '/projects/civil/sipchem/img-01.jpg',
    images: imgs('civil', 'sipchem', 34),
    breakdown: [
      { value: 34_000_000 },
      { value: 22_000_000 },
    ] as ProjectBreakdown,
  },
  {
    id: 'ksu-ltc',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 40_000_000,
    year: 2021,
    featured: true,
    coverImage: '/projects/civil/ksu-ltc/img-01.jpg',
    images: imgs('civil', 'ksu-ltc', 4),
  },
  {
    id: 'saout1',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 24_000_000,
    year: 2010,
    featured: false,
    coverImage: '/projects/civil/saout1/img-01.jpg',
    images: imgs('civil', 'saout1', 5),
  },
  {
    id: 'kinan-strip-mall',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 21_200_000,
    year: 2015,
    featured: false,
    coverImage: '/projects/civil/kinan-strip-mall/img-01.jpg',
    images: imgs('civil', 'kinan-strip-mall', 5),
  },
  {
    id: 'khamis-substation',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 7_300_000,
    year: 2012,
    featured: false,
    coverImage: '/projects/civil/khamis-substation/img-01.jpg',
    images: imgs('civil', 'khamis-substation', 5),
  },
  {
    id: 'jmc-substation',
    categoryId: 'civil' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 7_200_000,
    year: 2012,
    featured: false,
    coverImage: '/projects/civil/jmc-substation/img-01.jpg',
    images: imgs('civil', 'jmc-substation', 5),
  },

  // ── 2. INFRASTRUCTURE WORKS ──────────────────────────────────────────────
  {
    id: 'yoowalk-mall',
    categoryId: 'infrastructure' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 22_485_833,
    year: 2023,
    featured: true,
    coverImage: '/projects/infrastructure/yoowalk-mall/img-01.jpg',
    images: imgs('infrastructure', 'yoowalk-mall', 3),
  },
  {
    id: 'riyadh-stormwater-37',
    categoryId: 'infrastructure' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 33_235_682,
    year: 2008,
    featured: false,
    coverImage: '/projects/infrastructure/riyadh-stormwater-37/img-01.jpg',
    images: imgs('infrastructure', 'riyadh-stormwater-37', 6),
  },
  {
    id: 'sweet-water-16',
    categoryId: 'infrastructure' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 28_842_473,
    year: 2011,
    featured: false,
    coverImage: '/projects/infrastructure/sweet-water-16/img-01.jpg',
    images: imgs('infrastructure', 'sweet-water-16', 6),
  },
  {
    id: 'sweet-water-15',
    categoryId: 'infrastructure' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 26_485_833,
    year: 2012,
    featured: false,
    coverImage: '/projects/infrastructure/sweet-water-15/img-01.jpg',
    images: imgs('infrastructure', 'sweet-water-15', 6),
  },
  {
    id: 'water-pipeline-2',
    categoryId: 'infrastructure' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 22_775_650,
    year: 2011,
    featured: false,
    coverImage: '/projects/infrastructure/water-pipeline-2/img-01.jpg',
    images: imgs('infrastructure', 'water-pipeline-2', 6),
  },

  // ── 3. FINISHING WORKS ────────────────────────────────────────────────────
  {
    id: 'neom-nrc19-finishing',
    categoryId: 'finishing' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 7_000_000,
    year: 2023,
    featured: false,
    coverImage: '/projects/finishing/neom-nrc19/img-01.jpg',
    images: imgs('finishing', 'neom-nrc19', 5),
  },
  {
    id: 'aramco-ajyad',
    categoryId: 'finishing' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 40_000_000,
    year: 2017,
    featured: true,
    coverImage: '/projects/finishing/aramco-ajyad/img-01.jpg',
    images: imgs('finishing', 'aramco-ajyad', 4),
  },
  {
    id: 'amwaj',
    categoryId: 'finishing' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 30_000_000,
    year: 2018,
    featured: true,
    coverImage: '/projects/finishing/amwaj/img-01.jpg',
    images: imgs('finishing', 'amwaj', 14),
  },
  {
    id: 'etre-store',
    categoryId: 'finishing' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 4_200_000,
    year: 2011,
    featured: false,
    coverImage: '/projects/finishing/etre-store/img-01.jpg',
    images: imgs('finishing', 'etre-store', 5),
  },

  // ── 4. STEEL ERECTION WORKS ───────────────────────────────────────────────
  {
    id: 'neom-nc1',
    categoryId: 'steel' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 2_000_000,
    year: 2023,
    featured: false,
    coverImage: '/projects/steel/neom-nc1/img-01.jpg',
    images: imgs('steel', 'neom-nc1', 9),
  },
  {
    id: 'riyadh-cables',
    categoryId: 'steel' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 21_000_000,
    year: 2012,
    featured: false,
    coverImage: '/projects/steel/riyadh-cables/img-01.jpg',
    images: imgs('steel', 'riyadh-cables', 5),
  },
  {
    id: 'arasco-silos',
    categoryId: 'steel' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 18_200_000,
    year: 2011,
    featured: false,
    coverImage: '/projects/steel/arasco-silos/img-01.jpg',
    images: imgs('steel', 'arasco-silos', 6),
  },

  // ── 5. ROADS & ASPHALT WORKS ──────────────────────────────────────────────
  {
    id: 'arar-airport',
    categoryId: 'roads' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 8_000_000,
    year: 2022,
    featured: false,
    coverImage: '/projects/roads/arar-airport/img-01.jpg',
    images: imgs('roads', 'arar-airport', 2),
  },
  {
    id: 'roads-shamasia',
    categoryId: 'roads' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 5_000_000,
    year: 2022,
    featured: false,
    coverImage: '/projects/roads/roads-shamasia/img-01.jpg',
    images: imgs('roads', 'roads-shamasia', 2),
  },
  {
    id: 'road-khalidiyah',
    categoryId: 'roads' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 2_000_000,
    year: 2012,
    featured: false,
    coverImage: '/projects/roads/road-khalidiyah/img-01.jpg',
    images: imgs('roads', 'road-khalidiyah', 10),
  },

  // ── 6. MOSQUE & KITCHEN ───────────────────────────────────────────────────
  {
    id: 'neom-nrc17-kitchen',
    categoryId: 'mosque' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 5_499_596,
    year: 2023,
    featured: false,
    coverImage: '/projects/mosque/neom-nrc17-kitchen/img-01.jpg',
    images: [
      ...imgs('mosque', 'neom-nrc17-kitchen', 6, 'jpg'),
      ...imgs('mosque', 'neom-nrc17-kitchen', 6, 'png').map((_, i) =>
        `/projects/mosque/neom-nrc17-kitchen/img-${String(i + 7).padStart(2, '0')}.png`
      ),
    ],
  },
  {
    id: 'neom-nrc19-mosque',
    categoryId: 'mosque' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 4_299_000,
    year: 2024,
    featured: false,
    coverImage: '/projects/mosque/neom-nrc19-mosque/img-01.png',
    images: imgs('mosque', 'neom-nrc19-mosque', 6, 'png'),
  },

  // ── 7. LANDSCAPE, HARDSCAPE & WATER FEATURES ─────────────────────────────
  {
    id: 'intercontinental-pool',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Main Contractor' as ProjectRole,
    value: 2_800_000,
    year: 2010,
    featured: false,
    coverImage: '/projects/landscape/intercontinental-pool/img-01.jpg',
    images: imgs('landscape', 'intercontinental-pool', 5),
  },
  {
    id: 'alwadi-park',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 22_525_000,
    year: 2008,
    featured: true,
    coverImage: '/projects/landscape/alwadi-park/img-01.jpg',
    images: imgs('landscape', 'alwadi-park', 5),
  },
  {
    id: 'alnakhil-village',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 17_525_000,
    year: 2010,
    featured: false,
    coverImage: '/projects/landscape/alnakhil-village/img-01.jpg',
    images: imgs('landscape', 'alnakhil-village', 5),
  },
  {
    id: 'hizam-park',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 11_800_000,
    year: 2015,
    featured: false,
    coverImage: '/projects/landscape/hizam-park/img-01.jpg',
    images: imgs('landscape', 'hizam-park', 9),
  },
  {
    id: 'masharif-fountains',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 2_300_000,
    year: 2012,
    featured: false,
    coverImage: '/projects/landscape/masharif-fountains/img-01.jpg',
    images: imgs('landscape', 'masharif-fountains', 5),
  },
  {
    id: 'masharif-park',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 7_525_000,
    year: 2012,
    featured: false,
    coverImage: '/projects/landscape/masharif-park/img-01.jpg',
    images: imgs('landscape', 'masharif-park', 5),
  },
  {
    id: 'khuzama-park',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 4_200_000,
    year: 2015,
    featured: false,
    coverImage: '/projects/landscape/khuzama-park/img-01.jpg',
    images: imgs('landscape', 'khuzama-park', 7),
  },
  {
    id: 'rawdah-park',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 2_365_000,
    year: 2009,
    featured: false,
    coverImage: '/projects/landscape/rawdah-park/img-01.jpg',
    images: imgs('landscape', 'rawdah-park', 5),
  },
  {
    id: 'dana-park',
    categoryId: 'landscape' as CategoryId,
    projectRole: 'Subcontractor' as ProjectRole,
    value: 2_160_000,
    year: 2011,
    featured: false,
    coverImage: '/projects/landscape/dana-park/img-01.jpg',
    images: imgs('landscape', 'dana-park', 5),
  },

] as const

export const clientIds = ['neom', 'arabian', 'kinan', 'alfanar', 'riyadhcables', 'sipchem', 'hassan', 'herfy', 'riyadhmunicipality'] as const

export const clientPngIds = new Set<string>([])

export const statsValues = [
  { value: 80,  suffix: '+' },
  { value: 330, suffix: '+' },
  { value: 12,  suffix: '+' },
  { value: 500, suffix: 'M+' },
] as const

export const companyInfo = {
  nameEn:        'Midan Alemar Contracting Co.',
  founded:       2013,
  duns:          '67-269-8009',
  phone:         '0559007725',
  phoneLandline: '0114337732',
  phoneDisplay:  '+966 55 900 7725',
  phoneLandlineDisplay: '+966 11 433 7732',
  phoneTel:      '+966559007725',
  phoneLandlineTel: '+966114337732',
  email:         'info@midan.com.sa',
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
