'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { equipment } from '@/lib/data'

const categoryIcons = ['⛏', '🏗', '🪣', '🛣', '⚡']
const categoryColors = [
  { bg: 'from-[#002060] to-[#001540]', accent: '#00B09B' },
  { bg: 'from-[#1a0a3d] to-[#0f0625]', accent: '#9d60ce' },
  { bg: 'from-[#003040] to-[#001822]', accent: '#00B09B' },
  { bg: 'from-[#0d2b0d] to-[#061506]', accent: '#4caf50' },
  { bg: 'from-[#2d1500] to-[#150a00]', accent: '#ff9800' },
]

export default function EquipmentPage() {
  const t = useTranslations('pages.equipment')
  const categories = t.raw('categories') as string[]
  const itemNames  = t.raw('itemNames')  as string[]

  const totals = equipment.map((cat) => cat.items.reduce((sum, item) => sum + item.quantity, 0))
  const grandTotal = totals.reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-[#040a18]">

      {/* ── PAGE HERO ─────────────────────────────────── */}
      <div className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/steel/img1.jpg"
          alt="Equipment background"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040a18]/80 to-[#040a18]" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <span className="section-label">{t('header.breadcrumb')}</span>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-[1.1] mb-4" style={{ letterSpacing: '-0.02em' }}>
              {t('header.title')}
            </h1>
            <p className="text-white/40 text-sm md:text-base leading-relaxed">{t('header.subtitle')}</p>
          </motion.div>

          {/* Grand total strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-6 md:gap-12"
          >
            <div className="text-center">
              <div className="text-accent text-3xl md:text-4xl font-extrabold">{grandTotal}+</div>
              <div className="text-white/35 text-xs font-semibold tracking-wide mt-1">{t('statsTotal')}</div>
            </div>
            <div className="w-px bg-white/10 self-stretch hidden sm:block" />
            <div className="text-center">
              <div className="text-accent text-3xl md:text-4xl font-extrabold">{equipment.length}</div>
              <div className="text-white/35 text-xs font-semibold tracking-wide mt-1">{t('statsCategories')}</div>
            </div>
            <div className="w-px bg-white/10 self-stretch hidden sm:block" />
            <div className="text-center">
              <div className="text-accent text-3xl md:text-4xl font-extrabold">8+</div>
              <div className="text-white/35 text-xs font-semibold tracking-wide mt-1">{t('statsBrands')}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── EQUIPMENT CATEGORIES ──────────────────────── */}
      <div className="container-custom pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {equipment.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b ${categoryColors[i].bg} border border-white/8 hover:border-white/20 transition-all duration-400 hover:shadow-2xl`}
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-5">
                  <div className="text-3xl">{categoryIcons[i]}</div>
                  <div className="text-end">
                    <div className="text-4xl md:text-5xl font-extrabold text-white leading-none">
                      {totals[i]}
                    </div>
                    <div className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: categoryColors[i].accent }}>
                      {t('unitsLabel')}
                    </div>
                  </div>
                </div>

                <h3 className="text-white font-extrabold text-base md:text-lg leading-snug mb-1">
                  {categories[cat.categoryIndex]}
                </h3>
                <div className="text-white/35 text-[11px] font-medium">
                  {cat.items.length} {t('itemsLabel')}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-white/10" />

              {/* Item list */}
              <div className="p-6 pt-4 space-y-3">
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white/75 text-[13px] font-semibold truncate">
                        {itemNames[item.nameIndex]}
                      </div>
                      {item.brand && item.model !== '—' && (
                        <div className="text-white/30 text-[11px] truncate">
                          {item.brand} {item.model}
                        </div>
                      )}
                    </div>
                    <div
                      className="shrink-0 text-[11px] font-extrabold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${categoryColors[i].accent}20`, color: categoryColors[i].accent }}
                    >
                      ×{item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom total bar */}
              <div className="mx-6 mb-6 mt-2 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/30 text-[10px] font-bold tracking-wider uppercase">{t('totalLabel')}</span>
                <span className="font-extrabold text-base" style={{ color: categoryColors[i].accent }}>
                  {totals[i]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
