'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { projects } from '@/lib/data'
import RoleBadge from '@/components/RoleBadge'
import {
  HiArrowLeft, HiArrowRight, HiLocationMarker, HiClock,
  HiTag, HiBriefcase, HiX, HiChevronLeft, HiChevronRight, HiUser,
} from 'react-icons/hi'

type ProjectItemData = {
  title: string
  client: string
  location: string
  duration: string
  category: string
  role: string
  roleDesc: string
  desc: string
  scope: string[]
}

// iOS Safari requires position:fixed to reliably lock body scroll.
// We capture scrollY before locking so we can restore it on unlock.
function lockBodyScroll(ref: React.MutableRefObject<number>) {
  ref.current = window.scrollY
  document.body.style.cssText +=
    `;position:fixed;top:-${ref.current}px;left:0;right:0;overflow:hidden;`
}
function unlockBodyScroll(ref: React.MutableRefObject<number>) {
  const y = ref.current
  document.body.style.cssText = document.body.style.cssText
    .replace(/position:[^;]+;/g, '')
    .replace(/top:[^;]+;/g, '')
    .replace(/left:[^;]+;/g, '')
    .replace(/right:[^;]+;/g, '')
    .replace(/overflow:[^;]+;/g, '')
  window.scrollTo(0, y)
}

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const t      = useTranslations('projects')
  const tp     = useTranslations('pages.projectDetail')
  const tpCats = useTranslations('pages.projects')
  const locale = useLocale()
  const isRTL  = locale !== 'en'

  const project = projects.find(p => p.id === projectId)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = t.raw(`items.${projectId}` as any) as ProjectItemData

  const [lightboxOpen,  setLightboxOpen]  = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')

  const heroRef     = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLElement>(null)
  const galleryRef  = useRef<HTMLElement>(null)
  const scopeRef    = useRef<HTMLElement>(null)
  const scrollYRef  = useRef(0)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  if (!project) return null

  const sameCategory   = projects.filter(p => p.id !== projectId && p.categoryId === project.categoryId)
  const featuredOther  = projects.filter(p => p.id !== projectId && p.featured && p.categoryId !== project.categoryId)
  const relatedProjects = [...sameCategory, ...featuredOther].slice(0, 3)

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
    lockBodyScroll(scrollYRef)
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    unlockBodyScroll(scrollYRef)
  }, [])

  const prevImg = useCallback(() => {
    setLightboxIndex(i => (i - 1 + project.images.length) % project.images.length)
  }, [project.images.length])

  const nextImg = useCallback(() => {
    setLightboxIndex(i => (i + 1) % project.images.length)
  }, [project.images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape')      closeLightbox()
      if (e.key === 'ArrowLeft')   isRTL ? nextImg() : prevImg()
      if (e.key === 'ArrowRight')  isRTL ? prevImg() : nextImg()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, closeLightbox, prevImg, nextImg, isRTL])

  // Ensure body scroll is restored if component unmounts while lightbox is open
  useEffect(() => () => { unlockBodyScroll(scrollYRef) }, [])

  // Intersection observer — highlights active sidebar nav item
  useEffect(() => {
    const pairs: [string, React.RefObject<HTMLElement>][] = [
      ['overview', overviewRef],
      ['gallery',  galleryRef],
      ['scope',    scopeRef],
    ]
    const obs = pairs.map(([id, ref]) => {
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      if (ref.current) o.observe(ref.current)
      return o
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const sarValue  = `SAR ${(project.value / 1_000_000).toFixed(0)}M`
  const BackArrow = isRTL ? HiArrowRight : HiArrowLeft

  const homeLabel     = locale === 'ar' ? 'الرئيسية' : locale === 'ur' ? 'ہوم' : 'Home'
  const projLabel     = locale === 'ar' ? 'المشاريع' : locale === 'ur' ? 'منصوبے' : 'Projects'
  const moreLabel     = locale === 'ar' ? 'مشاريع أخرى' : locale === 'ur' ? 'مزید منصوبے' : 'More Projects'
  const allProjLabel  = locale === 'ar' ? 'كل المشاريع' : locale === 'ur' ? 'تمام منصوبے' : 'All Projects'
  const featuredLabel = locale === 'ar' ? 'مشروع مميز' : locale === 'ur' ? 'نمایاں' : 'Featured'

  const sidebarFacts = [
    { Icon: HiUser,           label: tp('client'),        value: data.client    },
    { Icon: HiLocationMarker, label: tp('location'),       value: data.location  },
    { Icon: HiClock,          label: tp('duration'),       value: data.duration  },
    { Icon: HiTag,            label: tp('category'),       value: data.category  },
  ]

  const navSections = [
    { id: 'overview', label: tp('navOverview') },
    { id: 'gallery',  label: tp('navGallery') },
    { id: 'scope',    label: tp('navScope') },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ── CINEMATIC HERO ──────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative flex flex-col overflow-hidden"
        style={{ height: 'min(100svh, 900px)', minHeight: 560 }}
      >
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.coverImage} alt={data.title} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020812] via-[#020812]/60 to-[#020812]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020812]/65 via-transparent to-transparent" />

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 container-custom pt-28 md:pt-32"
        >
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white/35">
            <Link href={`/${locale}`} className="hover:text-white/80 transition-colors">{homeLabel}</Link>
            <span className="text-white/20">/</span>
            <Link href={`/${locale}/projects`} className="hover:text-white/80 transition-colors">{projLabel}</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/60 truncate max-w-[220px]">{data.title}</span>
          </nav>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 container-custom mt-auto pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent">
                {data.category}
              </span>
              {/* Role badge — most important credential */}
              <RoleBadge
                role={project.projectRole}
                label={data.role}
                variant="dark"
                size="sm"
              />
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-white/55">
                {project.year}
              </span>
              {project.featured && (
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-primary/40 border border-primary/50 text-white/75">
                  {featuredLabel}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-white font-extrabold leading-[1.04] mb-4 max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', letterSpacing: '-0.025em' }}
            >
              {data.title}
            </h1>

            {/* Role description — one-line credential under title */}
            <p className="text-white/40 text-sm mb-7 max-w-xl font-medium leading-snug">
              {data.roleDesc}
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap items-end gap-6 md:gap-10">
              {[
                { label: tp('client'),        value: data.client,   accent: false },
                { label: tp('contractValue'), value: sarValue,      accent: true  },
                { label: tp('duration'),      value: data.duration, accent: false },
                { label: tp('location'),      value: data.location, accent: false },
              ].map(({ label, value, accent }, i) => (
                <div key={i} className="flex items-start gap-3">
                  {i > 0 && <div className="w-px h-10 bg-white/12 self-stretch hidden sm:block" />}
                  <div>
                    <div className="text-white/30 text-[9px] font-bold tracking-widest uppercase mb-1">{label}</div>
                    <div className={`font-semibold text-sm md:text-base ${accent ? 'text-accent font-extrabold text-xl md:text-2xl leading-none' : 'text-white'}`}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-0.5 h-12 mx-auto rounded-full bg-gradient-to-b from-white/0 to-white/25"
          />
        </motion.div>
      </div>

      {/* ── MOBILE QUICK FACTS ──────────────────────────── */}
      <div className="lg:hidden bg-[#040a18] border-b border-white/5">
        <div
          className="overflow-x-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <div className="flex divide-x divide-white/8 w-max">
            {[
              { label: tp('contractValue'),  value: sarValue,     accent: true  },
              { label: tp('client'),         value: data.client                 },
              { label: tp('duration'),       value: data.duration               },
              { label: tp('location'),       value: data.location               },
              { label: tp('contractorRole'), value: data.role                   },
            ].map(({ label, value, accent }) => (
              <div key={label} className="px-5 py-4 shrink-0">
                <div className="text-[9px] font-bold text-white/25 tracking-widest uppercase mb-1">{label}</div>
                <div className={`font-bold text-[13px] ${accent ? 'text-accent' : 'text-white/75'}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT + SIDEBAR ───────────────────────────── */}
      <div className="container-custom py-14 md:py-24">
        <div className="lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] lg:gap-14 xl:gap-20">

          {/* ── Main content ── */}
          <div className="space-y-20 md:space-y-24">

            {/* OVERVIEW */}
            <section id="overview" ref={overviewRef} style={{ scrollMarginTop: '7rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-0.5 bg-accent rounded-full" />
                  <span className="text-accent text-[10px] font-bold tracking-widest uppercase">{tp('overview')}</span>
                </div>
                <p className="text-gray-800 text-lg md:text-xl leading-[1.75] font-medium max-w-2xl mb-8">
                  {data.desc}
                </p>

                {/* Role credential card */}
                <div className="border border-gray-100 bg-gray-50/70 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <HiBriefcase className="w-5 h-5 text-primary/60" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{tp('contractorRole')}</span>
                      <RoleBadge role={project.projectRole} label={data.role} size="xs" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.roleDesc}</p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* GALLERY */}
            <section id="gallery" ref={galleryRef} style={{ scrollMarginTop: '7rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-0.5 bg-accent rounded-full" />
                    <span className="text-accent text-[10px] font-bold tracking-widest uppercase">{tp('gallery')}</span>
                  </div>
                  <span className="text-gray-400 text-sm font-semibold">{project.images.length} {tp('photos')}</span>
                </div>

                <div className="space-y-3">
                  {/* First image — wide hero */}
                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    onClick={() => openLightbox(0)}
                    className="group relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.images[0]}
                      alt={`${data.title} — 1`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/18 transition-all duration-300" />
                    <div className="absolute bottom-4 end-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/18 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold px-4 py-2 rounded-full">
                        {tp('openGallery')}
                      </span>
                    </div>
                  </motion.button>

                  {/* Remaining images grid */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {project.images.slice(1).map((img, idx) => (
                        <motion.button
                          key={idx + 1}
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.06, duration: 0.45 }}
                          onClick={() => openLightbox(idx + 1)}
                          className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`${data.title} — ${idx + 2}`}
                            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/22 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/18 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                              {tp('openGallery')}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </section>

            {/* SCOPE OF WORK */}
            <section id="scope" ref={scopeRef} style={{ scrollMarginTop: '7rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-10 h-0.5 bg-accent rounded-full" />
                  <span className="text-accent text-[10px] font-bold tracking-widest uppercase">{tp('scopeTitle')}</span>
                </div>

                <div className="space-y-3">
                  {data.scope.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.07, duration: 0.45 }}
                      className="flex items-start gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-primary/[0.025] hover:border-primary/12 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-accent text-accent group-hover:text-white flex items-center justify-center font-extrabold text-xs shrink-0 transition-all duration-300">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <p className="text-gray-700 text-[15px] font-medium leading-relaxed pt-2">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

          </div>

          {/* ── Sticky Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-3">

              {/* Back link */}
              <Link
                href={`/${locale}/projects`}
                className="flex items-center gap-2 text-gray-400 hover:text-primary text-[13px] font-semibold transition-colors duration-200 group mb-5"
              >
                <BackArrow className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                {tp('backToProjects')}
              </Link>

              {/* Contract value card */}
              <div className="bg-[#001f5b] rounded-2xl p-5">
                <div className="text-white/40 text-[9px] font-bold tracking-widest uppercase mb-1.5">
                  {tp('contractValue')}
                </div>
                <div className="text-accent font-extrabold text-[2rem] leading-none mb-3">{sarValue}</div>
                <div className="text-white/28 text-[11px] pt-3 border-t border-white/8">
                  {project.year} · {data.duration}
                </div>
              </div>

              {/* Role card */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-gray-400 text-[9px] font-bold tracking-widest uppercase mb-3">
                  <HiBriefcase className="w-3.5 h-3.5" />
                  {tp('contractorRole')}
                </div>
                <div className="mb-2">
                  <RoleBadge role={project.projectRole} label={data.role} size="sm" />
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed mt-1.5">{data.roleDesc}</p>
              </div>

              {/* Other facts */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
                {sidebarFacts.map(({ Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`flex items-start gap-3.5 px-4 py-3.5 ${i < sidebarFacts.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <Icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-0.5">{label}</div>
                      <div className="text-gray-800 font-semibold text-[13px] leading-snug">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section nav */}
              <div className="bg-white border border-gray-100 rounded-2xl p-3">
                <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-2 px-2">
                  {tp('onThisPage')}
                </div>
                <nav className="space-y-0.5">
                  {navSections.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-start transition-all duration-200 ${
                        activeSection === id
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                        activeSection === id ? 'bg-accent' : 'bg-gray-200'
                      }`} />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quote CTA */}
              <Link
                href={`/${locale}/contact`}
                className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-[#00988a] text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-lg"
              >
                {tp('requestQuote')}
              </Link>

            </div>
          </aside>
        </div>
      </div>

      {/* ── RELATED PROJECTS ────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="bg-[#040a18] py-20 md:py-28">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-0.5 bg-accent rounded-full" />
                  <span className="text-accent text-[10px] font-bold tracking-widest uppercase">{tp('related')}</span>
                </div>
                <h2 className="text-white font-extrabold text-2xl md:text-3xl" style={{ letterSpacing: '-0.02em' }}>
                  {moreLabel}
                </h2>
              </div>
              <Link
                href={`/${locale}/projects`}
                className="hidden sm:flex items-center gap-2 text-white/40 hover:text-accent text-sm font-semibold transition-colors group"
              >
                {allProjLabel}
                {isRTL
                  ? <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  : <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                }
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {relatedProjects.map((rp, i) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rpData = t.raw(`items.${rp.id}` as any) as { title: string; location: string; role: string }
                const rpCat  = tpCats(`categories.${rp.categoryId}`)
                return (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={`/${locale}/projects/${rp.id}`} className="group block">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-gray-900 mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rp.coverImage}
                          alt={rpData.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040a18]/85 via-[#040a18]/15 to-transparent" />
                        <div className="absolute top-3 start-3 flex items-center gap-1.5">
                          <span className="bg-black/50 backdrop-blur-sm border border-white/12 text-white/70 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            {rpCat}
                          </span>
                          <RoleBadge role={rp.projectRole} label={rpData.role} variant="dark" size="xs" />
                        </div>
                        <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between">
                          <span className="text-accent font-extrabold text-[15px]">
                            SAR {(rp.value / 1_000_000).toFixed(0)}M
                          </span>
                          <span className="text-white/0 group-hover:text-white/60 transition-colors duration-300 text-[11px] font-bold flex items-center gap-1">
                            {tp('viewProject')}
                            {isRTL
                              ? <HiArrowLeft className="w-3 h-3" />
                              : <HiArrowRight className="w-3 h-3" />
                            }
                          </span>
                        </div>
                      </div>
                      <h3 className="text-white font-extrabold text-[15px] leading-snug group-hover:text-accent transition-colors duration-200 mb-1.5 line-clamp-2">
                        {rpData.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/35 text-xs font-medium">
                        <HiLocationMarker className="w-3.5 h-3.5 text-accent/50 shrink-0" />
                        {rpData.location}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── LIGHTBOX ────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="modal-backdrop flex flex-col"
            style={{ overscrollBehavior: 'contain', touchAction: 'none' }}
            onClick={closeLightbox}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-white/8 shrink-0"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-white font-extrabold text-sm truncate">{data.title}</span>
                <span className="text-white/30 text-xs shrink-0">{lightboxIndex + 1} / {project.images.length}</span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/18 text-white flex items-center justify-center transition-colors shrink-0 ms-3"
                aria-label="Close"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            <div
              className="flex-1 relative flex items-center justify-center min-h-0 p-4 md:p-10"
              onClick={e => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={project.images[lightboxIndex]}
                  alt={`${data.title} — ${lightboxIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                  className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
                  style={{ maxHeight: 'calc(100dvh - 160px)' }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...({} as any)}
                />
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={isRTL ? nextImg : prevImg}
                    className="absolute start-3 md:start-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Previous"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={isRTL ? prevImg : nextImg}
                    className="absolute end-3 md:end-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Next"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {project.images.length > 1 && (
              <div
                className="flex justify-center gap-2 px-4 pb-5 overflow-x-auto no-scrollbar shrink-0"
                style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' } as React.CSSProperties}
                onClick={e => e.stopPropagation()}
              >
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                      idx === lightboxIndex
                        ? 'border-accent scale-110 shadow-lg shadow-accent/20'
                        : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/30'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
