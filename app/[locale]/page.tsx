'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { HiArrowRight, HiArrowLeft, HiPhone, HiChevronDown } from 'react-icons/hi'
import { categories, certifications, statsValues } from '@/lib/data'

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const HERO_BG = '/projects/steel/img1.jpg'

export default function HomePage() {
  const t   = useTranslations('hero')
  const ts  = useTranslations('services')
  const ta  = useTranslations('about')
  const tc  = useTranslations('cta')
  const tn  = useTranslations('nav')
  const tst = useTranslations('stats')
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

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────── */}
      {/*
        Three-row flex layout:
          1. top spacer (flex-1, min-h = navbar height) — ensures hero content
             never bleeds into the transparent navbar region
          2. hero content (auto height, centered horizontally)
          3. bottom spacer (flex-1) + absolute overlays
        Result: content is vertically centered but always below the navbar.
      */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_BG} alt="" className="w-full h-full object-cover object-center scale-105" />
        </motion.div>
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#001030]/80 via-[#001030]/70 to-[#001030]/95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001030]/40 via-transparent to-[#001030]/20" />

        {/* Top spacer — minimum height ensures content clears the fixed navbar */}
        <div className="flex-1" style={{ minHeight: 'clamp(88px, 14vh, 160px)' }} />

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl w-full mx-auto pb-12">

          {/* Badge */}
          <motion.div
            {...anim(0.05)}
            className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white/70 text-[10px] font-bold px-5 py-2 rounded-full tracking-[0.2em] uppercase mb-10"
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            {t('badge')}
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.12)}
            className="text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold leading-[1.04] mb-5"
          >
            {t('title')}
            <span className="block text-accent mt-1">{t('titleAccent')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...anim(0.22)} className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div {...anim(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href={`/${locale}/projects`} className="btn-accent text-sm justify-center">
              {t('ctaProjects')} <Arrow className="w-4 h-4" />
            </Link>
            <Link href={`/${locale}/contact`} className="btn-outline-white text-sm justify-center">
              <HiPhone className="w-4 h-4" /> {t('ctaQuote')}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...anim(0.4)}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto border border-white/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 hover:bg-white/10 transition-colors duration-300 py-5 px-4 text-center group">
                <div className="text-2xl md:text-3xl font-extrabold text-accent mb-1 group-hover:scale-105 transition-transform duration-200">
                  {s.val}
                </div>
                <div className="text-white/45 text-[10px] tracking-wide leading-snug font-medium">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom spacer + absolute overlays */}
        <div className="flex-1 relative" style={{ minHeight: '4rem' }}>
          {/* Scroll indicator */}
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

          {/* Cert strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute bottom-8 end-8 hidden xl:flex items-center gap-4"
          >
            {certifications.map((c) => (
              <span key={c} className="text-white/20 text-[9px] font-bold tracking-widest">{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES GRID ───────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
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
                  <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'aspect-square md:aspect-auto md:h-full min-h-[200px] md:min-h-[400px]' : 'aspect-[4/3]'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.coverImage}
                      alt={categoryLabels[cat.id] ?? cat.id}
                      className="card-img absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 img-overlay" />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                      <div className="chip-white mb-2 w-fit">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className={`font-extrabold text-white leading-tight text-shadow-dark ${i === 0 ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
                        {categoryLabels[cat.id] ?? cat.id}
                      </h3>
                      <div className="flex items-center gap-1 mt-2 text-accent text-[11px] font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
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

      {/* ── STATS BAND ────────────────────────────────── */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #7030A0 0%, transparent 60%), radial-gradient(circle at 75% 50%, #00B09B 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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
                <div className="text-white/45 text-xs font-semibold tracking-[0.12em] uppercase">
                  {statLabels[i]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ───────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/civil/img1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/landscape/img2.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden -mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/steel/img2.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/roads/img1.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -start-4 bg-primary text-white rounded-2xl px-5 py-4 shadow-2xl">
                <div className="text-accent text-3xl font-extrabold leading-none">{ta('yearsVal')}</div>
                <div className="text-white/60 text-xs font-semibold mt-1">{ta('yearsLabel')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
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
