'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { HiArrowRight, HiArrowLeft, HiPhone, HiChevronDown } from 'react-icons/hi'
import { categories, certifications, statsValues, clientIds } from '@/lib/data'

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const HERO_BG = '/hero-banner.jpg'

export default function HomePage() {
  const t   = useTranslations('hero')
  const ts  = useTranslations('services')
  const ta  = useTranslations('about')
  const tc  = useTranslations('cta')
  const tst = useTranslations('stats')
  const tcl = useTranslations('clients')
  const locale = useLocale()
  const isRTL  = locale !== 'en'
  const Arrow  = isRTL ? HiArrowLeft : HiArrowRight

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const stats = [
    { val: t('statProjectsVal'), label: t('statProjects') },
    { val: t('statTeamVal'),     label: t('statTeam') },
    { val: t('statYearsVal'),    label: t('statYears') },
    { val: t('statCertVal'),     label: t('statCert') },
  ]

  const statLabels = tst.raw('statLabels') as string[]

  const categoryLabels: Record<string, string> = {
    civil:          ts('items.civil.title'),
    infrastructure: ts('items.infrastructure.title'),
    finishing:      ts('items.finishing.title'),
    steel:          ts('items.steel.title'),
    roads:          ts('items.roads.title'),
    mosque:         ts('items.mosque.title'),
    landscape:      ts('items.landscape.title'),
  }

  const clientItems = tcl.raw('items') as Record<string, { name: string; sector: string }>

  const notes = isRTL
    ? [
        'لكل مشروع نطاق أعمال خاص وفق متطلبات العميل.',
        'تم تنفيذ المشاريع بنظام المقاول الرئيسي والمقاول الفرعي.',
      ]
    : [
        'Every project has a distinct scope of work tailored to client requirements.',
        'Projects were executed under both main contracting and subcontracting models.',
      ]

  return (
    <div>

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_BG} alt="" className="w-full h-full object-cover object-[center_30%] scale-105" />
        </motion.div>
        {/* Primary overlay */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#001030]/75 via-[#001030]/70 to-[#001030]/96"
        />
        {/* Uniform base layer */}
        <div className="absolute inset-0 bg-[#001030]/25" />
        {/* Bottom-up darkening — makes stats + buttons area deeply readable */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#001030]/80 via-[#001030]/50 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#001030]/80 to-transparent" />

        <div className="flex-1" style={{ minHeight: 'clamp(88px, 14vh, 160px)' }} />

        <div className="relative z-10 text-center text-white px-5 sm:px-6 max-w-5xl w-full mx-auto pb-10 sm:pb-12">

          <motion.div
            {...anim(0.05)}
            className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white/70 text-[9px] sm:text-[10px] font-bold px-4 sm:px-5 py-2 rounded-full uppercase mb-8 sm:mb-10"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            {t('badge')}
          </motion.div>

          <motion.h1
            {...anim(0.12)}
            className="text-[clamp(1.8rem,5vw,4.5rem)] font-extrabold leading-[1.15] mb-4 sm:mb-5"
          >
            {t('title')}
            <span className="block text-accent mt-1">{t('titleAccent')}</span>
          </motion.h1>

          <motion.p
            {...anim(0.22)}
            className="text-white font-medium text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 sm:mb-12 px-2 sm:px-0 leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div {...anim(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
            <Link href={`/${locale}/projects`} className="btn-accent text-sm justify-center">
              {t('ctaProjects')} <Arrow className="w-4 h-4" />
            </Link>
            <Link href={`/${locale}/contact`} className="btn-outline-white text-sm justify-center">
              <HiPhone className="w-4 h-4" /> {t('ctaQuote')}
            </Link>
          </motion.div>

          <motion.div
            {...anim(0.4)}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto border border-white/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 hover:bg-white/10 transition-colors duration-300 py-4 sm:py-5 px-3 sm:px-4 text-center group">
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-accent mb-1 group-hover:scale-105 transition-transform duration-200">
                  {s.val}
                </div>
                <div className="text-white/75 font-medium text-[9px] sm:text-[10px] leading-tight mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex-1 relative" style={{ minHeight: '4rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HiChevronDown className="w-5 h-5 text-white/25" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute bottom-8 end-8 hidden xl:flex items-center gap-4"
          >
            {certifications.map((c) => (
              <span key={c} className="text-white/20 text-[9px] font-bold">{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. ABOUT STRIP ────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label">{ta('homeLabel')}</span>
              <h2 className="section-title">{ta('homeTitle')}</h2>
              <p className="section-body mb-5">{ta('body1')}</p>
              <p className="section-body mb-8">{ta('body2')}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {certifications.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
              <Link href={`/${locale}/about`} className="btn-primary">
                {ta('homeCta')} <Arrow className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative pb-6 sm:pb-8"
            >
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/civil/img1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden mt-4 sm:mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/landscape/img2.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden -mt-4 sm:-mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/steel/img2.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/roads/img1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="absolute -bottom-2 start-2 sm:-bottom-4 sm:-start-4 bg-primary text-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-2xl">
                <div className="text-accent text-2xl sm:text-3xl font-extrabold leading-none">{ta('yearsVal')}</div>
                <div className="text-white font-black text-xs sm:text-sm mt-1">{ta('yearsLabel')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES / CATEGORIES GRID ────────────────── */}
      <section className="py-14 sm:py-20 md:py-28 bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12 md:mb-16"
          >
            <span className="section-label">{ts('gridLabel')}</span>
            <h2 className="section-title">{ts('gridTitle')}</h2>
            <p className="section-body max-w-lg">{ts('gridBody')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`card-project group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <Link href={`/${locale}/projects`}>
                  <div className={`relative overflow-hidden rounded-2xl aspect-[4/3] ${i === 0 ? 'md:aspect-auto md:h-full md:min-h-[400px]' : ''}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.coverImage}
                      alt={categoryLabels[cat.id] ?? cat.id}
                      className="card-img absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 img-overlay" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 inset-x-0 p-3 md:p-5">
                      <div className="chip-white mb-1.5 w-fit text-[9px] md:text-[10px]">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className={`font-extrabold text-white leading-tight text-shadow-dark ${i === 0 ? 'text-sm md:text-xl lg:text-2xl' : 'text-xs md:text-sm lg:text-base'}`}>
                        {categoryLabels[cat.id] ?? cat.id}
                      </h3>
                      <div className="flex items-center gap-1 mt-1.5 text-accent text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        {ts('viewProjects')} <Arrow className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link href={`/${locale}/projects`} className="btn-primary inline-flex">
              {ts('viewAll')} <Arrow className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 4. STATS / PROJECTS SHOWCASE ─────────────────── */}
      <section className="py-14 sm:py-20 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #7030A0 0%, transparent 60%), radial-gradient(circle at 75% 50%, #00B09B 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {statsValues.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="text-center"
              >
                <div className="stat-value text-accent mb-2">
                  {s.value}{s.suffix}
                </div>
                <div className="text-white/80 font-medium text-[11px] sm:text-xs leading-tight max-w-[7rem] mx-auto">
                  {statLabels[i]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLIENTS ────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="section-label mx-auto">{tcl('label')}</span>
            <h2 className="section-title">{tcl('title')}</h2>
            <p className="section-body max-w-lg mx-auto">{tcl('body')}</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {clientIds.map((id, i) => {
              const client = clientItems[id]
              if (!client) return null
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative border border-gray-100 hover:border-accent/30 rounded-xl px-4 py-5 sm:px-5 sm:py-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white hover:bg-primary cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-8 h-0.5 bg-accent/30 group-hover:bg-accent/60 mx-auto mb-3 transition-colors duration-300 rounded-full" />
                    <div className="font-bold text-gray-900 group-hover:text-white text-sm sm:text-base leading-snug mb-1.5 transition-colors duration-300">
                      {client.name}
                    </div>
                    <div className="text-gray-400 group-hover:text-white/55 text-[10px] leading-snug uppercase transition-colors duration-300">
                      {client.sector}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <span className="inline-flex items-center gap-2 border border-gray-100 text-gray-400 text-xs font-semibold px-5 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              {tcl('footnote')}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── 6. GENERAL NOTES ──────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#080e20] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(ellipse at 20% 50%, #7030A0 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, #00B09B 0%, transparent 55%)' }} />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="section-label mx-auto block text-center">
              {isRTL ? 'ملاحظات عامة' : 'General Notes'}
            </span>
            <h2 className="section-title-white">
              {isRTL ? 'ملاحظات حول منهجية العمل' : 'Notes on Our Project Methodology'}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-6 sm:px-7 sm:py-7 hover:border-accent/30 hover:bg-white/8 transition-all duration-300 group"
              >
                <div className="absolute top-5 start-6 w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <span className="text-accent text-[10px] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-white/75 text-sm sm:text-base leading-relaxed pt-8 sm:pt-9 group-hover:text-white/90 transition-colors duration-300">
                  {note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BAND ───────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/landscape/img5.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/70" />
        <div className="container-custom relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">{tc('homeLabel')}</span>
              <h2 className="section-title-white mb-4">{tc('title')}</h2>
              <p className="text-white/55 text-base mb-8 leading-relaxed">{tc('body')}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/contact`} className="btn-accent">
                  {tc('ctaButton')} <Arrow className="w-4 h-4" />
                </Link>
                <Link href={`/${locale}/services`} className="btn-outline-white">
                  {tc('servicesBtn')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
