'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { categories } from '@/lib/data'
import Link from 'next/link'
import { HiArrowRight, HiArrowLeft, HiCheckCircle } from 'react-icons/hi'

const SERVICE_KEYS = ['civil', 'infrastructure', 'finishing', 'steel', 'roads', 'mosque', 'landscape'] as const

export default function ServicesPage() {
  const t  = useTranslations('services')
  const tp = useTranslations('pages.services')
  const locale = useLocale()
  const isRTL = locale !== 'en'
  const Arrow = isRTL ? HiArrowLeft : HiArrowRight

  const coverMap: Record<string, string> = Object.fromEntries(
    categories.map((c) => [c.id, c.coverImage])
  )

  return (
    <div className="min-h-screen bg-white">

      {/* ── PAGE HERO ─────────────────────────────────── */}
      <div className="bg-[#080e20] pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <span className="section-label">{tp('header.breadcrumb')}</span>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-[1.1] mb-4" style={{ letterSpacing: '-0.02em' }}>
              {tp('header.title')}
            </h1>
            <p className="text-white/45 text-sm md:text-base leading-relaxed">
              {tp('header.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── SERVICES GRID ─────────────────────────────── */}
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {SERVICE_KEYS.map((key, i) => {
            const title    = t(`items.${key}.title`)
            const desc     = t(`items.${key}.desc`)
            const features = t.raw(`items.${key}.features`) as string[]
            const cover    = coverMap[key] ?? ''

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-transparent hover:shadow-2xl transition-all duration-400"
              >
                {/* Image header */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover}
                    alt={title}
                    className="card-img w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 img-overlay" />
                  <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="absolute bottom-4 start-4 end-4 flex items-end justify-between">
                    <h3 className="font-extrabold text-white text-lg md:text-xl leading-tight text-shadow-dark">
                      {title}
                    </h3>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-5 line-clamp-3">
                    {desc}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-[13px] text-gray-700">
                        <HiCheckCircle className="w-4 h-4 text-accent shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-1.5 text-primary text-[13px] font-bold hover:text-accent transition-colors duration-200 group/link"
                  >
                    {t('getQuote')}
                    <Arrow className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── CTA STRIP ─────────────────────────────────── */}
      <div className="bg-[#f8f9fc] border-t border-gray-100">
        <div className="container-custom py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2" style={{ letterSpacing: '-0.02em' }}>
                {t('ctaTitle')}
              </h2>
              <p className="text-gray-500 text-sm max-w-md">
                {t('ctaBody')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href={`/${locale}/contact`} className="btn-primary">
                {t('getQuote')} <Arrow className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/projects`} className="btn-outline-primary inline-flex items-center gap-2 border border-primary text-primary px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-primary hover:text-white">
                {t('viewProjects')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
